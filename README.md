# Interactive Photo Gallery

A responsive photo gallery with real-time search and lightbox viewing. Built with vanilla JavaScript to showcase modern frontend development skills including DOM manipulation, CSS Grid layout, and accessibility best practices.

![Interactive Photo Gallery](thumbnail.png)

**[🚀 View Live Demo](https://brianwalkerdev.github.io/interactive-photo-gallery-vanilla-javascript/)**

## ✨ Features

- **Real-time Search** – Instantly filter photos by caption or title as you type
- **Custom Lightbox** – Full-screen image viewer with smooth navigation
- **Responsive Design** – Seamless experience across mobile, tablet, and desktop
- **Keyboard Navigation** – Arrow keys and Escape for accessibility
- **Modern UI** – Clean interface with smooth hover effects and transitions
- **Performance Optimized** – Fast loading with thumbnail images and efficient CSS Grid

## 🛠️ Tech Stack

- **HTML5** – Semantic markup with ARIA labels for accessibility
- **CSS3** – CSS Grid layout, Flexbox, custom properties, and smooth animations
- **JavaScript (ES6+)** – Vanilla JS with class-based architecture and modern DOM APIs
- **No frameworks or libraries** – Pure vanilla JavaScript implementation

## 📦 Installation & Usage

### Quick Start

```bash
# Clone the repository
git clone https://github.com/brianwalkerdev/interactive-photo-gallery-vanilla-javascript.git

# Navigate to project directory
cd interactive-photo-gallery-vanilla-javascript

# Open in browser (no build required for development)
open index.html
```

### With Local Server

```bash
# Install dependencies (optional - only needed for npm scripts)
npm install

# Start local development server at http://localhost:8080
npm start
```

### Build for Production

```bash
# Generate optimized static files in dist/ folder
npm run build
```

The build script copies all necessary files to the `dist/` directory, ready for deployment.

## 🚀 Deployment

This project works out-of-the-box on all static hosting platforms. Choose your preferred service:

### GitHub Pages

1. Push your code to GitHub
2. Navigate to **Settings** → **Pages**
3. Select your branch and root folder
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Netlify

**Option 1:** Drag and Drop
- Run `npm run build` to create the `dist/` folder
- Drag the `dist/` folder to [Netlify Drop](https://app.netlify.com/drop)

**Option 2:** Git Integration
- Connect your GitHub repository
- Set build command: `npm run build`
- Set publish directory: `dist`

### Vercel

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to production
vercel --prod
```

### Other Static Hosts

Works with any static hosting service (Firebase Hosting, Surge, Render, etc.). Simply upload the root files or run `npm run build` and upload the `dist/` folder.

## 📂 Project Structure

```
interactive-photo-gallery-vanilla-javascript/
├── css/
│   ├── normalize.css       # CSS reset for cross-browser consistency
│   └── styles.css          # Main styles with CSS Grid and animations
├── js/
│   ├── lightbox.js         # Custom lightbox implementation
│   └── search.js           # Real-time search filter
├── photos/
│   ├── thumbnails/         # Optimized thumbnail images (220px height)
│   └── *.jpg               # Full-resolution images
├── index.html              # Main HTML file
├── thumbnail.png           # Project thumbnail (1280x640)
├── package.json            # Project metadata and scripts
├── build.js                # Production build script
└── LICENSE                 # MIT License
```

## 💡 Key Features Explained

### Search Functionality
The search feature filters images in real-time by matching input against photo titles and captions. Uses case-insensitive comparison and provides instant visual feedback.

### Custom Lightbox
Built from scratch without external libraries, the lightbox provides:
- Smooth fade-in animations
- Keyboard navigation (← → arrows, Escape to close)
- Click navigation with Previous/Next buttons
- Background click to close
- Image captions with titles
- Body scroll lock when active

### Responsive Design
Uses CSS Grid with `auto-fill` and `minmax()` for fluid layouts that adapt to any screen size. Breakpoints at 768px and 480px ensure optimal viewing on all devices.

## 🎨 Customization

### Adding More Photos

1. Add full-size image to `photos/` folder
2. Add thumbnail (220px height) to `photos/thumbnails/`
3. Add new `<li>` item in `index.html` gallery section:

```html
<li>
  <a href="photos/your-image.jpg" 
     title="Your Title" 
     data-caption="Your caption here">
    <img src="photos/thumbnails/your-image.jpg" alt="Your Title">
  </a>
</li>
```

### Styling

Modify CSS variables and styles in `css/styles.css`. Key sections are clearly marked with comments.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for full details.

## 👨‍💻 Author

**Brian Walker**  
- Portfolio: [brianwalker.dev](https://brianwalker.dev)  
- GitHub: [@brianwalkerdev](https://github.com/brianwalkerdev)

## 🙏 Acknowledgments

- Photography from free stock photo sources
- Inspired by modern gallery interfaces and best practices in web accessibility

---

*Built as a portfolio project to demonstrate vanilla JavaScript proficiency, modern CSS techniques, and accessibility-first development.*
