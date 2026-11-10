(function () {
  var mm = window.mermaid;
  if (!mm) return;

  mm.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose" });

  function visible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function render(onlyVisible) {
    var nodes = [];
    var all = document.querySelectorAll(".mermaid:not([data-processed])");
    for (var i = 0; i < all.length; i++) {
      if (!onlyVisible || visible(all[i])) nodes.push(all[i]);
    }
    if (!nodes.length) return;
    try {
      var out = mm.run({ nodes: nodes });
      if (out && out.catch) out.catch(function (e) { console.warn("mermaid:", e); });
    } catch (e) {
      console.warn("mermaid:", e);
    }
  }

  function start() {
    render(true);
    document.addEventListener("change", function (ev) {
      if (ev.target && ev.target.type === "radio") {
        setTimeout(function () { render(false); }, 30);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
