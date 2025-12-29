<?php
/**
 * lokahi-digital functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package lokahi-digital
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function lokahi_digital_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on lokahi-digital, use a find and replace
		* to change 'lokahi-digital' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'lokahi-digital', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// Register navigation menus
	register_nav_menus(
		array(
			'primary' => esc_html__( 'Primary Menu', 'lokahi-digital' ),
			'footer'  => esc_html__( 'Footer Menu', 'lokahi-digital' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'lokahi_digital_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'lokahi_digital_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function lokahi_digital_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'lokahi_digital_content_width', 640 );
}
add_action( 'after_setup_theme', 'lokahi_digital_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function lokahi_digital_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'lokahi-digital' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'lokahi-digital' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'lokahi_digital_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function lokahi_digital_scripts() {
	// Main stylesheet
	wp_enqueue_style( 'lokahi-digital-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'lokahi-digital-style', 'rtl', 'replace' );

	// Navigation script
	wp_enqueue_script( 'lokahi-digital-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	// Carregar D3.js na homepage e na página 404
	if ( is_front_page() || is_404() ) {
		// D3.js minificado (defer adicionado via filtro)
		wp_enqueue_script( 'd3-js', 'https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js', array(), '7', true );
	}

	// Carregar scripts específicos da homepage
	if ( is_front_page() ) {
		// TopoJSON minificado (required for globe)
		wp_enqueue_script( 'topojson-js', 'https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js', array(), '3', true );

		// Anime.js minificado
		wp_enqueue_script( 'anime-js', 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js', array(), '3.2.1', true );

		// Globe script (depends on D3 and TopoJSON)
		wp_enqueue_script( 'lokahi-digital-globe', get_template_directory_uri() . '/js/globe.js', array( 'd3-js', 'topojson-js' ), _S_VERSION, true );

		// Service animations script (depends on D3)
		wp_enqueue_script( 'lokahi-digital-service-animations', get_template_directory_uri() . '/js/service-animations.js', array( 'd3-js' ), _S_VERSION, true );

		// Custom animations script (depends on anime.js)
		wp_enqueue_script( 'lokahi-digital-animations', get_template_directory_uri() . '/js/animations.js', array( 'anime-js' ), _S_VERSION, true );
	}

	// Comment reply script
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'lokahi_digital_scripts' );

/**
 * Add defer attribute to scripts for better performance
 */
function lokahi_digital_defer_scripts( $tag, $handle, $src ) {
	// Scripts que devem ter defer
	$defer_scripts = array(
		'd3-js',
		'topojson-js',
		'anime-js',
		'lokahi-digital-globe',
		'lokahi-digital-service-animations',
		'lokahi-digital-animations',
	);

	if ( in_array( $handle, $defer_scripts, true ) ) {
		return str_replace( ' src', ' defer src', $tag );
	}

	return $tag;
}
add_filter( 'script_loader_tag', 'lokahi_digital_defer_scripts', 10, 3 );

/**
 * Add preconnect to CDN domains for better performance
 */
function lokahi_digital_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type && is_front_page() ) {
		$urls[] = array(
			'href' => 'https://cdn.jsdelivr.net',
			'crossorigin',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'lokahi_digital_resource_hints', 10, 2 );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

