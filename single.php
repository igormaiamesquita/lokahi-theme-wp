<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package lokahi-digital
 */

get_header();
?>

	<main id="primary" class="site-main single-post-page">

		<?php
		while ( have_posts() ) :
			the_post();
			?>

			<article id="post-<?php the_ID(); ?>" <?php post_class( 'single-post-article' ); ?>>

				<header class="single-post-header">
					<div class="single-post-header-container">

						<div class="post-meta-top">
							<span class="post-reading-time">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="12" cy="12" r="10"></circle>
									<polyline points="12 6 12 12 16 14"></polyline>
								</svg>
								<?php
								$word_count = str_word_count( strip_tags( get_the_content() ) );
								$reading_time = ceil( $word_count / 200 );
								echo $reading_time . ' min de leitura';
								?>
							</span>
						</div>

						<?php the_title( '<h1 class="single-post-title">', '</h1>' ); ?>

						<?php if ( has_excerpt() ) : ?>
							<div class="single-post-excerpt">
								<?php the_excerpt(); ?>
							</div>
						<?php endif; ?>

					</div>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<div class="single-post-featured-image">
						<?php the_post_thumbnail( 'full' ); ?>
					</div>
				<?php endif; ?>

				<div class="single-post-container">
					<div class="single-post-content">
						<?php the_content(); ?>
					</div>

					<!-- Meta info moved to bottom -->
					<footer class="single-post-footer">
						<div class="post-meta-bottom">
							<?php
							$categories = get_the_category();
							if ( ! empty( $categories ) ) :
								?>
								<span class="post-category-badge">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
										<line x1="7" y1="7" x2="7.01" y2="7"></line>
									</svg>
									<a href="<?php echo esc_url( get_category_link( $categories[0]->term_id ) ); ?>">
										<?php echo esc_html( $categories[0]->name ); ?>
									</a>
								</span>
							<?php endif; ?>

							<span class="post-date">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
									<line x1="16" y1="2" x2="16" y2="6"></line>
									<line x1="8" y1="2" x2="8" y2="6"></line>
									<line x1="3" y1="10" x2="21" y2="10"></line>
								</svg>
								<?php echo get_the_date(); ?>
							</span>
						</div>

						<?php
						$tags = get_the_tags();
						if ( $tags ) :
							?>
							<div class="post-tags">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
									<line x1="7" y1="7" x2="7.01" y2="7"></line>
								</svg>
								<?php
								foreach ( $tags as $tag ) {
									echo '<a href="' . esc_url( get_tag_link( $tag->term_id ) ) . '" class="tag-link">' . esc_html( $tag->name ) . '</a>';
								}
								?>
							</div>
						<?php endif; ?>
					</footer>

				</div><!-- .single-post-container -->

				<!-- Related Posts Section -->
				<?php
				$categories = get_the_category();
				if ( ! empty( $categories ) ) :
					$category_ids = array();
					foreach ( $categories as $category ) {
						$category_ids[] = $category->term_id;
					}

					$related_args = array(
						'category__in'        => $category_ids,
						'post__not_in'        => array( get_the_ID() ),
						'posts_per_page'      => 3,
						'ignore_sticky_posts' => 1,
					);

					$related_query = new WP_Query( $related_args );

					if ( $related_query->have_posts() ) :
						?>
						<section class="related-posts-section">
							<div class="related-posts-container">
								<h2 class="related-posts-title">Posts Relacionados</h2>
								<div class="related-posts-grid">
									<?php
									while ( $related_query->have_posts() ) :
										$related_query->the_post();
										?>
										<article class="related-post-card">
											<?php if ( has_post_thumbnail() ) : ?>
												<div class="related-post-thumbnail">
													<a href="<?php the_permalink(); ?>">
														<?php the_post_thumbnail( 'medium' ); ?>
													</a>
												</div>
											<?php endif; ?>
											<div class="related-post-content">
												<h3 class="related-post-title">
													<a href="<?php the_permalink(); ?>">
														<?php the_title(); ?>
													</a>
												</h3>
												<div class="related-post-meta">
													<span class="related-post-date">
														<?php echo get_the_date(); ?>
													</span>
												</div>
											</div>
										</article>
										<?php
									endwhile;
									wp_reset_postdata();
									?>
								</div>
							</div>
						</section>
						<?php
					endif;
				endif;
				?>

				<nav class="post-navigation">
					<div class="post-navigation-container">
						<?php
						$prev_post = get_previous_post();
						$next_post = get_next_post();
						?>

						<?php if ( $prev_post ) : ?>
							<div class="nav-previous">
								<span class="nav-label">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="15 18 9 12 15 6"></polyline>
									</svg>
									Post Anterior
								</span>
								<a href="<?php echo esc_url( get_permalink( $prev_post ) ); ?>" class="nav-title">
									<?php echo esc_html( get_the_title( $prev_post ) ); ?>
								</a>
							</div>
						<?php endif; ?>

						<?php if ( $next_post ) : ?>
							<div class="nav-next">
								<span class="nav-label">
									Próximo Post
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="9 18 15 12 9 6"></polyline>
									</svg>
								</span>
								<a href="<?php echo esc_url( get_permalink( $next_post ) ); ?>" class="nav-title">
									<?php echo esc_html( get_the_title( $next_post ) ); ?>
								</a>
							</div>
						<?php endif; ?>
					</div>
				</nav><!-- .post-navigation -->

			</article><!-- #post-<?php the_ID(); ?> -->

			<?php
			// If comments are open or we have at least one comment, load up the comment template.
			if ( comments_open() || get_comments_number() ) :
				?>
				<div class="comments-section-container">
					<?php comments_template(); ?>
				</div>
			<?php endif; ?>

			<?php
		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php
get_footer();
