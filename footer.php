<?php
/**
 * The footer for Lokahi Digital theme
 *
 * Contains the closing of the #content div and all content after
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package lokahi-digital
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="footer-container">
			<div class="footer-content">
				<div class="footer-branding">
					<p class="footer-logo">Lokahi Digital</p>
					<p class="footer-tagline">Performance, Dados e Resultados</p>
				</div>

				<?php if ( has_nav_menu( 'footer' ) ) : ?>
					<nav class="footer-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Footer Menu', 'lokahi-digital' ); ?>">
						<?php
						wp_nav_menu(
							array(
								'theme_location' => 'footer',
								'menu_id'        => 'footer-menu',
								'menu_class'     => 'footer-menu',
								'container'      => false,
								'depth'          => 1,
							)
						);
						?>
					</nav>
				<?php endif; ?>
			</div>

			<div class="footer-bottom">
				<p class="copyright">
					&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> Lokahi Digital.
					<?php esc_html_e( 'Todos os direitos reservados.', 'lokahi-digital' ); ?>
				</p>
			</div>
		</div><!-- .footer-container -->
	</footer><!-- #colophon -->

</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
