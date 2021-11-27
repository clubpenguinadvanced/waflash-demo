var Module = function() {
    var e = "undefined" != typeof document && document.currentScript ? document.currentScript.src : void 0;
    return function(r) {
        var t;
        (r = void 0 !== (r = r || {}) ? r : {}).ready = new Promise((function(e, r) {
                t = e, r
            })), r.expectedDataFileDownloads || (r.expectedDataFileDownloads = 0, r.finishedDataFileDownloads = 0), r.expectedDataFileDownloads++,
            function(e) {
                if ("object" == typeof window) window.encodeURIComponent(window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
                else {
                    if ("undefined" == typeof location) throw "using preloaded data can only be done on a web page or in a web worker";
                    encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/")
                }
                var t = "waflash.data";
                "function" != typeof r.locateFilePackage || r.locateFile || (r.locateFile = r.locateFilePackage, p("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)"));
                var n = r.locateFile ? r.locateFile(t, "") : t,
                    i = e.remote_package_size;
                e.package_uuid;
                var a, o, u, s, c = null,
                    l = r.getPreloadedPackage ? r.getPreloadedPackage(n, i) : null;

                function f() {
                    function t(e, r) {
                        if (!e) throw r + (new Error).stack
                    }

                    function n(e, r, t) {
                        this.start = e, this.end = r, this.audio = t
                    }
                    n.prototype = {
                        requests: {},
                        open: function(e, t) {
                            this.name = t, this.requests[t] = this, r.addRunDependency("fp " + this.name)
                        },
                        send: function() {},
                        onload: function() {
                            var e = this.byteArray.subarray(this.start, this.end);
                            this.finish(e)
                        },
                        finish: function(e) {
                            r.FS_createDataFile(this.name, null, e, !0, !0, !0), r.removeRunDependency("fp " + this.name), this.requests[this.name] = null
                        }
                    };
                    for (var i = e.files, a = 0; a < i.length; ++a) new n(i[a].start, i[a].end, i[a].audio).open("GET", i[a].filename);

                    function o(i) {
                        r.finishedDataFileDownloads++, t(i, "Loading data file failed."), t(i instanceof ArrayBuffer, "bad input to processPackageData");
                        var a = new Uint8Array(i);
                        n.prototype.byteArray = a;
                        for (var o = e.files, u = 0; u < o.length; ++u) n.prototype.requests[o[u].filename].onload();
                        r.removeRunDependency("datafile_waflash.data")
                    }
                    r.addRunDependency("datafile_waflash.data"), r.preloadResults || (r.preloadResults = {}), r.preloadResults["waflash.data"] = {
                        fromCache: !1
                    }, l ? (o(l), l = null) : c = o
                }
                l || (a = n, o = i, u = function(e) {
                    c ? (c(e), c = null) : l = e
                }, (s = new XMLHttpRequest).open("GET", a, !0), s.responseType = "arraybuffer", s.onprogress = function(e) {
                    var t = a,
                        n = o;
                    if (e.total && (n = e.total), e.loaded) {
                        s.addedTotal ? r.dataFileDownloads[t].loaded = e.loaded : (s.addedTotal = !0, r.dataFileDownloads || (r.dataFileDownloads = {}), r.dataFileDownloads[t] = {
                            loaded: e.loaded,
                            total: n
                        });
                        var i = 0,
                            u = 0,
                            c = 0;
                        for (var l in r.dataFileDownloads) {
                            var f = r.dataFileDownloads[l];
                            i += f.total, u += f.loaded, c++
                        }
                        i = Math.ceil(i * r.expectedDataFileDownloads / c), r.setStatus && r.setStatus("Downloading data... (" + u + "/" + i + ")")
                    } else r.dataFileDownloads || r.setStatus && r.setStatus("Downloading data...")
                }, s.onerror = function(e) {
                    throw new Error("NetworkError for: " + a)
                }, s.onload = function(e) {
                    if (!(200 == s.status || 304 == s.status || 206 == s.status || 0 == s.status && s.response)) throw new Error(s.statusText + " : " + s.responseURL);
                    var r = s.response;
                    u(r)
                }, s.send(null)), r.calledRun ? f() : (r.preRun || (r.preRun = []), r.preRun.push(f))
            }({
                files: [{
                    filename: "/desktop.ini",
                    start: 0,
                    end: 46,
                    audio: 0
                }, {
                    filename: "/NanumSquareRoundOTFR.otf",
                    start: 46,
                    end: 465950,
                    audio: 0
                }],
                remote_package_size: 465950,
                package_uuid: "8f31e25d-d0a6-4a8f-a179-96a610fbbec2"
            });
        var n, i = {};
        for (n in r) r.hasOwnProperty(n) && (i[n] = r[n]);
        var a, o, u, s, c = [],
            l = "./this.program",
            f = function(e, r) {
                throw r
            },
            d = "";
        document.currentScript && (d = document.currentScript.src), e && (d = e), d = 0 !== d.indexOf("blob:") ? d.substr(0, d.lastIndexOf("/") + 1) : "", a = function(e) {
            var r = new XMLHttpRequest;
            return r.open("GET", e, !1), r.send(null), r.responseText
        }, o = function(e, r, t) {
            var n = new XMLHttpRequest;
            n.open("GET", e, !0), n.responseType = "arraybuffer", n.onload = function() {
                200 == n.status || 0 == n.status && n.response ? r(n.response) : t()
            }, n.onerror = t, n.send(null)
        }, s = function(e) {
            document.title = e
        };
        var m = r.print || console.log.bind(console),
            p = r.printErr || console.warn.bind(console);
        for (n in i) i.hasOwnProperty(n) && (r[n] = i[n]);
        i = null, r.arguments && (c = r.arguments), r.thisProgram && (l = r.thisProgram), r.quit && (f = r.quit);

        function v(e) {
            var r = q[W >> 2],
                t = r + e + 15 & -16;
            return q[W >> 2] = t, r
        }

        function g(e) {
            switch (e) {
                case "i1":
                case "i8":
                    return 1;
                case "i16":
                    return 2;
                case "i32":
                    return 4;
                case "i64":
                    return 8;
                case "float":
                    return 4;
                case "double":
                    return 8;
                default:
                    if ("*" === e[e.length - 1]) return 4;
                    if ("i" === e[0]) {
                        var r = Number(e.substr(1));
                        return D(r % 8 == 0, "getNativeTypeSize invalid bits " + r + ", type " + e), r / 8
                    }
                    return 0
            }
        }

        function h(e) {
            h.shown || (h.shown = {}), h.shown[e] || (h.shown[e] = 1, p(e))
        }

        function _(e, t, n) {
            return n && n.length ? r["dynCall_" + e].apply(null, [t].concat(n)) : r["dynCall_" + e].call(null, t)
        }
        var b, y, w, E = 0,
            x = function(e) {
                E = e
            };

        function k(e, r, t, n) {
            switch ("*" === (t = t || "i8").charAt(t.length - 1) && (t = "i32"), t) {
                case "i1":
                case "i8":
                    O[e >> 0] = r;
                    break;
                case "i16":
                    j[e >> 1] = r;
                    break;
                case "i32":
                    q[e >> 2] = r;
                    break;
                case "i64":
                    _e = [r >>> 0, (he = r, +ae(he) >= 1 ? he > 0 ? (0 | se(+ue(he / 4294967296), 4294967295)) >>> 0 : ~~+oe((he - +(~~he >>> 0)) / 4294967296) >>> 0 : 0)], q[e >> 2] = _e[0], q[e + 4 >> 2] = _e[1];
                    break;
                case "float":
                    V[e >> 2] = r;
                    break;
                case "double":
                    X[e >> 3] = r;
                    break;
                default:
                    pe("invalid type for setValue: " + t)
            }
        }
        r.wasmBinary && (b = r.wasmBinary), r.noExitRuntime && (y = r.noExitRuntime), "object" != typeof WebAssembly && p("no native wasm support detected");
        var C = new WebAssembly.Table({
                initial: 12757,
                maximum: 12757,
                element: "anyfunc"
            }),
            S = !1;

        function D(e, r) {
            e || pe("Assertion failed: " + r)
        }

        function F(e) {
            var t = r["_" + e];
            return D(t, "Cannot call unknown function " + e + ", make sure it is exported"), t
        }

        function A(e, r, t, n, i) {
            var a = {
                string: function(e) {
                    var r = 0;
                    if (null != e && 0 !== e) {
                        var t = 1 + (e.length << 2);
                        B(e, r = wt(t), t)
                    }
                    return r
                },
                array: function(e) {
                    var r = wt(e.length);
                    return function(e, r) {
                        O.set(e, r)
                    }(e, r), r
                }
            };
            var o = F(e),
                u = [],
                s = 0;
            if (n)
                for (var c = 0; c < n.length; c++) {
                    var l = a[t[c]];
                    l ? (0 === s && (s = yt()), u[c] = l(n[c])) : u[c] = n[c]
                }
            var f = o.apply(null, u);
            return f = function(e) {
                return "string" === r ? L(e) : "boolean" === r ? Boolean(e) : e
            }(f), 0 !== s && Et(s), f
        }
        var P = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

        function T(e, r, t) {
            for (var n = r + t, i = r; e[i] && !(i >= n);) ++i;
            if (i - r > 16 && e.subarray && P) return P.decode(e.subarray(r, i));
            for (var a = ""; r < i;) {
                var o = e[r++];
                if (128 & o) {
                    var u = 63 & e[r++];
                    if (192 != (224 & o)) {
                        var s = 63 & e[r++];
                        if ((o = 224 == (240 & o) ? (15 & o) << 12 | u << 6 | s : (7 & o) << 18 | u << 12 | s << 6 | 63 & e[r++]) < 65536) a += String.fromCharCode(o);
                        else {
                            var c = o - 65536;
                            a += String.fromCharCode(55296 | c >> 10, 56320 | 1023 & c)
                        }
                    } else a += String.fromCharCode((31 & o) << 6 | u)
                } else a += String.fromCharCode(o)
            }
            return a
        }

        function L(e, r) {
            return e ? T(G, e, r) : ""
        }

        function I(e, r, t, n) {
            if (!(n > 0)) return 0;
            for (var i = t, a = t + n - 1, o = 0; o < e.length; ++o) {
                var u = e.charCodeAt(o);
                if (u >= 55296 && u <= 57343) u = 65536 + ((1023 & u) << 10) | 1023 & e.charCodeAt(++o);
                if (u <= 127) {
                    if (t >= a) break;
                    r[t++] = u
                } else if (u <= 2047) {
                    if (t + 1 >= a) break;
                    r[t++] = 192 | u >> 6, r[t++] = 128 | 63 & u
                } else if (u <= 65535) {
                    if (t + 2 >= a) break;
                    r[t++] = 224 | u >> 12, r[t++] = 128 | u >> 6 & 63, r[t++] = 128 | 63 & u
                } else {
                    if (t + 3 >= a) break;
                    r[t++] = 240 | u >> 18, r[t++] = 128 | u >> 12 & 63, r[t++] = 128 | u >> 6 & 63, r[t++] = 128 | 63 & u
                }
            }
            return r[t] = 0, t - i
        }

        function B(e, r, t) {
            return I(e, G, r, t)
        }

        function R(e) {
            for (var r = 0, t = 0; t < e.length; ++t) {
                var n = e.charCodeAt(t);
                n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++t)), n <= 127 ? ++r : r += n <= 2047 ? 2 : n <= 65535 ? 3 : 4
            }
            return r
        }
        "undefined" != typeof TextDecoder && new TextDecoder("utf-16le");

        function M(e) {
            var r = R(e) + 1,
                t = Zr(r);
            return t && I(e, O, t, r), t
        }

        function N(e) {
            var r = R(e) + 1,
                t = wt(r);
            return I(e, O, t, r), t
        }
        var U, O, G, j, z, q, Q, V, X;

        function H(e) {
            U = e, r.HEAP8 = O = new Int8Array(e), r.HEAP16 = j = new Int16Array(e), r.HEAP32 = q = new Int32Array(e), r.HEAPU8 = G = new Uint8Array(e), r.HEAPU16 = z = new Uint16Array(e), r.HEAPU32 = Q = new Uint32Array(e), r.HEAPF32 = V = new Float32Array(e), r.HEAPF64 = X = new Float64Array(e)
        }
        var W = 1052496,
            Y = r.INITIAL_MEMORY || 16777216;

        function Z(e) {
            for (; e.length > 0;) {
                var t = e.shift();
                if ("function" != typeof t) {
                    var n = t.func;
                    "number" == typeof n ? void 0 === t.arg ? r.dynCall_v(n) : r.dynCall_vi(n, t.arg) : n(void 0 === t.arg ? null : t.arg)
                } else t(r)
            }
        }(w = r.wasmMemory ? r.wasmMemory : new WebAssembly.Memory({
            initial: Y / 65536,
            maximum: 32768
        })) && (U = w.buffer), Y = U.byteLength, H(U), q[W >> 2] = 6295552;
        var K = [],
            $ = [],
            J = [],
            ee = [],
            re = [],
            te = !1;

        function ne(e, r, t) {
            return e >= 0 ? e : r <= 32 ? 2 * Math.abs(1 << r - 1) + e : Math.pow(2, r) + e
        }

        function ie(e, r, t) {
            if (e <= 0) return e;
            var n = r <= 32 ? Math.abs(1 << r - 1) : Math.pow(2, r - 1);
            return e >= n && (r <= 32 || e > n) && (e = -2 * n + e), e
        }
        var ae = Math.abs,
            oe = Math.ceil,
            ue = Math.floor,
            se = Math.min,
            ce = 0,
            le = null,
            fe = null;

        function de(e) {
            ce++, r.monitorRunDependencies && r.monitorRunDependencies(ce)
        }

        function me(e) {
            if (ce--, r.monitorRunDependencies && r.monitorRunDependencies(ce), 0 == ce && (null !== le && (clearInterval(le), le = null), fe)) {
                var t = fe;
                fe = null, t()
            }
        }

        function pe(e) {
            throw r.onAbort && r.onAbort(e), m(e += ""), p(e), S = !0, 1, e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.", new WebAssembly.RuntimeError(e)
        }
        r.preloadedImages = {}, r.preloadedAudios = {};

        function ve(e) {
            return r = e, t = "data:application/octet-stream;base64,", String.prototype.startsWith ? r.startsWith(t) : 0 === r.indexOf(t);
            var r, t
        }
        var ge, he, _e, be = "waflash.wasm";

        function ye() {
            try {
                if (b) return new Uint8Array(b);
                if (u) return u(be);
                throw "both async and sync fetching of the wasm failed"
            } catch (e) {
                pe(e)
            }
        }
        ve(be) || (ge = be, be = r.locateFile ? r.locateFile(ge, d) : d + ge);
        var we = {
            2390: function(e) {
                const r = L(e);
                Pe.mkdir(r), Pe.mount(Ae, {}, r), Pe.syncfs(!0, (e => {}))
            },
            2968: function() {
                if ("function" != typeof URLSearchParams) return !1;
                return "1" == new URLSearchParams(window.location.search).get("wafv")
            },
            3162: function() {
                const e = window.location.origin + window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1),
                    r = R(e) + 1,
                    t = Zr(r);
                return B(e, t, r), t
            },
            3499: function() {
                r.canvas.addEventListener("keydown", (e => {
                    r.keyboardModifierState = r.keyboardModifierState || {}, r.keyboardModifierState.NumLock = e.getModifierState("NumLock")
                })), document.addEventListener("keydown", (e => {
                    r.keyboardModifierState = r.keyboardModifierState || {}, r.keyboardModifierState.NumLock = e.getModifierState("NumLock")
                }))
            },
            3889: function() {
                if ("function" != typeof URLSearchParams) return 0;
                const e = new URLSearchParams(window.location.search).get("wafsrc");
                if (e) {
                    let r;
                    if (e.startsWith("http://") || e.startsWith("https://")) r = e;
                    else if ("/" == e[0]) r = window.location.origin + e;
                    else {
                        let t = window.location.pathname.substr(0, window.location.pathname.lastIndexOf("/") + 1);
                        r = window.location.origin + t + e
                    }
                    const t = R(r) + 1,
                        n = Zr(t);
                    return B(r, n, t), n
                }
                return 0
            },
            4531: function() {
                if ("function" != typeof URLSearchParams) return !1;
                return "gpu" == new URLSearchParams(window.location.search).get("wafm")
            },
            4718: function() {
                let e = r.canvas.id;
                if (!e) return 0;
                e = "#" + e;
                const t = R(e) + 1,
                    n = Zr(t);
                return B(e, n, t), n
            },
            5713: function() {
                return !(!r.options || !r.options.useMouseWheel)
            },
            6655: function() {
                return r.keyboardModifierState.NumLock
            },
            6704: function() {
                const e = r.canvas.wafActiveInputText;
                e && r.canvas.parentNode.removeChild(e), r.canvas.wafActiveInputText = null, r.canvas.focus()
            },
            6877: function(e, t) {
                const n = r.canvas.wafActiveInputText;
                n && (n.wafSelectionChangedByEngine = !0, n.wafSelectionStart = n.selectionStart = e, n.wafSelectionEnd = n.selectionEnd = t)
            },
            7073: function(e) {
                const t = r.canvas.wafActiveInputText;
                if (t) {
                    const r = L(e);
                    t.value != r && (t.value = r, t.wafSelectionStart = t.selectionStart = r.length, t.wafSelectionEnd = t.selectionEnd = r.length)
                }
            },
            264563: function(e, t) {
                return {
                    high: 2,
                    medium: 1,
                    low: 0
                } [r.options.quality] || t
            },
            886362: function(e) {
                var r = L(e) + "\n\nAbort/Retry/Ignore/AlwaysIgnore? [ariA] :",
                    t = window.prompt(r, "i");
                return null === t && (t = "i"),
                    function(e, r, t, n) {
                        var i, a;
                        "number" == typeof e ? (i = !0, a = e) : (i = !1, a = e.length);
                        var o, u = "string" == typeof r ? r : null;
                        if (o = 3 == t ? n : [Zr, wt, v][t](Math.max(a, u ? 1 : r.length)), i) {
                            var s;
                            for (n = o, D(0 == (3 & o)), s = o + (-4 & a); n < s; n += 4) q[n >> 2] = 0;
                            for (s = o + a; n < s;) O[n++ >> 0] = 0;
                            return o
                        }
                        if ("i8" === u) return e.subarray || e.slice ? G.set(e, o) : G.set(new Uint8Array(e), o), o;
                        for (var c, l, f, d = 0; d < a;) {
                            var m = e[d];
                            0 !== (c = u || r[d]) ? ("i64" == c && (c = "i32"), k(o + d, m, c), f !== c && (l = g(c), f = c), d += l) : d++
                        }
                        return o
                    }(Qr(t), "i8", 0)
            },
            922252: function(e, t, n) {
                var i = e,
                    a = t,
                    o = n;
                r.SDL2 || (r.SDL2 = {});
                var u = r.SDL2;
                u.ctxCanvas !== r.canvas && (u.ctx = r.createContext(r.canvas, !1, !0), u.ctxCanvas = r.canvas), u.w === i && u.h === a && u.imageCtx === u.ctx || (u.image = u.ctx.createImageData(i, a), u.w = i, u.h = a, u.imageCtx = u.ctx);
                var s, c = u.image.data,
                    l = o >> 2,
                    f = 0;
                if ("undefined" != typeof CanvasPixelArray && c instanceof CanvasPixelArray)
                    for (s = c.length; f < s;) {
                        var d = q[l];
                        c[f] = 255 & d, c[f + 1] = d >> 8 & 255, c[f + 2] = d >> 16 & 255, c[f + 3] = 255, l++, f += 4
                    } else {
                        u.data32Data !== c && (u.data32 = new Int32Array(c.buffer), u.data8 = new Uint8Array(c.buffer));
                        var m = u.data32;
                        s = m.length, m.set(q.subarray(l, l + s));
                        var p = u.data8,
                            v = 3,
                            g = v + 4 * s;
                        if (s % 8 == 0)
                            for (; v < g;) p[v] = 255, p[v = v + 4 | 0] = 255, p[v = v + 4 | 0] = 255, p[v = v + 4 | 0] = 255, p[v = v + 4 | 0] = 255, p[v = v + 4 | 0] = 255, p[v = v + 4 | 0] = 255, p[v = v + 4 | 0] = 255, v = v + 4 | 0;
                        else
                            for (; v < g;) p[v] = 255, v = v + 4 | 0
                    }
                return u.ctx.putImageData(u.image, 0, 0), 0
            },
            923731: function(e, r, t, n, i) {
                var a = e,
                    o = r,
                    u = t,
                    s = n,
                    c = i,
                    l = document.createElement("canvas");
                l.width = a, l.height = o;
                var f, d = l.getContext("2d"),
                    m = d.createImageData(a, o),
                    p = m.data,
                    v = c >> 2,
                    g = 0;
                if ("undefined" != typeof CanvasPixelArray && p instanceof CanvasPixelArray)
                    for (f = p.length; g < f;) {
                        var h = q[v];
                        p[g] = 255 & h, p[g + 1] = h >> 8 & 255, p[g + 2] = h >> 16 & 255, p[g + 3] = h >> 24 & 255, v++, g += 4
                    } else {
                        var _ = new Int32Array(p.buffer);
                        f = _.length, _.set(q.subarray(v, v + f))
                    }
                d.putImageData(m, 0, 0);
                var b = 0 === u && 0 === s ? "url(" + l.toDataURL() + "), auto" : "url(" + l.toDataURL() + ") " + u + " " + s + ", auto",
                    y = Zr(b.length + 1);
                return B(b, y, b.length + 1), y
            },
            924720: function(e) {
                return r.canvas && (r.canvas.style.cursor = L(e)), 0
            },
            924813: function() {
                r.canvas && (r.canvas.style.cursor = "none")
            },
            926038: function() {
                return screen.width
            },
            926065: function() {
                return screen.height
            },
            926093: function() {
                return window.innerWidth
            },
            926125: function() {
                return window.innerHeight
            },
            926203: function(e) {
                return void 0 !== s && s(L(e)), 0
            },
            926337: function() {
                return "undefined" != typeof AudioContext || "undefined" != typeof webkitAudioContext ? 1 : 0
            },
            926503: function() {
                return void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia || void 0 !== navigator.webkitGetUserMedia ? 1 : 0
            },
            926729: function(e) {
                void 0 === r.SDL2 && (r.SDL2 = {});
                var t = r.SDL2;
                return e ? t.capture = {} : t.audio = {}, t.audioContext || ("undefined" != typeof AudioContext ? t.audioContext = new AudioContext : "undefined" != typeof webkitAudioContext && (t.audioContext = new webkitAudioContext)), void 0 === t.audioContext ? -1 : 0
            },
            927212: function() {
                return r.SDL2.audioContext.sampleRate
            },
            927282: function(e, t, n, i) {
                var a = r.SDL2,
                    o = function(r) {
                        void 0 !== a.capture.silenceTimer && (clearTimeout(a.capture.silenceTimer), a.capture.silenceTimer = void 0), a.capture.mediaStreamNode = a.audioContext.createMediaStreamSource(r), a.capture.scriptProcessorNode = a.audioContext.createScriptProcessor(t, e, 1), a.capture.scriptProcessorNode.onaudioprocess = function(e) {
                            void 0 !== a && void 0 !== a.capture && (e.outputBuffer.getChannelData(0).fill(0), a.capture.currentCaptureBuffer = e.inputBuffer, _("vi", n, [i]))
                        }, a.capture.mediaStreamNode.connect(a.capture.scriptProcessorNode), a.capture.scriptProcessorNode.connect(a.audioContext.destination), a.capture.stream = r
                    },
                    u = function(e) {};
                a.capture.silenceBuffer = a.audioContext.createBuffer(e, t, a.audioContext.sampleRate), a.capture.silenceBuffer.getChannelData(0).fill(0);
                a.capture.silenceTimer = setTimeout((function() {
                    a.capture.currentCaptureBuffer = a.capture.silenceBuffer, _("vi", n, [i])
                }), t / a.audioContext.sampleRate * 1e3), void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({
                    audio: !0,
                    video: !1
                }).then(o).catch(u) : void 0 !== navigator.webkitGetUserMedia && navigator.webkitGetUserMedia({
                    audio: !0,
                    video: !1
                }, o, u)
            },
            928934: function(e, t, n, i) {
                var a = r.SDL2;
                a.audio.scriptProcessorNode = a.audioContext.createScriptProcessor(t, 0, e), a.audio.scriptProcessorNode.onaudioprocess = function(e) {
                    void 0 !== a && void 0 !== a.audio && (a.audio.currentOutputBuffer = e.outputBuffer, _("vi", n, [i]))
                }, a.audio.scriptProcessorNode.connect(a.audioContext.destination)
            },
            929344: function(e, t) {
                for (var n = r.SDL2, i = n.capture.currentCaptureBuffer.numberOfChannels, a = 0; a < i; ++a) {
                    var o = n.capture.currentCaptureBuffer.getChannelData(a);
                    if (o.length != t) throw "Web Audio capture buffer length mismatch! Destination size: " + o.length + " samples vs expected " + t + " samples!";
                    if (1 == i)
                        for (var u = 0; u < t; ++u) k(e + 4 * u, o[u], "float");
                    else
                        for (u = 0; u < t; ++u) k(e + 4 * (u * i + a), o[u], "float")
                }
            },
            929949: function(e, t) {
                for (var n = r.SDL2, i = n.audio.currentOutputBuffer.numberOfChannels, a = 0; a < i; ++a) {
                    var o = n.audio.currentOutputBuffer.getChannelData(a);
                    if (o.length != t) throw "Web Audio output buffer length mismatch! Destination size: " + o.length + " samples vs expected " + t + " samples!";
                    for (var u = 0; u < t; ++u) o[u] = V[e + (u * i + a << 2) >> 2]
                }
            },
            930429: function(e) {
                var t = r.SDL2;
                if (e) {
                    if (void 0 !== t.capture.silenceTimer && clearTimeout(t.capture.silenceTimer), void 0 !== t.capture.stream) {
                        for (var n = t.capture.stream.getAudioTracks(), i = 0; i < n.length; i++) t.capture.stream.removeTrack(n[i]);
                        t.capture.stream = void 0
                    }
                    void 0 !== t.capture.scriptProcessorNode && (t.capture.scriptProcessorNode.onaudioprocess = function(e) {}, t.capture.scriptProcessorNode.disconnect(), t.capture.scriptProcessorNode = void 0), void 0 !== t.capture.mediaStreamNode && (t.capture.mediaStreamNode.disconnect(), t.capture.mediaStreamNode = void 0), void 0 !== t.capture.silenceBuffer && (t.capture.silenceBuffer = void 0), t.capture = void 0
                } else null != t.audio.scriptProcessorNode && (t.audio.scriptProcessorNode.disconnect(), t.audio.scriptProcessorNode = void 0), t.audio = void 0;
                void 0 !== t.audioContext && void 0 === t.audio && void 0 === t.capture && (t.audioContext.close(), t.audioContext = void 0)
            }
        };

        function Ee() {
            var e = new Error;
            if (!e.stack) {
                try {
                    throw new Error
                } catch (r) {
                    e = r
                }
                if (!e.stack) return "(no stack trace available)"
            }
            return e.stack.toString()
        }

        function xe(e) {
            return q[$r() >> 2] = e, e
        }
        $.push({
            func: function() {
                Wr()
            }
        });
        var ke, Ce = {
                splitPath: function(e) {
                    return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1)
                },
                normalizeArray: function(e, r) {
                    for (var t = 0, n = e.length - 1; n >= 0; n--) {
                        var i = e[n];
                        "." === i ? e.splice(n, 1) : ".." === i ? (e.splice(n, 1), t++) : t && (e.splice(n, 1), t--)
                    }
                    if (r)
                        for (; t; t--) e.unshift("..");
                    return e
                },
                normalize: function(e) {
                    var r = "/" === e.charAt(0),
                        t = "/" === e.substr(-1);
                    return (e = Ce.normalizeArray(e.split("/").filter((function(e) {
                        return !!e
                    })), !r).join("/")) || r || (e = "."), e && t && (e += "/"), (r ? "/" : "") + e
                },
                dirname: function(e) {
                    var r = Ce.splitPath(e),
                        t = r[0],
                        n = r[1];
                    return t || n ? (n && (n = n.substr(0, n.length - 1)), t + n) : "."
                },
                basename: function(e) {
                    if ("/" === e) return "/";
                    var r = e.lastIndexOf("/");
                    return -1 === r ? e : e.substr(r + 1)
                },
                extname: function(e) {
                    return Ce.splitPath(e)[3]
                },
                join: function() {
                    var e = Array.prototype.slice.call(arguments, 0);
                    return Ce.normalize(e.join("/"))
                },
                join2: function(e, r) {
                    return Ce.normalize(e + "/" + r)
                }
            },
            Se = {
                resolve: function() {
                    for (var e = "", r = !1, t = arguments.length - 1; t >= -1 && !r; t--) {
                        var n = t >= 0 ? arguments[t] : Pe.cwd();
                        if ("string" != typeof n) throw new TypeError("Arguments to path.resolve must be strings");
                        if (!n) return "";
                        e = n + "/" + e, r = "/" === n.charAt(0)
                    }
                    return (r ? "/" : "") + (e = Ce.normalizeArray(e.split("/").filter((function(e) {
                        return !!e
                    })), !r).join("/")) || "."
                },
                relative: function(e, r) {
                    function t(e) {
                        for (var r = 0; r < e.length && "" === e[r]; r++);
                        for (var t = e.length - 1; t >= 0 && "" === e[t]; t--);
                        return r > t ? [] : e.slice(r, t - r + 1)
                    }
                    e = Se.resolve(e).substr(1), r = Se.resolve(r).substr(1);
                    for (var n = t(e.split("/")), i = t(r.split("/")), a = Math.min(n.length, i.length), o = a, u = 0; u < a; u++)
                        if (n[u] !== i[u]) {
                            o = u;
                            break
                        } var s = [];
                    for (u = o; u < n.length; u++) s.push("..");
                    return (s = s.concat(i.slice(o))).join("/")
                }
            },
            De = {
                ttys: [],
                init: function() {},
                shutdown: function() {},
                register: function(e, r) {
                    De.ttys[e] = {
                        input: [],
                        output: [],
                        ops: r
                    }, Pe.registerDevice(e, De.stream_ops)
                },
                stream_ops: {
                    open: function(e) {
                        var r = De.ttys[e.node.rdev];
                        if (!r) throw new Pe.ErrnoError(43);
                        e.tty = r, e.seekable = !1
                    },
                    close: function(e) {
                        e.tty.ops.flush(e.tty)
                    },
                    flush: function(e) {
                        e.tty.ops.flush(e.tty)
                    },
                    read: function(e, r, t, n, i) {
                        if (!e.tty || !e.tty.ops.get_char) throw new Pe.ErrnoError(60);
                        for (var a = 0, o = 0; o < n; o++) {
                            var u;
                            try {
                                u = e.tty.ops.get_char(e.tty)
                            } catch (e) {
                                throw new Pe.ErrnoError(29)
                            }
                            if (void 0 === u && 0 === a) throw new Pe.ErrnoError(6);
                            if (null == u) break;
                            a++, r[t + o] = u
                        }
                        return a && (e.node.timestamp = Date.now()), a
                    },
                    write: function(e, r, t, n, i) {
                        if (!e.tty || !e.tty.ops.put_char) throw new Pe.ErrnoError(60);
                        try {
                            for (var a = 0; a < n; a++) e.tty.ops.put_char(e.tty, r[t + a])
                        } catch (e) {
                            throw new Pe.ErrnoError(29)
                        }
                        return n && (e.node.timestamp = Date.now()), a
                    }
                },
                default_tty_ops: {
                    get_char: function(e) {
                        if (!e.input.length) {
                            var r = null;
                            if ("undefined" != typeof window && "function" == typeof window.prompt ? null !== (r = window.prompt("Input: ")) && (r += "\n") : "function" == typeof readline && null !== (r = readline()) && (r += "\n"), !r) return null;
                            e.input = Qr(r, !0)
                        }
                        return e.input.shift()
                    },
                    put_char: function(e, r) {
                        null === r || 10 === r ? (m(T(e.output, 0)), e.output = []) : 0 != r && e.output.push(r)
                    },
                    flush: function(e) {
                        e.output && e.output.length > 0 && (m(T(e.output, 0)), e.output = [])
                    }
                },
                default_tty1_ops: {
                    put_char: function(e, r) {
                        null === r || 10 === r ? (p(T(e.output, 0)), e.output = []) : 0 != r && e.output.push(r)
                    },
                    flush: function(e) {
                        e.output && e.output.length > 0 && (p(T(e.output, 0)), e.output = [])
                    }
                }
            },
            Fe = {
                ops_table: null,
                mount: function(e) {
                    return Fe.createNode(null, "/", 16895, 0)
                },
                createNode: function(e, r, t, n) {
                    if (Pe.isBlkdev(t) || Pe.isFIFO(t)) throw new Pe.ErrnoError(63);
                    Fe.ops_table || (Fe.ops_table = {
                        dir: {
                            node: {
                                getattr: Fe.node_ops.getattr,
                                setattr: Fe.node_ops.setattr,
                                lookup: Fe.node_ops.lookup,
                                mknod: Fe.node_ops.mknod,
                                rename: Fe.node_ops.rename,
                                unlink: Fe.node_ops.unlink,
                                rmdir: Fe.node_ops.rmdir,
                                readdir: Fe.node_ops.readdir,
                                symlink: Fe.node_ops.symlink
                            },
                            stream: {
                                llseek: Fe.stream_ops.llseek
                            }
                        },
                        file: {
                            node: {
                                getattr: Fe.node_ops.getattr,
                                setattr: Fe.node_ops.setattr
                            },
                            stream: {
                                llseek: Fe.stream_ops.llseek,
                                read: Fe.stream_ops.read,
                                write: Fe.stream_ops.write,
                                allocate: Fe.stream_ops.allocate,
                                mmap: Fe.stream_ops.mmap,
                                msync: Fe.stream_ops.msync
                            }
                        },
                        link: {
                            node: {
                                getattr: Fe.node_ops.getattr,
                                setattr: Fe.node_ops.setattr,
                                readlink: Fe.node_ops.readlink
                            },
                            stream: {}
                        },
                        chrdev: {
                            node: {
                                getattr: Fe.node_ops.getattr,
                                setattr: Fe.node_ops.setattr
                            },
                            stream: Pe.chrdev_stream_ops
                        }
                    });
                    var i = Pe.createNode(e, r, t, n);
                    return Pe.isDir(i.mode) ? (i.node_ops = Fe.ops_table.dir.node, i.stream_ops = Fe.ops_table.dir.stream, i.contents = {}) : Pe.isFile(i.mode) ? (i.node_ops = Fe.ops_table.file.node, i.stream_ops = Fe.ops_table.file.stream, i.usedBytes = 0, i.contents = null) : Pe.isLink(i.mode) ? (i.node_ops = Fe.ops_table.link.node, i.stream_ops = Fe.ops_table.link.stream) : Pe.isChrdev(i.mode) && (i.node_ops = Fe.ops_table.chrdev.node, i.stream_ops = Fe.ops_table.chrdev.stream), i.timestamp = Date.now(), e && (e.contents[r] = i), i
                },
                getFileDataAsRegularArray: function(e) {
                    if (e.contents && e.contents.subarray) {
                        for (var r = [], t = 0; t < e.usedBytes; ++t) r.push(e.contents[t]);
                        return r
                    }
                    return e.contents
                },
                getFileDataAsTypedArray: function(e) {
                    return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0)
                },
                expandFileStorage: function(e, r) {
                    var t = e.contents ? e.contents.length : 0;
                    if (!(t >= r)) {
                        r = Math.max(r, t * (t < 1048576 ? 2 : 1.125) >>> 0), 0 != t && (r = Math.max(r, 256));
                        var n = e.contents;
                        e.contents = new Uint8Array(r), e.usedBytes > 0 && e.contents.set(n.subarray(0, e.usedBytes), 0)
                    }
                },
                resizeFileStorage: function(e, r) {
                    if (e.usedBytes != r) {
                        if (0 == r) return e.contents = null, void(e.usedBytes = 0);
                        if (!e.contents || e.contents.subarray) {
                            var t = e.contents;
                            return e.contents = new Uint8Array(r), t && e.contents.set(t.subarray(0, Math.min(r, e.usedBytes))), void(e.usedBytes = r)
                        }
                        if (e.contents || (e.contents = []), e.contents.length > r) e.contents.length = r;
                        else
                            for (; e.contents.length < r;) e.contents.push(0);
                        e.usedBytes = r
                    }
                },
                node_ops: {
                    getattr: function(e) {
                        var r = {};
                        return r.dev = Pe.isChrdev(e.mode) ? e.id : 1, r.ino = e.id, r.mode = e.mode, r.nlink = 1, r.uid = 0, r.gid = 0, r.rdev = e.rdev, Pe.isDir(e.mode) ? r.size = 4096 : Pe.isFile(e.mode) ? r.size = e.usedBytes : Pe.isLink(e.mode) ? r.size = e.link.length : r.size = 0, r.atime = new Date(e.timestamp), r.mtime = new Date(e.timestamp), r.ctime = new Date(e.timestamp), r.blksize = 4096, r.blocks = Math.ceil(r.size / r.blksize), r
                    },
                    setattr: function(e, r) {
                        void 0 !== r.mode && (e.mode = r.mode), void 0 !== r.timestamp && (e.timestamp = r.timestamp), void 0 !== r.size && Fe.resizeFileStorage(e, r.size)
                    },
                    lookup: function(e, r) {
                        throw Pe.genericErrors[44]
                    },
                    mknod: function(e, r, t, n) {
                        return Fe.createNode(e, r, t, n)
                    },
                    rename: function(e, r, t) {
                        if (Pe.isDir(e.mode)) {
                            var n;
                            try {
                                n = Pe.lookupNode(r, t)
                            } catch (e) {}
                            if (n)
                                for (var i in n.contents) throw new Pe.ErrnoError(55)
                        }
                        delete e.parent.contents[e.name], e.name = t, r.contents[t] = e, e.parent = r
                    },
                    unlink: function(e, r) {
                        delete e.contents[r]
                    },
                    rmdir: function(e, r) {
                        var t = Pe.lookupNode(e, r);
                        for (var n in t.contents) throw new Pe.ErrnoError(55);
                        delete e.contents[r]
                    },
                    readdir: function(e) {
                        var r = [".", ".."];
                        for (var t in e.contents) e.contents.hasOwnProperty(t) && r.push(t);
                        return r
                    },
                    symlink: function(e, r, t) {
                        var n = Fe.createNode(e, r, 41471, 0);
                        return n.link = t, n
                    },
                    readlink: function(e) {
                        if (!Pe.isLink(e.mode)) throw new Pe.ErrnoError(28);
                        return e.link
                    }
                },
                stream_ops: {
                    read: function(e, r, t, n, i) {
                        var a = e.node.contents;
                        if (i >= e.node.usedBytes) return 0;
                        var o = Math.min(e.node.usedBytes - i, n);
                        if (o > 8 && a.subarray) r.set(a.subarray(i, i + o), t);
                        else
                            for (var u = 0; u < o; u++) r[t + u] = a[i + u];
                        return o
                    },
                    write: function(e, r, t, n, i, a) {
                        if (r.buffer === O.buffer && (a = !1), !n) return 0;
                        var o = e.node;
                        if (o.timestamp = Date.now(), r.subarray && (!o.contents || o.contents.subarray)) {
                            if (a) return o.contents = r.subarray(t, t + n), o.usedBytes = n, n;
                            if (0 === o.usedBytes && 0 === i) return o.contents = r.slice(t, t + n), o.usedBytes = n, n;
                            if (i + n <= o.usedBytes) return o.contents.set(r.subarray(t, t + n), i), n
                        }
                        if (Fe.expandFileStorage(o, i + n), o.contents.subarray && r.subarray) o.contents.set(r.subarray(t, t + n), i);
                        else
                            for (var u = 0; u < n; u++) o.contents[i + u] = r[t + u];
                        return o.usedBytes = Math.max(o.usedBytes, i + n), n
                    },
                    llseek: function(e, r, t) {
                        var n = r;
                        if (1 === t ? n += e.position : 2 === t && Pe.isFile(e.node.mode) && (n += e.node.usedBytes), n < 0) throw new Pe.ErrnoError(28);
                        return n
                    },
                    allocate: function(e, r, t) {
                        Fe.expandFileStorage(e.node, r + t), e.node.usedBytes = Math.max(e.node.usedBytes, r + t)
                    },
                    mmap: function(e, r, t, n, i, a, o) {
                        if (!Pe.isFile(e.node.mode)) throw new Pe.ErrnoError(43);
                        var u, s, c = e.node.contents;
                        if (2 & o || c.buffer !== r.buffer) {
                            (i > 0 || i + n < c.length) && (c = c.subarray ? c.subarray(i, i + n) : Array.prototype.slice.call(c, i, i + n)), s = !0;
                            var l = r.buffer == O.buffer;
                            if (!(u = Zr(n))) throw new Pe.ErrnoError(48);
                            (l ? O : r).set(c, u)
                        } else s = !1, u = c.byteOffset;
                        return {
                            ptr: u,
                            allocated: s
                        }
                    },
                    msync: function(e, r, t, n, i) {
                        if (!Pe.isFile(e.node.mode)) throw new Pe.ErrnoError(43);
                        if (2 & i) return 0;
                        Fe.stream_ops.write(e, r, 0, n, t, !1);
                        return 0
                    }
                }
            },
            Ae = {
                dbs: {},
                indexedDB: function() {
                    if ("undefined" != typeof indexedDB) return indexedDB;
                    var e = null;
                    return "object" == typeof window && (e = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB), D(e, "IDBFS used, but indexedDB not supported"), e
                },
                DB_VERSION: 21,
                DB_STORE_NAME: "FILE_DATA",
                mount: function(e) {
                    return Fe.mount.apply(null, arguments)
                },
                syncfs: function(e, r, t) {
                    Ae.getLocalSet(e, (function(n, i) {
                        if (n) return t(n);
                        Ae.getRemoteSet(e, (function(e, n) {
                            if (e) return t(e);
                            var a = r ? n : i,
                                o = r ? i : n;
                            Ae.reconcile(a, o, t)
                        }))
                    }))
                },
                getDB: function(e, r) {
                    var t, n = Ae.dbs[e];
                    if (n) return r(null, n);
                    try {
                        t = Ae.indexedDB().open(e, Ae.DB_VERSION)
                    } catch (e) {
                        return r(e)
                    }
                    if (!t) return r("Unable to connect to IndexedDB");
                    t.onupgradeneeded = function(e) {
                        var r, t = e.target.result,
                            n = e.target.transaction;
                        (r = t.objectStoreNames.contains(Ae.DB_STORE_NAME) ? n.objectStore(Ae.DB_STORE_NAME) : t.createObjectStore(Ae.DB_STORE_NAME)).indexNames.contains("timestamp") || r.createIndex("timestamp", "timestamp", {
                            unique: !1
                        })
                    }, t.onsuccess = function() {
                        n = t.result, Ae.dbs[e] = n, r(null, n)
                    }, t.onerror = function(e) {
                        r(this.error), e.preventDefault()
                    }
                },
                getLocalSet: function(e, r) {
                    var t = {};

                    function n(e) {
                        return "." !== e && ".." !== e
                    }

                    function i(e) {
                        return function(r) {
                            return Ce.join2(e, r)
                        }
                    }
                    for (var a = Pe.readdir(e.mountpoint).filter(n).map(i(e.mountpoint)); a.length;) {
                        var o, u = a.pop();
                        try {
                            o = Pe.stat(u)
                        } catch (e) {
                            return r(e)
                        }
                        Pe.isDir(o.mode) && a.push.apply(a, Pe.readdir(u).filter(n).map(i(u))), t[u] = {
                            timestamp: o.mtime
                        }
                    }
                    return r(null, {
                        type: "local",
                        entries: t
                    })
                },
                getRemoteSet: function(e, r) {
                    var t = {};
                    Ae.getDB(e.mountpoint, (function(e, n) {
                        if (e) return r(e);
                        try {
                            var i = n.transaction([Ae.DB_STORE_NAME], "readonly");
                            i.onerror = function(e) {
                                r(this.error), e.preventDefault()
                            }, i.objectStore(Ae.DB_STORE_NAME).index("timestamp").openKeyCursor().onsuccess = function(e) {
                                var i = e.target.result;
                                if (!i) return r(null, {
                                    type: "remote",
                                    db: n,
                                    entries: t
                                });
                                t[i.primaryKey] = {
                                    timestamp: i.key
                                }, i.continue()
                            }
                        } catch (e) {
                            return r(e)
                        }
                    }))
                },
                loadLocalEntry: function(e, r) {
                    var t, n;
                    try {
                        n = Pe.lookupPath(e).node, t = Pe.stat(e)
                    } catch (e) {
                        return r(e)
                    }
                    return Pe.isDir(t.mode) ? r(null, {
                        timestamp: t.mtime,
                        mode: t.mode
                    }) : Pe.isFile(t.mode) ? (n.contents = Fe.getFileDataAsTypedArray(n), r(null, {
                        timestamp: t.mtime,
                        mode: t.mode,
                        contents: n.contents
                    })) : r(new Error("node type not supported"))
                },
                storeLocalEntry: function(e, r, t) {
                    try {
                        if (Pe.isDir(r.mode)) Pe.mkdir(e, r.mode);
                        else {
                            if (!Pe.isFile(r.mode)) return t(new Error("node type not supported"));
                            Pe.writeFile(e, r.contents, {
                                canOwn: !0
                            })
                        }
                        Pe.chmod(e, r.mode), Pe.utime(e, r.timestamp, r.timestamp)
                    } catch (e) {
                        return t(e)
                    }
                    t(null)
                },
                removeLocalEntry: function(e, r) {
                    try {
                        Pe.lookupPath(e);
                        var t = Pe.stat(e);
                        Pe.isDir(t.mode) ? Pe.rmdir(e) : Pe.isFile(t.mode) && Pe.unlink(e)
                    } catch (e) {
                        return r(e)
                    }
                    r(null)
                },
                loadRemoteEntry: function(e, r, t) {
                    var n = e.get(r);
                    n.onsuccess = function(e) {
                        t(null, e.target.result)
                    }, n.onerror = function(e) {
                        t(this.error), e.preventDefault()
                    }
                },
                storeRemoteEntry: function(e, r, t, n) {
                    var i = e.put(t, r);
                    i.onsuccess = function() {
                        n(null)
                    }, i.onerror = function(e) {
                        n(this.error), e.preventDefault()
                    }
                },
                removeRemoteEntry: function(e, r, t) {
                    var n = e.delete(r);
                    n.onsuccess = function() {
                        t(null)
                    }, n.onerror = function(e) {
                        t(this.error), e.preventDefault()
                    }
                },
                reconcile: function(e, r, t) {
                    var n = 0,
                        i = [];
                    Object.keys(e.entries).forEach((function(t) {
                        var a = e.entries[t],
                            o = r.entries[t];
                        (!o || a.timestamp > o.timestamp) && (i.push(t), n++)
                    }));
                    var a = [];
                    if (Object.keys(r.entries).forEach((function(t) {
                            r.entries[t];
                            e.entries[t] || (a.push(t), n++)
                        })), !n) return t(null);
                    var o = !1,
                        u = ("remote" === e.type ? e.db : r.db).transaction([Ae.DB_STORE_NAME], "readwrite"),
                        s = u.objectStore(Ae.DB_STORE_NAME);

                    function c(e) {
                        if (e && !o) return o = !0, t(e)
                    }
                    u.onerror = function(e) {
                        c(this.error), e.preventDefault()
                    }, u.oncomplete = function(e) {
                        o || t(null)
                    }, i.sort().forEach((function(e) {
                        "local" === r.type ? Ae.loadRemoteEntry(s, e, (function(r, t) {
                            if (r) return c(r);
                            Ae.storeLocalEntry(e, t, c)
                        })) : Ae.loadLocalEntry(e, (function(r, t) {
                            if (r) return c(r);
                            Ae.storeRemoteEntry(s, e, t, c)
                        }))
                    })), a.sort().reverse().forEach((function(e) {
                        "local" === r.type ? Ae.removeLocalEntry(e, c) : Ae.removeRemoteEntry(s, e, c)
                    }))
                }
            },
            Pe = {
                root: null,
                mounts: [],
                devices: {},
                streams: [],
                nextInode: 1,
                nameTable: null,
                currentPath: "/",
                initialized: !1,
                ignorePermissions: !0,
                trackingDelegate: {},
                tracking: {
                    openFlags: {
                        READ: 1,
                        WRITE: 2
                    }
                },
                ErrnoError: null,
                genericErrors: {},
                filesystems: null,
                syncFSRequests: 0,
                handleFSError: function(e) {
                    if (!(e instanceof Pe.ErrnoError)) throw e + " : " + (t = Ee(), r.extraStackTrace && (t += "\n" + r.extraStackTrace()), t.replace(/\b_Z[\w\d_]+/g, (function(e) {
                        return e == e ? e : e + " [" + e + "]"
                    })));
                    var t;
                    return xe(e.errno)
                },
                lookupPath: function(e, r) {
                    if (r = r || {}, !(e = Se.resolve(Pe.cwd(), e))) return {
                        path: "",
                        node: null
                    };
                    var t = {
                        follow_mount: !0,
                        recurse_count: 0
                    };
                    for (var n in t) void 0 === r[n] && (r[n] = t[n]);
                    if (r.recurse_count > 8) throw new Pe.ErrnoError(32);
                    for (var i = Ce.normalizeArray(e.split("/").filter((function(e) {
                            return !!e
                        })), !1), a = Pe.root, o = "/", u = 0; u < i.length; u++) {
                        var s = u === i.length - 1;
                        if (s && r.parent) break;
                        if (a = Pe.lookupNode(a, i[u]), o = Ce.join2(o, i[u]), Pe.isMountpoint(a) && (!s || s && r.follow_mount) && (a = a.mounted.root), !s || r.follow)
                            for (var c = 0; Pe.isLink(a.mode);) {
                                var l = Pe.readlink(o);
                                if (o = Se.resolve(Ce.dirname(o), l), a = Pe.lookupPath(o, {
                                        recurse_count: r.recurse_count
                                    }).node, c++ > 40) throw new Pe.ErrnoError(32)
                            }
                    }
                    return {
                        path: o,
                        node: a
                    }
                },
                getPath: function(e) {
                    for (var r;;) {
                        if (Pe.isRoot(e)) {
                            var t = e.mount.mountpoint;
                            return r ? "/" !== t[t.length - 1] ? t + "/" + r : t + r : t
                        }
                        r = r ? e.name + "/" + r : e.name, e = e.parent
                    }
                },
                hashName: function(e, r) {
                    for (var t = 0, n = 0; n < r.length; n++) t = (t << 5) - t + r.charCodeAt(n) | 0;
                    return (e + t >>> 0) % Pe.nameTable.length
                },
                hashAddNode: function(e) {
                    var r = Pe.hashName(e.parent.id, e.name);
                    e.name_next = Pe.nameTable[r], Pe.nameTable[r] = e
                },
                hashRemoveNode: function(e) {
                    var r = Pe.hashName(e.parent.id, e.name);
                    if (Pe.nameTable[r] === e) Pe.nameTable[r] = e.name_next;
                    else
                        for (var t = Pe.nameTable[r]; t;) {
                            if (t.name_next === e) {
                                t.name_next = e.name_next;
                                break
                            }
                            t = t.name_next
                        }
                },
                lookupNode: function(e, r) {
                    var t = Pe.mayLookup(e);
                    if (t) throw new Pe.ErrnoError(t, e);
                    for (var n = Pe.hashName(e.id, r), i = Pe.nameTable[n]; i; i = i.name_next) {
                        var a = i.name;
                        if (i.parent.id === e.id && a === r) return i
                    }
                    return Pe.lookup(e, r)
                },
                createNode: function(e, r, t, n) {
                    var i = new Pe.FSNode(e, r, t, n);
                    return Pe.hashAddNode(i), i
                },
                destroyNode: function(e) {
                    Pe.hashRemoveNode(e)
                },
                isRoot: function(e) {
                    return e === e.parent
                },
                isMountpoint: function(e) {
                    return !!e.mounted
                },
                isFile: function(e) {
                    return 32768 == (61440 & e)
                },
                isDir: function(e) {
                    return 16384 == (61440 & e)
                },
                isLink: function(e) {
                    return 40960 == (61440 & e)
                },
                isChrdev: function(e) {
                    return 8192 == (61440 & e)
                },
                isBlkdev: function(e) {
                    return 24576 == (61440 & e)
                },
                isFIFO: function(e) {
                    return 4096 == (61440 & e)
                },
                isSocket: function(e) {
                    return 49152 == (49152 & e)
                },
                flagModes: {
                    r: 0,
                    rs: 1052672,
                    "r+": 2,
                    w: 577,
                    wx: 705,
                    xw: 705,
                    "w+": 578,
                    "wx+": 706,
                    "xw+": 706,
                    a: 1089,
                    ax: 1217,
                    xa: 1217,
                    "a+": 1090,
                    "ax+": 1218,
                    "xa+": 1218
                },
                modeStringToFlags: function(e) {
                    var r = Pe.flagModes[e];
                    if (void 0 === r) throw new Error("Unknown file open mode: " + e);
                    return r
                },
                flagsToPermissionString: function(e) {
                    var r = ["r", "w", "rw"][3 & e];
                    return 512 & e && (r += "w"), r
                },
                nodePermissions: function(e, r) {
                    return Pe.ignorePermissions || (-1 === r.indexOf("r") || 292 & e.mode) && (-1 === r.indexOf("w") || 146 & e.mode) && (-1 === r.indexOf("x") || 73 & e.mode) ? 0 : 2
                },
                mayLookup: function(e) {
                    var r = Pe.nodePermissions(e, "x");
                    return r || (e.node_ops.lookup ? 0 : 2)
                },
                mayCreate: function(e, r) {
                    try {
                        Pe.lookupNode(e, r);
                        return 20
                    } catch (e) {}
                    return Pe.nodePermissions(e, "wx")
                },
                mayDelete: function(e, r, t) {
                    var n;
                    try {
                        n = Pe.lookupNode(e, r)
                    } catch (e) {
                        return e.errno
                    }
                    var i = Pe.nodePermissions(e, "wx");
                    if (i) return i;
                    if (t) {
                        if (!Pe.isDir(n.mode)) return 54;
                        if (Pe.isRoot(n) || Pe.getPath(n) === Pe.cwd()) return 10
                    } else if (Pe.isDir(n.mode)) return 31;
                    return 0
                },
                mayOpen: function(e, r) {
                    return e ? Pe.isLink(e.mode) ? 32 : Pe.isDir(e.mode) && ("r" !== Pe.flagsToPermissionString(r) || 512 & r) ? 31 : Pe.nodePermissions(e, Pe.flagsToPermissionString(r)) : 44
                },
                MAX_OPEN_FDS: 4096,
                nextfd: function(e, r) {
                    e = e || 0, r = r || Pe.MAX_OPEN_FDS;
                    for (var t = e; t <= r; t++)
                        if (!Pe.streams[t]) return t;
                    throw new Pe.ErrnoError(33)
                },
                getStream: function(e) {
                    return Pe.streams[e]
                },
                createStream: function(e, r, t) {
                    Pe.FSStream || (Pe.FSStream = function() {}, Pe.FSStream.prototype = {
                        object: {
                            get: function() {
                                return this.node
                            },
                            set: function(e) {
                                this.node = e
                            }
                        },
                        isRead: {
                            get: function() {
                                return 1 != (2097155 & this.flags)
                            }
                        },
                        isWrite: {
                            get: function() {
                                return 0 != (2097155 & this.flags)
                            }
                        },
                        isAppend: {
                            get: function() {
                                return 1024 & this.flags
                            }
                        }
                    });
                    var n = new Pe.FSStream;
                    for (var i in e) n[i] = e[i];
                    e = n;
                    var a = Pe.nextfd(r, t);
                    return e.fd = a, Pe.streams[a] = e, e
                },
                closeStream: function(e) {
                    Pe.streams[e] = null
                },
                chrdev_stream_ops: {
                    open: function(e) {
                        var r = Pe.getDevice(e.node.rdev);
                        e.stream_ops = r.stream_ops, e.stream_ops.open && e.stream_ops.open(e)
                    },
                    llseek: function() {
                        throw new Pe.ErrnoError(70)
                    }
                },
                major: function(e) {
                    return e >> 8
                },
                minor: function(e) {
                    return 255 & e
                },
                makedev: function(e, r) {
                    return e << 8 | r
                },
                registerDevice: function(e, r) {
                    Pe.devices[e] = {
                        stream_ops: r
                    }
                },
                getDevice: function(e) {
                    return Pe.devices[e]
                },
                getMounts: function(e) {
                    for (var r = [], t = [e]; t.length;) {
                        var n = t.pop();
                        r.push(n), t.push.apply(t, n.mounts)
                    }
                    return r
                },
                syncfs: function(e, r) {
                    "function" == typeof e && (r = e, e = !1), Pe.syncFSRequests++, Pe.syncFSRequests > 1 && p("warning: " + Pe.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
                    var t = Pe.getMounts(Pe.root.mount),
                        n = 0;

                    function i(e) {
                        return Pe.syncFSRequests--, r(e)
                    }

                    function a(e) {
                        if (e) return a.errored ? void 0 : (a.errored = !0, i(e));
                        ++n >= t.length && i(null)
                    }
                    t.forEach((function(r) {
                        if (!r.type.syncfs) return a(null);
                        r.type.syncfs(r, e, a)
                    }))
                },
                mount: function(e, r, t) {
                    var n, i = "/" === t,
                        a = !t;
                    if (i && Pe.root) throw new Pe.ErrnoError(10);
                    if (!i && !a) {
                        var o = Pe.lookupPath(t, {
                            follow_mount: !1
                        });
                        if (t = o.path, n = o.node, Pe.isMountpoint(n)) throw new Pe.ErrnoError(10);
                        if (!Pe.isDir(n.mode)) throw new Pe.ErrnoError(54)
                    }
                    var u = {
                            type: e,
                            opts: r,
                            mountpoint: t,
                            mounts: []
                        },
                        s = e.mount(u);
                    return s.mount = u, u.root = s, i ? Pe.root = s : n && (n.mounted = u, n.mount && n.mount.mounts.push(u)), s
                },
                unmount: function(e) {
                    var r = Pe.lookupPath(e, {
                        follow_mount: !1
                    });
                    if (!Pe.isMountpoint(r.node)) throw new Pe.ErrnoError(28);
                    var t = r.node,
                        n = t.mounted,
                        i = Pe.getMounts(n);
                    Object.keys(Pe.nameTable).forEach((function(e) {
                        for (var r = Pe.nameTable[e]; r;) {
                            var t = r.name_next; - 1 !== i.indexOf(r.mount) && Pe.destroyNode(r), r = t
                        }
                    })), t.mounted = null;
                    var a = t.mount.mounts.indexOf(n);
                    t.mount.mounts.splice(a, 1)
                },
                lookup: function(e, r) {
                    return e.node_ops.lookup(e, r)
                },
                mknod: function(e, r, t) {
                    var n = Pe.lookupPath(e, {
                            parent: !0
                        }).node,
                        i = Ce.basename(e);
                    if (!i || "." === i || ".." === i) throw new Pe.ErrnoError(28);
                    var a = Pe.mayCreate(n, i);
                    if (a) throw new Pe.ErrnoError(a);
                    if (!n.node_ops.mknod) throw new Pe.ErrnoError(63);
                    return n.node_ops.mknod(n, i, r, t)
                },
                create: function(e, r) {
                    return r = void 0 !== r ? r : 438, r &= 4095, r |= 32768, Pe.mknod(e, r, 0)
                },
                mkdir: function(e, r) {
                    return r = void 0 !== r ? r : 511, r &= 1023, r |= 16384, Pe.mknod(e, r, 0)
                },
                mkdirTree: function(e, r) {
                    for (var t = e.split("/"), n = "", i = 0; i < t.length; ++i)
                        if (t[i]) {
                            n += "/" + t[i];
                            try {
                                Pe.mkdir(n, r)
                            } catch (e) {
                                if (20 != e.errno) throw e
                            }
                        }
                },
                mkdev: function(e, r, t) {
                    return void 0 === t && (t = r, r = 438), r |= 8192, Pe.mknod(e, r, t)
                },
                symlink: function(e, r) {
                    if (!Se.resolve(e)) throw new Pe.ErrnoError(44);
                    var t = Pe.lookupPath(r, {
                        parent: !0
                    }).node;
                    if (!t) throw new Pe.ErrnoError(44);
                    var n = Ce.basename(r),
                        i = Pe.mayCreate(t, n);
                    if (i) throw new Pe.ErrnoError(i);
                    if (!t.node_ops.symlink) throw new Pe.ErrnoError(63);
                    return t.node_ops.symlink(t, n, e)
                },
                rename: function(e, r) {
                    var t, n, i = Ce.dirname(e),
                        a = Ce.dirname(r),
                        o = Ce.basename(e),
                        u = Ce.basename(r);
                    try {
                        t = Pe.lookupPath(e, {
                            parent: !0
                        }).node, n = Pe.lookupPath(r, {
                            parent: !0
                        }).node
                    } catch (e) {
                        throw new Pe.ErrnoError(10)
                    }
                    if (!t || !n) throw new Pe.ErrnoError(44);
                    if (t.mount !== n.mount) throw new Pe.ErrnoError(75);
                    var s, c = Pe.lookupNode(t, o),
                        l = Se.relative(e, a);
                    if ("." !== l.charAt(0)) throw new Pe.ErrnoError(28);
                    if ("." !== (l = Se.relative(r, i)).charAt(0)) throw new Pe.ErrnoError(55);
                    try {
                        s = Pe.lookupNode(n, u)
                    } catch (e) {}
                    if (c !== s) {
                        var f = Pe.isDir(c.mode),
                            d = Pe.mayDelete(t, o, f);
                        if (d) throw new Pe.ErrnoError(d);
                        if (d = s ? Pe.mayDelete(n, u, f) : Pe.mayCreate(n, u)) throw new Pe.ErrnoError(d);
                        if (!t.node_ops.rename) throw new Pe.ErrnoError(63);
                        if (Pe.isMountpoint(c) || s && Pe.isMountpoint(s)) throw new Pe.ErrnoError(10);
                        if (n !== t && (d = Pe.nodePermissions(t, "w"))) throw new Pe.ErrnoError(d);
                        try {
                            Pe.trackingDelegate.willMovePath && Pe.trackingDelegate.willMovePath(e, r)
                        } catch (t) {
                            p("FS.trackingDelegate['willMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message)
                        }
                        Pe.hashRemoveNode(c);
                        try {
                            t.node_ops.rename(c, n, u)
                        } catch (e) {
                            throw e
                        } finally {
                            Pe.hashAddNode(c)
                        }
                        try {
                            Pe.trackingDelegate.onMovePath && Pe.trackingDelegate.onMovePath(e, r)
                        } catch (t) {
                            p("FS.trackingDelegate['onMovePath']('" + e + "', '" + r + "') threw an exception: " + t.message)
                        }
                    }
                },
                rmdir: function(e) {
                    var r = Pe.lookupPath(e, {
                            parent: !0
                        }).node,
                        t = Ce.basename(e),
                        n = Pe.lookupNode(r, t),
                        i = Pe.mayDelete(r, t, !0);
                    if (i) throw new Pe.ErrnoError(i);
                    if (!r.node_ops.rmdir) throw new Pe.ErrnoError(63);
                    if (Pe.isMountpoint(n)) throw new Pe.ErrnoError(10);
                    try {
                        Pe.trackingDelegate.willDeletePath && Pe.trackingDelegate.willDeletePath(e)
                    } catch (r) {
                        p("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message)
                    }
                    r.node_ops.rmdir(r, t), Pe.destroyNode(n);
                    try {
                        Pe.trackingDelegate.onDeletePath && Pe.trackingDelegate.onDeletePath(e)
                    } catch (r) {
                        p("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message)
                    }
                },
                readdir: function(e) {
                    var r = Pe.lookupPath(e, {
                        follow: !0
                    }).node;
                    if (!r.node_ops.readdir) throw new Pe.ErrnoError(54);
                    return r.node_ops.readdir(r)
                },
                unlink: function(e) {
                    var r = Pe.lookupPath(e, {
                            parent: !0
                        }).node,
                        t = Ce.basename(e),
                        n = Pe.lookupNode(r, t),
                        i = Pe.mayDelete(r, t, !1);
                    if (i) throw new Pe.ErrnoError(i);
                    if (!r.node_ops.unlink) throw new Pe.ErrnoError(63);
                    if (Pe.isMountpoint(n)) throw new Pe.ErrnoError(10);
                    try {
                        Pe.trackingDelegate.willDeletePath && Pe.trackingDelegate.willDeletePath(e)
                    } catch (r) {
                        p("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + r.message)
                    }
                    r.node_ops.unlink(r, t), Pe.destroyNode(n);
                    try {
                        Pe.trackingDelegate.onDeletePath && Pe.trackingDelegate.onDeletePath(e)
                    } catch (r) {
                        p("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + r.message)
                    }
                },
                readlink: function(e) {
                    var r = Pe.lookupPath(e).node;
                    if (!r) throw new Pe.ErrnoError(44);
                    if (!r.node_ops.readlink) throw new Pe.ErrnoError(28);
                    return Se.resolve(Pe.getPath(r.parent), r.node_ops.readlink(r))
                },
                stat: function(e, r) {
                    var t = Pe.lookupPath(e, {
                        follow: !r
                    }).node;
                    if (!t) throw new Pe.ErrnoError(44);
                    if (!t.node_ops.getattr) throw new Pe.ErrnoError(63);
                    return t.node_ops.getattr(t)
                },
                lstat: function(e) {
                    return Pe.stat(e, !0)
                },
                chmod: function(e, r, t) {
                    var n;
                    "string" == typeof e ? n = Pe.lookupPath(e, {
                        follow: !t
                    }).node : n = e;
                    if (!n.node_ops.setattr) throw new Pe.ErrnoError(63);
                    n.node_ops.setattr(n, {
                        mode: 4095 & r | -4096 & n.mode,
                        timestamp: Date.now()
                    })
                },
                lchmod: function(e, r) {
                    Pe.chmod(e, r, !0)
                },
                fchmod: function(e, r) {
                    var t = Pe.getStream(e);
                    if (!t) throw new Pe.ErrnoError(8);
                    Pe.chmod(t.node, r)
                },
                chown: function(e, r, t, n) {
                    var i;
                    "string" == typeof e ? i = Pe.lookupPath(e, {
                        follow: !n
                    }).node : i = e;
                    if (!i.node_ops.setattr) throw new Pe.ErrnoError(63);
                    i.node_ops.setattr(i, {
                        timestamp: Date.now()
                    })
                },
                lchown: function(e, r, t) {
                    Pe.chown(e, r, t, !0)
                },
                fchown: function(e, r, t) {
                    var n = Pe.getStream(e);
                    if (!n) throw new Pe.ErrnoError(8);
                    Pe.chown(n.node, r, t)
                },
                truncate: function(e, r) {
                    if (r < 0) throw new Pe.ErrnoError(28);
                    var t;
                    "string" == typeof e ? t = Pe.lookupPath(e, {
                        follow: !0
                    }).node : t = e;
                    if (!t.node_ops.setattr) throw new Pe.ErrnoError(63);
                    if (Pe.isDir(t.mode)) throw new Pe.ErrnoError(31);
                    if (!Pe.isFile(t.mode)) throw new Pe.ErrnoError(28);
                    var n = Pe.nodePermissions(t, "w");
                    if (n) throw new Pe.ErrnoError(n);
                    t.node_ops.setattr(t, {
                        size: r,
                        timestamp: Date.now()
                    })
                },
                ftruncate: function(e, r) {
                    var t = Pe.getStream(e);
                    if (!t) throw new Pe.ErrnoError(8);
                    if (0 == (2097155 & t.flags)) throw new Pe.ErrnoError(28);
                    Pe.truncate(t.node, r)
                },
                utime: function(e, r, t) {
                    var n = Pe.lookupPath(e, {
                        follow: !0
                    }).node;
                    n.node_ops.setattr(n, {
                        timestamp: Math.max(r, t)
                    })
                },
                open: function(e, t, n, i, a) {
                    if ("" === e) throw new Pe.ErrnoError(44);
                    var o;
                    if (n = void 0 === n ? 438 : n, n = 64 & (t = "string" == typeof t ? Pe.modeStringToFlags(t) : t) ? 4095 & n | 32768 : 0, "object" == typeof e) o = e;
                    else {
                        e = Ce.normalize(e);
                        try {
                            o = Pe.lookupPath(e, {
                                follow: !(131072 & t)
                            }).node
                        } catch (e) {}
                    }
                    var u = !1;
                    if (64 & t)
                        if (o) {
                            if (128 & t) throw new Pe.ErrnoError(20)
                        } else o = Pe.mknod(e, n, 0), u = !0;
                    if (!o) throw new Pe.ErrnoError(44);
                    if (Pe.isChrdev(o.mode) && (t &= -513), 65536 & t && !Pe.isDir(o.mode)) throw new Pe.ErrnoError(54);
                    if (!u) {
                        var s = Pe.mayOpen(o, t);
                        if (s) throw new Pe.ErrnoError(s)
                    }
                    512 & t && Pe.truncate(o, 0), t &= -131713;
                    var c = Pe.createStream({
                        node: o,
                        path: Pe.getPath(o),
                        flags: t,
                        seekable: !0,
                        position: 0,
                        stream_ops: o.stream_ops,
                        ungotten: [],
                        error: !1
                    }, i, a);
                    c.stream_ops.open && c.stream_ops.open(c), !r.logReadFiles || 1 & t || (Pe.readFiles || (Pe.readFiles = {}), e in Pe.readFiles || (Pe.readFiles[e] = 1, p("FS.trackingDelegate error on read file: " + e)));
                    try {
                        if (Pe.trackingDelegate.onOpenFile) {
                            var l = 0;
                            1 != (2097155 & t) && (l |= Pe.tracking.openFlags.READ), 0 != (2097155 & t) && (l |= Pe.tracking.openFlags.WRITE), Pe.trackingDelegate.onOpenFile(e, l)
                        }
                    } catch (r) {
                        p("FS.trackingDelegate['onOpenFile']('" + e + "', flags) threw an exception: " + r.message)
                    }
                    return c
                },
                close: function(e) {
                    if (Pe.isClosed(e)) throw new Pe.ErrnoError(8);
                    e.getdents && (e.getdents = null);
                    try {
                        e.stream_ops.close && e.stream_ops.close(e)
                    } catch (e) {
                        throw e
                    } finally {
                        Pe.closeStream(e.fd)
                    }
                    e.fd = null
                },
                isClosed: function(e) {
                    return null === e.fd
                },
                llseek: function(e, r, t) {
                    if (Pe.isClosed(e)) throw new Pe.ErrnoError(8);
                    if (!e.seekable || !e.stream_ops.llseek) throw new Pe.ErrnoError(70);
                    if (0 != t && 1 != t && 2 != t) throw new Pe.ErrnoError(28);
                    return e.position = e.stream_ops.llseek(e, r, t), e.ungotten = [], e.position
                },
                read: function(e, r, t, n, i) {
                    if (n < 0 || i < 0) throw new Pe.ErrnoError(28);
                    if (Pe.isClosed(e)) throw new Pe.ErrnoError(8);
                    if (1 == (2097155 & e.flags)) throw new Pe.ErrnoError(8);
                    if (Pe.isDir(e.node.mode)) throw new Pe.ErrnoError(31);
                    if (!e.stream_ops.read) throw new Pe.ErrnoError(28);
                    var a = void 0 !== i;
                    if (a) {
                        if (!e.seekable) throw new Pe.ErrnoError(70)
                    } else i = e.position;
                    var o = e.stream_ops.read(e, r, t, n, i);
                    return a || (e.position += o), o
                },
                write: function(e, r, t, n, i, a) {
                    if (n < 0 || i < 0) throw new Pe.ErrnoError(28);
                    if (Pe.isClosed(e)) throw new Pe.ErrnoError(8);
                    if (0 == (2097155 & e.flags)) throw new Pe.ErrnoError(8);
                    if (Pe.isDir(e.node.mode)) throw new Pe.ErrnoError(31);
                    if (!e.stream_ops.write) throw new Pe.ErrnoError(28);
                    e.seekable && 1024 & e.flags && Pe.llseek(e, 0, 2);
                    var o = void 0 !== i;
                    if (o) {
                        if (!e.seekable) throw new Pe.ErrnoError(70)
                    } else i = e.position;
                    var u = e.stream_ops.write(e, r, t, n, i, a);
                    o || (e.position += u);
                    try {
                        e.path && Pe.trackingDelegate.onWriteToFile && Pe.trackingDelegate.onWriteToFile(e.path)
                    } catch (r) {
                        p("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + r.message)
                    }
                    return u
                },
                allocate: function(e, r, t) {
                    if (Pe.isClosed(e)) throw new Pe.ErrnoError(8);
                    if (r < 0 || t <= 0) throw new Pe.ErrnoError(28);
                    if (0 == (2097155 & e.flags)) throw new Pe.ErrnoError(8);
                    if (!Pe.isFile(e.node.mode) && !Pe.isDir(e.node.mode)) throw new Pe.ErrnoError(43);
                    if (!e.stream_ops.allocate) throw new Pe.ErrnoError(138);
                    e.stream_ops.allocate(e, r, t)
                },
                mmap: function(e, r, t, n, i, a, o) {
                    if (0 != (2 & a) && 0 == (2 & o) && 2 != (2097155 & e.flags)) throw new Pe.ErrnoError(2);
                    if (1 == (2097155 & e.flags)) throw new Pe.ErrnoError(2);
                    if (!e.stream_ops.mmap) throw new Pe.ErrnoError(43);
                    return e.stream_ops.mmap(e, r, t, n, i, a, o)
                },
                msync: function(e, r, t, n, i) {
                    return e && e.stream_ops.msync ? e.stream_ops.msync(e, r, t, n, i) : 0
                },
                munmap: function(e) {
                    return 0
                },
                ioctl: function(e, r, t) {
                    if (!e.stream_ops.ioctl) throw new Pe.ErrnoError(59);
                    return e.stream_ops.ioctl(e, r, t)
                },
                readFile: function(e, r) {
                    if ((r = r || {}).flags = r.flags || "r", r.encoding = r.encoding || "binary", "utf8" !== r.encoding && "binary" !== r.encoding) throw new Error('Invalid encoding type "' + r.encoding + '"');
                    var t, n = Pe.open(e, r.flags),
                        i = Pe.stat(e).size,
                        a = new Uint8Array(i);
                    return Pe.read(n, a, 0, i, 0), "utf8" === r.encoding ? t = T(a, 0) : "binary" === r.encoding && (t = a), Pe.close(n), t
                },
                writeFile: function(e, r, t) {
                    (t = t || {}).flags = t.flags || "w";
                    var n = Pe.open(e, t.flags, t.mode);
                    if ("string" == typeof r) {
                        var i = new Uint8Array(R(r) + 1),
                            a = I(r, i, 0, i.length);
                        Pe.write(n, i, 0, a, void 0, t.canOwn)
                    } else {
                        if (!ArrayBuffer.isView(r)) throw new Error("Unsupported data type");
                        Pe.write(n, r, 0, r.byteLength, void 0, t.canOwn)
                    }
                    Pe.close(n)
                },
                cwd: function() {
                    return Pe.currentPath
                },
                chdir: function(e) {
                    var r = Pe.lookupPath(e, {
                        follow: !0
                    });
                    if (null === r.node) throw new Pe.ErrnoError(44);
                    if (!Pe.isDir(r.node.mode)) throw new Pe.ErrnoError(54);
                    var t = Pe.nodePermissions(r.node, "x");
                    if (t) throw new Pe.ErrnoError(t);
                    Pe.currentPath = r.path
                },
                createDefaultDirectories: function() {
                    Pe.mkdir("/tmp"), Pe.mkdir("/home"), Pe.mkdir("/home/web_user")
                },
                createDefaultDevices: function() {
                    var e;
                    if (Pe.mkdir("/dev"), Pe.registerDevice(Pe.makedev(1, 3), {
                            read: function() {
                                return 0
                            },
                            write: function(e, r, t, n, i) {
                                return n
                            }
                        }), Pe.mkdev("/dev/null", Pe.makedev(1, 3)), De.register(Pe.makedev(5, 0), De.default_tty_ops), De.register(Pe.makedev(6, 0), De.default_tty1_ops), Pe.mkdev("/dev/tty", Pe.makedev(5, 0)), Pe.mkdev("/dev/tty1", Pe.makedev(6, 0)), "object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
                        var r = new Uint8Array(1);
                        e = function() {
                            return crypto.getRandomValues(r), r[0]
                        }
                    }
                    e || (e = function() {
                        pe("random_device")
                    }), Pe.createDevice("/dev", "random", e), Pe.createDevice("/dev", "urandom", e), Pe.mkdir("/dev/shm"), Pe.mkdir("/dev/shm/tmp")
                },
                createSpecialDirectories: function() {
                    Pe.mkdir("/proc"), Pe.mkdir("/proc/self"), Pe.mkdir("/proc/self/fd"), Pe.mount({
                        mount: function() {
                            var e = Pe.createNode("/proc/self", "fd", 16895, 73);
                            return e.node_ops = {
                                lookup: function(e, r) {
                                    var t = +r,
                                        n = Pe.getStream(t);
                                    if (!n) throw new Pe.ErrnoError(8);
                                    var i = {
                                        parent: null,
                                        mount: {
                                            mountpoint: "fake"
                                        },
                                        node_ops: {
                                            readlink: function() {
                                                return n.path
                                            }
                                        }
                                    };
                                    return i.parent = i, i
                                }
                            }, e
                        }
                    }, {}, "/proc/self/fd")
                },
                createStandardStreams: function() {
                    r.stdin ? Pe.createDevice("/dev", "stdin", r.stdin) : Pe.symlink("/dev/tty", "/dev/stdin"), r.stdout ? Pe.createDevice("/dev", "stdout", null, r.stdout) : Pe.symlink("/dev/tty", "/dev/stdout"), r.stderr ? Pe.createDevice("/dev", "stderr", null, r.stderr) : Pe.symlink("/dev/tty1", "/dev/stderr");
                    Pe.open("/dev/stdin", "r"), Pe.open("/dev/stdout", "w"), Pe.open("/dev/stderr", "w")
                },
                ensureErrnoError: function() {
                    Pe.ErrnoError || (Pe.ErrnoError = function(e, r) {
                        this.node = r, this.setErrno = function(e) {
                            this.errno = e
                        }, this.setErrno(e), this.message = "FS error"
                    }, Pe.ErrnoError.prototype = new Error, Pe.ErrnoError.prototype.constructor = Pe.ErrnoError, [44].forEach((function(e) {
                        Pe.genericErrors[e] = new Pe.ErrnoError(e), Pe.genericErrors[e].stack = "<generic error, no stack>"
                    })))
                },
                staticInit: function() {
                    Pe.ensureErrnoError(), Pe.nameTable = new Array(4096), Pe.mount(Fe, {}, "/"), Pe.createDefaultDirectories(), Pe.createDefaultDevices(), Pe.createSpecialDirectories(), Pe.filesystems = {
                        MEMFS: Fe,
                        IDBFS: Ae
                    }
                },
                init: function(e, t, n) {
                    Pe.init.initialized = !0, Pe.ensureErrnoError(), r.stdin = e || r.stdin, r.stdout = t || r.stdout, r.stderr = n || r.stderr, Pe.createStandardStreams()
                },
                quit: function() {
                    Pe.init.initialized = !1;
                    var e = r._fflush;
                    e && e(0);
                    for (var t = 0; t < Pe.streams.length; t++) {
                        var n = Pe.streams[t];
                        n && Pe.close(n)
                    }
                },
                getMode: function(e, r) {
                    var t = 0;
                    return e && (t |= 365), r && (t |= 146), t
                },
                joinPath: function(e, r) {
                    var t = Ce.join.apply(null, e);
                    return r && "/" == t[0] && (t = t.substr(1)), t
                },
                absolutePath: function(e, r) {
                    return Se.resolve(r, e)
                },
                standardizePath: function(e) {
                    return Ce.normalize(e)
                },
                findObject: function(e, r) {
                    var t = Pe.analyzePath(e, r);
                    return t.exists ? t.object : (xe(t.error), null)
                },
                analyzePath: function(e, r) {
                    try {
                        e = (n = Pe.lookupPath(e, {
                            follow: !r
                        })).path
                    } catch (e) {}
                    var t = {
                        isRoot: !1,
                        exists: !1,
                        error: 0,
                        name: null,
                        path: null,
                        object: null,
                        parentExists: !1,
                        parentPath: null,
                        parentObject: null
                    };
                    try {
                        var n = Pe.lookupPath(e, {
                            parent: !0
                        });
                        t.parentExists = !0, t.parentPath = n.path, t.parentObject = n.node, t.name = Ce.basename(e), n = Pe.lookupPath(e, {
                            follow: !r
                        }), t.exists = !0, t.path = n.path, t.object = n.node, t.name = n.node.name, t.isRoot = "/" === n.path
                    } catch (e) {
                        t.error = e.errno
                    }
                    return t
                },
                createFolder: function(e, r, t, n) {
                    var i = Ce.join2("string" == typeof e ? e : Pe.getPath(e), r),
                        a = Pe.getMode(t, n);
                    return Pe.mkdir(i, a)
                },
                createPath: function(e, r, t, n) {
                    e = "string" == typeof e ? e : Pe.getPath(e);
                    for (var i = r.split("/").reverse(); i.length;) {
                        var a = i.pop();
                        if (a) {
                            var o = Ce.join2(e, a);
                            try {
                                Pe.mkdir(o)
                            } catch (e) {}
                            e = o
                        }
                    }
                    return o
                },
                createFile: function(e, r, t, n, i) {
                    var a = Ce.join2("string" == typeof e ? e : Pe.getPath(e), r),
                        o = Pe.getMode(n, i);
                    return Pe.create(a, o)
                },
                createDataFile: function(e, r, t, n, i, a) {
                    var o = r ? Ce.join2("string" == typeof e ? e : Pe.getPath(e), r) : e,
                        u = Pe.getMode(n, i),
                        s = Pe.create(o, u);
                    if (t) {
                        if ("string" == typeof t) {
                            for (var c = new Array(t.length), l = 0, f = t.length; l < f; ++l) c[l] = t.charCodeAt(l);
                            t = c
                        }
                        Pe.chmod(s, 146 | u);
                        var d = Pe.open(s, "w");
                        Pe.write(d, t, 0, t.length, 0, a), Pe.close(d), Pe.chmod(s, u)
                    }
                    return s
                },
                createDevice: function(e, r, t, n) {
                    var i = Ce.join2("string" == typeof e ? e : Pe.getPath(e), r),
                        a = Pe.getMode(!!t, !!n);
                    Pe.createDevice.major || (Pe.createDevice.major = 64);
                    var o = Pe.makedev(Pe.createDevice.major++, 0);
                    return Pe.registerDevice(o, {
                        open: function(e) {
                            e.seekable = !1
                        },
                        close: function(e) {
                            n && n.buffer && n.buffer.length && n(10)
                        },
                        read: function(e, r, n, i, a) {
                            for (var o = 0, u = 0; u < i; u++) {
                                var s;
                                try {
                                    s = t()
                                } catch (e) {
                                    throw new Pe.ErrnoError(29)
                                }
                                if (void 0 === s && 0 === o) throw new Pe.ErrnoError(6);
                                if (null == s) break;
                                o++, r[n + u] = s
                            }
                            return o && (e.node.timestamp = Date.now()), o
                        },
                        write: function(e, r, t, i, a) {
                            for (var o = 0; o < i; o++) try {
                                n(r[t + o])
                            } catch (e) {
                                throw new Pe.ErrnoError(29)
                            }
                            return i && (e.node.timestamp = Date.now()), o
                        }
                    }), Pe.mkdev(i, a, o)
                },
                createLink: function(e, r, t, n, i) {
                    var a = Ce.join2("string" == typeof e ? e : Pe.getPath(e), r);
                    return Pe.symlink(t, a)
                },
                forceLoadFile: function(e) {
                    if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
                    var r = !0;
                    if ("undefined" != typeof XMLHttpRequest) throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                    if (!a) throw new Error("Cannot load without read() or XMLHttpRequest.");
                    try {
                        e.contents = Qr(a(e.url), !0), e.usedBytes = e.contents.length
                    } catch (e) {
                        r = !1
                    }
                    return r || xe(29), r
                },
                createLazyFile: function(e, r, t, n, i) {
                    function a() {
                        this.lengthKnown = !1, this.chunks = []
                    }
                    if (a.prototype.get = function(e) {
                            if (!(e > this.length - 1 || e < 0)) {
                                var r = e % this.chunkSize,
                                    t = e / this.chunkSize | 0;
                                return this.getter(t)[r]
                            }
                        }, a.prototype.setDataGetter = function(e) {
                            this.getter = e
                        }, a.prototype.cacheLength = function() {
                            var e = new XMLHttpRequest;
                            if (e.open("HEAD", t, !1), e.send(null), !(e.status >= 200 && e.status < 300 || 304 === e.status)) throw new Error("Couldn't load " + t + ". Status: " + e.status);
                            var r, n = Number(e.getResponseHeader("Content-length")),
                                i = (r = e.getResponseHeader("Accept-Ranges")) && "bytes" === r,
                                a = (r = e.getResponseHeader("Content-Encoding")) && "gzip" === r,
                                o = 1048576;
                            i || (o = n);
                            var u = this;
                            u.setDataGetter((function(e) {
                                var r = e * o,
                                    i = (e + 1) * o - 1;
                                if (i = Math.min(i, n - 1), void 0 === u.chunks[e] && (u.chunks[e] = function(e, r) {
                                        if (e > r) throw new Error("invalid range (" + e + ", " + r + ") or no bytes requested!");
                                        if (r > n - 1) throw new Error("only " + n + " bytes available! programmer error!");
                                        var i = new XMLHttpRequest;
                                        if (i.open("GET", t, !1), n !== o && i.setRequestHeader("Range", "bytes=" + e + "-" + r), "undefined" != typeof Uint8Array && (i.responseType = "arraybuffer"), i.overrideMimeType && i.overrideMimeType("text/plain; charset=x-user-defined"), i.send(null), !(i.status >= 200 && i.status < 300 || 304 === i.status)) throw new Error("Couldn't load " + t + ". Status: " + i.status);
                                        return void 0 !== i.response ? new Uint8Array(i.response || []) : Qr(i.responseText || "", !0)
                                    }(r, i)), void 0 === u.chunks[e]) throw new Error("doXHR failed!");
                                return u.chunks[e]
                            })), !a && n || (o = n = 1, n = this.getter(0).length, o = n, m("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = n, this._chunkSize = o, this.lengthKnown = !0
                        }, "undefined" != typeof XMLHttpRequest) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var o = {
                            isDevice: !1,
                            url: t
                        },
                        u = Pe.createFile(e, r, o, n, i);
                    o.contents ? u.contents = o.contents : o.url && (u.contents = null, u.url = o.url), Object.defineProperties(u, {
                        usedBytes: {
                            get: function() {
                                return this.contents.length
                            }
                        }
                    });
                    var s = {};
                    return Object.keys(u.stream_ops).forEach((function(e) {
                        var r = u.stream_ops[e];
                        s[e] = function() {
                            if (!Pe.forceLoadFile(u)) throw new Pe.ErrnoError(29);
                            return r.apply(null, arguments)
                        }
                    })), s.read = function(e, r, t, n, i) {
                        if (!Pe.forceLoadFile(u)) throw new Pe.ErrnoError(29);
                        var a = e.node.contents;
                        if (i >= a.length) return 0;
                        var o = Math.min(a.length - i, n);
                        if (a.slice)
                            for (var s = 0; s < o; s++) r[t + s] = a[i + s];
                        else
                            for (s = 0; s < o; s++) r[t + s] = a.get(i + s);
                        return o
                    }, u.stream_ops = s, u
                },
                createPreloadedFile: function(e, t, n, i, a, o, u, s, c, l) {
                    Be.init();
                    var f = t ? Se.resolve(Ce.join2(e, t)) : e;

                    function d(n) {
                        function d(r) {
                            l && l(), s || Pe.createDataFile(e, t, r, i, a, c), o && o(), me()
                        }
                        var m = !1;
                        r.preloadPlugins.forEach((function(e) {
                            m || e.canHandle(f) && (e.handle(n, f, d, (function() {
                                u && u(), me()
                            })), m = !0)
                        })), m || d(n)
                    }
                    de(), "string" == typeof n ? Be.asyncLoad(n, (function(e) {
                        d(e)
                    }), u) : d(n)
                },
                indexedDB: function() {
                    return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
                },
                DB_NAME: function() {
                    return "EM_FS_" + window.location.pathname
                },
                DB_VERSION: 20,
                DB_STORE_NAME: "FILE_DATA",
                saveFilesToDB: function(e, r, t) {
                    r = r || function() {}, t = t || function() {};
                    var n = Pe.indexedDB();
                    try {
                        var i = n.open(Pe.DB_NAME(), Pe.DB_VERSION)
                    } catch (e) {
                        return t(e)
                    }
                    i.onupgradeneeded = function() {
                        m("creating db"), i.result.createObjectStore(Pe.DB_STORE_NAME)
                    }, i.onsuccess = function() {
                        var n = i.result.transaction([Pe.DB_STORE_NAME], "readwrite"),
                            a = n.objectStore(Pe.DB_STORE_NAME),
                            o = 0,
                            u = 0,
                            s = e.length;

                        function c() {
                            0 == u ? r() : t()
                        }
                        e.forEach((function(e) {
                            var r = a.put(Pe.analyzePath(e).object.contents, e);
                            r.onsuccess = function() {
                                ++o + u == s && c()
                            }, r.onerror = function() {
                                u++, o + u == s && c()
                            }
                        })), n.onerror = t
                    }, i.onerror = t
                },
                loadFilesFromDB: function(e, r, t) {
                    r = r || function() {}, t = t || function() {};
                    var n = Pe.indexedDB();
                    try {
                        var i = n.open(Pe.DB_NAME(), Pe.DB_VERSION)
                    } catch (e) {
                        return t(e)
                    }
                    i.onupgradeneeded = t, i.onsuccess = function() {
                        var n = i.result;
                        try {
                            var a = n.transaction([Pe.DB_STORE_NAME], "readonly")
                        } catch (e) {
                            return void t(e)
                        }
                        var o = a.objectStore(Pe.DB_STORE_NAME),
                            u = 0,
                            s = 0,
                            c = e.length;

                        function l() {
                            0 == s ? r() : t()
                        }
                        e.forEach((function(e) {
                            var r = o.get(e);
                            r.onsuccess = function() {
                                Pe.analyzePath(e).exists && Pe.unlink(e), Pe.createDataFile(Ce.dirname(e), Ce.basename(e), r.result, !0, !0, !0), ++u + s == c && l()
                            }, r.onerror = function() {
                                s++, u + s == c && l()
                            }
                        })), a.onerror = t
                    }, i.onerror = t
                }
            },
            Te = {
                mappings: {},
                DEFAULT_POLLMASK: 5,
                umask: 511,
                calculateAt: function(e, r) {
                    if ("/" !== r[0]) {
                        var t;
                        if (-100 === e) t = Pe.cwd();
                        else {
                            var n = Pe.getStream(e);
                            if (!n) throw new Pe.ErrnoError(8);
                            t = n.path
                        }
                        r = Ce.join2(t, r)
                    }
                    return r
                },
                doStat: function(e, r, t) {
                    try {
                        var n = e(r)
                    } catch (e) {
                        if (e && e.node && Ce.normalize(r) !== Ce.normalize(Pe.getPath(e.node))) return -54;
                        throw e
                    }
                    return q[t >> 2] = n.dev, q[t + 4 >> 2] = 0, q[t + 8 >> 2] = n.ino, q[t + 12 >> 2] = n.mode, q[t + 16 >> 2] = n.nlink, q[t + 20 >> 2] = n.uid, q[t + 24 >> 2] = n.gid, q[t + 28 >> 2] = n.rdev, q[t + 32 >> 2] = 0, _e = [n.size >>> 0, (he = n.size, +ae(he) >= 1 ? he > 0 ? (0 | se(+ue(he / 4294967296), 4294967295)) >>> 0 : ~~+oe((he - +(~~he >>> 0)) / 4294967296) >>> 0 : 0)], q[t + 40 >> 2] = _e[0], q[t + 44 >> 2] = _e[1], q[t + 48 >> 2] = 4096, q[t + 52 >> 2] = n.blocks, q[t + 56 >> 2] = n.atime.getTime() / 1e3 | 0, q[t + 60 >> 2] = 0, q[t + 64 >> 2] = n.mtime.getTime() / 1e3 | 0, q[t + 68 >> 2] = 0, q[t + 72 >> 2] = n.ctime.getTime() / 1e3 | 0, q[t + 76 >> 2] = 0, _e = [n.ino >>> 0, (he = n.ino, +ae(he) >= 1 ? he > 0 ? (0 | se(+ue(he / 4294967296), 4294967295)) >>> 0 : ~~+oe((he - +(~~he >>> 0)) / 4294967296) >>> 0 : 0)], q[t + 80 >> 2] = _e[0], q[t + 84 >> 2] = _e[1], 0
                },
                doMsync: function(e, r, t, n, i) {
                    var a = G.slice(e, e + t);
                    Pe.msync(r, a, i, t, n)
                },
                doMkdir: function(e, r) {
                    return "/" === (e = Ce.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), Pe.mkdir(e, r, 0), 0
                },
                doMknod: function(e, r, t) {
                    switch (61440 & r) {
                        case 32768:
                        case 8192:
                        case 24576:
                        case 4096:
                        case 49152:
                            break;
                        default:
                            return -28
                    }
                    return Pe.mknod(e, r, t), 0
                },
                doReadlink: function(e, r, t) {
                    if (t <= 0) return -28;
                    var n = Pe.readlink(e),
                        i = Math.min(t, R(n)),
                        a = O[r + i];
                    return B(n, r, t + 1), O[r + i] = a, i
                },
                doAccess: function(e, r) {
                    if (-8 & r) return -28;
                    var t;
                    if (!(t = Pe.lookupPath(e, {
                            follow: !0
                        }).node)) return -44;
                    var n = "";
                    return 4 & r && (n += "r"), 2 & r && (n += "w"), 1 & r && (n += "x"), n && Pe.nodePermissions(t, n) ? -2 : 0
                },
                doDup: function(e, r, t) {
                    var n = Pe.getStream(t);
                    return n && Pe.close(n), Pe.open(e, r, 0, t, t).fd
                },
                doReadv: function(e, r, t, n) {
                    for (var i = 0, a = 0; a < t; a++) {
                        var o = q[r + 8 * a >> 2],
                            u = q[r + (8 * a + 4) >> 2],
                            s = Pe.read(e, O, o, u, n);
                        if (s < 0) return -1;
                        if (i += s, s < u) break
                    }
                    return i
                },
                doWritev: function(e, r, t, n) {
                    for (var i = 0, a = 0; a < t; a++) {
                        var o = q[r + 8 * a >> 2],
                            u = q[r + (8 * a + 4) >> 2],
                            s = Pe.write(e, O, o, u, n);
                        if (s < 0) return -1;
                        i += s
                    }
                    return i
                },
                varargs: void 0,
                get: function() {
                    return Te.varargs += 4, q[Te.varargs - 4 >> 2]
                },
                getStr: function(e) {
                    return L(e)
                },
                getStreamFromFD: function(e) {
                    var r = Pe.getStream(e);
                    if (!r) throw new Pe.ErrnoError(8);
                    return r
                },
                get64: function(e, r) {
                    return e
                }
            };

        function Le(e, r) {
            if (Be.mainLoop.timingMode = e, Be.mainLoop.timingValue = r, !Be.mainLoop.func) return 1;
            if (0 == e) Be.mainLoop.scheduler = function() {
                var e = 0 | Math.max(0, Be.mainLoop.tickStartTime + r - ke());
                setTimeout(Be.mainLoop.runner, e)
            }, Be.mainLoop.method = "timeout";
            else if (1 == e) Be.mainLoop.scheduler = function() {
                Be.requestAnimationFrame(Be.mainLoop.runner)
            }, Be.mainLoop.method = "rAF";
            else if (2 == e) {
                if ("undefined" == typeof setImmediate) {
                    var t = [],
                        n = "setimmediate";
                    addEventListener("message", (function(e) {
                        e.data !== n && e.data.target !== n || (e.stopPropagation(), t.shift()())
                    }), !0), setImmediate = function(e) {
                        t.push(e), postMessage(n, "*")
                    }
                }
                Be.mainLoop.scheduler = function() {
                    setImmediate(Be.mainLoop.runner)
                }, Be.mainLoop.method = "immediate"
            }
            return 0
        }

        function Ie(e, t, n, i, a) {
            var o;
            y = !0, D(!Be.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."), Be.mainLoop.func = e, Be.mainLoop.arg = i, o = void 0 !== i ? function() {
                r.dynCall_vi(e, i)
            } : function() {
                r.dynCall_v(e)
            };
            var u = Be.mainLoop.currentlyRunningMainloop;
            if (Be.mainLoop.runner = function() {
                    if (!S)
                        if (Be.mainLoop.queue.length > 0) {
                            var e = Date.now(),
                                r = Be.mainLoop.queue.shift();
                            if (r.func(r.arg), Be.mainLoop.remainingBlockers) {
                                var t = Be.mainLoop.remainingBlockers,
                                    n = t % 1 == 0 ? t - 1 : Math.floor(t);
                                r.counted ? Be.mainLoop.remainingBlockers = n : (n += .5, Be.mainLoop.remainingBlockers = (8 * t + n) / 9)
                            }
                            if (console.log('main loop blocker "' + r.name + '" took ' + (Date.now() - e) + " ms"), Be.mainLoop.updateStatus(), u < Be.mainLoop.currentlyRunningMainloop) return;
                            setTimeout(Be.mainLoop.runner, 0)
                        } else u < Be.mainLoop.currentlyRunningMainloop || (Be.mainLoop.currentFrameNumber = Be.mainLoop.currentFrameNumber + 1 | 0, 1 == Be.mainLoop.timingMode && Be.mainLoop.timingValue > 1 && Be.mainLoop.currentFrameNumber % Be.mainLoop.timingValue != 0 ? Be.mainLoop.scheduler() : (0 == Be.mainLoop.timingMode && (Be.mainLoop.tickStartTime = ke()), Be.mainLoop.runIter(o), u < Be.mainLoop.currentlyRunningMainloop || ("object" == typeof SDL && SDL.audio && SDL.audio.queueNewAudioData && SDL.audio.queueNewAudioData(), Be.mainLoop.scheduler())))
                }, a || (t && t > 0 ? Le(0, 1e3 / t) : Le(1, 1), Be.mainLoop.scheduler()), n) throw "unwind"
        }
        ke = function() {
            return performance.now()
        };
        var Be = {
                mainLoop: {
                    scheduler: null,
                    method: "",
                    currentlyRunningMainloop: 0,
                    func: null,
                    arg: 0,
                    timingMode: 0,
                    timingValue: 0,
                    currentFrameNumber: 0,
                    queue: [],
                    pause: function() {
                        Be.mainLoop.scheduler = null, Be.mainLoop.currentlyRunningMainloop++
                    },
                    resume: function() {
                        Be.mainLoop.currentlyRunningMainloop++;
                        var e = Be.mainLoop.timingMode,
                            r = Be.mainLoop.timingValue,
                            t = Be.mainLoop.func;
                        Be.mainLoop.func = null, Ie(t, 0, !1, Be.mainLoop.arg, !0), Le(e, r), Be.mainLoop.scheduler()
                    },
                    updateStatus: function() {
                        if (r.setStatus) {
                            var e = r.statusMessage || "Please wait...",
                                t = Be.mainLoop.remainingBlockers,
                                n = Be.mainLoop.expectedBlockers;
                            t ? t < n ? r.setStatus(e + " (" + (n - t) + "/" + n + ")") : r.setStatus(e) : r.setStatus("")
                        }
                    },
                    runIter: function(e) {
                        if (!S) {
                            if (r.preMainLoop)
                                if (!1 === r.preMainLoop()) return;
                            try {
                                e()
                            } catch (e) {
                                if (e instanceof xt) return;
                                throw e && "object" == typeof e && e.stack && p("exception thrown: " + [e, e.stack]), e
                            }
                            r.postMainLoop && r.postMainLoop()
                        }
                    }
                },
                isFullscreen: !1,
                pointerLock: !1,
                moduleContextCreatedCallbacks: [],
                workers: [],
                init: function() {
                    if (r.preloadPlugins || (r.preloadPlugins = []), !Be.initted) {
                        Be.initted = !0;
                        try {
                            new Blob, Be.hasBlobConstructor = !0
                        } catch (e) {
                            Be.hasBlobConstructor = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
                        }
                        Be.BlobBuilder = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Be.hasBlobConstructor ? null : console.log("warning: no BlobBuilder"), Be.URLObject = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0, r.noImageDecoding || void 0 !== Be.URLObject || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), r.noImageDecoding = !0);
                        var e = {
                            canHandle: function(e) {
                                return !r.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(e)
                            },
                            handle: function(e, t, n, i) {
                                var a = null;
                                if (Be.hasBlobConstructor) try {
                                    (a = new Blob([e], {
                                        type: Be.getMimetype(t)
                                    })).size !== e.length && (a = new Blob([new Uint8Array(e).buffer], {
                                        type: Be.getMimetype(t)
                                    }))
                                } catch (e) {
                                    h("Blob constructor present but fails: " + e + "; falling back to blob builder")
                                }
                                if (!a) {
                                    var o = new Be.BlobBuilder;
                                    o.append(new Uint8Array(e).buffer), a = o.getBlob()
                                }
                                var u = Be.URLObject.createObjectURL(a),
                                    s = new Image;
                                s.onload = function() {
                                    D(s.complete, "Image " + t + " could not be decoded");
                                    var i = document.createElement("canvas");
                                    i.width = s.width, i.height = s.height, i.getContext("2d").drawImage(s, 0, 0), r.preloadedImages[t] = i, Be.URLObject.revokeObjectURL(u), n && n(e)
                                }, s.onerror = function(e) {
                                    console.log("Image " + u + " could not be decoded"), i && i()
                                }, s.src = u
                            }
                        };
                        r.preloadPlugins.push(e);
                        var t = {
                            canHandle: function(e) {
                                return !r.noAudioDecoding && e.substr(-4) in {
                                    ".ogg": 1,
                                    ".wav": 1,
                                    ".mp3": 1
                                }
                            },
                            handle: function(e, t, n, i) {
                                var a = !1;

                                function o(i) {
                                    a || (a = !0, r.preloadedAudios[t] = i, n && n(e))
                                }

                                function u() {
                                    a || (a = !0, r.preloadedAudios[t] = new Audio, i && i())
                                }
                                if (!Be.hasBlobConstructor) return u();
                                try {
                                    var s = new Blob([e], {
                                        type: Be.getMimetype(t)
                                    })
                                } catch (e) {
                                    return u()
                                }
                                var c = Be.URLObject.createObjectURL(s),
                                    l = new Audio;
                                l.addEventListener("canplaythrough", (function() {
                                    o(l)
                                }), !1), l.onerror = function(r) {
                                    a || (console.log("warning: browser could not fully decode audio " + t + ", trying slower base64 approach"), l.src = "data:audio/x-" + t.substr(-3) + ";base64," + function(e) {
                                        for (var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = "", n = 0, i = 0, a = 0; a < e.length; a++)
                                            for (n = n << 8 | e[a], i += 8; i >= 6;) {
                                                var o = n >> i - 6 & 63;
                                                i -= 6, t += r[o]
                                            }
                                        return 2 == i ? (t += r[(3 & n) << 4], t += "==") : 4 == i && (t += r[(15 & n) << 2], t += "="), t
                                    }(e), o(l))
                                }, l.src = c, Be.safeSetTimeout((function() {
                                    o(l)
                                }), 1e4)
                            }
                        };
                        r.preloadPlugins.push(t);
                        var n = r.canvas;
                        n && (n.requestPointerLock = n.requestPointerLock || n.mozRequestPointerLock || n.webkitRequestPointerLock || n.msRequestPointerLock || function() {}, n.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function() {}, n.exitPointerLock = n.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", i, !1), document.addEventListener("mozpointerlockchange", i, !1), document.addEventListener("webkitpointerlockchange", i, !1), document.addEventListener("mspointerlockchange", i, !1), r.elementPointerLock && n.addEventListener("click", (function(e) {
                            !Be.pointerLock && r.canvas.requestPointerLock && (r.canvas.requestPointerLock(), e.preventDefault())
                        }), !1))
                    }

                    function i() {
                        Be.pointerLock = document.pointerLockElement === r.canvas || document.mozPointerLockElement === r.canvas || document.webkitPointerLockElement === r.canvas || document.msPointerLockElement === r.canvas
                    }
                },
                createContext: function(e, t, n, i) {
                    if (t && r.ctx && e == r.canvas) return r.ctx;
                    var a, o;
                    if (t) {
                        var u = {
                            antialias: !1,
                            alpha: !1,
                            majorVersion: 2
                        };
                        if (i)
                            for (var s in i) u[s] = i[s];
                        void 0 !== Ue && (o = Ue.createContext(e, u)) && (a = Ue.getContext(o).GLctx)
                    } else a = e.getContext("2d");
                    return a ? (n && (t || D(void 0 === Or, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), r.ctx = a, t && Ue.makeContextCurrent(o), r.useWebGL = t, Be.moduleContextCreatedCallbacks.forEach((function(e) {
                        e()
                    })), Be.init()), a) : null
                },
                destroyContext: function(e, r, t) {},
                fullscreenHandlersInstalled: !1,
                lockPointer: void 0,
                resizeCanvas: void 0,
                requestFullscreen: function(e, t) {
                    Be.lockPointer = e, Be.resizeCanvas = t, void 0 === Be.lockPointer && (Be.lockPointer = !0), void 0 === Be.resizeCanvas && (Be.resizeCanvas = !1);
                    var n = r.canvas;

                    function i() {
                        Be.isFullscreen = !1;
                        var e = n.parentNode;
                        (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e ? (n.exitFullscreen = Be.exitFullscreen, Be.lockPointer && n.requestPointerLock(), Be.isFullscreen = !0, Be.resizeCanvas ? Be.setFullscreenCanvasSize() : Be.updateCanvasDimensions(n)) : (e.parentNode.insertBefore(n, e), e.parentNode.removeChild(e), Be.resizeCanvas ? Be.setWindowedCanvasSize() : Be.updateCanvasDimensions(n)), r.onFullScreen && r.onFullScreen(Be.isFullscreen), r.onFullscreen && r.onFullscreen(Be.isFullscreen)
                    }
                    Be.fullscreenHandlersInstalled || (Be.fullscreenHandlersInstalled = !0, document.addEventListener("fullscreenchange", i, !1), document.addEventListener("mozfullscreenchange", i, !1), document.addEventListener("webkitfullscreenchange", i, !1), document.addEventListener("MSFullscreenChange", i, !1));
                    var a = document.createElement("div");
                    n.parentNode.insertBefore(a, n), a.appendChild(n), a.requestFullscreen = a.requestFullscreen || a.mozRequestFullScreen || a.msRequestFullscreen || (a.webkitRequestFullscreen ? function() {
                        a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
                    } : null) || (a.webkitRequestFullScreen ? function() {
                        a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                    } : null), a.requestFullscreen()
                },
                exitFullscreen: function() {
                    return !!Be.isFullscreen && ((document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function() {}).apply(document, []), !0)
                },
                nextRAF: 0,
                fakeRequestAnimationFrame: function(e) {
                    var r = Date.now();
                    if (0 === Be.nextRAF) Be.nextRAF = r + 1e3 / 60;
                    else
                        for (; r + 2 >= Be.nextRAF;) Be.nextRAF += 1e3 / 60;
                    var t = Math.max(Be.nextRAF - r, 0);
                    setTimeout(e, t)
                },
                requestAnimationFrame: function(e) {
                    "function" != typeof requestAnimationFrame ? (0, Be.fakeRequestAnimationFrame)(e) : requestAnimationFrame(e)
                },
                safeCallback: function(e) {
                    return function() {
                        if (!S) return e.apply(null, arguments)
                    }
                },
                allowAsyncCallbacks: !0,
                queuedAsyncCallbacks: [],
                pauseAsyncCallbacks: function() {
                    Be.allowAsyncCallbacks = !1
                },
                resumeAsyncCallbacks: function() {
                    if (Be.allowAsyncCallbacks = !0, Be.queuedAsyncCallbacks.length > 0) {
                        var e = Be.queuedAsyncCallbacks;
                        Be.queuedAsyncCallbacks = [], e.forEach((function(e) {
                            e()
                        }))
                    }
                },
                safeRequestAnimationFrame: function(e) {
                    return Be.requestAnimationFrame((function() {
                        S || (Be.allowAsyncCallbacks ? e() : Be.queuedAsyncCallbacks.push(e))
                    }))
                },
                safeSetTimeout: function(e, r) {
                    return y = !0, setTimeout((function() {
                        S || (Be.allowAsyncCallbacks ? e() : Be.queuedAsyncCallbacks.push(e))
                    }), r)
                },
                safeSetInterval: function(e, r) {
                    return y = !0, setInterval((function() {
                        S || Be.allowAsyncCallbacks && e()
                    }), r)
                },
                getMimetype: function(e) {
                    return {
                        jpg: "image/jpeg",
                        jpeg: "image/jpeg",
                        png: "image/png",
                        bmp: "image/bmp",
                        ogg: "audio/ogg",
                        wav: "audio/wav",
                        mp3: "audio/mpeg"
                    } [e.substr(e.lastIndexOf(".") + 1)]
                },
                getUserMedia: function(e) {
                    window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia), window.getUserMedia(e)
                },
                getMovementX: function(e) {
                    return e.movementX || e.mozMovementX || e.webkitMovementX || 0
                },
                getMovementY: function(e) {
                    return e.movementY || e.mozMovementY || e.webkitMovementY || 0
                },
                getMouseWheelDelta: function(e) {
                    var r = 0;
                    switch (e.type) {
                        case "DOMMouseScroll":
                            r = e.detail / 3;
                            break;
                        case "mousewheel":
                            r = e.wheelDelta / 120;
                            break;
                        case "wheel":
                            switch (r = e.deltaY, e.deltaMode) {
                                case 0:
                                    r /= 100;
                                    break;
                                case 1:
                                    r /= 3;
                                    break;
                                case 2:
                                    r *= 80;
                                    break;
                                default:
                                    throw "unrecognized mouse wheel delta mode: " + e.deltaMode
                            }
                            break;
                        default:
                            throw "unrecognized mouse wheel event: " + e.type
                    }
                    return r
                },
                mouseX: 0,
                mouseY: 0,
                mouseMovementX: 0,
                mouseMovementY: 0,
                touches: {},
                lastTouches: {},
                calculateMouseEvent: function(e) {
                    if (Be.pointerLock) "mousemove" != e.type && "mozMovementX" in e ? Be.mouseMovementX = Be.mouseMovementY = 0 : (Be.mouseMovementX = Be.getMovementX(e), Be.mouseMovementY = Be.getMovementY(e)), "undefined" != typeof SDL ? (Be.mouseX = SDL.mouseX + Be.mouseMovementX, Be.mouseY = SDL.mouseY + Be.mouseMovementY) : (Be.mouseX += Be.mouseMovementX, Be.mouseY += Be.mouseMovementY);
                    else {
                        var t = r.canvas.getBoundingClientRect(),
                            n = r.canvas.width,
                            i = r.canvas.height,
                            a = void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
                            o = void 0 !== window.scrollY ? window.scrollY : window.pageYOffset;
                        if ("touchstart" === e.type || "touchend" === e.type || "touchmove" === e.type) {
                            var u = e.touch;
                            if (void 0 === u) return;
                            var s = u.pageX - (a + t.left),
                                c = u.pageY - (o + t.top),
                                l = {
                                    x: s *= n / t.width,
                                    y: c *= i / t.height
                                };
                            if ("touchstart" === e.type) Be.lastTouches[u.identifier] = l, Be.touches[u.identifier] = l;
                            else if ("touchend" === e.type || "touchmove" === e.type) {
                                var f = Be.touches[u.identifier];
                                f || (f = l), Be.lastTouches[u.identifier] = f, Be.touches[u.identifier] = l
                            }
                            return
                        }
                        var d = e.pageX - (a + t.left),
                            m = e.pageY - (o + t.top);
                        d *= n / t.width, m *= i / t.height, Be.mouseMovementX = d - Be.mouseX, Be.mouseMovementY = m - Be.mouseY, Be.mouseX = d, Be.mouseY = m
                    }
                },
                asyncLoad: function(e, r, t, n) {
                    var i = n ? "" : "al " + e;
                    o(e, (function(t) {
                        D(t, 'Loading data file "' + e + '" failed (no arrayBuffer).'), r(new Uint8Array(t)), i && me()
                    }), (function(r) {
                        if (!t) throw 'Loading data file "' + e + '" failed.';
                        t()
                    })), i && de()
                },
                resizeListeners: [],
                updateResizeListeners: function() {
                    var e = r.canvas;
                    Be.resizeListeners.forEach((function(r) {
                        r(e.width, e.height)
                    }))
                },
                setCanvasSize: function(e, t, n) {
                    var i = r.canvas;
                    Be.updateCanvasDimensions(i, e, t), n || Be.updateResizeListeners()
                },
                windowedWidth: 0,
                windowedHeight: 0,
                setFullscreenCanvasSize: function() {
                    if ("undefined" != typeof SDL) {
                        var e = Q[SDL.screen >> 2];
                        e |= 8388608, q[SDL.screen >> 2] = e
                    }
                    Be.updateCanvasDimensions(r.canvas), Be.updateResizeListeners()
                },
                setWindowedCanvasSize: function() {
                    if ("undefined" != typeof SDL) {
                        var e = Q[SDL.screen >> 2];
                        e &= -8388609, q[SDL.screen >> 2] = e
                    }
                    Be.updateCanvasDimensions(r.canvas), Be.updateResizeListeners()
                },
                updateCanvasDimensions: function(e, t, n) {
                    t && n ? (e.widthNative = t, e.heightNative = n) : (t = e.widthNative, n = e.heightNative);
                    var i = t,
                        a = n;
                    if (r.forcedAspectRatio && r.forcedAspectRatio > 0 && (i / a < r.forcedAspectRatio ? i = Math.round(a * r.forcedAspectRatio) : a = Math.round(i / r.forcedAspectRatio)), (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e.parentNode && "undefined" != typeof screen) {
                        var o = Math.min(screen.width / i, screen.height / a);
                        i = Math.round(i * o), a = Math.round(a * o)
                    }
                    Be.resizeCanvas ? (e.width != i && (e.width = i), e.height != a && (e.height = a), void 0 !== e.style && (e.style.removeProperty("width"), e.style.removeProperty("height"))) : (e.width != t && (e.width = t), e.height != n && (e.height = n), void 0 !== e.style && (i != t || a != n ? (e.style.setProperty("width", i + "px", "important"), e.style.setProperty("height", a + "px", "important")) : (e.style.removeProperty("width"), e.style.removeProperty("height"))))
                },
                wgetRequests: {},
                nextWgetRequestHandle: 0,
                getNextWgetRequestHandle: function() {
                    var e = Be.nextWgetRequestHandle;
                    return Be.nextWgetRequestHandle++, e
                }
            },
            Re = {
                QUEUE_INTERVAL: 25,
                QUEUE_LOOKAHEAD: .1,
                DEVICE_NAME: "Emscripten OpenAL",
                CAPTURE_DEVICE_NAME: "Emscripten OpenAL capture",
                ALC_EXTENSIONS: {
                    ALC_SOFT_pause_device: !0,
                    ALC_SOFT_HRTF: !0
                },
                AL_EXTENSIONS: {
                    AL_EXT_float32: !0,
                    AL_SOFT_loop_points: !0,
                    AL_SOFT_source_length: !0,
                    AL_EXT_source_distance_model: !0,
                    AL_SOFT_source_spatialize: !0
                },
                _alcErr: 0,
                alcErr: 0,
                deviceRefCounts: {},
                alcStringCache: {},
                paused: !1,
                stringCache: {},
                contexts: {},
                currentCtx: null,
                buffers: {
                    0: {
                        id: 0,
                        refCount: 0,
                        audioBuf: null,
                        frequency: 0,
                        bytesPerSample: 2,
                        channels: 1,
                        length: 0
                    }
                },
                paramArray: [],
                _nextId: 1,
                newId: function() {
                    return Re.freeIds.length > 0 ? Re.freeIds.pop() : Re._nextId++
                },
                freeIds: [],
                scheduleContextAudio: function(e) {
                    if (1 !== Be.mainLoop.timingMode || "visible" == document.visibilityState)
                        for (var r in e.sources) Re.scheduleSourceAudio(e.sources[r])
                },
                scheduleSourceAudio: function(e, r) {
                    if ((1 !== Be.mainLoop.timingMode || "visible" == document.visibilityState) && 4114 === e.state) {
                        for (var t = Re.updateSourceTime(e), n = e.bufStartTime, i = e.bufOffset, a = e.bufsProcessed, o = 0; o < e.audioQueue.length; o++) {
                            n = (l = e.audioQueue[o])._startTime + l._duration, i = 0, a += l._skipCount + 1
                        }
                        r || (r = Re.QUEUE_LOOKAHEAD);
                        for (var u = t + r, s = 0; n < u;) {
                            if (a >= e.bufQueue.length) {
                                if (!e.looping) break;
                                a %= e.bufQueue.length
                            }
                            var c = e.bufQueue[a % e.bufQueue.length];
                            if (0 === c.length) {
                                if (++s === e.bufQueue.length) break
                            } else {
                                var l;
                                (l = e.context.audioCtx.createBufferSource()).buffer = c.audioBuf, l.playbackRate.value = e.playbackRate, (c.audioBuf._loopStart || c.audioBuf._loopEnd) && (l.loopStart = c.audioBuf._loopStart, l.loopEnd = c.audioBuf._loopEnd);
                                var f = 0;
                                4136 === e.type && e.looping ? (f = Number.POSITIVE_INFINITY, l.loop = !0, c.audioBuf._loopStart && (l.loopStart = c.audioBuf._loopStart), c.audioBuf._loopEnd && (l.loopEnd = c.audioBuf._loopEnd)) : f = (c.audioBuf.duration - i) / e.playbackRate, l._startOffset = i, l._duration = f, l._skipCount = s, s = 0, l.connect(e.gain), void 0 !== l.start ? (n = Math.max(n, e.context.audioCtx.currentTime), l.start(n, i)) : void 0 !== l.noteOn && (n = Math.max(n, e.context.audioCtx.currentTime), l.noteOn(n)), l._startTime = n, e.audioQueue.push(l), n += f
                            }
                            i = 0, a++
                        }
                    }
                },
                updateSourceTime: function(e) {
                    var r = e.context.audioCtx.currentTime;
                    if (4114 !== e.state) return r;
                    isFinite(e.bufStartTime) || (e.bufStartTime = r - e.bufOffset / e.playbackRate, e.bufOffset = 0);
                    for (var t = 0; e.audioQueue.length;) {
                        var n = e.audioQueue[0];
                        if (e.bufsProcessed += n._skipCount, r < (t = n._startTime + n._duration)) break;
                        e.audioQueue.shift(), e.bufStartTime = t, e.bufOffset = 0, e.bufsProcessed++
                    }
                    if (e.bufsProcessed >= e.bufQueue.length && !e.looping) Re.setSourceState(e, 4116);
                    else if (4136 === e.type && e.looping) {
                        if (0 === (c = e.bufQueue[0]).length) e.bufOffset = 0;
                        else {
                            var i = (r - e.bufStartTime) * e.playbackRate,
                                a = c.audioBuf._loopStart || 0,
                                o = c.audioBuf._loopEnd || c.audioBuf.duration;
                            o <= a && (o = c.audioBuf.duration), e.bufOffset = i < o ? i : a + (i - a) % (o - a)
                        }
                    } else if (e.audioQueue[0]) e.bufOffset = (r - e.audioQueue[0]._startTime) * e.playbackRate;
                    else {
                        if (4136 !== e.type && e.looping) {
                            var u = Re.sourceDuration(e) / e.playbackRate;
                            u > 0 && (e.bufStartTime += Math.floor((r - e.bufStartTime) / u) * u)
                        }
                        for (var s = 0; s < e.bufQueue.length; s++) {
                            if (e.bufsProcessed >= e.bufQueue.length) {
                                if (!e.looping) {
                                    Re.setSourceState(e, 4116);
                                    break
                                }
                                e.bufsProcessed %= e.bufQueue.length
                            }
                            var c;
                            if ((c = e.bufQueue[e.bufsProcessed]).length > 0) {
                                if (r < (t = e.bufStartTime + c.audioBuf.duration / e.playbackRate)) {
                                    e.bufOffset = (r - e.bufStartTime) * e.playbackRate;
                                    break
                                }
                                e.bufStartTime = t
                            }
                            e.bufOffset = 0, e.bufsProcessed++
                        }
                    }
                    return r
                },
                cancelPendingSourceAudio: function(e) {
                    Re.updateSourceTime(e);
                    for (var r = 1; r < e.audioQueue.length; r++) {
                        e.audioQueue[r].stop()
                    }
                    e.audioQueue.length > 1 && (e.audioQueue.length = 1)
                },
                stopSourceAudio: function(e) {
                    for (var r = 0; r < e.audioQueue.length; r++) e.audioQueue[r].stop();
                    e.audioQueue.length = 0
                },
                setSourceState: function(e, r) {
                    4114 === r ? (4114 !== e.state && 4116 != e.state || (e.bufsProcessed = 0, e.bufOffset = 0), Re.stopSourceAudio(e), e.state = 4114, e.bufStartTime = Number.NEGATIVE_INFINITY, Re.scheduleSourceAudio(e)) : 4115 === r ? 4114 === e.state && (Re.updateSourceTime(e), Re.stopSourceAudio(e), e.state = 4115) : 4116 === r ? 4113 !== e.state && (e.state = 4116, e.bufsProcessed = e.bufQueue.length, e.bufStartTime = Number.NEGATIVE_INFINITY, e.bufOffset = 0, Re.stopSourceAudio(e)) : 4113 === r && 4113 !== e.state && (e.state = 4113, e.bufsProcessed = 0, e.bufStartTime = Number.NEGATIVE_INFINITY, e.bufOffset = 0, Re.stopSourceAudio(e))
                },
                initSourcePanner: function(e) {
                    if (4144 !== e.type) {
                        for (var r = Re.buffers[0], t = 0; t < e.bufQueue.length; t++)
                            if (0 !== e.bufQueue[t].id) {
                                r = e.bufQueue[t];
                                break
                            } if (1 === e.spatialize || 2 === e.spatialize && 1 === r.channels) {
                            if (e.panner) return;
                            e.panner = e.context.audioCtx.createPanner(), Re.updateSourceGlobal(e), Re.updateSourceSpace(e), e.panner.connect(e.context.gain), e.gain.disconnect(), e.gain.connect(e.panner)
                        } else {
                            if (!e.panner) return;
                            e.panner.disconnect(), e.gain.disconnect(), e.gain.connect(e.context.gain), e.panner = null
                        }
                    }
                },
                updateContextGlobal: function(e) {
                    for (var r in e.sources) Re.updateSourceGlobal(e.sources[r])
                },
                updateSourceGlobal: function(e) {
                    var r = e.panner;
                    if (r) switch (r.refDistance = e.refDistance, r.maxDistance = e.maxDistance, r.rolloffFactor = e.rolloffFactor, r.panningModel = e.context.hrtf ? "HRTF" : "equalpower", e.context.sourceDistanceModel ? e.distanceModel : e.context.distanceModel) {
                        case 0:
                            r.distanceModel = "inverse", r.refDistance = 340282e33;
                            break;
                        case 53249:
                        case 53250:
                            r.distanceModel = "inverse";
                            break;
                        case 53251:
                        case 53252:
                            r.distanceModel = "linear";
                            break;
                        case 53253:
                        case 53254:
                            r.distanceModel = "exponential"
                    }
                },
                updateListenerSpace: function(e) {
                    var r = e.audioCtx.listener;
                    for (var t in r.positionX ? (r.positionX.value = e.listener.position[0], r.positionY.value = e.listener.position[1], r.positionZ.value = e.listener.position[2]) : r.setPosition(e.listener.position[0], e.listener.position[1], e.listener.position[2]), r.forwardX ? (r.forwardX.value = e.listener.direction[0], r.forwardY.value = e.listener.direction[1], r.forwardZ.value = e.listener.direction[2], r.upX.value = e.listener.up[0], r.upY.value = e.listener.up[1], r.upZ.value = e.listener.up[2]) : r.setOrientation(e.listener.direction[0], e.listener.direction[1], e.listener.direction[2], e.listener.up[0], e.listener.up[1], e.listener.up[2]), e.sources) Re.updateSourceSpace(e.sources[t])
                },
                updateSourceSpace: function(e) {
                    if (e.panner) {
                        var r = e.panner,
                            t = e.position[0],
                            n = e.position[1],
                            i = e.position[2],
                            a = e.direction[0],
                            o = e.direction[1],
                            u = e.direction[2],
                            s = e.context.listener,
                            c = s.position[0],
                            l = s.position[1],
                            f = s.position[2];
                        if (e.relative) {
                            var d = -s.direction[0],
                                m = -s.direction[1],
                                p = -s.direction[2],
                                v = s.up[0],
                                g = s.up[1],
                                h = s.up[2],
                                _ = function(e, r, t) {
                                    var n = Math.sqrt(e * e + r * r + t * t);
                                    return n < Number.EPSILON ? 0 : 1 / n
                                },
                                b = _(d, m, p);
                            d *= b, m *= b, p *= b;
                            var y = (g *= b = _(v, g, h)) * p - (h *= b) * m,
                                w = h * d - (v *= b) * p,
                                E = v * m - g * d,
                                x = a,
                                k = o,
                                C = u;
                            a = x * (y *= b = _(y, w, E)) + k * (v = m * (E *= b) - p * (w *= b)) + C * d, o = x * w + k * (g = p * y - d * E) + C * m, u = x * E + k * (h = d * w - m * y) + C * p, t = (x = t) * y + (k = n) * v + (C = i) * d, n = x * w + k * g + C * m, i = x * E + k * h + C * p, t += c, n += l, i += f
                        }
                        r.positionX ? (r.positionX.value = t, r.positionY.value = n, r.positionZ.value = i) : r.setPosition(t, n, i), r.orientationX ? (r.orientationX.value = a, r.orientationY.value = o, r.orientationZ.value = u) : r.setOrientation(a, o, u);
                        var S = e.dopplerShift,
                            D = e.velocity[0],
                            F = e.velocity[1],
                            A = e.velocity[2],
                            P = s.velocity[0],
                            T = s.velocity[1],
                            L = s.velocity[2];
                        if (t === c && n === l && i === f || D === P && F === T && A === L) e.dopplerShift = 1;
                        else {
                            var I = e.context.speedOfSound,
                                B = e.context.dopplerFactor,
                                R = c - t,
                                M = l - n,
                                N = f - i,
                                U = Math.sqrt(R * R + M * M + N * N),
                                O = (R * P + M * T + N * L) / U,
                                G = (R * D + M * F + N * A) / U;
                            O = Math.min(O, I / B), G = Math.min(G, I / B), e.dopplerShift = (I - B * O) / (I - B * G)
                        }
                        e.dopplerShift !== S && Re.updateSourceRate(e)
                    }
                },
                updateSourceRate: function(e) {
                    if (4114 === e.state) {
                        Re.cancelPendingSourceAudio(e);
                        var r, t = e.audioQueue[0];
                        if (!t) return;
                        r = 4136 === e.type && e.looping ? Number.POSITIVE_INFINITY : (t.buffer.duration - t._startOffset) / e.playbackRate, t._duration = r, t.playbackRate.value = e.playbackRate, Re.scheduleSourceAudio(e)
                    }
                },
                sourceDuration: function(e) {
                    for (var r = 0, t = 0; t < e.bufQueue.length; t++) {
                        var n = e.bufQueue[t].audioBuf;
                        r += n ? n.duration : 0
                    }
                    return r
                },
                sourceTell: function(e) {
                    Re.updateSourceTime(e);
                    for (var r = 0, t = 0; t < e.bufsProcessed; t++) r += e.bufQueue[t].audioBuf.duration;
                    return r += e.bufOffset
                },
                sourceSeek: function(e, r) {
                    var t = 4114 == e.state;
                    if (t && Re.setSourceState(e, 4113), null !== e.bufQueue[e.bufsProcessed].audioBuf) {
                        for (e.bufsProcessed = 0; r > e.bufQueue[e.bufsProcessed].audioBuf.duration;) r -= e.bufQueue[e.bufsProcessed].audiobuf.duration, e.bufsProcessed++;
                        e.bufOffset = r
                    }
                    t && Re.setSourceState(e, 4114)
                },
                getGlobalParam: function(e, r) {
                    if (!Re.currentCtx) return null;
                    switch (r) {
                        case 49152:
                            return Re.currentCtx.dopplerFactor;
                        case 49155:
                            return Re.currentCtx.speedOfSound;
                        case 53248:
                            return Re.currentCtx.distanceModel;
                        default:
                            return Re.currentCtx.err = 40962, null
                    }
                },
                setGlobalParam: function(e, r, t) {
                    if (Re.currentCtx) switch (r) {
                        case 49152:
                            if (!Number.isFinite(t) || t < 0) return void(Re.currentCtx.err = 40963);
                            Re.currentCtx.dopplerFactor = t, Re.updateListenerSpace(Re.currentCtx);
                            break;
                        case 49155:
                            if (!Number.isFinite(t) || t <= 0) return void(Re.currentCtx.err = 40963);
                            Re.currentCtx.speedOfSound = t, Re.updateListenerSpace(Re.currentCtx);
                            break;
                        case 53248:
                            switch (t) {
                                case 0:
                                case 53249:
                                case 53250:
                                case 53251:
                                case 53252:
                                case 53253:
                                case 53254:
                                    Re.currentCtx.distanceModel = t, Re.updateContextGlobal(Re.currentCtx);
                                    break;
                                default:
                                    return void(Re.currentCtx.err = 40963)
                            }
                            break;
                        default:
                            return void(Re.currentCtx.err = 40962)
                    }
                },
                getListenerParam: function(e, r) {
                    if (!Re.currentCtx) return null;
                    switch (r) {
                        case 4100:
                            return Re.currentCtx.listener.position;
                        case 4102:
                            return Re.currentCtx.listener.velocity;
                        case 4111:
                            return Re.currentCtx.listener.direction.concat(Re.currentCtx.listener.up);
                        case 4106:
                            return Re.currentCtx.gain.gain.value;
                        default:
                            return Re.currentCtx.err = 40962, null
                    }
                },
                setListenerParam: function(e, r, t) {
                    if (Re.currentCtx)
                        if (null !== t) {
                            var n = Re.currentCtx.listener;
                            switch (r) {
                                case 4100:
                                    if (!Number.isFinite(t[0]) || !Number.isFinite(t[1]) || !Number.isFinite(t[2])) return void(Re.currentCtx.err = 40963);
                                    n.position[0] = t[0], n.position[1] = t[1], n.position[2] = t[2], Re.updateListenerSpace(Re.currentCtx);
                                    break;
                                case 4102:
                                    if (!Number.isFinite(t[0]) || !Number.isFinite(t[1]) || !Number.isFinite(t[2])) return void(Re.currentCtx.err = 40963);
                                    n.velocity[0] = t[0], n.velocity[1] = t[1], n.velocity[2] = t[2], Re.updateListenerSpace(Re.currentCtx);
                                    break;
                                case 4106:
                                    if (!Number.isFinite(t) || t < 0) return void(Re.currentCtx.err = 40963);
                                    Re.currentCtx.gain.gain.value = t;
                                    break;
                                case 4111:
                                    if (!(Number.isFinite(t[0]) && Number.isFinite(t[1]) && Number.isFinite(t[2]) && Number.isFinite(t[3]) && Number.isFinite(t[4]) && Number.isFinite(t[5]))) return void(Re.currentCtx.err = 40963);
                                    n.direction[0] = t[0], n.direction[1] = t[1], n.direction[2] = t[2], n.up[0] = t[3], n.up[1] = t[4], n.up[2] = t[5], Re.updateListenerSpace(Re.currentCtx);
                                    break;
                                default:
                                    return void(Re.currentCtx.err = 40962)
                            }
                        } else Re.currentCtx.err = 40962
                },
                getBufferParam: function(e, r, t) {
                    if (Re.currentCtx) {
                        var n = Re.buffers[r];
                        if (n && 0 !== r) switch (t) {
                            case 8193:
                                return n.frequency;
                            case 8194:
                                return 8 * n.bytesPerSample;
                            case 8195:
                                return n.channels;
                            case 8196:
                                return n.length * n.bytesPerSample * n.channels;
                            case 8213:
                                return 0 === n.length ? [0, 0] : [(n.audioBuf._loopStart || 0) * n.frequency, (n.audioBuf._loopEnd || n.length) * n.frequency];
                            default:
                                return Re.currentCtx.err = 40962, null
                        } else Re.currentCtx.err = 40961
                    }
                },
                setBufferParam: function(e, r, t, n) {
                    if (Re.currentCtx) {
                        var i = Re.buffers[r];
                        if (i && 0 !== r)
                            if (null !== n) switch (t) {
                                case 8196:
                                    if (0 !== n) return void(Re.currentCtx.err = 40963);
                                    break;
                                case 8213:
                                    if (n[0] < 0 || n[0] > i.length || n[1] < 0 || n[1] > i.Length || n[0] >= n[1]) return void(Re.currentCtx.err = 40963);
                                    if (i.refCount > 0) return void(Re.currentCtx.err = 40964);
                                    i.audioBuf && (i.audioBuf._loopStart = n[0] / i.frequency, i.audioBuf._loopEnd = n[1] / i.frequency);
                                    break;
                                default:
                                    return void(Re.currentCtx.err = 40962)
                            } else Re.currentCtx.err = 40962;
                            else Re.currentCtx.err = 40961
                    }
                },
                getSourceParam: function(e, r, t) {
                    if (!Re.currentCtx) return null;
                    var n = Re.currentCtx.sources[r];
                    if (!n) return Re.currentCtx.err = 40961, null;
                    switch (t) {
                        case 514:
                            return n.relative;
                        case 4097:
                            return n.coneInnerAngle;
                        case 4098:
                            return n.coneOuterAngle;
                        case 4099:
                            return n.pitch;
                        case 4100:
                            return n.position;
                        case 4101:
                            return n.direction;
                        case 4102:
                            return n.velocity;
                        case 4103:
                            return n.looping;
                        case 4105:
                            return 4136 === n.type ? n.bufQueue[0].id : 0;
                        case 4106:
                            return n.gain.gain.value;
                        case 4109:
                            return n.minGain;
                        case 4110:
                            return n.maxGain;
                        case 4112:
                            return n.state;
                        case 4117:
                            return 1 === n.bufQueue.length && 0 === n.bufQueue[0].id ? 0 : n.bufQueue.length;
                        case 4118:
                            return 1 === n.bufQueue.length && 0 === n.bufQueue[0].id || n.looping ? 0 : n.bufsProcessed;
                        case 4128:
                            return n.refDistance;
                        case 4129:
                            return n.rolloffFactor;
                        case 4130:
                            return n.coneOuterGain;
                        case 4131:
                            return n.maxDistance;
                        case 4132:
                            return Re.sourceTell(n);
                        case 4133:
                            return (i = Re.sourceTell(n)) > 0 && (i *= n.bufQueue[0].frequency), i;
                        case 4134:
                            var i;
                            return (i = Re.sourceTell(n)) > 0 && (i *= n.bufQueue[0].frequency * n.bufQueue[0].bytesPerSample), i;
                        case 4135:
                            return n.type;
                        case 4628:
                            return n.spatialize;
                        case 8201:
                            for (var a = 0, o = 0, u = 0; u < n.bufQueue.length; u++) a += n.bufQueue[u].length, 0 !== n.bufQueue[u].id && (o = n.bufQueue[u].bytesPerSample * n.bufQueue[u].channels);
                            return a * o;
                        case 8202:
                            for (a = 0, u = 0; u < n.bufQueue.length; u++) a += n.bufQueue[u].length;
                            return a;
                        case 8203:
                            return Re.sourceDuration(n);
                        case 53248:
                            return n.distanceModel;
                        default:
                            return Re.currentCtx.err = 40962, null
                    }
                },
                setSourceParam: function(e, r, t, n) {
                    if (Re.currentCtx) {
                        var i = Re.currentCtx.sources[r];
                        if (i)
                            if (null !== n) switch (t) {
                                case 514:
                                    if (1 === n) i.relative = !0, Re.updateSourceSpace(i);
                                    else {
                                        if (0 !== n) return void(Re.currentCtx.err = 40963);
                                        i.relative = !1, Re.updateSourceSpace(i)
                                    }
                                    break;
                                case 4097:
                                    if (!Number.isFinite(n)) return void(Re.currentCtx.err = 40963);
                                    i.coneInnerAngle = n, i.panner && (i.panner.coneInnerAngle = n % 360);
                                    break;
                                case 4098:
                                    if (!Number.isFinite(n)) return void(Re.currentCtx.err = 40963);
                                    i.coneOuterAngle = n, i.panner && (i.panner.coneOuterAngle = n % 360);
                                    break;
                                case 4099:
                                    if (!Number.isFinite(n) || n <= 0) return void(Re.currentCtx.err = 40963);
                                    if (i.pitch === n) break;
                                    i.pitch = n, Re.updateSourceRate(i);
                                    break;
                                case 4100:
                                    if (!Number.isFinite(n[0]) || !Number.isFinite(n[1]) || !Number.isFinite(n[2])) return void(Re.currentCtx.err = 40963);
                                    i.position[0] = n[0], i.position[1] = n[1], i.position[2] = n[2], Re.updateSourceSpace(i);
                                    break;
                                case 4101:
                                    if (!Number.isFinite(n[0]) || !Number.isFinite(n[1]) || !Number.isFinite(n[2])) return void(Re.currentCtx.err = 40963);
                                    i.direction[0] = n[0], i.direction[1] = n[1], i.direction[2] = n[2], Re.updateSourceSpace(i);
                                    break;
                                case 4102:
                                    if (!Number.isFinite(n[0]) || !Number.isFinite(n[1]) || !Number.isFinite(n[2])) return void(Re.currentCtx.err = 40963);
                                    i.velocity[0] = n[0], i.velocity[1] = n[1], i.velocity[2] = n[2], Re.updateSourceSpace(i);
                                    break;
                                case 4103:
                                    if (1 === n) {
                                        if (i.looping = !0, Re.updateSourceTime(i), 4136 === i.type && i.audioQueue.length > 0)(a = i.audioQueue[0]).loop = !0, a._duration = Number.POSITIVE_INFINITY
                                    } else {
                                        if (0 !== n) return void(Re.currentCtx.err = 40963);
                                        i.looping = !1;
                                        var a, o = Re.updateSourceTime(i);
                                        4136 === i.type && i.audioQueue.length > 0 && ((a = i.audioQueue[0]).loop = !1, a._duration = i.bufQueue[0].audioBuf.duration / i.playbackRate, a._startTime = o - i.bufOffset / i.playbackRate)
                                    }
                                    break;
                                case 4105:
                                    if (4114 === i.state || 4115 === i.state) return void(Re.currentCtx.err = 40964);
                                    if (0 === n) {
                                        for (var u = 0; u < i.bufQueue.length; u++) i.bufQueue[u].refCount--;
                                        i.bufQueue.length = 1, i.bufQueue[0] = Re.buffers[0], i.bufsProcessed = 0, i.type = 4144
                                    } else {
                                        if (!(d = Re.buffers[n])) return void(Re.currentCtx.err = 40963);
                                        for (u = 0; u < i.bufQueue.length; u++) i.bufQueue[u].refCount--;
                                        i.bufQueue.length = 0, d.refCount++, i.bufQueue = [d], i.bufsProcessed = 0, i.type = 4136
                                    }
                                    Re.initSourcePanner(i), Re.scheduleSourceAudio(i);
                                    break;
                                case 4106:
                                    if (!Number.isFinite(n) || n < 0) return void(Re.currentCtx.err = 40963);
                                    i.gain.gain.value = n;
                                    break;
                                case 4109:
                                    if (!Number.isFinite(n) || n < 0 || n > Math.min(i.maxGain, 1)) return void(Re.currentCtx.err = 40963);
                                    i.minGain = n;
                                    break;
                                case 4110:
                                    if (!Number.isFinite(n) || n < Math.max(0, i.minGain) || n > 1) return void(Re.currentCtx.err = 40963);
                                    i.maxGain = n;
                                    break;
                                case 4128:
                                    if (!Number.isFinite(n) || n < 0) return void(Re.currentCtx.err = 40963);
                                    i.refDistance = n, i.panner && (i.panner.refDistance = n);
                                    break;
                                case 4129:
                                    if (!Number.isFinite(n) || n < 0) return void(Re.currentCtx.err = 40963);
                                    i.rolloffFactor = n, i.panner && (i.panner.rolloffFactor = n);
                                    break;
                                case 4130:
                                    if (!Number.isFinite(n) || n < 0 || n > 1) return void(Re.currentCtx.err = 40963);
                                    i.coneOuterGain = n, i.panner && (i.panner.coneOuterGain = n);
                                    break;
                                case 4131:
                                    if (!Number.isFinite(n) || n < 0) return void(Re.currentCtx.err = 40963);
                                    i.maxDistance = n, i.panner && (i.panner.maxDistance = n);
                                    break;
                                case 4132:
                                    if (n < 0 || n > Re.sourceDuration(i)) return void(Re.currentCtx.err = 40963);
                                    Re.sourceSeek(i, n);
                                    break;
                                case 4133:
                                    if ((l = Re.sourceDuration(i)) > 0) {
                                        var s;
                                        for (var c in i.bufQueue)
                                            if (c) {
                                                s = i.bufQueue[c].frequency;
                                                break
                                            } n /= s
                                    }
                                    if (n < 0 || n > l) return void(Re.currentCtx.err = 40963);
                                    Re.sourceSeek(i, n);
                                    break;
                                case 4134:
                                    var l;
                                    if ((l = Re.sourceDuration(i)) > 0) {
                                        var f;
                                        for (var c in i.bufQueue)
                                            if (c) {
                                                var d;
                                                f = (d = i.bufQueue[c]).frequency * d.bytesPerSample * d.channels;
                                                break
                                            } n /= f
                                    }
                                    if (n < 0 || n > l) return void(Re.currentCtx.err = 40963);
                                    Re.sourceSeek(i, n);
                                    break;
                                case 4628:
                                    if (0 !== n && 1 !== n && 2 !== n) return void(Re.currentCtx.err = 40963);
                                    i.spatialize = n, Re.initSourcePanner(i);
                                    break;
                                case 8201:
                                case 8202:
                                case 8203:
                                    Re.currentCtx.err = 40964;
                                    break;
                                case 53248:
                                    switch (n) {
                                        case 0:
                                        case 53249:
                                        case 53250:
                                        case 53251:
                                        case 53252:
                                        case 53253:
                                        case 53254:
                                            i.distanceModel = n, Re.currentCtx.sourceDistanceModel && Re.updateContextGlobal(Re.currentCtx);
                                            break;
                                        default:
                                            return void(Re.currentCtx.err = 40963)
                                    }
                                    break;
                                default:
                                    return void(Re.currentCtx.err = 40962)
                            } else Re.currentCtx.err = 40962;
                            else Re.currentCtx.err = 40961
                    }
                },
                captures: {},
                sharedCaptureAudioCtx: null,
                requireValidCaptureDevice: function(e, r) {
                    if (0 === e) return Re.alcErr = 40961, null;
                    var t = Re.captures[e];
                    return t ? t.mediaStreamError ? (Re.alcErr = 40961, null) : t : (Re.alcErr = 40961, null)
                }
            };

        function Me(e, r, t) {
            switch (r) {
                case 514:
                case 4097:
                case 4098:
                case 4103:
                case 4105:
                case 4128:
                case 4129:
                case 4131:
                case 4132:
                case 4133:
                case 4134:
                case 4628:
                case 8201:
                case 8202:
                case 53248:
                    Re.setSourceParam("alSourcei", e, r, t);
                    break;
                default:
                    Re.setSourceParam("alSourcei", e, r, null)
            }
        }
        var Ne = {
            errorCode: 12288,
            defaultDisplayInitialized: !1,
            currentContext: 0,
            currentReadSurface: 0,
            currentDrawSurface: 0,
            contextAttributes: {
                alpha: !1,
                depth: !1,
                stencil: !1,
                antialias: !1
            },
            stringCache: {},
            setErrorCode: function(e) {
                Ne.errorCode = e
            },
            chooseConfig: function(e, r, t, n, i) {
                if (62e3 != e) return Ne.setErrorCode(12296), 0;
                if (r)
                    for (;;) {
                        var a = q[r >> 2];
                        if (12321 == a) {
                            var o = q[r + 4 >> 2];
                            Ne.contextAttributes.alpha = o > 0
                        } else if (12325 == a) {
                            var u = q[r + 4 >> 2];
                            Ne.contextAttributes.depth = u > 0
                        } else if (12326 == a) {
                            var s = q[r + 4 >> 2];
                            Ne.contextAttributes.stencil = s > 0
                        } else if (12337 == a) {
                            var c = q[r + 4 >> 2];
                            Ne.contextAttributes.antialias = c > 0
                        } else if (12338 == a) {
                            c = q[r + 4 >> 2];
                            Ne.contextAttributes.antialias = 1 == c
                        } else if (12544 == a) {
                            var l = q[r + 4 >> 2];
                            Ne.contextAttributes.lowLatency = 12547 != l
                        } else if (12344 == a) break;
                        r += 8
                    }
                return t && n || i ? (i && (q[i >> 2] = 1), t && n > 0 && (q[t >> 2] = 62002), Ne.setErrorCode(12288), 1) : (Ne.setErrorCode(12300), 0)
            }
        };
        var Ue = {
            counter: 1,
            lastError: 0,
            buffers: [],
            mappedBuffers: {},
            programs: [],
            framebuffers: [],
            renderbuffers: [],
            textures: [],
            uniforms: [],
            shaders: [],
            vaos: [],
            contexts: [],
            currentContext: null,
            offscreenCanvases: {},
            timerQueriesEXT: [],
            queries: [],
            samplers: [],
            transformFeedbacks: [],
            syncs: [],
            programInfos: {},
            stringCache: {},
            stringiCache: {},
            unpackAlignment: 4,
            init: function() {
                for (var e = new Float32Array(Ue.MINI_TEMP_BUFFER_SIZE), r = 0; r < Ue.MINI_TEMP_BUFFER_SIZE; r++) Ue.miniTempBufferFloatViews[r] = e.subarray(0, r + 1);
                var t = new Int32Array(Ue.MINI_TEMP_BUFFER_SIZE);
                for (r = 0; r < Ue.MINI_TEMP_BUFFER_SIZE; r++) Ue.miniTempBufferIntViews[r] = t.subarray(0, r + 1)
            },
            recordError: function(e) {
                Ue.lastError || (Ue.lastError = e)
            },
            getNewId: function(e) {
                for (var r = Ue.counter++, t = e.length; t < r; t++) e[t] = null;
                return r
            },
            MINI_TEMP_BUFFER_SIZE: 256,
            miniTempBufferFloatViews: [0],
            miniTempBufferIntViews: [0],
            getSource: function(e, r, t, n) {
                for (var i = "", a = 0; a < r; ++a) {
                    var o = n ? q[n + 4 * a >> 2] : -1;
                    i += L(q[t + 4 * a >> 2], o < 0 ? void 0 : o)
                }
                return i
            },
            createContext: function(e, r) {
                var t = r.majorVersion > 1 ? e.getContext("webgl2", r) : e.getContext("webgl", r);
                return t ? Ue.registerContext(t, r) : 0
            },
            registerContext: function(e, r) {
                var t = Ue.getNewId(Ue.contexts),
                    n = {
                        handle: t,
                        attributes: r,
                        version: r.majorVersion,
                        GLctx: e
                    };
                return e.canvas && (e.canvas.GLctxObject = n), Ue.contexts[t] = n, (void 0 === r.enableExtensionsByDefault || r.enableExtensionsByDefault) && Ue.initExtensions(n), t
            },
            makeContextCurrent: function(e) {
                return Ue.currentContext = Ue.contexts[e], r.ctx = Or = Ue.currentContext && Ue.currentContext.GLctx, !(e && !Or)
            },
            getContext: function(e) {
                return Ue.contexts[e]
            },
            deleteContext: function(e) {
                Ue.currentContext === Ue.contexts[e] && (Ue.currentContext = null), "object" == typeof Oe && Oe.removeAllHandlersOnTarget(Ue.contexts[e].GLctx.canvas), Ue.contexts[e] && Ue.contexts[e].GLctx.canvas && (Ue.contexts[e].GLctx.canvas.GLctxObject = void 0), Ue.contexts[e] = null
            },
            initExtensions: function(e) {
                if (e || (e = Ue.currentContext), !e.initExtensionsDone) {
                    e.initExtensionsDone = !0;
                    var r, t = e.GLctx;
                    (r = t).dibvbi = r.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"), t.disjointTimerQueryExt = t.getExtension("EXT_disjoint_timer_query");
                    var n = ["OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "EXT_texture_norm16", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2", "WEBKIT_WEBGL_compressed_texture_pvrtc"];
                    (t.getSupportedExtensions() || []).forEach((function(e) {
                        -1 != n.indexOf(e) && t.getExtension(e)
                    }))
                }
            },
            populateUniformTable: function(e) {
                for (var r = Ue.programs[e], t = Ue.programInfos[e] = {
                        uniforms: {},
                        maxUniformLength: 0,
                        maxAttributeLength: -1,
                        maxUniformBlockNameLength: -1
                    }, n = t.uniforms, i = Or.getProgramParameter(r, 35718), a = 0; a < i; ++a) {
                    var o = Or.getActiveUniform(r, a),
                        u = o.name;
                    t.maxUniformLength = Math.max(t.maxUniformLength, u.length + 1), "]" == u.slice(-1) && (u = u.slice(0, u.lastIndexOf("[")));
                    var s = Or.getUniformLocation(r, u);
                    if (s) {
                        var c = Ue.getNewId(Ue.uniforms);
                        n[u] = [o.size, c], Ue.uniforms[c] = s;
                        for (var l = 1; l < o.size; ++l) {
                            var f = u + "[" + l + "]";
                            s = Or.getUniformLocation(r, f), c = Ue.getNewId(Ue.uniforms), Ue.uniforms[c] = s
                        }
                    }
                }
            }
        };
        var Oe = {
                keyEvent: 0,
                mouseEvent: 0,
                wheelEvent: 0,
                uiEvent: 0,
                focusEvent: 0,
                deviceOrientationEvent: 0,
                deviceMotionEvent: 0,
                fullscreenChangeEvent: 0,
                pointerlockChangeEvent: 0,
                visibilityChangeEvent: 0,
                touchEvent: 0,
                previousFullscreenElement: null,
                previousScreenX: null,
                previousScreenY: null,
                removeEventListenersRegistered: !1,
                removeAllEventListeners: function() {
                    for (var e = Oe.eventHandlers.length - 1; e >= 0; --e) Oe._removeHandler(e);
                    Oe.eventHandlers = [], Oe.deferredCalls = []
                },
                registerRemoveEventListeners: function() {
                    Oe.removeEventListenersRegistered || (ee.push(Oe.removeAllEventListeners), Oe.removeEventListenersRegistered = !0)
                },
                deferredCalls: [],
                deferCall: function(e, r, t) {
                    function n(e, r) {
                        if (e.length != r.length) return !1;
                        for (var t in e)
                            if (e[t] != r[t]) return !1;
                        return !0
                    }
                    for (var i in Oe.deferredCalls) {
                        var a = Oe.deferredCalls[i];
                        if (a.targetFunction == e && n(a.argsList, t)) return
                    }
                    Oe.deferredCalls.push({
                        targetFunction: e,
                        precedence: r,
                        argsList: t
                    }), Oe.deferredCalls.sort((function(e, r) {
                        return e.precedence < r.precedence
                    }))
                },
                removeDeferredCalls: function(e) {
                    for (var r = 0; r < Oe.deferredCalls.length; ++r) Oe.deferredCalls[r].targetFunction == e && (Oe.deferredCalls.splice(r, 1), --r)
                },
                canPerformEventHandlerRequests: function() {
                    return Oe.inEventHandler && Oe.currentEventHandler.allowsDeferredCalls
                },
                runDeferredCalls: function() {
                    if (Oe.canPerformEventHandlerRequests())
                        for (var e = 0; e < Oe.deferredCalls.length; ++e) {
                            var r = Oe.deferredCalls[e];
                            Oe.deferredCalls.splice(e, 1), --e, r.targetFunction.apply(null, r.argsList)
                        }
                },
                inEventHandler: 0,
                currentEventHandler: null,
                eventHandlers: [],
                removeAllHandlersOnTarget: function(e, r) {
                    for (var t = 0; t < Oe.eventHandlers.length; ++t) Oe.eventHandlers[t].target != e || r && r != Oe.eventHandlers[t].eventTypeString || Oe._removeHandler(t--)
                },
                _removeHandler: function(e) {
                    var r = Oe.eventHandlers[e];
                    r.target.removeEventListener(r.eventTypeString, r.eventListenerFunc, r.useCapture), Oe.eventHandlers.splice(e, 1)
                },
                registerOrRemoveHandler: function(e) {
                    var r = function(r) {
                        ++Oe.inEventHandler, Oe.currentEventHandler = e, Oe.runDeferredCalls(), e.handlerFunc(r), Oe.runDeferredCalls(), --Oe.inEventHandler
                    };
                    if (e.callbackfunc) e.eventListenerFunc = r, e.target.addEventListener(e.eventTypeString, r, e.useCapture), Oe.eventHandlers.push(e), Oe.registerRemoveEventListeners();
                    else
                        for (var t = 0; t < Oe.eventHandlers.length; ++t) Oe.eventHandlers[t].target == e.target && Oe.eventHandlers[t].eventTypeString == e.eventTypeString && Oe._removeHandler(t--)
                },
                getNodeNameForTarget: function(e) {
                    return e ? e == window ? "#window" : e == screen ? "#screen" : e && e.nodeName ? e.nodeName : "" : ""
                },
                fullscreenEnabled: function() {
                    return document.fullscreenEnabled || document.webkitFullscreenEnabled
                }
            },
            Ge = {};
        var je = [0, document, window];

        function ze(e) {
            var r;
            return e = (r = e) > 2 ? L(r) : r, je[e] || document.querySelector(e)
        }

        function qe(e) {
            return ze(e)
        }

        function Qe(e, r, t) {
            var n = qe(e);
            if (!n) return -4;
            q[r >> 2] = n.width, q[t >> 2] = n.height
        }

        function Ve(e) {
            var r = yt(),
                t = wt(8),
                n = t + 4,
                i = wt(e.id.length + 1);
            B(e.id, i, e.id.length + 1);
            Qe(i, t, n);
            var a = [q[t >> 2], q[n >> 2]];
            return Et(r), a
        }

        function Xe(e, r, t) {
            var n = qe(e);
            return n ? (n.width = r, n.height = t, 0) : -4
        }

        function He(e, r, t) {
            if (e.controlTransferredOffscreen) {
                var n = yt(),
                    i = wt(e.id.length + 1);
                B(e.id, i, e.id.length + 1), Xe(i, r, t), Et(n)
            } else e.width = r, e.height = t
        }

        function We(e, r, t) {
            e.style.paddingLeft = e.style.paddingRight = t + "px", e.style.paddingTop = e.style.paddingBottom = r + "px"
        }

        function Ye(e) {
            return je.indexOf(e) < 0 ? e.getBoundingClientRect() : {
                left: 0,
                top: 0
            }
        }

        function Ze(e, r) {
            var t = function(e) {
                    var r = Ve(e),
                        t = r[0],
                        n = r[1],
                        i = e.style.width,
                        a = e.style.height,
                        o = e.style.backgroundColor,
                        u = document.body.style.backgroundColor,
                        s = e.style.paddingLeft,
                        c = e.style.paddingRight,
                        l = e.style.paddingTop,
                        f = e.style.paddingBottom,
                        d = e.style.marginLeft,
                        m = e.style.marginRight,
                        p = e.style.marginTop,
                        v = e.style.marginBottom,
                        g = document.body.style.margin,
                        h = document.documentElement.style.overflow,
                        _ = document.body.scroll,
                        b = e.style.imageRendering;

                    function y() {
                        document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (document.removeEventListener("fullscreenchange", y), document.removeEventListener("webkitfullscreenchange", y), He(e, t, n), e.style.width = i, e.style.height = a, e.style.backgroundColor = o, u || (document.body.style.backgroundColor = "white"), document.body.style.backgroundColor = u, e.style.paddingLeft = s, e.style.paddingRight = c, e.style.paddingTop = l, e.style.paddingBottom = f, e.style.marginLeft = d, e.style.marginRight = m, e.style.marginTop = p, e.style.marginBottom = v, document.body.style.margin = g, document.documentElement.style.overflow = h, document.body.scroll = _, e.style.imageRendering = b, e.GLctxObject && e.GLctxObject.GLctx.viewport(0, 0, t, n), Ge.canvasResizedCallback && mt(Ge.canvasResizedCallback, 37, 0, Ge.canvasResizedCallbackUserData))
                    }
                    return document.addEventListener("fullscreenchange", y), document.addEventListener("webkitfullscreenchange", y), y
                }(e),
                n = r.softFullscreen ? innerWidth : screen.width,
                i = r.softFullscreen ? innerHeight : screen.height,
                a = Ye(e),
                o = a.width,
                u = a.height,
                s = Ve(e),
                c = s[0],
                l = s[1];
            if (3 == r.scaleMode) We(e, (i - u) / 2, (n - o) / 2), n = o, i = u;
            else if (2 == r.scaleMode)
                if (n * l < c * i) {
                    var f = l * n / c;
                    We(e, (i - f) / 2, 0), i = f
                } else {
                    var d = c * i / l;
                    We(e, 0, (n - d) / 2), n = d
                } e.style.backgroundColor || (e.style.backgroundColor = "black"), document.body.style.backgroundColor || (document.body.style.backgroundColor = "black"), e.style.width = n + "px", e.style.height = i + "px", 1 == r.filteringMode && (e.style.imageRendering = "optimizeSpeed", e.style.imageRendering = "-moz-crisp-edges", e.style.imageRendering = "-o-crisp-edges", e.style.imageRendering = "-webkit-optimize-contrast", e.style.imageRendering = "optimize-contrast", e.style.imageRendering = "crisp-edges", e.style.imageRendering = "pixelated");
            var m = 2 == r.canvasResolutionScaleMode ? devicePixelRatio : 1;
            if (0 != r.canvasResolutionScaleMode) {
                var p = n * m | 0,
                    v = i * m | 0;
                He(e, p, v), e.GLctxObject && e.GLctxObject.GLctx.viewport(0, 0, p, v)
            }
            return t
        }

        function Ke(e, r) {
            if (0 == r.scaleMode && 0 == r.canvasResolutionScaleMode || Ze(e, r), e.requestFullscreen) e.requestFullscreen();
            else {
                if (!e.webkitRequestFullscreen) return Oe.fullscreenEnabled() ? -3 : -1;
                e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
            }
            return Ge = r, r.canvasResizedCallback && mt(r.canvasResizedCallback, 37, 0, r.canvasResizedCallbackUserData), 0
        }

        function $e(e) {
            if (e.requestPointerLock) e.requestPointerLock();
            else {
                if (!e.msRequestPointerLock) return document.body.requestPointerLock || document.body.msRequestPointerLock ? -3 : -1;
                e.msRequestPointerLock()
            }
            return 0
        }

        function Je(e) {
            var r = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement,
                t = !!r;
            q[e >> 2] = t, q[e + 4 >> 2] = Oe.fullscreenEnabled();
            var n = t ? r : Oe.previousFullscreenElement,
                i = Oe.getNodeNameForTarget(n),
                a = n && n.id ? n.id : "";
            B(i, e + 8, 128), B(a, e + 136, 128), q[e + 264 >> 2] = n ? n.clientWidth : 0, q[e + 268 >> 2] = n ? n.clientHeight : 0, q[e + 272 >> 2] = screen.width, q[e + 276 >> 2] = screen.height, t && (Oe.previousFullscreenElement = r)
        }

        function er(e, r) {
            X[e >> 3] = r.timestamp;
            for (var t = 0; t < r.axes.length; ++t) X[e + 8 * t + 16 >> 3] = r.axes[t];
            for (t = 0; t < r.buttons.length; ++t) "object" == typeof r.buttons[t] ? X[e + 8 * t + 528 >> 3] = r.buttons[t].value : X[e + 8 * t + 528 >> 3] = r.buttons[t];
            for (t = 0; t < r.buttons.length; ++t) "object" == typeof r.buttons[t] ? q[e + 4 * t + 1040 >> 2] = r.buttons[t].pressed : q[e + 4 * t + 1040 >> 2] = 1 == r.buttons[t];
            q[e + 1296 >> 2] = r.connected, q[e + 1300 >> 2] = r.index, q[e + 8 >> 2] = r.axes.length, q[e + 12 >> 2] = r.buttons.length, B(r.id, e + 1304, 64), B(r.mapping, e + 1368, 64)
        }

        function rr(e, r) {
            return (e >>> 0) + 4294967296 * r
        }
        var tr = [];

        function nr(e, r, t, n) {
            Or.drawElements(e, r, t, n)
        }

        function ir(e, r, t, n) {
            for (var i = 0; i < e; i++) {
                var a = Or[t](),
                    o = a && Ue.getNewId(n);
                a ? (a.name = o, n[o] = a) : Ue.recordError(1282), q[r + 4 * i >> 2] = o
            }
        }

        function ar(e, r) {
            Q[e >> 2] = r, Q[e + 4 >> 2] = (r - Q[e >> 2]) / 4294967296
        }

        function or(e, r, t) {
            if (r) {
                var n = void 0;
                switch (e) {
                    case 36346:
                        n = 1;
                        break;
                    case 36344:
                        return void(0 != t && 1 != t && Ue.recordError(1280));
                    case 34814:
                    case 36345:
                        n = 0;
                        break;
                    case 34466:
                        var i = Or.getParameter(34467);
                        n = i ? i.length : 0;
                        break;
                    case 33309:
                        if (Ue.currentContext.version < 2) return void Ue.recordError(1282);
                        n = 2 * (Or.getSupportedExtensions() || []).length;
                        break;
                    case 33307:
                    case 33308:
                        if (Ue.currentContext.version < 2) return void Ue.recordError(1280);
                        n = 33307 == e ? 3 : 0
                }
                if (void 0 === n) {
                    var a = Or.getParameter(e);
                    switch (typeof a) {
                        case "number":
                            n = a;
                            break;
                        case "boolean":
                            n = a ? 1 : 0;
                            break;
                        case "string":
                            return void Ue.recordError(1280);
                        case "object":
                            if (null === a) switch (e) {
                                case 34964:
                                case 35725:
                                case 34965:
                                case 36006:
                                case 36007:
                                case 32873:
                                case 34229:
                                case 36662:
                                case 36663:
                                case 35053:
                                case 35055:
                                case 36010:
                                case 35097:
                                case 35869:
                                case 32874:
                                case 36389:
                                case 35983:
                                case 35368:
                                case 34068:
                                    n = 0;
                                    break;
                                default:
                                    return void Ue.recordError(1280)
                            } else {
                                if (a instanceof Float32Array || a instanceof Uint32Array || a instanceof Int32Array || a instanceof Array) {
                                    for (var o = 0; o < a.length; ++o) switch (t) {
                                        case 0:
                                            q[r + 4 * o >> 2] = a[o];
                                            break;
                                        case 2:
                                            V[r + 4 * o >> 2] = a[o];
                                            break;
                                        case 4:
                                            O[r + o >> 0] = a[o] ? 1 : 0
                                    }
                                    return
                                }
                                try {
                                    n = 0 | a.name
                                } catch (r) {
                                    return Ue.recordError(1280), void p("GL_INVALID_ENUM in glGet" + t + "v: Unknown object returned from WebGL getParameter(" + e + ")! (error: " + r + ")")
                                }
                            }
                            break;
                        default:
                            return Ue.recordError(1280), void p("GL_INVALID_ENUM in glGet" + t + "v: Native code calling glGet" + t + "v(" + e + ") and it returns " + a + " of type " + typeof a + "!")
                    }
                }
                switch (t) {
                    case 1:
                        ar(r, n);
                        break;
                    case 0:
                        q[r >> 2] = n;
                        break;
                    case 2:
                        V[r >> 2] = n;
                        break;
                    case 4:
                        O[r >> 0] = n ? 1 : 0
                }
            } else Ue.recordError(1281)
        }

        function ur(e, r, t, n) {
            if (t) {
                var i, a = Or.getIndexedParameter(e, r);
                switch (typeof a) {
                    case "boolean":
                        i = a ? 1 : 0;
                        break;
                    case "number":
                        i = a;
                        break;
                    case "object":
                        if (null === a) switch (e) {
                            case 35983:
                            case 35368:
                                i = 0;
                                break;
                            default:
                                return void Ue.recordError(1280)
                        } else {
                            if (!(a instanceof WebGLBuffer)) return void Ue.recordError(1280);
                            i = 0 | a.name
                        }
                        break;
                    default:
                        return void Ue.recordError(1280)
                }
                switch (n) {
                    case 1:
                        ar(t, i);
                        break;
                    case 0:
                        q[t >> 2] = i;
                        break;
                    case 2:
                        V[t >> 2] = i;
                        break;
                    case 4:
                        O[t >> 0] = i ? 1 : 0;
                        break;
                    default:
                        throw "internal emscriptenWebGLGetIndexed() error, bad type: " + n
                }
            } else Ue.recordError(1281)
        }

        function sr(e) {
            var r = R(e) + 1,
                t = Zr(r);
            return B(e, t, r), t
        }

        function cr(e) {
            return parseInt(e)
        }

        function lr(e, r, t, n) {
            if (t) {
                var i = Or.getUniform(Ue.programs[e], Ue.uniforms[r]);
                if ("number" == typeof i || "boolean" == typeof i) switch (n) {
                    case 0:
                        q[t >> 2] = i;
                        break;
                    case 2:
                        V[t >> 2] = i;
                        break;
                    default:
                        throw "internal emscriptenWebGLGetUniform() error, bad type: " + n
                } else
                    for (var a = 0; a < i.length; a++) switch (n) {
                        case 0:
                            q[t + 4 * a >> 2] = i[a];
                            break;
                        case 2:
                            V[t + 4 * a >> 2] = i[a];
                            break;
                        default:
                            throw "internal emscriptenWebGLGetUniform() error, bad type: " + n
                    }
            } else Ue.recordError(1281)
        }

        function fr(e, r, t, n) {
            if (t) {
                var i = Or.getVertexAttrib(e, r);
                if (34975 == r) q[t >> 2] = i && i.name;
                else if ("number" == typeof i || "boolean" == typeof i) switch (n) {
                    case 0:
                        q[t >> 2] = i;
                        break;
                    case 2:
                        V[t >> 2] = i;
                        break;
                    case 5:
                        q[t >> 2] = Math.fround(i);
                        break;
                    default:
                        throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + n
                } else
                    for (var a = 0; a < i.length; a++) switch (n) {
                        case 0:
                            q[t + 4 * a >> 2] = i[a];
                            break;
                        case 2:
                            V[t + 4 * a >> 2] = i[a];
                            break;
                        case 5:
                            q[t + 4 * a >> 2] = Math.fround(i[a]);
                            break;
                        default:
                            throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + n
                    }
            } else Ue.recordError(1281)
        }

        function dr(e) {
            return 0 == (e -= 5120) ? O : 1 == e ? G : 2 == e ? j : 4 == e ? q : 6 == e ? V : 5 == e || 28922 == e || 28520 == e || 30779 == e || 30782 == e ? Q : z
        }

        function mr(e) {
            return 31 - Math.clz32(e.BYTES_PER_ELEMENT)
        }

        function pr(e, r, t, n, i, a) {
            var o = dr(e),
                u = mr(o),
                s = 1 << u,
                c = function(e, r, t, n) {
                    var i;
                    return r * (e * t + (i = n) - 1 & -i)
                }(t, n, function(e) {
                    return {
                        5: 3,
                        6: 4,
                        8: 2,
                        29502: 3,
                        29504: 4,
                        26917: 2,
                        26918: 2,
                        29846: 3,
                        29847: 4
                    } [e - 6402] || 1
                }(r) * s, Ue.unpackAlignment);
            return o.subarray(i >> u, i + c >> u)
        }

        function vr(e) {
            if (!e || !e.callee || !e.callee.name) return [null, "", ""];
            e.callee.toString();
            var r = e.callee.name,
                t = "(",
                n = !0;
            for (var i in e) {
                var a = e[i];
                n || (t += ", "), n = !1, t += "number" == typeof a || "string" == typeof a ? a : "(" + typeof a + ")"
            }
            t += ")";
            var o = e.callee.caller;
            return n && (t = ""), [e = o ? o.arguments : [], r, t]
        }

        function gr(e, r) {
            24 & e && (r = r.replace(/\s+$/, ""), r += (r.length > 0 ? "\n" : "") + function(e) {
                var r = Ee(),
                    t = r.lastIndexOf("_emscripten_log"),
                    n = r.lastIndexOf("_emscripten_get_callstack"),
                    i = r.indexOf("\n", Math.max(t, n)) + 1;
                r = r.slice(i), 8 & e && "undefined" == typeof emscripten_source_map && (h('Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'), e ^= 8, e |= 16);
                var a = null;
                if (128 & e)
                    for (a = vr(arguments); a[1].indexOf("_emscripten_") >= 0;) a = vr(a[0]);
                var o = r.split("\n");
                r = "";
                var u = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)"),
                    s = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?"),
                    c = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
                for (var l in o) {
                    var f = o[l],
                        d = "",
                        m = "",
                        p = 0,
                        v = 0,
                        g = c.exec(f);
                    if (g && 5 == g.length) d = g[1], m = g[2], p = g[3], v = g[4];
                    else {
                        if ((g = u.exec(f)) || (g = s.exec(f)), !(g && g.length >= 4)) {
                            r += f + "\n";
                            continue
                        }
                        d = g[1], m = g[2], p = g[3], v = 0 | g[4]
                    }
                    var _ = d;
                    _ || (_ = d);
                    var b = !1;
                    if (8 & e) {
                        var y = emscripten_source_map.originalPositionFor({
                            line: p,
                            column: v
                        });
                        (b = y && y.source) && (64 & e && (y.source = y.source.substring(y.source.replace(/\\/g, "/").lastIndexOf("/") + 1)), r += "    at " + _ + " (" + y.source + ":" + y.line + ":" + y.column + ")\n")
                    }(16 & e || !b) && (64 & e && (m = m.substring(m.replace(/\\/g, "/").lastIndexOf("/") + 1)), r += (b ? "     = " + d : "    at " + _) + " (" + m + ":" + p + ":" + v + ")\n"), 128 & e && a[0] && (a[1] == d && a[2].length > 0 && (r = r.replace(/\s+$/, ""), r += " with values: " + a[1] + a[2] + "\n"), a = vr(a[0]))
                }
                return r.replace(/\s+$/, "")
            }(e)), 1 & e ? 4 & e ? console.error(r) : 2 & e ? console.warn(r) : 512 & e ? console.info(r) : 256 & e ? console.debug(r) : console.log(r) : 6 & e ? p(r) : m(r)
        }
        var hr = 0;

        function _r(e) {
            try {
                return w.grow(e - U.byteLength + 65535 >>> 16), H(w.buffer), 1
            } catch (e) {}
        }

        function br(e, r, t, n, i, a, o) {
            Oe.focusEvent || (Oe.focusEvent = Zr(256));
            var u = {
                target: ze(e),
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(e) {
                    var t = e || event,
                        a = Oe.getNodeNameForTarget(t.target),
                        o = t.target.id ? t.target.id : "",
                        u = Oe.focusEvent;
                    B(a, u + 0, 128), B(o, u + 128, 128), mt(n, i, u, r) && t.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function yr(e, r, t, n, i, a, o) {
            Oe.fullscreenChangeEvent || (Oe.fullscreenChangeEvent = Zr(280));
            var u = {
                target: e,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(e) {
                    var t = e || event,
                        a = Oe.fullscreenChangeEvent;
                    Je(a), mt(n, i, a, r) && t.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function wr(e, r, t, n, i, a, o) {
            Oe.gamepadEvent || (Oe.gamepadEvent = Zr(1432));
            var u = {
                target: ze(e),
                allowsDeferredCalls: !0,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(e) {
                    var t = e || event,
                        a = Oe.gamepadEvent;
                    er(a, t.gamepad), mt(n, i, a, r) && t.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function Er(e, r, t, n, i, a, o) {
            Oe.keyEvent || (Oe.keyEvent = Zr(164));
            var u = {
                target: ze(e),
                allowsDeferredCalls: !0,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(e) {
                    var t = e || event,
                        a = Oe.keyEvent;
                    B(t.key ? t.key : "", a + 0, 32), B(t.code ? t.code : "", a + 32, 32), q[a + 64 >> 2] = t.location, q[a + 68 >> 2] = t.ctrlKey, q[a + 72 >> 2] = t.shiftKey, q[a + 76 >> 2] = t.altKey, q[a + 80 >> 2] = t.metaKey, q[a + 84 >> 2] = t.repeat, B(t.locale ? t.locale : "", a + 88, 32), B(t.char ? t.char : "", a + 120, 32), q[a + 152 >> 2] = t.charCode, q[a + 156 >> 2] = t.keyCode, q[a + 160 >> 2] = t.which, mt(n, i, a, r) && t.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function xr(e, r, t) {
            q[e >> 2] = r.screenX, q[e + 4 >> 2] = r.screenY, q[e + 8 >> 2] = r.clientX, q[e + 12 >> 2] = r.clientY, q[e + 16 >> 2] = r.ctrlKey, q[e + 20 >> 2] = r.shiftKey, q[e + 24 >> 2] = r.altKey, q[e + 28 >> 2] = r.metaKey, j[e + 32 >> 1] = r.button, j[e + 34 >> 1] = r.buttons;
            var n = r.movementX || r.screenX - Oe.previousScreenX,
                i = r.movementY || r.screenY - Oe.previousScreenY;
            q[e + 36 >> 2] = n, q[e + 40 >> 2] = i;
            var a = Ye(t);
            q[e + 44 >> 2] = r.clientX - a.left, q[e + 48 >> 2] = r.clientY - a.top, "wheel" !== r.type && "mousewheel" !== r.type && (Oe.previousScreenX = r.screenX, Oe.previousScreenY = r.screenY)
        }

        function kr(e, r, t, n, i, a, o) {
            Oe.mouseEvent || (Oe.mouseEvent = Zr(64));
            var u = {
                target: e = ze(e),
                allowsDeferredCalls: "mousemove" != a && "mouseenter" != a && "mouseleave" != a,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(t) {
                    var a = t || event;
                    xr(Oe.mouseEvent, a, e), mt(n, i, Oe.mouseEvent, r) && a.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function Cr(e, r, t, n, i, a, o) {
            Oe.pointerlockChangeEvent || (Oe.pointerlockChangeEvent = Zr(260));
            var u = {
                target: e,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(e) {
                    var t = e || event,
                        a = Oe.pointerlockChangeEvent;
                    ! function(e) {
                        var r = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement,
                            t = !!r;
                        q[e >> 2] = t;
                        var n = Oe.getNodeNameForTarget(r),
                            i = r && r.id ? r.id : "";
                        B(n, e + 4, 128), B(i, e + 132, 128)
                    }(a), mt(n, i, a, r) && t.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function Sr(e, r, t, n, i, a, o) {
            Oe.touchEvent || (Oe.touchEvent = Zr(1684));
            var u = {
                target: e = ze(e),
                allowsDeferredCalls: "touchstart" == a || "touchend" == a,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(t) {
                    for (var a = t || event, o = {}, u = 0; u < a.touches.length; ++u) {
                        (s = a.touches[u]).changed = !1, o[s.identifier] = s
                    }
                    for (u = 0; u < a.changedTouches.length; ++u) {
                        o[(s = a.changedTouches[u]).identifier] = s, s.changed = !0
                    }
                    for (u = 0; u < a.targetTouches.length; ++u) {
                        var s;
                        o[(s = a.targetTouches[u]).identifier].onTarget = !0
                    }
                    var c = Oe.touchEvent,
                        l = c;
                    q[l + 4 >> 2] = a.ctrlKey, q[l + 8 >> 2] = a.shiftKey, q[l + 12 >> 2] = a.altKey, q[l + 16 >> 2] = a.metaKey, l += 20;
                    var f = Ye(e),
                        d = 0;
                    for (var u in o) {
                        var m = o[u];
                        if (q[l >> 2] = m.identifier, q[l + 4 >> 2] = m.screenX, q[l + 8 >> 2] = m.screenY, q[l + 12 >> 2] = m.clientX, q[l + 16 >> 2] = m.clientY, q[l + 20 >> 2] = m.pageX, q[l + 24 >> 2] = m.pageY, q[l + 28 >> 2] = m.changed, q[l + 32 >> 2] = m.onTarget, q[l + 36 >> 2] = m.clientX - f.left, q[l + 40 >> 2] = m.clientY - f.top, l += 52, ++d >= 32) break
                    }
                    q[c >> 2] = d, mt(n, i, c, r) && a.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function Dr(e, r, t, n, i, a, o) {
            Oe.visibilityChangeEvent || (Oe.visibilityChangeEvent = Zr(8));
            var u = {
                target: e,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: function(e) {
                    var t, a, o = e || event,
                        u = Oe.visibilityChangeEvent;
                    t = u, a = ["hidden", "visible", "prerender", "unloaded"].indexOf(document.visibilityState), q[t >> 2] = document.hidden, q[t + 4 >> 2] = a, mt(n, i, u, r) && o.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }

        function Fr(e, r, t, n, i, a, o) {
            Oe.wheelEvent || (Oe.wheelEvent = Zr(96));
            var u = {
                target: e,
                allowsDeferredCalls: !0,
                eventTypeString: a,
                callbackfunc: n,
                handlerFunc: "wheel" == a ? function(t) {
                    var a = t || event,
                        o = Oe.wheelEvent;
                    xr(o, a, e), X[o + 64 >> 3] = a.deltaX, X[o + 72 >> 3] = a.deltaY, X[o + 80 >> 3] = a.deltaZ, q[o + 88 >> 2] = a.deltaMode, mt(n, i, o, r) && a.preventDefault()
                } : function(t) {
                    var a = t || event;
                    xr(Oe.wheelEvent, a, e), X[Oe.wheelEvent + 64 >> 3] = a.wheelDeltaX || 0;
                    var o = -(a.wheelDeltaY || a.wheelDelta);
                    X[Oe.wheelEvent + 72 >> 3] = o, X[Oe.wheelEvent + 80 >> 3] = 0, q[Oe.wheelEvent + 88 >> 2] = 0, mt(n, i, Oe.wheelEvent, r) && a.preventDefault()
                },
                useCapture: t
            };
            Oe.registerOrRemoveHandler(u)
        }
        var Ar = {
            xhrs: [],
            setu64: function(e, r) {
                Q[e >> 2] = r, Q[e + 4 >> 2] = r / 4294967296 | 0
            },
            openDatabase: function(e, r, t, n) {
                try {
                    var i = indexedDB.open(e, r)
                } catch (e) {
                    return n(e)
                }
                i.onupgradeneeded = function(e) {
                    var r = e.target.result;
                    r.objectStoreNames.contains("FILES") && r.deleteObjectStore("FILES"), r.createObjectStore("FILES")
                }, i.onsuccess = function(e) {
                    t(e.target.result)
                }, i.onerror = function(e) {
                    n(e)
                }
            },
            staticInit: function() {
                Ar.openDatabase("emscripten_filesystem", 1, (function(e) {
                    Ar.dbInstance = e, me()
                }), (function() {
                    Ar.dbInstance = !1, me()
                })), "undefined" != typeof ENVIRONMENT_IS_FETCH_WORKER && ENVIRONMENT_IS_FETCH_WORKER || de()
            }
        };

        function Pr(e, r, t, n, i) {
            var a = Q[e + 8 >> 2];
            if (a) {
                var o = L(a),
                    u = e + 112,
                    s = L(u);
                s || (s = "GET");
                Q[u + 32 >> 2];
                var c = Q[u + 52 >> 2],
                    l = Q[u + 56 >> 2],
                    f = !!Q[u + 60 >> 2],
                    d = (Q[u + 64 >> 2], Q[u + 68 >> 2]),
                    m = Q[u + 72 >> 2],
                    p = Q[u + 76 >> 2],
                    v = Q[u + 80 >> 2],
                    g = Q[u + 84 >> 2],
                    h = Q[u + 88 >> 2],
                    _ = !!(1 & c),
                    b = !!(2 & c),
                    y = !!(64 & c),
                    w = d ? L(d) : void 0,
                    E = m ? L(m) : void 0,
                    x = v ? L(v) : void 0,
                    k = new XMLHttpRequest;
                if (k.withCredentials = f, k.open(s, o, !y, w, E), y || (k.timeout = l), k.url_ = o, k.responseType = "arraybuffer", v && k.overrideMimeType(x), p)
                    for (;;) {
                        var C = Q[p >> 2];
                        if (!C) break;
                        var S = Q[p + 4 >> 2];
                        if (!S) break;
                        p += 8;
                        var D = L(C),
                            F = L(S);
                        k.setRequestHeader(D, F)
                    }
                Ar.xhrs.push(k);
                var A = Ar.xhrs.length;
                Q[e + 0 >> 2] = A;
                var P = g && h ? G.slice(g, g + h) : null;
                k.onload = function(n) {
                    var i = k.response ? k.response.byteLength : 0,
                        a = 0,
                        o = 0;
                    _ && !b && (a = Zr(o = i), G.set(new Uint8Array(k.response), a)), Q[e + 12 >> 2] = a, Ar.setu64(e + 16, o), Ar.setu64(e + 24, 0), i && Ar.setu64(e + 32, i), z[e + 40 >> 1] = k.readyState, 4 === k.readyState && 0 === k.status && (k.status = i > 0 ? 200 : 404), z[e + 42 >> 1] = k.status, k.statusText && B(k.statusText, e + 44, 64), k.status >= 200 && k.status < 300 ? r && r(e, k, n) : t && t(e, k, n)
                }, k.onerror = function(r) {
                    var n = k.status;
                    4 === k.readyState && 0 === n && (n = 404), Q[e + 12 >> 2] = 0, Ar.setu64(e + 16, 0), Ar.setu64(e + 24, 0), Ar.setu64(e + 32, 0), z[e + 40 >> 1] = k.readyState, z[e + 42 >> 1] = n, t && t(e, k, r)
                }, k.ontimeout = function(r) {
                    t && t(e, k, r)
                }, k.onprogress = function(r) {
                    var t = _ && b && k.response ? k.response.byteLength : 0,
                        i = 0;
                    _ && b && (i = Zr(t), G.set(new Uint8Array(k.response), i)), Q[e + 12 >> 2] = i, Ar.setu64(e + 16, t), Ar.setu64(e + 24, r.loaded - t), Ar.setu64(e + 32, r.total), z[e + 40 >> 1] = k.readyState, k.readyState >= 3 && 0 === k.status && r.loaded > 0 && (k.status = 200), z[e + 42 >> 1] = k.status, k.statusText && B(k.statusText, e + 44, 64), n && n(e, k, r)
                }, k.onreadystatechange = function(r) {
                    z[e + 40 >> 1] = k.readyState, k.readyState >= 2 && (z[e + 42 >> 1] = k.status), i && i(e, k, r)
                };
                try {
                    k.send(P)
                } catch (r) {
                    t && t(e, k, r)
                }
            } else t(e, 0, "no url specified!")
        }

        function Tr(e, r, t, n, i) {
            if (e) {
                var a = Q[r + 112 + 64 >> 2];
                a || (a = Q[r + 8 >> 2]);
                var o = L(a);
                try {
                    var u = e.transaction(["FILES"], "readwrite").objectStore("FILES").put(t, o);
                    u.onsuccess = function(e) {
                        z[r + 40 >> 1] = 4, z[r + 42 >> 1] = 200, B("OK", r + 44, 64), n(r, 0, o)
                    }, u.onerror = function(e) {
                        z[r + 40 >> 1] = 4, z[r + 42 >> 1] = 413, B("Payload Too Large", r + 44, 64), i(r, 0, e)
                    }
                } catch (e) {
                    i(r, 0, e)
                }
            } else i(r, 0, "IndexedDB not available!")
        }
        var Lr = {};

        function Ir() {
            if (!Ir.strings) {
                var e = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                    _: l || "./this.program"
                };
                for (var r in Lr) e[r] = Lr[r];
                var t = [];
                for (var r in e) t.push(r + "=" + e[r]);
                Ir.strings = t
            }
            return Ir.strings
        }
        var Br = (B("GMT", 1052560, 4), 1052560);

        function Rr() {
            if (!Rr.called) {
                Rr.called = !0, q[tt() >> 2] = 60 * (new Date).getTimezoneOffset();
                var e = (new Date).getFullYear(),
                    r = new Date(e, 0, 1),
                    t = new Date(e, 6, 1);
                q[rt() >> 2] = Number(r.getTimezoneOffset() != t.getTimezoneOffset());
                var n = u(r),
                    i = u(t),
                    a = M(n),
                    o = M(i);
                t.getTimezoneOffset() < r.getTimezoneOffset() ? (q[et() >> 2] = a, q[et() + 4 >> 2] = o) : (q[et() >> 2] = o, q[et() + 4 >> 2] = a)
            }

            function u(e) {
                var r = e.toTimeString().match(/\(([A-Za-z ]+)\)$/);
                return r ? r[1] : "GMT"
            }
        }

        function Mr(e, r) {
            Rr();
            var t = new Date(1e3 * q[e >> 2]);
            q[r >> 2] = t.getSeconds(), q[r + 4 >> 2] = t.getMinutes(), q[r + 8 >> 2] = t.getHours(), q[r + 12 >> 2] = t.getDate(), q[r + 16 >> 2] = t.getMonth(), q[r + 20 >> 2] = t.getFullYear() - 1900, q[r + 24 >> 2] = t.getDay();
            var n = new Date(t.getFullYear(), 0, 1),
                i = (t.getTime() - n.getTime()) / 864e5 | 0;
            q[r + 28 >> 2] = i, q[r + 36 >> 2] = -60 * t.getTimezoneOffset();
            var a = new Date(t.getFullYear(), 6, 1).getTimezoneOffset(),
                o = n.getTimezoneOffset(),
                u = 0 | (a != o && t.getTimezoneOffset() == Math.min(o, a));
            q[r + 32 >> 2] = u;
            var s = q[et() + (u ? 4 : 0) >> 2];
            return q[r + 40 >> 2] = s, r
        }

        function Nr(e) {
            for (var r = ke(); ke() - r < e / 1e3;);
        }

        function Ur(e, r) {
            Ur.array || (Ur.array = []);
            var t, n = Ur.array;
            for (n.length = 0; t = G[e++];) 100 === t || 102 === t ? (r = r + 7 & -8, n.push(X[r >> 3]), r += 8) : (r = r + 3 & -4, n.push(q[r >> 2]), r += 4);
            return n
        }
        var Or, Gr = function(e, r, t, n) {
                e || (e = this), this.parent = e, this.mount = e.mount, this.mounted = null, this.id = Pe.nextInode++, this.name = r, this.mode = t, this.node_ops = {}, this.stream_ops = {}, this.rdev = n
            },
            jr = 365,
            zr = 146;
        Object.defineProperties(Gr.prototype, {
            read: {
                get: function() {
                    return (this.mode & jr) === jr
                },
                set: function(e) {
                    e ? this.mode |= jr : this.mode &= -366
                }
            },
            write: {
                get: function() {
                    return (this.mode & zr) === zr
                },
                set: function(e) {
                    e ? this.mode |= zr : this.mode &= -147
                }
            },
            isFolder: {
                get: function() {
                    return Pe.isDir(this.mode)
                }
            },
            isDevice: {
                get: function() {
                    return Pe.isChrdev(this.mode)
                }
            }
        }), Pe.FSNode = Gr, Pe.staticInit(), r.FS_createFolder = Pe.createFolder, r.FS_createPath = Pe.createPath, r.FS_createDataFile = Pe.createDataFile, r.FS_createPreloadedFile = Pe.createPreloadedFile, r.FS_createLazyFile = Pe.createLazyFile, r.FS_createLink = Pe.createLink, r.FS_createDevice = Pe.createDevice, r.FS_unlink = Pe.unlink, r.requestFullscreen = function(e, r) {
            Be.requestFullscreen(e, r)
        }, r.requestAnimationFrame = function(e) {
            Be.requestAnimationFrame(e)
        }, r.setCanvasSize = function(e, r, t) {
            Be.setCanvasSize(e, r, t)
        }, r.pauseMainLoop = function() {
            Be.mainLoop.pause()
        }, r.resumeMainLoop = function() {
            Be.mainLoop.resume()
        }, r.getUserMedia = function() {
            Be.getUserMedia()
        }, r.createContext = function(e, r, t, n) {
            return Be.createContext(e, r, t, n)
        }, Ue.init();
        for (var qr = 0; qr < 32; qr++) tr.push(new Array(qr));
        Ar.staticInit();

        function Qr(e, r, t) {
            var n = t > 0 ? t : R(e) + 1,
                i = new Array(n),
                a = I(e, i, 0, i.length);
            return r && (i.length = a), i
        }
        var Vr = {
                __cxa_atexit: function(e, r) {
                    return t = e, n = r, void ee.unshift({
                        func: t,
                        arg: n
                    });
                    var t, n
                },
                __sys_fcntl64: function(e, r, t) {
                    Te.varargs = t;
                    try {
                        var n = Te.getStreamFromFD(e);
                        switch (r) {
                            case 0:
                                return (i = Te.get()) < 0 ? -28 : Pe.open(n.path, n.flags, 0, i).fd;
                            case 1:
                            case 2:
                                return 0;
                            case 3:
                                return n.flags;
                            case 4:
                                var i = Te.get();
                                return n.flags |= i, 0;
                            case 12:
                                i = Te.get();
                                return j[i + 0 >> 1] = 2, 0;
                            case 13:
                            case 14:
                                return 0;
                            case 16:
                            case 8:
                                return -28;
                            case 9:
                                return xe(28), -1;
                            default:
                                return -28
                        }
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), -e.errno
                    }
                },
                __sys_fstat64: function(e, r) {
                    try {
                        var t = Te.getStreamFromFD(e);
                        return Te.doStat(Pe.stat, t.path, r)
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), -e.errno
                    }
                },
                __sys_ioctl: function(e, r, t) {
                    Te.varargs = t;
                    try {
                        var n = Te.getStreamFromFD(e);
                        switch (r) {
                            case 21509:
                            case 21505:
                                return n.tty ? 0 : -59;
                            case 21510:
                            case 21511:
                            case 21512:
                            case 21506:
                            case 21507:
                            case 21508:
                                return n.tty ? 0 : -59;
                            case 21519:
                                if (!n.tty) return -59;
                                var i = Te.get();
                                return q[i >> 2] = 0, 0;
                            case 21520:
                                return n.tty ? -28 : -59;
                            case 21531:
                                i = Te.get();
                                return Pe.ioctl(n, r, i);
                            case 21523:
                            case 21524:
                                return n.tty ? 0 : -59;
                            default:
                                pe("bad ioctl syscall " + r)
                        }
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), -e.errno
                    }
                },
                __sys_open: function(e, r, t) {
                    Te.varargs = t;
                    try {
                        var n = Te.getStr(e),
                            i = Te.get();
                        return Pe.open(n, r, i).fd
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), -e.errno
                    }
                },
                __sys_stat64: function(e, r) {
                    try {
                        return e = Te.getStr(e), Te.doStat(Pe.stat, e, r)
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), -e.errno
                    }
                },
                _emscripten_fetch_free: function(e) {
                    delete Ar.xhrs[e - 1]
                },
                abort: function() {
                    pe()
                },
                alBufferData: function(e, r, t, n, i) {
                    if (Re.currentCtx) {
                        var a = Re.buffers[e];
                        if (a)
                            if (i <= 0) Re.currentCtx.err = 40963;
                            else {
                                var o = null;
                                try {
                                    switch (r) {
                                        case 4352:
                                            if (n > 0)
                                                for (var u = (o = Re.currentCtx.audioCtx.createBuffer(1, n, i)).getChannelData(0), s = 0; s < n; ++s) u[s] = .0078125 * G[t++] - 1;
                                            a.bytesPerSample = 1, a.channels = 1, a.length = n;
                                            break;
                                        case 4353:
                                            if (n > 0) {
                                                u = (o = Re.currentCtx.audioCtx.createBuffer(1, n >> 1, i)).getChannelData(0);
                                                t >>= 1;
                                                for (s = 0; s < n >> 1; ++s) u[s] = 30517578125e-15 * j[t++]
                                            }
                                            a.bytesPerSample = 2, a.channels = 1, a.length = n >> 1;
                                            break;
                                        case 4354:
                                            if (n > 0) {
                                                u = (o = Re.currentCtx.audioCtx.createBuffer(2, n >> 1, i)).getChannelData(0);
                                                var c = o.getChannelData(1);
                                                for (s = 0; s < n >> 1; ++s) u[s] = .0078125 * G[t++] - 1, c[s] = .0078125 * G[t++] - 1
                                            }
                                            a.bytesPerSample = 1, a.channels = 2, a.length = n >> 1;
                                            break;
                                        case 4355:
                                            if (n > 0) {
                                                u = (o = Re.currentCtx.audioCtx.createBuffer(2, n >> 2, i)).getChannelData(0), c = o.getChannelData(1);
                                                t >>= 1;
                                                for (s = 0; s < n >> 2; ++s) u[s] = 30517578125e-15 * j[t++], c[s] = 30517578125e-15 * j[t++]
                                            }
                                            a.bytesPerSample = 2, a.channels = 2, a.length = n >> 2;
                                            break;
                                        case 65552:
                                            if (n > 0) {
                                                u = (o = Re.currentCtx.audioCtx.createBuffer(1, n >> 2, i)).getChannelData(0);
                                                t >>= 2;
                                                for (s = 0; s < n >> 2; ++s) u[s] = V[t++]
                                            }
                                            a.bytesPerSample = 4, a.channels = 1, a.length = n >> 2;
                                            break;
                                        case 65553:
                                            if (n > 0) {
                                                u = (o = Re.currentCtx.audioCtx.createBuffer(2, n >> 3, i)).getChannelData(0), c = o.getChannelData(1);
                                                t >>= 2;
                                                for (s = 0; s < n >> 3; ++s) u[s] = V[t++], c[s] = V[t++]
                                            }
                                            a.bytesPerSample = 4, a.channels = 2, a.length = n >> 3;
                                            break;
                                        default:
                                            return void(Re.currentCtx.err = 40963)
                                    }
                                    a.frequency = i, a.audioBuf = o
                                } catch (e) {
                                    return void(Re.currentCtx.err = 40963)
                                }
                            }
                        else Re.currentCtx.err = 40963
                    }
                },
                alDeleteBuffers: function(e, r) {
                    if (Re.currentCtx) {
                        for (var t = 0; t < e; ++t) {
                            if (0 !== (n = q[r + 4 * t >> 2])) {
                                if (!Re.buffers[n]) return void(Re.currentCtx.err = 40961);
                                if (Re.buffers[n].refCount) return void(Re.currentCtx.err = 40964)
                            }
                        }
                        for (t = 0; t < e; ++t) {
                            var n;
                            0 !== (n = q[r + 4 * t >> 2]) && (Re.deviceRefCounts[Re.buffers[n].deviceId]--, delete Re.buffers[n], Re.freeIds.push(n))
                        }
                    }
                },
                alDeleteSources: function(e, r) {
                    if (Re.currentCtx) {
                        for (var t = 0; t < e; ++t) {
                            var n = q[r + 4 * t >> 2];
                            if (!Re.currentCtx.sources[n]) return void(Re.currentCtx.err = 40961)
                        }
                        for (t = 0; t < e; ++t) {
                            n = q[r + 4 * t >> 2];
                            Re.setSourceState(Re.currentCtx.sources[n], 4116), Me(n, 4105, 0), delete Re.currentCtx.sources[n], Re.freeIds.push(n)
                        }
                    }
                },
                alGenBuffers: function(e, r) {
                    if (Re.currentCtx)
                        for (var t = 0; t < e; ++t) {
                            var n = {
                                deviceId: Re.currentCtx.deviceId,
                                id: Re.newId(),
                                refCount: 0,
                                audioBuf: null,
                                frequency: 0,
                                bytesPerSample: 2,
                                channels: 1,
                                length: 0
                            };
                            Re.deviceRefCounts[n.deviceId]++, Re.buffers[n.id] = n, q[r + 4 * t >> 2] = n.id
                        }
                },
                alGenSources: function(e, r) {
                    if (Re.currentCtx)
                        for (var t = 0; t < e; ++t) {
                            var n = Re.currentCtx.audioCtx.createGain();
                            n.connect(Re.currentCtx.gain);
                            var i = {
                                context: Re.currentCtx,
                                id: Re.newId(),
                                type: 4144,
                                state: 4113,
                                bufQueue: [Re.buffers[0]],
                                audioQueue: [],
                                looping: !1,
                                pitch: 1,
                                dopplerShift: 1,
                                gain: n,
                                minGain: 0,
                                maxGain: 1,
                                panner: null,
                                bufsProcessed: 0,
                                bufStartTime: Number.NEGATIVE_INFINITY,
                                bufOffset: 0,
                                relative: !1,
                                refDistance: 1,
                                maxDistance: 340282e33,
                                rolloffFactor: 1,
                                position: [0, 0, 0],
                                velocity: [0, 0, 0],
                                direction: [0, 0, 0],
                                coneOuterGain: 0,
                                coneInnerAngle: 360,
                                coneOuterAngle: 360,
                                distanceModel: 53250,
                                spatialize: 2,
                                get playbackRate() {
                                    return this.pitch * this.dopplerShift
                                }
                            };
                            Re.currentCtx.sources[i.id] = i, q[r + 4 * t >> 2] = i.id
                        }
                },
                alGetSourcei: function(e, r, t) {
                    var n = Re.getSourceParam("alGetSourcei", e, r);
                    if (null !== n)
                        if (t) switch (r) {
                            case 514:
                            case 4097:
                            case 4098:
                            case 4103:
                            case 4105:
                            case 4112:
                            case 4117:
                            case 4118:
                            case 4128:
                            case 4129:
                            case 4131:
                            case 4132:
                            case 4133:
                            case 4134:
                            case 4135:
                            case 4628:
                            case 8201:
                            case 8202:
                            case 53248:
                                q[t >> 2] = n;
                                break;
                            default:
                                return void(Re.currentCtx.err = 40962)
                        } else Re.currentCtx.err = 40963
                },
                alSource3i: function(e, r, t, n, i) {
                    switch (r) {
                        case 4100:
                        case 4101:
                        case 4102:
                            Re.paramArray[0] = t, Re.paramArray[1] = n, Re.paramArray[2] = i, Re.setSourceParam("alSource3i", e, r, Re.paramArray);
                            break;
                        default:
                            Re.setSourceParam("alSource3i", e, r, null)
                    }
                },
                alSourcePlay: function(e) {
                    if (Re.currentCtx) {
                        var r = Re.currentCtx.sources[e];
                        r ? Re.setSourceState(r, 4114) : Re.currentCtx.err = 40961
                    }
                },
                alSourceQueueBuffers: function(e, r, t) {
                    if (Re.currentCtx) {
                        var n = Re.currentCtx.sources[e];
                        if (n)
                            if (4136 !== n.type) {
                                if (0 !== r) {
                                    for (var i = Re.buffers[0], a = 0; a < n.bufQueue.length; a++)
                                        if (0 !== n.bufQueue[a].id) {
                                            i = n.bufQueue[a];
                                            break
                                        } for (a = 0; a < r; ++a) {
                                        var o = q[t + 4 * a >> 2];
                                        if (!(u = Re.buffers[o])) return void(Re.currentCtx.err = 40961);
                                        0 === i.id || u.frequency === i.frequency && u.bytesPerSample === i.bytesPerSample && u.channels === i.channels || (Re.currentCtx.err = 40964)
                                    }
                                    1 === n.bufQueue.length && 0 === n.bufQueue[0].id && (n.bufQueue.length = 0), n.type = 4137;
                                    for (a = 0; a < r; ++a) {
                                        var u;
                                        o = q[t + 4 * a >> 2];
                                        (u = Re.buffers[o]).refCount++, n.bufQueue.push(u)
                                    }
                                    n.looping && Re.cancelPendingSourceAudio(n), Re.initSourcePanner(n), Re.scheduleSourceAudio(n)
                                }
                            } else Re.currentCtx.err = 40964;
                        else Re.currentCtx.err = 40961
                    }
                },
                alSourceStop: function(e) {
                    if (Re.currentCtx) {
                        var r = Re.currentCtx.sources[e];
                        r ? Re.setSourceState(r, 4116) : Re.currentCtx.err = 40961
                    }
                },
                alSourceUnqueueBuffers: function(e, r, t) {
                    if (Re.currentCtx) {
                        var n = Re.currentCtx.sources[e];
                        if (n) {
                            if (r > (1 === n.bufQueue.length && 0 === n.bufQueue[0].id ? 0 : n.bufsProcessed)) Re.currentCtx.err = 40963;
                            else if (0 !== r) {
                                for (var i = 0; i < r; i++) {
                                    var a = n.bufQueue.shift();
                                    a.refCount--, q[t + 4 * i >> 2] = a.id, n.bufsProcessed--
                                }
                                0 === n.bufQueue.length && n.bufQueue.push(Re.buffers[0]), Re.initSourcePanner(n), Re.scheduleSourceAudio(n)
                            }
                        } else Re.currentCtx.err = 40961
                    }
                },
                alSourcef: function(e, r, t) {
                    switch (r) {
                        case 4097:
                        case 4098:
                        case 4099:
                        case 4106:
                        case 4109:
                        case 4110:
                        case 4128:
                        case 4129:
                        case 4130:
                        case 4131:
                        case 4132:
                        case 4133:
                        case 4134:
                        case 8203:
                            Re.setSourceParam("alSourcef", e, r, t);
                            break;
                        default:
                            Re.setSourceParam("alSourcef", e, r, null)
                    }
                },
                alSourcei: Me,
                alcCloseDevice: function(e) {
                    return !(e in Re.deviceRefCounts) || Re.deviceRefCounts[e] > 0 ? 0 : (delete Re.deviceRefCounts[e], Re.freeIds.push(e), 1)
                },
                alcCreateContext: function(e, t) {
                    if (!(e in Re.deviceRefCounts)) return Re.alcErr = 40961, 0;
                    var n = null,
                        i = [],
                        a = null;
                    if (t >>= 2)
                        for (var o = 0, u = 0; o = q[t++], i.push(o), 0 !== o;) switch (u = q[t++], i.push(u), o) {
                            case 4103:
                                n || (n = {}), n.sampleRate = u;
                                break;
                            case 4112:
                            case 4113:
                                break;
                            case 6546:
                                switch (u) {
                                    case 0:
                                        a = !1;
                                        break;
                                    case 1:
                                        a = !0;
                                        break;
                                    case 2:
                                        break;
                                    default:
                                        return Re.alcErr = 40964, 0
                                }
                                break;
                            case 6550:
                                if (0 !== u) return Re.alcErr = 40964, 0;
                                break;
                            default:
                                return Re.alcErr = 40964, 0
                        }
                    var s = window.AudioContext || window.webkitAudioContext,
                        c = null;
                    try {
                        c = n ? new s(n) : new s
                    } catch (e) {
                        return "NotSupportedError" === e.name ? Re.alcErr = 40964 : Re.alcErr = 40961, 0
                    }! function(e, t) {
                        t || (t = [document, r.canvas]), ["keydown", "mousedown", "touchstart"].forEach((function(r) {
                            t.forEach((function(t) {
                                t && function(e, r, t) {
                                    e.addEventListener(r, t, {
                                        once: !0
                                    })
                                }(t, r, (function() {
                                    "suspended" === e.state && e.resume().then((() => {}))
                                }))
                            }))
                        }))
                    }(c), void 0 === c.createGain && (c.createGain = c.createGainNode);
                    var l = c.createGain();
                    l.connect(c.destination);
                    var f = {
                        deviceId: e,
                        id: Re.newId(),
                        attrs: i,
                        audioCtx: c,
                        listener: {
                            position: [0, 0, 0],
                            velocity: [0, 0, 0],
                            direction: [0, 0, 0],
                            up: [0, 0, 0]
                        },
                        sources: [],
                        interval: setInterval((function() {
                            Re.scheduleContextAudio(f)
                        }), Re.QUEUE_INTERVAL),
                        gain: l,
                        distanceModel: 53250,
                        speedOfSound: 343.3,
                        dopplerFactor: 1,
                        sourceDistanceModel: !1,
                        hrtf: a || !1,
                        _err: 0,
                        get err() {
                            return this._err
                        },
                        set err(e) {
                            0 !== this._err && 0 !== e || (this._err = e)
                        }
                    };
                    if (Re.deviceRefCounts[e]++, Re.contexts[f.id] = f, null !== a)
                        for (var d in Re.contexts) {
                            var m = Re.contexts[d];
                            m.deviceId === e && (m.hrtf = a, Re.updateContextGlobal(m))
                        }
                    return f.id
                },
                alcDestroyContext: function(e) {
                    var r = Re.contexts[e];
                    Re.currentCtx !== r ? (Re.contexts[e].interval && clearInterval(Re.contexts[e].interval), Re.deviceRefCounts[r.deviceId]--, delete Re.contexts[e], Re.freeIds.push(e)) : Re.alcErr = 40962
                },
                alcGetIntegerv: function(e, r, t, n) {
                    if (0 !== t && n) switch (r) {
                        case 4096:
                        case 4097:
                            q[n >> 2] = 1;
                            break;
                        case 4098:
                            if (!(e in Re.deviceRefCounts)) return void(Re.alcErr = 40961);
                            if (!Re.currentCtx) return void(Re.alcErr = 40962);
                            q[n >> 2] = Re.currentCtx.attrs.length;
                            break;
                        case 4099:
                            if (!(e in Re.deviceRefCounts)) return void(Re.alcErr = 40961);
                            if (!Re.currentCtx) return void(Re.alcErr = 40962);
                            for (var i = 0; i < Re.currentCtx.attrs.length; i++) q[n + 4 * i >> 2] = Re.currentCtx.attrs[i];
                            break;
                        case 4103:
                            if (!(e in Re.deviceRefCounts)) return void(Re.alcErr = 40961);
                            if (!Re.currentCtx) return void(Re.alcErr = 40962);
                            q[n >> 2] = Re.currentCtx.audioCtx.sampleRate;
                            break;
                        case 4112:
                        case 4113:
                            if (!(e in Re.deviceRefCounts)) return void(Re.alcErr = 40961);
                            if (!Re.currentCtx) return void(Re.alcErr = 40962);
                            q[n >> 2] = 2147483647;
                            break;
                        case 6546:
                        case 6547:
                            if (!(e in Re.deviceRefCounts)) return void(Re.alcErr = 40961);
                            var a = 0;
                            for (var o in Re.contexts) {
                                var u = Re.contexts[o];
                                u.deviceId === e && (a = u.hrtf ? 1 : 0)
                            }
                            q[n >> 2] = a;
                            break;
                        case 6548:
                            if (!(e in Re.deviceRefCounts)) return void(Re.alcErr = 40961);
                            q[n >> 2] = 1;
                            break;
                        case 131075:
                            if (!(e in Re.deviceRefCounts)) return void(Re.alcErr = 40961);
                            if (!Re.currentCtx) return void(Re.alcErr = 40962);
                            q[n >> 2] = 1;
                        case 786:
                            var s = Re.requireValidCaptureDevice(e, "alcGetIntegerv");
                            if (!s) return;
                            var c = s.capturedFrameCount,
                                l = s.requestedSampleRate,
                                f = s.audioCtx.sampleRate,
                                d = Math.floor(c * (l / f));
                            q[n >> 2] = d;
                            break;
                        default:
                            return void(Re.alcErr = 40963)
                    }
                },
                alcMakeContextCurrent: function(e) {
                    return 0 === e ? (Re.currentCtx = null, 0) : (Re.currentCtx = Re.contexts[e], 1)
                },
                alcOpenDevice: function(e) {
                    if (e && L(e) !== Re.DEVICE_NAME) return 0;
                    if ("undefined" != typeof AudioContext || "undefined" != typeof webkitAudioContext) {
                        var r = Re.newId();
                        return Re.deviceRefCounts[r] = 0, r
                    }
                    return 0
                },
                changeCursor: function(e) {
                    const t = r.canvas;
                    t && (t.style.cursor = L(e))
                },
                clock_gettime: function(e, r) {
                    var t;
                    if (0 === e) t = Date.now();
                    else {
                        if (1 !== e && 4 !== e) return xe(28), -1;
                        t = ke()
                    }
                    return q[r >> 2] = t / 1e3 | 0, q[r + 4 >> 2] = t % 1e3 * 1e3 * 1e3 | 0, 0
                },
                dlclose: function(e) {
                    pe("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking")
                },
                eglBindAPI: function(e) {
                    return 12448 == e ? (Ne.setErrorCode(12288), 1) : (Ne.setErrorCode(12300), 0)
                },
                eglChooseConfig: function(e, r, t, n, i) {
                    return Ne.chooseConfig(e, r, t, n, i)
                },
                eglCreateContext: function(e, t, n, i) {
                    if (62e3 != e) return Ne.setErrorCode(12296), 0;
                    for (var a = 1;;) {
                        var o = q[i >> 2];
                        if (12440 != o) {
                            if (12344 == o) break;
                            return Ne.setErrorCode(12292), 0
                        }
                        a = q[i + 4 >> 2], i += 8
                    }
                    return a < 2 || a > 3 ? (Ne.setErrorCode(12293), 0) : (Ne.contextAttributes.majorVersion = a - 1, Ne.contextAttributes.minorVersion = 0, Ne.context = Ue.createContext(r.canvas, Ne.contextAttributes), 0 != Ne.context ? (Ne.setErrorCode(12288), Ue.makeContextCurrent(Ne.context), r.useWebGL = !0, Be.moduleContextCreatedCallbacks.forEach((function(e) {
                        e()
                    })), Ue.makeContextCurrent(null), 62004) : (Ne.setErrorCode(12297), 0))
                },
                eglCreateWindowSurface: function(e, r, t, n) {
                    return 62e3 != e ? (Ne.setErrorCode(12296), 0) : 62002 != r ? (Ne.setErrorCode(12293), 0) : (Ne.setErrorCode(12288), 62006)
                },
                eglDestroyContext: function(e, r) {
                    return 62e3 != e ? (Ne.setErrorCode(12296), 0) : 62004 != r ? (Ne.setErrorCode(12294), 0) : (Ue.deleteContext(Ne.context), Ne.setErrorCode(12288), Ne.currentContext == r && (Ne.currentContext = 0), 1)
                },
                eglDestroySurface: function(e, r) {
                    return 62e3 != e ? (Ne.setErrorCode(12296), 0) : 62006 != r ? (Ne.setErrorCode(12301), 1) : (Ne.currentReadSurface == r && (Ne.currentReadSurface = 0), Ne.currentDrawSurface == r && (Ne.currentDrawSurface = 0), Ne.setErrorCode(12288), 1)
                },
                eglGetConfigAttrib: function(e, r, t, n) {
                    if (62e3 != e) return Ne.setErrorCode(12296), 0;
                    if (62002 != r) return Ne.setErrorCode(12293), 0;
                    if (!n) return Ne.setErrorCode(12300), 0;
                    switch (Ne.setErrorCode(12288), t) {
                        case 12320:
                            return q[n >> 2] = Ne.contextAttributes.alpha ? 32 : 24, 1;
                        case 12321:
                            return q[n >> 2] = Ne.contextAttributes.alpha ? 8 : 0, 1;
                        case 12322:
                        case 12323:
                        case 12324:
                            return q[n >> 2] = 8, 1;
                        case 12325:
                            return q[n >> 2] = Ne.contextAttributes.depth ? 24 : 0, 1;
                        case 12326:
                            return q[n >> 2] = Ne.contextAttributes.stencil ? 8 : 0, 1;
                        case 12327:
                            return q[n >> 2] = 12344, 1;
                        case 12328:
                            return q[n >> 2] = 62002, 1;
                        case 12329:
                            return q[n >> 2] = 0, 1;
                        case 12330:
                            return q[n >> 2] = 4096, 1;
                        case 12331:
                            return q[n >> 2] = 16777216, 1;
                        case 12332:
                            return q[n >> 2] = 4096, 1;
                        case 12333:
                        case 12334:
                            return q[n >> 2] = 0, 1;
                        case 12335:
                            return q[n >> 2] = 12344, 1;
                        case 12337:
                            return q[n >> 2] = Ne.contextAttributes.antialias ? 4 : 0, 1;
                        case 12338:
                            return q[n >> 2] = Ne.contextAttributes.antialias ? 1 : 0, 1;
                        case 12339:
                            return q[n >> 2] = 4, 1;
                        case 12340:
                            return q[n >> 2] = 12344, 1;
                        case 12341:
                        case 12342:
                        case 12343:
                            return q[n >> 2] = -1, 1;
                        case 12345:
                        case 12346:
                        case 12347:
                            return q[n >> 2] = 0, 1;
                        case 12348:
                            return q[n >> 2] = 1, 1;
                        case 12349:
                        case 12350:
                            return q[n >> 2] = 0, 1;
                        case 12351:
                            return q[n >> 2] = 12430, 1;
                        case 12352:
                            return q[n >> 2] = 4, 1;
                        case 12354:
                            return q[n >> 2] = 0, 1;
                        default:
                            return Ne.setErrorCode(12292), 0
                    }
                },
                eglGetDisplay: function(e) {
                    return Ne.setErrorCode(12288), 62e3
                },
                eglGetError: function() {
                    return Ne.errorCode
                },
                eglGetProcAddress: function(e) {
                    return Jr(e)
                },
                eglInitialize: function(e, r, t) {
                    return 62e3 == e ? (r && (q[r >> 2] = 1), t && (q[t >> 2] = 4), Ne.defaultDisplayInitialized = !0, Ne.setErrorCode(12288), 1) : (Ne.setErrorCode(12296), 0)
                },
                eglMakeCurrent: function(e, r, t, n) {
                    return 62e3 != e ? (Ne.setErrorCode(12296), 0) : 0 != n && 62004 != n ? (Ne.setErrorCode(12294), 0) : 0 != t && 62006 != t || 0 != r && 62006 != r ? (Ne.setErrorCode(12301), 0) : (Ue.makeContextCurrent(n ? Ne.context : null), Ne.currentContext = n, Ne.currentDrawSurface = r, Ne.currentReadSurface = t, Ne.setErrorCode(12288), 1)
                },
                eglQueryString: function(e, r) {
                    if (62e3 != e) return Ne.setErrorCode(12296), 0;
                    if (Ne.setErrorCode(12288), Ne.stringCache[r]) return Ne.stringCache[r];
                    var t;
                    switch (r) {
                        case 12371:
                            t = M("Emscripten");
                            break;
                        case 12372:
                            t = M("1.4 Emscripten EGL");
                            break;
                        case 12373:
                            t = M("");
                            break;
                        case 12429:
                            t = M("OpenGL_ES");
                            break;
                        default:
                            return Ne.setErrorCode(12300), 0
                    }
                    return Ne.stringCache[r] = t, t
                },
                eglSwapBuffers: function() {
                    if (Ne.defaultDisplayInitialized)
                        if (r.ctx) {
                            if (!r.ctx.isContextLost()) return Ne.setErrorCode(12288), 1;
                            Ne.setErrorCode(12302)
                        } else Ne.setErrorCode(12290);
                    else Ne.setErrorCode(12289);
                    return 0
                },
                eglSwapInterval: function(e, r) {
                    return 62e3 != e ? (Ne.setErrorCode(12296), 0) : (0 == r ? Le(0, 0) : Le(1, r), Ne.setErrorCode(12288), 1)
                },
                eglTerminate: function(e) {
                    return 62e3 != e ? (Ne.setErrorCode(12296), 0) : (Ne.currentContext = 0, Ne.currentReadSurface = 0, Ne.currentDrawSurface = 0, Ne.defaultDisplayInitialized = !1, Ne.setErrorCode(12288), 1)
                },
                eglWaitGL: function() {
                    return Ne.setErrorCode(12288), 1
                },
                eglWaitNative: function(e) {
                    return Ne.setErrorCode(12288), 1
                },
                emscripten_asm_const_iii: function(e, r, t) {
                    var n = Ur(r, t);
                    return we[e].apply(null, n)
                },
                emscripten_cancel_main_loop: function() {
                    Be.mainLoop.pause(), Be.mainLoop.func = null
                },
                emscripten_exit_fullscreen: function() {
                    if (!Oe.fullscreenEnabled()) return -1;
                    Oe.removeDeferredCalls(Ke);
                    var e = je[1];
                    if (e.exitFullscreen) e.fullscreenElement && e.exitFullscreen();
                    else {
                        if (!e.webkitExitFullscreen) return -1;
                        e.webkitFullscreenElement && e.webkitExitFullscreen()
                    }
                    return 0
                },
                emscripten_exit_pointerlock: function() {
                    if (Oe.removeDeferredCalls($e), document.exitPointerLock) document.exitPointerLock();
                    else {
                        if (!document.msExitPointerLock) return -1;
                        document.msExitPointerLock()
                    }
                    return 0
                },
                emscripten_get_canvas_element_id: function(e) {
                    const t = document && document.location || null,
                        n = t && t.origin || "unknown",
                        i = t && t.pathname || "unknown";
                    r.ga("event", n, {
                        event_category: "license",
                        event_label: i,
                        non_interaction: !0,
                        send_to: r.gid
                    })
                },
                emscripten_get_canvas_element_size: Qe,
                emscripten_get_device_pixel_ratio: function() {
                    return devicePixelRatio
                },
                emscripten_get_element_css_size: function(e, r, t) {
                    if (!(e = ze(e))) return -4;
                    var n = Ye(e);
                    return X[r >> 3] = n.width, X[t >> 3] = n.height, 0
                },
                emscripten_get_fullscreen_status: function(e) {
                    return Oe.fullscreenEnabled() ? (Je(e), 0) : -1
                },
                emscripten_get_gamepad_status: function(e, r) {
                    return e < 0 || e >= Oe.lastGamepadState.length ? -5 : Oe.lastGamepadState[e] ? (er(r, Oe.lastGamepadState[e]), 0) : -7
                },
                emscripten_get_now: ke,
                emscripten_get_num_gamepads: function() {
                    return Oe.lastGamepadState.length
                },
                emscripten_get_sbrk_ptr: function() {
                    return 1052496
                },
                emscripten_glActiveTexture: function(e) {
                    Or.activeTexture(e)
                },
                emscripten_glAttachShader: function(e, r) {
                    Or.attachShader(Ue.programs[e], Ue.shaders[r])
                },
                emscripten_glBeginQuery: function(e, r) {
                    Or.beginQuery(e, Ue.queries[r])
                },
                emscripten_glBeginQueryEXT: function(e, r) {
                    Or.disjointTimerQueryExt.beginQueryEXT(e, Ue.timerQueriesEXT[r])
                },
                emscripten_glBeginTransformFeedback: function(e) {
                    Or.beginTransformFeedback(e)
                },
                emscripten_glBindAttribLocation: function(e, r, t) {
                    Or.bindAttribLocation(Ue.programs[e], r, L(t))
                },
                emscripten_glBindBuffer: function(e, r) {
                    35051 == e ? Or.currentPixelPackBufferBinding = r : 35052 == e && (Or.currentPixelUnpackBufferBinding = r), Or.bindBuffer(e, Ue.buffers[r])
                },
                emscripten_glBindBufferBase: function(e, r, t) {
                    Or.bindBufferBase(e, r, Ue.buffers[t])
                },
                emscripten_glBindBufferRange: function(e, r, t, n, i) {
                    Or.bindBufferRange(e, r, Ue.buffers[t], n, i)
                },
                emscripten_glBindFramebuffer: function(e, r) {
                    Or.bindFramebuffer(e, Ue.framebuffers[r])
                },
                emscripten_glBindRenderbuffer: function(e, r) {
                    Or.bindRenderbuffer(e, Ue.renderbuffers[r])
                },
                emscripten_glBindSampler: function(e, r) {
                    Or.bindSampler(e, Ue.samplers[r])
                },
                emscripten_glBindTexture: function(e, r) {
                    Or.bindTexture(e, Ue.textures[r])
                },
                emscripten_glBindTransformFeedback: function(e, r) {
                    Or.bindTransformFeedback(e, Ue.transformFeedbacks[r])
                },
                emscripten_glBindVertexArray: function(e) {
                    Or.bindVertexArray(Ue.vaos[e])
                },
                emscripten_glBindVertexArrayOES: function(e) {
                    Or.bindVertexArray(Ue.vaos[e])
                },
                emscripten_glBlendColor: function(e, r, t, n) {
                    Or.blendColor(e, r, t, n)
                },
                emscripten_glBlendEquation: function(e) {
                    Or.blendEquation(e)
                },
                emscripten_glBlendEquationSeparate: function(e, r) {
                    Or.blendEquationSeparate(e, r)
                },
                emscripten_glBlendFunc: function(e, r) {
                    Or.blendFunc(e, r)
                },
                emscripten_glBlendFuncSeparate: function(e, r, t, n) {
                    Or.blendFuncSeparate(e, r, t, n)
                },
                emscripten_glBlitFramebuffer: function(e, r, t, n, i, a, o, u, s, c) {
                    Or.blitFramebuffer(e, r, t, n, i, a, o, u, s, c)
                },
                emscripten_glBufferData: function(e, r, t, n) {
                    Ue.currentContext.version >= 2 ? t ? Or.bufferData(e, G, n, t, r) : Or.bufferData(e, r, n) : Or.bufferData(e, t ? G.subarray(t, t + r) : r, n)
                },
                emscripten_glBufferSubData: function(e, r, t, n) {
                    Ue.currentContext.version >= 2 ? Or.bufferSubData(e, r, G, n, t) : Or.bufferSubData(e, r, G.subarray(n, n + t))
                },
                emscripten_glCheckFramebufferStatus: function(e) {
                    return Or.checkFramebufferStatus(e)
                },
                emscripten_glClear: function(e) {
                    Or.clear(e)
                },
                emscripten_glClearBufferfi: function(e, r, t, n) {
                    Or.clearBufferfi(e, r, t, n)
                },
                emscripten_glClearBufferfv: function(e, r, t) {
                    Or.clearBufferfv(e, r, V, t >> 2)
                },
                emscripten_glClearBufferiv: function(e, r, t) {
                    Or.clearBufferiv(e, r, q, t >> 2)
                },
                emscripten_glClearBufferuiv: function(e, r, t) {
                    Or.clearBufferuiv(e, r, Q, t >> 2)
                },
                emscripten_glClearColor: function(e, r, t, n) {
                    Or.clearColor(e, r, t, n)
                },
                emscripten_glClearDepthf: function(e) {
                    Or.clearDepth(e)
                },
                emscripten_glClearStencil: function(e) {
                    Or.clearStencil(e)
                },
                emscripten_glClientWaitSync: function(e, r, t, n) {
                    return Or.clientWaitSync(Ue.syncs[e], r, rr(t, n))
                },
                emscripten_glColorMask: function(e, r, t, n) {
                    Or.colorMask(!!e, !!r, !!t, !!n)
                },
                emscripten_glCompileShader: function(e) {
                    Or.compileShader(Ue.shaders[e])
                },
                emscripten_glCompressedTexImage2D: function(e, r, t, n, i, a, o, u) {
                    Ue.currentContext.version >= 2 ? Or.currentPixelUnpackBufferBinding ? Or.compressedTexImage2D(e, r, t, n, i, a, o, u) : Or.compressedTexImage2D(e, r, t, n, i, a, G, u, o) : Or.compressedTexImage2D(e, r, t, n, i, a, u ? G.subarray(u, u + o) : null)
                },
                emscripten_glCompressedTexImage3D: function(e, r, t, n, i, a, o, u, s) {
                    Or.currentPixelUnpackBufferBinding ? Or.compressedTexImage3D(e, r, t, n, i, a, o, u, s) : Or.compressedTexImage3D(e, r, t, n, i, a, o, G, s, u)
                },
                emscripten_glCompressedTexSubImage2D: function(e, r, t, n, i, a, o, u, s) {
                    Ue.currentContext.version >= 2 ? Or.currentPixelUnpackBufferBinding ? Or.compressedTexSubImage2D(e, r, t, n, i, a, o, u, s) : Or.compressedTexSubImage2D(e, r, t, n, i, a, o, G, s, u) : Or.compressedTexSubImage2D(e, r, t, n, i, a, o, s ? G.subarray(s, s + u) : null)
                },
                emscripten_glCompressedTexSubImage3D: function(e, r, t, n, i, a, o, u, s, c, l) {
                    Or.currentPixelUnpackBufferBinding ? Or.compressedTexSubImage3D(e, r, t, n, i, a, o, u, s, c, l) : Or.compressedTexSubImage3D(e, r, t, n, i, a, o, u, s, G, l, c)
                },
                emscripten_glCopyBufferSubData: function(e, r, t, n, i) {
                    Or.copyBufferSubData(e, r, t, n, i)
                },
                emscripten_glCopyTexImage2D: function(e, r, t, n, i, a, o, u) {
                    Or.copyTexImage2D(e, r, t, n, i, a, o, u)
                },
                emscripten_glCopyTexSubImage2D: function(e, r, t, n, i, a, o, u) {
                    Or.copyTexSubImage2D(e, r, t, n, i, a, o, u)
                },
                emscripten_glCopyTexSubImage3D: function(e, r, t, n, i, a, o, u, s) {
                    Or.copyTexSubImage3D(e, r, t, n, i, a, o, u, s)
                },
                emscripten_glCreateProgram: function() {
                    var e = Ue.getNewId(Ue.programs),
                        r = Or.createProgram();
                    return r.name = e, Ue.programs[e] = r, e
                },
                emscripten_glCreateShader: function(e) {
                    var r = Ue.getNewId(Ue.shaders);
                    return Ue.shaders[r] = Or.createShader(e), r
                },
                emscripten_glCullFace: function(e) {
                    Or.cullFace(e)
                },
                emscripten_glDeleteBuffers: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.buffers[n];
                        i && (Or.deleteBuffer(i), i.name = 0, Ue.buffers[n] = null, n == Ue.currArrayBuffer && (Ue.currArrayBuffer = 0), n == Ue.currElementArrayBuffer && (Ue.currElementArrayBuffer = 0), n == Or.currentPixelPackBufferBinding && (Or.currentPixelPackBufferBinding = 0), n == Or.currentPixelUnpackBufferBinding && (Or.currentPixelUnpackBufferBinding = 0))
                    }
                },
                emscripten_glDeleteFramebuffers: function(e, r) {
                    for (var t = 0; t < e; ++t) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.framebuffers[n];
                        i && (Or.deleteFramebuffer(i), i.name = 0, Ue.framebuffers[n] = null)
                    }
                },
                emscripten_glDeleteProgram: function(e) {
                    if (e) {
                        var r = Ue.programs[e];
                        r ? (Or.deleteProgram(r), r.name = 0, Ue.programs[e] = null, Ue.programInfos[e] = null) : Ue.recordError(1281)
                    }
                },
                emscripten_glDeleteQueries: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.queries[n];
                        i && (Or.deleteQuery(i), Ue.queries[n] = null)
                    }
                },
                emscripten_glDeleteQueriesEXT: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.timerQueriesEXT[n];
                        i && (Or.disjointTimerQueryExt.deleteQueryEXT(i), Ue.timerQueriesEXT[n] = null)
                    }
                },
                emscripten_glDeleteRenderbuffers: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.renderbuffers[n];
                        i && (Or.deleteRenderbuffer(i), i.name = 0, Ue.renderbuffers[n] = null)
                    }
                },
                emscripten_glDeleteSamplers: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.samplers[n];
                        i && (Or.deleteSampler(i), i.name = 0, Ue.samplers[n] = null)
                    }
                },
                emscripten_glDeleteShader: function(e) {
                    if (e) {
                        var r = Ue.shaders[e];
                        r ? (Or.deleteShader(r), Ue.shaders[e] = null) : Ue.recordError(1281)
                    }
                },
                emscripten_glDeleteSync: function(e) {
                    if (e) {
                        var r = Ue.syncs[e];
                        r ? (Or.deleteSync(r), r.name = 0, Ue.syncs[e] = null) : Ue.recordError(1281)
                    }
                },
                emscripten_glDeleteTextures: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.textures[n];
                        i && (Or.deleteTexture(i), i.name = 0, Ue.textures[n] = null)
                    }
                },
                emscripten_glDeleteTransformFeedbacks: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.transformFeedbacks[n];
                        i && (Or.deleteTransformFeedback(i), i.name = 0, Ue.transformFeedbacks[n] = null)
                    }
                },
                emscripten_glDeleteVertexArrays: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2];
                        Or.deleteVertexArray(Ue.vaos[n]), Ue.vaos[n] = null
                    }
                },
                emscripten_glDeleteVertexArraysOES: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2];
                        Or.deleteVertexArray(Ue.vaos[n]), Ue.vaos[n] = null
                    }
                },
                emscripten_glDepthFunc: function(e) {
                    Or.depthFunc(e)
                },
                emscripten_glDepthMask: function(e) {
                    Or.depthMask(!!e)
                },
                emscripten_glDepthRangef: function(e, r) {
                    Or.depthRange(e, r)
                },
                emscripten_glDetachShader: function(e, r) {
                    Or.detachShader(Ue.programs[e], Ue.shaders[r])
                },
                emscripten_glDisable: function(e) {
                    Or.disable(e)
                },
                emscripten_glDisableVertexAttribArray: function(e) {
                    Or.disableVertexAttribArray(e)
                },
                emscripten_glDrawArrays: function(e, r, t) {
                    Or.drawArrays(e, r, t)
                },
                emscripten_glDrawArraysInstanced: function(e, r, t, n) {
                    Or.drawArraysInstanced(e, r, t, n)
                },
                emscripten_glDrawArraysInstancedANGLE: function(e, r, t, n) {
                    Or.drawArraysInstanced(e, r, t, n)
                },
                emscripten_glDrawArraysInstancedARB: function(e, r, t, n) {
                    Or.drawArraysInstanced(e, r, t, n)
                },
                emscripten_glDrawArraysInstancedEXT: function(e, r, t, n) {
                    Or.drawArraysInstanced(e, r, t, n)
                },
                emscripten_glDrawArraysInstancedNV: function(e, r, t, n) {
                    Or.drawArraysInstanced(e, r, t, n)
                },
                emscripten_glDrawBuffers: function(e, r) {
                    for (var t = tr[e], n = 0; n < e; n++) t[n] = q[r + 4 * n >> 2];
                    Or.drawBuffers(t)
                },
                emscripten_glDrawBuffersEXT: function(e, r) {
                    for (var t = tr[e], n = 0; n < e; n++) t[n] = q[r + 4 * n >> 2];
                    Or.drawBuffers(t)
                },
                emscripten_glDrawBuffersWEBGL: function(e, r) {
                    for (var t = tr[e], n = 0; n < e; n++) t[n] = q[r + 4 * n >> 2];
                    Or.drawBuffers(t)
                },
                emscripten_glDrawElements: function(e, r, t, n) {
                    Or.drawElements(e, r, t, n)
                },
                emscripten_glDrawElementsInstanced: function(e, r, t, n, i) {
                    Or.drawElementsInstanced(e, r, t, n, i)
                },
                emscripten_glDrawElementsInstancedANGLE: function(e, r, t, n, i) {
                    Or.drawElementsInstanced(e, r, t, n, i)
                },
                emscripten_glDrawElementsInstancedARB: function(e, r, t, n, i) {
                    Or.drawElementsInstanced(e, r, t, n, i)
                },
                emscripten_glDrawElementsInstancedEXT: function(e, r, t, n, i) {
                    Or.drawElementsInstanced(e, r, t, n, i)
                },
                emscripten_glDrawElementsInstancedNV: function(e, r, t, n, i) {
                    Or.drawElementsInstanced(e, r, t, n, i)
                },
                emscripten_glDrawRangeElements: function(e, r, t, n, i, a) {
                    nr(e, n, i, a)
                },
                emscripten_glEnable: function(e) {
                    Or.enable(e)
                },
                emscripten_glEnableVertexAttribArray: function(e) {
                    Or.enableVertexAttribArray(e)
                },
                emscripten_glEndQuery: function(e) {
                    Or.endQuery(e)
                },
                emscripten_glEndQueryEXT: function(e) {
                    Or.disjointTimerQueryExt.endQueryEXT(e)
                },
                emscripten_glEndTransformFeedback: function() {
                    Or.endTransformFeedback()
                },
                emscripten_glFenceSync: function(e, r) {
                    var t = Or.fenceSync(e, r);
                    if (t) {
                        var n = Ue.getNewId(Ue.syncs);
                        return t.name = n, Ue.syncs[n] = t, n
                    }
                    return 0
                },
                emscripten_glFinish: function() {
                    Or.finish()
                },
                emscripten_glFlush: function() {
                    Or.flush()
                },
                emscripten_glFramebufferRenderbuffer: function(e, r, t, n) {
                    Or.framebufferRenderbuffer(e, r, t, Ue.renderbuffers[n])
                },
                emscripten_glFramebufferTexture2D: function(e, r, t, n, i) {
                    Or.framebufferTexture2D(e, r, t, Ue.textures[n], i)
                },
                emscripten_glFramebufferTextureLayer: function(e, r, t, n, i) {
                    Or.framebufferTextureLayer(e, r, Ue.textures[t], n, i)
                },
                emscripten_glFrontFace: function(e) {
                    Or.frontFace(e)
                },
                emscripten_glGenBuffers: function(e, r) {
                    ir(e, r, "createBuffer", Ue.buffers)
                },
                emscripten_glGenFramebuffers: function(e, r) {
                    ir(e, r, "createFramebuffer", Ue.framebuffers)
                },
                emscripten_glGenQueries: function(e, r) {
                    ir(e, r, "createQuery", Ue.queries)
                },
                emscripten_glGenQueriesEXT: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = Or.disjointTimerQueryExt.createQueryEXT();
                        if (!n) {
                            for (Ue.recordError(1282); t < e;) q[r + 4 * t++ >> 2] = 0;
                            return
                        }
                        var i = Ue.getNewId(Ue.timerQueriesEXT);
                        n.name = i, Ue.timerQueriesEXT[i] = n, q[r + 4 * t >> 2] = i
                    }
                },
                emscripten_glGenRenderbuffers: function(e, r) {
                    ir(e, r, "createRenderbuffer", Ue.renderbuffers)
                },
                emscripten_glGenSamplers: function(e, r) {
                    ir(e, r, "createSampler", Ue.samplers)
                },
                emscripten_glGenTextures: function(e, r) {
                    ir(e, r, "createTexture", Ue.textures)
                },
                emscripten_glGenTransformFeedbacks: function(e, r) {
                    ir(e, r, "createTransformFeedback", Ue.transformFeedbacks)
                },
                emscripten_glGenVertexArrays: function(e, r) {
                    ir(e, r, "createVertexArray", Ue.vaos)
                },
                emscripten_glGenVertexArraysOES: function(e, r) {
                    ir(e, r, "createVertexArray", Ue.vaos)
                },
                emscripten_glGenerateMipmap: function(e) {
                    Or.generateMipmap(e)
                },
                emscripten_glGetActiveAttrib: function(e, r, t, n, i, a, o) {
                    e = Ue.programs[e];
                    var u = Or.getActiveAttrib(e, r);
                    if (u) {
                        var s = t > 0 && o ? B(u.name, o, t) : 0;
                        n && (q[n >> 2] = s), i && (q[i >> 2] = u.size), a && (q[a >> 2] = u.type)
                    }
                },
                emscripten_glGetActiveUniform: function(e, r, t, n, i, a, o) {
                    e = Ue.programs[e];
                    var u = Or.getActiveUniform(e, r);
                    if (u) {
                        var s = t > 0 && o ? B(u.name, o, t) : 0;
                        n && (q[n >> 2] = s), i && (q[i >> 2] = u.size), a && (q[a >> 2] = u.type)
                    }
                },
                emscripten_glGetActiveUniformBlockName: function(e, r, t, n, i) {
                    e = Ue.programs[e];
                    var a = Or.getActiveUniformBlockName(e, r);
                    if (a)
                        if (i && t > 0) {
                            var o = B(a, i, t);
                            n && (q[n >> 2] = o)
                        } else n && (q[n >> 2] = 0)
                },
                emscripten_glGetActiveUniformBlockiv: function(e, r, t, n) {
                    if (n) switch (e = Ue.programs[e], t) {
                        case 35393:
                            var i = Or.getActiveUniformBlockName(e, r);
                            return void(q[n >> 2] = i.length + 1);
                        default:
                            var a = Or.getActiveUniformBlockParameter(e, r, t);
                            if (!a) return;
                            if ("number" == typeof a) q[n >> 2] = a;
                            else
                                for (var o = 0; o < a.length; o++) q[n + 4 * o >> 2] = a[o]
                    } else Ue.recordError(1281)
                },
                emscripten_glGetActiveUniformsiv: function(e, r, t, n, i) {
                    if (i)
                        if (r > 0 && 0 == t) Ue.recordError(1281);
                        else {
                            e = Ue.programs[e];
                            for (var a = [], o = 0; o < r; o++) a.push(q[t + 4 * o >> 2]);
                            var u = Or.getActiveUniforms(e, a, n);
                            if (u) {
                                var s = u.length;
                                for (o = 0; o < s; o++) q[i + 4 * o >> 2] = u[o]
                            }
                        }
                    else Ue.recordError(1281)
                },
                emscripten_glGetAttachedShaders: function(e, r, t, n) {
                    var i = Or.getAttachedShaders(Ue.programs[e]),
                        a = i.length;
                    a > r && (a = r), q[t >> 2] = a;
                    for (var o = 0; o < a; ++o) {
                        var u = Ue.shaders.indexOf(i[o]);
                        q[n + 4 * o >> 2] = u
                    }
                },
                emscripten_glGetAttribLocation: function(e, r) {
                    return Or.getAttribLocation(Ue.programs[e], L(r))
                },
                emscripten_glGetBooleanv: function(e, r) {
                    or(e, r, 4)
                },
                emscripten_glGetBufferParameteri64v: function(e, r, t) {
                    t ? ar(t, Or.getBufferParameter(e, r)) : Ue.recordError(1281)
                },
                emscripten_glGetBufferParameteriv: function(e, r, t) {
                    t ? q[t >> 2] = Or.getBufferParameter(e, r) : Ue.recordError(1281)
                },
                emscripten_glGetError: function() {
                    var e = Or.getError() || Ue.lastError;
                    return Ue.lastError = 0, e
                },
                emscripten_glGetFloatv: function(e, r) {
                    or(e, r, 2)
                },
                emscripten_glGetFragDataLocation: function(e, r) {
                    return Or.getFragDataLocation(Ue.programs[e], L(r))
                },
                emscripten_glGetFramebufferAttachmentParameteriv: function(e, r, t, n) {
                    var i = Or.getFramebufferAttachmentParameter(e, r, t);
                    (i instanceof WebGLRenderbuffer || i instanceof WebGLTexture) && (i = 0 | i.name), q[n >> 2] = i
                },
                emscripten_glGetInteger64i_v: function(e, r, t) {
                    ur(e, r, t, 1)
                },
                emscripten_glGetInteger64v: function(e, r) {
                    or(e, r, 1)
                },
                emscripten_glGetIntegeri_v: function(e, r, t) {
                    ur(e, r, t, 0)
                },
                emscripten_glGetIntegerv: function(e, r) {
                    or(e, r, 0)
                },
                emscripten_glGetInternalformativ: function(e, r, t, n, i) {
                    if (n < 0) Ue.recordError(1281);
                    else if (i) {
                        var a = Or.getInternalformatParameter(e, r, t);
                        if (null !== a)
                            for (var o = 0; o < a.length && o < n; ++o) q[i + o >> 2] = a[o]
                    } else Ue.recordError(1281)
                },
                emscripten_glGetProgramBinary: function(e, r, t, n, i) {
                    Ue.recordError(1282)
                },
                emscripten_glGetProgramInfoLog: function(e, r, t, n) {
                    var i = Or.getProgramInfoLog(Ue.programs[e]);
                    null === i && (i = "(unknown error)");
                    var a = r > 0 && n ? B(i, n, r) : 0;
                    t && (q[t >> 2] = a)
                },
                emscripten_glGetProgramiv: function(e, r, t) {
                    if (t)
                        if (e >= Ue.counter) Ue.recordError(1281);
                        else {
                            var n = Ue.programInfos[e];
                            if (n)
                                if (35716 == r) {
                                    var i = Or.getProgramInfoLog(Ue.programs[e]);
                                    null === i && (i = "(unknown error)"), q[t >> 2] = i.length + 1
                                } else if (35719 == r) q[t >> 2] = n.maxUniformLength;
                            else if (35722 == r) {
                                if (-1 == n.maxAttributeLength) {
                                    e = Ue.programs[e];
                                    var a = Or.getProgramParameter(e, 35721);
                                    n.maxAttributeLength = 0;
                                    for (var o = 0; o < a; ++o) {
                                        var u = Or.getActiveAttrib(e, o);
                                        n.maxAttributeLength = Math.max(n.maxAttributeLength, u.name.length + 1)
                                    }
                                }
                                q[t >> 2] = n.maxAttributeLength
                            } else if (35381 == r) {
                                if (-1 == n.maxUniformBlockNameLength) {
                                    e = Ue.programs[e];
                                    var s = Or.getProgramParameter(e, 35382);
                                    n.maxUniformBlockNameLength = 0;
                                    for (o = 0; o < s; ++o) {
                                        var c = Or.getActiveUniformBlockName(e, o);
                                        n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, c.length + 1)
                                    }
                                }
                                q[t >> 2] = n.maxUniformBlockNameLength
                            } else q[t >> 2] = Or.getProgramParameter(Ue.programs[e], r);
                            else Ue.recordError(1282)
                        }
                    else Ue.recordError(1281)
                },
                emscripten_glGetQueryObjecti64vEXT: function(e, r, t) {
                    if (t) {
                        var n = Ue.timerQueriesEXT[e],
                            i = Or.disjointTimerQueryExt.getQueryObjectEXT(n, r);
                        ar(t, "boolean" == typeof i ? i ? 1 : 0 : i)
                    } else Ue.recordError(1281)
                },
                emscripten_glGetQueryObjectivEXT: function(e, r, t) {
                    if (t) {
                        var n, i = Ue.timerQueriesEXT[e],
                            a = Or.disjointTimerQueryExt.getQueryObjectEXT(i, r);
                        n = "boolean" == typeof a ? a ? 1 : 0 : a, q[t >> 2] = n
                    } else Ue.recordError(1281)
                },
                emscripten_glGetQueryObjectui64vEXT: function(e, r, t) {
                    if (t) {
                        var n = Ue.timerQueriesEXT[e],
                            i = Or.disjointTimerQueryExt.getQueryObjectEXT(n, r);
                        ar(t, "boolean" == typeof i ? i ? 1 : 0 : i)
                    } else Ue.recordError(1281)
                },
                emscripten_glGetQueryObjectuiv: function(e, r, t) {
                    if (t) {
                        var n, i = Ue.queries[e],
                            a = Or.getQueryParameter(i, r);
                        n = "boolean" == typeof a ? a ? 1 : 0 : a, q[t >> 2] = n
                    } else Ue.recordError(1281)
                },
                emscripten_glGetQueryObjectuivEXT: function(e, r, t) {
                    if (t) {
                        var n, i = Ue.timerQueriesEXT[e],
                            a = Or.disjointTimerQueryExt.getQueryObjectEXT(i, r);
                        n = "boolean" == typeof a ? a ? 1 : 0 : a, q[t >> 2] = n
                    } else Ue.recordError(1281)
                },
                emscripten_glGetQueryiv: function(e, r, t) {
                    t ? q[t >> 2] = Or.getQuery(e, r) : Ue.recordError(1281)
                },
                emscripten_glGetQueryivEXT: function(e, r, t) {
                    t ? q[t >> 2] = Or.disjointTimerQueryExt.getQueryEXT(e, r) : Ue.recordError(1281)
                },
                emscripten_glGetRenderbufferParameteriv: function(e, r, t) {
                    t ? q[t >> 2] = Or.getRenderbufferParameter(e, r) : Ue.recordError(1281)
                },
                emscripten_glGetSamplerParameterfv: function(e, r, t) {
                    t ? (e = Ue.samplers[e], V[t >> 2] = Or.getSamplerParameter(e, r)) : Ue.recordError(1281)
                },
                emscripten_glGetSamplerParameteriv: function(e, r, t) {
                    t ? (e = Ue.samplers[e], q[t >> 2] = Or.getSamplerParameter(e, r)) : Ue.recordError(1281)
                },
                emscripten_glGetShaderInfoLog: function(e, r, t, n) {
                    var i = Or.getShaderInfoLog(Ue.shaders[e]);
                    null === i && (i = "(unknown error)");
                    var a = r > 0 && n ? B(i, n, r) : 0;
                    t && (q[t >> 2] = a)
                },
                emscripten_glGetShaderPrecisionFormat: function(e, r, t, n) {
                    var i = Or.getShaderPrecisionFormat(e, r);
                    q[t >> 2] = i.rangeMin, q[t + 4 >> 2] = i.rangeMax, q[n >> 2] = i.precision
                },
                emscripten_glGetShaderSource: function(e, r, t, n) {
                    var i = Or.getShaderSource(Ue.shaders[e]);
                    if (i) {
                        var a = r > 0 && n ? B(i, n, r) : 0;
                        t && (q[t >> 2] = a)
                    }
                },
                emscripten_glGetShaderiv: function(e, r, t) {
                    if (t)
                        if (35716 == r) {
                            var n = Or.getShaderInfoLog(Ue.shaders[e]);
                            null === n && (n = "(unknown error)"), q[t >> 2] = n.length + 1
                        } else if (35720 == r) {
                        var i = Or.getShaderSource(Ue.shaders[e]),
                            a = null === i || 0 == i.length ? 0 : i.length + 1;
                        q[t >> 2] = a
                    } else q[t >> 2] = Or.getShaderParameter(Ue.shaders[e], r);
                    else Ue.recordError(1281)
                },
                emscripten_glGetString: function(e) {
                    if (Ue.stringCache[e]) return Ue.stringCache[e];
                    var r;
                    switch (e) {
                        case 7939:
                            var t = Or.getSupportedExtensions() || [];
                            r = sr((t = t.concat(t.map((function(e) {
                                return "GL_" + e
                            })))).join(" "));
                            break;
                        case 7936:
                        case 7937:
                        case 37445:
                        case 37446:
                            var n = Or.getParameter(e);
                            n || Ue.recordError(1280), r = sr(n);
                            break;
                        case 7938:
                            var i = Or.getParameter(7938);
                            r = sr(i = Ue.currentContext.version >= 2 ? "OpenGL ES 3.0 (" + i + ")" : "OpenGL ES 2.0 (" + i + ")");
                            break;
                        case 35724:
                            var a = Or.getParameter(35724),
                                o = a.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                            null !== o && (3 == o[1].length && (o[1] = o[1] + "0"), a = "OpenGL ES GLSL ES " + o[1] + " (" + a + ")"), r = sr(a);
                            break;
                        default:
                            return Ue.recordError(1280), 0
                    }
                    return Ue.stringCache[e] = r, r
                },
                emscripten_glGetStringi: function(e, r) {
                    if (Ue.currentContext.version < 2) return Ue.recordError(1282), 0;
                    var t = Ue.stringiCache[e];
                    if (t) return r < 0 || r >= t.length ? (Ue.recordError(1281), 0) : t[r];
                    switch (e) {
                        case 7939:
                            var n = Or.getSupportedExtensions() || [];
                            return n = (n = n.concat(n.map((function(e) {
                                return "GL_" + e
                            })))).map((function(e) {
                                return sr(e)
                            })), t = Ue.stringiCache[e] = n, r < 0 || r >= t.length ? (Ue.recordError(1281), 0) : t[r];
                        default:
                            return Ue.recordError(1280), 0
                    }
                },
                emscripten_glGetSynciv: function(e, r, t, n, i) {
                    if (t < 0) Ue.recordError(1281);
                    else if (i) {
                        var a = Or.getSyncParameter(Ue.syncs[e], r);
                        q[n >> 2] = a, null !== a && n && (q[n >> 2] = 1)
                    } else Ue.recordError(1281)
                },
                emscripten_glGetTexParameterfv: function(e, r, t) {
                    t ? V[t >> 2] = Or.getTexParameter(e, r) : Ue.recordError(1281)
                },
                emscripten_glGetTexParameteriv: function(e, r, t) {
                    t ? q[t >> 2] = Or.getTexParameter(e, r) : Ue.recordError(1281)
                },
                emscripten_glGetTransformFeedbackVarying: function(e, r, t, n, i, a, o) {
                    e = Ue.programs[e];
                    var u = Or.getTransformFeedbackVarying(e, r);
                    if (u) {
                        if (o && t > 0) {
                            var s = B(u.name, o, t);
                            n && (q[n >> 2] = s)
                        } else n && (q[n >> 2] = 0);
                        i && (q[i >> 2] = u.size), a && (q[a >> 2] = u.type)
                    }
                },
                emscripten_glGetUniformBlockIndex: function(e, r) {
                    return Or.getUniformBlockIndex(Ue.programs[e], L(r))
                },
                emscripten_glGetUniformIndices: function(e, r, t, n) {
                    if (n)
                        if (r > 0 && (0 == t || 0 == n)) Ue.recordError(1281);
                        else {
                            e = Ue.programs[e];
                            for (var i = [], a = 0; a < r; a++) i.push(L(q[t + 4 * a >> 2]));
                            var o = Or.getUniformIndices(e, i);
                            if (o) {
                                var u = o.length;
                                for (a = 0; a < u; a++) q[n + 4 * a >> 2] = o[a]
                            }
                        }
                    else Ue.recordError(1281)
                },
                emscripten_glGetUniformLocation: function(e, r) {
                    var t = 0;
                    if ("]" == (r = L(r))[r.length - 1]) {
                        var n = r.lastIndexOf("[");
                        t = "]" != r[n + 1] ? cr(r.slice(n + 1)) : 0, r = r.slice(0, n)
                    }
                    var i = Ue.programInfos[e] && Ue.programInfos[e].uniforms[r];
                    return i && t >= 0 && t < i[0] ? i[1] + t : -1
                },
                emscripten_glGetUniformfv: function(e, r, t) {
                    lr(e, r, t, 2)
                },
                emscripten_glGetUniformiv: function(e, r, t) {
                    lr(e, r, t, 0)
                },
                emscripten_glGetUniformuiv: function(e, r, t) {
                    lr(e, r, t, 0)
                },
                emscripten_glGetVertexAttribIiv: function(e, r, t) {
                    fr(e, r, t, 0)
                },
                emscripten_glGetVertexAttribIuiv: function(e, r, t) {
                    fr(e, r, t, 0)
                },
                emscripten_glGetVertexAttribPointerv: function(e, r, t) {
                    t ? q[t >> 2] = Or.getVertexAttribOffset(e, r) : Ue.recordError(1281)
                },
                emscripten_glGetVertexAttribfv: function(e, r, t) {
                    fr(e, r, t, 2)
                },
                emscripten_glGetVertexAttribiv: function(e, r, t) {
                    fr(e, r, t, 5)
                },
                emscripten_glHint: function(e, r) {
                    Or.hint(e, r)
                },
                emscripten_glInvalidateFramebuffer: function(e, r, t) {
                    for (var n = tr[r], i = 0; i < r; i++) n[i] = q[t + 4 * i >> 2];
                    Or.invalidateFramebuffer(e, n)
                },
                emscripten_glInvalidateSubFramebuffer: function(e, r, t, n, i, a, o) {
                    for (var u = tr[r], s = 0; s < r; s++) u[s] = q[t + 4 * s >> 2];
                    Or.invalidateSubFramebuffer(e, u, n, i, a, o)
                },
                emscripten_glIsBuffer: function(e) {
                    var r = Ue.buffers[e];
                    return r ? Or.isBuffer(r) : 0
                },
                emscripten_glIsEnabled: function(e) {
                    return Or.isEnabled(e)
                },
                emscripten_glIsFramebuffer: function(e) {
                    var r = Ue.framebuffers[e];
                    return r ? Or.isFramebuffer(r) : 0
                },
                emscripten_glIsProgram: function(e) {
                    return (e = Ue.programs[e]) ? Or.isProgram(e) : 0
                },
                emscripten_glIsQuery: function(e) {
                    var r = Ue.queries[e];
                    return r ? Or.isQuery(r) : 0
                },
                emscripten_glIsQueryEXT: function(e) {
                    var r = Ue.timerQueriesEXT[e];
                    return r ? Or.disjointTimerQueryExt.isQueryEXT(r) : 0
                },
                emscripten_glIsRenderbuffer: function(e) {
                    var r = Ue.renderbuffers[e];
                    return r ? Or.isRenderbuffer(r) : 0
                },
                emscripten_glIsSampler: function(e) {
                    var r = Ue.samplers[e];
                    return r ? Or.isSampler(r) : 0
                },
                emscripten_glIsShader: function(e) {
                    var r = Ue.shaders[e];
                    return r ? Or.isShader(r) : 0
                },
                emscripten_glIsSync: function(e) {
                    return Or.isSync(Ue.syncs[e])
                },
                emscripten_glIsTexture: function(e) {
                    var r = Ue.textures[e];
                    return r ? Or.isTexture(r) : 0
                },
                emscripten_glIsTransformFeedback: function(e) {
                    return Or.isTransformFeedback(Ue.transformFeedbacks[e])
                },
                emscripten_glIsVertexArray: function(e) {
                    var r = Ue.vaos[e];
                    return r ? Or.isVertexArray(r) : 0
                },
                emscripten_glIsVertexArrayOES: function(e) {
                    var r = Ue.vaos[e];
                    return r ? Or.isVertexArray(r) : 0
                },
                emscripten_glLineWidth: function(e) {
                    Or.lineWidth(e)
                },
                emscripten_glLinkProgram: function(e) {
                    Or.linkProgram(Ue.programs[e]), Ue.populateUniformTable(e)
                },
                emscripten_glPauseTransformFeedback: function() {
                    Or.pauseTransformFeedback()
                },
                emscripten_glPixelStorei: function(e, r) {
                    3317 == e && (Ue.unpackAlignment = r), Or.pixelStorei(e, r)
                },
                emscripten_glPolygonOffset: function(e, r) {
                    Or.polygonOffset(e, r)
                },
                emscripten_glProgramBinary: function(e, r, t, n) {
                    Ue.recordError(1280)
                },
                emscripten_glProgramParameteri: function(e, r, t) {
                    Ue.recordError(1280)
                },
                emscripten_glQueryCounterEXT: function(e, r) {
                    Or.disjointTimerQueryExt.queryCounterEXT(Ue.timerQueriesEXT[e], r)
                },
                emscripten_glReadBuffer: function(e) {
                    Or.readBuffer(e)
                },
                emscripten_glReadPixels: function(e, r, t, n, i, a, o) {
                    if (Ue.currentContext.version >= 2)
                        if (Or.currentPixelPackBufferBinding) Or.readPixels(e, r, t, n, i, a, o);
                        else {
                            var u = dr(a);
                            Or.readPixels(e, r, t, n, i, a, u, o >> mr(u))
                        }
                    else {
                        var s = pr(a, i, t, n, o);
                        s ? Or.readPixels(e, r, t, n, i, a, s) : Ue.recordError(1280)
                    }
                },
                emscripten_glReleaseShaderCompiler: function() {},
                emscripten_glRenderbufferStorage: function(e, r, t, n) {
                    Or.renderbufferStorage(e, r, t, n)
                },
                emscripten_glRenderbufferStorageMultisample: function(e, r, t, n, i) {
                    Or.renderbufferStorageMultisample(e, r, t, n, i)
                },
                emscripten_glResumeTransformFeedback: function() {
                    Or.resumeTransformFeedback()
                },
                emscripten_glSampleCoverage: function(e, r) {
                    Or.sampleCoverage(e, !!r)
                },
                emscripten_glSamplerParameterf: function(e, r, t) {
                    Or.samplerParameterf(Ue.samplers[e], r, t)
                },
                emscripten_glSamplerParameterfv: function(e, r, t) {
                    var n = V[t >> 2];
                    Or.samplerParameterf(Ue.samplers[e], r, n)
                },
                emscripten_glSamplerParameteri: function(e, r, t) {
                    Or.samplerParameteri(Ue.samplers[e], r, t)
                },
                emscripten_glSamplerParameteriv: function(e, r, t) {
                    var n = q[t >> 2];
                    Or.samplerParameteri(Ue.samplers[e], r, n)
                },
                emscripten_glScissor: function(e, r, t, n) {
                    Or.scissor(e, r, t, n)
                },
                emscripten_glShaderBinary: function() {
                    Ue.recordError(1280)
                },
                emscripten_glShaderSource: function(e, r, t, n) {
                    var i = Ue.getSource(e, r, t, n);
                    Or.shaderSource(Ue.shaders[e], i)
                },
                emscripten_glStencilFunc: function(e, r, t) {
                    Or.stencilFunc(e, r, t)
                },
                emscripten_glStencilFuncSeparate: function(e, r, t, n) {
                    Or.stencilFuncSeparate(e, r, t, n)
                },
                emscripten_glStencilMask: function(e) {
                    Or.stencilMask(e)
                },
                emscripten_glStencilMaskSeparate: function(e, r) {
                    Or.stencilMaskSeparate(e, r)
                },
                emscripten_glStencilOp: function(e, r, t) {
                    Or.stencilOp(e, r, t)
                },
                emscripten_glStencilOpSeparate: function(e, r, t, n) {
                    Or.stencilOpSeparate(e, r, t, n)
                },
                emscripten_glTexImage2D: function(e, r, t, n, i, a, o, u, s) {
                    if (Ue.currentContext.version >= 2)
                        if (Or.currentPixelUnpackBufferBinding) Or.texImage2D(e, r, t, n, i, a, o, u, s);
                        else if (s) {
                        var c = dr(u);
                        Or.texImage2D(e, r, t, n, i, a, o, u, c, s >> mr(c))
                    } else Or.texImage2D(e, r, t, n, i, a, o, u, null);
                    else Or.texImage2D(e, r, t, n, i, a, o, u, s ? pr(u, o, n, i, s) : null)
                },
                emscripten_glTexImage3D: function(e, r, t, n, i, a, o, u, s, c) {
                    if (Or.currentPixelUnpackBufferBinding) Or.texImage3D(e, r, t, n, i, a, o, u, s, c);
                    else if (c) {
                        var l = dr(s);
                        Or.texImage3D(e, r, t, n, i, a, o, u, s, l, c >> mr(l))
                    } else Or.texImage3D(e, r, t, n, i, a, o, u, s, null)
                },
                emscripten_glTexParameterf: function(e, r, t) {
                    Or.texParameterf(e, r, t)
                },
                emscripten_glTexParameterfv: function(e, r, t) {
                    var n = V[t >> 2];
                    Or.texParameterf(e, r, n)
                },
                emscripten_glTexParameteri: function(e, r, t) {
                    Or.texParameteri(e, r, t)
                },
                emscripten_glTexParameteriv: function(e, r, t) {
                    var n = q[t >> 2];
                    Or.texParameteri(e, r, n)
                },
                emscripten_glTexStorage2D: function(e, r, t, n, i) {
                    Or.texStorage2D(e, r, t, n, i)
                },
                emscripten_glTexStorage3D: function(e, r, t, n, i, a) {
                    Or.texStorage3D(e, r, t, n, i, a)
                },
                emscripten_glTexSubImage2D: function(e, r, t, n, i, a, o, u, s) {
                    if (Ue.currentContext.version >= 2)
                        if (Or.currentPixelUnpackBufferBinding) Or.texSubImage2D(e, r, t, n, i, a, o, u, s);
                        else if (s) {
                        var c = dr(u);
                        Or.texSubImage2D(e, r, t, n, i, a, o, u, c, s >> mr(c))
                    } else Or.texSubImage2D(e, r, t, n, i, a, o, u, null);
                    else {
                        var l = null;
                        s && (l = pr(u, o, i, a, s)), Or.texSubImage2D(e, r, t, n, i, a, o, u, l)
                    }
                },
                emscripten_glTexSubImage3D: function(e, r, t, n, i, a, o, u, s, c, l) {
                    if (Or.currentPixelUnpackBufferBinding) Or.texSubImage3D(e, r, t, n, i, a, o, u, s, c, l);
                    else if (l) {
                        var f = dr(c);
                        Or.texSubImage3D(e, r, t, n, i, a, o, u, s, c, f, l >> mr(f))
                    } else Or.texSubImage3D(e, r, t, n, i, a, o, u, s, c, null)
                },
                emscripten_glTransformFeedbackVaryings: function(e, r, t, n) {
                    e = Ue.programs[e];
                    for (var i = [], a = 0; a < r; a++) i.push(L(q[t + 4 * a >> 2]));
                    Or.transformFeedbackVaryings(e, i, n)
                },
                emscripten_glUniform1f: function(e, r) {
                    Or.uniform1f(Ue.uniforms[e], r)
                },
                emscripten_glUniform1fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform1fv(Ue.uniforms[e], V, t >> 2, r);
                    else {
                        if (r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferFloatViews[r - 1], i = 0; i < r; ++i) n[i] = V[t + 4 * i >> 2];
                        else n = V.subarray(t >> 2, t + 4 * r >> 2);
                        Or.uniform1fv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform1i: function(e, r) {
                    Or.uniform1i(Ue.uniforms[e], r)
                },
                emscripten_glUniform1iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform1iv(Ue.uniforms[e], q, t >> 2, r);
                    else {
                        if (r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[r - 1], i = 0; i < r; ++i) n[i] = q[t + 4 * i >> 2];
                        else n = q.subarray(t >> 2, t + 4 * r >> 2);
                        Or.uniform1iv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform1ui: function(e, r) {
                    Or.uniform1ui(Ue.uniforms[e], r)
                },
                emscripten_glUniform1uiv: function(e, r, t) {
                    Or.uniform1uiv(Ue.uniforms[e], Q, t >> 2, r)
                },
                emscripten_glUniform2f: function(e, r, t) {
                    Or.uniform2f(Ue.uniforms[e], r, t)
                },
                emscripten_glUniform2fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform2fv(Ue.uniforms[e], V, t >> 2, 2 * r);
                    else {
                        if (2 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferFloatViews[2 * r - 1], i = 0; i < 2 * r; i += 2) n[i] = V[t + 4 * i >> 2], n[i + 1] = V[t + (4 * i + 4) >> 2];
                        else n = V.subarray(t >> 2, t + 8 * r >> 2);
                        Or.uniform2fv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform2i: function(e, r, t) {
                    Or.uniform2i(Ue.uniforms[e], r, t)
                },
                emscripten_glUniform2iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform2iv(Ue.uniforms[e], q, t >> 2, 2 * r);
                    else {
                        if (2 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[2 * r - 1], i = 0; i < 2 * r; i += 2) n[i] = q[t + 4 * i >> 2], n[i + 1] = q[t + (4 * i + 4) >> 2];
                        else n = q.subarray(t >> 2, t + 8 * r >> 2);
                        Or.uniform2iv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform2ui: function(e, r, t) {
                    Or.uniform2ui(Ue.uniforms[e], r, t)
                },
                emscripten_glUniform2uiv: function(e, r, t) {
                    Or.uniform2uiv(Ue.uniforms[e], Q, t >> 2, 2 * r)
                },
                emscripten_glUniform3f: function(e, r, t, n) {
                    Or.uniform3f(Ue.uniforms[e], r, t, n)
                },
                emscripten_glUniform3fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform3fv(Ue.uniforms[e], V, t >> 2, 3 * r);
                    else {
                        if (3 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferFloatViews[3 * r - 1], i = 0; i < 3 * r; i += 3) n[i] = V[t + 4 * i >> 2], n[i + 1] = V[t + (4 * i + 4) >> 2], n[i + 2] = V[t + (4 * i + 8) >> 2];
                        else n = V.subarray(t >> 2, t + 12 * r >> 2);
                        Or.uniform3fv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform3i: function(e, r, t, n) {
                    Or.uniform3i(Ue.uniforms[e], r, t, n)
                },
                emscripten_glUniform3iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform3iv(Ue.uniforms[e], q, t >> 2, 3 * r);
                    else {
                        if (3 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[3 * r - 1], i = 0; i < 3 * r; i += 3) n[i] = q[t + 4 * i >> 2], n[i + 1] = q[t + (4 * i + 4) >> 2], n[i + 2] = q[t + (4 * i + 8) >> 2];
                        else n = q.subarray(t >> 2, t + 12 * r >> 2);
                        Or.uniform3iv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform3ui: function(e, r, t, n) {
                    Or.uniform3ui(Ue.uniforms[e], r, t, n)
                },
                emscripten_glUniform3uiv: function(e, r, t) {
                    Or.uniform3uiv(Ue.uniforms[e], Q, t >> 2, 3 * r)
                },
                emscripten_glUniform4f: function(e, r, t, n, i) {
                    Or.uniform4f(Ue.uniforms[e], r, t, n, i)
                },
                emscripten_glUniform4fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform4fv(Ue.uniforms[e], V, t >> 2, 4 * r);
                    else {
                        if (4 * r <= Ue.MINI_TEMP_BUFFER_SIZE) {
                            var n = Ue.miniTempBufferFloatViews[4 * r - 1],
                                i = V;
                            t >>= 2;
                            for (var a = 0; a < 4 * r; a += 4) {
                                var o = t + a;
                                n[a] = i[o], n[a + 1] = i[o + 1], n[a + 2] = i[o + 2], n[a + 3] = i[o + 3]
                            }
                        } else n = V.subarray(t >> 2, t + 16 * r >> 2);
                        Or.uniform4fv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform4i: function(e, r, t, n, i) {
                    Or.uniform4i(Ue.uniforms[e], r, t, n, i)
                },
                emscripten_glUniform4iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform4iv(Ue.uniforms[e], q, t >> 2, 4 * r);
                    else {
                        if (4 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[4 * r - 1], i = 0; i < 4 * r; i += 4) n[i] = q[t + 4 * i >> 2], n[i + 1] = q[t + (4 * i + 4) >> 2], n[i + 2] = q[t + (4 * i + 8) >> 2], n[i + 3] = q[t + (4 * i + 12) >> 2];
                        else n = q.subarray(t >> 2, t + 16 * r >> 2);
                        Or.uniform4iv(Ue.uniforms[e], n)
                    }
                },
                emscripten_glUniform4ui: function(e, r, t, n, i) {
                    Or.uniform4ui(Ue.uniforms[e], r, t, n, i)
                },
                emscripten_glUniform4uiv: function(e, r, t) {
                    Or.uniform4uiv(Ue.uniforms[e], Q, t >> 2, 4 * r)
                },
                emscripten_glUniformBlockBinding: function(e, r, t) {
                    e = Ue.programs[e], Or.uniformBlockBinding(e, r, t)
                },
                emscripten_glUniformMatrix2fv: function(e, r, t, n) {
                    if (Ue.currentContext.version >= 2) Or.uniformMatrix2fv(Ue.uniforms[e], !!t, V, n >> 2, 4 * r);
                    else {
                        if (4 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var i = Ue.miniTempBufferFloatViews[4 * r - 1], a = 0; a < 4 * r; a += 4) i[a] = V[n + 4 * a >> 2], i[a + 1] = V[n + (4 * a + 4) >> 2], i[a + 2] = V[n + (4 * a + 8) >> 2], i[a + 3] = V[n + (4 * a + 12) >> 2];
                        else i = V.subarray(n >> 2, n + 16 * r >> 2);
                        Or.uniformMatrix2fv(Ue.uniforms[e], !!t, i)
                    }
                },
                emscripten_glUniformMatrix2x3fv: function(e, r, t, n) {
                    Or.uniformMatrix2x3fv(Ue.uniforms[e], !!t, V, n >> 2, 6 * r)
                },
                emscripten_glUniformMatrix2x4fv: function(e, r, t, n) {
                    Or.uniformMatrix2x4fv(Ue.uniforms[e], !!t, V, n >> 2, 8 * r)
                },
                emscripten_glUniformMatrix3fv: function(e, r, t, n) {
                    if (Ue.currentContext.version >= 2) Or.uniformMatrix3fv(Ue.uniforms[e], !!t, V, n >> 2, 9 * r);
                    else {
                        if (9 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var i = Ue.miniTempBufferFloatViews[9 * r - 1], a = 0; a < 9 * r; a += 9) i[a] = V[n + 4 * a >> 2], i[a + 1] = V[n + (4 * a + 4) >> 2], i[a + 2] = V[n + (4 * a + 8) >> 2], i[a + 3] = V[n + (4 * a + 12) >> 2], i[a + 4] = V[n + (4 * a + 16) >> 2], i[a + 5] = V[n + (4 * a + 20) >> 2], i[a + 6] = V[n + (4 * a + 24) >> 2], i[a + 7] = V[n + (4 * a + 28) >> 2], i[a + 8] = V[n + (4 * a + 32) >> 2];
                        else i = V.subarray(n >> 2, n + 36 * r >> 2);
                        Or.uniformMatrix3fv(Ue.uniforms[e], !!t, i)
                    }
                },
                emscripten_glUniformMatrix3x2fv: function(e, r, t, n) {
                    Or.uniformMatrix3x2fv(Ue.uniforms[e], !!t, V, n >> 2, 6 * r)
                },
                emscripten_glUniformMatrix3x4fv: function(e, r, t, n) {
                    Or.uniformMatrix3x4fv(Ue.uniforms[e], !!t, V, n >> 2, 12 * r)
                },
                emscripten_glUniformMatrix4fv: function(e, r, t, n) {
                    if (Ue.currentContext.version >= 2) Or.uniformMatrix4fv(Ue.uniforms[e], !!t, V, n >> 2, 16 * r);
                    else {
                        if (16 * r <= Ue.MINI_TEMP_BUFFER_SIZE) {
                            var i = Ue.miniTempBufferFloatViews[16 * r - 1],
                                a = V;
                            n >>= 2;
                            for (var o = 0; o < 16 * r; o += 16) {
                                var u = n + o;
                                i[o] = a[u], i[o + 1] = a[u + 1], i[o + 2] = a[u + 2], i[o + 3] = a[u + 3], i[o + 4] = a[u + 4], i[o + 5] = a[u + 5], i[o + 6] = a[u + 6], i[o + 7] = a[u + 7], i[o + 8] = a[u + 8], i[o + 9] = a[u + 9], i[o + 10] = a[u + 10], i[o + 11] = a[u + 11], i[o + 12] = a[u + 12], i[o + 13] = a[u + 13], i[o + 14] = a[u + 14], i[o + 15] = a[u + 15]
                            }
                        } else i = V.subarray(n >> 2, n + 64 * r >> 2);
                        Or.uniformMatrix4fv(Ue.uniforms[e], !!t, i)
                    }
                },
                emscripten_glUniformMatrix4x2fv: function(e, r, t, n) {
                    Or.uniformMatrix4x2fv(Ue.uniforms[e], !!t, V, n >> 2, 8 * r)
                },
                emscripten_glUniformMatrix4x3fv: function(e, r, t, n) {
                    Or.uniformMatrix4x3fv(Ue.uniforms[e], !!t, V, n >> 2, 12 * r)
                },
                emscripten_glUseProgram: function(e) {
                    Or.useProgram(Ue.programs[e])
                },
                emscripten_glValidateProgram: function(e) {
                    Or.validateProgram(Ue.programs[e])
                },
                emscripten_glVertexAttrib1f: function(e, r) {
                    Or.vertexAttrib1f(e, r)
                },
                emscripten_glVertexAttrib1fv: function(e, r) {
                    Or.vertexAttrib1f(e, V[r >> 2])
                },
                emscripten_glVertexAttrib2f: function(e, r, t) {
                    Or.vertexAttrib2f(e, r, t)
                },
                emscripten_glVertexAttrib2fv: function(e, r) {
                    Or.vertexAttrib2f(e, V[r >> 2], V[r + 4 >> 2])
                },
                emscripten_glVertexAttrib3f: function(e, r, t, n) {
                    Or.vertexAttrib3f(e, r, t, n)
                },
                emscripten_glVertexAttrib3fv: function(e, r) {
                    Or.vertexAttrib3f(e, V[r >> 2], V[r + 4 >> 2], V[r + 8 >> 2])
                },
                emscripten_glVertexAttrib4f: function(e, r, t, n, i) {
                    Or.vertexAttrib4f(e, r, t, n, i)
                },
                emscripten_glVertexAttrib4fv: function(e, r) {
                    Or.vertexAttrib4f(e, V[r >> 2], V[r + 4 >> 2], V[r + 8 >> 2], V[r + 12 >> 2])
                },
                emscripten_glVertexAttribDivisor: function(e, r) {
                    Or.vertexAttribDivisor(e, r)
                },
                emscripten_glVertexAttribDivisorANGLE: function(e, r) {
                    Or.vertexAttribDivisor(e, r)
                },
                emscripten_glVertexAttribDivisorARB: function(e, r) {
                    Or.vertexAttribDivisor(e, r)
                },
                emscripten_glVertexAttribDivisorEXT: function(e, r) {
                    Or.vertexAttribDivisor(e, r)
                },
                emscripten_glVertexAttribDivisorNV: function(e, r) {
                    Or.vertexAttribDivisor(e, r)
                },
                emscripten_glVertexAttribI4i: function(e, r, t, n, i) {
                    Or.vertexAttribI4i(e, r, t, n, i)
                },
                emscripten_glVertexAttribI4iv: function(e, r) {
                    Or.vertexAttribI4i(e, q[r >> 2], q[r + 4 >> 2], q[r + 8 >> 2], q[r + 12 >> 2])
                },
                emscripten_glVertexAttribI4ui: function(e, r, t, n, i) {
                    Or.vertexAttribI4ui(e, r, t, n, i)
                },
                emscripten_glVertexAttribI4uiv: function(e, r) {
                    Or.vertexAttribI4ui(e, Q[r >> 2], Q[r + 4 >> 2], Q[r + 8 >> 2], Q[r + 12 >> 2])
                },
                emscripten_glVertexAttribIPointer: function(e, r, t, n, i) {
                    Or.vertexAttribIPointer(e, r, t, n, i)
                },
                emscripten_glVertexAttribPointer: function(e, r, t, n, i, a) {
                    Or.vertexAttribPointer(e, r, t, !!n, i, a)
                },
                emscripten_glViewport: function(e, r, t, n) {
                    Or.viewport(e, r, t, n)
                },
                emscripten_glWaitSync: function(e, r, t, n) {
                    Or.waitSync(Ue.syncs[e], r, rr(t, n))
                },
                emscripten_has_asyncify: function() {
                    return 0
                },
                emscripten_is_main_browser_thread: function() {
                    return !0
                },
                emscripten_log: function(e, r, t) {
                    for (var n = "", i = function(e, r) {
                            var t = e,
                                n = r;

                            function i(e) {
                                var r;
                                return n = function(e, r) {
                                    return "double" !== r && "i64" !== r || 7 & e && (e += 4), e
                                }(n, e), "double" === e ? (r = X[n >> 3], n += 8) : "i64" == e ? (r = [q[n >> 2], q[n + 4 >> 2]], n += 8) : (e = "i32", r = q[n >> 2], n += 4), r
                            }
                            for (var a, o, u, s, c = [];;) {
                                var l = t;
                                if (0 === (a = O[t >> 0])) break;
                                if (o = O[t + 1 >> 0], 37 == a) {
                                    var f = !1,
                                        d = !1,
                                        m = !1,
                                        p = !1,
                                        v = !1;
                                    e: for (;;) {
                                        switch (o) {
                                            case 43:
                                                f = !0;
                                                break;
                                            case 45:
                                                d = !0;
                                                break;
                                            case 35:
                                                m = !0;
                                                break;
                                            case 48:
                                                if (p) break e;
                                                p = !0;
                                                break;
                                            case 32:
                                                v = !0;
                                                break;
                                            default:
                                                break e
                                        }
                                        t++, o = O[t + 1 >> 0]
                                    }
                                    var g = 0;
                                    if (42 == o) g = i("i32"), t++, o = O[t + 1 >> 0];
                                    else
                                        for (; o >= 48 && o <= 57;) g = 10 * g + (o - 48), t++, o = O[t + 1 >> 0];
                                    var h, _ = !1,
                                        b = -1;
                                    if (46 == o) {
                                        if (b = 0, _ = !0, t++, 42 == (o = O[t + 1 >> 0])) b = i("i32"), t++;
                                        else
                                            for (;;) {
                                                var y = O[t + 1 >> 0];
                                                if (y < 48 || y > 57) break;
                                                b = 10 * b + (y - 48), t++
                                            }
                                        o = O[t + 1 >> 0]
                                    }
                                    switch (b < 0 && (b = 6, _ = !1), String.fromCharCode(o)) {
                                        case "h":
                                            104 == O[t + 2 >> 0] ? (t++, h = 1) : h = 2;
                                            break;
                                        case "l":
                                            108 == O[t + 2 >> 0] ? (t++, h = 8) : h = 4;
                                            break;
                                        case "L":
                                        case "q":
                                        case "j":
                                            h = 8;
                                            break;
                                        case "z":
                                        case "t":
                                        case "I":
                                            h = 4;
                                            break;
                                        default:
                                            h = null
                                    }
                                    switch (h && t++, o = O[t + 1 >> 0], String.fromCharCode(o)) {
                                        case "d":
                                        case "i":
                                        case "u":
                                        case "o":
                                        case "x":
                                        case "X":
                                        case "p":
                                            var w = 100 == o || 105 == o;
                                            u = i("i" + 8 * (h = h || 4)), 8 == h && (u = 117 == o ? (u[0] >>> 0) + 4294967296 * (u[1] >>> 0) : rr(u[0], u[1])), h <= 4 && (u = (w ? ie : ne)(u & Math.pow(256, h) - 1, 8 * h));
                                            var E = Math.abs(u),
                                                x = "";
                                            if (100 == o || 105 == o) S = ie(u, 8 * h).toString(10);
                                            else if (117 == o) S = ne(u, 8 * h).toString(10), u = Math.abs(u);
                                            else if (111 == o) S = (m ? "0" : "") + E.toString(8);
                                            else if (120 == o || 88 == o) {
                                                if (x = m && 0 != u ? "0x" : "", u < 0) {
                                                    u = -u, S = (E - 1).toString(16);
                                                    for (var k = [], C = 0; C < S.length; C++) k.push((15 - parseInt(S[C], 16)).toString(16));
                                                    for (S = k.join(""); S.length < 2 * h;) S = "f" + S
                                                } else S = E.toString(16);
                                                88 == o && (x = x.toUpperCase(), S = S.toUpperCase())
                                            } else 112 == o && (0 === E ? S = "(nil)" : (x = "0x", S = E.toString(16)));
                                            if (_)
                                                for (; S.length < b;) S = "0" + S;
                                            for (u >= 0 && (f ? x = "+" + x : v && (x = " " + x)), "-" == S.charAt(0) && (x = "-" + x, S = S.substr(1)); x.length + S.length < g;) d ? S += " " : p ? S = "0" + S : x = " " + x;
                                            (S = x + S).split("").forEach((function(e) {
                                                c.push(e.charCodeAt(0))
                                            }));
                                            break;
                                        case "f":
                                        case "F":
                                        case "e":
                                        case "E":
                                        case "g":
                                        case "G":
                                            var S;
                                            if (u = i("double"), isNaN(u)) S = "nan", p = !1;
                                            else if (isFinite(u)) {
                                                var D = !1,
                                                    F = Math.min(b, 20);
                                                if (103 == o || 71 == o) {
                                                    D = !0, b = b || 1;
                                                    var A = parseInt(u.toExponential(F).split("e")[1], 10);
                                                    b > A && A >= -4 ? (o = (103 == o ? "f" : "F").charCodeAt(0), b -= A + 1) : (o = (103 == o ? "e" : "E").charCodeAt(0), b--), F = Math.min(b, 20)
                                                }
                                                101 == o || 69 == o ? (S = u.toExponential(F), /[eE][-+]\d$/.test(S) && (S = S.slice(0, -1) + "0" + S.slice(-1))) : 102 != o && 70 != o || (S = u.toFixed(F), 0 === u && ((s = u) < 0 || 0 === s && 1 / s == -1 / 0) && (S = "-" + S));
                                                var P = S.split("e");
                                                if (D && !m)
                                                    for (; P[0].length > 1 && -1 != P[0].indexOf(".") && ("0" == P[0].slice(-1) || "." == P[0].slice(-1));) P[0] = P[0].slice(0, -1);
                                                else
                                                    for (m && -1 == S.indexOf(".") && (P[0] += "."); b > F++;) P[0] += "0";
                                                S = P[0] + (P.length > 1 ? "e" + P[1] : ""), 69 == o && (S = S.toUpperCase()), u >= 0 && (f ? S = "+" + S : v && (S = " " + S))
                                            } else S = (u < 0 ? "-" : "") + "inf", p = !1;
                                            for (; S.length < g;) d ? S += " " : S = !p || "-" != S[0] && "+" != S[0] ? (p ? "0" : " ") + S : S[0] + "0" + S.slice(1);
                                            o < 97 && (S = S.toUpperCase()), S.split("").forEach((function(e) {
                                                c.push(e.charCodeAt(0))
                                            }));
                                            break;
                                        case "s":
                                            var T = i("i8*"),
                                                L = T ? Yr(T) : "(null)".length;
                                            if (_ && (L = Math.min(L, b)), !d)
                                                for (; L < g--;) c.push(32);
                                            if (T)
                                                for (C = 0; C < L; C++) c.push(G[T++ >> 0]);
                                            else c = c.concat(Qr("(null)".substr(0, L), !0));
                                            if (d)
                                                for (; L < g--;) c.push(32);
                                            break;
                                        case "c":
                                            for (d && c.push(i("i8")); --g > 0;) c.push(32);
                                            d || c.push(i("i8"));
                                            break;
                                        case "n":
                                            var I = i("i32*");
                                            q[I >> 2] = c.length;
                                            break;
                                        case "%":
                                            c.push(a);
                                            break;
                                        default:
                                            for (C = l; C < t + 2; C++) c.push(O[C >> 0])
                                    }
                                    t += 2
                                } else c.push(a), t += 1
                            }
                            return c
                        }(r, t), a = 0; a < i.length; ++a) n += String.fromCharCode(i[a]);
                    gr(e, n)
                },
                emscripten_longjmp: function(e, r) {
                    ! function(e, r) {
                        throw nt(e, r || 1), "longjmp"
                    }(e, r)
                },
                emscripten_memcpy_big: function(e, r, t) {
                    G.copyWithin(e, r, r + t)
                },
                emscripten_request_fullscreen_strategy: function(e, r, t) {
                    return function(e, r) {
                        return Oe.fullscreenEnabled() ? (e = ze(e)) ? e.requestFullscreen || e.webkitRequestFullscreen ? Oe.canPerformEventHandlerRequests() ? Ke(e, r) : r.deferUntilInEventHandler ? (Oe.deferCall(Ke, 1, [e, r]), 1) : -2 : -3 : -4 : -1
                    }(e, {
                        scaleMode: q[t >> 2],
                        canvasResolutionScaleMode: q[t + 4 >> 2],
                        filteringMode: q[t + 8 >> 2],
                        deferUntilInEventHandler: r,
                        canvasResizedCallback: q[t + 12 >> 2],
                        canvasResizedCallbackUserData: q[t + 16 >> 2]
                    })
                },
                emscripten_request_pointerlock: function(e, r) {
                    return (e = ze(e)) ? e.requestPointerLock || e.msRequestPointerLock ? Oe.canPerformEventHandlerRequests() ? $e(e) : r ? (Oe.deferCall($e, 2, [e]), 1) : -2 : -1 : -4
                },
                emscripten_resize_heap: function(e) {
                    e >>>= 0;
                    var r = G.length,
                        t = 2147483648;
                    if (e > t) return !1;
                    for (var n, i, a = 1; a <= 4; a *= 2) {
                        var o = r * (1 + .2 / a);
                        if (o = Math.min(o, e + 100663296), _r(Math.min(t, ((n = Math.max(16777216, e, o)) % (i = 65536) > 0 && (n += i - n % i), n)))) return !0
                    }
                    return !1
                },
                emscripten_sample_gamepad_data: function() {
                    return (Oe.lastGamepadState = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null) ? 0 : -1
                },
                emscripten_set_beforeunload_callback_on_thread: function(e, r, t) {
                    return "undefined" == typeof onbeforeunload ? -1 : 1 !== t ? -5 : (function(e, r, t, n, i, a) {
                        var o = {
                            target: ze(e),
                            eventTypeString: a,
                            callbackfunc: n,
                            handlerFunc: function(e) {
                                var t = e || event,
                                    a = mt(n, i, 0, r);
                                if (a && (a = L(a)), a) return t.preventDefault(), t.returnValue = a, a
                            },
                            useCapture: t
                        };
                        Oe.registerOrRemoveHandler(o)
                    }(2, e, !0, r, 28, "beforeunload"), 0)
                },
                emscripten_set_blur_callback_on_thread: function(e, r, t, n, i) {
                    return br(e, r, t, n, 12, "blur"), 0
                },
                emscripten_set_canvas_element_id: function(e) {
                    if (r.gid = L(e), window.dataLayer) r.ga = function() {
                        window.dataLayer.push(arguments)
                    };
                    else {
                        const e = document.createElement("script");
                        e.async = 1, e.src = "//www.googletagmanager.com/gtag/js?id=" + r.gid, document.head.append(e), window.dataLayer = window.dataLayer || [], r.ga = function() {
                            window.dataLayer.push(arguments)
                        }, r.ga("js", new Date)
                    }
                    r.ga("config", r.gid, {
                        send_page_view: !1
                    })
                },
                emscripten_set_canvas_element_size: Xe,
                emscripten_set_element_css_size: function(e, r, t) {
                    return (e = ze(e)) ? (e.style.width = r + "px", e.style.height = t + "px", 0) : -4
                },
                emscripten_set_focus_callback_on_thread: function(e, r, t, n, i) {
                    return br(e, r, t, n, 13, "focus"), 0
                },
                emscripten_set_fullscreenchange_callback_on_thread: function(e, r, t, n, i) {
                    return Oe.fullscreenEnabled() ? (e = ze(e)) ? (yr(e, r, t, n, 19, "fullscreenchange"), yr(e, r, t, n, 19, "webkitfullscreenchange"), 0) : -4 : -1
                },
                emscripten_set_gamepadconnected_callback_on_thread: function(e, r, t, n) {
                    return navigator.getGamepads || navigator.webkitGetGamepads ? (wr(2, e, r, t, 26, "gamepadconnected"), 0) : -1
                },
                emscripten_set_gamepaddisconnected_callback_on_thread: function(e, r, t, n) {
                    return navigator.getGamepads || navigator.webkitGetGamepads ? (wr(2, e, r, t, 27, "gamepaddisconnected"), 0) : -1
                },
                emscripten_set_keydown_callback_on_thread: function(e, r, t, n, i) {
                    return Er(e, r, t, n, 2, "keydown"), 0
                },
                emscripten_set_keypress_callback_on_thread: function(e, r, t, n, i) {
                    return Er(e, r, t, n, 1, "keypress"), 0
                },
                emscripten_set_keyup_callback_on_thread: function(e, r, t, n, i) {
                    return Er(e, r, t, n, 3, "keyup"), 0
                },
                emscripten_set_main_loop_arg: function(e, r, t, n) {
                    Ie(e, t, n, r)
                },
                emscripten_set_mousedown_callback_on_thread: function(e, r, t, n, i) {
                    return kr(e, r, t, n, 5, "mousedown"), 0
                },
                emscripten_set_mouseenter_callback_on_thread: function(e, r, t, n, i) {
                    return kr(e, r, t, n, 33, "mouseenter"), 0
                },
                emscripten_set_mouseleave_callback_on_thread: function(e, r, t, n, i) {
                    return kr(e, r, t, n, 34, "mouseleave"), 0
                },
                emscripten_set_mousemove_callback_on_thread: function(e, r, t, n, i) {
                    return kr(e, r, t, n, 8, "mousemove"), 0
                },
                emscripten_set_mouseup_callback_on_thread: function(e, r, t, n, i) {
                    return kr(e, r, t, n, 6, "mouseup"), 0
                },
                emscripten_set_pointerlockchange_callback_on_thread: function(e, r, t, n, i) {
                    return document && document.body && (document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock) ? (e = ze(e)) ? (Cr(e, r, t, n, 20, "pointerlockchange"), Cr(e, r, t, n, 20, "mozpointerlockchange"), Cr(e, r, t, n, 20, "webkitpointerlockchange"), Cr(e, r, t, n, 20, "mspointerlockchange"), 0) : -4 : -1
                },
                emscripten_set_resize_callback_on_thread: function(e, r, t, n, i) {
                    return function(e, r, t, n, i, a, o) {
                        Oe.uiEvent || (Oe.uiEvent = Zr(36));
                        var u = {
                            target: e = ze(e),
                            eventTypeString: a,
                            callbackfunc: n,
                            handlerFunc: function(t) {
                                var a = t || event;
                                if (a.target == e) {
                                    var o = Oe.uiEvent,
                                        u = document.body;
                                    q[o >> 2] = a.detail, q[o + 4 >> 2] = u.clientWidth, q[o + 8 >> 2] = u.clientHeight, q[o + 12 >> 2] = innerWidth, q[o + 16 >> 2] = innerHeight, q[o + 20 >> 2] = outerWidth, q[o + 24 >> 2] = outerHeight, q[o + 28 >> 2] = pageXOffset, q[o + 32 >> 2] = pageYOffset, mt(n, i, o, r) && a.preventDefault()
                                }
                            },
                            useCapture: t
                        };
                        Oe.registerOrRemoveHandler(u)
                    }(e, r, t, n, 10, "resize"), 0
                },
                emscripten_set_touchcancel_callback_on_thread: function(e, r, t, n, i) {
                    return Sr(e, r, t, n, 25, "touchcancel"), 0
                },
                emscripten_set_touchend_callback_on_thread: function(e, r, t, n, i) {
                    return Sr(e, r, t, n, 23, "touchend"), 0
                },
                emscripten_set_touchmove_callback_on_thread: function(e, r, t, n, i) {
                    return Sr(e, r, t, n, 24, "touchmove"), 0
                },
                emscripten_set_touchstart_callback_on_thread: function(e, r, t, n, i) {
                    return Sr(e, r, t, n, 22, "touchstart"), 0
                },
                emscripten_set_visibilitychange_callback_on_thread: function(e, r, t, n) {
                    return Dr(je[1], e, r, t, 21, "visibilitychange"), 0
                },
                emscripten_set_wheel_callback_on_thread: function(e, r, t, n, i) {
                    return void 0 !== (e = ze(e)).onwheel ? (Fr(e, r, t, n, 9, "wheel"), 0) : void 0 !== e.onmousewheel ? (Fr(e, r, t, n, 9, "mousewheel"), 0) : -1
                },
                emscripten_sleep: function() {
                    throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep"
                },
                emscripten_start_fetch: function(e, r, t, n, i) {
                    void 0 !== y && (y = !0);
                    var a = e + 112,
                        o = L(a),
                        u = Q[a + 36 >> 2],
                        s = Q[a + 40 >> 2],
                        c = Q[a + 44 >> 2],
                        l = Q[a + 48 >> 2],
                        f = Q[a + 52 >> 2],
                        d = !!(4 & f),
                        m = !!(32 & f),
                        p = !!(16 & f),
                        v = function(e, t, n) {
                            u ? it(u, e) : r && r(e)
                        },
                        g = function(e, r, t) {
                            c ? it(c, e) : n && n(e)
                        },
                        h = function(e, r, n) {
                            s ? it(s, e) : t && t(e)
                        },
                        _ = function(e, r, t) {
                            l ? it(l, e) : i && i(e)
                        },
                        b = function(e, t, n) {
                            Tr(Ar.dbInstance, e, t.response, (function(e, t, n) {
                                u ? it(u, e) : r && r(e)
                            }), (function(e, t, n) {
                                u ? it(u, e) : r && r(e)
                            }))
                        };
                    if ("EM_IDB_STORE" === o) {
                        var w = Q[a + 84 >> 2];
                        Tr(Ar.dbInstance, e, G.slice(w, w + Q[a + 88 >> 2]), v, h)
                    } else if ("EM_IDB_DELETE" === o) ! function(e, r, t, n) {
                        if (e) {
                            var i = Q[r + 112 + 64 >> 2];
                            i || (i = Q[r + 8 >> 2]);
                            var a = L(i);
                            try {
                                var o = e.transaction(["FILES"], "readwrite").objectStore("FILES").delete(a);
                                o.onsuccess = function(e) {
                                    var n = e.target.result;
                                    Q[r + 12 >> 2] = 0, Ar.setu64(r + 16, 0), Ar.setu64(r + 24, 0), Ar.setu64(r + 32, 0), z[r + 40 >> 1] = 4, z[r + 42 >> 1] = 200, B("OK", r + 44, 64), t(r, 0, n)
                                }, o.onerror = function(e) {
                                    z[r + 40 >> 1] = 4, z[r + 42 >> 1] = 404, B("Not Found", r + 44, 64), n(r, 0, e)
                                }
                            } catch (e) {
                                n(r, 0, e)
                            }
                        } else n(r, 0, "IndexedDB not available!")
                    }(Ar.dbInstance, e, v, h);
                    else if (p) {
                        if (m) return 0;
                        Pr(e, d ? b : v, h, g, _)
                    } else ! function(e, r, t, n) {
                        if (e) {
                            var i = Q[r + 112 + 64 >> 2];
                            i || (i = Q[r + 8 >> 2]);
                            var a = L(i);
                            try {
                                var o = e.transaction(["FILES"], "readonly").objectStore("FILES").get(a);
                                o.onsuccess = function(e) {
                                    if (e.target.result) {
                                        var i = e.target.result,
                                            a = i.byteLength || i.length,
                                            o = Zr(a);
                                        G.set(new Uint8Array(i), o), Q[r + 12 >> 2] = o, Ar.setu64(r + 16, a), Ar.setu64(r + 24, 0), Ar.setu64(r + 32, a), z[r + 40 >> 1] = 4, z[r + 42 >> 1] = 200, B("OK", r + 44, 64), t(r, 0, i)
                                    } else z[r + 40 >> 1] = 4, z[r + 42 >> 1] = 404, B("Not Found", r + 44, 64), n(r, 0, "no data")
                                }, o.onerror = function(e) {
                                    z[r + 40 >> 1] = 4, z[r + 42 >> 1] = 404, B("Not Found", r + 44, 64), n(r, 0, e)
                                }
                            } catch (e) {
                                n(r, 0, e)
                            }
                        } else n(r, 0, "IndexedDB not available!")
                    }(Ar.dbInstance, e, v, m ? h : d ? function(e, r, t) {
                        Pr(e, b, h, g, _)
                    } : function(e, r, t) {
                        Pr(e, v, h, g, _)
                    });
                    return e
                },
                environ_get: function(e, r) {
                    var t = 0;
                    return Ir().forEach((function(n, i) {
                        var a = r + t;
                        q[e + 4 * i >> 2] = a,
                            function(e, r, t) {
                                for (var n = 0; n < e.length; ++n) O[r++ >> 0] = e.charCodeAt(n);
                                t || (O[r >> 0] = 0)
                            }(n, a), t += n.length + 1
                    })), 0
                },
                environ_sizes_get: function(e, r) {
                    var t = Ir();
                    q[e >> 2] = t.length;
                    var n = 0;
                    return t.forEach((function(e) {
                        n += e.length + 1
                    })), q[r >> 2] = n, 0
                },
                exit: function(e) {
                    Ct(e)
                },
                fd_close: function(e) {
                    try {
                        var r = Te.getStreamFromFD(e);
                        return Pe.close(r), 0
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), e.errno
                    }
                },
                fd_fdstat_get: function(e, r) {
                    try {
                        var t = Te.getStreamFromFD(e),
                            n = t.tty ? 2 : Pe.isDir(t.mode) ? 3 : Pe.isLink(t.mode) ? 7 : 4;
                        return O[r >> 0] = n, 0
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), e.errno
                    }
                },
                fd_read: function(e, r, t, n) {
                    try {
                        var i = Te.getStreamFromFD(e),
                            a = Te.doReadv(i, r, t);
                        return q[n >> 2] = a, 0
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), e.errno
                    }
                },
                fd_seek: function(e, r, t, n, i) {
                    try {
                        var a = Te.getStreamFromFD(e),
                            o = 4294967296 * t + (r >>> 0),
                            u = 9007199254740992;
                        return o <= -u || o >= u ? -61 : (Pe.llseek(a, o, n), _e = [a.position >>> 0, (he = a.position, +ae(he) >= 1 ? he > 0 ? (0 | se(+ue(he / 4294967296), 4294967295)) >>> 0 : ~~+oe((he - +(~~he >>> 0)) / 4294967296) >>> 0 : 0)], q[i >> 2] = _e[0], q[i + 4 >> 2] = _e[1], a.getdents && 0 === o && 0 === n && (a.getdents = null), 0)
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), e.errno
                    }
                },
                fd_write: function(e, r, t, n) {
                    try {
                        var i = Te.getStreamFromFD(e),
                            a = Te.doWritev(i, r, t);
                        return q[n >> 2] = a, 0
                    } catch (e) {
                        return void 0 !== Pe && e instanceof Pe.ErrnoError || pe(e), e.errno
                    }
                },
                getCanvasPaddingLeft: function() {
                    return r.canvas.style.paddingLeft
                },
                getCanvasPaddingTop: function() {
                    return r.canvas.style.paddingTop
                },
                getTempRet0: function() {
                    return 0 | E
                },
                gettimeofday: function(e) {
                    var r = Date.now();
                    return q[e >> 2] = r / 1e3 | 0, q[e + 4 >> 2] = r % 1e3 * 1e3 | 0, 0
                },
                glActiveTexture: function(e) {
                    Or.activeTexture(e)
                },
                glAttachShader: function(e, r) {
                    Or.attachShader(Ue.programs[e], Ue.shaders[r])
                },
                glBindAttribLocation: function(e, r, t) {
                    Or.bindAttribLocation(Ue.programs[e], r, L(t))
                },
                glBindBuffer: function(e, r) {
                    35051 == e ? Or.currentPixelPackBufferBinding = r : 35052 == e && (Or.currentPixelUnpackBufferBinding = r), Or.bindBuffer(e, Ue.buffers[r])
                },
                glBindFramebuffer: function(e, r) {
                    Or.bindFramebuffer(e, Ue.framebuffers[r])
                },
                glBindRenderbuffer: function(e, r) {
                    Or.bindRenderbuffer(e, Ue.renderbuffers[r])
                },
                glBindTexture: function(e, r) {
                    Or.bindTexture(e, Ue.textures[r])
                },
                glBlendEquation: function(e) {
                    Or.blendEquation(e)
                },
                glBlendEquationSeparate: function(e, r) {
                    Or.blendEquationSeparate(e, r)
                },
                glBlendFunc: function(e, r) {
                    Or.blendFunc(e, r)
                },
                glBlendFuncSeparate: function(e, r, t, n) {
                    Or.blendFuncSeparate(e, r, t, n)
                },
                glBufferData: function(e, r, t, n) {
                    Ue.currentContext.version >= 2 ? t ? Or.bufferData(e, G, n, t, r) : Or.bufferData(e, r, n) : Or.bufferData(e, t ? G.subarray(t, t + r) : r, n)
                },
                glBufferSubData: function(e, r, t, n) {
                    Ue.currentContext.version >= 2 ? Or.bufferSubData(e, r, G, n, t) : Or.bufferSubData(e, r, G.subarray(n, n + t))
                },
                glCheckFramebufferStatus: function(e) {
                    return Or.checkFramebufferStatus(e)
                },
                glClear: function(e) {
                    Or.clear(e)
                },
                glClearColor: function(e, r, t, n) {
                    Or.clearColor(e, r, t, n)
                },
                glColorMask: function(e, r, t, n) {
                    Or.colorMask(!!e, !!r, !!t, !!n)
                },
                glCompileShader: function(e) {
                    Or.compileShader(Ue.shaders[e])
                },
                glCompressedTexImage2D: function(e, r, t, n, i, a, o, u) {
                    Ue.currentContext.version >= 2 ? Or.currentPixelUnpackBufferBinding ? Or.compressedTexImage2D(e, r, t, n, i, a, o, u) : Or.compressedTexImage2D(e, r, t, n, i, a, G, u, o) : Or.compressedTexImage2D(e, r, t, n, i, a, u ? G.subarray(u, u + o) : null)
                },
                glCreateProgram: function() {
                    var e = Ue.getNewId(Ue.programs),
                        r = Or.createProgram();
                    return r.name = e, Ue.programs[e] = r, e
                },
                glCreateShader: function(e) {
                    var r = Ue.getNewId(Ue.shaders);
                    return Ue.shaders[r] = Or.createShader(e), r
                },
                glDeleteBuffers: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.buffers[n];
                        i && (Or.deleteBuffer(i), i.name = 0, Ue.buffers[n] = null, n == Ue.currArrayBuffer && (Ue.currArrayBuffer = 0), n == Ue.currElementArrayBuffer && (Ue.currElementArrayBuffer = 0), n == Or.currentPixelPackBufferBinding && (Or.currentPixelPackBufferBinding = 0), n == Or.currentPixelUnpackBufferBinding && (Or.currentPixelUnpackBufferBinding = 0))
                    }
                },
                glDeleteFramebuffers: function(e, r) {
                    for (var t = 0; t < e; ++t) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.framebuffers[n];
                        i && (Or.deleteFramebuffer(i), i.name = 0, Ue.framebuffers[n] = null)
                    }
                },
                glDeleteProgram: function(e) {
                    if (e) {
                        var r = Ue.programs[e];
                        r ? (Or.deleteProgram(r), r.name = 0, Ue.programs[e] = null, Ue.programInfos[e] = null) : Ue.recordError(1281)
                    }
                },
                glDeleteRenderbuffers: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.renderbuffers[n];
                        i && (Or.deleteRenderbuffer(i), i.name = 0, Ue.renderbuffers[n] = null)
                    }
                },
                glDeleteShader: function(e) {
                    if (e) {
                        var r = Ue.shaders[e];
                        r ? (Or.deleteShader(r), Ue.shaders[e] = null) : Ue.recordError(1281)
                    }
                },
                glDeleteTextures: function(e, r) {
                    for (var t = 0; t < e; t++) {
                        var n = q[r + 4 * t >> 2],
                            i = Ue.textures[n];
                        i && (Or.deleteTexture(i), i.name = 0, Ue.textures[n] = null)
                    }
                },
                glDetachShader: function(e, r) {
                    Or.detachShader(Ue.programs[e], Ue.shaders[r])
                },
                glDisable: function(e) {
                    Or.disable(e)
                },
                glDisableVertexAttribArray: function(e) {
                    Or.disableVertexAttribArray(e)
                },
                glDrawArrays: function(e, r, t) {
                    Or.drawArrays(e, r, t)
                },
                glDrawElements: nr,
                glEnable: function(e) {
                    Or.enable(e)
                },
                glEnableVertexAttribArray: function(e) {
                    Or.enableVertexAttribArray(e)
                },
                glFramebufferRenderbuffer: function(e, r, t, n) {
                    Or.framebufferRenderbuffer(e, r, t, Ue.renderbuffers[n])
                },
                glFramebufferTexture2D: function(e, r, t, n, i) {
                    Or.framebufferTexture2D(e, r, t, Ue.textures[n], i)
                },
                glFrontFace: function(e) {
                    Or.frontFace(e)
                },
                glGenBuffers: function(e, r) {
                    ir(e, r, "createBuffer", Ue.buffers)
                },
                glGenFramebuffers: function(e, r) {
                    ir(e, r, "createFramebuffer", Ue.framebuffers)
                },
                glGenRenderbuffers: function(e, r) {
                    ir(e, r, "createRenderbuffer", Ue.renderbuffers)
                },
                glGenTextures: function(e, r) {
                    ir(e, r, "createTexture", Ue.textures)
                },
                glGetActiveAttrib: function(e, r, t, n, i, a, o) {
                    e = Ue.programs[e];
                    var u = Or.getActiveAttrib(e, r);
                    if (u) {
                        var s = t > 0 && o ? B(u.name, o, t) : 0;
                        n && (q[n >> 2] = s), i && (q[i >> 2] = u.size), a && (q[a >> 2] = u.type)
                    }
                },
                glGetActiveUniform: function(e, r, t, n, i, a, o) {
                    e = Ue.programs[e];
                    var u = Or.getActiveUniform(e, r);
                    if (u) {
                        var s = t > 0 && o ? B(u.name, o, t) : 0;
                        n && (q[n >> 2] = s), i && (q[i >> 2] = u.size), a && (q[a >> 2] = u.type)
                    }
                },
                glGetAttribLocation: function(e, r) {
                    return Or.getAttribLocation(Ue.programs[e], L(r))
                },
                glGetError: function() {
                    var e = Or.getError() || Ue.lastError;
                    return Ue.lastError = 0, e
                },
                glGetFramebufferAttachmentParameteriv: function(e, r, t, n) {
                    var i = Or.getFramebufferAttachmentParameter(e, r, t);
                    (i instanceof WebGLRenderbuffer || i instanceof WebGLTexture) && (i = 0 | i.name), q[n >> 2] = i
                },
                glGetIntegerv: function(e, r) {
                    or(e, r, 0)
                },
                glGetProgramInfoLog: function(e, r, t, n) {
                    var i = Or.getProgramInfoLog(Ue.programs[e]);
                    null === i && (i = "(unknown error)");
                    var a = r > 0 && n ? B(i, n, r) : 0;
                    t && (q[t >> 2] = a)
                },
                glGetProgramiv: function(e, r, t) {
                    if (t)
                        if (e >= Ue.counter) Ue.recordError(1281);
                        else {
                            var n = Ue.programInfos[e];
                            if (n)
                                if (35716 == r) {
                                    var i = Or.getProgramInfoLog(Ue.programs[e]);
                                    null === i && (i = "(unknown error)"), q[t >> 2] = i.length + 1
                                } else if (35719 == r) q[t >> 2] = n.maxUniformLength;
                            else if (35722 == r) {
                                if (-1 == n.maxAttributeLength) {
                                    e = Ue.programs[e];
                                    var a = Or.getProgramParameter(e, 35721);
                                    n.maxAttributeLength = 0;
                                    for (var o = 0; o < a; ++o) {
                                        var u = Or.getActiveAttrib(e, o);
                                        n.maxAttributeLength = Math.max(n.maxAttributeLength, u.name.length + 1)
                                    }
                                }
                                q[t >> 2] = n.maxAttributeLength
                            } else if (35381 == r) {
                                if (-1 == n.maxUniformBlockNameLength) {
                                    e = Ue.programs[e];
                                    var s = Or.getProgramParameter(e, 35382);
                                    n.maxUniformBlockNameLength = 0;
                                    for (o = 0; o < s; ++o) {
                                        var c = Or.getActiveUniformBlockName(e, o);
                                        n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, c.length + 1)
                                    }
                                }
                                q[t >> 2] = n.maxUniformBlockNameLength
                            } else q[t >> 2] = Or.getProgramParameter(Ue.programs[e], r);
                            else Ue.recordError(1282)
                        }
                    else Ue.recordError(1281)
                },
                glGetShaderInfoLog: function(e, r, t, n) {
                    var i = Or.getShaderInfoLog(Ue.shaders[e]);
                    null === i && (i = "(unknown error)");
                    var a = r > 0 && n ? B(i, n, r) : 0;
                    t && (q[t >> 2] = a)
                },
                glGetShaderiv: function(e, r, t) {
                    if (t)
                        if (35716 == r) {
                            var n = Or.getShaderInfoLog(Ue.shaders[e]);
                            null === n && (n = "(unknown error)"), q[t >> 2] = n.length + 1
                        } else if (35720 == r) {
                        var i = Or.getShaderSource(Ue.shaders[e]),
                            a = null === i || 0 == i.length ? 0 : i.length + 1;
                        q[t >> 2] = a
                    } else q[t >> 2] = Or.getShaderParameter(Ue.shaders[e], r);
                    else Ue.recordError(1281)
                },
                glGetString: function(e) {
                    if (Ue.stringCache[e]) return Ue.stringCache[e];
                    var r;
                    switch (e) {
                        case 7939:
                            var t = Or.getSupportedExtensions() || [];
                            r = sr((t = t.concat(t.map((function(e) {
                                return "GL_" + e
                            })))).join(" "));
                            break;
                        case 7936:
                        case 7937:
                        case 37445:
                        case 37446:
                            var n = Or.getParameter(e);
                            n || Ue.recordError(1280), r = sr(n);
                            break;
                        case 7938:
                            var i = Or.getParameter(7938);
                            r = sr(i = Ue.currentContext.version >= 2 ? "OpenGL ES 3.0 (" + i + ")" : "OpenGL ES 2.0 (" + i + ")");
                            break;
                        case 35724:
                            var a = Or.getParameter(35724),
                                o = a.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                            null !== o && (3 == o[1].length && (o[1] = o[1] + "0"), a = "OpenGL ES GLSL ES " + o[1] + " (" + a + ")"), r = sr(a);
                            break;
                        default:
                            return Ue.recordError(1280), 0
                    }
                    return Ue.stringCache[e] = r, r
                },
                glGetUniformLocation: function(e, r) {
                    var t = 0;
                    if ("]" == (r = L(r))[r.length - 1]) {
                        var n = r.lastIndexOf("[");
                        t = "]" != r[n + 1] ? cr(r.slice(n + 1)) : 0, r = r.slice(0, n)
                    }
                    var i = Ue.programInfos[e] && Ue.programInfos[e].uniforms[r];
                    return i && t >= 0 && t < i[0] ? i[1] + t : -1
                },
                glIsEnabled: function(e) {
                    return Or.isEnabled(e)
                },
                glLineWidth: function(e) {
                    Or.lineWidth(e)
                },
                glLinkProgram: function(e) {
                    Or.linkProgram(Ue.programs[e]), Ue.populateUniformTable(e)
                },
                glPixelStorei: function(e, r) {
                    3317 == e && (Ue.unpackAlignment = r), Or.pixelStorei(e, r)
                },
                glReadPixels: function(e, r, t, n, i, a, o) {
                    if (Ue.currentContext.version >= 2)
                        if (Or.currentPixelPackBufferBinding) Or.readPixels(e, r, t, n, i, a, o);
                        else {
                            var u = dr(a);
                            Or.readPixels(e, r, t, n, i, a, u, o >> mr(u))
                        }
                    else {
                        var s = pr(a, i, t, n, o);
                        s ? Or.readPixels(e, r, t, n, i, a, s) : Ue.recordError(1280)
                    }
                },
                glRenderbufferStorage: function(e, r, t, n) {
                    Or.renderbufferStorage(e, r, t, n)
                },
                glScissor: function(e, r, t, n) {
                    Or.scissor(e, r, t, n)
                },
                glShaderBinary: function() {
                    Ue.recordError(1280)
                },
                glShaderSource: function(e, r, t, n) {
                    var i = Ue.getSource(e, r, t, n);
                    Or.shaderSource(Ue.shaders[e], i)
                },
                glStencilFunc: function(e, r, t) {
                    Or.stencilFunc(e, r, t)
                },
                glStencilOp: function(e, r, t) {
                    Or.stencilOp(e, r, t)
                },
                glTexImage2D: function(e, r, t, n, i, a, o, u, s) {
                    if (Ue.currentContext.version >= 2)
                        if (Or.currentPixelUnpackBufferBinding) Or.texImage2D(e, r, t, n, i, a, o, u, s);
                        else if (s) {
                        var c = dr(u);
                        Or.texImage2D(e, r, t, n, i, a, o, u, c, s >> mr(c))
                    } else Or.texImage2D(e, r, t, n, i, a, o, u, null);
                    else Or.texImage2D(e, r, t, n, i, a, o, u, s ? pr(u, o, n, i, s) : null)
                },
                glTexParameteri: function(e, r, t) {
                    Or.texParameteri(e, r, t)
                },
                glTexSubImage2D: function(e, r, t, n, i, a, o, u, s) {
                    if (Ue.currentContext.version >= 2)
                        if (Or.currentPixelUnpackBufferBinding) Or.texSubImage2D(e, r, t, n, i, a, o, u, s);
                        else if (s) {
                        var c = dr(u);
                        Or.texSubImage2D(e, r, t, n, i, a, o, u, c, s >> mr(c))
                    } else Or.texSubImage2D(e, r, t, n, i, a, o, u, null);
                    else {
                        var l = null;
                        s && (l = pr(u, o, i, a, s)), Or.texSubImage2D(e, r, t, n, i, a, o, u, l)
                    }
                },
                glUniform1f: function(e, r) {
                    Or.uniform1f(Ue.uniforms[e], r)
                },
                glUniform1fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform1fv(Ue.uniforms[e], V, t >> 2, r);
                    else {
                        if (r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferFloatViews[r - 1], i = 0; i < r; ++i) n[i] = V[t + 4 * i >> 2];
                        else n = V.subarray(t >> 2, t + 4 * r >> 2);
                        Or.uniform1fv(Ue.uniforms[e], n)
                    }
                },
                glUniform1i: function(e, r) {
                    Or.uniform1i(Ue.uniforms[e], r)
                },
                glUniform1iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform1iv(Ue.uniforms[e], q, t >> 2, r);
                    else {
                        if (r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[r - 1], i = 0; i < r; ++i) n[i] = q[t + 4 * i >> 2];
                        else n = q.subarray(t >> 2, t + 4 * r >> 2);
                        Or.uniform1iv(Ue.uniforms[e], n)
                    }
                },
                glUniform2f: function(e, r, t) {
                    Or.uniform2f(Ue.uniforms[e], r, t)
                },
                glUniform2fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform2fv(Ue.uniforms[e], V, t >> 2, 2 * r);
                    else {
                        if (2 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferFloatViews[2 * r - 1], i = 0; i < 2 * r; i += 2) n[i] = V[t + 4 * i >> 2], n[i + 1] = V[t + (4 * i + 4) >> 2];
                        else n = V.subarray(t >> 2, t + 8 * r >> 2);
                        Or.uniform2fv(Ue.uniforms[e], n)
                    }
                },
                glUniform2iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform2iv(Ue.uniforms[e], q, t >> 2, 2 * r);
                    else {
                        if (2 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[2 * r - 1], i = 0; i < 2 * r; i += 2) n[i] = q[t + 4 * i >> 2], n[i + 1] = q[t + (4 * i + 4) >> 2];
                        else n = q.subarray(t >> 2, t + 8 * r >> 2);
                        Or.uniform2iv(Ue.uniforms[e], n)
                    }
                },
                glUniform3fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform3fv(Ue.uniforms[e], V, t >> 2, 3 * r);
                    else {
                        if (3 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferFloatViews[3 * r - 1], i = 0; i < 3 * r; i += 3) n[i] = V[t + 4 * i >> 2], n[i + 1] = V[t + (4 * i + 4) >> 2], n[i + 2] = V[t + (4 * i + 8) >> 2];
                        else n = V.subarray(t >> 2, t + 12 * r >> 2);
                        Or.uniform3fv(Ue.uniforms[e], n)
                    }
                },
                glUniform3iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform3iv(Ue.uniforms[e], q, t >> 2, 3 * r);
                    else {
                        if (3 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[3 * r - 1], i = 0; i < 3 * r; i += 3) n[i] = q[t + 4 * i >> 2], n[i + 1] = q[t + (4 * i + 4) >> 2], n[i + 2] = q[t + (4 * i + 8) >> 2];
                        else n = q.subarray(t >> 2, t + 12 * r >> 2);
                        Or.uniform3iv(Ue.uniforms[e], n)
                    }
                },
                glUniform4f: function(e, r, t, n, i) {
                    Or.uniform4f(Ue.uniforms[e], r, t, n, i)
                },
                glUniform4fv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform4fv(Ue.uniforms[e], V, t >> 2, 4 * r);
                    else {
                        if (4 * r <= Ue.MINI_TEMP_BUFFER_SIZE) {
                            var n = Ue.miniTempBufferFloatViews[4 * r - 1],
                                i = V;
                            t >>= 2;
                            for (var a = 0; a < 4 * r; a += 4) {
                                var o = t + a;
                                n[a] = i[o], n[a + 1] = i[o + 1], n[a + 2] = i[o + 2], n[a + 3] = i[o + 3]
                            }
                        } else n = V.subarray(t >> 2, t + 16 * r >> 2);
                        Or.uniform4fv(Ue.uniforms[e], n)
                    }
                },
                glUniform4iv: function(e, r, t) {
                    if (Ue.currentContext.version >= 2) Or.uniform4iv(Ue.uniforms[e], q, t >> 2, 4 * r);
                    else {
                        if (4 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var n = Ue.miniTempBufferIntViews[4 * r - 1], i = 0; i < 4 * r; i += 4) n[i] = q[t + 4 * i >> 2], n[i + 1] = q[t + (4 * i + 4) >> 2], n[i + 2] = q[t + (4 * i + 8) >> 2], n[i + 3] = q[t + (4 * i + 12) >> 2];
                        else n = q.subarray(t >> 2, t + 16 * r >> 2);
                        Or.uniform4iv(Ue.uniforms[e], n)
                    }
                },
                glUniformMatrix2fv: function(e, r, t, n) {
                    if (Ue.currentContext.version >= 2) Or.uniformMatrix2fv(Ue.uniforms[e], !!t, V, n >> 2, 4 * r);
                    else {
                        if (4 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var i = Ue.miniTempBufferFloatViews[4 * r - 1], a = 0; a < 4 * r; a += 4) i[a] = V[n + 4 * a >> 2], i[a + 1] = V[n + (4 * a + 4) >> 2], i[a + 2] = V[n + (4 * a + 8) >> 2], i[a + 3] = V[n + (4 * a + 12) >> 2];
                        else i = V.subarray(n >> 2, n + 16 * r >> 2);
                        Or.uniformMatrix2fv(Ue.uniforms[e], !!t, i)
                    }
                },
                glUniformMatrix3fv: function(e, r, t, n) {
                    if (Ue.currentContext.version >= 2) Or.uniformMatrix3fv(Ue.uniforms[e], !!t, V, n >> 2, 9 * r);
                    else {
                        if (9 * r <= Ue.MINI_TEMP_BUFFER_SIZE)
                            for (var i = Ue.miniTempBufferFloatViews[9 * r - 1], a = 0; a < 9 * r; a += 9) i[a] = V[n + 4 * a >> 2], i[a + 1] = V[n + (4 * a + 4) >> 2], i[a + 2] = V[n + (4 * a + 8) >> 2], i[a + 3] = V[n + (4 * a + 12) >> 2], i[a + 4] = V[n + (4 * a + 16) >> 2], i[a + 5] = V[n + (4 * a + 20) >> 2], i[a + 6] = V[n + (4 * a + 24) >> 2], i[a + 7] = V[n + (4 * a + 28) >> 2], i[a + 8] = V[n + (4 * a + 32) >> 2];
                        else i = V.subarray(n >> 2, n + 36 * r >> 2);
                        Or.uniformMatrix3fv(Ue.uniforms[e], !!t, i)
                    }
                },
                glUniformMatrix4fv: function(e, r, t, n) {
                    if (Ue.currentContext.version >= 2) Or.uniformMatrix4fv(Ue.uniforms[e], !!t, V, n >> 2, 16 * r);
                    else {
                        if (16 * r <= Ue.MINI_TEMP_BUFFER_SIZE) {
                            var i = Ue.miniTempBufferFloatViews[16 * r - 1],
                                a = V;
                            n >>= 2;
                            for (var o = 0; o < 16 * r; o += 16) {
                                var u = n + o;
                                i[o] = a[u], i[o + 1] = a[u + 1], i[o + 2] = a[u + 2], i[o + 3] = a[u + 3], i[o + 4] = a[u + 4], i[o + 5] = a[u + 5], i[o + 6] = a[u + 6], i[o + 7] = a[u + 7], i[o + 8] = a[u + 8], i[o + 9] = a[u + 9], i[o + 10] = a[u + 10], i[o + 11] = a[u + 11], i[o + 12] = a[u + 12], i[o + 13] = a[u + 13], i[o + 14] = a[u + 14], i[o + 15] = a[u + 15]
                            }
                        } else i = V.subarray(n >> 2, n + 64 * r >> 2);
                        Or.uniformMatrix4fv(Ue.uniforms[e], !!t, i)
                    }
                },
                glUseProgram: function(e) {
                    Or.useProgram(Ue.programs[e])
                },
                glVertexAttrib1fv: function(e, r) {
                    Or.vertexAttrib1f(e, V[r >> 2])
                },
                glVertexAttrib2fv: function(e, r) {
                    Or.vertexAttrib2f(e, V[r >> 2], V[r + 4 >> 2])
                },
                glVertexAttrib3fv: function(e, r) {
                    Or.vertexAttrib3f(e, V[r >> 2], V[r + 4 >> 2], V[r + 8 >> 2])
                },
                glVertexAttrib4f: function(e, r, t, n, i) {
                    Or.vertexAttrib4f(e, r, t, n, i)
                },
                glVertexAttrib4fv: function(e, r) {
                    Or.vertexAttrib4f(e, V[r >> 2], V[r + 4 >> 2], V[r + 8 >> 2], V[r + 12 >> 2])
                },
                glVertexAttribPointer: function(e, r, t, n, i, a) {
                    Or.vertexAttribPointer(e, r, t, !!n, i, a)
                },
                glViewport: function(e, r, t, n) {
                    Or.viewport(e, r, t, n)
                },
                gmtime_r: function(e, r) {
                    var t = new Date(1e3 * q[e >> 2]);
                    q[r >> 2] = t.getUTCSeconds(), q[r + 4 >> 2] = t.getUTCMinutes(), q[r + 8 >> 2] = t.getUTCHours(), q[r + 12 >> 2] = t.getUTCDate(), q[r + 16 >> 2] = t.getUTCMonth(), q[r + 20 >> 2] = t.getUTCFullYear() - 1900, q[r + 24 >> 2] = t.getUTCDay(), q[r + 36 >> 2] = 0, q[r + 32 >> 2] = 0;
                    var n = Date.UTC(t.getUTCFullYear(), 0, 1, 0, 0, 0, 0),
                        i = (t.getTime() - n) / 864e5 | 0;
                    return q[r + 28 >> 2] = i, q[r + 40 >> 2] = Br, r
                },
                invoke_di: function(e, r) {
                    var t = yt();
                    try {
                        return bt(e, r)
                    } catch (e) {
                        if (Et(t), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_i: function(e) {
                    var r = yt();
                    try {
                        return lt(e)
                    } catch (e) {
                        if (Et(r), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_ii: function(e, r) {
                    var t = yt();
                    try {
                        return ft(e, r)
                    } catch (e) {
                        if (Et(t), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_iid: function(e, r, t) {
                    var n = yt();
                    try {
                        return _t(e, r, t)
                    } catch (e) {
                        if (Et(n), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_iii: function(e, r, t) {
                    var n = yt();
                    try {
                        return dt(e, r, t)
                    } catch (e) {
                        if (Et(n), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_iiii: function(e, r, t, n) {
                    var i = yt();
                    try {
                        return mt(e, r, t, n)
                    } catch (e) {
                        if (Et(i), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_iiiii: function(e, r, t, n, i) {
                    var a = yt();
                    try {
                        return pt(e, r, t, n, i)
                    } catch (e) {
                        if (Et(a), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_iiiiii: function(e, r, t, n, i, a) {
                    var o = yt();
                    try {
                        return vt(e, r, t, n, i, a)
                    } catch (e) {
                        if (Et(o), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_iiiiiii: function(e, r, t, n, i, a, o) {
                    var u = yt();
                    try {
                        return gt(e, r, t, n, i, a, o)
                    } catch (e) {
                        if (Et(u), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_iiiiiiii: function(e, r, t, n, i, a, o, u) {
                    var s = yt();
                    try {
                        return ht(e, r, t, n, i, a, o, u)
                    } catch (e) {
                        if (Et(s), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_vi: function(e, r) {
                    var t = yt();
                    try {
                        it(e, r)
                    } catch (e) {
                        if (Et(t), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_vii: function(e, r, t) {
                    var n = yt();
                    try {
                        at(e, r, t)
                    } catch (e) {
                        if (Et(n), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_viii: function(e, r, t, n) {
                    var i = yt();
                    try {
                        ot(e, r, t, n)
                    } catch (e) {
                        if (Et(i), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_viiii: function(e, r, t, n, i) {
                    var a = yt();
                    try {
                        ut(e, r, t, n, i)
                    } catch (e) {
                        if (Et(a), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_viiiii: function(e, r, t, n, i, a) {
                    var o = yt();
                    try {
                        st(e, r, t, n, i, a)
                    } catch (e) {
                        if (Et(o), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                invoke_viiiiii: function(e, r, t, n, i, a, o) {
                    var u = yt();
                    try {
                        ct(e, r, t, n, i, a, o)
                    } catch (e) {
                        if (Et(u), e !== e + 0 && "longjmp" !== e) throw e;
                        nt(1, 0)
                    }
                },
                localtime: function(e) {
                    return Mr(e, 1052512)
                },
                localtime_r: Mr,
                memory: w,
                mktime: function(e) {
                    Rr();
                    var r = new Date(q[e + 20 >> 2] + 1900, q[e + 16 >> 2], q[e + 12 >> 2], q[e + 8 >> 2], q[e + 4 >> 2], q[e >> 2], 0),
                        t = q[e + 32 >> 2],
                        n = r.getTimezoneOffset(),
                        i = new Date(r.getFullYear(), 0, 1),
                        a = new Date(r.getFullYear(), 6, 1).getTimezoneOffset(),
                        o = i.getTimezoneOffset(),
                        u = Math.min(o, a);
                    if (t < 0) q[e + 32 >> 2] = Number(a != o && u == n);
                    else if (t > 0 != (u == n)) {
                        var s = Math.max(o, a),
                            c = t > 0 ? u : s;
                        r.setTime(r.getTime() + 6e4 * (c - n))
                    }
                    q[e + 24 >> 2] = r.getDay();
                    var l = (r.getTime() - i.getTime()) / 864e5 | 0;
                    return q[e + 28 >> 2] = l, r.getTime() / 1e3 | 0
                },
                nanosleep: function(e, r) {
                    if (0 === e) return xe(28), -1;
                    var t = q[e >> 2],
                        n = q[e + 4 >> 2];
                    return n < 0 || n > 999999999 || t < 0 ? (xe(28), -1) : (0 !== r && (q[r >> 2] = 0, q[r + 4 >> 2] = 0), Nr(1e6 * t + n / 1e3))
                },
                round: function(e) {
                    return (e = +e) >= 0 ? +ue(e + .5) : +oe(e - .5)
                },
                saveSetjmp: function e(r, t, n, i) {
                    t |= 0, n |= 0, i |= 0;
                    var a = 0;
                    for (hr = hr + 1 | 0, q[(r |= 0) >> 2] = hr;
                        (0 | a) < (0 | i);) {
                        if (0 == (0 | q[n + (a << 3) >> 2])) return q[n + (a << 3) >> 2] = hr, q[n + (4 + (a << 3)) >> 2] = t, q[n + (8 + (a << 3)) >> 2] = 0, x(0 | i), 0 | n;
                        a = a + 1 | 0
                    }
                    return n = 0 | e(0 | r, 0 | t, 0 | (n = 0 | Kr(0 | n, 8 * ((i = 2 * i | 0) + 1 | 0) | 0)), 0 | i), x(0 | i), 0 | n
                },
                setTempRet0: function(e) {
                    x(0 | e)
                },
                sigaction: function(e, r, t) {
                    return 0
                },
                signal: function(e, r) {
                    return 14 == e && r, 0
                },
                sysconf: function(e) {
                    switch (e) {
                        case 30:
                            return 16384;
                        case 85:
                            return 131072;
                        case 132:
                        case 133:
                        case 12:
                        case 137:
                        case 138:
                        case 15:
                        case 235:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 149:
                        case 13:
                        case 10:
                        case 236:
                        case 153:
                        case 9:
                        case 21:
                        case 22:
                        case 159:
                        case 154:
                        case 14:
                        case 77:
                        case 78:
                        case 139:
                        case 80:
                        case 81:
                        case 82:
                        case 68:
                        case 67:
                        case 164:
                        case 11:
                        case 29:
                        case 47:
                        case 48:
                        case 95:
                        case 52:
                        case 51:
                        case 46:
                        case 79:
                            return 200809;
                        case 27:
                        case 246:
                        case 127:
                        case 128:
                        case 23:
                        case 24:
                        case 160:
                        case 161:
                        case 181:
                        case 182:
                        case 242:
                        case 183:
                        case 184:
                        case 243:
                        case 244:
                        case 245:
                        case 165:
                        case 178:
                        case 179:
                        case 49:
                        case 50:
                        case 168:
                        case 169:
                        case 175:
                        case 170:
                        case 171:
                        case 172:
                        case 97:
                        case 76:
                        case 32:
                        case 173:
                        case 35:
                            return -1;
                        case 176:
                        case 177:
                        case 7:
                        case 155:
                        case 8:
                        case 157:
                        case 125:
                        case 126:
                        case 92:
                        case 93:
                        case 129:
                        case 130:
                        case 131:
                        case 94:
                        case 91:
                            return 1;
                        case 74:
                        case 60:
                        case 69:
                        case 70:
                        case 4:
                            return 1024;
                        case 31:
                        case 42:
                        case 72:
                            return 32;
                        case 87:
                        case 26:
                        case 33:
                            return 2147483647;
                        case 34:
                        case 1:
                            return 47839;
                        case 38:
                        case 36:
                            return 99;
                        case 43:
                        case 37:
                            return 2048;
                        case 0:
                            return 2097152;
                        case 3:
                            return 65536;
                        case 28:
                            return 32768;
                        case 44:
                            return 32767;
                        case 75:
                            return 16384;
                        case 39:
                            return 1e3;
                        case 89:
                            return 700;
                        case 71:
                            return 256;
                        case 40:
                            return 255;
                        case 2:
                            return 100;
                        case 180:
                            return 64;
                        case 25:
                            return 20;
                        case 5:
                            return 16;
                        case 6:
                            return 6;
                        case 73:
                            return 4;
                        case 84:
                            return "object" == typeof navigator && navigator.hardwareConcurrency || 1
                    }
                    return xe(28), -1
                },
                table: C,
                testSetjmp: function(e, r, t) {
                    e |= 0, r |= 0, t |= 0;
                    for (var n = 0, i = 0;
                        (0 | n) < (0 | t) && 0 != (0 | (i = 0 | q[r + (n << 3) >> 2]));) {
                        if ((0 | i) == (0 | e)) return 0 | q[r + (4 + (n << 3)) >> 2];
                        n = n + 1 | 0
                    }
                    return 0
                },
                time: function(e) {
                    var r = Date.now() / 1e3 | 0;
                    return e && (q[e >> 2] = r), r
                },
                usleep: Nr,
                wafjs_file_loaddata: function(e) {
                    const t = localStorage.getItem(L(e));
                    if (t && t.length > 0) {
                        const e = new Uint8Array(JSON.parse(t)),
                            n = r._malloc(e.length + 4);
                        return r.HEAP8.set(e, n + 4), r.HEAP32[n >> 2] = e.length, n
                    }
                    return 0
                },
                wafjs_file_savedata: function(e, t, n) {
                    if (t && n > 0) {
                        const i = L(e),
                            a = new Uint8Array(r.HEAP8.buffer, t, n);
                        a && a.length > 0 ? localStorage.setItem(i, JSON.stringify(Array.from(a))) : localStorage.removeItem(i)
                    }
                },
                wafjs_hal_inputtext_begin: function(e, t, n, i, a, o, u, s, c) {
                    const l = document.createElement("input");
                    l.value = L(e), l.style.position = "absolute", l.style.resize = "none", l.style.overflow = "hidden", l.style.zIndex = -999, l.style.top = "50%", l.style.left = "50%", l.style.width = "32px", l.wafSelectionStart = l.wafSelectionEnd = l.value ? l.value.length : 0;
                    let f = !1,
                        d = !1;
                    const m = (e, r) => {
                        ut(u, c, 0, e, r)
                    };
                    window.requestAnimationFrame((function() {
                        l.focus()
                    })), l.addEventListener("input", (function(e) {
                        if ("insertCompositionText" != e.inputType || e.isComposing) {
                            if ("deleteContentForward" == e.inputType || "insertText" == e.inputType && null == e.data) m(l.wafSelectionStart, l.wafSelectionEnd + 1);
                            else if ("deleteContentBackward" == e.inputType) {
                                if (l.wafSelectionStart <= 0) return;
                                m(l.wafSelectionStart - 1, l.wafSelectionEnd), l.wafSelectionEnd = --l.wafSelectionStart
                            } else {
                                const r = e.data || "";
                                let t = l.wafSelectionStart,
                                    n = l.wafSelectionEnd;
                                e.isComposing ? (f ? (l.wafSelectionEnd = ++l.wafSelectionStart, f = !1) : t -= 1, r || (l.wafSelectionEnd = --l.wafSelectionStart)) : l.wafSelectionEnd = ++l.wafSelectionStart, ((e, r, t) => {
                                    const n = R(e) + 1,
                                        i = Zr(n);
                                    B(e, i, n), ut(u, c, i, r, t)
                                })(r, t, n)
                            }
                            var r, t;
                            r = l.wafSelectionStart, t = l.wafSelectionEnd, ot(s, c, r, t)
                        }
                    })), l.addEventListener("select", (e => {
                        e.preventDefault(), e.stopPropagation()
                    })), l.addEventListener("keydown", (e => {
                        d = !0;
                        const t = e.key,
                            n = e.ctrlKey && "/a/A/c/C/v/V/".indexOf("/" + t + "/") >= 0,
                            i = "Home" == t || "End" == t,
                            a = (e.ctrlKey || e.shiftKey) && "/Home/End/ArrowUp/ArrowDown/ArrowLeft/ArrowRight/".indexOf("/" + t + "/") >= 0;
                        if (n || a || i) return e.preventDefault(), void e.stopPropagation();
                        const o = new e.constructor(e.type, e);
                        r.canvas.dispatchEvent(o)
                    })), l.addEventListener("keyup", (e => {
                        d = !1;
                        const t = new e.constructor(e.type, e);
                        r.canvas.dispatchEvent(t)
                    })), l.addEventListener("keypress", (e => {})), l.addEventListener("compositionstart", (e => {
                        f = !0
                    })), l.addEventListener("compositionupdate", (e => {})), l.addEventListener("compositionend", (e => {})), !r.canvas.inputTextFocusHandler && (r.canvas.inputTextFocusHandler = e => {
                        r.canvas.wafActiveInputText && window.requestAnimationFrame((function() {
                            r.canvas.wafActiveInputText.focus()
                        }))
                    }, r.canvas.addEventListener("focus", r.canvas.inputTextFocusHandler)), r.canvas.parentNode.appendChild(l), r.canvas.wafActiveInputText = l
                },
                wafjs_hidestatus: function() {
                    "function" == typeof r.hideStatus && r.hideStatus()
                },
                wafjs_setcontentinfo: function(e, t, n) {
                    r.canvas.setAttribute("waf-content-width", e), r.canvas.setAttribute("waf-content-height", t), r.canvas.setAttribute("waf-content-fps", n), r.canvas.style.setProperty("--waf-content-width", e + "px"), r.canvas.style.setProperty("--waf-content-height", t + "px")
                },
                wafjs_setstatus: function(e) {
                    "function" == typeof r.setStatus && r.setStatus(L(e))
                },
                wafjs_url_transformNavigateUrl: function(e, t) {
                    const n = L(e),
                        i = L(t) || "_self",
                        a = r.WAFLASH,
                        o = a && a.hal && "function" == typeof a.hal.url_transformNavigateUrl && a.hal.url_transformNavigateUrl(n, i);
                    "function" == typeof o && window.requestAnimationFrame((() => o()))
                },
                wafjs_url_transformRequestUrl: function(e) {
                    const t = L(e),
                        n = r.WAFLASH,
                        i = n ? n.hal && "function" == typeof n.hal.url_transformRequestUrl && n.hal.url_transformRequestUrl(t) : t;
                    if (i) {
                        const e = R(i) + 1,
                            r = Zr(e);
                        return B(i, r, e), r
                    }
                    return 0
                }
            },
            Xr = function() {
                var e = {
                    env: Vr,
                    wasi_snapshot_preview1: Vr
                };

                function t(e, t) {
                    var n = e.exports;
                    r.asm = n, me()
                }

                function n(e) {
                    t(e.instance)
                }

                function i(r) {
                    return (b || "function" != typeof fetch ? new Promise((function(e, r) {
                        e(ye())
                    })) : fetch(be, {
                        credentials: "same-origin"
                    }).then((function(e) {
                        if (!e.ok) throw "failed to load wasm binary file at '" + be + "'";
                        return e.arrayBuffer()
                    })).catch((function() {
                        return ye()
                    }))).then((function(r) {
                        return WebAssembly.instantiate(r, e)
                    })).then(r, (function(e) {
                        p("failed to asynchronously prepare wasm: " + e), pe(e)
                    }))
                }
                if (de(), r.instantiateWasm) try {
                    return r.instantiateWasm(e, t)
                } catch (e) {
                    return p("Module.instantiateWasm callback failed with error: " + e), !1
                }
                return function() {
                    if (b || "function" != typeof WebAssembly.instantiateStreaming || ve(be) || "function" != typeof fetch) return i(n);
                    fetch(be, {
                        credentials: "same-origin"
                    }).then((function(r) {
                        return WebAssembly.instantiateStreaming(r, e).then(n, (function(e) {
                            p("wasm streaming compile failed: " + e), p("falling back to ArrayBuffer instantiation"), i(n)
                        }))
                    }))
                }(), {}
            }();
        r.asm = Xr;
        var Hr, Wr = r.___wasm_call_ctors = function() {
                return (Wr = r.___wasm_call_ctors = r.asm.__wasm_call_ctors).apply(null, arguments)
            },
            Yr = (r._reopenBuffer = function() {
                return (r._reopenBuffer = r.asm.reopenBuffer).apply(null, arguments)
            }, r._invokeExternalCallback = function() {
                return (r._invokeExternalCallback = r.asm.invokeExternalCallback).apply(null, arguments)
            }, r.___em_js__wafjs_setstatus = function() {
                return (r.___em_js__wafjs_setstatus = r.asm.__em_js__wafjs_setstatus).apply(null, arguments)
            }, r.___em_js__wafjs_hidestatus = function() {
                return (r.___em_js__wafjs_hidestatus = r.asm.__em_js__wafjs_hidestatus).apply(null, arguments)
            }, r.___em_js__wafjs_setcontentinfo = function() {
                return (r.___em_js__wafjs_setcontentinfo = r.asm.__em_js__wafjs_setcontentinfo).apply(null, arguments)
            }, r.___em_js__emscripten_set_canvas_element_id = function() {
                return (r.___em_js__emscripten_set_canvas_element_id = r.asm.__em_js__emscripten_set_canvas_element_id).apply(null, arguments)
            }, r.___em_js__emscripten_get_canvas_element_id = function() {
                return (r.___em_js__emscripten_get_canvas_element_id = r.asm.__em_js__emscripten_get_canvas_element_id).apply(null, arguments)
            }, r._memset = function() {
                return (r._memset = r.asm.memset).apply(null, arguments)
            }, r._strlen = function() {
                return (Yr = r._strlen = r.asm.strlen).apply(null, arguments)
            }),
            Zr = (r._free = function() {
                return (r._free = r.asm.free).apply(null, arguments)
            }, r.___em_js__getCanvasPaddingLeft = function() {
                return (r.___em_js__getCanvasPaddingLeft = r.asm.__em_js__getCanvasPaddingLeft).apply(null, arguments)
            }, r.___em_js__getCanvasPaddingTop = function() {
                return (r.___em_js__getCanvasPaddingTop = r.asm.__em_js__getCanvasPaddingTop).apply(null, arguments)
            }, r._main = function() {
                return (r._main = r.asm.main).apply(null, arguments)
            }, r._fileno = function() {
                return (r._fileno = r.asm.fileno).apply(null, arguments)
            }, r.___em_js__wafjs_file_savedata = function() {
                return (r.___em_js__wafjs_file_savedata = r.asm.__em_js__wafjs_file_savedata).apply(null, arguments)
            }, r.___em_js__wafjs_file_loaddata = function() {
                return (r.___em_js__wafjs_file_loaddata = r.asm.__em_js__wafjs_file_loaddata).apply(null, arguments)
            }, r._memcpy = function() {
                return (r._memcpy = r.asm.memcpy).apply(null, arguments)
            }, r._malloc = function() {
                return (Zr = r._malloc = r.asm.malloc).apply(null, arguments)
            }),
            Kr = (r.___em_js__wafjs_url_transformRequestUrl = function() {
                return (r.___em_js__wafjs_url_transformRequestUrl = r.asm.__em_js__wafjs_url_transformRequestUrl).apply(null, arguments)
            }, r.___em_js__wafjs_url_transformNavigateUrl = function() {
                return (r.___em_js__wafjs_url_transformNavigateUrl = r.asm.__em_js__wafjs_url_transformNavigateUrl).apply(null, arguments)
            }, r._strstr = function() {
                return (r._strstr = r.asm.strstr).apply(null, arguments)
            }, r.___em_js__changeCursor = function() {
                return (r.___em_js__changeCursor = r.asm.__em_js__changeCursor).apply(null, arguments)
            }, r._realloc = function() {
                return (Kr = r._realloc = r.asm.realloc).apply(null, arguments)
            }),
            $r = r.___errno_location = function() {
                return ($r = r.___errno_location = r.asm.__errno_location).apply(null, arguments)
            },
            Jr = r._emscripten_GetProcAddress = function() {
                return (Jr = r._emscripten_GetProcAddress = r.asm.emscripten_GetProcAddress).apply(null, arguments)
            },
            et = r.__get_tzname = function() {
                return (et = r.__get_tzname = r.asm._get_tzname).apply(null, arguments)
            },
            rt = r.__get_daylight = function() {
                return (rt = r.__get_daylight = r.asm._get_daylight).apply(null, arguments)
            },
            tt = r.__get_timezone = function() {
                return (tt = r.__get_timezone = r.asm._get_timezone).apply(null, arguments)
            },
            nt = r._setThrew = function() {
                return (nt = r._setThrew = r.asm.setThrew).apply(null, arguments)
            },
            it = (r._emscripten_main_thread_process_queued_calls = function() {
                return (r._emscripten_main_thread_process_queued_calls = r.asm.emscripten_main_thread_process_queued_calls).apply(null, arguments)
            }, r.dynCall_vi = function() {
                return (it = r.dynCall_vi = r.asm.dynCall_vi).apply(null, arguments)
            }),
            at = r.dynCall_vii = function() {
                return (at = r.dynCall_vii = r.asm.dynCall_vii).apply(null, arguments)
            },
            ot = r.dynCall_viii = function() {
                return (ot = r.dynCall_viii = r.asm.dynCall_viii).apply(null, arguments)
            },
            ut = r.dynCall_viiii = function() {
                return (ut = r.dynCall_viiii = r.asm.dynCall_viiii).apply(null, arguments)
            },
            st = r.dynCall_viiiii = function() {
                return (st = r.dynCall_viiiii = r.asm.dynCall_viiiii).apply(null, arguments)
            },
            ct = r.dynCall_viiiiii = function() {
                return (ct = r.dynCall_viiiiii = r.asm.dynCall_viiiiii).apply(null, arguments)
            },
            lt = r.dynCall_i = function() {
                return (lt = r.dynCall_i = r.asm.dynCall_i).apply(null, arguments)
            },
            ft = r.dynCall_ii = function() {
                return (ft = r.dynCall_ii = r.asm.dynCall_ii).apply(null, arguments)
            },
            dt = r.dynCall_iii = function() {
                return (dt = r.dynCall_iii = r.asm.dynCall_iii).apply(null, arguments)
            },
            mt = r.dynCall_iiii = function() {
                return (mt = r.dynCall_iiii = r.asm.dynCall_iiii).apply(null, arguments)
            },
            pt = r.dynCall_iiiii = function() {
                return (pt = r.dynCall_iiiii = r.asm.dynCall_iiiii).apply(null, arguments)
            },
            vt = r.dynCall_iiiiii = function() {
                return (vt = r.dynCall_iiiiii = r.asm.dynCall_iiiiii).apply(null, arguments)
            },
            gt = r.dynCall_iiiiiii = function() {
                return (gt = r.dynCall_iiiiiii = r.asm.dynCall_iiiiiii).apply(null, arguments)
            },
            ht = r.dynCall_iiiiiiii = function() {
                return (ht = r.dynCall_iiiiiiii = r.asm.dynCall_iiiiiiii).apply(null, arguments)
            },
            _t = r.dynCall_iid = function() {
                return (_t = r.dynCall_iid = r.asm.dynCall_iid).apply(null, arguments)
            },
            bt = r.dynCall_di = function() {
                return (bt = r.dynCall_di = r.asm.dynCall_di).apply(null, arguments)
            },
            yt = r.stackSave = function() {
                return (yt = r.stackSave = r.asm.stackSave).apply(null, arguments)
            },
            wt = r.stackAlloc = function() {
                return (wt = r.stackAlloc = r.asm.stackAlloc).apply(null, arguments)
            },
            Et = r.stackRestore = function() {
                return (Et = r.stackRestore = r.asm.stackRestore).apply(null, arguments)
            };
        r.__growWasmMemory = function() {
            return (r.__growWasmMemory = r.asm.__growWasmMemory).apply(null, arguments)
        }, r.dynCall_viiiiiii = function() {
            return (r.dynCall_viiiiiii = r.asm.dynCall_viiiiiii).apply(null, arguments)
        }, r.dynCall_viiiiiiiii = function() {
            return (r.dynCall_viiiiiiiii = r.asm.dynCall_viiiiiiiii).apply(null, arguments)
        }, r.dynCall_v = function() {
            return (r.dynCall_v = r.asm.dynCall_v).apply(null, arguments)
        }, r.dynCall_diii = function() {
            return (r.dynCall_diii = r.asm.dynCall_diii).apply(null, arguments)
        }, r.dynCall_viiiiiiii = function() {
            return (r.dynCall_viiiiiiii = r.asm.dynCall_viiiiiiii).apply(null, arguments)
        }, r.dynCall_iiiiiiiiii = function() {
            return (r.dynCall_iiiiiiiiii = r.asm.dynCall_iiiiiiiiii).apply(null, arguments)
        }, r.dynCall_jiji = function() {
            return (r.dynCall_jiji = r.asm.dynCall_jiji).apply(null, arguments)
        }, r.dynCall_ji = function() {
            return (r.dynCall_ji = r.asm.dynCall_ji).apply(null, arguments)
        }, r.dynCall_iiiiiidii = function() {
            return (r.dynCall_iiiiiidii = r.asm.dynCall_iiiiiidii).apply(null, arguments)
        }, r.dynCall_iiiiiiiii = function() {
            return (r.dynCall_iiiiiiiii = r.asm.dynCall_iiiiiiiii).apply(null, arguments)
        }, r.dynCall_viiiiiiiiiii = function() {
            return (r.dynCall_viiiiiiiiiii = r.asm.dynCall_viiiiiiiiiii).apply(null, arguments)
        }, r.dynCall_iidiiii = function() {
            return (r.dynCall_iidiiii = r.asm.dynCall_iidiiii).apply(null, arguments)
        }, r.dynCall_vffff = function() {
            return (r.dynCall_vffff = r.asm.dynCall_vffff).apply(null, arguments)
        }, r.dynCall_vf = function() {
            return (r.dynCall_vf = r.asm.dynCall_vf).apply(null, arguments)
        }, r.dynCall_vff = function() {
            return (r.dynCall_vff = r.asm.dynCall_vff).apply(null, arguments)
        }, r.dynCall_vfi = function() {
            return (r.dynCall_vfi = r.asm.dynCall_vfi).apply(null, arguments)
        }, r.dynCall_viif = function() {
            return (r.dynCall_viif = r.asm.dynCall_viif).apply(null, arguments)
        }, r.dynCall_vif = function() {
            return (r.dynCall_vif = r.asm.dynCall_vif).apply(null, arguments)
        }, r.dynCall_viff = function() {
            return (r.dynCall_viff = r.asm.dynCall_viff).apply(null, arguments)
        }, r.dynCall_vifff = function() {
            return (r.dynCall_vifff = r.asm.dynCall_vifff).apply(null, arguments)
        }, r.dynCall_viffff = function() {
            return (r.dynCall_viffff = r.asm.dynCall_viffff).apply(null, arguments)
        }, r.dynCall_viiiiiiiiii = function() {
            return (r.dynCall_viiiiiiiiii = r.asm.dynCall_viiiiiiiiii).apply(null, arguments)
        }, r.dynCall_viifi = function() {
            return (r.dynCall_viifi = r.asm.dynCall_viifi).apply(null, arguments)
        };

        function xt(e) {
            this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
        }
        r.asm = Xr, r.ccall = A, r.cwrap = function(e, r, t, n) {
            var i = (t = t || []).every((function(e) {
                return "number" === e
            }));
            return "string" !== r && i && !n ? F(e) : function() {
                return A(e, r, t, arguments)
            }
        }, r.getMemory = function(e) {
            return te ? Zr(e) : v(e)
        }, r.addRunDependency = de, r.removeRunDependency = me, r.FS_createFolder = Pe.createFolder, r.FS_createPath = Pe.createPath, r.FS_createDataFile = Pe.createDataFile, r.FS_createPreloadedFile = Pe.createPreloadedFile, r.FS_createLazyFile = Pe.createLazyFile, r.FS_createLink = Pe.createLink, r.FS_createDevice = Pe.createDevice, r.FS_unlink = Pe.unlink;

        function kt(e) {
            function n() {
                Hr || (Hr = !0, r.calledRun = !0, S || (te = !0, r.noFSInit || Pe.init.initialized || Pe.init(), De.init(), Z($), Pe.ignorePermissions = !1, Z(J), t(r), r.onRuntimeInitialized && r.onRuntimeInitialized(), St && function(e) {
                    var t = r._main,
                        n = (e = e || []).length + 1,
                        i = wt(4 * (n + 1));
                    q[i >> 2] = N(l);
                    for (var a = 1; a < n; a++) q[(i >> 2) + a] = N(e[a - 1]);
                    q[(i >> 2) + n] = 0;
                    try {
                        Ct(t(n, i), !0)
                    } catch (e) {
                        if (e instanceof xt) return;
                        if ("unwind" == e) return void(y = !0);
                        var o = e;
                        e && "object" == typeof e && e.stack && (o = [e, e.stack]), p("exception thrown: " + o), f(1, e)
                    } finally {
                        !0
                    }
                }(e), function() {
                    if (r.postRun)
                        for ("function" == typeof r.postRun && (r.postRun = [r.postRun]); r.postRun.length;) e = r.postRun.shift(), re.unshift(e);
                    var e;
                    Z(re)
                }()))
            }
            e = e || c, ce > 0 || (! function() {
                if (r.preRun)
                    for ("function" == typeof r.preRun && (r.preRun = [r.preRun]); r.preRun.length;) e = r.preRun.shift(), K.unshift(e);
                var e;
                Z(K)
            }(), ce > 0 || (r.setStatus ? (r.setStatus("Running..."), setTimeout((function() {
                setTimeout((function() {
                    r.setStatus("")
                }), 1), n()
            }), 1)) : n()))
        }

        function Ct(e, t) {
            t && y && 0 === e || (y || (S = !0, e, !0, r.onExit && r.onExit(e)), f(e, new xt(e)))
        }
        if (fe = function e() {
                Hr || kt(), Hr || (fe = e)
            }, r.run = kt, r.preInit)
            for ("function" == typeof r.preInit && (r.preInit = [r.preInit]); r.preInit.length > 0;) r.preInit.pop()();
        var St = !0;
        return r.noInitialRun && (St = !1), y = !0, kt(), r.ready
    }
}();
export default Module;