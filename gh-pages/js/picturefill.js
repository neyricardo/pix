(function (a) {
    "use strict";
    a.picturefill = function () {
        for (var b = a.document.getElementsByTagName("div"), c = 0, d = b.length; d > c; c++)
            if (null !== b[c].getAttribute("data-picture")) {
                for (var e = b[c].getElementsByTagName("div"), f = [], g = 0, h = e.length; h > g; g++) {
                    var i = e[g].getAttribute("data-media");
                    (!i || a.matchMedia && a.matchMedia(i).matches) && f.push(e[g])
                }
                var j = b[c].getElementsByTagName("img")[0];
                f.length ? (j || (j = a.document.createElement("img"), j.alt = b[c].getAttribute("data-alt"), b[c].appendChild(j)), j.src = f.pop().getAttribute("data-src")) : j && b[c].removeChild(j)
            }
    }, a.addEventListener ? (a.addEventListener("resize", a.picturefill, !1), a.addEventListener("DOMContentLoaded", function () {
        a.picturefill(), a.removeEventListener("load", a.picturefill, !1)
    }, !1), a.addEventListener("load", a.picturefill, !1)) : a.attachEvent && a.attachEvent("onload", a.picturefill)
})(this);