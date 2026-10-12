/*
  The scene, the blade marks on the ice, snow, hidden secrets, the music box, and the artifact cards.
  You shouldn't need to edit this file to fill in a card; use cards.js.
*/
(function () {
  "use strict";

  var SVGNS = "http://www.w3.org/2000/svg";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };

  // Seeded random so trees and stars land in the same place on every visit.
  var seed = 11;
  function rand() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function el(name, attrs, parent) {
    var node = document.createElementNS(SVGNS, name);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  /* ---------- Painting the scene ---------- */

  function buildStars() {
    var g = $("stars");
    for (var i = 0; i < 160; i++) {
      var c = el("circle", {
        cx: (rand() * 1600).toFixed(1), cy: (rand() * 460).toFixed(1),
        r: (0.6 + rand() * 1.5).toFixed(2), fill: rand() > 0.85 ? "#ffe7b0" : "#ffffff", class: "star"
      }, g);
      c.style.animationDelay = (rand() * 4).toFixed(2) + "s";
      c.style.animationDuration = (3 + rand() * 5).toFixed(2) + "s";
    }
  }

  function tree(g, x, baseY, h, color, snowy) {
    var w = h * 0.42;
    el("path", { d: "M" + x.toFixed(1) + "," + (baseY - h).toFixed(1) + " L" + (x + w / 2).toFixed(1) + "," + baseY.toFixed(1) + " L" + (x - w / 2).toFixed(1) + "," + baseY.toFixed(1) + " Z", fill: color }, g);
    if (snowy) el("path", { d: "M" + x.toFixed(1) + "," + (baseY - h).toFixed(1) + " l" + (w * 0.13).toFixed(1) + "," + (h * 0.3).toFixed(1) + " l" + (-w * 0.26).toFixed(1) + ",0 Z", fill: "#e9ecff", opacity: 0.75 }, g);
  }

  function along(g, ridge, step, minH, maxH) {
    for (var s = 0; s < ridge.length - 1; s++) {
      var a = ridge[s], b = ridge[s + 1];
      var len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      for (var d = 0; d < len; d += step * (0.6 + rand() * 0.8)) {
        var t = d / len;
        tree(g, a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t + 6, minH + rand() * (maxH - minH), rand() > 0.5 ? "#16304f" : "#1b3a60", rand() > 0.55);
      }
    }
  }

  function buildTreeline() {
    var g = $("treeline");
    along(g, [[0, 470], [120, 498], [250, 540], [380, 584], [500, 624], [580, 668]], 9, 14, 30);
    along(g, [[1600, 440], [1480, 468], [1340, 516], [1210, 572], [1100, 630], [1060, 668]], 9, 14, 30);
    // A few trees scattered down the slopes for texture.
    for (var i = 0; i < 70; i++) {
      var left = i % 2 === 0;
      var x = left ? rand() * 520 : 1080 + rand() * 520;
      var top = left ? 470 + (x / 580) * 198 : 440 + ((1600 - x) / 540) * 228;
      var y = top + 20 + rand() * (668 - top - 10);
      if (y < 664) tree(g, x, y, 12 + rand() * 14, "#122744", rand() > 0.6);
    }
    // Spruce along the shore, leaving the castle grounds open.
    for (var sx = 0; sx < 1600; sx += 7 + rand() * 6) {
      if (sx > 520 && sx < 1080) continue;
      tree(g, sx, 668, 14 + rand() * 22, rand() > 0.5 ? "#112440" : "#16305a", rand() > 0.7);
    }
  }

  function pine(g, x, baseY, h, w) {
    el("rect", { x: x - w * 0.05, y: baseY - h * 0.08, width: w * 0.1, height: h * 0.1, fill: "#3b2140" }, g);
    var tiers = 6;
    for (var i = 0; i < tiers; i++) {
      var top = baseY - h + (i * h) / (tiers + 0.5);
      var bottom = top + h * 0.38;
      var half = (w / 2) * (0.3 + (0.7 * (i + 1)) / tiers);
      el("path", { d: "M" + x + "," + top + " L" + (x + half) + "," + bottom + " Q" + x + "," + (bottom + h * 0.04) + " " + (x - half) + "," + bottom + " Z", fill: i % 2 ? "#15305a" : "#1b3c68" }, g);
      el("path", { d: "M" + (x - half) + "," + bottom + " Q" + x + "," + (bottom + h * 0.04) + " " + (x + half) + "," + bottom + " Q" + x + "," + (bottom + h * 0.012) + " " + (x - half) + "," + bottom + " Z", fill: "#f2f2ff", opacity: 0.9 }, g);
    }
    el("path", { d: "M" + x + "," + (baseY - h) + " l" + w * 0.06 + "," + h * 0.08 + " l" + -w * 0.12 + ",0 Z", fill: "#ffffff" }, g);
  }

  function buildPines() {
    var g = $("pines");
    pine(g, 200, 905, 220, 104);
    pine(g, 70, 950, 340, 160);
    pine(g, 1400, 900, 220, 104);
    pine(g, 1530, 945, 350, 166);
  }

  function buildLanterns() {
    var g = $("lanterns");
    [560, 690, 910, 1050].forEach(function (x, i) {
      var y = 674;
      var glow = el("circle", { cx: x, cy: y - 22, r: 18, fill: "url(#gWarm)", class: "lantern-glow" }, g);
      glow.style.animationDelay = i * 1.2 + "s";
      el("path", { d: "M" + x + "," + y + " V" + (y - 18), stroke: "#2b2257", "stroke-width": 2 }, g);
      el("rect", { x: x - 3.5, y: y - 27, width: 7, height: 9, rx: 1, fill: "#ffd27a" }, g);
      el("path", { d: "M" + (x - 5) + "," + (y - 27) + " L" + x + "," + (y - 32) + " L" + (x + 5) + "," + (y - 27) + " Z", fill: "#2b2257" }, g);
    });
  }

  function buildWindows() {
    var g = $("windows");
    function win(x, y, w, h, arched) {
      var lit = rand() > 0.16;
      var d = arched
        ? "M" + x + "," + (y + h) + " L" + x + "," + (y + w / 2) + " Q" + (x + w / 2) + "," + (y - w * 0.2) + " " + (x + w) + "," + (y + w / 2) + " L" + (x + w) + "," + (y + h) + " Z"
        : "M" + x + "," + y + " h" + w + " v" + h + " h" + -w + " Z";
      var p = el("path", { d: d, fill: lit ? (rand() > 0.3 ? "#ffcf73" : "#ffe3a3") : "#4f4680", class: "win" + (lit && rand() > 0.8 ? " flicker" : "") }, g);
      p.style.animationDelay = (rand() * 9).toFixed(1) + "s";
    }
    [546, 570, 594, 618].forEach(function (y, row) {
      for (var x = 676; x <= 918; x += 18) {
        if (x > 760 && x < 830 && row === 3) continue;
        if (x > 680 && x < 712 && row === 0) continue;
        if (x > 888 && x < 920 && row === 0) continue;
        win(x, y, 7, 12, row === 3);
      }
    });
    [598, 622].forEach(function (y) {
      for (var x = 562; x <= 636; x += 16) win(x, y, 7, 11, false);
      for (var x2 = 958; x2 <= 1032; x2 += 16) win(x2, y, 7, 11, false);
    });
    [436, 464, 492].forEach(function (y) { win(783, y, 9, 16, true); win(808, y, 9, 16, true); });
    [516, 546, 576, 606].forEach(function (y) { win(647, y, 6, 11, true); win(947, y, 6, 11, true); });
    [474, 500].forEach(function (y) { win(732, y, 7, 12, true); win(860, y, 7, 12, true); });
    [578, 606].forEach(function (y) { win(543, y, 6, 10, true); win(1051, y, 6, 10, true); });
    el("path", { d: "M694,512 h4 v10 h-4 Z M902,512 h4 v10 h-4 Z", fill: "#ffcf73" }, g);
  }

  function buildIce() {
    var cracks = $("cracks"), bubbles = $("bubbles");
    for (var i = 0; i < 26; i++) {
      var x = rand() * 1600, y = 690 + rand() * 300, d = "M" + x.toFixed(0) + "," + y.toFixed(0);
      var k = 0.5 + (y - 690) / 300;
      for (var s = 0; s < 3 + rand() * 3; s++) {
        x += (30 + rand() * 70) * k * (rand() > 0.5 ? 1 : -1);
        y += (rand() - 0.5) * 24 * k;
        d += " L" + x.toFixed(0) + "," + y.toFixed(0);
      }
      el("path", { d: d, "stroke-width": (0.8 + k).toFixed(1) }, cracks);
    }
    for (var b = 0; b < 16; b++) {
      var bx = rand() * 1600, by = 720 + rand() * 270, kk = 0.5 + (by - 690) / 300;
      for (var j = 0; j < 4; j++) {
        el("ellipse", { cx: (bx + (rand() - 0.5) * 60 * kk).toFixed(0), cy: (by + (rand() - 0.5) * 10 * kk).toFixed(0), rx: (6 + rand() * 22 * kk).toFixed(0), ry: (2 + rand() * 4 * kk).toFixed(0) }, bubbles);
      }
    }
  }

  /* ---------- Mapping the scene's coordinates to the screen ---------- */

  var view = { s: 1, ox: 0, oy: 0, w: 0, h: 0, dpr: 1 };
  function measure() {
    view.w = window.innerWidth; view.h = window.innerHeight;
    // On tall phone screens, show extra sky so the castle sits below the text.
    var vbY = view.w / view.h < 0.75 ? -180 : 0, vbH = 1000 - vbY;
    var vb = "0 " + vbY + " 1600 " + vbH;
    $("scene").setAttribute("viewBox", vb);
    $("fx").setAttribute("viewBox", vb);
    view.s = Math.max(view.w / 1600, view.h / vbH);
    view.ox = (view.w - 1600 * view.s) / 2;
    view.oy = (view.h - vbH * view.s) / 2 - vbY * view.s;
    view.dpr = Math.min(window.devicePixelRatio || 1, 2);
    [$("blades"), $("snow")].forEach(function (c) {
      c.width = Math.round(view.w * view.dpr);
      c.height = Math.round(view.h * view.dpr);
    });
    if (reduceMotion) { drawBlades(performance.now()); drawSnow(); }
  }

  /* ---------- Blade marks carving the ice ---------- */

  var ICE = { x0: 70, x1: 1530, y0: 702, y1: 890, cx: 800, cy: 780 };
  var LIFE = 12000;
  var blades = [];
  var spray = [];

  function makeBlade(x, y, heading, color, fig) {
    return { x: x, y: y, h: heading, turn: 0, mode: "glide", modeEnd: 0, color: color, trail: [], fig: fig, spin: 0, spinEnd: 0 };
  }

  function pickMode(b, now) {
    var r = Math.random();
    if (r < 0.32) { b.mode = "loop"; b.turnBase = (Math.random() > 0.5 ? 1 : -1) * (2.1 + Math.random() * 0.8); b.modeEnd = now + (Math.PI * 2 / Math.abs(b.turnBase)) * 1000 * (Math.random() > 0.5 ? 1 : 2); }
    else if (r < 0.6) { b.mode = "serpentine"; b.turnBase = 1.4 + Math.random(); b.modeEnd = now + 3000 + Math.random() * 3000; }
    else if (r < 0.75 && b.fig === "#figB" && !reduceMotion) { b.mode = "spin"; b.modeEnd = now + 2400; }
    else { b.mode = "glide"; b.turnBase = (Math.random() - 0.5) * 0.6; b.modeEnd = now + 1500 + Math.random() * 2500; }
  }

  function stepBlade(b, now, dt) {
    if (now > b.modeEnd) pickMode(b, now);
    if (b.mode === "spin") { b.spin = now; return; }
    b.spin = 0;
    var turn;
    if (b.mode === "loop") turn = b.turnBase;
    else if (b.mode === "serpentine") turn = b.turnBase * Math.sin(now / 520);
    else turn = b.turnBase;
    // Steer back toward the middle of the lake near the edges.
    var nearEdge = (b.x < ICE.x0 + 120 && Math.cos(b.h) < 0) || (b.x > ICE.x1 - 120 && Math.cos(b.h) > 0) ||
      (b.y < ICE.y0 + 20 && Math.sin(b.h) < 0) || (b.y > ICE.y1 - 20 && Math.sin(b.h) > 0);
    if (nearEdge) {
      var target = Math.atan2((ICE.cy - b.y) / 0.42, ICE.cx - b.x);
      var diff = Math.atan2(Math.sin(target - b.h), Math.cos(target - b.h));
      turn = (diff > 0 ? 1 : -1) * 2.8;
      if (b.mode === "loop") b.modeEnd = now;
    }
    b.turn = turn;
    b.h += turn * dt;
    var depth = (b.y - ICE.y0) / (ICE.y1 - ICE.y0);
    var speed = 190 + depth * 120;
    b.x += Math.cos(b.h) * speed * dt;
    b.y += Math.sin(b.h) * speed * 0.42 * dt;
    b.x = Math.max(ICE.x0 - 20, Math.min(ICE.x1 + 20, b.x));
    b.y = Math.max(ICE.y0 - 6, Math.min(ICE.y1 + 6, b.y));
    b.trail.push({ x: b.x, y: b.y, t: now });
    if (Math.abs(turn) > 1.8 && Math.random() < 0.6) {
      var side = b.h + (turn > 0 ? -Math.PI / 2 : Math.PI / 2);
      spray.push({ x: b.x, y: b.y, vx: Math.cos(side) * (30 + Math.random() * 50), vy: Math.sin(side) * 16 - Math.random() * 14, t: now });
    }
  }

  function drawBlades(now) {
    var c = $("blades"), ctx = c.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.setTransform(view.s * view.dpr, 0, 0, view.s * view.dpr, view.ox * view.dpr, view.oy * view.dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    blades.forEach(function (b) {
      while (b.trail.length && now - b.trail[0].t > LIFE) b.trail.shift();
      var pts = b.trail, CH = 6;
      for (var pass = 0; pass < 3; pass++) {
        for (var i = 0; i < pts.length - 1; i += CH) {
          var end = Math.min(i + CH, pts.length - 1);
          var mid = pts[Math.floor((i + end) / 2)];
          var fade = Math.pow(Math.max(0, 1 - (now - mid.t) / LIFE), 1.4);
          var k = 0.7 + (mid.y - ICE.y0) / (ICE.y1 - ICE.y0) * 0.9;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          for (var j = i + 1; j <= end; j++) ctx.lineTo(pts[j].x, pts[j].y);
          if (pass === 0) { ctx.strokeStyle = "rgba(" + b.color + "," + (0.24 * fade).toFixed(3) + ")"; ctx.lineWidth = 10 * k; }
          else if (pass === 1) { ctx.strokeStyle = "rgba(" + b.color + "," + (0.5 * fade).toFixed(3) + ")"; ctx.lineWidth = 3.6 * k; }
          else { ctx.strokeStyle = "rgba(255,255,255," + (0.95 * fade).toFixed(3) + ")"; ctx.lineWidth = 1.6 * k; }
          ctx.stroke();
        }
      }
      // A soft sparkle where the blade meets the ice.
      if (!b.fig && pts.length) {
        var p = pts[pts.length - 1];
        var gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 22);
        gr.addColorStop(0, "rgba(255,255,255,.95)");
        gr.addColorStop(0.25, "rgba(" + b.color + ",.55)");
        gr.addColorStop(1, "rgba(" + b.color + ",0)");
        ctx.fillStyle = gr;
        ctx.beginPath(); ctx.arc(p.x, p.y, 22, 0, Math.PI * 2); ctx.fill();
      }
    });
    spray = spray.filter(function (s) { return now - s.t < 900; });
    spray.forEach(function (s) {
      var age = (now - s.t) / 1000;
      ctx.fillStyle = "rgba(240,248,255," + (0.9 * (1 - age / 0.9)).toFixed(2) + ")";
      ctx.beginPath(); ctx.arc(s.x + s.vx * age, s.y + s.vy * age + 30 * age * age, 1.4, 0, Math.PI * 2); ctx.fill();
    });
  }

  var skaterNodes = [];
  function buildSkaters() {
    blades = [
      makeBlade(560, 800, 0.2, "150,200,255", "#figA"),
      makeBlade(1050, 880, Math.PI + 0.3, "190,160,255", "#figB"),
      makeBlade(800, 740, 0.8, "255,214,140", null)
    ];
    blades.forEach(function (b) {
      if (!b.fig) return;
      b.refl = el("use", { href: b.fig }, $("skaterRefl"));
      b.node = el("use", { href: b.fig, filter: "url(#fRim)" }, $("skaters"));
      skaterNodes.push(b);
    });
    if (reduceMotion) {
      // A still picture: pre-carve a few loops so the ice still shows marks.
      var t = performance.now() - LIFE * 0.6;
      for (var i = 0; i < 600; i++) blades.forEach(function (b) { stepBlade(b, t + i * 16, 0.016); });
      blades.forEach(function (b) { b.trail.forEach(function (p) { p.t = performance.now() - LIFE * 0.3; }); });
    }
    placeSkaters(performance.now());
  }

  function placeSkaters(now) {
    skaterNodes.forEach(function (b) {
      var depth = (b.y - ICE.y0) / (ICE.y1 - ICE.y0);
      var sc = 0.95 + depth * 0.8;
      var sx = (Math.cos(b.h) >= 0 ? 1 : -1) * sc;
      if (b.spin) sx = sc * Math.cos(now / 60);
      b.node.setAttribute("transform", "translate(" + b.x.toFixed(1) + "," + b.y.toFixed(1) + ") scale(" + sx.toFixed(3) + "," + sc.toFixed(3) + ")");
      b.refl.setAttribute("transform", "translate(" + b.x.toFixed(1) + "," + (b.y + 2).toFixed(1) + ") scale(" + sx.toFixed(3) + "," + (-sc * 0.8).toFixed(3) + ")");
    });
    var a = skaterNodes[0], b2 = skaterNodes[1], layer = $("skaters");
    var front = a.y > b2.y ? a : b2;
    if (layer.lastChild !== front.node) layer.appendChild(front.node);
  }

  var lastFrame = 0;
  function frame(now) {
    var dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0.016;
    lastFrame = now;
    blades.forEach(function (b) { stepBlade(b, now, dt); });
    placeSkaters(now);
    drawBlades(now);
    tickSnow(now, dt);
    requestAnimationFrame(loopRef);
  }
  var loopRef = frame;

  /* ---------- Snow and glitter ---------- */

  var flakes = [], wind = { x: 0, y: 0 };
  function initSnow() {
    var n = Math.min(240, Math.round((window.innerWidth * window.innerHeight) / 7000));
    if (reduceMotion) n = Math.round(n * 0.5);
    for (var i = 0; i < n; i++) {
      var z = 0.25 + Math.random() * 0.75;
      flakes.push({ x: Math.random(), y: Math.random(), z: z, phase: Math.random() * 6.28, gold: Math.random() < 0.09, vx: 0, vy: 0 });
    }
  }
  function tickSnow(now, dt) {
    wind.x *= 0.97; wind.y *= 0.97;
    flakes.forEach(function (f) {
      f.vx *= 0.97; f.vy *= 0.97;
      f.x += ((Math.sin(now / 2400 + f.phase) * 10 * f.z + wind.x * f.z + f.vx) * dt) / view.w;
      f.y += ((18 + f.z * 46 + wind.y * f.z + f.vy) * dt) / view.h;
      if (f.y > 1.02) { f.y = -0.02; f.x = Math.random(); }
      if (f.y < -0.05) f.y = 1.0;
      if (f.x > 1.02) f.x = -0.02;
      if (f.x < -0.02) f.x = 1.02;
    });
    drawSnow(now);
  }
  function drawSnow(now) {
    var c = $("snow"), ctx = c.getContext("2d");
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.clearRect(0, 0, view.w, view.h);
    var t = now || 0;
    flakes.forEach(function (f) {
      var r = 0.6 + f.z * 2.3;
      var a = f.gold ? 0.45 + 0.45 * Math.sin(t / 400 + f.phase) : 0.35 + f.z * 0.5;
      ctx.fillStyle = f.gold ? "rgba(255,226,160," + a.toFixed(2) + ")" : "rgba(255,255,255," + a.toFixed(2) + ")";
      ctx.beginPath(); ctx.arc(f.x * view.w, f.y * view.h, r, 0, Math.PI * 2); ctx.fill();
    });
  }
  function gust(clientX) {
    if (reduceMotion) return;
    var dir = clientX < view.w / 2 ? 1 : -1;
    wind.x = dir * (160 + Math.random() * 120);
    flakes.forEach(function (f) { f.vy = -40 - Math.random() * 120; f.vx = (Math.random() - 0.5) * 120; });
  }

  /* ---------- Parallax ---------- */

  function bindParallax() {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    var root = document.documentElement, pending = false, px = 0, py = 0;
    window.addEventListener("pointermove", function (e) {
      px = (e.clientX / view.w) * 2 - 1; py = (e.clientY / view.h) * 2 - 1;
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        root.style.setProperty("--px", px.toFixed(3));
        root.style.setProperty("--py", py.toFixed(3));
        pending = false;
      });
    });
  }

  /* ---------- Fox and shooting star ---------- */

  var fox = { walking: false, hop: false };
  function walkFox() {
    if (fox.walking || reduceMotion) return;
    fox.walking = true;
    var start = performance.now(), node = $("fox"), body = $("foxBody");
    function step(now) {
      var k = (now - start) / 48000;
      if (k >= 1) { fox.walking = false; node.setAttribute("transform", "translate(-60,668)"); setTimeout(walkFox, 25000 + Math.random() * 25000); return; }
      node.setAttribute("transform", "translate(" + (-60 + k * 1720).toFixed(1) + ",668) scale(1.3)");
      body.setAttribute("transform", "translate(0," + (Math.abs(Math.sin(now / 120)) * -0.8 - (fox.hop ? 7 : 0)).toFixed(2) + ")");
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function shootingStar() {
    var s = $("shootingStar");
    if (reduceMotion) return;
    var x = 300 + Math.random() * 800, y = 40 + Math.random() * 160, start = performance.now();
    function step(now) {
      var k = (now - start) / 1000;
      if (k > 1) { s.setAttribute("opacity", 0); setTimeout(shootingStar, 16000 + Math.random() * 20000); return; }
      s.setAttribute("transform", "translate(" + (x + k * 260).toFixed(1) + "," + (y + k * 76).toFixed(1) + ")");
      s.setAttribute("opacity", (Math.sin(k * Math.PI) * 0.95).toFixed(2));
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Secrets ---------- */

  var SECRETS = ["tower", "owl", "snowman", "canoe", "moon", "fox"];
  var found = {};
  try { found = JSON.parse(localStorage.getItem("nic-lake-found") || "{}") || {}; } catch (e) { found = {}; }
  var toastTimer;

  function say(text) {
    var t = $("toast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 4800);
  }
  function updateFound() {
    var n = SECRETS.filter(function (k) { return found[k]; }).length;
    $("foundCount").textContent = n;
    if (n === SECRETS.length) {
      var box = $("found");
      box.classList.add("all");
      box.innerHTML = "All <b>6</b> secrets found";
    }
  }
  function discover(id) {
    var first = !found[id];
    if (first) {
      found[id] = true;
      try { localStorage.setItem("nic-lake-found", JSON.stringify(found)); } catch (e) { /* storage off */ }
      updateFound();
    }
    var node = $(id);
    if (!reduceMotion && node.getBBox) {
      var b = node.getBBox();
      var c = el("circle", { cx: b.x + b.width / 2, cy: b.y + b.height / 2, r: 10, class: "sparkle", "pointer-events": "none" }, node.parentNode);
      setTimeout(function () { c.remove(); }, 1100);
    }
  }

  var actions = {
    owl: function () {
      var h = $("owlHead"); h.classList.add("turn");
      setTimeout(function () { h.classList.remove("turn"); }, 1600);
      say("The owl has watched the skaters all night.");
    },
    snowman: function () {
      var h = $("hat"); h.classList.add("tip");
      setTimeout(function () { h.classList.remove("tip"); }, 1400);
      say("The snowman tips its hat to you.");
    },
    canoe: function () { say("A red canoe waits under the snow for summer."); },
    moon: function () {
      var a = $("aurora"); a.classList.add("bright");
      setTimeout(function () { a.classList.remove("bright"); }, 4000);
      say("The northern lights brighten for the moon.");
    },
    fox: function () {
      if (!fox.walking) walkFox();
      fox.hop = true; setTimeout(function () { fox.hop = false; }, 260);
      say("A fox hurries home along the shore.");
    },
    tower: function () { music.toggle(); }
  };

  function bindHotspots() {
    SECRETS.forEach(function (id) {
      var node = $(id);
      function go(e) { e.stopPropagation(); actions[id](); discover(id); }
      node.addEventListener("click", go);
      node.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(e); }
      });
    });
    $("scene").addEventListener("click", function (e) { gust(e.clientX); });
    updateFound();
  }

  /* ---------- Music box (generated in the browser, original tune) ---------- */

  var music = (function () {
    var NOTE = { D3: 50, "F#3": 54, G3: 55, A3: 57, B3: 59, "C#4": 61, D4: 62, E4: 64, "F#4": 66, G4: 67, A4: 69, B4: 71, "C#5": 73, D5: 74, E5: 76, "F#5": 78, G5: 79, A5: 81, B5: 83, D6: 86 };
    // A gentle waltz in D major, written for this site. [note, beats]
    var melody = [
      ["A5", 1], ["F#5", 1], ["D5", 1], ["E5", 1.5], ["F#5", 0.5], ["E5", 1],
      ["D5", 1], ["F#5", 1], ["B5", 1], ["A5", 2], ["G5", 1],
      ["F#5", 1], ["A5", 1], ["D6", 1], ["B5", 1.5], ["A5", 0.5], ["G5", 1],
      ["E5", 1], ["F#5", 1], ["G5", 1], ["A5", 3],
      ["A5", 1], ["B5", 0.5], ["A5", 0.5], ["F#5", 1], ["E5", 1], ["C#5", 1], ["E5", 1],
      ["F#5", 1], ["D5", 1], ["B4", 1], ["C#5", 1.5], ["D5", 0.5], ["E5", 1],
      ["D5", 1], ["B4", 1], ["G5", 1], ["F#5", 2], ["A5", 1],
      ["G5", 1], ["E5", 1], ["C#5", 1], ["D5", 3]
    ];
    // One chord per bar: bass on beat 1, two soft chord tones on beats 2 and 3.
    var chords = [
      ["D3", "F#4", "A4"], ["A3", "E4", "C#5"], ["B3", "D4", "F#4"], ["G3", "D4", "B4"],
      ["D3", "F#4", "A4"], ["G3", "D4", "B4"], ["A3", "E4", "C#5"], ["A3", "E4", "G4"],
      ["D3", "F#4", "A4"], ["A3", "E4", "C#5"], ["B3", "D4", "F#4"], ["F#3", "C#4", "A4"],
      ["G3", "D4", "B4"], ["D3", "F#4", "A4"], ["A3", "E4", "G4"], ["D3", "F#4", "A4"]
    ];
    var beat = 60 / 88;
    var ctx, master, delay, playing = false, timer, noteTimer, nextTime = 0, step = 0, events = [];

    function freq(n) { return 440 * Math.pow(2, (NOTE[n] - 69) / 12); }
    function ping(n, when, vol, len) {
      var f = freq(n);
      [[1, 1], [4.02, 0.12], [2, 0.18]].forEach(function (p) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f * p[0];
        g.gain.setValueAtTime(0.0001, when);
        g.gain.exponentialRampToValueAtTime(vol * p[1], when + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, when + len / (p[0] > 1 ? 2.5 : 1));
        o.connect(g); g.connect(master); g.connect(delay);
        o.start(when); o.stop(when + len + 0.05);
      });
    }
    function schedule() {
      while (nextTime < ctx.currentTime + 0.4) {
        var beatInLoop = step % 48;
        events.forEach(function (e) {
          if (e.at >= beatInLoop && e.at < beatInLoop + 0.5) ping(e.n, nextTime + (e.at - beatInLoop) * beat, 0.16, 2.2);
        });
        if (beatInLoop % 1 === 0) {
          var c = chords[Math.floor(beatInLoop / 3) % 16], pos = beatInLoop % 3;
          if (pos === 0) ping(c[0], nextTime, 0.11, 2.6);
          else { ping(c[1], nextTime, 0.035, 1.2); ping(c[2], nextTime, 0.035, 1.2); }
        }
        nextTime += beat * 0.5;
        step += 0.5;
      }
    }
    function floatNote() {
      if (!playing || reduceMotion) return;
      var t = el("text", { x: 806 + Math.random() * 10, y: 280, class: "note" }, $("notes"));
      t.textContent = Math.random() > 0.5 ? "♪" : "♫";
      setTimeout(function () { t.remove(); }, 3700);
    }
    function start() {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) { say("This browser can't play the music box."); return; }
        ctx = new AC();
        master = ctx.createGain(); master.gain.value = 0;
        var tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 5200;
        master.connect(tone); tone.connect(ctx.destination);
        delay = ctx.createDelay(); delay.delayTime.value = beat * 0.75;
        var fb = ctx.createGain(); fb.gain.value = 0.32;
        var wet = ctx.createGain(); wet.gain.value = 0.22;
        delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(master);
        var t = 0;
        events = melody.map(function (m) { var e = { n: m[0], at: t }; t += m[1]; return e; });
      }
      ctx.resume();
      playing = true;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 1.5);
      nextTime = ctx.currentTime + 0.1; step = 0;
      timer = setInterval(schedule, 100);
      schedule();
      noteTimer = setInterval(floatNote, 1300);
      setState(true);
      say("Music on. Tap the tower again to stop.");
    }
    function stop() {
      playing = false;
      clearInterval(timer); clearInterval(noteTimer);
      if (ctx) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        setTimeout(function () { if (!playing) ctx.suspend(); }, 2600);
      }
      setState(false);
      say("Music off.");
    }
    function setState(on) {
      var t = $("tower");
      t.setAttribute("aria-pressed", on ? "true" : "false");
      t.setAttribute("aria-label", on ? "Castle tower: stop music" : "Castle tower: play music");
      t.classList.toggle("music-on", on);
    }
    return { toggle: function () { playing ? stop() : start(); } };
  })();

  /* ---------- Artifact cards ---------- */

  var ART = {
    castle:
      '<path d="M18,80 Q60,72 102,80" stroke="#8cc4ff" stroke-width="1.4" fill="none"/>' +
      '<rect x="34" y="50" width="52" height="26" fill="rgba(243,238,251,.85)"/>' +
      '<rect x="54" y="30" width="12" height="46" fill="#f3eefb"/>' +
      '<path d="M51,31 L60,8 L69,31 Z" fill="#4b51b6"/>' +
      '<rect x="30" y="42" width="8" height="34" fill="#e3dcf2"/><path d="M28,43 L34,26 L40,43 Z" fill="#4b51b6"/>' +
      '<rect x="82" y="42" width="8" height="34" fill="#e3dcf2"/><path d="M80,43 L86,26 L92,43 Z" fill="#4b51b6"/>' +
      '<path d="M32,52 L40,46 L80,46 L88,52 Z" fill="#363c98"/>' +
      '<g fill="#ffcf73"><rect x="42" y="58" width="3" height="5"/><rect x="49" y="58" width="3" height="5"/><rect x="68" y="58" width="3" height="5"/><rect x="75" y="58" width="3" height="5"/><rect x="58" y="38" width="4" height="7"/><path d="M57,76 V69 Q60,65 63,69 V76 Z"/></g>' +
      '<path d="M60,8 V2" stroke="#e6b862" stroke-width="1.4"/>',
    tracker:
      '<rect x="14" y="10" width="92" height="70" rx="8" fill="rgba(140,196,255,.1)" stroke="#c3c9dc" stroke-width="1.2"/>' +
      '<path d="M26,66 H94" stroke="#c3c9dc" stroke-opacity=".5"/>' +
      '<rect x="30" y="52" width="9" height="14" rx="2" fill="#8cc4ff" opacity=".8"/>' +
      '<rect x="45" y="46" width="9" height="20" rx="2" fill="#9b7be6" opacity=".9"/>' +
      '<rect x="60" y="40" width="9" height="26" rx="2" fill="#d4506e" opacity=".9"/>' +
      '<rect x="75" y="30" width="9" height="36" rx="2" fill="#e6b862"/>' +
      '<path d="M34,48 L49,42 L64,35 L79,24" stroke="#f7e8c4" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>' +
      '<path d="M79,15 L81,20 L86,20 L82,23 L84,28 L79,25 L74,28 L76,23 L72,20 L77,20 Z" fill="#f7e8c4"/>',
    coach:
      '<g stroke="#8cc4ff" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M60,74 L61,56 L59,40 L76,30 M59,40 L44,30 L30,22 M76,30 L90,28 M75,31 L66,20"/></g>' +
      '<g fill="#f7e8c4"><circle cx="60" cy="74" r="2.4"/><circle cx="61" cy="56" r="2.4"/><circle cx="59" cy="40" r="2.4"/><circle cx="76" cy="30" r="2.4"/><circle cx="44" cy="30" r="2.4"/><circle cx="30" cy="22" r="2.4"/><circle cx="90" cy="28" r="2.4"/><circle cx="66" cy="20" r="2.4"/></g>' +
      '<circle cx="82" cy="24" r="4" fill="none" stroke="#f7e8c4" stroke-width="1.4"/>' +
      '<path d="M60,78 V8" stroke="#e6b862" stroke-dasharray="3 4" stroke-width="1"/>' +
      '<path d="M60,58 A18,18 0 0 0 46,48" stroke="#d4506e" stroke-width="1.4" fill="none"/>' +
      '<path d="M50,80 H72" stroke="#c3c9dc" stroke-width="1.4" stroke-linecap="round"/>',
    language:
      '<path d="M14,16 H70 Q76,16 76,22 V46 Q76,52 70,52 H34 L24,62 V52 H20 Q14,52 14,46 V22 Q14,16 20,16 Z" fill="rgba(155,123,230,.3)" stroke="#9b7be6" stroke-width="1.4"/>' +
      '<text x="45" y="42" text-anchor="middle" font-family="Cinzel, Georgia, serif" font-size="20" font-weight="700" fill="#f7e8c4">Aa</text>' +
      '<path d="M50,40 H100 Q106,40 106,46 V66 Q106,72 100,72 H96 V80 L88,72 H56 Q50,72 50,66 V46 Q50,40 56,40 Z" fill="rgba(140,196,255,.25)" stroke="#8cc4ff" stroke-width="1.4"/>' +
      '<text x="78" y="62" text-anchor="middle" font-family="Mulish, sans-serif" font-size="15" font-weight="700" fill="#f4f6ff">Hi!</text>',
    calendar:
      '<rect x="16" y="14" width="88" height="66" rx="8" fill="rgba(140,196,255,.1)" stroke="#c3c9dc" stroke-width="1.2"/>' +
      '<path d="M16,30 H104" stroke="#c3c9dc" stroke-opacity=".6"/>' +
      '<path d="M36,8 V20 M84,8 V20" stroke="#e6b862" stroke-width="2.4" stroke-linecap="round"/>' +
      (function () {
        var s = "";
        for (var r = 0; r < 4; r++) for (var c = 0; c < 6; c++) {
          var hot = (r === 1 && c === 3) || (r === 2 && c === 1) || (r === 3 && c === 4);
          s += '<rect x="' + (24 + c * 13.5) + '" y="' + (38 + r * 10) + '" width="9" height="6" rx="1.5" fill="' + (hot ? "#e6b862" : "rgba(195,201,220,.35)") + '"/>';
        }
        return s;
      })()
  };
  ART.globe = ART.castle;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function teaser(text) {
    var m = String(text).match(/^.*?[.!?](\s|$)/);
    return m ? m[0].trim() : text;
  }

  function renderCards() {
    var box = $("cards"), list = window.ARTIFACTS || [];
    if (!list.length) {
      box.innerHTML = '<p class="about">No cards found. Check cards.js for a missing quote or comma.</p>';
      return;
    }
    box.innerHTML = list.map(function (a, i) {
      var done = a.status === "done";
      return '<button type="button" class="card ' + (done ? "done" : "idea") + '" data-i="' + i + '" aria-haspopup="dialog">' +
        '<svg class="card-art" viewBox="0 0 120 90" aria-hidden="true">' + (ART[a.art] || ART.castle) + "</svg>" +
        '<span class="card-head"><span class="card-num">Artifact ' + esc(a.number) + '</span><span class="chip ' + (done ? "done" : "idea") + '">' + (done ? "Live" : "Idea") + "</span></span>" +
        "<h3>" + esc(a.title) + "</h3>" +
        '<span class="teaser">' + esc(teaser(a.reflection)) + "</span>" +
        '<span class="open">Open card &rarr;</span>' +
        "</button>";
    }).join("");
    box.addEventListener("click", function (e) {
      var btn = e.target.closest(".card");
      if (btn) openCard(list[+btn.getAttribute("data-i")]);
    });
  }

  function openCard(a) {
    var done = a.status === "done";
    var link = a.link
      ? '<a class="card-link" href="' + esc(a.link) + '"' + (/^https?:/.test(a.link) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(a.linkLabel || "Open artifact") + " &rarr;</a>"
      : '<span class="card-link pending">Link added when it\'s built</span>';
    $("dlgInner").innerHTML =
      '<svg class="dlg-art" viewBox="0 0 120 90" aria-hidden="true">' + (ART[a.art] || ART.castle) + "</svg>" +
      '<span class="card-head"><span class="card-num">Artifact ' + esc(a.number) + '</span><span class="chip ' + (done ? "done" : "idea") + '">' + (done ? "Live" : "Idea") + "</span></span>" +
      '<h3 id="dlgTitle">' + esc(a.title) + "</h3>" +
      '<span class="label">' + (done ? "Reflection" : "The idea") + "</span>" +
      "<p>" + esc(a.reflection) + "</p>" + link;
    var d = $("cardDialog");
    if (d.showModal) d.showModal(); else d.setAttribute("open", "");
  }

  function bindDialog() {
    var d = $("cardDialog");
    d.addEventListener("click", function (e) { if (e.target === d) d.close(); });
  }

  /* ---------- Start ---------- */

  // Each step runs on its own, so a problem in one part of the scene never hides the cards.
  function safely(name, fn) {
    try { fn(); } catch (e) { if (window.console) console.error("Portfolio: " + name + " failed", e); }
  }
  safely("cards", renderCards);
  safely("card pop-up", bindDialog);
  safely("stars", buildStars);
  safely("trees", buildTreeline);
  safely("pines", buildPines);
  safely("lanterns", buildLanterns);
  safely("windows", buildWindows);
  safely("ice", buildIce);
  safely("skaters", buildSkaters);
  safely("secrets", bindHotspots);
  safely("snow", initSnow);
  safely("layout", measure);
  window.addEventListener("resize", function () { safely("layout", measure); });
  safely("parallax", bindParallax);
  if (!reduceMotion) {
    var frameFailed = false;
    var loop = function (now) {
      try { frame(now); } catch (e) {
        if (!frameFailed && window.console) console.error("Portfolio: animation failed", e);
        frameFailed = true;
      }
    };
    loopRef = loop;
    requestAnimationFrame(loop);
    setTimeout(function () { safely("fox", walkFox); }, 7000);
    setTimeout(function () { safely("shooting star", shootingStar); }, 6000);
  } else {
    safely("still scene", function () {
      $("fox").setAttribute("transform", "translate(700,668) scale(1.3)");
      placeSkaters(performance.now());
      drawBlades(performance.now());
      drawSnow(0);
    });
  }
})();
