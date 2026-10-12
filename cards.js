/*
  ============================================================
  YOUR ARTIFACT CARDS  (this is the only file you need to edit)
  ============================================================

  Each card is one { ... } block below. To hand in an artifact:

    1. Find its block (number: 2, number: 3, ...).
    2. Change  status: "idea"  to  status: "done".
    3. Fill in  title,  link,  and  reflection.
    4. Save, push to GitHub, and submit the same site link on Canvas.

  Fields:
    number      Artifact number (1 to 5). Don't change these.
    status      "done" for a finished artifact, "idea" for a placeholder.
    title       The card's heading.
    link        Where the artifact lives (a URL). Leave "" if there isn't one yet.
    linkLabel   The words on the link button.
    reflection  A few sentences on how it went and what you learned.
                For an idea card, this is where your idea goes.
    art         Which little concept picture to show:
                "castle", "tracker", "coach", "language", or "calendar".

  Tip: keep the quote marks and the comma at the end of each line.
  If the page goes blank after an edit, a missing quote or comma is
  almost always the reason.
*/

window.ARTIFACTS = [
  {
    number: 1,
    status: "done",
    title: "My Portfolio",
    link: "./",
    linkLabel: "You're looking at it",
    reflection:
      "This website, built with Claude Code as a static page (HTML, CSS and JavaScript, no server). " +
      "My first version put the whole scene inside a literal snow globe, but I meant the magical snow globe feeling, " +
      "so I asked for a full-screen frozen lake with a fairytale castle and glowing blade marks on the ice instead. " +
      "I learned to notice when the AI takes my words too literally and to describe the feeling I want, not only the objects. " +
      "Every change is in LOG.md.",
    art: "castle",
  },
  {
    number: 2,
    status: "idea",
    title: "Figure skating tracker",
    link: "",
    linkLabel: "",
    reflection:
      "An idea for a figure skating tracker. A place to log my practice sessions, which jumps and spins I worked on, and how they went, " +
      "so I can look back and actually see myself getting better over the season.",
    art: "tracker",
  },
  {
    number: 3,
    status: "idea",
    title: "AI skating coach",
    link: "",
    linkLabel: "",
    reflection:
      "Something with AI inside it. It would compare a skater's posture and technique to standard figure skating form " +
      "and point out what to fix, like a coach that is there every time you practice, not only during lessons.",
    art: "coach",
  },
  {
    number: 4,
    status: "idea",
    title: "English practice app",
    link: "",
    linkLabel: "",
    reflection:
      "An English learning app for my friend, so they can practice a little every day in a way that feels friendly and not like homework. " +
      "I want to build it around what they actually need to say in real life.",
    art: "language",
  },
  {
    number: 5,
    status: "idea",
    title: "Skating hub and rink schedules",
    link: "",
    linkLabel: "",
    reflection:
      "A figure skating headquarters with a calendar, so skaters can see which rinks have public skate sessions open, " +
      "find coaches to contact, and find shops. Another option is a new website for one skating rink, " +
      "because most rink scheduling sites are really hard to use and I think they could be so much better.",
    art: "calendar",
  },
];

