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

	// Wait for DOM and D3 to be ready, then use Intersection Observer
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setupGlobeObserver);
	} else {
		setupGlobeObserver();
	}

	function setupGlobeObserver() {
		const container = document.querySelector('.globe-container');
		if (!container) return;

		// Use Intersection Observer to only init when visible
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					observer.disconnect();
					initGlobe();
				}
			});
		}, {
			rootMargin: '100px' // Start loading slightly before it comes into view
		});

		observer.observe(container);
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
		// Brasil → Japão → Portugal → Panamá → Estados Unidos → Brasil (loop)
		const locations = [
			[-47.9292, -15.7801],  // Brasil (Brasília)
			[139.6917, 35.6895],   // Japão (Tokyo)
			[-9.1393, 38.7223],    // Portugal (Lisboa)
			[-79.5199, 8.9824],    // Panamá (Cidade do Panamá)
			[-77.0369, 38.9072],   // Estados Unidos (Washington DC)
		];

		// Country names in Portuguese
		const countryNames = [
			'Brasil',
			'Japão',
			'Portugal',
			'Panamá',
			'Estados Unidos'
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
			.attr('opacity', 0.15)
			.attr('class', 'globe-sphere');

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
			.attr('filter', 'url(#glow)')
			.attr('class', 'globe-outline');

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
				svg.append('g')
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

				// Create group for tour elements (on top)
				const tourGroup = svg.append('g').attr('class', 'tour-group');

				// Add tour path
				const tourPath = tourGroup.append('path')
					.attr('class', 'tour-path')
					.attr('fill', 'none')
					.attr('stroke', '#EF4444')
					.attr('stroke-width', 2.5)
					.attr('stroke-linecap', 'round')
					.attr('stroke-linejoin', 'round')
					.attr('opacity', 0.9);

				// Add location marker
				const marker = tourGroup.append('circle')
					.attr('class', 'tour-marker')
					.attr('r', 5)
					.attr('fill', '#EF4444')
					.attr('stroke', '#FFFFFF')
					.attr('stroke-width', 2)
					.style('filter', 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))');

				// World Tour Animation
				let currentIndex = 0;
				const transitionDuration = 2500;
				let isAnimating = false;

				// Function to update country name display
				function updateCountryName(index) {
					const countryElement = document.getElementById('current-country');
					if (countryElement) {
						countryElement.textContent = countryNames[index];
					}
				}

				function transition() {
					if (isAnimating) return;

					isAnimating = true;
					const from = locations[currentIndex];
					const to = locations[(currentIndex + 1) % locations.length];
					const nextIndex = (currentIndex + 1) % locations.length;

					// Update country name to show destination
					updateCountryName(nextIndex);

					// Interpolate between locations
					const interpolate = d3.geoInterpolate(from, to);

					// Animate
					const t = d3.transition()
						.duration(transitionDuration)
						.ease(d3.easeCubic);

					t.tween('rotate', function() {
						return function(t) {
							// Update projection rotation
							const point = interpolate(t);
							projection.rotate([-point[0], -point[1]]);

							// Update all map elements
							svg.selectAll('.country').attr('d', path);
							svg.selectAll('.graticule').attr('d', path);
							svg.selectAll('.borders').attr('d', path);

							// Update tour path
							const currentPoint = interpolate(t);
							const arc = {
								type: 'LineString',
								coordinates: [from, currentPoint]
							};
							tourPath.attr('d', path(arc));

							// Update marker
							const proj = projection(currentPoint);
							if (proj) {
								marker
									.attr('cx', proj[0])
									.attr('cy', proj[1])
									.style('opacity', 1);
							} else {
								marker.style('opacity', 0);
							}
						};
					});

					t.on('end', function() {
						currentIndex = (currentIndex + 1) % locations.length;
						isAnimating = false;
						setTimeout(transition, 500);
					});
				}

				// Start tour after a delay
				setTimeout(transition, 1000);

			})
			.catch(function(error) {
				console.error('Error loading world data:', error);
			});
	}

})();
