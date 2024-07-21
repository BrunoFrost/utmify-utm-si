(() => {
    "use strict";
    var e = {
        262: (e, t) => {
            Object.defineProperty(t, "__esModule", { value: !0 }),
                (t.Random = void 0),
                (t.Random = class {
                    static chooseOne(e) {
                        return e[Math.floor(Math.random() * e.length)];
                    }
                });
        },
        745: (e, t) => {
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.UnicodeHasher = void 0);
            class n {
                static encode(e) {
                    return e.replace(/[0-9]/g, (e) => n.map[e]);
                }
                static decode(e) {
                    const t = Object.values(n.map).join(""),
                        o = new RegExp(`[${t}]`, "g");
                    return e.replace(o, (e) => Object.keys(n.map).find((t) => n.map[t] === e) || "");
                }
                static encodeAndInsert(e, t, o = 1) {
                    const r = n.encode(e);
                    return `${t.slice(0, o)}${r}${t.slice(o)}`;
                }
                static decodeAndExtract(e) {
                    const t = Object.values(n.map).join(""),
                        o = new RegExp(`[${t}]`, "g");
                    let r = "";
                    return (
                        e.replace(o, (e) => {
                            const t = Object.keys(n.map).find((t) => n.map[t] === e);
                            return t && (r += t), e;
                        }),
                        "" !== r ? r : null
                    );
                }
                static removeAllEncodedChars(e) {
                    const t = Object.values(n.map).join(""),
                        o = new RegExp(`[${t}]`, "g");
                    return e.replace(o, "");
                }
            }
            (t.UnicodeHasher = n), (n.map = { 0: "​", 1: "‌", 2: "‍", 3: "⁠", 4: "⁡", 5: "⁢", 6: "⁣", 7: "⁤", 8: "‪", 9: "‬" });
        },
        202: (e, t, n) => {
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.UrlRebuilder = void 0);
            const o = n(262),
                r = n(745);
            class i {
                static randomizePhoneNumberIfNecessary(e) {
                    var t;
                    const n = null !== (t = window.phones) && void 0 !== t ? t : [];
                    if (0 === n.length) return e;
                    const r = o.Random.chooseOne(n);
                    return e.includes("phone=") ? i.withReplaceQueryParam(e, "phone", r) : e.includes("wa.me") ? `https://wa.me/${r}?${e.split("?")[1]}` : e;
                }
                static insertAdIdInWppUrl(e, t) {
                    var n;
                    const o = null !== (n = i.getQueryParams(e).get("text")) && void 0 !== n ? n : "Olá",
                        a = t.replace(/[^0-9]/g, ""),
                        s = r.UnicodeHasher.removeAllEncodedChars(o),
                        c = r.UnicodeHasher.encodeAndInsert(a, s);
                    return i.withReplaceQueryParam(e, "text", c);
                }
                static getAdId(e) {
                    var t;
                    const n = null !== (t = e.get("utm_content")) && void 0 !== t ? t : "";
                    return n.includes("|") ? n.split("|")[1] : null;
                }
                static getQueryParams(e) {
                    const t = e.split("?")[1];
                    return new URLSearchParams(t);
                }
                static withReplaceQueryParam(e, t, n) {
                    const o = e.split("?")[0],
                        r = e.split("?")[1],
                        i = new URLSearchParams(r);
                    return i.set(t, n), `${o}?${i.toString()}`;
                }
            }
            t.UrlRebuilder = i;
        },
    },
    t = {};
    function n(o) {
        var r = t[o];
        if (void 0 !== r) return r.exports;
        var i = (t[o] = { exports: {} });
        return e[o](i, i.exports, n), i.exports;
    }
    (() => {
        const e = n(202);
        console.log("utms script loaded! 2.3.11");
        const t = !!document.querySelector("[data-utmify-ignore-iframe]"),
            o = !!document.querySelector("[data-utmify-ignore-retry]");
        var r, i;
        !(function (e) {
            e.Doppus = "doppus";
        })(r || (r = {})),
            (function (e) {
                (e.PandaVideo = "pandavideo.com"), (e.YouTube = "youtube.com"), (e.EplayVideo = "eplay.video");
            })(i || (i = {}));
        const a = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"];
        class s {
            static addUtmParametersToUrl(e) {
                const t = s.urlWithoutParams(e),
                    n = s.paramsFromUrl(e),
                    o = s.getUtmParameters(),
                    r = new URLSearchParams();
                n.forEach((e, t) => r.append(t, e)), o.forEach((e, t) => r.append(t, e));
                const i = s.urlParametersWithoutDuplicates(r),
                    a = s.simplifyParametersIfNecessary(t, i),
                    c = -1 === t.indexOf("?") ? "?" : "&";
                return `${t}${c}${a.toString()}`;
            }
            static urlWithoutParams(e) {
                return e.split("?")[0];
            }
            static paramsFromUrl(e) {
                if (!e) return new URLSearchParams();
                const t = e instanceof URL ? e.href : e;
                if (!t.includes("?")) return new URLSearchParams();
                const n = t.split("?");
                if (n.length <= 1) return new URLSearchParams();
                const o = n[1];
                return new URLSearchParams(o);
            }
            static urlParametersWithoutDuplicates(e) {
                const t = Array.from(e.keys()),
                    n = new Map();
                t.forEach((t) => {
                    const o = e.getAll(t);
                    n.set(t, o[o.length - 1]);
                });
                const o = new URLSearchParams();
                return (
                    n.forEach((e, t) => {
                        o.append(t, e);
                    }),
                    o
                );
            }
            static getUtmParameters() {
                var e;
                const t = "hQwK21wXxR",
                    n = "rKm-km-rKm",
                    o = new URLSearchParams(window.location.search);
                function r(e) {
                    const t = o.get(e);
                    if (null != t && "null" !== t && "undefined" !== t && "" !== t) return t;
                    const n = localStorage.getItem(e);
                    if (!n) return "";
                    const r = localStorage.getItem(u(e));
                    return !r || new Date(r) < new Date() ? (localStorage.removeItem(e), localStorage.removeItem(u(e)), "") : n;
                }
                function i(e) {
                    return e.join(t);
                }
                const a = r("utm_term"),
                    s = r("utm_content"),
                    c = r("utm_medium"),
                    l = r("utm_campaign"),
                    d = (function (e) {
                        const t = (function () {
                            var e;
                            const t = localStorage.getItem("lead");
                            if (!t) return null;
                            const n = JSON.parse(t);
                            return null !== (e = null == n ? void 0 : n._id) && void 0 !== e ? e : null;
                        })();
                        return t ? (e.includes("jLj") ? e : `${e}jLj${t}`) : e;
                    })(r("utm_source")),
                    m = new URLSearchParams();
                m.set("utm_source", d), m.set("utm_campaign", l.includes(n) ? l : `${l}${n}${c}`), m.set("utm_medium", c), m.set("utm_content", s), m.set("utm_term", a);
                const v = null !== (e = m.get("utm_campaign")) && void 0 !== e ? e : "",
                    p = [d, v, c, s, a],
                    w = i(p);
                m.set("subid", d), m.set("sid2", v), m.set("subid2", v), m.set("subid3", c), m.set("subid4", s), m.set("subid5", v);
                const h = r("xcod"),
                    f = r("src"),
                    g = "" !== h ? h : f,
                    y = (function (e, o) {
                        if (e.length <= 2) return !1;
                        if (t.includes("!")) return !0;
                        const r = ["utm_campaign", "utm_content", "utm_term"],
                            i = a.every((e) => t.includes(e)),
                            s = e.length >= 1 && e.length <= 3 && e.every((e) => r.includes(e));
                        if (i) return !0;
                        if (s) return !1;
                        const c = e.length > 2 && e.length <= 4,
                            l = (function (e, t) {
                                return e.length > 2 && e.includes(t[0]) && e.includes(t[1]) && e.includes(t[2]);
                            })(e, r);
                        return c || l;
                    })(o.getAll("utm_campaign"), p)
                        ? g
                        : "desktop";
                return m.set("utm_content", `${y}|${w}`), m;
            }
            static simplifyParametersIfNecessary(e, t) {
                const n = new URLSearchParams(t);
                if (e.includes(i.PandaVideo) || e.includes(i.EplayVideo) || e.includes(i.YouTube)) {
                    const e = n.get("utm_content");
                    if (e && e.includes("|")) {
                        const t = e.split("|")[0];
                        n.set("utm_content", t);
                    }
                }
                return n;
            }
            static observeLinkElements() {
                const e = document.querySelectorAll("a[href]");
                e.forEach((e) => {
                    e.href = s.addUtmParametersToUrl(e.href);
                });
            }
            static observeOnClickElements() {
                const e = document.querySelectorAll("[onclick]");
                e.forEach((element) => {
                    const originalOnClick = element.getAttribute("onclick");
                    element.setAttribute("onclick", function () {
                        const utmParams = s.getUtmParameters();
                        const urlWithUtm = s.addUtmParametersToUrl(window.location.href);
                        const newOnClick = originalOnClick.replace(/(http[s]?:\/\/[^\s]+)/g, urlWithUtm);
                        return new Function(newOnClick).apply(this, arguments);
                    });
                });
            }
            static observeInputElements() {
                const e = document.querySelectorAll("input[data-url]");
                e.forEach((e) => {
                    e.value = s.addUtmParametersToUrl(e.value);
                });
            }
        }
        function c() {
            o || (s.observeLinkElements(), s.observeInputElements(), s.observeOnClickElements());
        }
        document.addEventListener("DOMContentLoaded", c),
            t ||
                (window.addEventListener(
                    "message",
                    (e) => {
                        if (!e.origin.includes("doppus.com")) return;
                        const t = JSON.parse(e.data),
                            n = s.addUtmParametersToUrl(t.href);
                        (window.location.href = n), (window.top.location.href = n);
                    },
                    !1
                ),
                window.addEventListener("load", () => {
                    c();
                }));
    })();
})();
