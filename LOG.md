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

---

## 2026-10-12 · Fixing a blank-looking site

### What happened

- My downloaded copy of script.js was empty and index.html had the page twice, so the cards, snow, skaters and blade marks didn't show.
- I got clean files as one zip instead of copying them one by one.

### What changed

- The page now starts each part of the scene separately, so if one part fails the cards still show.
- If script.js or cards.js is missing or empty, the cards area now says so instead of staying blank.

---

## 2026-10-14 · Starting over

### What I asked for

- I didn't like the castle design, so I asked to start the design over.
- I shared free-to-use reference pictures for the style I want (they are not used on the site):
  - full and vibrant, so the whole screen feels inviting and makes people curious to explore
  - still a lake and mountains like Lake Louise
  - cozy, warm shop fronts
  - cool, bold text placement
  - layered, paper-cut style art
  - glowing neon details
  - flat vector illustration

### What changed

- New full-screen scene: a pink and purple sky, flat vector mountains with snow streaks, a glacier peak, and a frozen turquoise lake. Snowy pine boughs and spruce trees frame the edges.
- A huge "my PORTFOLIO" title sits between the mountains, with its bottom tucked behind the treeline.
- Glowing skate marks still carve the ice, and a skater glides and spins on the lake.
- The About text is on a frosted card in the lower right (below the scene on a phone).
- The five artifact cards are now **five cozy shops in a village** under the stars: string lights, striped awnings, glowing windows with a little picture of each project, and a neon sign. Clicking a shop opens its card.
- Hidden secrets: a golden bell (it plays the music box tune, off until you ring it), an owl, a fox, a deer, and the skater.
- New fonts: Unbounded for titles and Nunito for text.
- The Artifact 1 card now talks about starting over.
- Cards are still edited only in `cards.js`. The picture names changed: `"castle"` is now `"mountain"`.

### What I learned

- Showing reference pictures of a style worked much better than describing it in words.

---

## 2026-10-14 · Walking into the shops

### What I asked for

- I liked the shops as the artifact cards. Instead of a pop-up card, I wanted to go **through the door into the shop** and read the card on a big menu board on the back wall, behind the counter with a shopkeeper. I shared a photo of a letter-board café menu as a style reference (not used on the site).
- The About box was covering the scenery, the title and the skaters.
- The main lake scene still feels too close to the old design, and the top still doesn't feel filled.

### What changed

- Clicking a shop opens its door, the village zooms toward it, and you step inside. The pop-up card is gone.
- Each shop has its own interior: a dark wall in the shop's color, warm hanging lamps, a window looking out at the snowy mountains, a shelf, plants, and a counter with a service bell and a mug.
- Each shop has its own friendly shopkeeper behind the counter (an original drawing, not a real person). They wear an apron in the shop's color with the project's neon icon.
- The card is on a letter-board menu with wooden ledges: artifact number, Open or Idea, the title, and the reflection, with each line of text resting on its own ledge. The link sits on the last ledge.
- "Back to the village" button (or the Esc key or the browser's back button) walks you back out.
- Every shop has its own link, like `#artifact-2`, so I can share one shop directly.
- The About card moved into the village, next to "The village" heading, so nothing covers the lake scene now. A small glowing arrow at the bottom of the lake points down to the village.
- The new hero is not built yet. First I'm looking at three different hero ideas side by side to pick a direction.

---

## 2026-10-14 · The new lake: Lantern Cove

### What I asked for

- From the three hero ideas, I loved A (paper-cut wilderness) and B (lakeside village at dusk) the most. C looked too much like a video game level.
- Keep A's magical wilderness feeling and its title cut out of a paper banner, but bring the lake much closer, like B's skating surface.
- Keep B's lights, glow and reflections on the ice.
- Make the skaters real figure skaters practicing their axel jumps, and have them look like they're learning: some stay on one leg longer before the jump, and sometimes they fall and get back up.

### What changed

- New main screen: a paper-cut frozen lake at pink and purple dusk, surrounded by snowy paper pines, berry bushes and the mountains, with a glacier in the middle.
- "my portfolio" is cut into a cream paper banner cloud at the top, with paper snowflakes hanging from it.
- The ice comes right up to you. Paper lanterns on a string, lamp posts, two fire bowls and a little red warming hut glow, and their light reflects on the ice.
- Five figure skaters practice axels. They step forward onto one leg, jump, turn one and a half times in the air, and land backwards. Like real learners, some hold the one-leg glide a long time, some back out, some only do a half turn, some land on two feet, and some fall, sit for a moment, and get back up. Their blades leave soft white tracings on the ice.
- Clicking (or pressing Enter on) a skater makes them try an axel.
- Five secrets: the golden bell (music, still off until you ring it), the owl, the fox, the deer, and the skaters.
- On a phone the banner stacks "my portfolio" and the scene is rearranged so the lake, the skaters and the secrets all fit.
- To pick the scene, two versions were painted (Lantern Cove and a twilight pond with an aurora) and compared against my notes. Lantern Cove won, and a few ideas from the other one were added (the fire bowls and bigger mountains on phones).

---

## 2026-10-15 · Polishing Lantern Cove

### What I asked for

- Same request as the entry above. This is the clean-up pass after checking the new lake scene on desktops, tablets and phones.

### What changed

- On phones the title reads as a small tilted "my" above a big "portfolio".
- The warm light from the hut windows, fire bowls, lamps and lanterns reflects more strongly on the ice.
- On wide screens the mountains are taller and peek out under the banner, and the menu buttons are solid so nothing shows through them.
- Secret messages pick a spot that never covers the title, the menu, the bell, the animal you just found, or the skaters. Snow no longer falls over the title, the menu or the village text.
- The skaters spread across the whole ice on phones instead of bunching at the back, leave more room for each other, and a jumper no longer rises over the skater behind. The first clean axel, fall, popped jump and backed-out jump all happen within the first minute. Clicking a skater always leads to a real jump attempt, and the first try starts within a few seconds of opening the page with a long one-leg glide.
- Blades stay on top of the ice, and getting up after a fall is smoother.
- A scalloped paper edge now joins the lake to the village. Keyboard focus on the secrets is easier to see, the page has a small snowflake tab icon, and the lake stops animating while you're in the village so phones save battery.
- Shops: the browser's Back and Forward buttons work cleanly, double-clicking "Back to the village" no longer jumps off the site, and closing a shop you opened from a direct link (like `#artifact-3`) brings you back to that shop in the village. Snowflakes no longer fall across the shop signs.
