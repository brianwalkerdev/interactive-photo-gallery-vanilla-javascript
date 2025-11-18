/**
 * Custom Lightbox Overlay
 * Lightweight image viewer with caption support
 */

class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.overlay = null;
    this.init();
  }

  init() {
    // Create overlay structure
    this.createOverlay();
    
    // Get all gallery links
    const galleryLinks = document.querySelectorAll('#gallery a');
    
    // Store image data
    galleryLinks.forEach((link, index) => {
      const img = link.querySelector('img');
      this.images.push({
        src: link.href,
        caption: link.getAttribute('data-caption') || '',
        title: link.getAttribute('title') || img.getAttribute('alt') || ''
      });
      
      // Add click event
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.open(index);
      });
    });

    // Keyboard navigation
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

    // Event listeners
    overlay.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    overlay.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    overlay.querySelector('.lightbox-next').addEventListener('click', () => this.next());
    
    // Close on background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.close();
      }
    });
  }

  open(index) {
    this.currentIndex = index;
    this.updateImage();
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    const image = this.images[this.currentIndex];
    const imgElement = this.overlay.querySelector('.lightbox-image');
    const captionElement = this.overlay.querySelector('.lightbox-caption');
    
    imgElement.src = image.src;
    imgElement.alt = image.title;
    
    // Display both title and caption, safely
    captionElement.innerHTML = '';
    if (image.caption) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = image.title;
      captionElement.appendChild(titleElement);
      captionElement.appendChild(document.createTextNode(' ' + image.caption));
    } else {
      captionElement.textContent = image.title;
    }
  }
}

// Initialize lightbox when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new Lightbox();
});
