# Birthday Letter for Rizka

A dependency-free, mobile-first birthday letter made with plain HTML, CSS, and vanilla JavaScript. It can be opened locally or deployed as a static site.

## Customize

Open `script.js` and edit the `CONFIG` object at the top:

- `name`: birthday person's name
- `age`: the number shown in the reveal
- `sender`: the signature name
- `letter`: an array of paragraphs; personalize any paragraph with your own memories or details

The signature automatically uses `CONFIG.sender`, so changing that value changes the closing line too.

## Deploy

### Netlify

1. Keep `index.html`, `style.css`, `script.js`, and `README.md` in the same folder.
2. Open Netlify and drag the `birthday-letter` folder onto the deploy area.
3. Netlify will publish the site and provide a shareable URL.

### GitHub Pages

1. Create a repository and upload the contents of this folder to its root (or to a project folder).
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, select the main branch and root folder, then save.

All asset paths are relative, so the site also works when opened directly from `index.html`.

## How to add a photo later

Create an `images` folder, add a file such as `images/photo1.jpg`, then place this markup at one of the `TODO: add photo here` comments in `index.html`:

```html
<img src="images/photo1.jpg" alt="Rizka smiling" />
```

Add any photo styling to `style.css`. The current version deliberately uses no image files.
