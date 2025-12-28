<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package lokahi-digital
 */

get_header();
?>

	<main id="primary" class="site-main error-404-page">
		<section class="error-404-section">
			<div class="error-404-container">

				<!-- Animated 404 with D3.js -->
				<div class="error-404-visual">
					<div id="error-404-animation"></div>
				</div>

				<div class="error-404-content">
					<h1 class="error-404-title">
						<span class="error-code">404</span>
						<span class="error-subtitle">Página não encontrada</span>
					</h1>

					<div class="error-404-message">
						<p class="error-text-main">
							Parece que você se perdeu no espaço digital... 🚀
						</p>
						<p class="error-text-secondary">
							Essa página foi otimizada para não existir. CPA = R$ 0,00! 📊
						</p>
						<p class="error-text-joke">
							(Não é o tipo de performance que buscamos, mas tecnicamente é eficiente.)
						</p>
					</div>

					<div class="error-404-actions">
						<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary error-btn-home">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
								<polyline points="9 22 9 12 15 12 15 22"></polyline>
							</svg>
							Voltar para o Início
						</a>
						<a href="#contato" class="btn btn-secondary error-btn-contact">
							Reportar Problema
						</a>
					</div>

					<div class="error-404-suggestions">
						<h3>Talvez você esteja procurando por:</h3>
						<ul class="error-suggestions-list">
							<li><a href="<?php echo esc_url( home_url( '/#servicos' ) ); ?>">Nossos Serviços</a></li>
							<li><a href="<?php echo esc_url( home_url( '/#contato' ) ); ?>">Entrar em Contato</a></li>
							<?php if ( has_nav_menu( 'menu-1' ) ) : ?>
								<?php
								wp_nav_menu(
									array(
										'theme_location' => 'menu-1',
										'container'      => false,
										'items_wrap'     => '%3$s',
										'depth'          => 1,
									)
								);
								?>
							<?php endif; ?>
						</ul>
					</div>
				</div>

			</div>
		</section>
	</main><!-- #main -->

	<script>
	// Funny 404 animation with D3.js
	document.addEventListener('DOMContentLoaded', function() {
		const container = document.getElementById('error-404-animation');
		if (!container) return;

		const width = Math.min(500, window.innerWidth - 40);
		const height = 400;

		const svg = d3.select(container)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const centerX = width / 2;
		const centerY = height / 2;

		// Floating lost astronaut
		const astronaut = svg.append('g')
			.attr('class', 'astronaut');

		// Astronaut helmet (circle)
		astronaut.append('circle')
			.attr('cx', centerX)
			.attr('cy', centerY - 60)
			.attr('r', 30)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 3);

		// Visor
		astronaut.append('ellipse')
			.attr('cx', centerX)
			.attr('cy', centerY - 60)
			.attr('rx', 20)
			.attr('ry', 15)
			.attr('fill', 'rgba(59, 130, 246, 0.2)')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 2);

		// Body (rectangle)
		astronaut.append('rect')
			.attr('x', centerX - 25)
			.attr('y', centerY - 25)
			.attr('width', 50)
			.attr('height', 60)
			.attr('rx', 8)
			.attr('fill', 'none')
			.attr('stroke', '#3B82F6')
			.attr('stroke-width', 3);

		// Arms
		['left', 'right'].forEach((side, i) => {
			const x = side === 'left' ? centerX - 25 : centerX + 25;
			astronaut.append('line')
				.attr('x1', x)
				.attr('y1', centerY - 15)
				.attr('x2', x + (side === 'left' ? -20 : 20))
				.attr('y2', centerY + 5)
				.attr('stroke', '#3B82F6')
				.attr('stroke-width', 3)
				.attr('stroke-linecap', 'round');
		});

		// Legs
		['left', 'right'].forEach((side, i) => {
			const x = side === 'left' ? centerX - 12 : centerX + 12;
			astronaut.append('line')
				.attr('x1', x)
				.attr('y1', centerY + 35)
				.attr('x2', x)
				.attr('y2', centerY + 60)
				.attr('stroke', '#3B82F6')
				.attr('stroke-width', 3)
				.attr('stroke-linecap', 'round');
		});

		// Floating animation
		function floatAstronaut() {
			astronaut
				.transition()
				.duration(3000)
				.ease(d3.easeSinInOut)
				.attr('transform', 'translate(0, -20) rotate(5)')
				.transition()
				.duration(3000)
				.ease(d3.easeSinInOut)
				.attr('transform', 'translate(0, 20) rotate(-5)')
				.on('end', floatAstronaut);
		}

		floatAstronaut();

		// Stars
		const stars = [];
		for (let i = 0; i < 30; i++) {
			stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				r: Math.random() * 2 + 1
			});
		}

		svg.selectAll('.star')
			.data(stars)
			.enter()
			.append('circle')
			.attr('class', 'star')
			.attr('cx', d => d.x)
			.attr('cy', d => d.y)
			.attr('r', d => d.r)
			.attr('fill', '#64748B')
			.attr('opacity', 0.6);

		// Twinkling stars
		function twinkleStars() {
			svg.selectAll('.star')
				.transition()
				.duration(1000)
				.delay((d, i) => i * 50)
				.attr('opacity', () => Math.random() * 0.8 + 0.2)
				.on('end', function() {
					d3.select(this)
						.transition()
						.duration(1000)
						.attr('opacity', 0.6);
				});

			setTimeout(twinkleStars, 3000);
		}

		twinkleStars();

		// Floating "404" text particles
		const particles = ['4', '0', '4'];
		const particleGroup = svg.append('g').attr('class', 'particles');

		particles.forEach((char, i) => {
			const particle = particleGroup.append('text')
				.attr('x', centerX - 60 + i * 60)
				.attr('y', centerY + 120)
				.attr('text-anchor', 'middle')
				.attr('fill', '#EF4444')
				.attr('font-size', '48px')
				.attr('font-weight', 'bold')
				.attr('opacity', 0.3)
				.text(char);

			function floatParticle() {
				const randomX = (Math.random() - 0.5) * 40;
				const randomY = (Math.random() - 0.5) * 40;

				particle
					.transition()
					.duration(2000 + Math.random() * 1000)
					.ease(d3.easeSinInOut)
					.attr('transform', `translate(${randomX}, ${randomY})`)
					.attr('opacity', 0.1 + Math.random() * 0.3)
					.on('end', floatParticle);
			}

			setTimeout(() => floatParticle(), i * 300);
		});

		// Sad emoji above astronaut
		const emoji = svg.append('text')
			.attr('x', centerX + 50)
			.attr('y', centerY - 80)
			.attr('text-anchor', 'middle')
			.attr('font-size', '24px')
			.attr('opacity', 0.7)
			.text('😢');

		function floatEmoji() {
			emoji
				.transition()
				.duration(2000)
				.ease(d3.easeSinInOut)
				.attr('y', centerY - 90)
				.transition()
				.duration(2000)
				.ease(d3.easeSinInOut)
				.attr('y', centerY - 80)
				.on('end', floatEmoji);
		}

		floatEmoji();
	});
	</script>

<?php
get_footer();
