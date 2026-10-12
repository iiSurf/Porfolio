# Build log

What I asked the AI for, what changed, and what I decided. Newest entries go at the bottom.

**AI used:** Claude Code (working in a Claude project chat).
**Stack:** plain HTML, CSS and JavaScript. No server, no database, no build step.

---

## 2026-10-12 · First version

### What I asked for

- A portfolio site with five artifact cards. Artifact 1 is the site itself; cards 2 to 5 hold my ideas.
- About section: I'm hardworking, not afraid to fail, attentive, and kind.
- A magical figure skating scene with a snow globe feeling, inspired by Lake Louise, Alberta.
  Illustration only, no real photos or real people. Stylized skaters that look realistic, not cartoony.
  Gradients, glow, and outlines.
- Fun little things to discover in the scene (like the Roku screensaver), but calm, not busy.
- Optional background music: off by default, and the play control hidden in the scene
  (for example the roof of a house) instead of a normal button.
- Colors: purple, blue, red, orange, white, gold, white gold, silver. Font with "ice princess" vibes.
- I shared a photo of Lake Louise as a mood reference only. It is not used on the site.

### My ideas for the placeholder cards

- **Artifact 2:** a figure skating tracker.
- **Artifact 3:** an AI coach that compares posture and technique to standard skating form.
- **Artifact 4:** an English learning app for my friend.
- **Artifact 5:** a skating hub with a calendar of public skate sessions, coaches and shops,
  or a better scheduling website for a skating rink.

### What the AI built

- `index.html`: the page. The hero has a large snow globe drawn in SVG: a frozen lake at twilight,
  mountains with alpenglow, northern lights, a moon, pine trees, a cabin with chimney smoke,
  lanterns, a red canoe, a snowman, an owl and a fox. The globe sits on a gold base with a plaque.
- Two skaters glide in a figure eight with a soft gold outline and a reflection on the ice.
  One does a spin now and then. They are silhouettes, so they don't look like any real person.
- Snow falls inside the globe. Clicking the glass shakes the globe and swirls the snow.
- Six hidden secrets (cabin roof, owl, snowman, canoe, moon, fox). Each reacts when clicked
  and a counter shows how many you've found.
- Music: the cabin roof is the switch. It's off until you click it. The tune is an original
  music box waltz generated in the browser (no audio files, no copyrighted song).
  The roof works with a keyboard too and has a label for screen readers.
- Fonts: Great Vibes (script, for the "ice princess" headings), Cinzel (titles), Mulish (body text).
- `cards.js`: all five cards live here, so I can fill in a card without touching the layout.
- `style.css` and `script.js`: the look and the animation.
- Animations stop for visitors who turn on "reduce motion" in their system settings.

### Decisions

- Plain HTML, CSS and JS, so GitHub Pages can host it as is.
- Music is off by default, because sound that starts on its own can feel rude when someone opens a site.
- The card text for Artifact 1 and the ideas is a first draft from my own words. I'll keep editing it in my own style.

### Next steps

- [ ] Read through the card text and the About section and rewrite anything that doesn't sound like me.
- [ ] Create the GitHub repository, upload these files, and turn on GitHub Pages.
- [ ] Submit the live link on Canvas.

---

## 2026-10-12 · Redesign after my first review

### What I asked for

- I wasn't a fan of the first design. I meant a magical *snow globe feeling*, not an actual snow globe on the page.
- Make it immersive: the scene should take up the whole screen and be beautiful enough that people can't look away, and still look great on a phone.
- The content felt stuck in the middle. Spread it around the scene.
- Use the vibe of the Fairmont at Lake Louise: a fairytale castle in the middle of the wilderness.
- Animated skate blade marks carving the ice, like the opening credits of *Ice Princess*.
- Keep all five cards on display, and let people click a card to see it. No separate pages yet.

### What changed

- Removed the snow globe. The whole page is now one full-screen scene: a twilight sky with the northern lights,
  big mountains on both sides, a glacier peak, forests, and a frozen lake. Snow and a few gold flecks fall over everything.
- A fairytale castle hotel (illustrated, inspired by the Fairmont, not a copy) sits on the far shore with
  glowing windows, blue spires, gold finials and waving red pennants. It reflects in the ice.
- Glowing blade marks carve loops, curves and figure eights across the ice and slowly fade. Two skaters make some of
  the marks (one spins now and then), and an invisible sparkling blade makes the rest. Little ice sprays fly off on sharp turns.
- My name is "carved" in when the page opens, with a glowing swoosh under it. The scene drifts slightly with the mouse on a computer.
- Layout: name and About in the sky at top left, links and the secrets counter at top right, the five ice cards across the bottom
  of the lake. On a phone the cards become a row you swipe through.
- Clicking a card opens it in a pop-up with the full reflection or idea and its link.
- Music moved to the castle: the tallest tower's roof is the switch. Still off by default, still an original tune.
- Secrets now: the castle tower, an owl on the castle roof, a snowman, a red canoe, the moon, and a fox walking the shore.
- Updated the Artifact 1 card to talk about this redesign.

### What I learned

- The AI took "snow globe" literally. Next time I'll describe the feeling I want and give a real place or scene as the example.

---

## 2026-10-12 · Name and readability

### What I asked for

- Change the name from "Lake Louise portfolio" to "My Portfolio".
- Use "My Portfolio" as the big heading instead of "nic".
- Some text was hard to read where it overlapped the scene.

### What changed

- The big heading, the browser tab title, and the Artifact 1 card title now say "My Portfolio".
- The name and About text sit on a dark frosted panel, and the links, music hint and "Five artifacts" label have dark backgrounds, so they stay readable over the mountains and sky.
- On tall phone screens the scene shows more sky, so the castle sits below the text instead of behind it.
