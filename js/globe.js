/**
 * Interactive Globe with D3.js - World Tour
 *
 * Renders an interactive 3D globe with animated tour between countries
 * Inspired by https://observablehq.com/@d3/world-tour
 *
 * @package lokahi-digital
 */

(function() {
	'use strict';

	// Wait for DOM and D3 to be ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initGlobe);
	} else {
		initGlobe();
	}

	function initGlobe() {
		// Check if D3 and topojson are loaded
		if (typeof d3 === 'undefined' || typeof topojson === 'undefined') {
			console.warn('D3 or TopoJSON not loaded. Globe disabled.');
			return;
		}

		const container = document.querySelector('.globe-container');
		if (!container) return;

		// Globe configuration
		const width = 500;
		const height = 500;

		// World tour locations (longitude, latitude)
		// Brasil → Japão → Portugal → Panamá → Estados Unidos → Brasil
		const locations = [
			{ name: 'Brasil', coordinates: [-47.9292, -15.7801] },      // Brasília
			{ name: 'Japão', coordinates: [139.6917, 35.6895] },        // Tokyo
			{ name: 'Portugal', coordinates: [-9.1393, 38.7223] },      // Lisboa
			{ name: 'Panamá', coordinates: [-79.5199, 8.9824] },        // Cidade do Panamá
			{ name: 'Estados Unidos', coordinates: [-77.0369, 38.9072] }, // Washington DC
			{ name: 'Brasil', coordinates: [-47.9292, -15.7801] }       // Volta para Brasília
		];

		// Create SVG
		const svg = d3.select('.globe-container')
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', [0, 0, width, height])
			.style('max-width', '100%')
			.style('height', 'auto');

		// Projection
		const projection = d3.geoOrthographic()
			.scale(width / 2.1)
			.translate([width / 2, height / 2])
			.precision(0.1);

		// Path generator
		const path = d3.geoPath(projection);

		// Graticule (latitude/longitude lines)
		const graticule = d3.geoGraticule10();

		// Add globe background (ocean)
		svg.append('circle')
			.attr('cx', width / 2)
			.attr('cy', height / 2)
			.attr('r', projection.scale())
			.attr('fill', '#1E3A8A')
			.attr('opacity', 0.15);

		// Add glow effect
		const defs = svg.append('defs');
		const filter = defs.append('filter')
			.attr('id', 'glow');
		filter.append('feGaussianBlur')
			.attr('stdDeviation', '8')
			.attr('result', 'coloredBlur');
		const feMerge = filter.append('feMerge');
		feMerge.append('feMergeNode')
			.attr('in', 'coloredBlur');
		feMerge.append('feMergeNode')
			.attr('in', 'SourceGraphic');

		// Add outer glow circle
		svg.append('circle')
			.attr('cx', width / 2)
			.attr('cy', height / 2)
			.attr('r', projection.scale())
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2)
			.attr('opacity', 0.3)
			.attr('filter', 'url(#glow)');

		// Create group for tour elements
		const tourGroup = svg.append('g');

		// Add tour path (will be updated during animation)
		const tourPath = tourGroup.append('path')
			.attr('fill', 'none')
			.attr('stroke', '#EF4444')
			.attr('stroke-width', 2.5)
			.attr('stroke-linecap', 'round')
			.attr('opacity', 0.8);

		// Add location marker
		const marker = tourGroup.append('circle')
			.attr('r', 5)
			.attr('fill', '#EF4444')
			.attr('stroke', '#FFFFFF')
			.attr('stroke-width', 2)
			.style('filter', 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))');

		// Load and render world data
		d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
			.then(function(world) {
				const countries = topojson.feature(world, world.objects.countries);
				const borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);

				// Add graticule
				svg.append('path')
					.datum(graticule)
					.attr('class', 'graticule')
					.attr('d', path)
					.attr('fill', 'none')
					.attr('stroke', '#334155')
					.attr('stroke-width', 0.5)
					.attr('opacity', 0.3);

				// Add countries
				const countriesGroup = svg.append('g')
					.selectAll('path')
					.data(countries.features)
					.join('path')
					.attr('class', 'country')
					.attr('d', path)
					.attr('fill', '#3B82F6')
					.attr('opacity', 0.8)
					.attr('stroke', '#2563EB')
					.attr('stroke-width', 0.5);

				// Add country borders
				svg.append('path')
					.datum(borders)
					.attr('class', 'borders')
					.attr('d', path)
					.attr('fill', 'none')
					.attr('stroke', '#1E293B')
					.attr('stroke-width', 1)
					.attr('opacity', 0.5);

				// Bring tour elements to front
				tourGroup.raise();

				// World Tour Animation
				let currentLocation = 0;
				const transitionDuration = 2500; // 2.5 seconds per transition

				function updateGlobe() {
					const p1 = locations[currentLocation].coordinates;
					const p2 = locations[(currentLocation + 1) % locations.length].coordinates;

					// Interpolate rotation
					const rotationInterpolator = d3.geoInterpolate(p1, p2);

					// Create great circle arc
					const arcGenerator = d3.geoGreatArc();
					const arcPath = {
						type: 'LineString',
						coordinates: [p1, p2]
					};

					// Animate rotation and path
					d3.transition()
						.duration(transitionDuration)
						.tween('rotate', function() {
							return function(t) {
								// Interpolate rotation
								const interpolatedPoint = rotationInterpolator(t);
								const rotate = [-interpolatedPoint[0], -interpolatedPoint[1]];
								projection.rotate(rotate);

								// Update all paths
								svg.selectAll('.country').attr('d', path);
								svg.selectAll('.graticule').attr('d', path);
								svg.selectAll('.borders').attr('d', path);

								// Update tour path (draw partial arc based on t)
								const partialArc = {
									type: 'LineString',
									coordinates: [
										p1,
										rotationInterpolator(t)
									]
								};
								tourPath.attr('d', path(partialArc));

								// Update marker position
								const markerPos = projection(rotationInterpolator(t));
								if (markerPos) {
									marker
										.attr('cx', markerPos[0])
										.attr('cy', markerPos[1])
										.attr('opacity', 1);
								} else {
									marker.attr('opacity', 0);
								}
							};
						})
						.on('end', function() {
							// Move to next location
							currentLocation = (currentLocation + 1) % (locations.length - 1);
							// Wait a bit before next transition
							setTimeout(updateGlobe, 800);
						});
				}

				// Start the tour
				setTimeout(updateGlobe, 1000);

				// Add drag interaction (pauses tour temporarily)
				let isDragging = false;
				const drag = d3.drag()
					.on('start', function() {
						isDragging = true;
					})
					.on('drag', function(event) {
						const rotate = projection.rotate();
						const k = 75 / projection.scale();
						projection.rotate([
							rotate[0] + event.dx * k,
							rotate[1] - event.dy * k
						]);

						svg.selectAll('.country').attr('d', path);
						svg.selectAll('.graticule').attr('d', path);
						svg.selectAll('.borders').attr('d', path);
						tourPath.attr('opacity', 0.3);
						marker.attr('opacity', 0);
					})
					.on('end', function() {
						isDragging = false;
						tourPath.attr('opacity', 0.8);
						marker.attr('opacity', 1);
					});

				svg.call(drag);

			})
			.catch(function(error) {
				console.error('Error loading world data:', error);
			});
	}

})();
