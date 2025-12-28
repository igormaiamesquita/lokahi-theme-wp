/**
 * Interactive Globe with D3.js
 *
 * Renders an interactive 3D globe using D3.js and TopoJSON
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

				// Rotation animation
				let rotation = [0, -20, 0];
				const velocity = [0.015, 0];

				function animate() {
					rotation[0] += velocity[0];
					rotation[1] += velocity[1];

					projection.rotate(rotation);

					svg.selectAll('.country')
						.attr('d', path);

					svg.selectAll('.graticule')
						.attr('d', path);

					svg.selectAll('.borders')
						.attr('d', path);

					requestAnimationFrame(animate);
				}

				// Start animation
				animate();

				// Add drag interaction
				const drag = d3.drag()
					.on('start', function() {
						velocity[0] = 0;
						velocity[1] = 0;
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
					})
					.on('end', function(event) {
						velocity[0] = 0.015;
						velocity[1] = 0;
					});

				svg.call(drag);

			})
			.catch(function(error) {
				console.error('Error loading world data:', error);
			});
	}

})();
