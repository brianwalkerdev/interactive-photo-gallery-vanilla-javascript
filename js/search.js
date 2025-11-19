/**
 * Gallery Search Filter
 * 
 * Provides real-time search functionality for the photo gallery.
 * Filters gallery items based on matching text in captions and titles.
 * 
 * Features:
 * - Case-insensitive search
 * - Real-time filtering as user types
 * - Searches both image titles and captions
 * - Smooth display transitions via CSS
 */

// Initialize search functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  
  if (searchInput && gallery) {
    // Listen for input changes and filter gallery
    searchInput.addEventListener('input', filterGallery);
    // Initialize filter on page load (shows all items)
    filterGallery();
  }
});

/**
 * Filter gallery items based on search input value
 * 
 * Compares the search query against each image's caption and title.
 * Items that don't match are hidden, matching items remain visible.
 * Empty search query displays all items.
 */
function filterGallery() {
  const searchInput = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  const galleryItems = gallery.querySelectorAll('li');
  const filterText = searchInput.value.toUpperCase();
  
  galleryItems.forEach(item => {
    const link = item.querySelector('a');
    const caption = link.getAttribute('data-caption') || '';
    const title = link.getAttribute('title') || '';
    const searchableText = `${caption} ${title}`.toUpperCase();
    
    // Show item if search text matches caption or title, or if search is empty
    if (filterText === '' || searchableText.includes(filterText)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
