<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package lokahi-digital
 */

get_header();
?>

	<main id="primary" class="site-main search-page">

		<?php if ( have_posts() ) : ?>

			<header class="search-header">
				<div class="search-header-container">
					<div class="search-icon">
						<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.35-4.35"></path>
						</svg>
					</div>
					<h1 class="search-title">
						Resultados da busca
					</h1>
					<p class="search-query">
						<?php
						/* translators: %s: search query. */
						printf(
							esc_html__( 'Você pesquisou por: %s', 'lokahi-digital' ),
							'<span class="search-term">"' . get_search_query() . '"</span>'
						);
						?>
					</p>
					<p class="search-count">
						<?php
						global $wp_query;
						$total_results = $wp_query->found_posts;
						printf(
							_n(
								'%s resultado encontrado',
								'%s resultados encontrados',
								$total_results,
								'lokahi-digital'
							),
							'<strong>' . number_format_i18n( $total_results ) . '</strong>'
						);
						?>
					</p>
				</div>
			</header><!-- .search-header -->

			<div class="search-container">
				<div class="search-results-grid">
					<?php
					/* Start the Loop */
					while ( have_posts() ) :
						the_post();
						?>

						<article id="post-<?php the_ID(); ?>" <?php post_class( 'search-result-card' ); ?>>

							<?php if ( has_post_thumbnail() ) : ?>
								<div class="result-thumbnail">
									<a href="<?php the_permalink(); ?>">
										<?php the_post_thumbnail( 'medium' ); ?>
									</a>
								</div>
							<?php endif; ?>

							<div class="result-content">
								<div class="result-meta">
									<span class="result-type">
										<?php
										$post_type_obj = get_post_type_object( get_post_type() );
										echo esc_html( $post_type_obj->labels->singular_name );
										?>
									</span>

									<span class="result-date">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
											<line x1="16" y1="2" x2="16" y2="6"></line>
											<line x1="8" y1="2" x2="8" y2="6"></line>
											<line x1="3" y1="10" x2="21" y2="10"></line>
										</svg>
										<?php echo get_the_date(); ?>
									</span>

									<?php
									if ( 'post' === get_post_type() ) {
										$categories = get_the_category();
										if ( ! empty( $categories ) ) :
											?>
											<span class="result-category">
												<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
													<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
													<line x1="7" y1="7" x2="7.01" y2="7"></line>
												</svg>
												<a href="<?php echo esc_url( get_category_link( $categories[0]->term_id ) ); ?>">
													<?php echo esc_html( $categories[0]->name ); ?>
												</a>
											</span>
										<?php endif; ?>
									<?php } ?>
								</div>

								<header class="result-header">
									<?php the_title( '<h2 class="result-title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' ); ?>
								</header>

								<div class="result-excerpt">
									<?php
									$excerpt = get_the_excerpt();
									$search_query = get_search_query();

									// Highlight search term
									if ( $search_query ) {
										$excerpt = str_ireplace(
											$search_query,
											'<mark>' . $search_query . '</mark>',
											$excerpt
										);
									}

									echo wp_trim_words( $excerpt, 25, '...' );
									?>
								</div>

								<footer class="result-footer">
									<a href="<?php the_permalink(); ?>" class="result-link">
										Ver conteúdo completo
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<polyline points="9 18 15 12 9 6"></polyline>
										</svg>
									</a>
								</footer>
							</div>

						</article>

						<?php
					endwhile;
					?>
				</div><!-- .search-results-grid -->

				<nav class="search-pagination">
					<?php
					the_posts_pagination(
						array(
							'mid_size'  => 2,
							'prev_text' => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg> Anterior',
							'next_text' => 'Próximo <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>',
						)
					);
					?>
				</nav>

			</div><!-- .search-container -->

		<?php else : ?>

			<div class="search-container">
				<div class="no-results-found">
					<div class="no-results-animation">
						<svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.35-4.35"></path>
							<line x1="11" y1="8" x2="11" y2="14"></line>
							<line x1="11" y1="16" x2="11.01" y2="16"></line>
						</svg>
					</div>
					<h2>Nenhum resultado encontrado</h2>
					<p>Desculpe, não encontramos nenhum resultado para "<strong><?php echo get_search_query(); ?></strong>".</p>

					<div class="search-suggestions">
						<h3>Sugestões:</h3>
						<ul>
							<li>Verifique se todas as palavras estão escritas corretamente</li>
							<li>Tente usar palavras-chave diferentes</li>
							<li>Tente usar termos mais genéricos</li>
							<li>Tente usar menos palavras-chave</li>
						</ul>
					</div>

					<div class="search-again">
						<h3>Fazer uma nova busca:</h3>
						<?php get_search_form(); ?>
					</div>

					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
							<polyline points="9 22 9 12 15 12 15 22"></polyline>
						</svg>
						Voltar para o Início
					</a>
				</div>
			</div>

		<?php endif; ?>

	</main><!-- #main -->

<?php
get_footer();
