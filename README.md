# My Portfolio

My portfolio for this quarter: a paper-cut frozen lake where figure skaters practice their axel jumps under glowing lanterns, and a village with one cozy shop for each of my five artifacts.
It's a static site (HTML, CSS, JavaScript), so it runs on GitHub Pages with no setup.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page, including the paper-cut lake scene, the village and the About text |
| `cards.js` | **The five artifact cards. Edit this file to hand in an artifact.** |
| `style.css` | Colors, fonts and layout |
| `script.js` | The figure skaters and their axel practice, skate tracings, snow, hidden secrets, music bell, the shops, and the shop interiors (shopkeeper and menu board) |
| `LOG.md` | Build log: what I asked for and what changed |

## Filling in a card

Open `cards.js`, find the card's block, and change:

```js
status: "done",
title: "My skating tracker",
link: "https://example.com/my-tracker",
linkLabel: "Open the tracker",
reflection: "A few sentences on how it went and what I learned.",
```

Then add an entry to `LOG.md`, push to GitHub, and submit the same site link on Canvas.

## Linking to one shop

Add `#artifact-` and the number to the site link, for example `https://<your-username>.github.io/<repository-name>/#artifact-2`.

## Changing the About text

It's in `index.html`, inside `<div class="about" id="about">`.

## Trying it on your computer

Double-click `index.html` to open it in a browser. Everything works offline except the fonts.

## Putting it on GitHub Pages

1. Create a new public repository on GitHub and upload all the files in this folder.
2. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.
