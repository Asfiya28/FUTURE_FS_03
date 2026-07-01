# ☕ Brew & Bloom Café - Local Business Website

A professional, modern, and fully responsive website for a local café business. Built with HTML5, CSS3, and vanilla JavaScript — no frameworks required!

---

## 📁 Project Structure

```
local-business-website/
│
├── index.html              # Main landing page (single-page website)
│
├── css/
│   ├── style.css           # Main stylesheet (all layout, components, responsive)
│   └── animations.css      # Animation utilities and keyframes
│
├── js/
│   └── main.js             # All JavaScript functionality
│
├── images/                 # (Empty - images loaded from Unsplash CDN)
│
└── README.md               # This file
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **Modern UI/UX** | Clean, warm color palette with smooth animations |
| 📱 **Fully Responsive** | Looks great on desktop, tablet, and mobile |
| 🍔 **Mobile Menu** | Hamburger menu with smooth slide-in animation |
| 📊 **Animated Counters** | Number counters that animate when scrolling into view |
| 🍽️ **Interactive Menu** | Tabbed menu with 4 categories (Coffee, Tea, Pastries, Breakfast) |
| 🖼️ **Image Gallery** | Clickable gallery with lightbox popup |
| ⭐ **Testimonials Slider** | Auto-playing customer reviews carousel |
| 📅 **Table Booking Form** | Functional reservation form with validation |
| 📧 **Newsletter Signup** | Email subscription form |
| 🗺️ **Google Maps** | Embedded interactive map |
| 🎉 **Confetti Effects** | Celebration animation on form submissions |
| 🖱️ **Custom Cursor** | Animated cursor follower (desktop only) |
| 📜 **Scroll Progress Bar** | Visual indicator of scroll position |
| ✨ **Scroll Reveal** | Elements fade in as you scroll down |
| 🔄 **Parallax Hero** | Background moves at different speed on scroll |

---

## 🚀 How to Run in VS Code

### Option 1: Live Server (Recommended)

1. **Install Live Server Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X or Cmd+Shift+X)
   - Search for **"Live Server"** by Ritwick Dey
   - Click **Install**

2. **Open the Project**
   - In VS Code, go to **File → Open Folder...**
   - Select the `local-business-website` folder
   - Click **Select Folder**

3. **Launch Live Server**
   - Right-click on `index.html` in the Explorer panel
   - Select **"Open with Live Server"**
   - Your browser will open automatically at `http://127.0.0.1:5500/`

### Option 2: Direct Browser Open

1. Navigate to the project folder
2. Double-click `index.html`
3. It will open in your default browser

> ⚠️ **Note:** Some features (like smooth scrolling and fetch requests) work better with a local server.

### Option 3: Python HTTP Server

If you have Python installed:

```bash
# Navigate to project folder
cd local-business-website

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Option 4: Node.js HTTP Server

If you have Node.js installed:

```bash
# Install http-server globally (one time)
npm install -g http-server

# Navigate to project and run
cd local-business-website
http-server -p 8080
```

Then open `http://localhost:8080` in your browser.

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup, forms, accessibility
- **CSS3** - Flexbox, Grid, Custom Properties, Animations, Media Queries
- **JavaScript (ES6+)** - Intersection Observer, Event Listeners, DOM Manipulation
- **Font Awesome 6** - Icons
- **Google Fonts** - Playfair Display, Inter, Great Vibes
- **Unsplash** - High-quality stock images (loaded via CDN)
- **Google Maps Embed** - Interactive location map

---

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#6B3A1E` | Dark brown - headings, buttons |
| Primary Light | `#8B5A3E` | Hover states |
| Secondary | `#D4A574` | Gold/tan - accents, highlights |
| Accent | `#C75B39` | Terracotta - prices, CTAs |
| Dark | `#1A1A2E` | Navy - text, backgrounds |
| Light | `#FDF8F3` | Cream - page background |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| > 1024px | Desktop |
| 768px - 1024px | Tablet |
| < 768px | Mobile |
| < 480px | Small Mobile |

---

## 🔧 Customization Guide

### Change Business Name
Edit the `<title>` tag and `.logo` text in `index.html`.

### Change Colors
Update CSS variables in `:root` at the top of `css/style.css`.

### Add/Edit Menu Items
Find the menu sections in `index.html` and add new `.menu-item` blocks.

### Change Images
Replace Unsplash URLs in `index.html` with your own image paths.

### Connect to Backend
The forms currently show toast notifications. To connect to a real backend:
1. Replace the `setTimeout` in form handlers with `fetch()` calls
2. Update the form `action` attribute
3. Add your API endpoint

---

## 📄 License

This project is created for educational purposes. Feel free to modify and use it for your own local business projects!

---

## 🙏 Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: [Google Fonts](https://fonts.google.com)

---

**Made with ❤️ and lots of ☕**
