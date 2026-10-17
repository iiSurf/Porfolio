# My Portfolio

My portfolio for this quarter: a paper-cut frozen lake where figure skaters practice their axel jumps under glowing lanterns, and a village with one cozy shop for each of my five artifacts.
The first shop is a skate fitting shop, with a wall of figure skates, stacked boot boxes, blades and cute soft guards, where you can meet me and read my resume.
It's a static site (HTML, CSS, JavaScript), so it runs on GitHub Pages with no setup.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page, including the paper-cut lake scene and the village |
| `cards.js` | **My About me, my resume and the five artifact cards. Edit this file to hand in an artifact or update my resume.** |
| `style.css` | Colors, fonts and layout |
| `script.js` | The figure skaters and their axel practice, skate tracings, snow, hidden secrets, music bell, the shops, the shop interiors (shopkeeper and menu board), and the skate fitting shop |
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

## My About me and resume

They live at the top of `cards.js`, in the `window.ABOUT` block, and show up in the skate fitting shop (the "About" link at the top of the page goes straight there).

- `greeting`, `about` and `traits` are the hello, the few sentences about me and the little tiles under them.
- `resume` is a list of sections, each with a `heading` and a list of `items`. Anything still in `[square brackets]` shows up with a dashed "fill me in" box, so I can see what's left. When I fill one in, I replace the whole thing, brackets too:

  ```js
  { heading: "Education", items: ["Example High School, class of 2030"] },
  ```

  I can add or delete items and whole sections.
- `resumeLink` is for a resume file, for example a PDF. While it's `""` there's no button; once I put a link in, a button with the words from `resumeLinkLabel` appears under the resume.
- `keeperSays` is what the shopkeeper says in the speech bubble, and `shopName` is the sign over the door.

## Which shop is the skate fitting shop

`fittingShop` in `cards.js` decides:

- `fittingShop: 1` (how it is now) turns Artifact 1's shop into the skate fitting shop. Artifact 1's card is still inside, on its own tab next to About me and Resume. Any other artifact number works the same way.
- `fittingShop: "extra"` (or `0`) gives the skate fitting shop its own sixth shop at the start of the street, and all five artifact shops go back to normal.

## Linking to one shop

Add `#artifact-` and the number to the site link, for example `https://<your-username>.github.io/<repository-name>/#artifact-2`.
Add `#about` to open the skate fitting shop: `https://<your-username>.github.io/<repository-name>/#about`.

## Trying it on your computer

Double-click `index.html` to open it in a browser. Everything works offline except the fonts.

## Putting it on GitHub Pages

1. Create a new public repository on GitHub and upload all the files in this folder.
2. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. After a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.
