import {
  V as vt,
  h as ne,
  x as ze,
  af as kt,
  ag as Nt,
  d as Tt,
  E as me,
  ah as Xe,
  g as Te,
  ai as It,
  aj as Dt,
  y as _t,
  ak as Ot,
  j as Ie,
  O as fe,
  S as be,
  al as Rt,
  am as Mt,
  W as Lt,
  s as Pt,
  an as zt,
  o as Z,
  b as Bt,
  k as S,
  $ as Vt,
  l as W,
  ao as $t,
  ap as Wt,
  aq as jt,
  c as ee,
  n as et,
  e as we,
  D as tt,
  F as rt,
  a as he,
  t as de,
  ar as Kt,
  p as Jt,
  m as Ut,
  as as at,
  at as Ht,
  a5 as Gt,
  ab as qt,
  _ as Qt,
} from "./framework.7f6db421.js";
import { u as Yt, c as Zt } from "./theme.bf1e8c0a.js";
const Xt = {
  root: () => vt(() => import("./@localSearchIndexroot.22305916.js"), []),
};
/*!
 * tabbable 6.2.0
 * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
 */ var pt = [
    "input:not([inert])",
    "select:not([inert])",
    "textarea:not([inert])",
    "a[href]:not([inert])",
    "button:not([inert])",
    "[tabindex]:not(slot):not([inert])",
    "audio[controls]:not([inert])",
    "video[controls]:not([inert])",
    '[contenteditable]:not([contenteditable="false"]):not([inert])',
    "details>summary:first-of-type:not([inert])",
    "details:not([inert])",
  ],
  Ee = pt.join(","),
  yt = typeof Element > "u",
  oe = yt
    ? function () {}
    : Element.prototype.matches ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector,
  Se =
    !yt && Element.prototype.getRootNode
      ? function (o) {
          var e;
          return o == null || (e = o.getRootNode) === null || e === void 0
            ? void 0
            : e.call(o);
        }
      : function (o) {
          return o == null ? void 0 : o.ownerDocument;
        },
  Ae = function o(e, t) {
    var r;
    t === void 0 && (t = !0);
    var n =
        e == null || (r = e.getAttribute) === null || r === void 0
          ? void 0
          : r.call(e, "inert"),
      a = n === "" || n === "true",
      i = a || (t && e && o(e.parentNode));
    return i;
  },
  er = function (e) {
    var t,
      r =
        e == null || (t = e.getAttribute) === null || t === void 0
          ? void 0
          : t.call(e, "contenteditable");
    return r === "" || r === "true";
  },
  gt = function (e, t, r) {
    if (Ae(e)) return [];
    var n = Array.prototype.slice.apply(e.querySelectorAll(Ee));
    return t && oe.call(e, Ee) && n.unshift(e), (n = n.filter(r)), n;
  },
  mt = function o(e, t, r) {
    for (var n = [], a = Array.from(e); a.length; ) {
      var i = a.shift();
      if (!Ae(i, !1))
        if (i.tagName === "SLOT") {
          var s = i.assignedElements(),
            u = s.length ? s : i.children,
            l = o(u, !0, r);
          r.flatten
            ? n.push.apply(n, l)
            : n.push({ scopeParent: i, candidates: l });
        } else {
          var d = oe.call(i, Ee);
          d && r.filter(i) && (t || !e.includes(i)) && n.push(i);
          var h =
              i.shadowRoot ||
              (typeof r.getShadowRoot == "function" && r.getShadowRoot(i)),
            v = !Ae(h, !1) && (!r.shadowRootFilter || r.shadowRootFilter(i));
          if (h && v) {
            var y = o(h === !0 ? i.children : h.children, !0, r);
            r.flatten
              ? n.push.apply(n, y)
              : n.push({ scopeParent: i, candidates: y });
          } else a.unshift.apply(a, i.children);
        }
    }
    return n;
  },
  bt = function (e) {
    return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
  },
  ie = function (e) {
    if (!e) throw new Error("No node provided");
    return e.tabIndex < 0 &&
      (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || er(e)) &&
      !bt(e)
      ? 0
      : e.tabIndex;
  },
  tr = function (e, t) {
    var r = ie(e);
    return r < 0 && t && !bt(e) ? 0 : r;
  },
  rr = function (e, t) {
    return e.tabIndex === t.tabIndex
      ? e.documentOrder - t.documentOrder
      : e.tabIndex - t.tabIndex;
  },
  wt = function (e) {
    return e.tagName === "INPUT";
  },
  ar = function (e) {
    return wt(e) && e.type === "hidden";
  },
  nr = function (e) {
    var t =
      e.tagName === "DETAILS" &&
      Array.prototype.slice.apply(e.children).some(function (r) {
        return r.tagName === "SUMMARY";
      });
    return t;
  },
  ir = function (e, t) {
    for (var r = 0; r < e.length; r++)
      if (e[r].checked && e[r].form === t) return e[r];
  },
  or = function (e) {
    if (!e.name) return !0;
    var t = e.form || Se(e),
      r = function (s) {
        return t.querySelectorAll('input[type="radio"][name="' + s + '"]');
      },
      n;
    if (
      typeof window < "u" &&
      typeof window.CSS < "u" &&
      typeof window.CSS.escape == "function"
    )
      n = r(window.CSS.escape(e.name));
    else
      try {
        n = r(e.name);
      } catch (i) {
        return (
          console.error(
            "Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s",
            i.message,
          ),
          !1
        );
      }
    var a = ir(n, e.form);
    return !a || a === e;
  },
  sr = function (e) {
    return wt(e) && e.type === "radio";
  },
  ur = function (e) {
    return sr(e) && !or(e);
  },
  lr = function (e) {
    var t,
      r = e && Se(e),
      n = (t = r) === null || t === void 0 ? void 0 : t.host,
      a = !1;
    if (r && r !== e) {
      var i, s, u;
      for (
        a = !!(
          ((i = n) !== null &&
            i !== void 0 &&
            (s = i.ownerDocument) !== null &&
            s !== void 0 &&
            s.contains(n)) ||
          (e != null &&
            (u = e.ownerDocument) !== null &&
            u !== void 0 &&
            u.contains(e))
        );
        !a && n;

      ) {
        var l, d, h;
        (r = Se(n)),
          (n = (l = r) === null || l === void 0 ? void 0 : l.host),
          (a = !!(
            (d = n) !== null &&
            d !== void 0 &&
            (h = d.ownerDocument) !== null &&
            h !== void 0 &&
            h.contains(n)
          ));
      }
    }
    return a;
  },
  nt = function (e) {
    var t = e.getBoundingClientRect(),
      r = t.width,
      n = t.height;
    return r === 0 && n === 0;
  },
  cr = function (e, t) {
    var r = t.displayCheck,
      n = t.getShadowRoot;
    if (getComputedStyle(e).visibility === "hidden") return !0;
    var a = oe.call(e, "details>summary:first-of-type"),
      i = a ? e.parentElement : e;
    if (oe.call(i, "details:not([open]) *")) return !0;
    if (!r || r === "full" || r === "legacy-full") {
      if (typeof n == "function") {
        for (var s = e; e; ) {
          var u = e.parentElement,
            l = Se(e);
          if (u && !u.shadowRoot && n(u) === !0) return nt(e);
          e.assignedSlot
            ? (e = e.assignedSlot)
            : !u && l !== e.ownerDocument
            ? (e = l.host)
            : (e = u);
        }
        e = s;
      }
      if (lr(e)) return !e.getClientRects().length;
      if (r !== "legacy-full") return !0;
    } else if (r === "non-zero-area") return nt(e);
    return !1;
  },
  fr = function (e) {
    if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName))
      for (var t = e.parentElement; t; ) {
        if (t.tagName === "FIELDSET" && t.disabled) {
          for (var r = 0; r < t.children.length; r++) {
            var n = t.children.item(r);
            if (n.tagName === "LEGEND")
              return oe.call(t, "fieldset[disabled] *") ? !0 : !n.contains(e);
          }
          return !0;
        }
        t = t.parentElement;
      }
    return !1;
  },
  Ce = function (e, t) {
    return !(t.disabled || Ae(t) || ar(t) || cr(t, e) || nr(t) || fr(t));
  },
  Be = function (e, t) {
    return !(ur(t) || ie(t) < 0 || !Ce(e, t));
  },
  hr = function (e) {
    var t = parseInt(e.getAttribute("tabindex"), 10);
    return !!(isNaN(t) || t >= 0);
  },
  dr = function o(e) {
    var t = [],
      r = [];
    return (
      e.forEach(function (n, a) {
        var i = !!n.scopeParent,
          s = i ? n.scopeParent : n,
          u = tr(s, i),
          l = i ? o(n.candidates) : s;
        u === 0
          ? i
            ? t.push.apply(t, l)
            : t.push(s)
          : r.push({
              documentOrder: a,
              tabIndex: u,
              item: n,
              isScope: i,
              content: l,
            });
      }),
      r
        .sort(rr)
        .reduce(function (n, a) {
          return a.isScope ? n.push.apply(n, a.content) : n.push(a.content), n;
        }, [])
        .concat(t)
    );
  },
  vr = function (e, t) {
    t = t || {};
    var r;
    return (
      t.getShadowRoot
        ? (r = mt([e], t.includeContainer, {
            filter: Be.bind(null, t),
            flatten: !1,
            getShadowRoot: t.getShadowRoot,
            shadowRootFilter: hr,
          }))
        : (r = gt(e, t.includeContainer, Be.bind(null, t))),
      dr(r)
    );
  },
  pr = function (e, t) {
    t = t || {};
    var r;
    return (
      t.getShadowRoot
        ? (r = mt([e], t.includeContainer, {
            filter: Ce.bind(null, t),
            flatten: !0,
            getShadowRoot: t.getShadowRoot,
          }))
        : (r = gt(e, t.includeContainer, Ce.bind(null, t))),
      r
    );
  },
  se = function (e, t) {
    if (((t = t || {}), !e)) throw new Error("No node provided");
    return oe.call(e, Ee) === !1 ? !1 : Be(t, e);
  },
  yr = pt.concat("iframe").join(","),
  De = function (e, t) {
    if (((t = t || {}), !e)) throw new Error("No node provided");
    return oe.call(e, yr) === !1 ? !1 : Ce(t, e);
  };
/*!
 * focus-trap 7.5.3
 * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
 */ function it(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    e &&
      (r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(o, n).enumerable;
      })),
      t.push.apply(t, r);
  }
  return t;
}
function ot(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? it(Object(t), !0).forEach(function (r) {
          gr(o, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t))
      : it(Object(t)).forEach(function (r) {
          Object.defineProperty(o, r, Object.getOwnPropertyDescriptor(t, r));
        });
  }
  return o;
}
function gr(o, e, t) {
  return (
    (e = br(e)),
    e in o
      ? Object.defineProperty(o, e, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (o[e] = t),
    o
  );
}
function mr(o, e) {
  if (typeof o != "object" || o === null) return o;
  var t = o[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(o, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(o);
}
function br(o) {
  var e = mr(o, "string");
  return typeof e == "symbol" ? e : String(e);
}
var st = {
    activateTrap: function (e, t) {
      if (e.length > 0) {
        var r = e[e.length - 1];
        r !== t && r.pause();
      }
      var n = e.indexOf(t);
      n === -1 || e.splice(n, 1), e.push(t);
    },
    deactivateTrap: function (e, t) {
      var r = e.indexOf(t);
      r !== -1 && e.splice(r, 1), e.length > 0 && e[e.length - 1].unpause();
    },
  },
  wr = function (e) {
    return (
      e.tagName &&
      e.tagName.toLowerCase() === "input" &&
      typeof e.select == "function"
    );
  },
  xr = function (e) {
    return (
      (e == null ? void 0 : e.key) === "Escape" ||
      (e == null ? void 0 : e.key) === "Esc" ||
      (e == null ? void 0 : e.keyCode) === 27
    );
  },
  ye = function (e) {
    return (
      (e == null ? void 0 : e.key) === "Tab" ||
      (e == null ? void 0 : e.keyCode) === 9
    );
  },
  Fr = function (e) {
    return ye(e) && !e.shiftKey;
  },
  Er = function (e) {
    return ye(e) && e.shiftKey;
  },
  ut = function (e) {
    return setTimeout(e, 0);
  },
  lt = function (e, t) {
    var r = -1;
    return (
      e.every(function (n, a) {
        return t(n) ? ((r = a), !1) : !0;
      }),
      r
    );
  },
  ve = function (e) {
    for (
      var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
      n < t;
      n++
    )
      r[n - 1] = arguments[n];
    return typeof e == "function" ? e.apply(void 0, r) : e;
  },
  xe = function (e) {
    return e.target.shadowRoot && typeof e.composedPath == "function"
      ? e.composedPath()[0]
      : e.target;
  },
  Sr = [],
  Ar = function (e, t) {
    var r = (t == null ? void 0 : t.document) || document,
      n = (t == null ? void 0 : t.trapStack) || Sr,
      a = ot(
        {
          returnFocusOnDeactivate: !0,
          escapeDeactivates: !0,
          delayInitialFocus: !0,
          isKeyForward: Fr,
          isKeyBackward: Er,
        },
        t,
      ),
      i = {
        containers: [],
        containerGroups: [],
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: !1,
        paused: !1,
        delayInitialFocusTimer: void 0,
        recentNavEvent: void 0,
      },
      s,
      u = function (c, f, p) {
        return c && c[f] !== void 0 ? c[f] : a[p || f];
      },
      l = function (c, f) {
        var p =
          typeof (f == null ? void 0 : f.composedPath) == "function"
            ? f.composedPath()
            : void 0;
        return i.containerGroups.findIndex(function (w) {
          var T = w.container,
            O = w.tabbableNodes;
          return (
            T.contains(c) ||
            (p == null ? void 0 : p.includes(T)) ||
            O.find(function (P) {
              return P === c;
            })
          );
        });
      },
      d = function (c) {
        var f = a[c];
        if (typeof f == "function") {
          for (
            var p = arguments.length, w = new Array(p > 1 ? p - 1 : 0), T = 1;
            T < p;
            T++
          )
            w[T - 1] = arguments[T];
          f = f.apply(void 0, w);
        }
        if ((f === !0 && (f = void 0), !f)) {
          if (f === void 0 || f === !1) return f;
          throw new Error(
            "`".concat(
              c,
              "` was specified but was not a node, or did not return a node",
            ),
          );
        }
        var O = f;
        if (typeof f == "string" && ((O = r.querySelector(f)), !O))
          throw new Error(
            "`".concat(c, "` as selector refers to no known node"),
          );
        return O;
      },
      h = function () {
        var c = d("initialFocus");
        if (c === !1) return !1;
        if (c === void 0 || !De(c, a.tabbableOptions))
          if (l(r.activeElement) >= 0) c = r.activeElement;
          else {
            var f = i.tabbableGroups[0],
              p = f && f.firstTabbableNode;
            c = p || d("fallbackFocus");
          }
        if (!c)
          throw new Error(
            "Your focus-trap needs to have at least one focusable element",
          );
        return c;
      },
      v = function () {
        if (
          ((i.containerGroups = i.containers.map(function (c) {
            var f = vr(c, a.tabbableOptions),
              p = pr(c, a.tabbableOptions),
              w = f.length > 0 ? f[0] : void 0,
              T = f.length > 0 ? f[f.length - 1] : void 0,
              O = p.find(function (b) {
                return se(b);
              }),
              P = p
                .slice()
                .reverse()
                .find(function (b) {
                  return se(b);
                }),
              g = !!f.find(function (b) {
                return ie(b) > 0;
              });
            return {
              container: c,
              tabbableNodes: f,
              focusableNodes: p,
              posTabIndexesFound: g,
              firstTabbableNode: w,
              lastTabbableNode: T,
              firstDomTabbableNode: O,
              lastDomTabbableNode: P,
              nextTabbableNode: function (z) {
                var G =
                    arguments.length > 1 && arguments[1] !== void 0
                      ? arguments[1]
                      : !0,
                  K = f.indexOf(z);
                return K < 0
                  ? G
                    ? p.slice(p.indexOf(z) + 1).find(function (J) {
                        return se(J);
                      })
                    : p
                        .slice(0, p.indexOf(z))
                        .reverse()
                        .find(function (J) {
                          return se(J);
                        })
                  : f[K + (G ? 1 : -1)];
              },
            };
          })),
          (i.tabbableGroups = i.containerGroups.filter(function (c) {
            return c.tabbableNodes.length > 0;
          })),
          i.tabbableGroups.length <= 0 && !d("fallbackFocus"))
        )
          throw new Error(
            "Your focus-trap must have at least one container with at least one tabbable node in it at all times",
          );
        if (
          i.containerGroups.find(function (c) {
            return c.posTabIndexesFound;
          }) &&
          i.containerGroups.length > 1
        )
          throw new Error(
            "At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.",
          );
      },
      y = function F(c) {
        if (c !== !1 && c !== r.activeElement) {
          if (!c || !c.focus) {
            F(h());
            return;
          }
          c.focus({ preventScroll: !!a.preventScroll }),
            (i.mostRecentlyFocusedNode = c),
            wr(c) && c.select();
        }
      },
      m = function (c) {
        var f = d("setReturnFocus", c);
        return f || (f === !1 ? !1 : c);
      },
      E = function (c) {
        var f = c.target,
          p = c.event,
          w = c.isBackward,
          T = w === void 0 ? !1 : w;
        (f = f || xe(p)), v();
        var O = null;
        if (i.tabbableGroups.length > 0) {
          var P = l(f, p),
            g = P >= 0 ? i.containerGroups[P] : void 0;
          if (P < 0)
            T
              ? (O =
                  i.tabbableGroups[i.tabbableGroups.length - 1]
                    .lastTabbableNode)
              : (O = i.tabbableGroups[0].firstTabbableNode);
          else if (T) {
            var b = lt(i.tabbableGroups, function (U) {
              var H = U.firstTabbableNode;
              return f === H;
            });
            if (
              (b < 0 &&
                (g.container === f ||
                  (De(f, a.tabbableOptions) &&
                    !se(f, a.tabbableOptions) &&
                    !g.nextTabbableNode(f, !1))) &&
                (b = P),
              b >= 0)
            ) {
              var z = b === 0 ? i.tabbableGroups.length - 1 : b - 1,
                G = i.tabbableGroups[z];
              O = ie(f) >= 0 ? G.lastTabbableNode : G.lastDomTabbableNode;
            } else ye(p) || (O = g.nextTabbableNode(f, !1));
          } else {
            var K = lt(i.tabbableGroups, function (U) {
              var H = U.lastTabbableNode;
              return f === H;
            });
            if (
              (K < 0 &&
                (g.container === f ||
                  (De(f, a.tabbableOptions) &&
                    !se(f, a.tabbableOptions) &&
                    !g.nextTabbableNode(f))) &&
                (K = P),
              K >= 0)
            ) {
              var J = K === i.tabbableGroups.length - 1 ? 0 : K + 1,
                B = i.tabbableGroups[J];
              O = ie(f) >= 0 ? B.firstTabbableNode : B.firstDomTabbableNode;
            } else ye(p) || (O = g.nextTabbableNode(f));
          }
        } else O = d("fallbackFocus");
        return O;
      },
      x = function (c) {
        var f = xe(c);
        if (!(l(f, c) >= 0)) {
          if (ve(a.clickOutsideDeactivates, c)) {
            s.deactivate({ returnFocus: a.returnFocusOnDeactivate });
            return;
          }
          ve(a.allowOutsideClick, c) || c.preventDefault();
        }
      },
      C = function (c) {
        var f = xe(c),
          p = l(f, c) >= 0;
        if (p || f instanceof Document) p && (i.mostRecentlyFocusedNode = f);
        else {
          c.stopImmediatePropagation();
          var w,
            T = !0;
          if (i.mostRecentlyFocusedNode)
            if (ie(i.mostRecentlyFocusedNode) > 0) {
              var O = l(i.mostRecentlyFocusedNode),
                P = i.containerGroups[O].tabbableNodes;
              if (P.length > 0) {
                var g = P.findIndex(function (b) {
                  return b === i.mostRecentlyFocusedNode;
                });
                g >= 0 &&
                  (a.isKeyForward(i.recentNavEvent)
                    ? g + 1 < P.length && ((w = P[g + 1]), (T = !1))
                    : g - 1 >= 0 && ((w = P[g - 1]), (T = !1)));
              }
            } else
              i.containerGroups.some(function (b) {
                return b.tabbableNodes.some(function (z) {
                  return ie(z) > 0;
                });
              }) || (T = !1);
          else T = !1;
          T &&
            (w = E({
              target: i.mostRecentlyFocusedNode,
              isBackward: a.isKeyBackward(i.recentNavEvent),
            })),
            y(w || i.mostRecentlyFocusedNode || h());
        }
        i.recentNavEvent = void 0;
      },
      k = function (c) {
        var f =
          arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
        i.recentNavEvent = c;
        var p = E({ event: c, isBackward: f });
        p && (ye(c) && c.preventDefault(), y(p));
      },
      A = function (c) {
        if (xr(c) && ve(a.escapeDeactivates, c) !== !1) {
          c.preventDefault(), s.deactivate();
          return;
        }
        (a.isKeyForward(c) || a.isKeyBackward(c)) && k(c, a.isKeyBackward(c));
      },
      M = function (c) {
        var f = xe(c);
        l(f, c) >= 0 ||
          ve(a.clickOutsideDeactivates, c) ||
          ve(a.allowOutsideClick, c) ||
          (c.preventDefault(), c.stopImmediatePropagation());
      },
      L = function () {
        if (i.active)
          return (
            st.activateTrap(n, s),
            (i.delayInitialFocusTimer = a.delayInitialFocus
              ? ut(function () {
                  y(h());
                })
              : y(h())),
            r.addEventListener("focusin", C, !0),
            r.addEventListener("mousedown", x, { capture: !0, passive: !1 }),
            r.addEventListener("touchstart", x, { capture: !0, passive: !1 }),
            r.addEventListener("click", M, { capture: !0, passive: !1 }),
            r.addEventListener("keydown", A, { capture: !0, passive: !1 }),
            s
          );
      },
      D = function () {
        if (i.active)
          return (
            r.removeEventListener("focusin", C, !0),
            r.removeEventListener("mousedown", x, !0),
            r.removeEventListener("touchstart", x, !0),
            r.removeEventListener("click", M, !0),
            r.removeEventListener("keydown", A, !0),
            s
          );
      },
      N = function (c) {
        var f = c.some(function (p) {
          var w = Array.from(p.removedNodes);
          return w.some(function (T) {
            return T === i.mostRecentlyFocusedNode;
          });
        });
        f && y(h());
      },
      I =
        typeof window < "u" && "MutationObserver" in window
          ? new MutationObserver(N)
          : void 0,
      R = function () {
        I &&
          (I.disconnect(),
          i.active &&
            !i.paused &&
            i.containers.map(function (c) {
              I.observe(c, { subtree: !0, childList: !0 });
            }));
      };
    return (
      (s = {
        get active() {
          return i.active;
        },
        get paused() {
          return i.paused;
        },
        activate: function (c) {
          if (i.active) return this;
          var f = u(c, "onActivate"),
            p = u(c, "onPostActivate"),
            w = u(c, "checkCanFocusTrap");
          w || v(),
            (i.active = !0),
            (i.paused = !1),
            (i.nodeFocusedBeforeActivation = r.activeElement),
            f == null || f();
          var T = function () {
            w && v(), L(), R(), p == null || p();
          };
          return w ? (w(i.containers.concat()).then(T, T), this) : (T(), this);
        },
        deactivate: function (c) {
          if (!i.active) return this;
          var f = ot(
            {
              onDeactivate: a.onDeactivate,
              onPostDeactivate: a.onPostDeactivate,
              checkCanReturnFocus: a.checkCanReturnFocus,
            },
            c,
          );
          clearTimeout(i.delayInitialFocusTimer),
            (i.delayInitialFocusTimer = void 0),
            D(),
            (i.active = !1),
            (i.paused = !1),
            R(),
            st.deactivateTrap(n, s);
          var p = u(f, "onDeactivate"),
            w = u(f, "onPostDeactivate"),
            T = u(f, "checkCanReturnFocus"),
            O = u(f, "returnFocus", "returnFocusOnDeactivate");
          p == null || p();
          var P = function () {
            ut(function () {
              O && y(m(i.nodeFocusedBeforeActivation)), w == null || w();
            });
          };
          return O && T
            ? (T(m(i.nodeFocusedBeforeActivation)).then(P, P), this)
            : (P(), this);
        },
        pause: function (c) {
          if (i.paused || !i.active) return this;
          var f = u(c, "onPause"),
            p = u(c, "onPostPause");
          return (
            (i.paused = !0), f == null || f(), D(), R(), p == null || p(), this
          );
        },
        unpause: function (c) {
          if (!i.paused || !i.active) return this;
          var f = u(c, "onUnpause"),
            p = u(c, "onPostUnpause");
          return (
            (i.paused = !1),
            f == null || f(),
            v(),
            L(),
            R(),
            p == null || p(),
            this
          );
        },
        updateContainerElements: function (c) {
          var f = [].concat(c).filter(Boolean);
          return (
            (i.containers = f.map(function (p) {
              return typeof p == "string" ? r.querySelector(p) : p;
            })),
            i.active && v(),
            R(),
            this
          );
        },
      }),
      s.updateContainerElements(e),
      s
    );
  };
function Cr(o, e = {}) {
  let t;
  const { immediate: r, ...n } = e,
    a = ne(!1),
    i = ne(!1),
    s = (h) => t && t.activate(h),
    u = (h) => t && t.deactivate(h),
    l = () => {
      t && (t.pause(), (i.value = !0));
    },
    d = () => {
      t && (t.unpause(), (i.value = !1));
    };
  return (
    ze(
      () => kt(o),
      (h) => {
        h &&
          ((t = Ar(h, {
            ...n,
            onActivate() {
              (a.value = !0), e.onActivate && e.onActivate();
            },
            onDeactivate() {
              (a.value = !1), e.onDeactivate && e.onDeactivate();
            },
          })),
          r && s());
      },
      { flush: "post" },
    ),
    Nt(() => u()),
    {
      hasFocus: a,
      isPaused: i,
      activate: s,
      deactivate: u,
      pause: l,
      unpause: d,
    }
  );
}
class le {
  constructor(e, t = !0, r = [], n = 5e3) {
    (this.ctx = e),
      (this.iframes = t),
      (this.exclude = r),
      (this.iframesTimeout = n);
  }
  static matches(e, t) {
    const r = typeof t == "string" ? [t] : t,
      n =
        e.matches ||
        e.matchesSelector ||
        e.msMatchesSelector ||
        e.mozMatchesSelector ||
        e.oMatchesSelector ||
        e.webkitMatchesSelector;
    if (n) {
      let a = !1;
      return r.every((i) => (n.call(e, i) ? ((a = !0), !1) : !0)), a;
    } else return !1;
  }
  getContexts() {
    let e,
      t = [];
    return (
      typeof this.ctx > "u" || !this.ctx
        ? (e = [])
        : NodeList.prototype.isPrototypeOf(this.ctx)
        ? (e = Array.prototype.slice.call(this.ctx))
        : Array.isArray(this.ctx)
        ? (e = this.ctx)
        : typeof this.ctx == "string"
        ? (e = Array.prototype.slice.call(document.querySelectorAll(this.ctx)))
        : (e = [this.ctx]),
      e.forEach((r) => {
        const n = t.filter((a) => a.contains(r)).length > 0;
        t.indexOf(r) === -1 && !n && t.push(r);
      }),
      t
    );
  }
  getIframeContents(e, t, r = () => {}) {
    let n;
    try {
      const a = e.contentWindow;
      if (((n = a.document), !a || !n)) throw new Error("iframe inaccessible");
    } catch {
      r();
    }
    n && t(n);
  }
  isIframeBlank(e) {
    const t = "about:blank",
      r = e.getAttribute("src").trim();
    return e.contentWindow.location.href === t && r !== t && r;
  }
  observeIframeLoad(e, t, r) {
    let n = !1,
      a = null;
    const i = () => {
      if (!n) {
        (n = !0), clearTimeout(a);
        try {
          this.isIframeBlank(e) ||
            (e.removeEventListener("load", i), this.getIframeContents(e, t, r));
        } catch {
          r();
        }
      }
    };
    e.addEventListener("load", i), (a = setTimeout(i, this.iframesTimeout));
  }
  onIframeReady(e, t, r) {
    try {
      e.contentWindow.document.readyState === "complete"
        ? this.isIframeBlank(e)
          ? this.observeIframeLoad(e, t, r)
          : this.getIframeContents(e, t, r)
        : this.observeIframeLoad(e, t, r);
    } catch {
      r();
    }
  }
  waitForIframes(e, t) {
    let r = 0;
    this.forEachIframe(
      e,
      () => !0,
      (n) => {
        r++,
          this.waitForIframes(n.querySelector("html"), () => {
            --r || t();
          });
      },
      (n) => {
        n || t();
      },
    );
  }
  forEachIframe(e, t, r, n = () => {}) {
    let a = e.querySelectorAll("iframe"),
      i = a.length,
      s = 0;
    a = Array.prototype.slice.call(a);
    const u = () => {
      --i <= 0 && n(s);
    };
    i || u(),
      a.forEach((l) => {
        le.matches(l, this.exclude)
          ? u()
          : this.onIframeReady(
              l,
              (d) => {
                t(l) && (s++, r(d)), u();
              },
              u,
            );
      });
  }
  createIterator(e, t, r) {
    return document.createNodeIterator(e, t, r, !1);
  }
  createInstanceOnIframe(e) {
    return new le(e.querySelector("html"), this.iframes);
  }
  compareNodeIframe(e, t, r) {
    const n = e.compareDocumentPosition(r),
      a = Node.DOCUMENT_POSITION_PRECEDING;
    if (n & a)
      if (t !== null) {
        const i = t.compareDocumentPosition(r),
          s = Node.DOCUMENT_POSITION_FOLLOWING;
        if (i & s) return !0;
      } else return !0;
    return !1;
  }
  getIteratorNode(e) {
    const t = e.previousNode();
    let r;
    return (
      t === null ? (r = e.nextNode()) : (r = e.nextNode() && e.nextNode()),
      { prevNode: t, node: r }
    );
  }
  checkIframeFilter(e, t, r, n) {
    let a = !1,
      i = !1;
    return (
      n.forEach((s, u) => {
        s.val === r && ((a = u), (i = s.handled));
      }),
      this.compareNodeIframe(e, t, r)
        ? (a === !1 && !i
            ? n.push({ val: r, handled: !0 })
            : a !== !1 && !i && (n[a].handled = !0),
          !0)
        : (a === !1 && n.push({ val: r, handled: !1 }), !1)
    );
  }
  handleOpenIframes(e, t, r, n) {
    e.forEach((a) => {
      a.handled ||
        this.getIframeContents(a.val, (i) => {
          this.createInstanceOnIframe(i).forEachNode(t, r, n);
        });
    });
  }
  iterateThroughNodes(e, t, r, n, a) {
    const i = this.createIterator(t, e, n);
    let s = [],
      u = [],
      l,
      d,
      h = () => (({ prevNode: d, node: l } = this.getIteratorNode(i)), l);
    for (; h(); )
      this.iframes &&
        this.forEachIframe(
          t,
          (v) => this.checkIframeFilter(l, d, v, s),
          (v) => {
            this.createInstanceOnIframe(v).forEachNode(e, (y) => u.push(y), n);
          },
        ),
        u.push(l);
    u.forEach((v) => {
      r(v);
    }),
      this.iframes && this.handleOpenIframes(s, e, r, n),
      a();
  }
  forEachNode(e, t, r, n = () => {}) {
    const a = this.getContexts();
    let i = a.length;
    i || n(),
      a.forEach((s) => {
        const u = () => {
          this.iterateThroughNodes(e, s, t, r, () => {
            --i <= 0 && n();
          });
        };
        this.iframes ? this.waitForIframes(s, u) : u();
      });
  }
}
let kr = class {
  constructor(e) {
    (this.ctx = e), (this.ie = !1);
    const t = window.navigator.userAgent;
    (t.indexOf("MSIE") > -1 || t.indexOf("Trident") > -1) && (this.ie = !0);
  }
  set opt(e) {
    this._opt = Object.assign(
      {},
      {
        element: "",
        className: "",
        exclude: [],
        iframes: !1,
        iframesTimeout: 5e3,
        separateWordSearch: !0,
        diacritics: !0,
        synonyms: {},
        accuracy: "partially",
        acrossElements: !1,
        caseSensitive: !1,
        ignoreJoiners: !1,
        ignoreGroups: 0,
        ignorePunctuation: [],
        wildcards: "disabled",
        each: () => {},
        noMatch: () => {},
        filter: () => !0,
        done: () => {},
        debug: !1,
        log: window.console,
      },
      e,
    );
  }
  get opt() {
    return this._opt;
  }
  get iterator() {
    return new le(
      this.ctx,
      this.opt.iframes,
      this.opt.exclude,
      this.opt.iframesTimeout,
    );
  }
  log(e, t = "debug") {
    const r = this.opt.log;
    this.opt.debug &&
      typeof r == "object" &&
      typeof r[t] == "function" &&
      r[t](`mark.js: ${e}`);
  }
  escapeStr(e) {
    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }
  createRegExp(e) {
    return (
      this.opt.wildcards !== "disabled" && (e = this.setupWildcardsRegExp(e)),
      (e = this.escapeStr(e)),
      Object.keys(this.opt.synonyms).length &&
        (e = this.createSynonymsRegExp(e)),
      (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) &&
        (e = this.setupIgnoreJoinersRegExp(e)),
      this.opt.diacritics && (e = this.createDiacriticsRegExp(e)),
      (e = this.createMergedBlanksRegExp(e)),
      (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) &&
        (e = this.createJoinersRegExp(e)),
      this.opt.wildcards !== "disabled" && (e = this.createWildcardsRegExp(e)),
      (e = this.createAccuracyRegExp(e)),
      e
    );
  }
  createSynonymsRegExp(e) {
    const t = this.opt.synonyms,
      r = this.opt.caseSensitive ? "" : "i",
      n =
        this.opt.ignoreJoiners || this.opt.ignorePunctuation.length ? "\0" : "";
    for (let a in t)
      if (t.hasOwnProperty(a)) {
        const i = t[a],
          s =
            this.opt.wildcards !== "disabled"
              ? this.setupWildcardsRegExp(a)
              : this.escapeStr(a),
          u =
            this.opt.wildcards !== "disabled"
              ? this.setupWildcardsRegExp(i)
              : this.escapeStr(i);
        s !== "" &&
          u !== "" &&
          (e = e.replace(
            new RegExp(`(${this.escapeStr(s)}|${this.escapeStr(u)})`, `gm${r}`),
            n + `(${this.processSynomyms(s)}|${this.processSynomyms(u)})` + n,
          ));
      }
    return e;
  }
  processSynomyms(e) {
    return (
      (this.opt.ignoreJoiners || this.opt.ignorePunctuation.length) &&
        (e = this.setupIgnoreJoinersRegExp(e)),
      e
    );
  }
  setupWildcardsRegExp(e) {
    return (
      (e = e.replace(/(?:\\)*\?/g, (t) => (t.charAt(0) === "\\" ? "?" : ""))),
      e.replace(/(?:\\)*\*/g, (t) => (t.charAt(0) === "\\" ? "*" : ""))
    );
  }
  createWildcardsRegExp(e) {
    let t = this.opt.wildcards === "withSpaces";
    return e
      .replace(/\u0001/g, t ? "[\\S\\s]?" : "\\S?")
      .replace(/\u0002/g, t ? "[\\S\\s]*?" : "\\S*");
  }
  setupIgnoreJoinersRegExp(e) {
    return e.replace(/[^(|)\\]/g, (t, r, n) => {
      let a = n.charAt(r + 1);
      return /[(|)\\]/.test(a) || a === "" ? t : t + "\0";
    });
  }
  createJoinersRegExp(e) {
    let t = [];
    const r = this.opt.ignorePunctuation;
    return (
      Array.isArray(r) && r.length && t.push(this.escapeStr(r.join(""))),
      this.opt.ignoreJoiners && t.push("\\u00ad\\u200b\\u200c\\u200d"),
      t.length ? e.split(/\u0000+/).join(`[${t.join("")}]*`) : e
    );
  }
  createDiacriticsRegExp(e) {
    const t = this.opt.caseSensitive ? "" : "i",
      r = this.opt.caseSensitive
        ? [
            "aàáảãạăằắẳẵặâầấẩẫậäåāą",
            "AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ",
            "cçćč",
            "CÇĆČ",
            "dđď",
            "DĐĎ",
            "eèéẻẽẹêềếểễệëěēę",
            "EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ",
            "iìíỉĩịîïī",
            "IÌÍỈĨỊÎÏĪ",
            "lł",
            "LŁ",
            "nñňń",
            "NÑŇŃ",
            "oòóỏõọôồốổỗộơởỡớờợöøō",
            "OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ",
            "rř",
            "RŘ",
            "sšśșş",
            "SŠŚȘŞ",
            "tťțţ",
            "TŤȚŢ",
            "uùúủũụưừứửữựûüůū",
            "UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ",
            "yýỳỷỹỵÿ",
            "YÝỲỶỸỴŸ",
            "zžżź",
            "ZŽŻŹ",
          ]
        : [
            "aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ",
            "cçćčCÇĆČ",
            "dđďDĐĎ",
            "eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ",
            "iìíỉĩịîïīIÌÍỈĨỊÎÏĪ",
            "lłLŁ",
            "nñňńNÑŇŃ",
            "oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ",
            "rřRŘ",
            "sšśșşSŠŚȘŞ",
            "tťțţTŤȚŢ",
            "uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ",
            "yýỳỷỹỵÿYÝỲỶỸỴŸ",
            "zžżźZŽŻŹ",
          ];
    let n = [];
    return (
      e.split("").forEach((a) => {
        r.every((i) => {
          if (i.indexOf(a) !== -1) {
            if (n.indexOf(i) > -1) return !1;
            (e = e.replace(new RegExp(`[${i}]`, `gm${t}`), `[${i}]`)),
              n.push(i);
          }
          return !0;
        });
      }),
      e
    );
  }
  createMergedBlanksRegExp(e) {
    return e.replace(/[\s]+/gim, "[\\s]+");
  }
  createAccuracyRegExp(e) {
    const t = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿";
    let r = this.opt.accuracy,
      n = typeof r == "string" ? r : r.value,
      a = typeof r == "string" ? [] : r.limiters,
      i = "";
    switch (
      (a.forEach((s) => {
        i += `|${this.escapeStr(s)}`;
      }),
      n)
    ) {
      case "partially":
      default:
        return `()(${e})`;
      case "complementary":
        return (
          (i = "\\s" + (i || this.escapeStr(t))), `()([^${i}]*${e}[^${i}]*)`
        );
      case "exactly":
        return `(^|\\s${i})(${e})(?=$|\\s${i})`;
    }
  }
  getSeparatedKeywords(e) {
    let t = [];
    return (
      e.forEach((r) => {
        this.opt.separateWordSearch
          ? r.split(" ").forEach((n) => {
              n.trim() && t.indexOf(n) === -1 && t.push(n);
            })
          : r.trim() && t.indexOf(r) === -1 && t.push(r);
      }),
      { keywords: t.sort((r, n) => n.length - r.length), length: t.length }
    );
  }
  isNumeric(e) {
    return Number(parseFloat(e)) == e;
  }
  checkRanges(e) {
    if (
      !Array.isArray(e) ||
      Object.prototype.toString.call(e[0]) !== "[object Object]"
    )
      return (
        this.log("markRanges() will only accept an array of objects"),
        this.opt.noMatch(e),
        []
      );
    const t = [];
    let r = 0;
    return (
      e
        .sort((n, a) => n.start - a.start)
        .forEach((n) => {
          let {
            start: a,
            end: i,
            valid: s,
          } = this.callNoMatchOnInvalidRanges(n, r);
          s && ((n.start = a), (n.length = i - a), t.push(n), (r = i));
        }),
      t
    );
  }
  callNoMatchOnInvalidRanges(e, t) {
    let r,
      n,
      a = !1;
    return (
      e && typeof e.start < "u"
        ? ((r = parseInt(e.start, 10)),
          (n = r + parseInt(e.length, 10)),
          this.isNumeric(e.start) &&
          this.isNumeric(e.length) &&
          n - t > 0 &&
          n - r > 0
            ? (a = !0)
            : (this.log(
                `Ignoring invalid or overlapping range: ${JSON.stringify(e)}`,
              ),
              this.opt.noMatch(e)))
        : (this.log(`Ignoring invalid range: ${JSON.stringify(e)}`),
          this.opt.noMatch(e)),
      { start: r, end: n, valid: a }
    );
  }
  checkWhitespaceRanges(e, t, r) {
    let n,
      a = !0,
      i = r.length,
      s = t - i,
      u = parseInt(e.start, 10) - s;
    return (
      (u = u > i ? i : u),
      (n = u + parseInt(e.length, 10)),
      n > i &&
        ((n = i),
        this.log(`End range automatically set to the max value of ${i}`)),
      u < 0 || n - u < 0 || u > i || n > i
        ? ((a = !1),
          this.log(`Invalid range: ${JSON.stringify(e)}`),
          this.opt.noMatch(e))
        : r.substring(u, n).replace(/\s+/g, "") === "" &&
          ((a = !1),
          this.log("Skipping whitespace only range: " + JSON.stringify(e)),
          this.opt.noMatch(e)),
      { start: u, end: n, valid: a }
    );
  }
  getTextNodes(e) {
    let t = "",
      r = [];
    this.iterator.forEachNode(
      NodeFilter.SHOW_TEXT,
      (n) => {
        r.push({ start: t.length, end: (t += n.textContent).length, node: n });
      },
      (n) =>
        this.matchesExclude(n.parentNode)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
      () => {
        e({ value: t, nodes: r });
      },
    );
  }
  matchesExclude(e) {
    return le.matches(
      e,
      this.opt.exclude.concat(["script", "style", "title", "head", "html"]),
    );
  }
  wrapRangeInTextNode(e, t, r) {
    const n = this.opt.element ? this.opt.element : "mark",
      a = e.splitText(t),
      i = a.splitText(r - t);
    let s = document.createElement(n);
    return (
      s.setAttribute("data-markjs", "true"),
      this.opt.className && s.setAttribute("class", this.opt.className),
      (s.textContent = a.textContent),
      a.parentNode.replaceChild(s, a),
      i
    );
  }
  wrapRangeInMappedTextNode(e, t, r, n, a) {
    e.nodes.every((i, s) => {
      const u = e.nodes[s + 1];
      if (typeof u > "u" || u.start > t) {
        if (!n(i.node)) return !1;
        const l = t - i.start,
          d = (r > i.end ? i.end : r) - i.start,
          h = e.value.substr(0, i.start),
          v = e.value.substr(d + i.start);
        if (
          ((i.node = this.wrapRangeInTextNode(i.node, l, d)),
          (e.value = h + v),
          e.nodes.forEach((y, m) => {
            m >= s &&
              (e.nodes[m].start > 0 && m !== s && (e.nodes[m].start -= d),
              (e.nodes[m].end -= d));
          }),
          (r -= d),
          a(i.node.previousSibling, i.start),
          r > i.end)
        )
          t = i.end;
        else return !1;
      }
      return !0;
    });
  }
  wrapMatches(e, t, r, n, a) {
    const i = t === 0 ? 0 : t + 1;
    this.getTextNodes((s) => {
      s.nodes.forEach((u) => {
        u = u.node;
        let l;
        for (; (l = e.exec(u.textContent)) !== null && l[i] !== ""; ) {
          if (!r(l[i], u)) continue;
          let d = l.index;
          if (i !== 0) for (let h = 1; h < i; h++) d += l[h].length;
          (u = this.wrapRangeInTextNode(u, d, d + l[i].length)),
            n(u.previousSibling),
            (e.lastIndex = 0);
        }
      }),
        a();
    });
  }
  wrapMatchesAcrossElements(e, t, r, n, a) {
    const i = t === 0 ? 0 : t + 1;
    this.getTextNodes((s) => {
      let u;
      for (; (u = e.exec(s.value)) !== null && u[i] !== ""; ) {
        let l = u.index;
        if (i !== 0) for (let h = 1; h < i; h++) l += u[h].length;
        const d = l + u[i].length;
        this.wrapRangeInMappedTextNode(
          s,
          l,
          d,
          (h) => r(u[i], h),
          (h, v) => {
            (e.lastIndex = v), n(h);
          },
        );
      }
      a();
    });
  }
  wrapRangeFromIndex(e, t, r, n) {
    this.getTextNodes((a) => {
      const i = a.value.length;
      e.forEach((s, u) => {
        let {
          start: l,
          end: d,
          valid: h,
        } = this.checkWhitespaceRanges(s, i, a.value);
        h &&
          this.wrapRangeInMappedTextNode(
            a,
            l,
            d,
            (v) => t(v, s, a.value.substring(l, d), u),
            (v) => {
              r(v, s);
            },
          );
      }),
        n();
    });
  }
  unwrapMatches(e) {
    const t = e.parentNode;
    let r = document.createDocumentFragment();
    for (; e.firstChild; ) r.appendChild(e.removeChild(e.firstChild));
    t.replaceChild(r, e), this.ie ? this.normalizeTextNode(t) : t.normalize();
  }
  normalizeTextNode(e) {
    if (e) {
      if (e.nodeType === 3)
        for (; e.nextSibling && e.nextSibling.nodeType === 3; )
          (e.nodeValue += e.nextSibling.nodeValue),
            e.parentNode.removeChild(e.nextSibling);
      else this.normalizeTextNode(e.firstChild);
      this.normalizeTextNode(e.nextSibling);
    }
  }
  markRegExp(e, t) {
    (this.opt = t), this.log(`Searching with expression "${e}"`);
    let r = 0,
      n = "wrapMatches";
    const a = (i) => {
      r++, this.opt.each(i);
    };
    this.opt.acrossElements && (n = "wrapMatchesAcrossElements"),
      this[n](
        e,
        this.opt.ignoreGroups,
        (i, s) => this.opt.filter(s, i, r),
        a,
        () => {
          r === 0 && this.opt.noMatch(e), this.opt.done(r);
        },
      );
  }
  mark(e, t) {
    this.opt = t;
    let r = 0,
      n = "wrapMatches";
    const { keywords: a, length: i } = this.getSeparatedKeywords(
        typeof e == "string" ? [e] : e,
      ),
      s = this.opt.caseSensitive ? "" : "i",
      u = (l) => {
        let d = new RegExp(this.createRegExp(l), `gm${s}`),
          h = 0;
        this.log(`Searching with expression "${d}"`),
          this[n](
            d,
            1,
            (v, y) => this.opt.filter(y, l, r, h),
            (v) => {
              h++, r++, this.opt.each(v);
            },
            () => {
              h === 0 && this.opt.noMatch(l),
                a[i - 1] === l ? this.opt.done(r) : u(a[a.indexOf(l) + 1]);
            },
          );
      };
    this.opt.acrossElements && (n = "wrapMatchesAcrossElements"),
      i === 0 ? this.opt.done(r) : u(a[0]);
  }
  markRanges(e, t) {
    this.opt = t;
    let r = 0,
      n = this.checkRanges(e);
    n && n.length
      ? (this.log(
          "Starting to mark with the following ranges: " + JSON.stringify(n),
        ),
        this.wrapRangeFromIndex(
          n,
          (a, i, s, u) => this.opt.filter(a, i, s, u),
          (a, i) => {
            r++, this.opt.each(a, i);
          },
          () => {
            this.opt.done(r);
          },
        ))
      : this.opt.done(r);
  }
  unmark(e) {
    this.opt = e;
    let t = this.opt.element ? this.opt.element : "*";
    (t += "[data-markjs]"),
      this.opt.className && (t += `.${this.opt.className}`),
      this.log(`Removal selector "${t}"`),
      this.iterator.forEachNode(
        NodeFilter.SHOW_ELEMENT,
        (r) => {
          this.unwrapMatches(r);
        },
        (r) => {
          const n = le.matches(r, t),
            a = this.matchesExclude(r);
          return !n || a ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
        },
        this.opt.done,
      );
  }
};
function Nr(o) {
  const e = new kr(o);
  return (
    (this.mark = (t, r) => (e.mark(t, r), this)),
    (this.markRegExp = (t, r) => (e.markRegExp(t, r), this)),
    (this.markRanges = (t, r) => (e.markRanges(t, r), this)),
    (this.unmark = (t) => (e.unmark(t), this)),
    this
  );
}
var V = function () {
  return (
    (V =
      Object.assign ||
      function (e) {
        for (var t, r = 1, n = arguments.length; r < n; r++) {
          t = arguments[r];
          for (var a in t)
            Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
        }
        return e;
      }),
    V.apply(this, arguments)
  );
};
function Tr(o, e, t, r) {
  function n(a) {
    return a instanceof t
      ? a
      : new t(function (i) {
          i(a);
        });
  }
  return new (t || (t = Promise))(function (a, i) {
    function s(d) {
      try {
        l(r.next(d));
      } catch (h) {
        i(h);
      }
    }
    function u(d) {
      try {
        l(r.throw(d));
      } catch (h) {
        i(h);
      }
    }
    function l(d) {
      d.done ? a(d.value) : n(d.value).then(s, u);
    }
    l((r = r.apply(o, e || [])).next());
  });
}
function Ir(o, e) {
  var t = {
      label: 0,
      sent: function () {
        if (a[0] & 1) throw a[1];
        return a[1];
      },
      trys: [],
      ops: [],
    },
    r,
    n,
    a,
    i;
  return (
    (i = { next: s(0), throw: s(1), return: s(2) }),
    typeof Symbol == "function" &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function s(l) {
    return function (d) {
      return u([l, d]);
    };
  }
  function u(l) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; i && ((i = 0), l[0] && (t = 0)), t; )
      try {
        if (
          ((r = 1),
          n &&
            (a =
              l[0] & 2
                ? n.return
                : l[0]
                ? n.throw || ((a = n.return) && a.call(n), 0)
                : n.next) &&
            !(a = a.call(n, l[1])).done)
        )
          return a;
        switch (((n = 0), a && (l = [l[0] & 2, a.value]), l[0])) {
          case 0:
          case 1:
            a = l;
            break;
          case 4:
            return t.label++, { value: l[1], done: !1 };
          case 5:
            t.label++, (n = l[1]), (l = [0]);
            continue;
          case 7:
            (l = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((a = t.trys),
              !(a = a.length > 0 && a[a.length - 1]) &&
                (l[0] === 6 || l[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (l[0] === 3 && (!a || (l[1] > a[0] && l[1] < a[3]))) {
              t.label = l[1];
              break;
            }
            if (l[0] === 6 && t.label < a[1]) {
              (t.label = a[1]), (a = l);
              break;
            }
            if (a && t.label < a[2]) {
              (t.label = a[2]), t.ops.push(l);
              break;
            }
            a[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        l = e.call(o, t);
      } catch (d) {
        (l = [6, d]), (n = 0);
      } finally {
        r = a = 0;
      }
    if (l[0] & 5) throw l[1];
    return { value: l[0] ? l[1] : void 0, done: !0 };
  }
}
function _(o) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    t = e && o[e],
    r = 0;
  if (t) return t.call(o);
  if (o && typeof o.length == "number")
    return {
      next: function () {
        return (
          o && r >= o.length && (o = void 0), { value: o && o[r++], done: !o }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined.",
  );
}
function $(o, e) {
  var t = typeof Symbol == "function" && o[Symbol.iterator];
  if (!t) return o;
  var r = t.call(o),
    n,
    a = [],
    i;
  try {
    for (; (e === void 0 || e-- > 0) && !(n = r.next()).done; ) a.push(n.value);
  } catch (s) {
    i = { error: s };
  } finally {
    try {
      n && !n.done && (t = r.return) && t.call(r);
    } finally {
      if (i) throw i.error;
    }
  }
  return a;
}
var Dr = "ENTRIES",
  xt = "KEYS",
  Ft = "VALUES",
  j = "",
  _e = (function () {
    function o(e, t) {
      var r = e._tree,
        n = Array.from(r.keys());
      (this.set = e),
        (this._type = t),
        (this._path = n.length > 0 ? [{ node: r, keys: n }] : []);
    }
    return (
      (o.prototype.next = function () {
        var e = this.dive();
        return this.backtrack(), e;
      }),
      (o.prototype.dive = function () {
        if (this._path.length === 0) return { done: !0, value: void 0 };
        var e = ue(this._path),
          t = e.node,
          r = e.keys;
        if (ue(r) === j) return { done: !1, value: this.result() };
        var n = t.get(ue(r));
        return (
          this._path.push({ node: n, keys: Array.from(n.keys()) }), this.dive()
        );
      }),
      (o.prototype.backtrack = function () {
        if (this._path.length !== 0) {
          var e = ue(this._path).keys;
          e.pop(), !(e.length > 0) && (this._path.pop(), this.backtrack());
        }
      }),
      (o.prototype.key = function () {
        return (
          this.set._prefix +
          this._path
            .map(function (e) {
              var t = e.keys;
              return ue(t);
            })
            .filter(function (e) {
              return e !== j;
            })
            .join("")
        );
      }),
      (o.prototype.value = function () {
        return ue(this._path).node.get(j);
      }),
      (o.prototype.result = function () {
        switch (this._type) {
          case Ft:
            return this.value();
          case xt:
            return this.key();
          default:
            return [this.key(), this.value()];
        }
      }),
      (o.prototype[Symbol.iterator] = function () {
        return this;
      }),
      o
    );
  })(),
  ue = function (o) {
    return o[o.length - 1];
  },
  _r = function (o, e, t) {
    var r = new Map();
    if (e === void 0) return r;
    for (
      var n = e.length + 1,
        a = n + t,
        i = new Uint8Array(a * n).fill(t + 1),
        s = 0;
      s < n;
      ++s
    )
      i[s] = s;
    for (var u = 1; u < a; ++u) i[u * n] = u;
    return Et(o, e, t, r, i, 1, n, ""), r;
  },
  Et = function (o, e, t, r, n, a, i, s) {
    var u,
      l,
      d = a * i;
    try {
      e: for (var h = _(o.keys()), v = h.next(); !v.done; v = h.next()) {
        var y = v.value;
        if (y === j) {
          var m = n[d - 1];
          m <= t && r.set(s, [o.get(y), m]);
        } else {
          for (var E = a, x = 0; x < y.length; ++x, ++E) {
            for (
              var C = y[x],
                k = i * E,
                A = k - i,
                M = n[k],
                L = Math.max(0, E - t - 1),
                D = Math.min(i - 1, E + t),
                N = L;
              N < D;
              ++N
            ) {
              var I = C !== e[N],
                R = n[A + N] + +I,
                F = n[A + N + 1] + 1,
                c = n[k + N] + 1,
                f = (n[k + N + 1] = Math.min(R, F, c));
              f < M && (M = f);
            }
            if (M > t) continue e;
          }
          Et(o.get(y), e, t, r, n, E, i, s + y);
        }
      }
    } catch (p) {
      u = { error: p };
    } finally {
      try {
        v && !v.done && (l = h.return) && l.call(h);
      } finally {
        if (u) throw u.error;
      }
    }
  },
  Oe = (function () {
    function o(e, t) {
      e === void 0 && (e = new Map()),
        t === void 0 && (t = ""),
        (this._size = void 0),
        (this._tree = e),
        (this._prefix = t);
    }
    return (
      (o.prototype.atPrefix = function (e) {
        var t, r;
        if (!e.startsWith(this._prefix)) throw new Error("Mismatched prefix");
        var n = $(ke(this._tree, e.slice(this._prefix.length)), 2),
          a = n[0],
          i = n[1];
        if (a === void 0) {
          var s = $(je(i), 2),
            u = s[0],
            l = s[1];
          try {
            for (var d = _(u.keys()), h = d.next(); !h.done; h = d.next()) {
              var v = h.value;
              if (v !== j && v.startsWith(l)) {
                var y = new Map();
                return y.set(v.slice(l.length), u.get(v)), new o(y, e);
              }
            }
          } catch (m) {
            t = { error: m };
          } finally {
            try {
              h && !h.done && (r = d.return) && r.call(d);
            } finally {
              if (t) throw t.error;
            }
          }
        }
        return new o(a, e);
      }),
      (o.prototype.clear = function () {
        (this._size = void 0), this._tree.clear();
      }),
      (o.prototype.delete = function (e) {
        return (this._size = void 0), Or(this._tree, e);
      }),
      (o.prototype.entries = function () {
        return new _e(this, Dr);
      }),
      (o.prototype.forEach = function (e) {
        var t, r;
        try {
          for (var n = _(this), a = n.next(); !a.done; a = n.next()) {
            var i = $(a.value, 2),
              s = i[0],
              u = i[1];
            e(s, u, this);
          }
        } catch (l) {
          t = { error: l };
        } finally {
          try {
            a && !a.done && (r = n.return) && r.call(n);
          } finally {
            if (t) throw t.error;
          }
        }
      }),
      (o.prototype.fuzzyGet = function (e, t) {
        return _r(this._tree, e, t);
      }),
      (o.prototype.get = function (e) {
        var t = Ve(this._tree, e);
        return t !== void 0 ? t.get(j) : void 0;
      }),
      (o.prototype.has = function (e) {
        var t = Ve(this._tree, e);
        return t !== void 0 && t.has(j);
      }),
      (o.prototype.keys = function () {
        return new _e(this, xt);
      }),
      (o.prototype.set = function (e, t) {
        if (typeof e != "string") throw new Error("key must be a string");
        this._size = void 0;
        var r = Re(this._tree, e);
        return r.set(j, t), this;
      }),
      Object.defineProperty(o.prototype, "size", {
        get: function () {
          if (this._size) return this._size;
          this._size = 0;
          for (var e = this.entries(); !e.next().done; ) this._size += 1;
          return this._size;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (o.prototype.update = function (e, t) {
        if (typeof e != "string") throw new Error("key must be a string");
        this._size = void 0;
        var r = Re(this._tree, e);
        return r.set(j, t(r.get(j))), this;
      }),
      (o.prototype.fetch = function (e, t) {
        if (typeof e != "string") throw new Error("key must be a string");
        this._size = void 0;
        var r = Re(this._tree, e),
          n = r.get(j);
        return n === void 0 && r.set(j, (n = t())), n;
      }),
      (o.prototype.values = function () {
        return new _e(this, Ft);
      }),
      (o.prototype[Symbol.iterator] = function () {
        return this.entries();
      }),
      (o.from = function (e) {
        var t,
          r,
          n = new o();
        try {
          for (var a = _(e), i = a.next(); !i.done; i = a.next()) {
            var s = $(i.value, 2),
              u = s[0],
              l = s[1];
            n.set(u, l);
          }
        } catch (d) {
          t = { error: d };
        } finally {
          try {
            i && !i.done && (r = a.return) && r.call(a);
          } finally {
            if (t) throw t.error;
          }
        }
        return n;
      }),
      (o.fromObject = function (e) {
        return o.from(Object.entries(e));
      }),
      o
    );
  })(),
  ke = function (o, e, t) {
    var r, n;
    if ((t === void 0 && (t = []), e.length === 0 || o == null)) return [o, t];
    try {
      for (var a = _(o.keys()), i = a.next(); !i.done; i = a.next()) {
        var s = i.value;
        if (s !== j && e.startsWith(s))
          return t.push([o, s]), ke(o.get(s), e.slice(s.length), t);
      }
    } catch (u) {
      r = { error: u };
    } finally {
      try {
        i && !i.done && (n = a.return) && n.call(a);
      } finally {
        if (r) throw r.error;
      }
    }
    return t.push([o, e]), ke(void 0, "", t);
  },
  Ve = function (o, e) {
    var t, r;
    if (e.length === 0 || o == null) return o;
    try {
      for (var n = _(o.keys()), a = n.next(); !a.done; a = n.next()) {
        var i = a.value;
        if (i !== j && e.startsWith(i)) return Ve(o.get(i), e.slice(i.length));
      }
    } catch (s) {
      t = { error: s };
    } finally {
      try {
        a && !a.done && (r = n.return) && r.call(n);
      } finally {
        if (t) throw t.error;
      }
    }
  },
  Re = function (o, e) {
    var t,
      r,
      n = e.length;
    e: for (var a = 0; o && a < n; ) {
      try {
        for (
          var i = ((t = void 0), _(o.keys())), s = i.next();
          !s.done;
          s = i.next()
        ) {
          var u = s.value;
          if (u !== j && e[a] === u[0]) {
            for (
              var l = Math.min(n - a, u.length), d = 1;
              d < l && e[a + d] === u[d];

            )
              ++d;
            var h = o.get(u);
            if (d === u.length) o = h;
            else {
              var v = new Map();
              v.set(u.slice(d), h),
                o.set(e.slice(a, a + d), v),
                o.delete(u),
                (o = v);
            }
            a += d;
            continue e;
          }
        }
      } catch (m) {
        t = { error: m };
      } finally {
        try {
          s && !s.done && (r = i.return) && r.call(i);
        } finally {
          if (t) throw t.error;
        }
      }
      var y = new Map();
      return o.set(e.slice(a), y), y;
    }
    return o;
  },
  Or = function (o, e) {
    var t = $(ke(o, e), 2),
      r = t[0],
      n = t[1];
    if (r !== void 0) {
      if ((r.delete(j), r.size === 0)) St(n);
      else if (r.size === 1) {
        var a = $(r.entries().next().value, 2),
          i = a[0],
          s = a[1];
        At(n, i, s);
      }
    }
  },
  St = function (o) {
    if (o.length !== 0) {
      var e = $(je(o), 2),
        t = e[0],
        r = e[1];
      if ((t.delete(r), t.size === 0)) St(o.slice(0, -1));
      else if (t.size === 1) {
        var n = $(t.entries().next().value, 2),
          a = n[0],
          i = n[1];
        a !== j && At(o.slice(0, -1), a, i);
      }
    }
  },
  At = function (o, e, t) {
    if (o.length !== 0) {
      var r = $(je(o), 2),
        n = r[0],
        a = r[1];
      n.set(a + e, t), n.delete(a);
    }
  },
  je = function (o) {
    return o[o.length - 1];
  },
  pe,
  Ke = "or",
  Ct = "and",
  Rr = "and_not",
  Mr = (function () {
    function o(e) {
      if ((e == null ? void 0 : e.fields) == null)
        throw new Error('MiniSearch: option "fields" must be provided');
      var t = e.autoVacuum == null || e.autoVacuum === !0 ? Pe : e.autoVacuum;
      (this._options = V(V(V({}, Le), e), {
        autoVacuum: t,
        searchOptions: V(V({}, ct), e.searchOptions || {}),
        autoSuggestOptions: V(V({}, Vr), e.autoSuggestOptions || {}),
      })),
        (this._index = new Oe()),
        (this._documentCount = 0),
        (this._documentIds = new Map()),
        (this._idToShortId = new Map()),
        (this._fieldIds = {}),
        (this._fieldLength = new Map()),
        (this._avgFieldLength = []),
        (this._nextId = 0),
        (this._storedFields = new Map()),
        (this._dirtCount = 0),
        (this._currentVacuum = null),
        (this._enqueuedVacuum = null),
        (this._enqueuedVacuumConditions = We),
        this.addFields(this._options.fields);
    }
    return (
      (o.prototype.add = function (e) {
        var t,
          r,
          n,
          a,
          i,
          s,
          u = this._options,
          l = u.extractField,
          d = u.tokenize,
          h = u.processTerm,
          v = u.fields,
          y = u.idField,
          m = l(e, y);
        if (m == null)
          throw new Error(
            'MiniSearch: document does not have ID field "'.concat(y, '"'),
          );
        if (this._idToShortId.has(m))
          throw new Error("MiniSearch: duplicate ID ".concat(m));
        var E = this.addDocumentId(m);
        this.saveStoredFields(E, e);
        try {
          for (var x = _(v), C = x.next(); !C.done; C = x.next()) {
            var k = C.value,
              A = l(e, k);
            if (A != null) {
              var M = d(A.toString(), k),
                L = this._fieldIds[k],
                D = new Set(M).size;
              this.addFieldLength(E, L, this._documentCount - 1, D);
              try {
                for (
                  var N = ((n = void 0), _(M)), I = N.next();
                  !I.done;
                  I = N.next()
                ) {
                  var R = I.value,
                    F = h(R, k);
                  if (Array.isArray(F))
                    try {
                      for (
                        var c = ((i = void 0), _(F)), f = c.next();
                        !f.done;
                        f = c.next()
                      ) {
                        var p = f.value;
                        this.addTerm(L, E, p);
                      }
                    } catch (w) {
                      i = { error: w };
                    } finally {
                      try {
                        f && !f.done && (s = c.return) && s.call(c);
                      } finally {
                        if (i) throw i.error;
                      }
                    }
                  else F && this.addTerm(L, E, F);
                }
              } catch (w) {
                n = { error: w };
              } finally {
                try {
                  I && !I.done && (a = N.return) && a.call(N);
                } finally {
                  if (n) throw n.error;
                }
              }
            }
          }
        } catch (w) {
          t = { error: w };
        } finally {
          try {
            C && !C.done && (r = x.return) && r.call(x);
          } finally {
            if (t) throw t.error;
          }
        }
      }),
      (o.prototype.addAll = function (e) {
        var t, r;
        try {
          for (var n = _(e), a = n.next(); !a.done; a = n.next()) {
            var i = a.value;
            this.add(i);
          }
        } catch (s) {
          t = { error: s };
        } finally {
          try {
            a && !a.done && (r = n.return) && r.call(n);
          } finally {
            if (t) throw t.error;
          }
        }
      }),
      (o.prototype.addAllAsync = function (e, t) {
        var r = this;
        t === void 0 && (t = {});
        var n = t.chunkSize,
          a = n === void 0 ? 10 : n,
          i = { chunk: [], promise: Promise.resolve() },
          s = e.reduce(function (d, h, v) {
            var y = d.chunk,
              m = d.promise;
            return (
              y.push(h),
              (v + 1) % a === 0
                ? {
                    chunk: [],
                    promise: m
                      .then(function () {
                        return new Promise(function (E) {
                          return setTimeout(E, 0);
                        });
                      })
                      .then(function () {
                        return r.addAll(y);
                      }),
                  }
                : { chunk: y, promise: m }
            );
          }, i),
          u = s.chunk,
          l = s.promise;
        return l.then(function () {
          return r.addAll(u);
        });
      }),
      (o.prototype.remove = function (e) {
        var t,
          r,
          n,
          a,
          i,
          s,
          u = this._options,
          l = u.tokenize,
          d = u.processTerm,
          h = u.extractField,
          v = u.fields,
          y = u.idField,
          m = h(e, y);
        if (m == null)
          throw new Error(
            'MiniSearch: document does not have ID field "'.concat(y, '"'),
          );
        var E = this._idToShortId.get(m);
        if (E == null)
          throw new Error(
            "MiniSearch: cannot remove document with ID ".concat(
              m,
              ": it is not in the index",
            ),
          );
        try {
          for (var x = _(v), C = x.next(); !C.done; C = x.next()) {
            var k = C.value,
              A = h(e, k);
            if (A != null) {
              var M = l(A.toString(), k),
                L = this._fieldIds[k],
                D = new Set(M).size;
              this.removeFieldLength(E, L, this._documentCount, D);
              try {
                for (
                  var N = ((n = void 0), _(M)), I = N.next();
                  !I.done;
                  I = N.next()
                ) {
                  var R = I.value,
                    F = d(R, k);
                  if (Array.isArray(F))
                    try {
                      for (
                        var c = ((i = void 0), _(F)), f = c.next();
                        !f.done;
                        f = c.next()
                      ) {
                        var p = f.value;
                        this.removeTerm(L, E, p);
                      }
                    } catch (w) {
                      i = { error: w };
                    } finally {
                      try {
                        f && !f.done && (s = c.return) && s.call(c);
                      } finally {
                        if (i) throw i.error;
                      }
                    }
                  else F && this.removeTerm(L, E, F);
                }
              } catch (w) {
                n = { error: w };
              } finally {
                try {
                  I && !I.done && (a = N.return) && a.call(N);
                } finally {
                  if (n) throw n.error;
                }
              }
            }
          }
        } catch (w) {
          t = { error: w };
        } finally {
          try {
            C && !C.done && (r = x.return) && r.call(x);
          } finally {
            if (t) throw t.error;
          }
        }
        this._storedFields.delete(E),
          this._documentIds.delete(E),
          this._idToShortId.delete(m),
          this._fieldLength.delete(E),
          (this._documentCount -= 1);
      }),
      (o.prototype.removeAll = function (e) {
        var t, r;
        if (e)
          try {
            for (var n = _(e), a = n.next(); !a.done; a = n.next()) {
              var i = a.value;
              this.remove(i);
            }
          } catch (s) {
            t = { error: s };
          } finally {
            try {
              a && !a.done && (r = n.return) && r.call(n);
            } finally {
              if (t) throw t.error;
            }
          }
        else {
          if (arguments.length > 0)
            throw new Error(
              "Expected documents to be present. Omit the argument to remove all documents.",
            );
          (this._index = new Oe()),
            (this._documentCount = 0),
            (this._documentIds = new Map()),
            (this._idToShortId = new Map()),
            (this._fieldLength = new Map()),
            (this._avgFieldLength = []),
            (this._storedFields = new Map()),
            (this._nextId = 0);
        }
      }),
      (o.prototype.discard = function (e) {
        var t = this,
          r = this._idToShortId.get(e);
        if (r == null)
          throw new Error(
            "MiniSearch: cannot discard document with ID ".concat(
              e,
              ": it is not in the index",
            ),
          );
        this._idToShortId.delete(e),
          this._documentIds.delete(r),
          this._storedFields.delete(r),
          (this._fieldLength.get(r) || []).forEach(function (n, a) {
            t.removeFieldLength(r, a, t._documentCount, n);
          }),
          this._fieldLength.delete(r),
          (this._documentCount -= 1),
          (this._dirtCount += 1),
          this.maybeAutoVacuum();
      }),
      (o.prototype.maybeAutoVacuum = function () {
        if (this._options.autoVacuum !== !1) {
          var e = this._options.autoVacuum,
            t = e.minDirtFactor,
            r = e.minDirtCount,
            n = e.batchSize,
            a = e.batchWait;
          this.conditionalVacuum(
            { batchSize: n, batchWait: a },
            { minDirtCount: r, minDirtFactor: t },
          );
        }
      }),
      (o.prototype.discardAll = function (e) {
        var t,
          r,
          n = this._options.autoVacuum;
        try {
          this._options.autoVacuum = !1;
          try {
            for (var a = _(e), i = a.next(); !i.done; i = a.next()) {
              var s = i.value;
              this.discard(s);
            }
          } catch (u) {
            t = { error: u };
          } finally {
            try {
              i && !i.done && (r = a.return) && r.call(a);
            } finally {
              if (t) throw t.error;
            }
          }
        } finally {
          this._options.autoVacuum = n;
        }
        this.maybeAutoVacuum();
      }),
      (o.prototype.replace = function (e) {
        var t = this._options,
          r = t.idField,
          n = t.extractField,
          a = n(e, r);
        this.discard(a), this.add(e);
      }),
      (o.prototype.vacuum = function (e) {
        return e === void 0 && (e = {}), this.conditionalVacuum(e);
      }),
      (o.prototype.conditionalVacuum = function (e, t) {
        var r = this;
        return this._currentVacuum
          ? ((this._enqueuedVacuumConditions =
              this._enqueuedVacuumConditions && t),
            this._enqueuedVacuum != null
              ? this._enqueuedVacuum
              : ((this._enqueuedVacuum = this._currentVacuum.then(function () {
                  var n = r._enqueuedVacuumConditions;
                  return (
                    (r._enqueuedVacuumConditions = We), r.performVacuuming(e, n)
                  );
                })),
                this._enqueuedVacuum))
          : this.vacuumConditionsMet(t) === !1
          ? Promise.resolve()
          : ((this._currentVacuum = this.performVacuuming(e)),
            this._currentVacuum);
      }),
      (o.prototype.performVacuuming = function (e, t) {
        return Tr(this, void 0, void 0, function () {
          var r,
            n,
            a,
            i,
            s,
            u,
            l,
            d,
            h,
            v,
            y,
            m,
            E,
            x,
            C,
            k,
            A,
            M,
            L,
            D,
            N,
            I,
            R,
            F,
            c;
          return Ir(this, function (f) {
            switch (f.label) {
              case 0:
                if (((r = this._dirtCount), !this.vacuumConditionsMet(t)))
                  return [3, 10];
                (n = e.batchSize || $e.batchSize),
                  (a = e.batchWait || $e.batchWait),
                  (i = 1),
                  (f.label = 1);
              case 1:
                f.trys.push([1, 7, 8, 9]),
                  (s = _(this._index)),
                  (u = s.next()),
                  (f.label = 2);
              case 2:
                if (u.done) return [3, 6];
                (l = $(u.value, 2)), (d = l[0]), (h = l[1]);
                try {
                  for (
                    v = ((I = void 0), _(h)), y = v.next();
                    !y.done;
                    y = v.next()
                  ) {
                    (m = $(y.value, 2)), (E = m[0]), (x = m[1]);
                    try {
                      for (
                        C = ((F = void 0), _(x)), k = C.next();
                        !k.done;
                        k = C.next()
                      )
                        (A = $(k.value, 1)),
                          (M = A[0]),
                          !this._documentIds.has(M) &&
                            (x.size <= 1 ? h.delete(E) : x.delete(M));
                    } catch (p) {
                      F = { error: p };
                    } finally {
                      try {
                        k && !k.done && (c = C.return) && c.call(C);
                      } finally {
                        if (F) throw F.error;
                      }
                    }
                  }
                } catch (p) {
                  I = { error: p };
                } finally {
                  try {
                    y && !y.done && (R = v.return) && R.call(v);
                  } finally {
                    if (I) throw I.error;
                  }
                }
                return (
                  this._index.get(d).size === 0 && this._index.delete(d),
                  i % n !== 0
                    ? [3, 4]
                    : [
                        4,
                        new Promise(function (p) {
                          return setTimeout(p, a);
                        }),
                      ]
                );
              case 3:
                f.sent(), (f.label = 4);
              case 4:
                (i += 1), (f.label = 5);
              case 5:
                return (u = s.next()), [3, 2];
              case 6:
                return [3, 9];
              case 7:
                return (L = f.sent()), (D = { error: L }), [3, 9];
              case 8:
                try {
                  u && !u.done && (N = s.return) && N.call(s);
                } finally {
                  if (D) throw D.error;
                }
                return [7];
              case 9:
                (this._dirtCount -= r), (f.label = 10);
              case 10:
                return [4, null];
              case 11:
                return (
                  f.sent(),
                  (this._currentVacuum = this._enqueuedVacuum),
                  (this._enqueuedVacuum = null),
                  [2]
                );
            }
          });
        });
      }),
      (o.prototype.vacuumConditionsMet = function (e) {
        if (e == null) return !0;
        var t = e.minDirtCount,
          r = e.minDirtFactor;
        return (
          (t = t || Pe.minDirtCount),
          (r = r || Pe.minDirtFactor),
          this.dirtCount >= t && this.dirtFactor >= r
        );
      }),
      Object.defineProperty(o.prototype, "isVacuuming", {
        get: function () {
          return this._currentVacuum != null;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "dirtCount", {
        get: function () {
          return this._dirtCount;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "dirtFactor", {
        get: function () {
          return this._dirtCount / (1 + this._documentCount + this._dirtCount);
        },
        enumerable: !1,
        configurable: !0,
      }),
      (o.prototype.has = function (e) {
        return this._idToShortId.has(e);
      }),
      (o.prototype.getStoredFields = function (e) {
        var t = this._idToShortId.get(e);
        if (t != null) return this._storedFields.get(t);
      }),
      (o.prototype.search = function (e, t) {
        var r, n;
        t === void 0 && (t = {});
        var a = this.executeQuery(e, t),
          i = [];
        try {
          for (var s = _(a), u = s.next(); !u.done; u = s.next()) {
            var l = $(u.value, 2),
              d = l[0],
              h = l[1],
              v = h.score,
              y = h.terms,
              m = h.match,
              E = y.length,
              x = {
                id: this._documentIds.get(d),
                score: v * E,
                terms: Object.keys(m),
                match: m,
              };
            Object.assign(x, this._storedFields.get(d)),
              (t.filter == null || t.filter(x)) && i.push(x);
          }
        } catch (C) {
          r = { error: C };
        } finally {
          try {
            u && !u.done && (n = s.return) && n.call(s);
          } finally {
            if (r) throw r.error;
          }
        }
        return i.sort(ht), i;
      }),
      (o.prototype.autoSuggest = function (e, t) {
        var r, n, a, i;
        t === void 0 && (t = {}),
          (t = V(V({}, this._options.autoSuggestOptions), t));
        var s = new Map();
        try {
          for (
            var u = _(this.search(e, t)), l = u.next();
            !l.done;
            l = u.next()
          ) {
            var d = l.value,
              h = d.score,
              v = d.terms,
              y = v.join(" "),
              m = s.get(y);
            m != null
              ? ((m.score += h), (m.count += 1))
              : s.set(y, { score: h, terms: v, count: 1 });
          }
        } catch (L) {
          r = { error: L };
        } finally {
          try {
            l && !l.done && (n = u.return) && n.call(u);
          } finally {
            if (r) throw r.error;
          }
        }
        var E = [];
        try {
          for (var x = _(s), C = x.next(); !C.done; C = x.next()) {
            var k = $(C.value, 2),
              m = k[0],
              A = k[1],
              h = A.score,
              v = A.terms,
              M = A.count;
            E.push({ suggestion: m, terms: v, score: h / M });
          }
        } catch (L) {
          a = { error: L };
        } finally {
          try {
            C && !C.done && (i = x.return) && i.call(x);
          } finally {
            if (a) throw a.error;
          }
        }
        return E.sort(ht), E;
      }),
      Object.defineProperty(o.prototype, "documentCount", {
        get: function () {
          return this._documentCount;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(o.prototype, "termCount", {
        get: function () {
          return this._index.size;
        },
        enumerable: !1,
        configurable: !0,
      }),
      (o.loadJSON = function (e, t) {
        if (t == null)
          throw new Error(
            "MiniSearch: loadJSON should be given the same options used when serializing the index",
          );
        return this.loadJS(JSON.parse(e), t);
      }),
      (o.getDefault = function (e) {
        if (Le.hasOwnProperty(e)) return Me(Le, e);
        throw new Error('MiniSearch: unknown option "'.concat(e, '"'));
      }),
      (o.loadJS = function (e, t) {
        var r,
          n,
          a,
          i,
          s,
          u,
          l = e.index,
          d = e.documentCount,
          h = e.nextId,
          v = e.documentIds,
          y = e.fieldIds,
          m = e.fieldLength,
          E = e.averageFieldLength,
          x = e.storedFields,
          C = e.dirtCount,
          k = e.serializationVersion;
        if (k !== 1 && k !== 2)
          throw new Error(
            "MiniSearch: cannot deserialize an index created with an incompatible version",
          );
        var A = new o(t);
        (A._documentCount = d),
          (A._nextId = h),
          (A._documentIds = Fe(v)),
          (A._idToShortId = new Map()),
          (A._fieldIds = y),
          (A._fieldLength = Fe(m)),
          (A._avgFieldLength = E),
          (A._storedFields = Fe(x)),
          (A._dirtCount = C || 0),
          (A._index = new Oe());
        try {
          for (var M = _(A._documentIds), L = M.next(); !L.done; L = M.next()) {
            var D = $(L.value, 2),
              N = D[0],
              I = D[1];
            A._idToShortId.set(I, N);
          }
        } catch (b) {
          r = { error: b };
        } finally {
          try {
            L && !L.done && (n = M.return) && n.call(M);
          } finally {
            if (r) throw r.error;
          }
        }
        try {
          for (var R = _(l), F = R.next(); !F.done; F = R.next()) {
            var c = $(F.value, 2),
              f = c[0],
              p = c[1],
              w = new Map();
            try {
              for (
                var T = ((s = void 0), _(Object.keys(p))), O = T.next();
                !O.done;
                O = T.next()
              ) {
                var P = O.value,
                  g = p[P];
                k === 1 && (g = g.ds), w.set(parseInt(P, 10), Fe(g));
              }
            } catch (b) {
              s = { error: b };
            } finally {
              try {
                O && !O.done && (u = T.return) && u.call(T);
              } finally {
                if (s) throw s.error;
              }
            }
            A._index.set(f, w);
          }
        } catch (b) {
          a = { error: b };
        } finally {
          try {
            F && !F.done && (i = R.return) && i.call(R);
          } finally {
            if (a) throw a.error;
          }
        }
        return A;
      }),
      (o.prototype.executeQuery = function (e, t) {
        var r = this;
        if ((t === void 0 && (t = {}), typeof e != "string")) {
          var n = V(V(V({}, t), e), { queries: void 0 }),
            a = e.queries.map(function (x) {
              return r.executeQuery(x, n);
            });
          return this.combineResults(a, n.combineWith);
        }
        var i = this._options,
          s = i.tokenize,
          u = i.processTerm,
          l = i.searchOptions,
          d = V(V({ tokenize: s, processTerm: u }, l), t),
          h = d.tokenize,
          v = d.processTerm,
          y = h(e)
            .flatMap(function (x) {
              return v(x);
            })
            .filter(function (x) {
              return !!x;
            }),
          m = y.map(Br(d)),
          E = m.map(function (x) {
            return r.executeQuerySpec(x, d);
          });
        return this.combineResults(E, d.combineWith);
      }),
      (o.prototype.executeQuerySpec = function (e, t) {
        var r,
          n,
          a,
          i,
          s = V(V({}, this._options.searchOptions), t),
          u = (s.fields || this._options.fields).reduce(function (P, g) {
            var b;
            return V(V({}, P), ((b = {}), (b[g] = Me(s.boost, g) || 1), b));
          }, {}),
          l = s.boostDocument,
          d = s.weights,
          h = s.maxFuzzy,
          v = s.bm25,
          y = V(V({}, ct.weights), d),
          m = y.fuzzy,
          E = y.prefix,
          x = this._index.get(e.term),
          C = this.termResults(e.term, e.term, 1, x, u, l, v),
          k,
          A;
        if ((e.prefix && (k = this._index.atPrefix(e.term)), e.fuzzy)) {
          var M = e.fuzzy === !0 ? 0.2 : e.fuzzy,
            L = M < 1 ? Math.min(h, Math.round(e.term.length * M)) : M;
          L && (A = this._index.fuzzyGet(e.term, L));
        }
        if (k)
          try {
            for (var D = _(k), N = D.next(); !N.done; N = D.next()) {
              var I = $(N.value, 2),
                R = I[0],
                F = I[1],
                c = R.length - e.term.length;
              if (c) {
                A == null || A.delete(R);
                var f = (E * R.length) / (R.length + 0.3 * c);
                this.termResults(e.term, R, f, F, u, l, v, C);
              }
            }
          } catch (P) {
            r = { error: P };
          } finally {
            try {
              N && !N.done && (n = D.return) && n.call(D);
            } finally {
              if (r) throw r.error;
            }
          }
        if (A)
          try {
            for (var p = _(A.keys()), w = p.next(); !w.done; w = p.next()) {
              var R = w.value,
                T = $(A.get(R), 2),
                O = T[0],
                c = T[1];
              if (c) {
                var f = (m * R.length) / (R.length + c);
                this.termResults(e.term, R, f, O, u, l, v, C);
              }
            }
          } catch (P) {
            a = { error: P };
          } finally {
            try {
              w && !w.done && (i = p.return) && i.call(p);
            } finally {
              if (a) throw a.error;
            }
          }
        return C;
      }),
      (o.prototype.combineResults = function (e, t) {
        if ((t === void 0 && (t = Ke), e.length === 0)) return new Map();
        var r = t.toLowerCase();
        return e.reduce(Lr[r]) || new Map();
      }),
      (o.prototype.toJSON = function () {
        var e,
          t,
          r,
          n,
          a = [];
        try {
          for (var i = _(this._index), s = i.next(); !s.done; s = i.next()) {
            var u = $(s.value, 2),
              l = u[0],
              d = u[1],
              h = {};
            try {
              for (
                var v = ((r = void 0), _(d)), y = v.next();
                !y.done;
                y = v.next()
              ) {
                var m = $(y.value, 2),
                  E = m[0],
                  x = m[1];
                h[E] = Object.fromEntries(x);
              }
            } catch (C) {
              r = { error: C };
            } finally {
              try {
                y && !y.done && (n = v.return) && n.call(v);
              } finally {
                if (r) throw r.error;
              }
            }
            a.push([l, h]);
          }
        } catch (C) {
          e = { error: C };
        } finally {
          try {
            s && !s.done && (t = i.return) && t.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return {
          documentCount: this._documentCount,
          nextId: this._nextId,
          documentIds: Object.fromEntries(this._documentIds),
          fieldIds: this._fieldIds,
          fieldLength: Object.fromEntries(this._fieldLength),
          averageFieldLength: this._avgFieldLength,
          storedFields: Object.fromEntries(this._storedFields),
          dirtCount: this._dirtCount,
          index: a,
          serializationVersion: 2,
        };
      }),
      (o.prototype.termResults = function (e, t, r, n, a, i, s, u) {
        var l, d, h, v, y;
        if ((u === void 0 && (u = new Map()), n == null)) return u;
        try {
          for (var m = _(Object.keys(a)), E = m.next(); !E.done; E = m.next()) {
            var x = E.value,
              C = a[x],
              k = this._fieldIds[x],
              A = n.get(k);
            if (A != null) {
              var M = A.size,
                L = this._avgFieldLength[k];
              try {
                for (
                  var D = ((h = void 0), _(A.keys())), N = D.next();
                  !N.done;
                  N = D.next()
                ) {
                  var I = N.value;
                  if (!this._documentIds.has(I)) {
                    this.removeTerm(k, I, t), (M -= 1);
                    continue;
                  }
                  var R = i
                    ? i(this._documentIds.get(I), t, this._storedFields.get(I))
                    : 1;
                  if (R) {
                    var F = A.get(I),
                      c = this._fieldLength.get(I)[k],
                      f = zr(F, M, this._documentCount, c, L, s),
                      p = r * C * R * f,
                      w = u.get(I);
                    if (w) {
                      (w.score += p), $r(w.terms, e);
                      var T = Me(w.match, t);
                      T ? T.push(x) : (w.match[t] = [x]);
                    } else
                      u.set(I, {
                        score: p,
                        terms: [e],
                        match: ((y = {}), (y[t] = [x]), y),
                      });
                  }
                }
              } catch (O) {
                h = { error: O };
              } finally {
                try {
                  N && !N.done && (v = D.return) && v.call(D);
                } finally {
                  if (h) throw h.error;
                }
              }
            }
          }
        } catch (O) {
          l = { error: O };
        } finally {
          try {
            E && !E.done && (d = m.return) && d.call(m);
          } finally {
            if (l) throw l.error;
          }
        }
        return u;
      }),
      (o.prototype.addTerm = function (e, t, r) {
        var n = this._index.fetch(r, dt),
          a = n.get(e);
        if (a == null) (a = new Map()), a.set(t, 1), n.set(e, a);
        else {
          var i = a.get(t);
          a.set(t, (i || 0) + 1);
        }
      }),
      (o.prototype.removeTerm = function (e, t, r) {
        if (!this._index.has(r)) {
          this.warnDocumentChanged(t, e, r);
          return;
        }
        var n = this._index.fetch(r, dt),
          a = n.get(e);
        a == null || a.get(t) == null
          ? this.warnDocumentChanged(t, e, r)
          : a.get(t) <= 1
          ? a.size <= 1
            ? n.delete(e)
            : a.delete(t)
          : a.set(t, a.get(t) - 1),
          this._index.get(r).size === 0 && this._index.delete(r);
      }),
      (o.prototype.warnDocumentChanged = function (e, t, r) {
        var n, a;
        try {
          for (
            var i = _(Object.keys(this._fieldIds)), s = i.next();
            !s.done;
            s = i.next()
          ) {
            var u = s.value;
            if (this._fieldIds[u] === t) {
              this._options.logger(
                "warn",
                "MiniSearch: document with ID "
                  .concat(
                    this._documentIds.get(e),
                    ' has changed before removal: term "',
                  )
                  .concat(r, '" was not present in field "')
                  .concat(
                    u,
                    '". Removing a document after it has changed can corrupt the index!',
                  ),
                "version_conflict",
              );
              return;
            }
          }
        } catch (l) {
          n = { error: l };
        } finally {
          try {
            s && !s.done && (a = i.return) && a.call(i);
          } finally {
            if (n) throw n.error;
          }
        }
      }),
      (o.prototype.addDocumentId = function (e) {
        var t = this._nextId;
        return (
          this._idToShortId.set(e, t),
          this._documentIds.set(t, e),
          (this._documentCount += 1),
          (this._nextId += 1),
          t
        );
      }),
      (o.prototype.addFields = function (e) {
        for (var t = 0; t < e.length; t++) this._fieldIds[e[t]] = t;
      }),
      (o.prototype.addFieldLength = function (e, t, r, n) {
        var a = this._fieldLength.get(e);
        a == null && this._fieldLength.set(e, (a = [])), (a[t] = n);
        var i = this._avgFieldLength[t] || 0,
          s = i * r + n;
        this._avgFieldLength[t] = s / (r + 1);
      }),
      (o.prototype.removeFieldLength = function (e, t, r, n) {
        if (r === 1) {
          this._avgFieldLength[t] = 0;
          return;
        }
        var a = this._avgFieldLength[t] * r - n;
        this._avgFieldLength[t] = a / (r - 1);
      }),
      (o.prototype.saveStoredFields = function (e, t) {
        var r,
          n,
          a = this._options,
          i = a.storeFields,
          s = a.extractField;
        if (!(i == null || i.length === 0)) {
          var u = this._storedFields.get(e);
          u == null && this._storedFields.set(e, (u = {}));
          try {
            for (var l = _(i), d = l.next(); !d.done; d = l.next()) {
              var h = d.value,
                v = s(t, h);
              v !== void 0 && (u[h] = v);
            }
          } catch (y) {
            r = { error: y };
          } finally {
            try {
              d && !d.done && (n = l.return) && n.call(l);
            } finally {
              if (r) throw r.error;
            }
          }
        }
      }),
      o
    );
  })(),
  Me = function (o, e) {
    return Object.prototype.hasOwnProperty.call(o, e) ? o[e] : void 0;
  },
  Lr =
    ((pe = {}),
    (pe[Ke] = function (o, e) {
      var t, r;
      try {
        for (var n = _(e.keys()), a = n.next(); !a.done; a = n.next()) {
          var i = a.value,
            s = o.get(i);
          if (s == null) o.set(i, e.get(i));
          else {
            var u = e.get(i),
              l = u.score,
              d = u.terms,
              h = u.match;
            (s.score = s.score + l),
              (s.match = Object.assign(s.match, h)),
              ft(s.terms, d);
          }
        }
      } catch (v) {
        t = { error: v };
      } finally {
        try {
          a && !a.done && (r = n.return) && r.call(n);
        } finally {
          if (t) throw t.error;
        }
      }
      return o;
    }),
    (pe[Ct] = function (o, e) {
      var t,
        r,
        n = new Map();
      try {
        for (var a = _(e.keys()), i = a.next(); !i.done; i = a.next()) {
          var s = i.value,
            u = o.get(s);
          if (u != null) {
            var l = e.get(s),
              d = l.score,
              h = l.terms,
              v = l.match;
            ft(u.terms, h),
              n.set(s, {
                score: u.score + d,
                terms: u.terms,
                match: Object.assign(u.match, v),
              });
          }
        }
      } catch (y) {
        t = { error: y };
      } finally {
        try {
          i && !i.done && (r = a.return) && r.call(a);
        } finally {
          if (t) throw t.error;
        }
      }
      return n;
    }),
    (pe[Rr] = function (o, e) {
      var t, r;
      try {
        for (var n = _(e.keys()), a = n.next(); !a.done; a = n.next()) {
          var i = a.value;
          o.delete(i);
        }
      } catch (s) {
        t = { error: s };
      } finally {
        try {
          a && !a.done && (r = n.return) && r.call(n);
        } finally {
          if (t) throw t.error;
        }
      }
      return o;
    }),
    pe),
  Pr = { k: 1.2, b: 0.7, d: 0.5 },
  zr = function (o, e, t, r, n, a) {
    var i = a.k,
      s = a.b,
      u = a.d,
      l = Math.log(1 + (t - e + 0.5) / (e + 0.5));
    return l * (u + (o * (i + 1)) / (o + i * (1 - s + (s * r) / n)));
  },
  Br = function (o) {
    return function (e, t, r) {
      var n = typeof o.fuzzy == "function" ? o.fuzzy(e, t, r) : o.fuzzy || !1,
        a = typeof o.prefix == "function" ? o.prefix(e, t, r) : o.prefix === !0;
      return { term: e, fuzzy: n, prefix: a };
    };
  },
  Le = {
    idField: "id",
    extractField: function (o, e) {
      return o[e];
    },
    tokenize: function (o, e) {
      return o.split(Wr);
    },
    processTerm: function (o, e) {
      return o.toLowerCase();
    },
    fields: void 0,
    searchOptions: void 0,
    storeFields: [],
    logger: function (o, e, t) {
      return console != null && console.warn != null && console[o](e);
    },
    autoVacuum: !0,
  },
  ct = {
    combineWith: Ke,
    prefix: !1,
    fuzzy: !1,
    maxFuzzy: 6,
    boost: {},
    weights: { fuzzy: 0.45, prefix: 0.375 },
    bm25: Pr,
  },
  Vr = {
    combineWith: Ct,
    prefix: function (o, e, t) {
      return e === t.length - 1;
    },
  },
  $e = { batchSize: 1e3, batchWait: 10 },
  We = { minDirtFactor: 0.1, minDirtCount: 20 },
  Pe = V(V({}, $e), We),
  $r = function (o, e) {
    o.includes(e) || o.push(e);
  },
  ft = function (o, e) {
    var t, r;
    try {
      for (var n = _(e), a = n.next(); !a.done; a = n.next()) {
        var i = a.value;
        o.includes(i) || o.push(i);
      }
    } catch (s) {
      t = { error: s };
    } finally {
      try {
        a && !a.done && (r = n.return) && r.call(n);
      } finally {
        if (t) throw t.error;
      }
    }
  },
  ht = function (o, e) {
    var t = o.score,
      r = e.score;
    return r - t;
  },
  dt = function () {
    return new Map();
  },
  Fe = function (o) {
    var e,
      t,
      r = new Map();
    try {
      for (var n = _(Object.keys(o)), a = n.next(); !a.done; a = n.next()) {
        var i = a.value;
        r.set(parseInt(i, 10), o[i]);
      }
    } catch (s) {
      e = { error: s };
    } finally {
      try {
        a && !a.done && (t = n.return) && t.call(n);
      } finally {
        if (e) throw e.error;
      }
    }
    return r;
  },
  Wr =
    /[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;
const Q = (o) => (Jt("data-v-007ef435"), (o = o()), Ut(), o),
  jr = ["aria-owns"],
  Kr = { class: "shell" },
  Jr = ["title"],
  Ur = Q(() =>
    S(
      "svg",
      {
        class: "search-icon",
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
      },
      [
        S(
          "g",
          {
            fill: "none",
            stroke: "currentColor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
          },
          [
            S("circle", { cx: "11", cy: "11", r: "8" }),
            S("path", { d: "m21 21l-4.35-4.35" }),
          ],
        ),
      ],
      -1,
    ),
  ),
  Hr = [Ur],
  Gr = { class: "search-actions before" },
  qr = ["title"],
  Qr = Q(() =>
    S(
      "svg",
      {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
      },
      [
        S("path", {
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M19 12H5m7 7l-7-7l7-7",
        }),
      ],
      -1,
    ),
  ),
  Yr = [Qr],
  Zr = ["placeholder"],
  Xr = { class: "search-actions" },
  ea = ["title"],
  ta = Q(() =>
    S(
      "svg",
      {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
      },
      [
        S("path", {
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M3 14h7v7H3zM3 3h7v7H3zm11 1h7m-7 5h7m-7 6h7m-7 5h7",
        }),
      ],
      -1,
    ),
  ),
  ra = [ta],
  aa = ["disabled", "title"],
  na = Q(() =>
    S(
      "svg",
      {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
      },
      [
        S("path", {
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M20 5H9l-7 7l7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-2 4l-6 6m0-6l6 6",
        }),
      ],
      -1,
    ),
  ),
  ia = [na],
  oa = ["id", "role", "aria-labelledby"],
  sa = ["aria-selected"],
  ua = ["href", "aria-label", "onMouseenter", "onFocusin"],
  la = { class: "titles" },
  ca = Q(() => S("span", { class: "title-icon" }, "#", -1)),
  fa = ["innerHTML"],
  ha = Q(() =>
    S(
      "svg",
      { width: "18", height: "18", viewBox: "0 0 24 24" },
      [
        S("path", {
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "m9 18l6-6l-6-6",
        }),
      ],
      -1,
    ),
  ),
  da = { class: "title main" },
  va = ["innerHTML"],
  pa = { key: 0, class: "excerpt-wrapper" },
  ya = { key: 0, class: "excerpt", inert: "" },
  ga = ["innerHTML"],
  ma = Q(() => S("div", { class: "excerpt-gradient-bottom" }, null, -1)),
  ba = Q(() => S("div", { class: "excerpt-gradient-top" }, null, -1)),
  wa = { key: 0, class: "no-results" },
  xa = { class: "search-keyboard-shortcuts" },
  Fa = ["aria-label"],
  Ea = Q(() =>
    S(
      "svg",
      { width: "14", height: "14", viewBox: "0 0 24 24" },
      [
        S("path", {
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M12 19V5m-7 7l7-7l7 7",
        }),
      ],
      -1,
    ),
  ),
  Sa = [Ea],
  Aa = ["aria-label"],
  Ca = Q(() =>
    S(
      "svg",
      { width: "14", height: "14", viewBox: "0 0 24 24" },
      [
        S("path", {
          fill: "none",
          stroke: "currentColor",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M12 5v14m7-7l-7 7l-7-7",
        }),
      ],
      -1,
    ),
  ),
  ka = [Ca],
  Na = ["aria-label"],
  Ta = Q(() =>
    S(
      "svg",
      { width: "14", height: "14", viewBox: "0 0 24 24" },
      [
        S(
          "g",
          {
            fill: "none",
            stroke: "currentcolor",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
          },
          [
            S("path", { d: "m9 10l-5 5l5 5" }),
            S("path", { d: "M20 4v7a4 4 0 0 1-4 4H4" }),
          ],
        ),
      ],
      -1,
    ),
  ),
  Ia = [Ta],
  Da = ["aria-label"],
  _a = Tt({
    __name: "VPLocalSearchBox",
    props: { placeholder: {} },
    emits: ["close"],
    setup(o, { emit: e }) {
      var T, O, P;
      const t = me(),
        r = me(),
        n = me(Xt),
        a = Yt(),
        { activate: i } = Cr(t, {
          immediate: !0,
          allowOutsideClick: !0,
          clickOutsideDeactivates: !0,
          escapeDeactivates: !0,
        }),
        { localeIndex: s, theme: u } = a,
        l = Xe(async () => {
          var g, b, z, G, K, J, B, U, H;
          return at(
            Mr.loadJSON(
              (z = await ((b = (g = n.value)[s.value]) == null
                ? void 0
                : b.call(g))) == null
                ? void 0
                : z.default,
              {
                fields: ["title", "titles", "text"],
                storeFields: ["title", "titles"],
                searchOptions: {
                  fuzzy: 0.2,
                  prefix: !0,
                  boost: { title: 4, text: 2, titles: 1 },
                  ...(((G = u.value.search) == null ? void 0 : G.provider) ===
                    "local" &&
                    ((J =
                      (K = u.value.search.options) == null
                        ? void 0
                        : K.miniSearch) == null
                      ? void 0
                      : J.searchOptions)),
                },
                ...(((B = u.value.search) == null ? void 0 : B.provider) ===
                  "local" &&
                  ((H =
                    (U = u.value.search.options) == null
                      ? void 0
                      : U.miniSearch) == null
                    ? void 0
                    : H.options)),
              },
            ),
          );
        }),
        h = Te(() => {
          var g, b;
          return (
            ((g = u.value.search) == null ? void 0 : g.provider) === "local" &&
            ((b = u.value.search.options) == null
              ? void 0
              : b.disableQueryPersistence) === !0
          );
        }).value
          ? ne("")
          : It("vitepress:local-search-filter", ""),
        v = Dt(
          "vitepress:local-search-detailed-list",
          ((T = u.value.search) == null ? void 0 : T.provider) === "local" &&
            ((O = u.value.search.options) == null ? void 0 : O.detailedView) ===
              !0,
        ),
        y = Te(() => {
          var g, b, z;
          return (
            ((g = u.value.search) == null ? void 0 : g.provider) === "local" &&
            (((b = u.value.search.options) == null
              ? void 0
              : b.disableDetailedView) === !0 ||
              ((z = u.value.search.options) == null
                ? void 0
                : z.detailedView) === !1)
          );
        });
      _t(() => {
        y.value && (v.value = !1);
      });
      const m = me([]),
        E = ne(!1);
      ze(h, () => {
        E.value = !1;
      });
      const x = Xe(async () => {
        if (r.value) return at(new Nr(r.value));
      }, null);
      Ot(
        () => [l.value, h.value, v.value],
        async ([g, b, z], G, K) => {
          var Je, Ue, He, Ge;
          let J = !1;
          if (
            (K(() => {
              J = !0;
            }),
            !g)
          )
            return;
          (m.value = g.search(b).slice(0, 16)), (E.value = !0);
          const B = z ? await Promise.all(m.value.map((q) => C(q.id))) : [];
          if (J) return;
          const U = new Map();
          for (const { id: q, mod: te } of B) {
            const re = q.slice(0, q.indexOf("#"));
            let X = U.get(re);
            if (X) continue;
            (X = new Map()), U.set(re, X);
            const Y = te.default ?? te;
            if ((Y != null && Y.render) || (Y != null && Y.setup)) {
              const ae = Ht(Y);
              (ae.config.warnHandler = () => {}),
                ae.provide(Gt, a),
                Object.defineProperties(ae.config.globalProperties, {
                  $frontmatter: {
                    get() {
                      return a.frontmatter.value;
                    },
                  },
                  $params: {
                    get() {
                      return a.page.value.params;
                    },
                  },
                });
              const qe = document.createElement("div");
              ae.mount(qe),
                qe.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((ce) => {
                  var Ze;
                  const ge =
                      (Ze = ce.querySelector("a")) == null
                        ? void 0
                        : Ze.getAttribute("href"),
                    Qe =
                      (ge == null ? void 0 : ge.startsWith("#")) && ge.slice(1);
                  if (!Qe) return;
                  let Ye = "";
                  for (
                    ;
                    (ce = ce.nextElementSibling) &&
                    !/^h[1-6]$/i.test(ce.tagName);

                  )
                    Ye += ce.outerHTML;
                  X.set(Qe, Ye);
                }),
                ae.unmount();
            }
            if (J) return;
          }
          const H = new Set();
          if (
            ((m.value = m.value.map((q) => {
              const [te, re] = q.id.split("#"),
                X = U.get(te),
                Y = (X == null ? void 0 : X.get(re)) ?? "";
              for (const ae in q.match) H.add(ae);
              return { ...q, text: Y };
            })),
            await fe(),
            J)
          )
            return;
          await new Promise((q) => {
            var te;
            (te = x.value) == null ||
              te.unmark({
                done: () => {
                  var re;
                  (re = x.value) == null || re.markRegExp(w(H), { done: q });
                },
              });
          });
          const Ne =
            ((Je = t.value) == null
              ? void 0
              : Je.querySelectorAll(".result .excerpt")) ?? [];
          for (const q of Ne)
            (Ue = q.querySelector('mark[data-markjs="true"]')) == null ||
              Ue.scrollIntoView({ block: "center" });
          (Ge = (He = r.value) == null ? void 0 : He.firstElementChild) ==
            null || Ge.scrollIntoView({ block: "start" });
        },
        { debounce: 200, immediate: !0 },
      );
      async function C(g) {
        const b = qt(g.slice(0, g.indexOf("#")));
        try {
          if (!b) throw new Error(`Cannot find file for id: ${g}`);
          return { id: g, mod: await vt(() => import(b), []) };
        } catch (z) {
          return console.error(z), { id: g, mod: {} };
        }
      }
      const k = ne(),
        A = Te(() => {
          var g;
          return ((g = h.value) == null ? void 0 : g.length) <= 0;
        });
      function M(g = !0) {
        var b, z;
        (b = k.value) == null || b.focus(),
          g && ((z = k.value) == null || z.select());
      }
      Ie(() => {
        M();
      });
      function L(g) {
        g.pointerType === "mouse" && M();
      }
      const D = ne(-1),
        N = ne(!1);
      ze(m, (g) => {
        (D.value = g.length ? 0 : -1), I();
      });
      function I() {
        fe(() => {
          const g = document.querySelector(".result.selected");
          g && g.scrollIntoView({ block: "nearest" });
        });
      }
      be("ArrowUp", (g) => {
        g.preventDefault(),
          D.value--,
          D.value < 0 && (D.value = m.value.length - 1),
          (N.value = !0),
          I();
      }),
        be("ArrowDown", (g) => {
          g.preventDefault(),
            D.value++,
            D.value >= m.value.length && (D.value = 0),
            (N.value = !0),
            I();
        });
      const R = Rt();
      be("Enter", (g) => {
        if (g.target instanceof HTMLButtonElement && g.target.type !== "submit")
          return;
        const b = m.value[D.value];
        if (g.target instanceof HTMLInputElement && !b) {
          g.preventDefault();
          return;
        }
        b && (R.go(b.id), e("close"));
      }),
        be("Escape", () => {
          e("close");
        });
      const F = {
          modal: {
            displayDetails: "Display detailed list",
            resetButtonTitle: "Reset search",
            backButtonTitle: "Close search",
            noResultsText: "No results for",
            footer: {
              selectText: "to select",
              selectKeyAriaLabel: "enter",
              navigateText: "to navigate",
              navigateUpKeyAriaLabel: "up arrow",
              navigateDownKeyAriaLabel: "down arrow",
              closeText: "to close",
              closeKeyAriaLabel: "escape",
            },
          },
        },
        c = Zt((P = u.value.search) == null ? void 0 : P.options, F);
      Ie(() => {
        window.history.pushState(null, "", null);
      }),
        Mt("popstate", (g) => {
          g.preventDefault(), e("close");
        });
      const f = Lt(Pt ? document.body : null);
      Ie(() => {
        fe(() => {
          (f.value = !0), fe().then(() => i());
        });
      }),
        zt(() => {
          f.value = !1;
        });
      function p() {
        (h.value = ""), fe().then(() => M(!1));
      }
      function w(g) {
        return new RegExp(
          [...g]
            .sort((b, z) => z.length - b.length)
            .map(
              (b) =>
                `(${b
                  .replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                  .replace(/-/g, "\\x2d")})`,
            )
            .join("|"),
          "gi",
        );
      }
      return (g, b) => {
        var z, G, K, J;
        return (
          Z(),
          Bt(Kt, { to: "body" }, [
            S(
              "div",
              {
                ref_key: "el",
                ref: t,
                role: "button",
                "aria-owns":
                  (z = m.value) != null && z.length
                    ? "localsearch-list"
                    : void 0,
                "aria-expanded": "true",
                "aria-haspopup": "listbox",
                "aria-labelledby": "localsearch-label",
                class: "VPLocalSearchBox",
              },
              [
                S("div", {
                  class: "backdrop",
                  onClick: b[0] || (b[0] = (B) => g.$emit("close")),
                }),
                S("div", Kr, [
                  S(
                    "form",
                    {
                      class: "search-bar",
                      onPointerup: b[4] || (b[4] = (B) => L(B)),
                      onSubmit: b[5] || (b[5] = Vt(() => {}, ["prevent"])),
                    },
                    [
                      S(
                        "label",
                        {
                          title: g.placeholder,
                          id: "localsearch-label",
                          for: "localsearch-input",
                        },
                        Hr,
                        8,
                        Jr,
                      ),
                      S("div", Gr, [
                        S(
                          "button",
                          {
                            class: "back-button",
                            title: W(c)("modal.backButtonTitle"),
                            onClick: b[1] || (b[1] = (B) => g.$emit("close")),
                          },
                          Yr,
                          8,
                          qr,
                        ),
                      ]),
                      $t(
                        S(
                          "input",
                          {
                            ref_key: "searchInput",
                            ref: k,
                            "onUpdate:modelValue":
                              b[2] ||
                              (b[2] = (B) => (jt(h) ? (h.value = B) : null)),
                            placeholder: g.placeholder,
                            id: "localsearch-input",
                            "aria-labelledby": "localsearch-label",
                            class: "search-input",
                          },
                          null,
                          8,
                          Zr,
                        ),
                        [[Wt, W(h)]],
                      ),
                      S("div", Xr, [
                        y.value
                          ? we("", !0)
                          : (Z(),
                            ee(
                              "button",
                              {
                                key: 0,
                                class: et([
                                  "toggle-layout-button",
                                  { "detailed-list": W(v) },
                                ]),
                                type: "button",
                                title: W(c)("modal.displayDetails"),
                                onClick:
                                  b[3] ||
                                  (b[3] = (B) =>
                                    D.value > -1 && (v.value = !W(v))),
                              },
                              ra,
                              10,
                              ea,
                            )),
                        S(
                          "button",
                          {
                            class: "clear-button",
                            type: "reset",
                            disabled: A.value,
                            title: W(c)("modal.resetButtonTitle"),
                            onClick: p,
                          },
                          ia,
                          8,
                          aa,
                        ),
                      ]),
                    ],
                    32,
                  ),
                  S(
                    "ul",
                    {
                      ref_key: "resultsEl",
                      ref: r,
                      id:
                        (G = m.value) != null && G.length
                          ? "localsearch-list"
                          : void 0,
                      role:
                        (K = m.value) != null && K.length ? "listbox" : void 0,
                      "aria-labelledby":
                        (J = m.value) != null && J.length
                          ? "localsearch-label"
                          : void 0,
                      class: "results",
                      onMousemove: b[7] || (b[7] = (B) => (N.value = !1)),
                    },
                    [
                      (Z(!0),
                      ee(
                        rt,
                        null,
                        tt(
                          m.value,
                          (B, U) => (
                            Z(),
                            ee(
                              "li",
                              {
                                key: B.id,
                                role: "option",
                                "aria-selected":
                                  D.value === U ? "true" : "false",
                              },
                              [
                                S(
                                  "a",
                                  {
                                    href: B.id,
                                    class: et([
                                      "result",
                                      { selected: D.value === U },
                                    ]),
                                    "aria-label": [...B.titles, B.title].join(
                                      " > ",
                                    ),
                                    onMouseenter: (H) =>
                                      !N.value && (D.value = U),
                                    onFocusin: (H) => (D.value = U),
                                    onClick:
                                      b[6] || (b[6] = (H) => g.$emit("close")),
                                  },
                                  [
                                    S("div", null, [
                                      S("div", la, [
                                        ca,
                                        (Z(!0),
                                        ee(
                                          rt,
                                          null,
                                          tt(
                                            B.titles,
                                            (H, Ne) => (
                                              Z(),
                                              ee(
                                                "span",
                                                { key: Ne, class: "title" },
                                                [
                                                  S(
                                                    "span",
                                                    {
                                                      class: "text",
                                                      innerHTML: H,
                                                    },
                                                    null,
                                                    8,
                                                    fa,
                                                  ),
                                                  ha,
                                                ],
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                        S("span", da, [
                                          S(
                                            "span",
                                            {
                                              class: "text",
                                              innerHTML: B.title,
                                            },
                                            null,
                                            8,
                                            va,
                                          ),
                                        ]),
                                      ]),
                                      W(v)
                                        ? (Z(),
                                          ee("div", pa, [
                                            B.text
                                              ? (Z(),
                                                ee("div", ya, [
                                                  S(
                                                    "div",
                                                    {
                                                      class: "vp-doc",
                                                      innerHTML: B.text,
                                                    },
                                                    null,
                                                    8,
                                                    ga,
                                                  ),
                                                ]))
                                              : we("", !0),
                                            ma,
                                            ba,
                                          ]))
                                        : we("", !0),
                                    ]),
                                  ],
                                  42,
                                  ua,
                                ),
                              ],
                              8,
                              sa,
                            )
                          ),
                        ),
                        128,
                      )),
                      W(h) && !m.value.length && E.value
                        ? (Z(),
                          ee("li", wa, [
                            he(de(W(c)("modal.noResultsText")) + ' "', 1),
                            S("strong", null, de(W(h)), 1),
                            he('" '),
                          ]))
                        : we("", !0),
                    ],
                    40,
                    oa,
                  ),
                  S("div", xa, [
                    S("span", null, [
                      S(
                        "kbd",
                        {
                          "aria-label": W(c)(
                            "modal.footer.navigateUpKeyAriaLabel",
                          ),
                        },
                        Sa,
                        8,
                        Fa,
                      ),
                      S(
                        "kbd",
                        {
                          "aria-label": W(c)(
                            "modal.footer.navigateDownKeyAriaLabel",
                          ),
                        },
                        ka,
                        8,
                        Aa,
                      ),
                      he(" " + de(W(c)("modal.footer.navigateText")), 1),
                    ]),
                    S("span", null, [
                      S(
                        "kbd",
                        {
                          "aria-label": W(c)("modal.footer.selectKeyAriaLabel"),
                        },
                        Ia,
                        8,
                        Na,
                      ),
                      he(" " + de(W(c)("modal.footer.selectText")), 1),
                    ]),
                    S("span", null, [
                      S(
                        "kbd",
                        {
                          "aria-label": W(c)("modal.footer.closeKeyAriaLabel"),
                        },
                        "esc",
                        8,
                        Da,
                      ),
                      he(" " + de(W(c)("modal.footer.closeText")), 1),
                    ]),
                  ]),
                ]),
              ],
              8,
              jr,
            ),
          ])
        );
      };
    },
  });
const Pa = Qt(_a, [["__scopeId", "data-v-007ef435"]]);
export { Pa as default };
