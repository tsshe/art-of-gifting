(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- Nav ---------- */
  var navBtn = $(".nav-toggle"), nav = $("#site-nav");
  if (navBtn) {
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open);
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); navBtn.setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Count-up numbers and bars ---------- */
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count")), dur = 1400, t0 = null;
    if (reduce) { el.textContent = end; return; }
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var t = en.target;
        if (t.hasAttribute("data-count")) countUp(t);
        if (t.classList.contains("bars")) t.classList.add("in");
        io.unobserve(t);
      });
    }, { threshold: 0.35 });
    $$("[data-count], .bars").forEach(function (el) { io.observe(el); });
  } else {
    $$("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
    $$(".bars").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Quiz ---------- */
  var quiz = $("#quiz");
  if (quiz && window.MM) {
    var M = window.MM;
    var steps = [
      { key: "recipient", q: "Who is the gift for?", opts: M.recipients },
      { key: "aesthetic", q: "What aesthetic do they like?", opts: M.aesthetics },
      { key: "budget", q: "What is your budget?", opts: M.budgets }
    ];
    var answers = {}, stepIdx = 0;
    var stage = $("#quiz-stage"), lamps = $$(".lamp", quiz), status = $("#quiz-status");

    function setLamps(n) { lamps.forEach(function (l, i) { l.classList.toggle("lit", i < n); }); }

    function renderStep() {
      var s = steps[stepIdx];
      setLamps(stepIdx);
      status.textContent = "Question " + (stepIdx + 1) + " of " + steps.length;
      var html = '<h3 class="quiz-q" tabindex="-1">' + s.q + '</h3><div class="quiz-opts">';
      s.opts.forEach(function (o) {
        html += '<button type="button" class="opt" data-id="' + o.id + '"><span class="opt-label">' + o.label + '</span><span class="opt-hint">' + o.hint + "</span></button>";
      });
      html += "</div>";
      if (stepIdx > 0) html += '<button type="button" class="link-btn" id="quiz-back">Back</button>';
      stage.innerHTML = html;
      $(".quiz-q", stage).focus({ preventScroll: true });
      $$(".opt", stage).forEach(function (b) {
        b.addEventListener("click", function () {
          answers[s.key] = b.getAttribute("data-id");
          stepIdx++;
          if (stepIdx < steps.length) renderStep(); else renderResult();
        });
      });
      var back = $("#quiz-back");
      if (back) back.addEventListener("click", function () { stepIdx--; renderStep(); });
    }

    function pick(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }

    function recommend() {
      var rec = pick(M.recipients, answers.recipient), aes = pick(M.aesthetics, answers.aesthetic), bud = pick(M.budgets, answers.budget);
      var scored = Object.keys(M.artforms).map(function (k, order) {
        var sc = 0, f = M.artforms[k];
        var ai = aes.forms.indexOf(k);
        if (ai > -1) sc += 3 - ai * 0.4;
        if (rec.boost.indexOf(k) > -1) sc += 1.5;
        if (f.premium) sc -= bud.penalty.premium;
        return { key: k, score: sc - order * 0.001 };
      });
      scored.sort(function (a, b) { return b.score - a.score; });
      return { top: scored.slice(0, 3), rec: rec, aes: aes, bud: bud };
    }

    function shopUrl(name) { return M.shop + "/search?q=" + encodeURIComponent(name.split(" ")[0]); }

    function renderResult() {
      setLamps(3);
      status.textContent = "Your match is ready";
      var r = recommend(), a = M.artforms[r.top[0].key];
      var note = r.rec.note;
      var html = '<div class="result">' +
        '<h3 class="quiz-q" tabindex="-1">Gift them ' + a.name + "</h3>" +
        '<p class="result-origin">' + a.origin + "</p>" +
        "<p>" + a.line + "</p><p>" + a.why + "</p>" +
        '<div class="result-box"><strong>What to look for at your budget</strong><p>' + r.bud.format + "</p></div>" +
        '<div class="result-box"><strong>Write this on the card</strong><p id="gift-note">' + note + "</p></div>" +
        '<div class="result-actions"><a class="btn btn-primary" target="_blank" rel="noopener" href="' + shopUrl(a.name) + '">Browse ' + a.name + " on Me Meraki</a>" +
        '<button type="button" class="btn btn-ghost" id="copy-note">Copy the card message</button></div>' +
        '<div class="alts"><p>Also worth a look</p><ul>';
      r.top.slice(1).forEach(function (t) {
        var f = M.artforms[t.key];
        html += '<li><a target="_blank" rel="noopener" href="' + shopUrl(f.name) + '">' + f.name + "</a> " + f.origin + ". " + f.why + "</li>";
      });
      html += '</ul></div><p class="result-fallback">Still unsure? Me Meraki offers gift cards and an art advisor on WhatsApp.</p>' +
        '<button type="button" class="link-btn" id="quiz-restart">Start over</button></div>';
      stage.innerHTML = html;
      $(".quiz-q", stage).focus({ preventScroll: true });
      $("#quiz-restart").addEventListener("click", function () { answers = {}; stepIdx = 0; renderStep(); });
      $("#copy-note").addEventListener("click", function (e) {
        var btn = e.currentTarget, txt = $("#gift-note").textContent;
        function done() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy the card message"; }, 1800); }
        if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
      });
    }
    renderStep();
  }
})();
