/**
 * Custom Lightbox Overlay
 * 
 * A lightweight, accessible image viewer with keyboard navigation and caption support.
 * Provides a full-screen modal experience for viewing gallery images.
 * 
 * Features:
 * - Full-screen image display with captions
 * - Keyboard navigation (Arrow keys, Escape)
 * - Click navigation (Previous/Next buttons)
 * - Background click to close
 * - Smooth transitions and animations
 * - Accessibility features (ARIA labels, focus management)
 */

class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.overlay = null;
    this.init();
  }

  /**
   * Initialize the lightbox
   * Sets up overlay, collects image data, and binds event listeners
   */
  init() {
    // Create overlay structure
    this.createOverlay();
    
    // Get all gallery links
    const galleryLinks = document.querySelectorAll('#gallery a');
    
    // Store image data for quick access
    galleryLinks.forEach((link, index) => {
      const img = link.querySelector('img');
      this.images.push({
        src: link.href,
        caption: link.getAttribute('data-caption') || '',
        title: link.getAttribute('title') || img.getAttribute('alt') || ''
      });
      
      // Add click event to open lightbox
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(index);
      });
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', (e) => {
      if (!this.overlay.classList.contains('active')) return;
      
      switch(e.key) {
        case 'Escape':
          this.close();
          break;
        case 'ArrowLeft':
          this.prev();
          break;
        case 'ArrowRight':
          this.next();
          break;
      }
    });
  }

  /**
   * Create and append the lightbox overlay to the DOM
   * Sets up the HTML structure and binds navigation events
   */
  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
      <button class="lightbox-next" aria-label="Next image">&#10095;</button>
      <div class="lightbox-content">
        <img src="" alt="" class="lightbox-image">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    this.overlay = overlay;

    // Bind button event listeners
    overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    overlay.querySelector('.lightbox-next').addEventListener('click', () => this.next());
    
    // Close lightbox when clicking on background (not on content)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });
  }

  /**
   * Open the lightbox with a specific image
   * @param {number} index - Index of the image to display
   */
  open(index) {
    this.currentIndex = index;
    this.updateImage();
    this.overlay.classList.add('active');
    // Prevent body scrolling while lightbox is open
    document.body.style.overflow = 'hidden';
  }

  /**
   * Close the lightbox and restore normal scrolling
   */
  close() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Navigate to the next image (wraps to first if at end)
   */
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  /**
   * Navigate to the previous image (wraps to last if at start)
   */
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  /**
   * Update the displayed image and caption in the lightbox
   * Safely handles text content to prevent XSS
   */
  updateImage() {
    const image = this.images[this.currentIndex];
    const imgElement = this.overlay.querySelector('.lightbox-image');
    const captionElement = this.overlay.querySelector('.lightbox-caption');
    
    imgElement.src = image.src;
    imgElement.alt = image.title;
    
    // Display both title and caption using safe text content methods
    captionElement.innerHTML = '';
    if (image.caption) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = image.title;
      captionElement.appendChild(titleElement);
      captionElement.appendChild(document.createElement('br'));
      captionElement.appendChild(document.createTextNode(image.caption));
    } else {
      captionElement.textContent = image.title;
    }
  }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Lightbox();
});
