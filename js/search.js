/**
 * Gallery Search Filter
 * Filters gallery items based on caption text
 */

// Initialize search functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  
  if (searchInput && gallery) {
    searchInput.addEventListener('input', filterGallery);
    // Initialize filter on page load
    filterGallery();
  }
});

/**
 * Filters gallery items based on search input
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
