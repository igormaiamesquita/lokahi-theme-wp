/**
 * Service Card D3.js Animations
 * Animated illustrations for each service card
 */

document.addEventListener('DOMContentLoaded', function() {

	// Animation 1: Mídia Paga - Performance metrics with growth chart
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

		// Platform badges (Google, Meta, LinkedIn)
		const platforms = [
			{ name: 'G', x: 40, y: 40, color: '#3B82F6' },
			{ name: 'M', x: centerX, y: 35, color: '#EF4444' },
			{ name: 'in', x: 240, y: 40, color: '#10B981' }
		];

		const platformGroups = svg.selectAll('.platform')
			.data(platforms)
			.enter()
			.append('g')
			.attr('class', 'platform')
			.attr('transform', d => `translate(${d.x}, ${d.y})`);

		platformGroups.append('circle')
			.attr('r', 15)
			.attr('fill', 'none')
			.attr('stroke', d => d.color)
			.attr('stroke-width', 2);

		platformGroups.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.attr('fill', d => d.color)
			.attr('font-size', '12px')
			.attr('font-weight', 'bold')
			.text(d => d.name);

		// Performance chart area
		const chartGroup = svg.append('g')
			.attr('class', 'performance-chart');

		// Chart background
		chartGroup.append('rect')
			.attr('x', 60)
			.attr('y', 80)
			.attr('width', 160)
			.attr('height', 100)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', '#334155')
			.attr('stroke-width', 1.5)
			.attr('stroke-dasharray', '4,4')
			.attr('opacity', 0.5);

		// Grid lines
		[90, 110, 130, 150, 170].forEach(y => {
			chartGroup.append('line')
				.attr('x1', 60)
				.attr('y1', y)
				.attr('x2', 220)
				.attr('y2', y)
				.attr('stroke', '#1E293B')
				.attr('stroke-width', 1)
				.attr('opacity', 0.3);
		});

		// Ascending performance line data
		const lineData = [
			{ x: 70, y: 165 },
			{ x: 100, y: 155 },
			{ x: 130, y: 140 },
			{ x: 160, y: 125 },
			{ x: 190, y: 105 },
			{ x: 210, y: 90 }
		];

		// Create line path
		const lineGenerator = d3.line()
			.x(d => d.x)
			.y(d => d.y)
			.curve(d3.curveMonotoneX);

		const performanceLine = chartGroup.append('path')
			.datum(lineData)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 3)
			.attr('d', lineGenerator)
			.style('filter', 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))');

		// Animate line drawing
		const lineLength = performanceLine.node().getTotalLength();

		performanceLine
			.attr('stroke-dasharray', lineLength + ' ' + lineLength)
			.attr('stroke-dashoffset', lineLength);

		function animateLine() {
			performanceLine
				.transition()
				.duration(2500)
				.ease(d3.easeQuadInOut)
				.attr('stroke-dashoffset', 0)
				.on('end', function() {
					setTimeout(() => {
						performanceLine.attr('stroke-dashoffset', lineLength);
						animateLine();
					}, 1500);
				});
		}

		animateLine();

		// Data points on line
		const dataPoints = chartGroup.selectAll('.data-point')
			.data(lineData)
			.enter()
			.append('g')
			.attr('class', 'data-point')
			.attr('transform', d => `translate(${d.x}, ${d.y})`);

		dataPoints.append('circle')
			.attr('r', 4)
			.attr('fill', '#3B82F6')
			.attr('stroke', '#FFFFFF')
			.attr('stroke-width', 2);

		// Animate data points sequentially
		function animatePoints() {
			dataPoints.selectAll('circle')
				.attr('r', 0)
				.transition()
				.duration(300)
				.delay((d, i) => i * 400 + 500)
				.attr('r', 4)
				.transition()
				.duration(200)
				.attr('r', 6)
				.transition()
				.duration(200)
				.attr('r', 4);

			setTimeout(animatePoints, 5000);
		}

		animatePoints();

		// ROI/metrics badges
		const metrics = [
			{ label: 'ROI', value: '+180%', x: 45, y: 140, color: '#10B981' },
			{ label: 'CTR', value: '↑ 45%', x: 230, y: 120, color: '#3B82F6' },
			{ label: 'CPA', value: '↓ 32%', x: 235, y: 160, color: '#EF4444' }
		];

		const metricGroups = svg.selectAll('.metric-badge')
			.data(metrics)
			.enter()
			.append('g')
			.attr('class', 'metric-badge')
			.attr('transform', d => `translate(${d.x}, ${d.y})`);

		metricGroups.append('rect')
			.attr('x', -22)
			.attr('y', -12)
			.attr('width', 44)
			.attr('height', 24)
			.attr('rx', 3)
			.attr('fill', 'rgba(15, 23, 42, 0.8)')
			.attr('stroke', d => d.color)
			.attr('stroke-width', 1.5);

		metricGroups.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '-0.1em')
			.attr('fill', '#94A3B8')
			.attr('font-size', '7px')
			.text(d => d.label);

		metricGroups.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '0.8em')
			.attr('fill', d => d.color)
			.attr('font-size', '9px')
			.attr('font-weight', 'bold')
			.text(d => d.value);

		// Pulse metrics
		function pulseMetrics() {
			metricGroups.selectAll('rect')
				.transition()
				.duration(1000)
				.delay((d, i) => i * 300)
				.attr('stroke-width', 2.5)
				.style('filter', 'drop-shadow(0 0 4px currentColor)')
				.transition()
				.duration(1000)
				.attr('stroke-width', 1.5)
				.style('filter', 'none')
				.on('end', function(d, i) {
					if (i === metrics.length - 1) {
						setTimeout(pulseMetrics, 2000);
					}
				});
		}

		pulseMetrics();

		// Pulse platform badges
		function pulsePlatforms() {
			platformGroups.selectAll('circle')
				.transition()
				.duration(1500)
				.delay((d, i) => i * 500)
				.attr('r', 18)
				.attr('stroke-width', 3)
				.transition()
				.duration(1500)
				.attr('r', 15)
				.attr('stroke-width', 2)
				.on('end', function(d, i) {
					if (i === platforms.length - 1) {
						setTimeout(pulsePlatforms, 3000);
					}
				});
		}

		pulsePlatforms();

		// Add upward trend arrow
		const arrowGroup = svg.append('g')
			.attr('class', 'trend-arrow')
			.attr('transform', `translate(225, 85)`);

		arrowGroup.append('line')
			.attr('x1', 0)
			.attr('y1', 15)
			.attr('x2', 0)
			.attr('y2', 0)
			.attr('stroke', '#10B981')
			.attr('stroke-width', 2.5)
			.attr('stroke-linecap', 'round');

		arrowGroup.append('polygon')
			.attr('points', '-4,3 0,0 4,3')
			.attr('fill', '#10B981');

		// Pulse arrow
		function pulseArrow() {
			arrowGroup
				.transition()
				.duration(1000)
				.attr('transform', 'translate(225, 83) scale(1.2)')
				.transition()
				.duration(1000)
				.attr('transform', 'translate(225, 85) scale(1)')
				.on('end', pulseArrow);
		}

		pulseArrow();
	}

	// Animation 2: Automação - Integrated systems with data flow
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

		// System nodes (representing different tools/platforms)
		const systems = [
			{ id: 'crm', x: 50, y: 60, color: '#3B82F6', label: 'CRM' },
			{ id: 'ads', x: 230, y: 60, color: '#EF4444', label: 'ADS' },
			{ id: 'analytics', x: 50, y: 140, color: '#10B981', label: 'DATA' },
			{ id: 'email', x: 230, y: 140, color: '#F59E0B', label: 'EMAIL' }
		];

		// Central automation hub
		const hub = svg.append('g')
			.attr('class', 'automation-hub');

		// Hub outer circle
		hub.append('circle')
			.attr('cx', centerX)
			.attr('cy', centerY)
			.attr('r', 35)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2)
			.attr('stroke-dasharray', '5,5');

		// Hub inner gear (simplified)
		const gearGroup = hub.append('g')
			.attr('transform', `translate(${centerX}, ${centerY})`);

		// Create gear teeth
		const teethCount = 8;
		for (let i = 0; i < teethCount; i++) {
			const angle = (i * 360 / teethCount) * (Math.PI / 180);
			const innerRadius = 15;
			const outerRadius = 22;

			const x1 = Math.cos(angle) * innerRadius;
			const y1 = Math.sin(angle) * innerRadius;
			const x2 = Math.cos(angle) * outerRadius;
			const y2 = Math.sin(angle) * outerRadius;

			gearGroup.append('line')
				.attr('x1', x1)
				.attr('y1', y1)
				.attr('x2', x2)
				.attr('y2', y2)
				.attr('stroke', '#3B82F6')
				.attr('stroke-width', 3)
				.attr('stroke-linecap', 'round');
		}

		// Inner circle
		gearGroup.append('circle')
			.attr('r', 15)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2);

		// Center dot
		gearGroup.append('circle')
			.attr('r', 4)
			.attr('fill', '#3B82F6');

		// Rotate gear continuously
		function rotateGear() {
			gearGroup
				.transition()
				.duration(4000)
				.ease(d3.easeLinear)
				.attr('transform', `translate(${centerX}, ${centerY}) rotate(360)`)
				.on('end', function() {
					gearGroup.attr('transform', `translate(${centerX}, ${centerY}) rotate(0)`);
					rotateGear();
				});
		}

		rotateGear();

		// Pulse hub outer circle
		function pulseHub() {
			hub.select('circle:first-child')
				.transition()
				.duration(2000)
				.attr('r', 40)
				.attr('opacity', 0.6)
				.transition()
				.duration(2000)
				.attr('r', 35)
				.attr('opacity', 1)
				.on('end', pulseHub);
		}

		pulseHub();

		// Draw system nodes
		const systemGroups = svg.selectAll('.system-node')
			.data(systems)
			.enter()
			.append('g')
			.attr('class', 'system-node')
			.attr('transform', d => `translate(${d.x}, ${d.y})`);

		// System boxes
		systemGroups.append('rect')
			.attr('x', -25)
			.attr('y', -15)
			.attr('width', 50)
			.attr('height', 30)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', d => d.color)
			.attr('stroke-width', 2);

		// System labels
		systemGroups.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.attr('fill', d => d.color)
			.attr('font-size', '10px')
			.attr('font-weight', 'bold')
			.text(d => d.label);

		// Connection lines (initially hidden)
		const connections = [];
		systems.forEach(system => {
			const line = svg.append('line')
				.attr('x1', system.x)
				.attr('y1', system.y)
				.attr('x2', centerX)
				.attr('y2', centerY)
				.attr('stroke', system.color)
				.attr('stroke-width', 2)
				.attr('opacity', 0)
				.attr('stroke-dasharray', '4,4');

			connections.push({ line, system });
		});

		// Animate connections and data flow
		let connectionIndex = 0;

		function animateConnection() {
			const conn = connections[connectionIndex];
			const system = conn.system;

			// Show connection
			conn.line
				.transition()
				.duration(300)
				.attr('opacity', 0.6)
				.attr('stroke-width', 2.5);

			// Create data packet
			const packet = svg.append('circle')
				.attr('cx', system.x)
				.attr('cy', system.y)
				.attr('r', 4)
				.attr('fill', system.color)
				.style('filter', 'drop-shadow(0 0 4px ' + system.color + ')');

			// Animate packet to hub
			packet
				.transition()
				.duration(1000)
				.ease(d3.easeCubicInOut)
				.attr('cx', centerX)
				.attr('cy', centerY)
				.attr('r', 2)
				.on('end', function() {
					d3.select(this).remove();

					// Hide connection after packet arrives
					conn.line
						.transition()
						.duration(300)
						.attr('opacity', 0)
						.attr('stroke-width', 2);

					// Create output packets to other systems
					const otherSystems = systems.filter(s => s.id !== system.id);

					otherSystems.forEach((targetSystem, i) => {
						setTimeout(() => {
							const outPacket = svg.append('circle')
								.attr('cx', centerX)
								.attr('cy', centerY)
								.attr('r', 2)
								.attr('fill', '#3B82F6')
								.style('filter', 'drop-shadow(0 0 4px #3B82F6)');

							outPacket
								.transition()
								.duration(800)
								.ease(d3.easeCubicOut)
								.attr('cx', targetSystem.x)
								.attr('cy', targetSystem.y)
								.attr('r', 4)
								.attr('fill', targetSystem.color)
								.on('end', function() {
									// Flash target system
									systemGroups.filter(g => g.id === targetSystem.id)
										.select('rect')
										.transition()
										.duration(200)
										.attr('fill', targetSystem.color)
										.attr('fill-opacity', 0.2)
										.transition()
										.duration(200)
										.attr('fill', 'none');

									d3.select(this).remove();
								});
						}, i * 150);
					});
				});

			// Move to next connection
			connectionIndex = (connectionIndex + 1) % connections.length;
			setTimeout(animateConnection, 2500);
		}

		// Start animation after delay
		setTimeout(animateConnection, 1000);

		// Pulse system nodes
		function pulseNodes() {
			systemGroups.selectAll('rect')
				.transition()
				.duration(2000)
				.delay((d, i) => i * 500)
				.attr('stroke-width', 3)
				.transition()
				.duration(2000)
				.attr('stroke-width', 2)
				.on('end', function(d, i) {
					if (i === systems.length - 1) {
						setTimeout(pulseNodes, 3000);
					}
				});
		}

		pulseNodes();
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

	// Animation 5: Softwares Personalizados - Modular architecture with code compilation
	function createSoftwaresAnimation(container) {
		const width = 280;
		const height = 200;

		const svg = d3.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const centerX = width / 2;
		const centerY = height / 2;

		// Module components (building blocks)
		const modules = [
			{ id: 1, x: 70, y: 60, size: 35, color: '#3B82F6', label: 'API' },
			{ id: 2, x: 210, y: 60, size: 35, color: '#10B981', label: 'UI' },
			{ id: 3, x: 70, y: 140, size: 35, color: '#F59E0B', label: 'DB' },
			{ id: 4, x: 210, y: 140, size: 35, color: '#EF4444', label: 'LOG' }
		];

		// Central processor/core
		svg.append('circle')
			.attr('cx', centerX)
			.attr('cy', centerY)
			.attr('r', 25)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2.5)
			.attr('opacity', 0.6);

		svg.append('text')
			.attr('x', centerX)
			.attr('y', centerY)
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.attr('fill', '#3B82F6')
			.attr('font-size', '12px')
			.attr('font-weight', 'bold')
			.text('CORE');

		// Create module blocks
		const moduleGroups = svg.selectAll('.module')
			.data(modules)
			.enter()
			.append('g')
			.attr('class', 'module')
			.attr('transform', d => `translate(${d.x}, ${d.y})`);

		moduleGroups.append('rect')
			.attr('x', -17.5)
			.attr('y', -17.5)
			.attr('width', 35)
			.attr('height', 35)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', d => d.color)
			.attr('stroke-width', 2);

		moduleGroups.append('text')
			.attr('text-anchor', 'middle')
			.attr('dy', '0.35em')
			.attr('fill', d => d.color)
			.attr('font-size', '10px')
			.attr('font-weight', 'bold')
			.text(d => d.label);

		// Connection lines (data flow)
		const connections = [
			{ from: modules[0], to: { x: centerX, y: centerY } },
			{ from: modules[1], to: { x: centerX, y: centerY } },
			{ from: modules[2], to: { x: centerX, y: centerY } },
			{ from: modules[3], to: { x: centerX, y: centerY } }
		];

		const lines = svg.selectAll('.connection')
			.data(connections)
			.enter()
			.append('line')
			.attr('class', 'connection')
			.attr('x1', d => d.from.x)
			.attr('y1', d => d.from.y)
			.attr('x2', d => d.to.x)
			.attr('y2', d => d.to.y)
			.attr('stroke', '#334155')
			.attr('stroke-width', 1.5)
			.attr('opacity', 0.3)
			.attr('stroke-dasharray', '4,4');

		// Data packets traveling
		function animateDataFlow() {
			connections.forEach((conn, i) => {
				const packet = svg.append('circle')
					.attr('cx', conn.from.x)
					.attr('cy', conn.from.y)
					.attr('r', 3)
					.attr('fill', modules[i].color)
					.attr('opacity', 0.8);

				packet.transition()
					.duration(1500)
					.ease(d3.easeLinear)
					.attr('cx', conn.to.x)
					.attr('cy', conn.to.y)
					.on('end', function() {
						d3.select(this).remove();
					});
			});
		}

		// Code stream
		const codeGroup = svg.append('g').attr('class', 'code-stream');

		function generateCodeStream() {
			const codes = ['0', '1', '01', '10', '11', '00'];
			const code = codes[Math.floor(Math.random() * codes.length)];
			const startX = Math.random() * width;

			const text = codeGroup.append('text')
				.attr('x', startX)
				.attr('y', -10)
				.attr('fill', '#10B981')
				.attr('font-size', '10px')
				.attr('font-family', 'monospace')
				.attr('opacity', 0.6)
				.text(code);

			text.transition()
				.duration(3000)
				.ease(d3.easeLinear)
				.attr('y', height + 10)
				.attr('opacity', 0)
				.on('end', function() {
					d3.select(this).remove();
				});
		}

		setInterval(animateDataFlow, 2000);
		setInterval(generateCodeStream, 400);
		animateDataFlow();
		generateCodeStream();
	}

	// Animation 6: Design Digital - Creative canvas with shapes
	function createDesignAnimation(container) {
		const width = 280;
		const height = 200;

		const svg = d3.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const centerX = width / 2;
		const centerY = height / 2;
		const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

		// Canvas frame
		svg.append('rect')
			.attr('x', 30)
			.attr('y', 20)
			.attr('width', 220)
			.attr('height', 160)
			.attr('rx', 4)
			.attr('fill', 'none')
			.attr('stroke', '#334155')
			.attr('stroke-width', 2)
			.attr('opacity', 0.4);

		// Color palette
		const paletteY = [40, 70, 100, 130, 160];
		svg.selectAll('.palette-color')
			.data(colors)
			.enter()
			.append('circle')
			.attr('cx', 15)
			.attr('cy', (d, i) => paletteY[i])
			.attr('r', 6)
			.attr('fill', d => d)
			.attr('stroke', '#1E293B')
			.attr('stroke-width', 1.5)
			.attr('opacity', 0.8);

		const designGroup = svg.append('g')
			.attr('transform', 'translate(30, 20)');

		const shapes = [
			{ type: 'circle', x: 50, y: 40, r: 20 },
			{ type: 'rect', x: 120, y: 25, width: 40, height: 40 },
			{ type: 'triangle', x: 180, y: 50 }
		];

		// Animated circle
		const circle = designGroup.append('circle')
			.attr('cx', shapes[0].x)
			.attr('cy', shapes[0].y)
			.attr('r', 0)
			.attr('fill', colors[0])
			.attr('opacity', 0.6);

		function animateCircle() {
			circle.transition()
				.duration(2000)
				.attr('r', shapes[0].r)
				.attr('fill', colors[Math.floor(Math.random() * colors.length)])
				.transition()
				.duration(2000)
				.attr('r', 0)
				.on('end', animateCircle);
		}

		// Animated rectangle
		const rect = designGroup.append('rect')
			.attr('x', shapes[1].x)
			.attr('y', shapes[1].y)
			.attr('width', 0)
			.attr('height', 0)
			.attr('rx', 4)
			.attr('fill', colors[1])
			.attr('opacity', 0.6);

		function animateRect() {
			rect.transition()
				.duration(2000)
				.delay(500)
				.attr('width', shapes[1].width)
				.attr('height', shapes[1].height)
				.attr('fill', colors[Math.floor(Math.random() * colors.length)])
				.transition()
				.duration(2000)
				.attr('width', 0)
				.attr('height', 0)
				.attr('x', shapes[1].x + shapes[1].width / 2)
				.attr('y', shapes[1].y + shapes[1].height / 2)
				.on('end', function() {
					d3.select(this)
						.attr('x', shapes[1].x)
						.attr('y', shapes[1].y);
					animateRect();
				});
		}

		// Animated triangle
		const trianglePoints = [
			[shapes[2].x, shapes[2].y - 20],
			[shapes[2].x - 20, shapes[2].y + 15],
			[shapes[2].x + 20, shapes[2].y + 15]
		];

		const triangle = designGroup.append('polygon')
			.attr('points', `${shapes[2].x},${shapes[2].y}`)
			.attr('fill', colors[2])
			.attr('opacity', 0.6);

		function animateTriangle() {
			triangle.transition()
				.duration(2000)
				.delay(1000)
				.attr('points', trianglePoints.map(p => p.join(',')).join(' '))
				.attr('fill', colors[Math.floor(Math.random() * colors.length)])
				.transition()
				.duration(2000)
				.attr('points', `${shapes[2].x},${shapes[2].y}`)
				.on('end', animateTriangle);
		}

		// Bezier curves
		const curveGroup = designGroup.append('g');

		function createCurve() {
			const startX = Math.random() * 220;
			const startY = Math.random() * 160;
			const endX = Math.random() * 220;
			const endY = Math.random() * 160;
			const cp1X = Math.random() * 220;
			const cp1Y = Math.random() * 160;

			const pathData = `M ${startX} ${startY} Q ${cp1X} ${cp1Y} ${endX} ${endY}`;

			const curve = curveGroup.append('path')
				.attr('d', pathData)
				.attr('fill', 'none')
				.attr('stroke', colors[Math.floor(Math.random() * colors.length)])
				.attr('stroke-width', 2)
				.attr('opacity', 0);

			const pathLength = curve.node().getTotalLength();

			curve
				.attr('stroke-dasharray', pathLength)
				.attr('stroke-dashoffset', pathLength)
				.transition()
				.duration(2000)
				.attr('opacity', 0.4)
				.attr('stroke-dashoffset', 0)
				.transition()
				.duration(1000)
				.attr('opacity', 0)
				.on('end', function() {
					d3.select(this).remove();
				});
		}

		animateCircle();
		animateRect();
		animateTriangle();
		setInterval(createCurve, 1500);
		createCurve();
	}

	// Initialize animations with Intersection Observer for better performance
	const serviceCards = document.querySelectorAll('.service-card');

	if (serviceCards.length >= 3) {
		// Map of service cards to their animation functions
		const animationMap = [
			createMediaPagaAnimation,      // Service 1: Mídia Paga
			createAutomacaoAnimation,      // Service 2: Automação
			createAnaliseAnimation,        // Service 3: Análise de Dados
			createSitesAnimation,          // Service 4: Sites e Landing Pages
			createSoftwaresAnimation,      // Service 5: Softwares Personalizados
			createDesignAnimation          // Service 6: Design Digital
		];

		// Use Intersection Observer to only initialize animations when visible
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const card = entry.target;
					const index = Array.from(serviceCards).indexOf(card);
					const container = card.querySelector('.service-illustration');

					if (container && animationMap[index]) {
						animationMap[index](container);
						observer.unobserve(card); // Stop observing after initialization
					}
				}
			});
		}, {
			rootMargin: '50px', // Start loading slightly before it comes into view
			threshold: 0.1
		});

		// Observe all service cards
		serviceCards.forEach(card => observer.observe(card));
	}
});
