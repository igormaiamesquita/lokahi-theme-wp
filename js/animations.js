/**
 * Animations with Anime.js
 *
 * All animations for Lokahi Digital theme
 * Subtle, professional animations using IntersectionObserver and anime.js
 *
 * @package lokahi-digital
 */

(function() {
	'use strict';

	// Wait for DOM to be ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initAnimations);
	} else {
		initAnimations();
	}

	function initAnimations() {
		// Check if anime.js is loaded
		if (typeof anime === 'undefined') {
			console.warn('Anime.js not loaded. Animations disabled.');
			return;
		}

		// Initialize all animation modules
		initHeaderAnimation();
		initHeroAnimation();
		initScrollAnimations();
		initButtonAnimations();
	}

	/**
	 * Header Sticky Animation
	 * Adds shadow and transition when user scrolls
	 */
	function initHeaderAnimation() {
		const header = document.querySelector('.site-header');
		if (!header) return;

		let lastScroll = 0;

		window.addEventListener('scroll', function() {
			const currentScroll = window.pageYOffset;

			if (currentScroll > 50) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}

			lastScroll = currentScroll;
		});
	}

	/**
	 * Hero Section Animation
	 * Animates hero title, subtitle and CTA on page load
	 */
	function initHeroAnimation() {
		const heroTitle = document.querySelector('.hero-title');
		const heroSubtitle = document.querySelector('.hero-subtitle');
		const heroCta = document.querySelector('.hero-cta');

		if (!heroTitle) return;

		// Create timeline for sequential animations
		const timeline = anime.timeline({
			easing: 'easeOutExpo',
		});

		// Animate title
		timeline.add({
			targets: heroTitle,
			opacity: [0, 1],
			translateY: [30, 0],
			duration: 1200,
			delay: 300,
		});

		// Animate subtitle
		timeline.add({
			targets: heroSubtitle,
			opacity: [0, 1],
			translateY: [30, 0],
			duration: 1000,
		}, '-=800'); // Start 800ms before previous animation ends

		// Animate CTA
		timeline.add({
			targets: heroCta,
			opacity: [0, 1],
			translateY: [30, 0],
			duration: 800,
		}, '-=600');
	}

	/**
	 * Scroll-triggered Animations
	 * Uses IntersectionObserver to trigger animations when elements enter viewport
	 */
	function initScrollAnimations() {
		// Options for IntersectionObserver
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1, // Trigger when 10% of element is visible
		};

		// Create observer
		const observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					animateElement(entry.target);
					observer.unobserve(entry.target); // Only animate once
				}
			});
		}, observerOptions);

		// Observe service cards
		const serviceCards = document.querySelectorAll('[data-animate="service"]');
		serviceCards.forEach(function(card, index) {
			observer.observe(card);
			card.setAttribute('data-index', index);
		});

		// Observe post cards
		const postCards = document.querySelectorAll('[data-animate="post"]');
		postCards.forEach(function(card, index) {
			observer.observe(card);
			card.setAttribute('data-index', index);
		});

		// Observe fade elements
		const fadeElements = document.querySelectorAll('[data-animate="fade"]');
		fadeElements.forEach(function(element) {
			observer.observe(element);
		});
	}

	/**
	 * Animate Element
	 * Handles animation based on element type
	 */
	function animateElement(element) {
		const animationType = element.getAttribute('data-animate');
		const index = parseInt(element.getAttribute('data-index') || '0');

		switch(animationType) {
			case 'service':
				animateServiceCard(element, index);
				break;
			case 'post':
				animatePostCard(element, index);
				break;
			case 'fade':
				animateFadeIn(element);
				break;
			default:
				animateFadeIn(element);
		}
	}

	/**
	 * Animate Service Card
	 * Staggered animation for service cards
	 */
	function animateServiceCard(card, index) {
		anime({
			targets: card,
			opacity: [0, 1],
			translateY: [30, 0],
			duration: 800,
			delay: index * 150, // Stagger delay based on index
			easing: 'easeOutCubic',
		});
	}

	/**
	 * Animate Post Card
	 * Staggered animation for blog post cards
	 */
	function animatePostCard(card, index) {
		anime({
			targets: card,
			opacity: [0, 1],
			translateY: [30, 0],
			scale: [0.95, 1],
			duration: 800,
			delay: index * 150,
			easing: 'easeOutCubic',
		});
	}

	/**
	 * Animate Fade In
	 * Simple fade in animation for content sections
	 */
	function animateFadeIn(element) {
		anime({
			targets: element,
			opacity: [0, 1],
			translateY: [30, 0],
			duration: 1000,
			easing: 'easeOutCubic',
		});
	}

	/**
	 * Button Hover Animations
	 * Subtle micro-interactions for buttons and links
	 */
	function initButtonAnimations() {
		// Primary buttons
		const primaryButtons = document.querySelectorAll('.btn-primary');
		primaryButtons.forEach(function(button) {
			button.addEventListener('mouseenter', function() {
				anime({
					targets: button,
					scale: 1.05,
					duration: 300,
					easing: 'easeOutCubic',
				});
			});

			button.addEventListener('mouseleave', function() {
				anime({
					targets: button,
					scale: 1,
					duration: 300,
					easing: 'easeOutCubic',
				});
			});
		});

		// Contact buttons
		const contactButtons = document.querySelectorAll('.contact-button');
		contactButtons.forEach(function(button) {
			button.addEventListener('mouseenter', function() {
				const icon = button.querySelector('svg');
				if (icon) {
					anime({
						targets: icon,
						translateX: [0, 4, 0],
						duration: 600,
						easing: 'easeInOutQuad',
					});
				}
			});
		});

		// Post links
		const postLinks = document.querySelectorAll('.post-link');
		postLinks.forEach(function(link) {
			link.addEventListener('mouseenter', function() {
				anime({
					targets: link,
					translateX: [0, 4],
					duration: 300,
					easing: 'easeOutCubic',
				});
			});

			link.addEventListener('mouseleave', function() {
				anime({
					targets: link,
					translateX: 0,
					duration: 300,
					easing: 'easeOutCubic',
				});
			});
		});
	}

	/**
	 * Smooth Scroll for Anchor Links
	 * Enhanced smooth scrolling for navigation links
	 */
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(function(link) {
		link.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href');

			// Skip if href is just "#"
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				e.preventDefault();

				// Close mobile menu if open
				const nav = document.querySelector('.main-navigation');
				if (nav && nav.classList.contains('toggled')) {
					nav.classList.remove('toggled');
				}

				// Calculate offset (header height)
				const headerHeight = document.querySelector('.site-header').offsetHeight;
				const targetPosition = targetElement.offsetTop - headerHeight;

				// Animate scroll
				anime({
					targets: [document.documentElement, document.body],
					scrollTop: targetPosition,
					duration: 800,
					easing: 'easeInOutCubic',
				});
			}
		});
	});

})();
