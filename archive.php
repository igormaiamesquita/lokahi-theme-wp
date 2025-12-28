<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package lokahi-digital
 */

get_header();
?>

	<main id="primary" class="site-main archive-page">

		<?php if ( have_posts() ) : ?>

			<header class="archive-header">
				<div class="archive-header-container">
					<?php
					the_archive_title( '<h1 class="archive-title">', '</h1>' );
					the_archive_description( '<div class="archive-description">', '</div>' );
					?>
				</div>
			</header><!-- .archive-header -->

			<div class="archive-container">
				<div class="archive-posts-grid">
					<?php
					/* Start the Loop */
					while ( have_posts() ) :
						the_post();
						?>

						<article id="post-<?php the_ID(); ?>" <?php post_class( 'archive-post-card' ); ?>>

							<?php if ( has_post_thumbnail() ) : ?>
								<div class="post-thumbnail">
									<a href="<?php the_permalink(); ?>">
										<?php the_post_thumbnail( 'large' ); ?>
									</a>
								</div>
							<?php endif; ?>

							<div class="post-content">
								<div class="post-meta">
									<span class="post-date">
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
											<line x1="16" y1="2" x2="16" y2="6"></line>
											<line x1="8" y1="2" x2="8" y2="6"></line>
											<line x1="3" y1="10" x2="21" y2="10"></line>
										</svg>
										<?php echo get_the_date(); ?>
									</span>

									<?php
									$categories = get_the_category();
									if ( ! empty( $categories ) ) :
										?>
										<span class="post-category">
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
												<line x1="7" y1="7" x2="7.01" y2="7"></line>
											</svg>
											<a href="<?php echo esc_url( get_category_link( $categories[0]->term_id ) ); ?>">
												<?php echo esc_html( $categories[0]->name ); ?>
											</a>
										</span>
									<?php endif; ?>
								</div>

								<header class="entry-header">
									<?php the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' ); ?>
								</header>

								<div class="entry-excerpt">
									<?php echo wp_trim_words( get_the_excerpt(), 20, '...' ); ?>
								</div>

								<footer class="entry-footer">
									<a href="<?php the_permalink(); ?>" class="read-more-link">
										Ler mais
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
				</div><!-- .archive-posts-grid -->

				<nav class="archive-pagination">
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

			</div><!-- .archive-container -->

		<?php else : ?>

			<div class="archive-container">
				<div class="no-posts-found">
					<div class="no-posts-icon">
						<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.35-4.35"></path>
						</svg>
					</div>
					<h2>Nenhum conteúdo encontrado</h2>
					<p>Não encontramos nenhum post nesta categoria.</p>
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
						Voltar para o Início
					</a>
				</div>
			</div>

		<?php endif; ?>

	</main><!-- #main -->

<?php
get_footer();
