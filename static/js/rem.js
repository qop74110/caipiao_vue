/**
 * Created by root on 2017/11/14.
 * rem
 */
(function (e, p) {
  function m() {
    var g = k.getBoundingClientRect().width;
    640 < g / a && (g = 640 * a);
    320 > g / a && (g = 320 * a);
    g /= 10;
    k.style.fontSize = g + "px";
    l.rem = e.rem = g
  }

  var c = e.document,
    k = c.documentElement,
    f = c.querySelector('meta[name="viewport"]'),
    d = c.querySelector('meta[name="flexible"]'),
    a = 0,
    b = 0,
    n, l = p.flexible || (p.flexible = {});
  if (f) {
    if (d = f.getAttribute("content").match(/initial\-scale=([\d\.]+)/)) b = parseFloat(d[1]), a = parseInt(1 / b)
  } else if (d) {
    var h = d.getAttribute("content");
    h && (d = h.match(/initial\-dpr=([\d\.]+)/), h = h.match(/maximum\-dpr=([\d\.]+)/), d && (a = parseFloat(d[1]), b = parseFloat((1 / a).toFixed(2))), h && (a = parseFloat(h[1]), b = parseFloat((1 / a).toFixed(2))))
  }
  a || b || (e.navigator.appVersion.match(/android/gi), b = e.navigator.appVersion.match(/iphone/gi), d = e.devicePixelRatio, a = b ? 3 <= d && (!a || 3 <= a) ? 3 : 2 <= d && (!a || 2 <= a) ? 2 : 1 : 1, b = 1 / a);
  k.setAttribute("data-dpr", a);
  f || (f = c.createElement("meta"), f.setAttribute("name", "viewport"), f.setAttribute("content", "initial-scale=" + b + ", maximum-scale=" + b + ", minimum-scale=" + b + ", user-scalable=no"), k.firstElementChild ? k.firstElementChild.appendChild(f) : (b = c.createElement("div"), b.appendChild(f), c.write(b.innerHTML)));
  e.addEventListener("resize", function () {
    clearTimeout(n);
    n = setTimeout(m, 300)
  }, !1);
  e.addEventListener("pageshow", function (a) {
    a.persisted && (clearTimeout(n), n = setTimeout(m, 300))
  }, !1);
  "compvare" === c.readyState ? c.body.style.fontSize = 12 * a + "px" : c.addEventListener("DOMContentLoaded", function (g) {
    c.body.style.fontSize = 12 * a + "px"
  }, !1);
  m();
  l.dpr = e.dpr = a;
  l.refreshRem = m;
  l.rem2px = function (a) {
    var b = parseFloat(a) * this.rem;
    "string" === typeof a && a.match(/rem$/) && (b += "px");
    return b
  };
  l.px2rem = function (a) {
    var b = parseFloat(a) / this.rem;
    "string" === typeof a && a.match(/px$/) && (b += "rem");
    return b
  }
})(window, window.lib || (window.lib = {}));
