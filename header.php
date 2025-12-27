<?php
/**
 * The header for Lokahi Digital theme
 *
 * Displays the site header with sticky navigation and anchor menu
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package lokahi-digital
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'lokahi-digital' ); ?></a>

	<!-- Sticky Header -->
	<header id="masthead" class="site-header" role="banner">
		<div class="header-container">
			<div class="site-branding">
				<h1 class="site-logo">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
						Lokahi Digital
					</a>
				</h1>
			</div><!-- .site-branding -->

			<!-- Mobile Menu Toggle -->
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false" aria-label="Menu">
				<span class="menu-toggle-icon"></span>
				<span class="menu-toggle-icon"></span>
				<span class="menu-toggle-icon"></span>
			</button>

			<!-- Primary Navigation -->
			<nav id="site-navigation" class="main-navigation" role="navigation">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'menu_id'        => 'primary-menu',
						'menu_class'     => 'nav-menu',
						'container'      => false,
						'fallback_cb'    => false,
					)
				);
				?>
			</nav><!-- #site-navigation -->
		</div><!-- .header-container -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
