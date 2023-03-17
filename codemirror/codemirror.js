/*! For license information please see editor-js.js.LICENSE.txt */
"use strict";

const element = 'one';


(self.webpackChunkinteractive_examples =
  self.webpackChunkinteractive_examples || []).push([
  [554],
  {
    89: (t, e, n) => {
      var r = n(820),
        o = n(758),
        a = n(557),
        i = n(479);
      !(function () {
        const t = document.getElementById(element + 's'),
          e = t.dataset.feature,
          n = document.getElementById(element + 'e'),
          
          c = document.querySelector('#' + element + 'c code');
          
        let d,
          u,
          l = "";
        !document.all &&
          r.$(e) &&
          (document.documentElement.classList.add("js"),
          t.dataset.height &&
            document.getElementById("editor").classList.add(t.dataset.height),
          (u = document.getElementById("static")),
          u.classList.add("hidden"),
          (l = document.getElementById("live")),
          l.classList.remove("hidden"),
          (0, o.Z)(),
          a.z2(),
          (function () {
            const e = document.getElementById("editor");
            d = (0, i.Q_)(e, t.textContent, (0, i.si)());
          })(),
          n.addEventListener("click", () => {
            (c.textContent = ""),
              (function (t) {
                
                try {
                  new Function(t)();
                } catch (t) {
                  console.log(t)
                  
                  c.innerHTML = `<span class="error">Error: ${t.message}</span>`;
                }
                
              })((0, i.kt)(d));
          }));
          
      })();
    },
    758: (t, e, n) => {
      function r(t) {
        let e = "";
        for (let n = 0, a = t.length; n < a; n++)
          "string" == typeof t[n]
            ? (e += '"' + t[n] + '"')
            : Array.isArray(t[n])
            ? ((e += "Array ["), (e += r(t[n])), (e += "]"))
            : (e += o(t[n])),
            n < t.length - 1 && (e += ", ");
        return e;
      }
      function o(t) {
        return null == t || "boolean" == typeof t
          ? String(t)
          : "number" == typeof t
          ? Object.is(t, -0)
            ? "-0"
            : String(t)
          : "bigint" == typeof t
          ? String(t) + "n"
          : "string" == typeof t
          ? t.includes('"')
            ? "'" + t + "'"
            : '"' + t + '"'
          : Array.isArray(t)
          ? "Array [" + r(t) + "]"
          : (function (t) {
              const e = t.constructor ? t.constructor.name : t;
              if ("String" === e) return `String { "${t.valueOf()}" }`;
              if (t === JSON) return "JSON {}";
              if (
                e.match &&
                e.match(/^(ArrayBuffer|SharedArrayBuffer|DataView)$/)
              )
                return e + " {}";
              if (
                e.match &&
                e.match(
                  /^(Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array|BigInt64Array|BigUint64Array)$/
                )
              )
                return t.length > 0 ? e + " [" + r(t) + "]" : e + " []";
              if ("Symbol" === e && void 0 !== t) return t.toString();
              if ("Object" === e) {
                let n = "",
                  r = !0;
                for (const e in t)
                  Object.prototype.hasOwnProperty.call(t, e) &&
                    (r ? (r = !1) : (n += ", "), (n = n + e + ": " + o(t[e])));
                return e + " { " + n + " }";
              }
              if (!t.constructor && !t.prototype) {
                let e = "",
                  n = !0;
                for (const r in t)
                  n ? (n = !1) : (e += ", "), (e = e + r + ": " + o(t[r]));
                return "Object { " + e + " }";
              }
              return t;
            })(t);
      }
      function a(t) {
        const e = document.querySelector('#' + element + 'c code'),
          n = e.innerHTML,
          
          r = `<span>${t}</span>`;
        e.innerHTML = n + r;
      }
      function i(t) {
        const e = t ? t.console : window.console,
          n = e.log,
          r = e.error;
        (e.error = function (t) {
          a(t), r.apply(e, arguments);
        }),
          (e.log = function () {
            const t = [];
            for (let e = 0, n = arguments.length; e < n; e++) {
              const n = o(arguments[e]);
              t.push(n);
            }
            a(t.join(" ")), n.apply(e, arguments);
          });
      }
      n.d(e, { Z: () => i });
    },
    820: (t, e, n) => {
      function r(t) {
        return (
          void 0 === t ||
          void 0 !==
            (function (t) {
              let e;
              switch (t) {
                case "array-entries":
                  e = Array.prototype.entries;
                  break;
                case "shared-array-buffer":
                  e = window.SharedArrayBuffer;
              }
              return e;
            })(t)
        );
      }
      function o() {
        const t = document.createElement("div"),
          e = "http://www.w3.org/1998/Math/MathML",
          n = document.createElementNS(e, "math"),
          r = document.createElementNS(e, "mspace");
        r.setAttribute("height", "23px"),
          r.setAttribute("width", "77px"),
          n.append(r),
          t.append(n),
          t.classList.add("offscreen");
        const o = document.body.appendChild(t);
        if (!r) return !1;
        const a = r.getBoundingClientRect();
        return (
          document.body.removeChild(o),
          !!a && Math.abs(a.height - 23) <= 1 && Math.abs(a.width - 77) <= 1
        );
      }
      n.d(e, { $: () => r, r: () => o });
    },
  },
  (t) => {
    t((t.s = 89));
  },
]);
