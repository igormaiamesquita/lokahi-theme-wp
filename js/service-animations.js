/**
 * Service Card D3.js Animations
 * Animated illustrations for each service card
 */

document.addEventListener('DOMContentLoaded', function() {

	// Animation 1: Mídia Paga - Dashboard with orbiting metrics
	function createMediaPagaAnimation(container) {
		const width = 280;
		const height = 200;

		const svg = d3.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const centerX = width / 2;
		const centerY = height / 2;

		// Central dashboard rectangle
		const dashboard = svg.append('rect')
			.attr('x', centerX - 50)
			.attr('y', centerY - 35)
			.attr('width', 100)
			.attr('height', 70)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2);

		// Dashboard elements (search bar and content lines)
		svg.append('rect')
			.attr('x', centerX - 40)
			.attr('y', centerY - 25)
			.attr('width', 80)
			.attr('height', 10)
			.attr('rx', 2)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 1);

		// Content lines
		[5, 15].forEach(offset => {
			svg.append('line')
				.attr('x1', centerX - 40)
				.attr('y1', centerY + offset)
				.attr('x2', centerX + 40)
				.attr('y2', centerY + offset)
				.attr('stroke', '#64748B')
				.attr('stroke-width', 1.5);
		});

		// Small PDF icon
		svg.append('rect')
			.attr('x', centerX + 20)
			.attr('y', centerY + 5)
			.attr('width', 15)
			.attr('height', 18)
			.attr('rx', 1)
			.attr('fill', 'none')
			.attr('stroke', '#EF4444')
			.attr('stroke-width', 1.5);

		svg.append('text')
			.attr('x', centerX + 27.5)
			.attr('y', centerY + 18)
			.attr('text-anchor', 'middle')
			.attr('fill', '#EF4444')
			.attr('font-size', '8px')
			.attr('font-weight', 'bold')
			.text('PDF');

		// Orbiting icons data
		const orbitIcons = [
			{ icon: 'AI', angle: 0, radius: 90, color: '#3B82F6' },
			{ icon: 'M', angle: 90, radius: 90, color: '#64748B' },
			{ icon: '✦', angle: 180, radius: 90, color: '#EF4444' },
			{ icon: '⚡', angle: 270, radius: 90, color: '#3B82F6' }
		];

		// Create orbiting icon groups
		const iconGroups = svg.selectAll('.orbit-icon')
			.data(orbitIcons)
			.enter()
			.append('g')
			.attr('class', 'orbit-icon');

		// Add circles for icons
		iconGroups.append('circle')
			.attr('r', 18)
			.attr('fill', 'none')
			.attr('stroke', d => d.color)
			.attr('stroke-width', 2);

		// Add icon text/symbols
		iconGroups.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.attr('fill', d => d.color)
			.attr('font-size', '12px')
			.attr('font-weight', 'bold')
			.text(d => d.icon);

		// Add connecting lines
		const connections = iconGroups.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', centerX)
			.attr('y2', centerY)
			.attr('stroke', d => d.color)
			.attr('stroke-width', 1)
			.attr('stroke-dasharray', '3,3')
			.attr('opacity', 0.4);

		// Animate orbiting icons
		function animateOrbit() {
			iconGroups
				.transition()
				.duration(8000)
				.ease(d3.easeLinear)
				.attrTween('transform', function(d) {
					return function(t) {
						const angle = (d.angle + t * 360) * (Math.PI / 180);
						const x = centerX + Math.cos(angle) * d.radius;
						const y = centerY + Math.sin(angle) * d.radius;
						return `translate(${x}, ${y})`;
					};
				})
				.on('end', animateOrbit);
		}

		animateOrbit();

		// Pulse dashboard
		function pulseDashboard() {
			dashboard
				.transition()
				.duration(2000)
				.attr('stroke-width', 3)
				.transition()
				.duration(2000)
				.attr('stroke-width', 2)
				.on('end', pulseDashboard);
		}

		pulseDashboard();
	}

	// Animation 2: Automação - Data flow through processing
	function createAutomacaoAnimation(container) {
		const width = 280;
		const height = 200;

		const svg = d3.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const centerX = width / 2;
		const centerY = height / 2;

		// Input shapes (left side)
		const inputShapes = [
			{ type: 'polygon', points: '20,60 30,70 20,80', y: 70 },  // Triangle
			{ type: 'rect', x: 15, y: 95, width: 20, height: 20 },
			{ type: 'circle', cx: 25, cy: 130, r: 10 },
			{ type: 'polygon', points: '15,150 25,155 15,160', y: 155 }
		];

		// Output shapes (right side)
		const outputShapes = [
			{ type: 'rect', x: 245, y: 60, width: 20, height: 20 },
			{ type: 'circle', cx: 255, cy: 95, r: 10 },
			{ type: 'polygon', points: '250,115 260,120 250,125', y: 120 },
			{ type: 'polygon', points: '245,140 255,145 245,150', y: 145 }
		];

		// Draw input shapes
		inputShapes.forEach((shape, i) => {
			const element = svg.append(shape.type);

			if (shape.type === 'circle') {
				element.attr('cx', shape.cx)
					.attr('cy', shape.cy)
					.attr('r', shape.r);
			} else if (shape.type === 'rect') {
				element.attr('x', shape.x)
					.attr('y', shape.y)
					.attr('width', shape.width)
					.attr('height', shape.height);
			} else if (shape.type === 'polygon') {
				element.attr('points', shape.points);
			}

			element.attr('fill', 'none')
				.attr('stroke', '#64748B')
				.attr('stroke-width', 2)
				.attr('opacity', 0)
				.transition()
				.delay(i * 200)
				.duration(600)
				.attr('opacity', 1);
		});

		// Draw output shapes
		outputShapes.forEach((shape, i) => {
			const element = svg.append(shape.type);

			if (shape.type === 'circle') {
				element.attr('cx', shape.cx)
					.attr('cy', shape.cy)
					.attr('r', shape.r);
			} else if (shape.type === 'rect') {
				element.attr('x', shape.x)
					.attr('y', shape.y)
					.attr('width', shape.width)
					.attr('height', shape.height);
			} else if (shape.type === 'polygon') {
				element.attr('points', shape.points);
			}

			element.attr('fill', 'none')
				.attr('stroke', '#64748B')
				.attr('stroke-width', 2)
				.attr('opacity', 0)
				.transition()
				.delay(i * 200 + 1000)
				.duration(600)
				.attr('opacity', 1);
		});

		// Central processing box
		const processingBox = svg.append('rect')
			.attr('x', centerX - 40)
			.attr('y', centerY - 40)
			.attr('width', 80)
			.attr('height', 80)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2);

		// Processing dots grid
		const dotGrid = [];
		for (let row = 0; row < 4; row++) {
			for (let col = 0; col < 4; col++) {
				dotGrid.push({
					x: centerX - 25 + col * 17,
					y: centerY - 25 + row * 17
				});
			}
		}

		svg.selectAll('.processing-dot')
			.data(dotGrid)
			.enter()
			.append('circle')
			.attr('class', 'processing-dot')
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
			.attr('r', 2)
			.attr('fill', '#3B82F6')
			.attr('opacity', 0.3);

		// Animate processing dots
		function animateDots() {
			svg.selectAll('.processing-dot')
				.transition()
				.duration(400)
				.delay((d, i) => i * 50)
				.attr('opacity', 1)
				.attr('r', 3)
				.transition()
				.duration(400)
				.attr('opacity', 0.3)
				.attr('r', 2)
				.on('end', function(d, i) {
					if (i === dotGrid.length - 1) {
						setTimeout(animateDots, 1000);
					}
				});
		}

		animateDots();

		// Flow arrows
		const arrow1 = svg.append('path')
			.attr('d', `M 60 ${centerY} L ${centerX - 45} ${centerY}`)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2)
			.attr('marker-end', 'url(#arrowhead1)');

		const arrow2 = svg.append('path')
			.attr('d', `M ${centerX + 45} ${centerY} L 220 ${centerY}`)
			.attr('fill', 'none')
			.attr('stroke', '#EF4444')
			.attr('stroke-width', 2)
			.attr('marker-end', 'url(#arrowhead2)');

		// Define arrow markers
		const defs = svg.append('defs');

		defs.append('marker')
			.attr('id', 'arrowhead1')
			.attr('markerWidth', 10)
			.attr('markerHeight', 10)
			.attr('refX', 9)
			.attr('refY', 3)
			.attr('orient', 'auto')
			.append('polygon')
			.attr('points', '0 0, 10 3, 0 6')
			.attr('fill', '#3B82F6');

		defs.append('marker')
			.attr('id', 'arrowhead2')
			.attr('markerWidth', 10)
			.attr('markerHeight', 10)
			.attr('refX', 9)
			.attr('refY', 3)
			.attr('orient', 'auto')
			.append('polygon')
			.attr('points', '0 0, 10 3, 0 6')
			.attr('fill', '#EF4444');
	}

	// Animation 3: Análise de Dados - Neural network / reranker
	function createAnaliseAnimation(container) {
		const width = 280;
		const height = 200;

		const svg = d3.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		// Input layer (left)
		const inputNodes = [
			{ x: 40, y: 60, shape: 'rect' },
			{ x: 40, y: 100, shape: 'triangle' },
			{ x: 40, y: 140, shape: 'pentagon' },
			{ x: 40, y: 180, shape: 'circle' }
		];

		// Output layer (right)
		const outputNodes = [
			{ x: 240, y: 70, shape: 'circle' },
			{ x: 240, y: 110, shape: 'pentagon' },
			{ x: 240, y: 150, shape: 'triangle' },
			{ x: 240, y: 190, shape: 'rect' }
		];

		// Draw connections
		const connections = [];
		inputNodes.forEach((input, i) => {
			outputNodes.forEach((output, j) => {
				const line = svg.append('line')
					.attr('x1', input.x + 15)
					.attr('y1', input.y)
					.attr('x2', output.x - 15)
					.attr('y2', output.y)
					.attr('stroke', '#334155')
					.attr('stroke-width', 1)
					.attr('stroke-dasharray', '2,2')
					.attr('opacity', 0.2);

				connections.push({ line, input: i, output: j });
			});
		});

		// Animate connections
		let connectionIndex = 0;
		function animateConnections() {
			const conn = connections[connectionIndex];

			conn.line
				.transition()
				.duration(300)
				.attr('stroke', connectionIndex % 2 === 0 ? '#3B82F6' : '#EF4444')
				.attr('opacity', 0.8)
				.attr('stroke-width', 2)
				.transition()
				.duration(300)
				.attr('stroke', '#334155')
				.attr('opacity', 0.2)
				.attr('stroke-width', 1)
				.on('end', function() {
					connectionIndex = (connectionIndex + 1) % connections.length;
					setTimeout(animateConnections, 100);
				});
		}

		setTimeout(animateConnections, 1000);

		// Draw input nodes
		inputNodes.forEach((node, i) => {
			const g = svg.append('g');

			if (node.shape === 'rect') {
				g.append('rect')
					.attr('x', node.x - 8)
					.attr('y', node.y - 8)
					.attr('width', 16)
					.attr('height', 16)
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			} else if (node.shape === 'circle') {
				g.append('circle')
					.attr('cx', node.x)
					.attr('cy', node.y)
					.attr('r', 8)
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			} else if (node.shape === 'triangle') {
				g.append('polygon')
					.attr('points', `${node.x},${node.y - 10} ${node.x + 8},${node.y + 6} ${node.x - 8},${node.y + 6}`)
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			} else if (node.shape === 'pentagon') {
				const points = [];
				for (let i = 0; i < 5; i++) {
					const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
					const x = node.x + 10 * Math.cos(angle);
					const y = node.y + 10 * Math.sin(angle);
					points.push(`${x},${y}`);
				}
				g.append('polygon')
					.attr('points', points.join(' '))
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			}
		});

		// Draw output nodes
		outputNodes.forEach((node, i) => {
			const g = svg.append('g');

			if (node.shape === 'rect') {
				g.append('rect')
					.attr('x', node.x - 8)
					.attr('y', node.y - 8)
					.attr('width', 16)
					.attr('height', 16)
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			} else if (node.shape === 'circle') {
				g.append('circle')
					.attr('cx', node.x)
					.attr('cy', node.y)
					.attr('r', 8)
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			} else if (node.shape === 'triangle') {
				g.append('polygon')
					.attr('points', `${node.x},${node.y - 10} ${node.x + 8},${node.y + 6} ${node.x - 8},${node.y + 6}`)
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			} else if (node.shape === 'pentagon') {
				const points = [];
				for (let i = 0; i < 5; i++) {
					const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
					const x = node.x + 10 * Math.cos(angle);
					const y = node.y + 10 * Math.sin(angle);
					points.push(`${x},${y}`);
				}
				g.append('polygon')
					.attr('points', points.join(' '))
					.attr('fill', 'none')
					.attr('stroke', '#64748B')
					.attr('stroke-width', 2);
			}
		});
	}

	// Animation 4: Sites e Landing Pages - Responsive layouts
	function createSitesAnimation(container) {
		const width = 280;
		const height = 200;

		const svg = d3.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const centerX = width / 2;
		const centerY = height / 2;

		// Desktop device
		const desktop = svg.append('g')
			.attr('class', 'device-desktop');

		desktop.append('rect')
			.attr('x', centerX - 80)
			.attr('y', centerY - 50)
			.attr('width', 160)
			.attr('height', 100)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2);

		// Desktop screen content
		desktop.append('rect')
			.attr('x', centerX - 70)
			.attr('y', centerY - 40)
			.attr('width', 140)
			.attr('height', 6)
			.attr('rx', 1)
			.attr('fill', '#64748B');

		desktop.append('rect')
			.attr('x', centerX - 70)
			.attr('y', centerY - 28)
			.attr('width', 60)
			.attr('height', 4)
			.attr('rx', 1)
			.attr('fill', '#475569');

		desktop.append('rect')
			.attr('x', centerX - 70)
			.attr('y', centerY - 20)
			.attr('width', 140)
			.attr('height', 3)
			.attr('rx', 1)
			.attr('fill', '#334155');

		desktop.append('rect')
			.attr('x', centerX - 70)
			.attr('y', centerY - 14)
			.attr('width', 100)
			.attr('height', 3)
			.attr('rx', 1)
			.attr('fill', '#334155');

		// Desktop base
		desktop.append('line')
			.attr('x1', centerX - 40)
			.attr('y1', centerY + 50)
			.attr('x2', centerX + 40)
			.attr('y2', centerY + 50)
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2);

		desktop.append('line')
			.attr('x1', centerX)
			.attr('y1', centerY + 50)
			.attr('x2', centerX)
			.attr('y2', centerY + 60)
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2);

		// Mobile devices (left and right)
		const mobileLeft = svg.append('g')
			.attr('class', 'device-mobile-left');

		mobileLeft.append('rect')
			.attr('x', 40)
			.attr('y', centerY - 20)
			.attr('width', 35)
			.attr('height', 65)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', '#64748B')
			.attr('stroke-width', 2);

		mobileLeft.append('rect')
			.attr('x', 45)
			.attr('y', centerY - 12)
			.attr('width', 25)
			.attr('height', 3)
			.attr('rx', 1)
			.attr('fill', '#475569');

		const mobileRight = svg.append('g')
			.attr('class', 'device-mobile-right');

		mobileRight.append('rect')
			.attr('x', 205)
			.attr('y', centerY - 20)
			.attr('width', 35)
			.attr('height', 65)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', '#64748B')
			.attr('stroke-width', 2);

		mobileRight.append('rect')
			.attr('x', 210)
			.attr('y', centerY - 12)
			.attr('width', 25)
			.attr('height', 3)
			.attr('rx', 1)
			.attr('fill', '#475569');

		// Connection lines (dotted)
		const leftConnection = svg.append('line')
			.attr('x1', 75)
			.attr('y1', centerY)
			.attr('x2', centerX - 80)
			.attr('y2', centerY)
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 1.5)
			.attr('stroke-dasharray', '4,4')
			.attr('opacity', 0.6);

		const rightConnection = svg.append('line')
			.attr('x1', centerX + 80)
			.attr('y1', centerY)
			.attr('x2', 205)
			.attr('y2', centerY)
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 1.5)
			.attr('stroke-dasharray', '4,4')
			.attr('opacity', 0.6);

		// Animate data flow from mobile to desktop
		function animateDataFlow() {
			// Left mobile to desktop
			const circleLeft = svg.append('circle')
				.attr('cx', 75)
				.attr('cy', centerY)
				.attr('r', 3)
				.attr('fill', '#EF4444');

			circleLeft
				.transition()
				.duration(1500)
				.ease(d3.easeLinear)
				.attr('cx', centerX - 80)
				.on('end', function() {
					d3.select(this).remove();
				});

			// Right mobile to desktop
			setTimeout(() => {
				const circleRight = svg.append('circle')
					.attr('cx', 205)
					.attr('cy', centerY)
					.attr('r', 3)
					.attr('fill', '#EF4444');

				circleRight
					.transition()
					.duration(1500)
					.ease(d3.easeLinear)
					.attr('cx', centerX + 80)
					.on('end', function() {
						d3.select(this).remove();
						setTimeout(animateDataFlow, 1000);
					});
			}, 750);
		}

		animateDataFlow();

		// Pulse desktop screen
		function pulseDesktop() {
			desktop.select('rect:first-child')
				.transition()
				.duration(2000)
				.attr('stroke', '#60A5FA')
				.attr('stroke-width', 3)
				.transition()
				.duration(2000)
				.attr('stroke', '#3B82F6')
				.attr('stroke-width', 2)
				.on('end', pulseDesktop);
		}

		pulseDesktop();
	}

	// Initialize animations for visible service cards
	const serviceCards = document.querySelectorAll('.service-card');

	if (serviceCards.length >= 3) {
		// Service 1: Mídia Paga
		const container1 = serviceCards[0].querySelector('.service-illustration');
		if (container1) {
			createMediaPagaAnimation(container1);
		}

		// Service 2: Automação
		const container2 = serviceCards[1].querySelector('.service-illustration');
		if (container2) {
			createAutomacaoAnimation(container2);
		}

		// Service 3: Análise de Dados
		const container3 = serviceCards[2].querySelector('.service-illustration');
		if (container3) {
			createAnaliseAnimation(container3);
		}

		// Service 4: Sites e Landing Pages
		if (serviceCards.length >= 4) {
			const container4 = serviceCards[3].querySelector('.service-illustration');
			if (container4) {
				createSitesAnimation(container4);
			}
		}
	}
});
