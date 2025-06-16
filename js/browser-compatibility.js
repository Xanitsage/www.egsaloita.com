/**
 * Browser Compatibility Script for EGSA Loita Website
 * This script adds JavaScript enhancements for cross-browser compatibility
 */

(function() {
  'use strict';
  
  // Execute when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Detect browser and add appropriate class to body
    detectBrowser();
    
    // Fix viewport height issues on mobile
    fixViewportHeight();
    
    // Fix for object-fit in IE/Edge
    objectFitPolyfill();
    
    // Fix for flexbox in IE
    flexboxPolyfill();
    
    // Fix for position:sticky
    stickyPolyfill();
    
    // Fix for CSS Grid in IE
    gridPolyfill();
    
    // Fix for touch events
    touchEventsPolyfill();
    
    // Fix for responsive tables
    responsiveTables();
    
    // Fix for responsive images
    responsiveImages();
    
    // Fix for iOS hover issues
    iOSHoverFix();
  });
  
  /**
   * Detect browser and add appropriate class to body
   */
  function detectBrowser() {
    var userAgent = navigator.userAgent;
    var html = document.documentElement;
    
    // Detect IE
    if (/MSIE|Trident/.test(userAgent)) {
      html.classList.add('is-ie');
      
      // Detect IE version
      if (/MSIE 9/i.test(userAgent)) {
        html.classList.add('is-ie9');
      } else if (/MSIE 10/i.test(userAgent)) {
        html.classList.add('is-ie10');
      } else if (/Trident\/7\./i.test(userAgent)) {
        html.classList.add('is-ie11');
      }
    }
    
    // Detect Edge (pre-Chromium)
    if (/Edge\/\d./i.test(userAgent) && !/Edg\/\d./i.test(userAgent)) {
      html.classList.add('is-edge-legacy');
    }
    
    // Detect Edge (Chromium-based)
    if (/Edg\/\d./i.test(userAgent)) {
      html.classList.add('is-edge-chromium');
    }
    
    // Detect Firefox
    if (/Firefox\/\d./i.test(userAgent) && !/Seamonkey\/\d./i.test(userAgent)) {
      html.classList.add('is-firefox');
    }
    
    // Detect Safari
    if (/Safari\/\d./i.test(userAgent) && !/Chrome\/\d./i.test(userAgent) && !/Chromium\/\d./i.test(userAgent) && !/Edg\/\d./i.test(userAgent)) {
      html.classList.add('is-safari');
    }
    
    // Detect Chrome
    if (/Chrome\/\d./i.test(userAgent) && !/Edg\/\d./i.test(userAgent)) {
      html.classList.add('is-chrome');
    }
    
    // Detect Opera
    if (/OPR\/\d./i.test(userAgent) || /Opera\/\d./i.test(userAgent)) {
      html.classList.add('is-opera');
    }
    
    // Detect iOS
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      html.classList.add('is-ios');
    }
    
    // Detect Android
    if (/Android/i.test(userAgent)) {
      html.classList.add('is-android');
    }
    
    // Detect mobile
    if (/Mobi/i.test(userAgent)) {
      html.classList.add('is-mobile');
    }
    
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
      html.classList.add('is-touch');
    } else {
      html.classList.add('is-no-touch');
    }
  }
  
  /**
   * Fix viewport height issues on mobile
   */
  function fixViewportHeight() {
    // Fix for 100vh in mobile browsers
    function setVh() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    
    // Set initial value
    setVh();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
  }
  
  /**
   * Object-fit polyfill for IE/Edge
   */
  function objectFitPolyfill() {
    // Check if object-fit is supported
    if ('objectFit' in document.documentElement.style === false) {
      // Find all images with object-fit
      var images = document.querySelectorAll('img.object-fit, .object-fit img');
      
      for (var i = 0; i < images.length; i++) {
        var image = images[i];
        var container = image.parentElement;
        
        // Add class to parent for styling
        container.classList.add('object-fit-fix');
        
        // Set background image
        var imgUrl = image.src;
        if (imgUrl) {
          container.style.backgroundImage = 'url(' + imgUrl + ')';
          container.style.backgroundSize = image.style.objectFit || 'cover';
          container.style.backgroundPosition = image.style.objectPosition || 'center center';
          
          // Hide the original image
          image.style.opacity = 0;
        }
      }
    }
  }
  
  /**
   * Flexbox polyfill for IE
   */
  function flexboxPolyfill() {
    // Check if we're in IE
    if (document.documentElement.classList.contains('is-ie')) {
      // Find all flex containers
      var flexContainers = document.querySelectorAll('.is-layout-flex, .flex-container');
      
      for (var i = 0; i < flexContainers.length; i++) {
        var container = flexContainers[i];
        container.classList.add('ie-flex-fix');
      }
    }
  }
  
  /**
   * Position:sticky polyfill
   */
  function stickyPolyfill() {
    // Check if position:sticky is supported
    var test = document.createElement('div');
    test.style.position = 'sticky';
    
    if (test.style.position !== 'sticky') {
      // Find all sticky elements
      var stickyElements = document.querySelectorAll('.sticky-header .masthead, .sticky-mobile-header .masthead');
      
      // Simple polyfill for basic sticky behavior
      function updateSticky() {
        var scrollY = window.scrollY || window.pageYOffset;
        
        for (var i = 0; i < stickyElements.length; i++) {
          var element = stickyElements[i];
          var parent = element.parentElement;
          var parentTop = parent.getBoundingClientRect().top + scrollY;
          
          if (scrollY > parentTop) {
            element.style.position = 'fixed';
            element.style.top = '0';
            element.style.width = '100%';
            element.style.zIndex = '9999';
          } else {
            element.style.position = '';
            element.style.top = '';
            element.style.width = '';
            element.style.zIndex = '';
          }
        }
      }
      
      // Update on scroll
      window.addEventListener('scroll', updateSticky);
      window.addEventListener('resize', updateSticky);
      
      // Initial update
      updateSticky();
    }
  }
  
  /**
   * CSS Grid polyfill for IE
   */
  function gridPolyfill() {
    // Check if we're in IE
    if (document.documentElement.classList.contains('is-ie')) {
      // Find all grid containers
      var gridContainers = document.querySelectorAll('.is-layout-grid, .grid-container');
      
      for (var i = 0; i < gridContainers.length; i++) {
        var container = gridContainers[i];
        container.classList.add('ie-grid-fix');
      }
    }
  }
  
  /**
   * Touch events polyfill
   */
  function touchEventsPolyfill() {
    // Check if it's a touch device
    if (document.documentElement.classList.contains('is-touch')) {
      // Fix for hover effects on touch devices
      document.addEventListener('touchstart', function() {}, false);
    }
  }
  
  /**
   * Responsive tables
   */
  function responsiveTables() {
    var tables = document.querySelectorAll('table');
    
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      
      // Skip tables that already have responsive wrappers
      if (table.parentElement.classList.contains('table-responsive')) {
        continue;
      }
      
      // Create responsive wrapper
      var wrapper = document.createElement('div');
      wrapper.classList.add('table-responsive');
      
      // Wrap table
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      
      // Add data-title attributes to cells for mobile view
      if (window.innerWidth <= 768) {
        var headers = table.querySelectorAll('th');
        var rows = table.querySelectorAll('tbody tr');
        
        for (var j = 0; j < rows.length; j++) {
          var cells = rows[j].querySelectorAll('td');
          
          for (var k = 0; k < cells.length; k++) {
            if (headers[k] && !cells[k].hasAttribute('data-title')) {
              cells[k].setAttribute('data-title', headers[k].textContent);
            }
          }
        }
      }
    }
  }
  
  /**
   * Responsive images
   */
  function responsiveImages() {
    // Add loading="lazy" to images for browsers that support it
    if ('loading' in HTMLImageElement.prototype) {
      var images = document.querySelectorAll('img:not([loading])');
      
      for (var i = 0; i < images.length; i++) {
        images[i].setAttribute('loading', 'lazy');
      }
    }
  }
  
  /**
   * Fix for iOS hover issues
   */
  function iOSHoverFix() {
    // Check if it's iOS
    if (document.documentElement.classList.contains('is-ios')) {
      // Find all elements with hover effects
      var hoverElements = document.querySelectorAll('a, button, .hover-effect');
      
      for (var i = 0; i < hoverElements.length; i++) {
        hoverElements[i].addEventListener('touchstart', function() {
          // This empty handler ensures the element receives hover state on first tap
        }, false);
      }
    }
  }
})();