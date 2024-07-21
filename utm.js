(() => {
    "use strict";
    var e = {
        262: (e, t) => {
            Object.defineProperty(t, "__esModule", { value: !0 });
            t.Random = void 0;
            t.Random = class {
                static chooseOne(e) {
                    return e[Math.floor(Math.random() * e.length)];
                }
            };
        },
        745: (e, t) => {
            Object.defineProperty(t, "__esModule", { value: !0 });
            t.UnicodeHasher = void 0;
            class n {
                static encode(e) {
                    return e.replace(/[0-9]/g, (e => n.map[e]));
                }
                static decode(e) {
                    const t = Object.values(n.map).join("");
                    const o = new RegExp(`[${t}]`, "g");
                    return e.replace(o, (e => Object.keys(n.map).find((t => n.map[t] === e)) || ""));
                }
                static encodeAndInsert(e, t, o = 1) {
                    const r = n.encode(e);
                    return `${t.slice(0, o)}${r}${t.slice(o)}`;
                }
                static decodeAndExtract(e) {
                    const t = Object.values(n.map).join("");
                    const o = new RegExp(`[${t}]`, "g");
                    let r = "";
                    return e.replace(o, (e => {
                        const t = Object.keys(n.map).find((t => n.map[t] === e));
                        return t && (r += t), e;
                    }), "") !== r ? r : null;
                }
                static removeAllEncodedChars(e) {
                    const t = Object.values(n.map).join("");
                    const o = new RegExp(`[${t}]`, "g");
                    return e.replace(o, "");
                }
            }
            t.UnicodeHasher = n;
            n.map = { 0: "​", 1: "‌", 2: "‍", 3: "⁠", 4: "⁡", 5: "⁢", 6: "⁣", 7: "⁤", 8: "‪", 9: "‬" };
        },
        202: (e, t, n) => {
            Object.defineProperty(t, "__esModule", { value: !0 });
            t.UrlRebuilder = void 0;
            const o = n(262), r = n(745);
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
                    const o = null !== (n = i.getQueryParams(e).get("text")) && void 0 !== n ? n : "Olá";
                    const a = t.replace(/[^0-9]/g, "");
                    const s = r.UnicodeHasher.removeAllEncodedChars(o);
                    const c = r.UnicodeHasher.encodeAndInsert(a, s);
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
                    const o = e.split("?")[0];
                    const r = e.split("?")[1];
                    const i = new URLSearchParams(r);
                    return i.set(t, n), `${o}?${i.toString()}`;
                }
            }
            t.UrlRebuilder = i;
        }
    };
    const t = {};
    function n(o) {
        var r = t[o];
        if (void 0 !== r) return r.exports;
        var i = t[o] = { exports: {} };
        return e[o](i, i.exports, n), i.exports;
    }
    (() => {
        const e = n(202);
        console.log("UTMs script loaded! 2.3.11");
        const t = !!document.querySelector("[data-utmify-ignore-iframe]");
        const o = !!document.querySelector("[data-utmify-ignore-retry]");
        var r, i;
        !function(e) {
            e.Doppus = "doppus";
        }(r || (r = {}));
        !function(e) {
            e.PandaVideo = "pandavideo.com";
            e.YouTube = "youtube.com";
            e.EplayVideo = "eplay.video";
        }(i || (i = {}));
        const a = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"];
        class s {
            static addUtmParametersToUrl(e) {
                const t = s.urlWithoutParams(e);
                const n = s.paramsFromUrl(e);
                const o = s.getUtmParameters();
                const r = new URLSearchParams;
                n.forEach((e, t) => r.append(t, e));
                o.forEach((e, t) => r.append(t, e));
                const i = s.urlParametersWithoutDuplicates(r);
                const a = s.simplifyParametersIfNecessary(t, i);
                const c = -1 === t.indexOf("?") ? "?" : "&";
                return `${t}${c}${a.toString()}`;
            }
            static urlWithoutParams(e) {
                return e.split("?")[0];
            }
            static paramsFromUrl(e) {
                if (!e) return new URLSearchParams;
                const t = e instanceof URL ? e.href : e;
                if (!t.includes("?")) return new URLSearchParams;
                const n = t.split("?");
                if (n.length <= 1) return new URLSearchParams;
                const o = n[1];
                return new URLSearchParams(o);
            }
            static urlParametersWithoutDuplicates(e) {
                const t = Array.from(e.keys());
                const n = new Map;
                t.forEach(t => {
                    const o = e.getAll(t);
                    n.set(t, o[o.length - 1]);
                });
                const o = new URLSearchParams;
                n.forEach((e, t) => o.append(t, e));
                return o;
            }
            static getUtmParameters() {
                var e;
                const t = "hQwK21wXxR";
                const n = "rKm-km-rKm";
                const o = new URLSearchParams(window.location.search);
                function r(e) {
                    const t = o.get(e);
                    if (null != t && "null" !== t && "undefined" !== t && "" !== t) return t;
                    const n = localStorage.getItem(e);
                    if (!n) return "";
                    const r = localStorage.getItem(u(e));
                    return !r || new Date(r) < new Date ? (localStorage.removeItem(e), localStorage.removeItem(u(e)), "") : n;
                }
                function i(e) {
                    return e.join(t);
                }
                const a = r("utm_term");
                const s = r("utm_content");
                const c = r("utm_medium");
                const l = r("utm_campaign");
                const d = function(e) {
                    const t = function() {
                        var e;
                        const t = localStorage.getItem("lead");
                        if (!t) return null;
                        const n = JSON.parse(t);
                        return null !== (e = null == n ? void 0 : n._id) && void 0 !== e ? e : null;
                    }();
                    return t ? e.includes("jLj") ? e : `${e}jLj${t}` : e;
                }(r("utm_source"));
                const m = new URLSearchParams;
                m.set("utm_source", d);
                m.set("utm_campaign", l.includes(n) ? l : `${l}${n}${c}`);
                m.set("utm_medium", c);
                m.set("utm_content", s);
                m.set("utm_term", a);
                const v = null !== (e = m.get("utm_campaign")) && void 0 !== e ? e : "";
                const p = [d, v, c, s, a];
                const w = i(p);
                m.set("subid", d);
                m.set("sid2", v);
                m.set("subid2", v);
                m.set("subid3", c);
                m.set("subid4", s);
                m.set("subid5", v);
                const h = r("xcod");
                const f = r("src");
                const g = "" !== h ? h : f;
                const y = function(e, o) {
                    function i(e) {
                        if (e.length <= 255) return e;
                        const r = Math.floor(18.8);
                        function a(e, t, o) {
                            function i(e) {
                                return e.substring(0, r) + "...";
                            }
                            if (!t) return i(e);
                            const a = null != o ? o : "|";
                            const s = e.split(n)[0].split(a);
                            const c = s.length > 1 ? s[s.length - 1] : "";
                            return `${i(1 === s.length ? s[0] : s.slice(0, -1).join(a))}${a}${c}`;
                        }
                        const [s, c, u, l, d] = e.split(t);
                        return i([a(s, !0, "jLj"), a(c, !0), a(u, !0), a(l, !0), a(d, !1)]);
                    }
                    return e.every(e => "" === e) ? g : w;
                }(p.every(e => "" === e) ? g : w);
                m.set("xcod", y);
                m.set("sck", y);
                null != f && "" !== f && m.set("src", f);
                const U = o.get("fbclid");
                return null != U && "" !== U && m.set("fbclid", U), (() => {
                    const e = e => null == e || "" === e;
                    const t = r("utm_source");
                    const n = r("utm_medium");
                    const o = r("utm_campaign");
                    const i = r("utm_content");
                    const a = r("utm_term");
                    const s = r("xcod");
                    const c = r("src");
                    const u = m.get("fbclid");
                    return e(t) && e(n) && e(o) && e(i) && e(a) && e(s) && e(c) && e(u);
                })() && m.set("utm_source", "organic"), m;
            }
            static simplifyParametersIfNecessary(e, t) {
                if (!Object.values(r).some(t => e.includes(t))) return t;
                const n = new URLSearchParams;
                return t.forEach((e, t) => {
                    a.includes(t) && n.append(t, e);
                }), n;
            }
        }
        window.paramsList = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term", "xcod", "src"];
        window.itemExpInDays = 7;
        const c = ["utm_source", "utm_campaign", "utm_medium", "utm_content", "xcod", "sck"];
        function u(e) {
            return `${e}_exp`;
        }
        function l() {
            function n(t) {
                document.querySelectorAll("a").forEach(n => {
                    if (!n.href.startsWith("mailto:") && !n.href.startsWith("tel:") && !n.href.includes("#")) {
                        if (o = n.href, ["wa.me/", "api.whatsapp.com/send", "whatsapp:", "link.dispara.ai/"].some(e => o.includes(e))) {
                            const t = s.getUtmParameters();
                            const o = e.UrlRebuilder.getAdId(t);
                            return n.href = e.UrlRebuilder.randomizePhoneNumberIfNecessary(n.href), void (n.href = e.UrlRebuilder.insertAdIdInWppUrl(n.href, null != o ? o : ""));
                        }
                        var o;
                        if (t && c.every(e => n.href.includes(e))) return;
                        n.href = s.addUtmParametersToUrl(n.href);
                    }
                });
            }
            function o(e) {
                document.querySelectorAll("form").forEach(t => {
                    e && c.every(e => !t.action.includes(e)) || (t.action = s.addUtmParametersToUrl(t.action), s.getUtmParameters().forEach((e, n) => {
                        const o = (r = n, t.querySelector(`input[name="${r}"]`));
                        var r;
                        if (o) return void o.setAttribute("value", e);
                        const i = ((e, t) => {
                            const n = document.createElement("input");
                            return n.type = "hidden", n.name = e, n.value = t, n;
                        })(n, e);
                        t.appendChild(i);
                    }));
                });
            }
            function p() {
                document.querySelectorAll("[onclick]").forEach(btn => {
                    let onclickValue = btn.getAttribute('onclick');
                    const urlMatch = onclickValue.match(/window\.open\s*\(\s*['"`](.*?)['"`]\s*,/);
                    if (urlMatch && urlMatch[1]) {
                        let url = urlMatch[1];
                        url = s.addUtmParametersToUrl(url);
                        btn.setAttribute('onclick', onclickValue.replace(urlMatch[1], url));
                    }
                });
            }
            !function() {
                const e = new URLSearchParams(window.location.search);
                window.paramsList.forEach(t => {
                    const n = e.get(t);
                    n && ((e, t) => {
                        localStorage.setItem(e, t);
                        const n = new Date(new Date().getTime() + 24 * window.itemExpInDays * 60 * 60 * 1e3);
                        localStorage.setItem(u(e), n.toISOString());
                    })(t, n);
                });
            }();
            const r = function() {
                var e, t, n, o, r, i, a, s, c, u, l, d, m, v, p, w, h, f, g, y, U;
                const _ = null !== (n = null === (t = null === (e = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === e ? void 0 : e.themeName) || void 0 === t ? void 0 : t.includes("Dropmeta")) && void 0 !== n && n;
                const P = null !== (i = null === (r = null === (o = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === o ? void 0 : o.themeName) || void 0 === r ? void 0 : r.includes("Warehouse")) && void 0 !== i && i;
                const R = null !== (c = null === (s = null === (a = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === a ? void 0 : a.themeName) || void 0 === s ? void 0 : s.includes("Classic®")) && void 0 !== c && c;
                const b = null !== (d = null === (l = null === (u = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === u ? void 0 : u.themeName) || void 0 === l ? void 0 : l.includes("Tema Vision")) && void 0 !== d && d;
                const O = null !== (p = null === (v = null === (m = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === m ? void 0 : m.themeName) || void 0 === v ? void 0 : v.includes("Waresabino")) && void 0 !== p && p;
                const S = null !== (f = null === (h = null === (w = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === w ? void 0 : w.themeName) || void 0 === h ? void 0 : h.includes("Dawn")) && void 0 !== f && f;
                const E = null !== (U = null === (y = null === (g = null === window || void 0 === window ? void 0 : window.BOOMR) || void 0 === g ? void 0 : g.themeName) || void 0 === y ? void 0 : y.includes("Vortex")) && void 0 !== U && U;
                return _ || P || R || b || O || S || E;
            }();
            n(), function() {
                const e = window.open;
                window.open = function(t, n, o) {
                    var r;
                    return t = s.addUtmParametersToUrl(null !== (r = null == t ? void 0 : t.toString()) && void 0 !== r ? r : ""), e(t, n || "", o || "");
                };
            }(), r || (o(), p(), function() {
                const { body: e } = document;
                new MutationObserver((e, t) => {
                    const r = e => {
                        if (e.nodeType !== Node.ELEMENT_NODE) return !1;
                        const t = e;
                        return "INPUT" === t.tagName && "hidden" === (null == t ? void 0 : t.type);
                    };
                    e.some(e => Array.from(e.addedNodes).some(r)) || (n(!0), o(!0), p());
                }).observe(e, { subtree: !0, childList: !0 });
            }(), t || document.querySelectorAll("iframe").forEach(e => {
                Object.values(i).some(t => e.src.includes(t)) || (e.src = s.addUtmParametersToUrl(e.src));
            }));
        }
    })();
})();
