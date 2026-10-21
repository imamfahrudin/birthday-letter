# Birthday Letter 💌🎂

[![HTML](https://img.shields.io/badge/HTML5-E34F26-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A small, mobile-first birthday experience built with plain HTML, CSS, and vanilla JavaScript. It includes an animated envelope, age reveal, typewriter-style letter, confetti, and 26 navigable wishes.

The project has no build step, package manager, or runtime dependencies. It can be deployed as a static website.

## 🌟 Features

- Responsive layout for mobile, tablet, and desktop
- Animated envelope and birthday age reveal
- Typewriter letter with configurable content
- Confetti animation using the Canvas API
- Previous/next navigation and swipe gestures for wishes
- Keyboard-accessible controls and visible focus states
- Progress bar with screen-reader status updates
- Reduced-motion support through `prefers-reduced-motion`
- Optional Google Fonts with system-font fallbacks

## 📋 Prerequisites

- A modern web browser
- Python 3 (optional, only for running a local development server)

No installation or environment variables are required.

## 🚀 Quick Start

### Option 1: Open directly

Open `index.html` in a modern browser.

### Option 2: Run a local server

```bash
git clone https://github.com/imamfahrudin/birthday-letter.git
cd birthday-letter
python -m http.server 8080
```

Open <http://localhost:8080> in your browser.

## ⚙️ Configuration

Open `script.js` and edit the `CONFIG` object near the top:

- `name`: birthday person's name
- `age`: age shown in the reveal
- `sender`: name shown in the signature
- `letter`: array of letter paragraphs
- `wishes`: array of `[message, emoji]` pairs

The title, greeting, age reveal, signature, and wishes interface are generated from this configuration where applicable.

## 🧩 Project Structure

```text
index.html   Page structure and content slots
style.css    Layout, responsive styles, and animations
script.js    Configuration and interaction logic
README.md    Project documentation
LICENSE      License information
```

## 🌐 Deployment

Upload the project folder to any static hosting provider. No build command or environment variables are required.

### GitHub Pages

1. Push the project to a GitHub repository.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose the main branch and root folder.

### Netlify

Drag the project folder into Netlify's deploy area, or connect the repository. Leave the build command empty and use the project folder as the publish directory.

All asset paths are relative, so the site also works from a project subdirectory.

## 📷 Add a Photo

Create an `images` folder, add an image, and place markup near the envelope in `index.html`:

```html
<img src="images/photo1.jpg" alt="Rizka smiling" />
```

Add the corresponding styles to `style.css`. Use descriptive alternative text for meaningful images, or `alt=""` for decorative images.

## 🧪 Accessibility Notes

- Interactive controls use native buttons where possible.
- Focus states are visible for keyboard navigation.
- The wishes progress bar exposes its current value to assistive technology.
- Animations are reduced when the device requests reduced motion.

## 🤝 Contributing

This is a personal static project, but improvements are welcome. For larger changes, open an issue first to discuss the proposed update.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📧 Repository

[github.com/imamfahrudin/birthday-letter](https://github.com/imamfahrudin/birthday-letter)

---

Made with ❤️ for a special birthday
