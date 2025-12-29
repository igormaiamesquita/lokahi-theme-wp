<?php
/**
 * Front Page Template - One Page Layout
 *
 * Displays the main landing page for Lokahi Digital
 * with all sections in a single-page layout
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package lokahi-digital
 */

get_header();
?>

<main id="primary" class="site-main">

	<!-- Hero Section -->
	<section id="inicio" class="hero-section">
		<div class="hero-container">
			<h1 class="hero-title">
				Performance digital com dados, estratégia e execução
			</h1>

			<!-- Hero Visual - Interactive Globe -->
			<div class="hero-visual">
				<div class="globe-container"></div>
				<div class="globe-country-label">
					<span class="globe-country-text">Trabalhos realizados em <strong id="current-country">Brasil</strong></span>
				</div>
			</div>

			<p class="hero-subtitle">
				Especialistas em mídia paga, automação de marketing e análise de dados.
				Transformamos investimento em performance mensurável.
			</p>

			<div class="hero-cta">
				<a href="#contato" class="btn btn-primary">Discutir performance</a>
			</div>
		</div>
	</section><!-- .hero-section -->

	<!-- Services Section -->
	<section id="servicos" class="services-section">
		<div class="services-container">
			<div class="section-header">
				<h2 class="section-title">Serviços</h2>
				<p class="section-description">
					Atuação focada em performance, mensuração e crescimento sustentável
				</p>
			</div>

			<div class="services-grid">
				<!-- Service 1 -->
				<article class="service-card" data-animate="service">
					<div class="service-illustration"></div>
					<div class="service-icon-badge">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 16 14"></polyline>
						</svg>
					</div>
					<h3 class="service-title">Mídia Paga</h3>
					<p class="service-description">
						Gestão técnica e estratégica de campanhas em Google Ads, Meta Ads e LinkedIn Ads com foco em performance e ROI mensurável.
					</p>
					<a href="https://wa.me/5511991585963" target="_blank" rel="noopener noreferrer" class="service-btn">
						<span>Discutir performance</span>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</a>
				</article>

				<!-- Service 2 -->
				<article class="service-card" data-animate="service">
					<div class="service-illustration"></div>
					<div class="service-icon-badge">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
							<line x1="9" y1="9" x2="15" y2="9"></line>
							<line x1="9" y1="15" x2="15" y2="15"></line>
						</svg>
					</div>
					<h3 class="service-title">Automação e Integrações</h3>
					<p class="service-description">
						Implementação de automações de marketing e integração de ferramentas. Fluxos inteligentes que conectam dados e geram eficiência.
					</p>
					<a href="https://wa.me/5511991585963" target="_blank" rel="noopener noreferrer" class="service-btn">
						<span>Discutir performance</span>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</a>
				</article>

				<!-- Service 3 -->
				<article class="service-card" data-animate="service">
					<div class="service-illustration"></div>
					<div class="service-icon-badge">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
						</svg>
					</div>
					<h3 class="service-title">Análise de Dados</h3>
					<p class="service-description">
						Configuração de tracking, análise de comportamento e construção de dashboards. Transformamos dados em insights acionáveis.
					</p>
					<a href="https://wa.me/5511991585963" target="_blank" rel="noopener noreferrer" class="service-btn">
						<span>Discutir performance</span>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</a>
				</article>

				<!-- Service 4 -->
				<article class="service-card" data-animate="service">
					<div class="service-illustration"></div>
					<div class="service-icon-badge">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
							<line x1="8" y1="21" x2="16" y2="21"></line>
							<line x1="12" y1="17" x2="12" y2="21"></line>
						</svg>
					</div>
					<h3 class="service-title">Sites e Landing Pages</h3>
					<p class="service-description">
						Desenvolvimento focado em conversão, performance e experiência. Páginas rápidas, responsivas e orientadas a resultados.
					</p>
					<a href="https://wa.me/5511991585963" target="_blank" rel="noopener noreferrer" class="service-btn">
						<span>Discutir performance</span>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</a>
				</article>

				<!-- Service 5 -->
				<article class="service-card" data-animate="service">
					<div class="service-illustration"></div>
					<div class="service-icon-badge">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="16 18 22 12 16 6"></polyline>
							<polyline points="8 6 2 12 8 18"></polyline>
						</svg>
					</div>
					<h3 class="service-title">Softwares Personalizados</h3>
					<p class="service-description">
						Desenvolvimento de soluções sob medida com arquitetura escalável e código otimizado. Sistemas robustos que crescem junto com seu negócio.
					</p>
					<a href="https://wa.me/5511991585963" target="_blank" rel="noopener noreferrer" class="service-btn">
						<span>Discutir performance</span>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</a>
				</article>

				<!-- Service 6 -->
				<article class="service-card" data-animate="service">
					<div class="service-illustration"></div>
					<div class="service-icon-badge">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M12 19l7-7 3 3-7 7-3-3z"></path>
							<path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
							<path d="M2 2l7.586 7.586"></path>
							<circle cx="11" cy="11" r="2"></circle>
						</svg>
					</div>
					<h3 class="service-title">Design Digital</h3>
					<p class="service-description">
						Design estratégico que converte. Branding, interfaces e materiais visuais pensados para engajamento e impacto mensurável.
					</p>
					<a href="https://wa.me/5511991585963" target="_blank" rel="noopener noreferrer" class="service-btn">
						<span>Discutir performance</span>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9 18 15 12 9 6"></polyline>
						</svg>
					</a>
				</article>
			</div><!-- .services-grid -->
		</div><!-- .services-container -->
	</section><!-- .services-section -->

	<!-- Not For Section -->
	<section class="not-for-section">
		<div class="not-for-container">
			<div class="not-for-content" data-animate="fade">
				<h2 class="section-title">Para quem não é</h2>
				<p class="not-for-description">
					Não somos indicados para quem busca soluções rápidas sem processo, ou crescimento sem mensuração.
				</p>
			</div>
		</div>
	</section><!-- .not-for-section -->

	<!-- Clients Carousel Section -->
	<section class="clients-section">
		<div class="clients-container">
			<h2 class="section-title">Clientes</h2>
			<div class="clients-carousel">
				<div class="clients-track">
					<!-- Adicione as logos dos clientes aqui -->
					<!-- Exemplo: -->
					<!-- <div class="client-logo">
						<img src="<?php echo get_template_directory_uri(); ?>/images/clients/logo1.png" alt="Cliente 1">
					</div> -->
					<!-- Para adicionar logos:
					1. Crie uma pasta: wp-content/themes/lokahi-digital/images/clients/
					2. Faça upload das imagens das logos nessa pasta
					3. Descomente e duplique o exemplo acima para cada logo
					-->
				</div>
			</div>
		</div>
	</section><!-- .clients-section -->

	<!-- Experience Section -->
	<section id="experiencia" class="experience-section">
		<div class="experience-container">
			<div class="experience-content" data-animate="fade">
				<h2 class="section-title">Experiência e Atuação</h2>
				<div class="experience-text">
					<p>
						A Lokahi Digital atua com visão estratégica e execução prática em marketing digital.
						Trabalhamos com análise técnica, dados reais e metodologia orientada a performance.
					</p>
					<p>
						Nossa abordagem combina experiência em gestão de tráfego pago, automação de processos
						e análise comportamental para gerar resultados consistentes e mensuráveis.
					</p>
					<p>
						Não prometemos fórmulas mágicas. Oferecemos trabalho sério, visão analítica e
						comprometimento com crescimento sustentável.
					</p>
				</div>
			</div>
		</div><!-- .experience-container -->
	</section><!-- .experience-section -->

	<!-- Content/Blog Section -->
	<section id="conteudo" class="content-section">
		<div class="content-container">
			<div class="section-header">
				<h2 class="section-title">Conteúdo</h2>
				<p class="section-description">
					Artigos, análises e reflexões sobre marketing digital e performance
				</p>
			</div>

			<div class="posts-grid">
				<?php
				// Query últimos posts
				$recent_posts = new WP_Query(
					array(
						'posts_per_page' => 3,
						'post_status'    => 'publish',
						'orderby'        => 'date',
						'order'          => 'DESC',
					)
				);

				if ( $recent_posts->have_posts() ) :
					while ( $recent_posts->have_posts() ) :
						$recent_posts->the_post();
						?>
						<article class="post-card" data-animate="post">
							<?php if ( has_post_thumbnail() ) : ?>
								<div class="post-thumbnail">
									<a href="<?php the_permalink(); ?>">
										<?php the_post_thumbnail( 'medium' ); ?>
									</a>
								</div>
							<?php endif; ?>
							<div class="post-content">
								<h3 class="post-title">
									<a href="<?php the_permalink(); ?>">
										<?php the_title(); ?>
									</a>
								</h3>
								<div class="post-meta">
									<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
										<?php echo esc_html( get_the_date() ); ?>
									</time>
								</div>
								<div class="post-excerpt">
									<?php the_excerpt(); ?>
								</div>
								<a href="<?php the_permalink(); ?>" class="post-link">
									Ler mais
								</a>
							</div>
						</article>
						<?php
					endwhile;
					wp_reset_postdata();
				else :
					?>
					<p class="no-posts">
						<?php esc_html_e( 'Em breve, novos artigos por aqui.', 'lokahi-digital' ); ?>
					</p>
					<?php
				endif;
				?>
			</div><!-- .posts-grid -->
		</div><!-- .content-container -->
	</section><!-- .content-section -->

	<!-- Contact Section -->
	<section id="contato" class="contact-section">
		<div class="contact-container">
			<div class="contact-content" data-animate="fade">
				<h2 class="section-title">Discutir performance</h2>
				<p class="contact-text">
					Se você busca uma abordagem técnica, estratégica e orientada a dados
					para o seu marketing digital, entre em contato.
				</p>
				<div class="contact-methods">
					<a href="mailto:contato@lokahidigital.com.br" class="contact-button">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
							<polyline points="22,6 12,13 2,6"></polyline>
						</svg>
						<span>contato@lokahidigital.com.br</span>
					</a>
					<a href="https://wa.me/5511991585963" target="_blank" rel="noopener noreferrer" class="contact-button">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
						</svg>
						<span>WhatsApp</span>
					</a>
				</div>
			</div>
		</div><!-- .contact-container -->
	</section><!-- .contact-section -->

</main><!-- #primary -->

<?php
get_footer();
