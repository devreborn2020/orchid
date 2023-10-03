function fr(e, t) {
  const n = Object.create(null),
    r = e.split(",");
  for (let s = 0; s < r.length; s++) n[r[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
const te = {},
  pt = [],
  Pe = () => {},
  li = () => !1,
  ci = /^on[^a-z]/,
  Vt = (e) => ci.test(e),
  dr = (e) => e.startsWith("onUpdate:"),
  ie = Object.assign,
  hr = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  ai = Object.prototype.hasOwnProperty,
  Y = (e, t) => ai.call(e, t),
  k = Array.isArray,
  gt = (e) => Cn(e) === "[object Map]",
  Bs = (e) => Cn(e) === "[object Set]",
  K = (e) => typeof e == "function",
  re = (e) => typeof e == "string",
  pr = (e) => typeof e == "symbol",
  ee = (e) => e !== null && typeof e == "object",
  ks = (e) => ee(e) && K(e.then) && K(e.catch),
  Us = Object.prototype.toString,
  Cn = (e) => Us.call(e),
  ui = (e) => Cn(e).slice(8, -1),
  Ks = (e) => Cn(e) === "[object Object]",
  gr = (e) =>
    re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Mt = fr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  En = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  fi = /-(\w)/g,
  Ne = En((e) => e.replace(fi, (t, n) => (n ? n.toUpperCase() : ""))),
  di = /\B([A-Z])/g,
  at = En((e) => e.replace(di, "-$1").toLowerCase()),
  xn = En((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  an = En((e) => (e ? `on${xn(e)}` : "")),
  jt = (e, t) => !Object.is(e, t),
  un = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  hn = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  Jn = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  },
  hi = (e) => {
    const t = re(e) ? Number(e) : NaN;
    return isNaN(t) ? e : t;
  };
let Wr;
const Xn = () =>
  Wr ||
  (Wr =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
function mr(e) {
  if (k(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n],
        s = re(r) ? _i(r) : mr(r);
      if (s) for (const o in s) t[o] = s[o];
    }
    return t;
  } else {
    if (re(e)) return e;
    if (ee(e)) return e;
  }
}
const pi = /;(?![^(]*\))/g,
  gi = /:([^]+)/,
  mi = /\/\*[^]*?\*\//g;
function _i(e) {
  const t = {};
  return (
    e
      .replace(mi, "")
      .split(pi)
      .forEach((n) => {
        if (n) {
          const r = n.split(gi);
          r.length > 1 && (t[r[0].trim()] = r[1].trim());
        }
      }),
    t
  );
}
function _r(e) {
  let t = "";
  if (re(e)) t = e;
  else if (k(e))
    for (let n = 0; n < e.length; n++) {
      const r = _r(e[n]);
      r && (t += r + " ");
    }
  else if (ee(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const yi =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  bi = fr(yi);
function Ws(e) {
  return !!e || e === "";
}
const La = (e) =>
    re(e)
      ? e
      : e == null
      ? ""
      : k(e) || (ee(e) && (e.toString === Us || !K(e.toString)))
      ? JSON.stringify(e, Vs, 2)
      : String(e),
  Vs = (e, t) =>
    t && t.__v_isRef
      ? Vs(e, t.value)
      : gt(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [r, s]) => ((n[`${r} =>`] = s), n),
            {},
          ),
        }
      : Bs(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : ee(t) && !k(t) && !Ks(t)
      ? String(t)
      : t;
let be;
class vi {
  constructor(t = !1) {
    (this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = be),
      !t && be && (this.index = (be.scopes || (be.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = be;
      try {
        return (be = this), t();
      } finally {
        be = n;
      }
    }
  }
  on() {
    be = this;
  }
  off() {
    be = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, r;
      for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
      for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function wi(e, t = be) {
  t && t.active && t.effects.push(e);
}
function qs() {
  return be;
}
function Ci(e) {
  be && be.cleanups.push(e);
}
const yr = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  zs = (e) => (e.w & Je) > 0,
  Ys = (e) => (e.n & Je) > 0,
  Ei = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Je;
  },
  xi = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let r = 0; r < t.length; r++) {
        const s = t[r];
        zs(s) && !Ys(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Je),
          (s.n &= ~Je);
      }
      t.length = n;
    }
  },
  pn = new WeakMap();
let Pt = 0,
  Je = 1;
const Qn = 30;
let Se;
const it = Symbol(""),
  Zn = Symbol("");
class br {
  constructor(t, n = null, r) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      wi(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let t = Se,
      n = qe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = Se),
        (Se = this),
        (qe = !0),
        (Je = 1 << ++Pt),
        Pt <= Qn ? Ei(this) : Vr(this),
        this.fn()
      );
    } finally {
      Pt <= Qn && xi(this),
        (Je = 1 << --Pt),
        (Se = this.parent),
        (qe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    Se === this
      ? (this.deferStop = !0)
      : this.active &&
        (Vr(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Vr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let qe = !0;
const Js = [];
function xt() {
  Js.push(qe), (qe = !1);
}
function Tt() {
  const e = Js.pop();
  qe = e === void 0 ? !0 : e;
}
function me(e, t, n) {
  if (qe && Se) {
    let r = pn.get(e);
    r || pn.set(e, (r = new Map()));
    let s = r.get(n);
    s || r.set(n, (s = yr())), Xs(s);
  }
}
function Xs(e, t) {
  let n = !1;
  Pt <= Qn ? Ys(e) || ((e.n |= Je), (n = !zs(e))) : (n = !e.has(Se)),
    n && (e.add(Se), Se.deps.push(e));
}
function je(e, t, n, r, s, o) {
  const i = pn.get(e);
  if (!i) return;
  let l = [];
  if (t === "clear") l = [...i.values()];
  else if (n === "length" && k(e)) {
    const c = Number(r);
    i.forEach((a, f) => {
      (f === "length" || f >= c) && l.push(a);
    });
  } else
    switch ((n !== void 0 && l.push(i.get(n)), t)) {
      case "add":
        k(e)
          ? gr(n) && l.push(i.get("length"))
          : (l.push(i.get(it)), gt(e) && l.push(i.get(Zn)));
        break;
      case "delete":
        k(e) || (l.push(i.get(it)), gt(e) && l.push(i.get(Zn)));
        break;
      case "set":
        gt(e) && l.push(i.get(it));
        break;
    }
  if (l.length === 1) l[0] && Gn(l[0]);
  else {
    const c = [];
    for (const a of l) a && c.push(...a);
    Gn(yr(c));
  }
}
function Gn(e, t) {
  const n = k(e) ? e : [...e];
  for (const r of n) r.computed && qr(r);
  for (const r of n) r.computed || qr(r);
}
function qr(e, t) {
  (e !== Se || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
function Ti(e, t) {
  var n;
  return (n = pn.get(e)) == null ? void 0 : n.get(t);
}
const Ai = fr("__proto__,__v_isRef,__isVue"),
  Qs = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(pr),
  ),
  Si = vr(),
  Oi = vr(!1, !0),
  Pi = vr(!0),
  zr = Ri();
function Ri() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const r = J(this);
        for (let o = 0, i = this.length; o < i; o++) me(r, "get", o + "");
        const s = r[t](...n);
        return s === -1 || s === !1 ? r[t](...n.map(J)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        xt();
        const r = J(this)[t].apply(this, n);
        return Tt(), r;
      };
    }),
    e
  );
}
function Mi(e) {
  const t = J(this);
  return me(t, "has", e), t.hasOwnProperty(e);
}
function vr(e = !1, t = !1) {
  return function (r, s, o) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && o === (e ? (t ? zi : no) : t ? to : eo).get(r))
      return r;
    const i = k(r);
    if (!e) {
      if (i && Y(zr, s)) return Reflect.get(zr, s, o);
      if (s === "hasOwnProperty") return Mi;
    }
    const l = Reflect.get(r, s, o);
    return (pr(s) ? Qs.has(s) : Ai(s)) || (e || me(r, "get", s), t)
      ? l
      : ce(l)
      ? i && gr(s)
        ? l
        : l.value
      : ee(l)
      ? e
        ? Sn(l)
        : An(l)
      : l;
  };
}
const Fi = Zs(),
  Ii = Zs(!0);
function Zs(e = !1) {
  return function (n, r, s, o) {
    let i = n[r];
    if (vt(i) && ce(i) && !ce(s)) return !1;
    if (
      !e &&
      (!gn(s) && !vt(s) && ((i = J(i)), (s = J(s))), !k(n) && ce(i) && !ce(s))
    )
      return (i.value = s), !0;
    const l = k(n) && gr(r) ? Number(r) < n.length : Y(n, r),
      c = Reflect.set(n, r, s, o);
    return (
      n === J(o) && (l ? jt(s, i) && je(n, "set", r, s) : je(n, "add", r, s)), c
    );
  };
}
function Li(e, t) {
  const n = Y(e, t);
  e[t];
  const r = Reflect.deleteProperty(e, t);
  return r && n && je(e, "delete", t, void 0), r;
}
function Ni(e, t) {
  const n = Reflect.has(e, t);
  return (!pr(t) || !Qs.has(t)) && me(e, "has", t), n;
}
function $i(e) {
  return me(e, "iterate", k(e) ? "length" : it), Reflect.ownKeys(e);
}
const Gs = { get: Si, set: Fi, deleteProperty: Li, has: Ni, ownKeys: $i },
  Hi = {
    get: Pi,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  ji = ie({}, Gs, { get: Oi, set: Ii }),
  wr = (e) => e,
  Tn = (e) => Reflect.getPrototypeOf(e);
function Xt(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const s = J(e),
    o = J(t);
  n || (t !== o && me(s, "get", t), me(s, "get", o));
  const { has: i } = Tn(s),
    l = r ? wr : n ? xr : Dt;
  if (i.call(s, t)) return l(e.get(t));
  if (i.call(s, o)) return l(e.get(o));
  e !== s && e.get(t);
}
function Qt(e, t = !1) {
  const n = this.__v_raw,
    r = J(n),
    s = J(e);
  return (
    t || (e !== s && me(r, "has", e), me(r, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Zt(e, t = !1) {
  return (
    (e = e.__v_raw), !t && me(J(e), "iterate", it), Reflect.get(e, "size", e)
  );
}
function Yr(e) {
  e = J(e);
  const t = J(this);
  return Tn(t).has.call(t, e) || (t.add(e), je(t, "add", e, e)), this;
}
function Jr(e, t) {
  t = J(t);
  const n = J(this),
    { has: r, get: s } = Tn(n);
  let o = r.call(n, e);
  o || ((e = J(e)), (o = r.call(n, e)));
  const i = s.call(n, e);
  return (
    n.set(e, t), o ? jt(t, i) && je(n, "set", e, t) : je(n, "add", e, t), this
  );
}
function Xr(e) {
  const t = J(this),
    { has: n, get: r } = Tn(t);
  let s = n.call(t, e);
  s || ((e = J(e)), (s = n.call(t, e))), r && r.call(t, e);
  const o = t.delete(e);
  return s && je(t, "delete", e, void 0), o;
}
function Qr() {
  const e = J(this),
    t = e.size !== 0,
    n = e.clear();
  return t && je(e, "clear", void 0, void 0), n;
}
function Gt(e, t) {
  return function (r, s) {
    const o = this,
      i = o.__v_raw,
      l = J(i),
      c = t ? wr : e ? xr : Dt;
    return (
      !e && me(l, "iterate", it), i.forEach((a, f) => r.call(s, c(a), c(f), o))
    );
  };
}
function en(e, t, n) {
  return function (...r) {
    const s = this.__v_raw,
      o = J(s),
      i = gt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      a = s[e](...r),
      f = n ? wr : t ? xr : Dt;
    return (
      !t && me(o, "iterate", c ? Zn : it),
      {
        next() {
          const { value: h, done: g } = a.next();
          return g
            ? { value: h, done: g }
            : { value: l ? [f(h[0]), f(h[1])] : f(h), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function ke(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function Di() {
  const e = {
      get(o) {
        return Xt(this, o);
      },
      get size() {
        return Zt(this);
      },
      has: Qt,
      add: Yr,
      set: Jr,
      delete: Xr,
      clear: Qr,
      forEach: Gt(!1, !1),
    },
    t = {
      get(o) {
        return Xt(this, o, !1, !0);
      },
      get size() {
        return Zt(this);
      },
      has: Qt,
      add: Yr,
      set: Jr,
      delete: Xr,
      clear: Qr,
      forEach: Gt(!1, !0),
    },
    n = {
      get(o) {
        return Xt(this, o, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(o) {
        return Qt.call(this, o, !0);
      },
      add: ke("add"),
      set: ke("set"),
      delete: ke("delete"),
      clear: ke("clear"),
      forEach: Gt(!0, !1),
    },
    r = {
      get(o) {
        return Xt(this, o, !0, !0);
      },
      get size() {
        return Zt(this, !0);
      },
      has(o) {
        return Qt.call(this, o, !0);
      },
      add: ke("add"),
      set: ke("set"),
      delete: ke("delete"),
      clear: ke("clear"),
      forEach: Gt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
      (e[o] = en(o, !1, !1)),
        (n[o] = en(o, !0, !1)),
        (t[o] = en(o, !1, !0)),
        (r[o] = en(o, !0, !0));
    }),
    [e, n, t, r]
  );
}
const [Bi, ki, Ui, Ki] = Di();
function Cr(e, t) {
  const n = t ? (e ? Ki : Ui) : e ? ki : Bi;
  return (r, s, o) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? r
      : Reflect.get(Y(n, s) && s in r ? n : r, s, o);
}
const Wi = { get: Cr(!1, !1) },
  Vi = { get: Cr(!1, !0) },
  qi = { get: Cr(!0, !1) },
  eo = new WeakMap(),
  to = new WeakMap(),
  no = new WeakMap(),
  zi = new WeakMap();
function Yi(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ji(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Yi(ui(e));
}
function An(e) {
  return vt(e) ? e : Er(e, !1, Gs, Wi, eo);
}
function Xi(e) {
  return Er(e, !1, ji, Vi, to);
}
function Sn(e) {
  return Er(e, !0, Hi, qi, no);
}
function Er(e, t, n, r, s) {
  if (!ee(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = s.get(e);
  if (o) return o;
  const i = Ji(e);
  if (i === 0) return e;
  const l = new Proxy(e, i === 2 ? r : n);
  return s.set(e, l), l;
}
function mt(e) {
  return vt(e) ? mt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function vt(e) {
  return !!(e && e.__v_isReadonly);
}
function gn(e) {
  return !!(e && e.__v_isShallow);
}
function ro(e) {
  return mt(e) || vt(e);
}
function J(e) {
  const t = e && e.__v_raw;
  return t ? J(t) : e;
}
function Ft(e) {
  return hn(e, "__v_skip", !0), e;
}
const Dt = (e) => (ee(e) ? An(e) : e),
  xr = (e) => (ee(e) ? Sn(e) : e);
function Tr(e) {
  qe && Se && ((e = J(e)), Xs(e.dep || (e.dep = yr())));
}
function Ar(e, t) {
  e = J(e);
  const n = e.dep;
  n && Gn(n);
}
function ce(e) {
  return !!(e && e.__v_isRef === !0);
}
function ae(e) {
  return so(e, !1);
}
function Sr(e) {
  return so(e, !0);
}
function so(e, t) {
  return ce(e) ? e : new Qi(e, t);
}
class Qi {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : J(t)),
      (this._value = n ? t : Dt(t));
  }
  get value() {
    return Tr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || gn(t) || vt(t);
    (t = n ? t : J(t)),
      jt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Dt(t)), Ar(this));
  }
}
function oo(e) {
  return ce(e) ? e.value : e;
}
const Zi = {
  get: (e, t, n) => oo(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const s = e[t];
    return ce(s) && !ce(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
  },
};
function io(e) {
  return mt(e) ? e : new Proxy(e, Zi);
}
class Gi {
  constructor(t) {
    (this.dep = void 0), (this.__v_isRef = !0);
    const { get: n, set: r } = t(
      () => Tr(this),
      () => Ar(this),
    );
    (this._get = n), (this._set = r);
  }
  get value() {
    return this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function el(e) {
  return new Gi(e);
}
class tl {
  constructor(t, n, r) {
    (this._object = t),
      (this._key = n),
      (this._defaultValue = r),
      (this.__v_isRef = !0);
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Ti(J(this._object), this._key);
  }
}
class nl {
  constructor(t) {
    (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
  }
  get value() {
    return this._getter();
  }
}
function rl(e, t, n) {
  return ce(e)
    ? e
    : K(e)
    ? new nl(e)
    : ee(e) && arguments.length > 1
    ? sl(e, t, n)
    : ae(e);
}
function sl(e, t, n) {
  const r = e[t];
  return ce(r) ? r : new tl(e, t, n);
}
class ol {
  constructor(t, n, r, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new br(t, () => {
        this._dirty || ((this._dirty = !0), Ar(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = r);
  }
  get value() {
    const t = J(this);
    return (
      Tr(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
function il(e, t, n = !1) {
  let r, s;
  const o = K(e);
  return (
    o ? ((r = e), (s = Pe)) : ((r = e.get), (s = e.set)),
    new ol(r, s, o || !s, n)
  );
}
function ze(e, t, n, r) {
  let s;
  try {
    s = r ? e(...r) : e();
  } catch (o) {
    qt(o, t, n);
  }
  return s;
}
function xe(e, t, n, r) {
  if (K(e)) {
    const o = ze(e, t, n, r);
    return (
      o &&
        ks(o) &&
        o.catch((i) => {
          qt(i, t, n);
        }),
      o
    );
  }
  const s = [];
  for (let o = 0; o < e.length; o++) s.push(xe(e[o], t, n, r));
  return s;
}
function qt(e, t, n, r = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy,
      l = n;
    for (; o; ) {
      const a = o.ec;
      if (a) {
        for (let f = 0; f < a.length; f++) if (a[f](e, i, l) === !1) return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      ze(c, null, 10, [e, i, l]);
      return;
    }
  }
  ll(e, n, s, r);
}
function ll(e, t, n, r = !0) {
  console.error(e);
}
let Bt = !1,
  er = !1;
const de = [];
let Ie = 0;
const _t = [];
let He = null,
  nt = 0;
const lo = Promise.resolve();
let Or = null;
function On(e) {
  const t = Or || lo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function cl(e) {
  let t = Ie + 1,
    n = de.length;
  for (; t < n; ) {
    const r = (t + n) >>> 1;
    kt(de[r]) < e ? (t = r + 1) : (n = r);
  }
  return t;
}
function Pn(e) {
  (!de.length || !de.includes(e, Bt && e.allowRecurse ? Ie + 1 : Ie)) &&
    (e.id == null ? de.push(e) : de.splice(cl(e.id), 0, e), co());
}
function co() {
  !Bt && !er && ((er = !0), (Or = lo.then(ao)));
}
function al(e) {
  const t = de.indexOf(e);
  t > Ie && de.splice(t, 1);
}
function ul(e) {
  k(e)
    ? _t.push(...e)
    : (!He || !He.includes(e, e.allowRecurse ? nt + 1 : nt)) && _t.push(e),
    co();
}
function Zr(e, t = Bt ? Ie + 1 : 0) {
  for (; t < de.length; t++) {
    const n = de[t];
    n && n.pre && (de.splice(t, 1), t--, n());
  }
}
function mn(e) {
  if (_t.length) {
    const t = [...new Set(_t)];
    if (((_t.length = 0), He)) {
      He.push(...t);
      return;
    }
    for (He = t, He.sort((n, r) => kt(n) - kt(r)), nt = 0; nt < He.length; nt++)
      He[nt]();
    (He = null), (nt = 0);
  }
}
const kt = (e) => (e.id == null ? 1 / 0 : e.id),
  fl = (e, t) => {
    const n = kt(e) - kt(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function ao(e) {
  (er = !1), (Bt = !0), de.sort(fl);
  const t = Pe;
  try {
    for (Ie = 0; Ie < de.length; Ie++) {
      const n = de[Ie];
      n && n.active !== !1 && ze(n, null, 14);
    }
  } finally {
    (Ie = 0),
      (de.length = 0),
      mn(),
      (Bt = !1),
      (Or = null),
      (de.length || _t.length) && ao();
  }
}
function dl(e, t, ...n) {
  if (e.isUnmounted) return;
  const r = e.vnode.props || te;
  let s = n;
  const o = t.startsWith("update:"),
    i = o && t.slice(7);
  if (i && i in r) {
    const f = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: h, trim: g } = r[f] || te;
    g && (s = n.map((w) => (re(w) ? w.trim() : w))), h && (s = n.map(Jn));
  }
  let l,
    c = r[(l = an(t))] || r[(l = an(Ne(t)))];
  !c && o && (c = r[(l = an(at(t)))]), c && xe(c, e, 6, s);
  const a = r[l + "Once"];
  if (a) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    (e.emitted[l] = !0), xe(a, e, 6, s);
  }
}
function uo(e, t, n = !1) {
  const r = t.emitsCache,
    s = r.get(e);
  if (s !== void 0) return s;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!K(e)) {
    const c = (a) => {
      const f = uo(a, t, !0);
      f && ((l = !0), ie(i, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  return !o && !l
    ? (ee(e) && r.set(e, null), null)
    : (k(o) ? o.forEach((c) => (i[c] = null)) : ie(i, o),
      ee(e) && r.set(e, i),
      i);
}
function Rn(e, t) {
  return !e || !Vt(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, at(t)) || Y(e, t));
}
let fe = null,
  Mn = null;
function _n(e) {
  const t = fe;
  return (fe = e), (Mn = (e && e.type.__scopeId) || null), t;
}
function Na(e) {
  Mn = e;
}
function $a() {
  Mn = null;
}
function hl(e, t = fe, n) {
  if (!t || e._n) return e;
  const r = (...s) => {
    r._d && fs(-1);
    const o = _n(t);
    let i;
    try {
      i = e(...s);
    } finally {
      _n(o), r._d && fs(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function Bn(e) {
  const {
    type: t,
    vnode: n,
    proxy: r,
    withProxy: s,
    props: o,
    propsOptions: [i],
    slots: l,
    attrs: c,
    emit: a,
    render: f,
    renderCache: h,
    data: g,
    setupState: w,
    ctx: E,
    inheritAttrs: S,
  } = e;
  let $, m;
  const y = _n(e);
  try {
    if (n.shapeFlag & 4) {
      const A = s || r;
      ($ = Ae(f.call(A, A, h, o, w, g, E))), (m = c);
    } else {
      const A = t;
      ($ = Ae(
        A.length > 1 ? A(o, { attrs: c, slots: l, emit: a }) : A(o, null),
      )),
        (m = t.props ? c : pl(c));
    }
  } catch (A) {
    ($t.length = 0), qt(A, e, 1), ($ = se(ve));
  }
  let N = $;
  if (m && S !== !1) {
    const A = Object.keys(m),
      { shapeFlag: B } = N;
    A.length && B & 7 && (i && A.some(dr) && (m = gl(m, i)), (N = Xe(N, m)));
  }
  return (
    n.dirs && ((N = Xe(N)), (N.dirs = N.dirs ? N.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (N.transition = n.transition),
    ($ = N),
    _n(y),
    $
  );
}
const pl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Vt(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  gl = (e, t) => {
    const n = {};
    for (const r in e) (!dr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
    return n;
  };
function ml(e, t, n) {
  const { props: r, children: s, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    a = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return r ? Gr(r, i, a) : !!i;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        const g = f[h];
        if (i[g] !== r[g] && !Rn(a, g)) return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Gr(r, i, a)
        : !0
      : !!i;
  return !1;
}
function Gr(e, t, n) {
  const r = Object.keys(t);
  if (r.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < r.length; s++) {
    const o = r[s];
    if (t[o] !== e[o] && !Rn(n, o)) return !0;
  }
  return !1;
}
function _l({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const yl = (e) => e.__isSuspense;
function fo(e, t) {
  t && t.pendingBranch
    ? k(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ul(e);
}
function Pr(e, t) {
  return Fn(e, null, t);
}
function Ha(e, t) {
  return Fn(e, null, { flush: "post" });
}
const tn = {};
function Ye(e, t, n) {
  return Fn(e, t, n);
}
function Fn(
  e,
  t,
  { immediate: n, deep: r, flush: s, onTrack: o, onTrigger: i } = te,
) {
  var l;
  const c = qs() === ((l = le) == null ? void 0 : l.scope) ? le : null;
  let a,
    f = !1,
    h = !1;
  if (
    (ce(e)
      ? ((a = () => e.value), (f = gn(e)))
      : mt(e)
      ? ((a = () => e), (r = !0))
      : k(e)
      ? ((h = !0),
        (f = e.some((A) => mt(A) || gn(A))),
        (a = () =>
          e.map((A) => {
            if (ce(A)) return A.value;
            if (mt(A)) return ot(A);
            if (K(A)) return ze(A, c, 2);
          })))
      : K(e)
      ? t
        ? (a = () => ze(e, c, 2))
        : (a = () => {
            if (!(c && c.isUnmounted)) return g && g(), xe(e, c, 3, [w]);
          })
      : (a = Pe),
    t && r)
  ) {
    const A = a;
    a = () => ot(A());
  }
  let g,
    w = (A) => {
      g = y.onStop = () => {
        ze(A, c, 4);
      };
    },
    E;
  if (Et)
    if (
      ((w = Pe),
      t ? n && xe(t, c, 3, [a(), h ? [] : void 0, w]) : a(),
      s === "sync")
    ) {
      const A = pc();
      E = A.__watcherHandles || (A.__watcherHandles = []);
    } else return Pe;
  let S = h ? new Array(e.length).fill(tn) : tn;
  const $ = () => {
    if (y.active)
      if (t) {
        const A = y.run();
        (r || f || (h ? A.some((B, W) => jt(B, S[W])) : jt(A, S))) &&
          (g && g(),
          xe(t, c, 3, [A, S === tn ? void 0 : h && S[0] === tn ? [] : S, w]),
          (S = A));
      } else y.run();
  };
  $.allowRecurse = !!t;
  let m;
  s === "sync"
    ? (m = $)
    : s === "post"
    ? (m = () => pe($, c && c.suspense))
    : (($.pre = !0), c && ($.id = c.uid), (m = () => Pn($)));
  const y = new br(a, m);
  t
    ? n
      ? $()
      : (S = y.run())
    : s === "post"
    ? pe(y.run.bind(y), c && c.suspense)
    : y.run();
  const N = () => {
    y.stop(), c && c.scope && hr(c.scope.effects, y);
  };
  return E && E.push(N), N;
}
function bl(e, t, n) {
  const r = this.proxy,
    s = re(e) ? (e.includes(".") ? ho(r, e) : () => r[e]) : e.bind(r, r);
  let o;
  K(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = le;
  Ct(this);
  const l = Fn(s, o.bind(r), n);
  return i ? Ct(i) : lt(), l;
}
function ho(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let s = 0; s < n.length && r; s++) r = r[n[s]];
    return r;
  };
}
function ot(e, t) {
  if (!ee(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ce(e))) ot(e.value, t);
  else if (k(e)) for (let n = 0; n < e.length; n++) ot(e[n], t);
  else if (Bs(e) || gt(e))
    e.forEach((n) => {
      ot(n, t);
    });
  else if (Ks(e)) for (const n in e) ot(e[n], t);
  return e;
}
function ja(e, t) {
  const n = fe;
  if (n === null) return e;
  const r = Hn(n) || n.proxy,
    s = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, l, c, a = te] = t[o];
    i &&
      (K(i) && (i = { mounted: i, updated: i }),
      i.deep && ot(l),
      s.push({
        dir: i,
        instance: r,
        value: l,
        oldValue: void 0,
        arg: c,
        modifiers: a,
      }));
  }
  return e;
}
function Fe(e, t, n, r) {
  const s = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < s.length; i++) {
    const l = s[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[r];
    c && (xt(), xe(c, n, 8, [e.el, l, e, t]), Tt());
  }
}
function vl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    At(() => {
      e.isMounted = !0;
    }),
    yo(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const we = [Function, Array],
  po = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: we,
    onEnter: we,
    onAfterEnter: we,
    onEnterCancelled: we,
    onBeforeLeave: we,
    onLeave: we,
    onAfterLeave: we,
    onLeaveCancelled: we,
    onBeforeAppear: we,
    onAppear: we,
    onAfterAppear: we,
    onAppearCancelled: we,
  },
  wl = {
    name: "BaseTransition",
    props: po,
    setup(e, { slots: t }) {
      const n = $n(),
        r = vl();
      let s;
      return () => {
        const o = t.default && mo(t.default(), !0);
        if (!o || !o.length) return;
        let i = o[0];
        if (o.length > 1) {
          for (const S of o)
            if (S.type !== ve) {
              i = S;
              break;
            }
        }
        const l = J(e),
          { mode: c } = l;
        if (r.isLeaving) return kn(i);
        const a = es(i);
        if (!a) return kn(i);
        const f = tr(a, l, r, n);
        nr(a, f);
        const h = n.subTree,
          g = h && es(h);
        let w = !1;
        const { getTransitionKey: E } = a.type;
        if (E) {
          const S = E();
          s === void 0 ? (s = S) : S !== s && ((s = S), (w = !0));
        }
        if (g && g.type !== ve && (!rt(a, g) || w)) {
          const S = tr(g, l, r, n);
          if ((nr(g, S), c === "out-in"))
            return (
              (r.isLeaving = !0),
              (S.afterLeave = () => {
                (r.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              kn(i)
            );
          c === "in-out" &&
            a.type !== ve &&
            (S.delayLeave = ($, m, y) => {
              const N = go(r, g);
              (N[String(g.key)] = g),
                ($._leaveCb = () => {
                  m(), ($._leaveCb = void 0), delete f.delayedLeave;
                }),
                (f.delayedLeave = y);
            });
        }
        return i;
      };
    },
  },
  Cl = wl;
function go(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function tr(e, t, n, r) {
  const {
      appear: s,
      mode: o,
      persisted: i = !1,
      onBeforeEnter: l,
      onEnter: c,
      onAfterEnter: a,
      onEnterCancelled: f,
      onBeforeLeave: h,
      onLeave: g,
      onAfterLeave: w,
      onLeaveCancelled: E,
      onBeforeAppear: S,
      onAppear: $,
      onAfterAppear: m,
      onAppearCancelled: y,
    } = t,
    N = String(e.key),
    A = go(n, e),
    B = (_, R) => {
      _ && xe(_, r, 9, R);
    },
    W = (_, R) => {
      const I = R[1];
      B(_, R),
        k(_) ? _.every((V) => V.length <= 1) && I() : _.length <= 1 && I();
    },
    D = {
      mode: o,
      persisted: i,
      beforeEnter(_) {
        let R = l;
        if (!n.isMounted)
          if (s) R = S || l;
          else return;
        _._leaveCb && _._leaveCb(!0);
        const I = A[N];
        I && rt(e, I) && I.el._leaveCb && I.el._leaveCb(), B(R, [_]);
      },
      enter(_) {
        let R = c,
          I = a,
          V = f;
        if (!n.isMounted)
          if (s) (R = $ || c), (I = m || a), (V = y || f);
          else return;
        let M = !1;
        const q = (_._enterCb = (L) => {
          M ||
            ((M = !0),
            L ? B(V, [_]) : B(I, [_]),
            D.delayedLeave && D.delayedLeave(),
            (_._enterCb = void 0));
        });
        R ? W(R, [_, q]) : q();
      },
      leave(_, R) {
        const I = String(e.key);
        if ((_._enterCb && _._enterCb(!0), n.isUnmounting)) return R();
        B(h, [_]);
        let V = !1;
        const M = (_._leaveCb = (q) => {
          V ||
            ((V = !0),
            R(),
            q ? B(E, [_]) : B(w, [_]),
            (_._leaveCb = void 0),
            A[I] === e && delete A[I]);
        });
        (A[I] = e), g ? W(g, [_, M]) : M();
      },
      clone(_) {
        return tr(_, t, n, r);
      },
    };
  return D;
}
function kn(e) {
  if (zt(e)) return (e = Xe(e)), (e.children = null), e;
}
function es(e) {
  return zt(e) ? (e.children ? e.children[0] : void 0) : e;
}
function nr(e, t) {
  e.shapeFlag & 6 && e.component
    ? nr(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function mo(e, t = !1, n) {
  let r = [],
    s = 0;
  for (let o = 0; o < e.length; o++) {
    let i = e[o];
    const l = n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
    i.type === ge
      ? (i.patchFlag & 128 && s++, (r = r.concat(mo(i.children, t, l))))
      : (t || i.type !== ve) && r.push(l != null ? Xe(i, { key: l }) : i);
  }
  if (s > 1) for (let o = 0; o < r.length; o++) r[o].patchFlag = -2;
  return r;
}
function Rr(e, t) {
  return K(e) ? (() => ie({ name: e.name }, t, { setup: e }))() : e;
}
const yt = (e) => !!e.type.__asyncLoader;
function Da(e) {
  K(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: r,
    delay: s = 200,
    timeout: o,
    suspensible: i = !0,
    onError: l,
  } = e;
  let c = null,
    a,
    f = 0;
  const h = () => (f++, (c = null), g()),
    g = () => {
      let w;
      return (
        c ||
        (w = c =
          t()
            .catch((E) => {
              if (((E = E instanceof Error ? E : new Error(String(E))), l))
                return new Promise((S, $) => {
                  l(
                    E,
                    () => S(h()),
                    () => $(E),
                    f + 1,
                  );
                });
              throw E;
            })
            .then((E) =>
              w !== c && c
                ? c
                : (E &&
                    (E.__esModule || E[Symbol.toStringTag] === "Module") &&
                    (E = E.default),
                  (a = E),
                  E),
            ))
      );
    };
  return Rr({
    name: "AsyncComponentWrapper",
    __asyncLoader: g,
    get __asyncResolved() {
      return a;
    },
    setup() {
      const w = le;
      if (a) return () => Un(a, w);
      const E = (y) => {
        (c = null), qt(y, w, 13, !r);
      };
      if ((i && w.suspense) || Et)
        return g()
          .then((y) => () => Un(y, w))
          .catch((y) => (E(y), () => (r ? se(r, { error: y }) : null)));
      const S = ae(!1),
        $ = ae(),
        m = ae(!!s);
      return (
        s &&
          setTimeout(() => {
            m.value = !1;
          }, s),
        o != null &&
          setTimeout(() => {
            if (!S.value && !$.value) {
              const y = new Error(`Async component timed out after ${o}ms.`);
              E(y), ($.value = y);
            }
          }, o),
        g()
          .then(() => {
            (S.value = !0),
              w.parent && zt(w.parent.vnode) && Pn(w.parent.update);
          })
          .catch((y) => {
            E(y), ($.value = y);
          }),
        () => {
          if (S.value && a) return Un(a, w);
          if ($.value && r) return se(r, { error: $.value });
          if (n && !m.value) return se(n);
        }
      );
    },
  });
}
function Un(e, t) {
  const { ref: n, props: r, children: s, ce: o } = t.vnode,
    i = se(e, r, s);
  return (i.ref = n), (i.ce = o), delete t.vnode.ce, i;
}
const zt = (e) => e.type.__isKeepAlive;
function El(e, t) {
  _o(e, "a", t);
}
function xl(e, t) {
  _o(e, "da", t);
}
function _o(e, t, n = le) {
  const r =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((In(t, r, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      zt(s.parent.vnode) && Tl(r, t, n, s), (s = s.parent);
  }
}
function Tl(e, t, n, r) {
  const s = In(t, e, r, !0);
  Ln(() => {
    hr(r[t], s);
  }, n);
}
function In(e, t, n = le, r = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          if (n.isUnmounted) return;
          xt(), Ct(n);
          const l = xe(t, n, e, i);
          return lt(), Tt(), l;
        });
    return r ? s.unshift(o) : s.push(o), o;
  }
}
const Be =
    (e) =>
    (t, n = le) =>
      (!Et || e === "sp") && In(e, (...r) => t(...r), n),
  Al = Be("bm"),
  At = Be("m"),
  Sl = Be("bu"),
  Ol = Be("u"),
  yo = Be("bum"),
  Ln = Be("um"),
  Pl = Be("sp"),
  Rl = Be("rtg"),
  Ml = Be("rtc");
function Fl(e, t = le) {
  In("ec", e, t);
}
const Mr = "components";
function Ba(e, t) {
  return vo(Mr, e, !0, t) || e;
}
const bo = Symbol.for("v-ndc");
function ka(e) {
  return re(e) ? vo(Mr, e, !1) || e : e || bo;
}
function vo(e, t, n = !0, r = !1) {
  const s = fe || le;
  if (s) {
    const o = s.type;
    if (e === Mr) {
      const l = fc(o, !1);
      if (l && (l === t || l === Ne(t) || l === xn(Ne(t)))) return o;
    }
    const i = ts(s[e] || o[e], t) || ts(s.appContext[e], t);
    return !i && r ? o : i;
  }
}
function ts(e, t) {
  return e && (e[t] || e[Ne(t)] || e[xn(Ne(t))]);
}
function Ua(e, t, n, r) {
  let s;
  const o = n && n[r];
  if (k(e) || re(e)) {
    s = new Array(e.length);
    for (let i = 0, l = e.length; i < l; i++)
      s[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (ee(e))
    if (e[Symbol.iterator])
      s = Array.from(e, (i, l) => t(i, l, void 0, o && o[l]));
    else {
      const i = Object.keys(e);
      s = new Array(i.length);
      for (let l = 0, c = i.length; l < c; l++) {
        const a = i[l];
        s[l] = t(e[a], a, l, o && o[l]);
      }
    }
  else s = [];
  return n && (n[r] = s), s;
}
function Ka(e, t, n = {}, r, s) {
  if (fe.isCE || (fe.parent && yt(fe.parent) && fe.parent.isCE))
    return t !== "default" && (n.name = t), se("slot", n, r && r());
  let o = e[t];
  o && o._c && (o._d = !1), Mo();
  const i = o && wo(o(n)),
    l = Io(
      ge,
      { key: n.key || (i && i.key) || `_${t}` },
      i || (r ? r() : []),
      i && e._ === 1 ? 64 : -2,
    );
  return (
    !s && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]),
    o && o._c && (o._d = !0),
    l
  );
}
function wo(e) {
  return e.some((t) =>
    wn(t) ? !(t.type === ve || (t.type === ge && !wo(t.children))) : !0,
  )
    ? e
    : null;
}
function Wa(e, t) {
  const n = {};
  for (const r in e) n[t && /[A-Z]/.test(r) ? `on:${r}` : an(r)] = e[r];
  return n;
}
const rr = (e) => (e ? (Ho(e) ? Hn(e) || e.proxy : rr(e.parent)) : null),
  It = ie(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => rr(e.parent),
    $root: (e) => rr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Fr(e),
    $forceUpdate: (e) => e.f || (e.f = () => Pn(e.update)),
    $nextTick: (e) => e.n || (e.n = On.bind(e.proxy)),
    $watch: (e) => bl.bind(e),
  }),
  Kn = (e, t) => e !== te && !e.__isScriptSetup && Y(e, t),
  Il = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: r,
        data: s,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let a;
      if (t[0] !== "$") {
        const w = i[t];
        if (w !== void 0)
          switch (w) {
            case 1:
              return r[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Kn(r, t)) return (i[t] = 1), r[t];
          if (s !== te && Y(s, t)) return (i[t] = 2), s[t];
          if ((a = e.propsOptions[0]) && Y(a, t)) return (i[t] = 3), o[t];
          if (n !== te && Y(n, t)) return (i[t] = 4), n[t];
          sr && (i[t] = 0);
        }
      }
      const f = It[t];
      let h, g;
      if (f) return t === "$attrs" && me(e, "get", t), f(e);
      if ((h = l.__cssModules) && (h = h[t])) return h;
      if (n !== te && Y(n, t)) return (i[t] = 4), n[t];
      if (((g = c.config.globalProperties), Y(g, t))) return g[t];
    },
    set({ _: e }, t, n) {
      const { data: r, setupState: s, ctx: o } = e;
      return Kn(s, t)
        ? ((s[t] = n), !0)
        : r !== te && Y(r, t)
        ? ((r[t] = n), !0)
        : Y(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: r,
          appContext: s,
          propsOptions: o,
        },
      },
      i,
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== te && Y(e, i)) ||
        Kn(t, i) ||
        ((l = o[0]) && Y(l, i)) ||
        Y(r, i) ||
        Y(It, i) ||
        Y(s.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : Y(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Va() {
  return Ll().slots;
}
function Ll() {
  const e = $n();
  return e.setupContext || (e.setupContext = Do(e));
}
function ns(e) {
  return k(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let sr = !0;
function Nl(e) {
  const t = Fr(e),
    n = e.proxy,
    r = e.ctx;
  (sr = !1), t.beforeCreate && rs(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: a,
    created: f,
    beforeMount: h,
    mounted: g,
    beforeUpdate: w,
    updated: E,
    activated: S,
    deactivated: $,
    beforeDestroy: m,
    beforeUnmount: y,
    destroyed: N,
    unmounted: A,
    render: B,
    renderTracked: W,
    renderTriggered: D,
    errorCaptured: _,
    serverPrefetch: R,
    expose: I,
    inheritAttrs: V,
    components: M,
    directives: q,
    filters: L,
  } = t;
  if ((a && $l(a, r, null), i))
    for (const ne in i) {
      const Z = i[ne];
      K(Z) && (r[ne] = Z.bind(n));
    }
  if (s) {
    const ne = s.call(n, n);
    ee(ne) && (e.data = An(ne));
  }
  if (((sr = !0), o))
    for (const ne in o) {
      const Z = o[ne],
        Qe = K(Z) ? Z.bind(n, n) : K(Z.get) ? Z.get.bind(n, n) : Pe,
        Yt = !K(Z) && K(Z.set) ? Z.set.bind(n) : Pe,
        Ze = ue({ get: Qe, set: Yt });
      Object.defineProperty(r, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => Ze.value,
        set: (Re) => (Ze.value = Re),
      });
    }
  if (l) for (const ne in l) Co(l[ne], r, n, ne);
  if (c) {
    const ne = K(c) ? c.call(n) : c;
    Reflect.ownKeys(ne).forEach((Z) => {
      Ul(Z, ne[Z]);
    });
  }
  f && rs(f, e, "c");
  function X(ne, Z) {
    k(Z) ? Z.forEach((Qe) => ne(Qe.bind(n))) : Z && ne(Z.bind(n));
  }
  if (
    (X(Al, h),
    X(At, g),
    X(Sl, w),
    X(Ol, E),
    X(El, S),
    X(xl, $),
    X(Fl, _),
    X(Ml, W),
    X(Rl, D),
    X(yo, y),
    X(Ln, A),
    X(Pl, R),
    k(I))
  )
    if (I.length) {
      const ne = e.exposed || (e.exposed = {});
      I.forEach((Z) => {
        Object.defineProperty(ne, Z, {
          get: () => n[Z],
          set: (Qe) => (n[Z] = Qe),
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === Pe && (e.render = B),
    V != null && (e.inheritAttrs = V),
    M && (e.components = M),
    q && (e.directives = q);
}
function $l(e, t, n = Pe) {
  k(e) && (e = or(e));
  for (const r in e) {
    const s = e[r];
    let o;
    ee(s)
      ? "default" in s
        ? (o = bt(s.from || r, s.default, !0))
        : (o = bt(s.from || r))
      : (o = bt(s)),
      ce(o)
        ? Object.defineProperty(t, r, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[r] = o);
  }
}
function rs(e, t, n) {
  xe(k(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Co(e, t, n, r) {
  const s = r.includes(".") ? ho(n, r) : () => n[r];
  if (re(e)) {
    const o = t[e];
    K(o) && Ye(s, o);
  } else if (K(e)) Ye(s, e.bind(n));
  else if (ee(e))
    if (k(e)) e.forEach((o) => Co(o, t, n, r));
    else {
      const o = K(e.handler) ? e.handler.bind(n) : t[e.handler];
      K(o) && Ye(s, o, e);
    }
}
function Fr(e) {
  const t = e.type,
    { mixins: n, extends: r } = t,
    {
      mixins: s,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !s.length && !n && !r
      ? (c = t)
      : ((c = {}), s.length && s.forEach((a) => yn(c, a, i, !0)), yn(c, t, i)),
    ee(t) && o.set(t, c),
    c
  );
}
function yn(e, t, n, r = !1) {
  const { mixins: s, extends: o } = t;
  o && yn(e, o, n, !0), s && s.forEach((i) => yn(e, i, n, !0));
  for (const i in t)
    if (!(r && i === "expose")) {
      const l = Hl[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Hl = {
  data: ss,
  props: os,
  emits: os,
  methods: Rt,
  computed: Rt,
  beforeCreate: he,
  created: he,
  beforeMount: he,
  mounted: he,
  beforeUpdate: he,
  updated: he,
  beforeDestroy: he,
  beforeUnmount: he,
  destroyed: he,
  unmounted: he,
  activated: he,
  deactivated: he,
  errorCaptured: he,
  serverPrefetch: he,
  components: Rt,
  directives: Rt,
  watch: Dl,
  provide: ss,
  inject: jl,
};
function ss(e, t) {
  return t
    ? e
      ? function () {
          return ie(
            K(e) ? e.call(this, this) : e,
            K(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function jl(e, t) {
  return Rt(or(e), or(t));
}
function or(e) {
  if (k(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function he(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Rt(e, t) {
  return e ? ie(Object.create(null), e, t) : t;
}
function os(e, t) {
  return e
    ? k(e) && k(t)
      ? [...new Set([...e, ...t])]
      : ie(Object.create(null), ns(e), ns(t ?? {}))
    : t;
}
function Dl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ie(Object.create(null), e);
  for (const r in t) n[r] = he(e[r], t[r]);
  return n;
}
function Eo() {
  return {
    app: null,
    config: {
      isNativeTag: li,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Bl = 0;
function kl(e, t) {
  return function (r, s = null) {
    K(r) || (r = ie({}, r)), s != null && !ee(s) && (s = null);
    const o = Eo(),
      i = new Set();
    let l = !1;
    const c = (o.app = {
      _uid: Bl++,
      _component: r,
      _props: s,
      _container: null,
      _context: o,
      _instance: null,
      version: gc,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...f) {
        return (
          i.has(a) ||
            (a && K(a.install)
              ? (i.add(a), a.install(c, ...f))
              : K(a) && (i.add(a), a(c, ...f))),
          c
        );
      },
      mixin(a) {
        return o.mixins.includes(a) || o.mixins.push(a), c;
      },
      component(a, f) {
        return f ? ((o.components[a] = f), c) : o.components[a];
      },
      directive(a, f) {
        return f ? ((o.directives[a] = f), c) : o.directives[a];
      },
      mount(a, f, h) {
        if (!l) {
          const g = se(r, s);
          return (
            (g.appContext = o),
            f && t ? t(g, a) : e(g, a, h),
            (l = !0),
            (c._container = a),
            (a.__vue_app__ = c),
            Hn(g.component) || g.component.proxy
          );
        }
      },
      unmount() {
        l && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(a, f) {
        return (o.provides[a] = f), c;
      },
      runWithContext(a) {
        bn = c;
        try {
          return a();
        } finally {
          bn = null;
        }
      },
    });
    return c;
  };
}
let bn = null;
function Ul(e, t) {
  if (le) {
    let n = le.provides;
    const r = le.parent && le.parent.provides;
    r === n && (n = le.provides = Object.create(r)), (n[e] = t);
  }
}
function bt(e, t, n = !1) {
  const r = le || fe;
  if (r || bn) {
    const s = r
      ? r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides
      : bn._context.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && K(t) ? t.call(r && r.proxy) : t;
  }
}
function Kl(e, t, n, r = !1) {
  const s = {},
    o = {};
  hn(o, Nn, 1), (e.propsDefaults = Object.create(null)), xo(e, t, s, o);
  for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
  n ? (e.props = r ? s : Xi(s)) : e.type.props ? (e.props = s) : (e.props = o),
    (e.attrs = o);
}
function Wl(e, t, n, r) {
  const {
      props: s,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = J(s),
    [c] = e.propsOptions;
  let a = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const f = e.vnode.dynamicProps;
      for (let h = 0; h < f.length; h++) {
        let g = f[h];
        if (Rn(e.emitsOptions, g)) continue;
        const w = t[g];
        if (c)
          if (Y(o, g)) w !== o[g] && ((o[g] = w), (a = !0));
          else {
            const E = Ne(g);
            s[E] = ir(c, l, E, w, e, !1);
          }
        else w !== o[g] && ((o[g] = w), (a = !0));
      }
    }
  } else {
    xo(e, t, s, o) && (a = !0);
    let f;
    for (const h in l)
      (!t || (!Y(t, h) && ((f = at(h)) === h || !Y(t, f)))) &&
        (c
          ? n &&
            (n[h] !== void 0 || n[f] !== void 0) &&
            (s[h] = ir(c, l, h, void 0, e, !0))
          : delete s[h]);
    if (o !== l) for (const h in o) (!t || !Y(t, h)) && (delete o[h], (a = !0));
  }
  a && je(e, "set", "$attrs");
}
function xo(e, t, n, r) {
  const [s, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (Mt(c)) continue;
      const a = t[c];
      let f;
      s && Y(s, (f = Ne(c)))
        ? !o || !o.includes(f)
          ? (n[f] = a)
          : ((l || (l = {}))[f] = a)
        : Rn(e.emitsOptions, c) ||
          ((!(c in r) || a !== r[c]) && ((r[c] = a), (i = !0)));
    }
  if (o) {
    const c = J(n),
      a = l || te;
    for (let f = 0; f < o.length; f++) {
      const h = o[f];
      n[h] = ir(s, c, h, a[h], e, !Y(a, h));
    }
  }
  return i;
}
function ir(e, t, n, r, s, o) {
  const i = e[n];
  if (i != null) {
    const l = Y(i, "default");
    if (l && r === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && K(c)) {
        const { propsDefaults: a } = s;
        n in a ? (r = a[n]) : (Ct(s), (r = a[n] = c.call(null, t)), lt());
      } else r = c;
    }
    i[0] &&
      (o && !l ? (r = !1) : i[1] && (r === "" || r === at(n)) && (r = !0));
  }
  return r;
}
function To(e, t, n = !1) {
  const r = t.propsCache,
    s = r.get(e);
  if (s) return s;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!K(e)) {
    const f = (h) => {
      c = !0;
      const [g, w] = To(h, t, !0);
      ie(i, g), w && l.push(...w);
    };
    !n && t.mixins.length && t.mixins.forEach(f),
      e.extends && f(e.extends),
      e.mixins && e.mixins.forEach(f);
  }
  if (!o && !c) return ee(e) && r.set(e, pt), pt;
  if (k(o))
    for (let f = 0; f < o.length; f++) {
      const h = Ne(o[f]);
      is(h) && (i[h] = te);
    }
  else if (o)
    for (const f in o) {
      const h = Ne(f);
      if (is(h)) {
        const g = o[f],
          w = (i[h] = k(g) || K(g) ? { type: g } : ie({}, g));
        if (w) {
          const E = as(Boolean, w.type),
            S = as(String, w.type);
          (w[0] = E > -1),
            (w[1] = S < 0 || E < S),
            (E > -1 || Y(w, "default")) && l.push(h);
        }
      }
    }
  const a = [i, l];
  return ee(e) && r.set(e, a), a;
}
function is(e) {
  return e[0] !== "$";
}
function ls(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
  return t ? t[2] : e === null ? "null" : "";
}
function cs(e, t) {
  return ls(e) === ls(t);
}
function as(e, t) {
  return k(t) ? t.findIndex((n) => cs(n, e)) : K(t) && cs(t, e) ? 0 : -1;
}
const Ao = (e) => e[0] === "_" || e === "$stable",
  Ir = (e) => (k(e) ? e.map(Ae) : [Ae(e)]),
  Vl = (e, t, n) => {
    if (t._n) return t;
    const r = hl((...s) => Ir(t(...s)), n);
    return (r._c = !1), r;
  },
  So = (e, t, n) => {
    const r = e._ctx;
    for (const s in e) {
      if (Ao(s)) continue;
      const o = e[s];
      if (K(o)) t[s] = Vl(s, o, r);
      else if (o != null) {
        const i = Ir(o);
        t[s] = () => i;
      }
    }
  },
  Oo = (e, t) => {
    const n = Ir(t);
    e.slots.default = () => n;
  },
  ql = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = J(t)), hn(t, "_", n)) : So(t, (e.slots = {}));
    } else (e.slots = {}), t && Oo(e, t);
    hn(e.slots, Nn, 1);
  },
  zl = (e, t, n) => {
    const { vnode: r, slots: s } = e;
    let o = !0,
      i = te;
    if (r.shapeFlag & 32) {
      const l = t._;
      l
        ? n && l === 1
          ? (o = !1)
          : (ie(s, t), !n && l === 1 && delete s._)
        : ((o = !t.$stable), So(t, s)),
        (i = t);
    } else t && (Oo(e, t), (i = { default: 1 }));
    if (o) for (const l in s) !Ao(l) && !(l in i) && delete s[l];
  };
function vn(e, t, n, r, s = !1) {
  if (k(e)) {
    e.forEach((g, w) => vn(g, t && (k(t) ? t[w] : t), n, r, s));
    return;
  }
  if (yt(r) && !s) return;
  const o = r.shapeFlag & 4 ? Hn(r.component) || r.component.proxy : r.el,
    i = s ? null : o,
    { i: l, r: c } = e,
    a = t && t.r,
    f = l.refs === te ? (l.refs = {}) : l.refs,
    h = l.setupState;
  if (
    (a != null &&
      a !== c &&
      (re(a)
        ? ((f[a] = null), Y(h, a) && (h[a] = null))
        : ce(a) && (a.value = null)),
    K(c))
  )
    ze(c, l, 12, [i, f]);
  else {
    const g = re(c),
      w = ce(c);
    if (g || w) {
      const E = () => {
        if (e.f) {
          const S = g ? (Y(h, c) ? h[c] : f[c]) : c.value;
          s
            ? k(S) && hr(S, o)
            : k(S)
            ? S.includes(o) || S.push(o)
            : g
            ? ((f[c] = [o]), Y(h, c) && (h[c] = f[c]))
            : ((c.value = [o]), e.k && (f[e.k] = c.value));
        } else
          g
            ? ((f[c] = i), Y(h, c) && (h[c] = i))
            : w && ((c.value = i), e.k && (f[e.k] = i));
      };
      i ? ((E.id = -1), pe(E, n)) : E();
    }
  }
}
let Ue = !1;
const nn = (e) => /svg/.test(e.namespaceURI) && e.tagName !== "foreignObject",
  rn = (e) => e.nodeType === 8;
function Yl(e) {
  const {
      mt: t,
      p: n,
      o: {
        patchProp: r,
        createText: s,
        nextSibling: o,
        parentNode: i,
        remove: l,
        insert: c,
        createComment: a,
      },
    } = e,
    f = (m, y) => {
      if (!y.hasChildNodes()) {
        n(null, m, y), mn(), (y._vnode = m);
        return;
      }
      (Ue = !1),
        h(y.firstChild, m, null, null, null),
        mn(),
        (y._vnode = m),
        Ue && console.error("Hydration completed but contains mismatches.");
    },
    h = (m, y, N, A, B, W = !1) => {
      const D = rn(m) && m.data === "[",
        _ = () => S(m, y, N, A, B, D),
        { type: R, ref: I, shapeFlag: V, patchFlag: M } = y;
      let q = m.nodeType;
      (y.el = m), M === -2 && ((W = !1), (y.dynamicChildren = null));
      let L = null;
      switch (R) {
        case wt:
          q !== 3
            ? y.children === ""
              ? (c((y.el = s("")), i(m), m), (L = m))
              : (L = _())
            : (m.data !== y.children && ((Ue = !0), (m.data = y.children)),
              (L = o(m)));
          break;
        case ve:
          q !== 8 || D ? (L = _()) : (L = o(m));
          break;
        case Nt:
          if ((D && ((m = o(m)), (q = m.nodeType)), q === 1 || q === 3)) {
            L = m;
            const _e = !y.children.length;
            for (let X = 0; X < y.staticCount; X++)
              _e && (y.children += L.nodeType === 1 ? L.outerHTML : L.data),
                X === y.staticCount - 1 && (y.anchor = L),
                (L = o(L));
            return D ? o(L) : L;
          } else _();
          break;
        case ge:
          D ? (L = E(m, y, N, A, B, W)) : (L = _());
          break;
        default:
          if (V & 1)
            q !== 1 || y.type.toLowerCase() !== m.tagName.toLowerCase()
              ? (L = _())
              : (L = g(m, y, N, A, B, W));
          else if (V & 6) {
            y.slotScopeIds = B;
            const _e = i(m);
            if (
              (t(y, _e, null, N, A, nn(_e), W),
              (L = D ? $(m) : o(m)),
              L && rn(L) && L.data === "teleport end" && (L = o(L)),
              yt(y))
            ) {
              let X;
              D
                ? ((X = se(ge)),
                  (X.anchor = L ? L.previousSibling : _e.lastChild))
                : (X = m.nodeType === 3 ? $o("") : se("div")),
                (X.el = m),
                (y.component.subTree = X);
            }
          } else
            V & 64
              ? q !== 8
                ? (L = _())
                : (L = y.type.hydrate(m, y, N, A, B, W, e, w))
              : V & 128 &&
                (L = y.type.hydrate(m, y, N, A, nn(i(m)), B, W, e, h));
      }
      return I != null && vn(I, null, A, y), L;
    },
    g = (m, y, N, A, B, W) => {
      W = W || !!y.dynamicChildren;
      const { type: D, props: _, patchFlag: R, shapeFlag: I, dirs: V } = y,
        M = (D === "input" && V) || D === "option";
      if (M || R !== -1) {
        if ((V && Fe(y, null, N, "created"), _))
          if (M || !W || R & 48)
            for (const L in _)
              ((M && L.endsWith("value")) || (Vt(L) && !Mt(L))) &&
                r(m, L, null, _[L], !1, void 0, N);
          else _.onClick && r(m, "onClick", null, _.onClick, !1, void 0, N);
        let q;
        if (
          ((q = _ && _.onVnodeBeforeMount) && Ce(q, N, y),
          V && Fe(y, null, N, "beforeMount"),
          ((q = _ && _.onVnodeMounted) || V) &&
            fo(() => {
              q && Ce(q, N, y), V && Fe(y, null, N, "mounted");
            }, A),
          I & 16 && !(_ && (_.innerHTML || _.textContent)))
        ) {
          let L = w(m.firstChild, y, m, N, A, B, W);
          for (; L; ) {
            Ue = !0;
            const _e = L;
            (L = L.nextSibling), l(_e);
          }
        } else
          I & 8 &&
            m.textContent !== y.children &&
            ((Ue = !0), (m.textContent = y.children));
      }
      return m.nextSibling;
    },
    w = (m, y, N, A, B, W, D) => {
      D = D || !!y.dynamicChildren;
      const _ = y.children,
        R = _.length;
      for (let I = 0; I < R; I++) {
        const V = D ? _[I] : (_[I] = Ae(_[I]));
        if (m) m = h(m, V, A, B, W, D);
        else {
          if (V.type === wt && !V.children) continue;
          (Ue = !0), n(null, V, N, null, A, B, nn(N), W);
        }
      }
      return m;
    },
    E = (m, y, N, A, B, W) => {
      const { slotScopeIds: D } = y;
      D && (B = B ? B.concat(D) : D);
      const _ = i(m),
        R = w(o(m), y, _, N, A, B, W);
      return R && rn(R) && R.data === "]"
        ? o((y.anchor = R))
        : ((Ue = !0), c((y.anchor = a("]")), _, R), R);
    },
    S = (m, y, N, A, B, W) => {
      if (((Ue = !0), (y.el = null), W)) {
        const R = $(m);
        for (;;) {
          const I = o(m);
          if (I && I !== R) l(I);
          else break;
        }
      }
      const D = o(m),
        _ = i(m);
      return l(m), n(null, y, _, D, N, A, nn(_), B), D;
    },
    $ = (m) => {
      let y = 0;
      for (; m; )
        if (
          ((m = o(m)), m && rn(m) && (m.data === "[" && y++, m.data === "]"))
        ) {
          if (y === 0) return o(m);
          y--;
        }
      return m;
    };
  return [f, h];
}
const pe = fo;
function Jl(e) {
  return Po(e);
}
function Xl(e) {
  return Po(e, Yl);
}
function Po(e, t) {
  const n = Xn();
  n.__VUE__ = !0;
  const {
      insert: r,
      remove: s,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: a,
      setElementText: f,
      parentNode: h,
      nextSibling: g,
      setScopeId: w = Pe,
      insertStaticContent: E,
    } = e,
    S = (
      u,
      d,
      p,
      v = null,
      b = null,
      T = null,
      P = !1,
      x = null,
      O = !!d.dynamicChildren,
    ) => {
      if (u === d) return;
      u && !rt(u, d) && ((v = Jt(u)), Re(u, b, T, !0), (u = null)),
        d.patchFlag === -2 && ((O = !1), (d.dynamicChildren = null));
      const { type: C, ref: H, shapeFlag: F } = d;
      switch (C) {
        case wt:
          $(u, d, p, v);
          break;
        case ve:
          m(u, d, p, v);
          break;
        case Nt:
          u == null && y(d, p, v, P);
          break;
        case ge:
          M(u, d, p, v, b, T, P, x, O);
          break;
        default:
          F & 1
            ? B(u, d, p, v, b, T, P, x, O)
            : F & 6
            ? q(u, d, p, v, b, T, P, x, O)
            : (F & 64 || F & 128) && C.process(u, d, p, v, b, T, P, x, O, ut);
      }
      H != null && b && vn(H, u && u.ref, T, d || u, !d);
    },
    $ = (u, d, p, v) => {
      if (u == null) r((d.el = l(d.children)), p, v);
      else {
        const b = (d.el = u.el);
        d.children !== u.children && a(b, d.children);
      }
    },
    m = (u, d, p, v) => {
      u == null ? r((d.el = c(d.children || "")), p, v) : (d.el = u.el);
    },
    y = (u, d, p, v) => {
      [u.el, u.anchor] = E(u.children, d, p, v, u.el, u.anchor);
    },
    N = ({ el: u, anchor: d }, p, v) => {
      let b;
      for (; u && u !== d; ) (b = g(u)), r(u, p, v), (u = b);
      r(d, p, v);
    },
    A = ({ el: u, anchor: d }) => {
      let p;
      for (; u && u !== d; ) (p = g(u)), s(u), (u = p);
      s(d);
    },
    B = (u, d, p, v, b, T, P, x, O) => {
      (P = P || d.type === "svg"),
        u == null ? W(d, p, v, b, T, P, x, O) : R(u, d, b, T, P, x, O);
    },
    W = (u, d, p, v, b, T, P, x) => {
      let O, C;
      const { type: H, props: F, shapeFlag: j, transition: U, dirs: z } = u;
      if (
        ((O = u.el = i(u.type, T, F && F.is, F)),
        j & 8
          ? f(O, u.children)
          : j & 16 &&
            _(u.children, O, null, v, b, T && H !== "foreignObject", P, x),
        z && Fe(u, null, v, "created"),
        D(O, u, u.scopeId, P, v),
        F)
      ) {
        for (const Q in F)
          Q !== "value" &&
            !Mt(Q) &&
            o(O, Q, null, F[Q], T, u.children, v, b, $e);
        "value" in F && o(O, "value", null, F.value),
          (C = F.onVnodeBeforeMount) && Ce(C, v, u);
      }
      z && Fe(u, null, v, "beforeMount");
      const G = (!b || (b && !b.pendingBranch)) && U && !U.persisted;
      G && U.beforeEnter(O),
        r(O, d, p),
        ((C = F && F.onVnodeMounted) || G || z) &&
          pe(() => {
            C && Ce(C, v, u), G && U.enter(O), z && Fe(u, null, v, "mounted");
          }, b);
    },
    D = (u, d, p, v, b) => {
      if ((p && w(u, p), v)) for (let T = 0; T < v.length; T++) w(u, v[T]);
      if (b) {
        let T = b.subTree;
        if (d === T) {
          const P = b.vnode;
          D(u, P, P.scopeId, P.slotScopeIds, b.parent);
        }
      }
    },
    _ = (u, d, p, v, b, T, P, x, O = 0) => {
      for (let C = O; C < u.length; C++) {
        const H = (u[C] = x ? Ve(u[C]) : Ae(u[C]));
        S(null, H, d, p, v, b, T, P, x);
      }
    },
    R = (u, d, p, v, b, T, P) => {
      const x = (d.el = u.el);
      let { patchFlag: O, dynamicChildren: C, dirs: H } = d;
      O |= u.patchFlag & 16;
      const F = u.props || te,
        j = d.props || te;
      let U;
      p && Ge(p, !1),
        (U = j.onVnodeBeforeUpdate) && Ce(U, p, d, u),
        H && Fe(d, u, p, "beforeUpdate"),
        p && Ge(p, !0);
      const z = b && d.type !== "foreignObject";
      if (
        (C
          ? I(u.dynamicChildren, C, x, p, v, z, T)
          : P || Z(u, d, x, null, p, v, z, T, !1),
        O > 0)
      ) {
        if (O & 16) V(x, d, F, j, p, v, b);
        else if (
          (O & 2 && F.class !== j.class && o(x, "class", null, j.class, b),
          O & 4 && o(x, "style", F.style, j.style, b),
          O & 8)
        ) {
          const G = d.dynamicProps;
          for (let Q = 0; Q < G.length; Q++) {
            const oe = G[Q],
              Te = F[oe],
              ft = j[oe];
            (ft !== Te || oe === "value") &&
              o(x, oe, Te, ft, b, u.children, p, v, $e);
          }
        }
        O & 1 && u.children !== d.children && f(x, d.children);
      } else !P && C == null && V(x, d, F, j, p, v, b);
      ((U = j.onVnodeUpdated) || H) &&
        pe(() => {
          U && Ce(U, p, d, u), H && Fe(d, u, p, "updated");
        }, v);
    },
    I = (u, d, p, v, b, T, P) => {
      for (let x = 0; x < d.length; x++) {
        const O = u[x],
          C = d[x],
          H =
            O.el && (O.type === ge || !rt(O, C) || O.shapeFlag & 70)
              ? h(O.el)
              : p;
        S(O, C, H, null, v, b, T, P, !0);
      }
    },
    V = (u, d, p, v, b, T, P) => {
      if (p !== v) {
        if (p !== te)
          for (const x in p)
            !Mt(x) && !(x in v) && o(u, x, p[x], null, P, d.children, b, T, $e);
        for (const x in v) {
          if (Mt(x)) continue;
          const O = v[x],
            C = p[x];
          O !== C && x !== "value" && o(u, x, C, O, P, d.children, b, T, $e);
        }
        "value" in v && o(u, "value", p.value, v.value);
      }
    },
    M = (u, d, p, v, b, T, P, x, O) => {
      const C = (d.el = u ? u.el : l("")),
        H = (d.anchor = u ? u.anchor : l(""));
      let { patchFlag: F, dynamicChildren: j, slotScopeIds: U } = d;
      U && (x = x ? x.concat(U) : U),
        u == null
          ? (r(C, p, v), r(H, p, v), _(d.children, p, H, b, T, P, x, O))
          : F > 0 && F & 64 && j && u.dynamicChildren
          ? (I(u.dynamicChildren, j, p, b, T, P, x),
            (d.key != null || (b && d === b.subTree)) && Lr(u, d, !0))
          : Z(u, d, p, H, b, T, P, x, O);
    },
    q = (u, d, p, v, b, T, P, x, O) => {
      (d.slotScopeIds = x),
        u == null
          ? d.shapeFlag & 512
            ? b.ctx.activate(d, p, v, P, O)
            : L(d, p, v, b, T, P, O)
          : _e(u, d, O);
    },
    L = (u, d, p, v, b, T, P) => {
      const x = (u.component = lc(u, v, b));
      if ((zt(u) && (x.ctx.renderer = ut), cc(x), x.asyncDep)) {
        if ((b && b.registerDep(x, X), !u.el)) {
          const O = (x.subTree = se(ve));
          m(null, O, d, p);
        }
        return;
      }
      X(x, u, d, p, b, T, P);
    },
    _e = (u, d, p) => {
      const v = (d.component = u.component);
      if (ml(u, d, p))
        if (v.asyncDep && !v.asyncResolved) {
          ne(v, d, p);
          return;
        } else (v.next = d), al(v.update), v.update();
      else (d.el = u.el), (v.vnode = d);
    },
    X = (u, d, p, v, b, T, P) => {
      const x = () => {
          if (u.isMounted) {
            let { next: H, bu: F, u: j, parent: U, vnode: z } = u,
              G = H,
              Q;
            Ge(u, !1),
              H ? ((H.el = z.el), ne(u, H, P)) : (H = z),
              F && un(F),
              (Q = H.props && H.props.onVnodeBeforeUpdate) && Ce(Q, U, H, z),
              Ge(u, !0);
            const oe = Bn(u),
              Te = u.subTree;
            (u.subTree = oe),
              S(Te, oe, h(Te.el), Jt(Te), u, b, T),
              (H.el = oe.el),
              G === null && _l(u, oe.el),
              j && pe(j, b),
              (Q = H.props && H.props.onVnodeUpdated) &&
                pe(() => Ce(Q, U, H, z), b);
          } else {
            let H;
            const { el: F, props: j } = d,
              { bm: U, m: z, parent: G } = u,
              Q = yt(d);
            if (
              (Ge(u, !1),
              U && un(U),
              !Q && (H = j && j.onVnodeBeforeMount) && Ce(H, G, d),
              Ge(u, !0),
              F && Dn)
            ) {
              const oe = () => {
                (u.subTree = Bn(u)), Dn(F, u.subTree, u, b, null);
              };
              Q
                ? d.type.__asyncLoader().then(() => !u.isUnmounted && oe())
                : oe();
            } else {
              const oe = (u.subTree = Bn(u));
              S(null, oe, p, v, u, b, T), (d.el = oe.el);
            }
            if ((z && pe(z, b), !Q && (H = j && j.onVnodeMounted))) {
              const oe = d;
              pe(() => Ce(H, G, oe), b);
            }
            (d.shapeFlag & 256 ||
              (G && yt(G.vnode) && G.vnode.shapeFlag & 256)) &&
              u.a &&
              pe(u.a, b),
              (u.isMounted = !0),
              (d = p = v = null);
          }
        },
        O = (u.effect = new br(x, () => Pn(C), u.scope)),
        C = (u.update = () => O.run());
      (C.id = u.uid), Ge(u, !0), C();
    },
    ne = (u, d, p) => {
      d.component = u;
      const v = u.vnode.props;
      (u.vnode = d),
        (u.next = null),
        Wl(u, d.props, v, p),
        zl(u, d.children, p),
        xt(),
        Zr(),
        Tt();
    },
    Z = (u, d, p, v, b, T, P, x, O = !1) => {
      const C = u && u.children,
        H = u ? u.shapeFlag : 0,
        F = d.children,
        { patchFlag: j, shapeFlag: U } = d;
      if (j > 0) {
        if (j & 128) {
          Yt(C, F, p, v, b, T, P, x, O);
          return;
        } else if (j & 256) {
          Qe(C, F, p, v, b, T, P, x, O);
          return;
        }
      }
      U & 8
        ? (H & 16 && $e(C, b, T), F !== C && f(p, F))
        : H & 16
        ? U & 16
          ? Yt(C, F, p, v, b, T, P, x, O)
          : $e(C, b, T, !0)
        : (H & 8 && f(p, ""), U & 16 && _(F, p, v, b, T, P, x, O));
    },
    Qe = (u, d, p, v, b, T, P, x, O) => {
      (u = u || pt), (d = d || pt);
      const C = u.length,
        H = d.length,
        F = Math.min(C, H);
      let j;
      for (j = 0; j < F; j++) {
        const U = (d[j] = O ? Ve(d[j]) : Ae(d[j]));
        S(u[j], U, p, null, b, T, P, x, O);
      }
      C > H ? $e(u, b, T, !0, !1, F) : _(d, p, v, b, T, P, x, O, F);
    },
    Yt = (u, d, p, v, b, T, P, x, O) => {
      let C = 0;
      const H = d.length;
      let F = u.length - 1,
        j = H - 1;
      for (; C <= F && C <= j; ) {
        const U = u[C],
          z = (d[C] = O ? Ve(d[C]) : Ae(d[C]));
        if (rt(U, z)) S(U, z, p, null, b, T, P, x, O);
        else break;
        C++;
      }
      for (; C <= F && C <= j; ) {
        const U = u[F],
          z = (d[j] = O ? Ve(d[j]) : Ae(d[j]));
        if (rt(U, z)) S(U, z, p, null, b, T, P, x, O);
        else break;
        F--, j--;
      }
      if (C > F) {
        if (C <= j) {
          const U = j + 1,
            z = U < H ? d[U].el : v;
          for (; C <= j; )
            S(null, (d[C] = O ? Ve(d[C]) : Ae(d[C])), p, z, b, T, P, x, O), C++;
        }
      } else if (C > j) for (; C <= F; ) Re(u[C], b, T, !0), C++;
      else {
        const U = C,
          z = C,
          G = new Map();
        for (C = z; C <= j; C++) {
          const ye = (d[C] = O ? Ve(d[C]) : Ae(d[C]));
          ye.key != null && G.set(ye.key, C);
        }
        let Q,
          oe = 0;
        const Te = j - z + 1;
        let ft = !1,
          kr = 0;
        const St = new Array(Te);
        for (C = 0; C < Te; C++) St[C] = 0;
        for (C = U; C <= F; C++) {
          const ye = u[C];
          if (oe >= Te) {
            Re(ye, b, T, !0);
            continue;
          }
          let Me;
          if (ye.key != null) Me = G.get(ye.key);
          else
            for (Q = z; Q <= j; Q++)
              if (St[Q - z] === 0 && rt(ye, d[Q])) {
                Me = Q;
                break;
              }
          Me === void 0
            ? Re(ye, b, T, !0)
            : ((St[Me - z] = C + 1),
              Me >= kr ? (kr = Me) : (ft = !0),
              S(ye, d[Me], p, null, b, T, P, x, O),
              oe++);
        }
        const Ur = ft ? Ql(St) : pt;
        for (Q = Ur.length - 1, C = Te - 1; C >= 0; C--) {
          const ye = z + C,
            Me = d[ye],
            Kr = ye + 1 < H ? d[ye + 1].el : v;
          St[C] === 0
            ? S(null, Me, p, Kr, b, T, P, x, O)
            : ft && (Q < 0 || C !== Ur[Q] ? Ze(Me, p, Kr, 2) : Q--);
        }
      }
    },
    Ze = (u, d, p, v, b = null) => {
      const { el: T, type: P, transition: x, children: O, shapeFlag: C } = u;
      if (C & 6) {
        Ze(u.component.subTree, d, p, v);
        return;
      }
      if (C & 128) {
        u.suspense.move(d, p, v);
        return;
      }
      if (C & 64) {
        P.move(u, d, p, ut);
        return;
      }
      if (P === ge) {
        r(T, d, p);
        for (let F = 0; F < O.length; F++) Ze(O[F], d, p, v);
        r(u.anchor, d, p);
        return;
      }
      if (P === Nt) {
        N(u, d, p);
        return;
      }
      if (v !== 2 && C & 1 && x)
        if (v === 0) x.beforeEnter(T), r(T, d, p), pe(() => x.enter(T), b);
        else {
          const { leave: F, delayLeave: j, afterLeave: U } = x,
            z = () => r(T, d, p),
            G = () => {
              F(T, () => {
                z(), U && U();
              });
            };
          j ? j(T, z, G) : G();
        }
      else r(T, d, p);
    },
    Re = (u, d, p, v = !1, b = !1) => {
      const {
        type: T,
        props: P,
        ref: x,
        children: O,
        dynamicChildren: C,
        shapeFlag: H,
        patchFlag: F,
        dirs: j,
      } = u;
      if ((x != null && vn(x, null, p, u, !0), H & 256)) {
        d.ctx.deactivate(u);
        return;
      }
      const U = H & 1 && j,
        z = !yt(u);
      let G;
      if ((z && (G = P && P.onVnodeBeforeUnmount) && Ce(G, d, u), H & 6))
        ii(u.component, p, v);
      else {
        if (H & 128) {
          u.suspense.unmount(p, v);
          return;
        }
        U && Fe(u, null, d, "beforeUnmount"),
          H & 64
            ? u.type.remove(u, d, p, b, ut, v)
            : C && (T !== ge || (F > 0 && F & 64))
            ? $e(C, d, p, !1, !0)
            : ((T === ge && F & 384) || (!b && H & 16)) && $e(O, d, p),
          v && Dr(u);
      }
      ((z && (G = P && P.onVnodeUnmounted)) || U) &&
        pe(() => {
          G && Ce(G, d, u), U && Fe(u, null, d, "unmounted");
        }, p);
    },
    Dr = (u) => {
      const { type: d, el: p, anchor: v, transition: b } = u;
      if (d === ge) {
        oi(p, v);
        return;
      }
      if (d === Nt) {
        A(u);
        return;
      }
      const T = () => {
        s(p), b && !b.persisted && b.afterLeave && b.afterLeave();
      };
      if (u.shapeFlag & 1 && b && !b.persisted) {
        const { leave: P, delayLeave: x } = b,
          O = () => P(p, T);
        x ? x(u.el, T, O) : O();
      } else T();
    },
    oi = (u, d) => {
      let p;
      for (; u !== d; ) (p = g(u)), s(u), (u = p);
      s(d);
    },
    ii = (u, d, p) => {
      const { bum: v, scope: b, update: T, subTree: P, um: x } = u;
      v && un(v),
        b.stop(),
        T && ((T.active = !1), Re(P, u, d, p)),
        x && pe(x, d),
        pe(() => {
          u.isUnmounted = !0;
        }, d),
        d &&
          d.pendingBranch &&
          !d.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === d.pendingId &&
          (d.deps--, d.deps === 0 && d.resolve());
    },
    $e = (u, d, p, v = !1, b = !1, T = 0) => {
      for (let P = T; P < u.length; P++) Re(u[P], d, p, v, b);
    },
    Jt = (u) =>
      u.shapeFlag & 6
        ? Jt(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : g(u.anchor || u.el),
    Br = (u, d, p) => {
      u == null
        ? d._vnode && Re(d._vnode, null, null, !0)
        : S(d._vnode || null, u, d, null, null, null, p),
        Zr(),
        mn(),
        (d._vnode = u);
    },
    ut = {
      p: S,
      um: Re,
      m: Ze,
      r: Dr,
      mt: L,
      mc: _,
      pc: Z,
      pbc: I,
      n: Jt,
      o: e,
    };
  let jn, Dn;
  return (
    t && ([jn, Dn] = t(ut)), { render: Br, hydrate: jn, createApp: kl(Br, jn) }
  );
}
function Ge({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Lr(e, t, n = !1) {
  const r = e.children,
    s = t.children;
  if (k(r) && k(s))
    for (let o = 0; o < r.length; o++) {
      const i = r[o];
      let l = s[o];
      l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = s[o] = Ve(s[o])), (l.el = i.el)),
        n || Lr(i, l)),
        l.type === wt && (l.el = i.el);
    }
}
function Ql(e) {
  const t = e.slice(),
    n = [0];
  let r, s, o, i, l;
  const c = e.length;
  for (r = 0; r < c; r++) {
    const a = e[r];
    if (a !== 0) {
      if (((s = n[n.length - 1]), e[s] < a)) {
        (t[r] = s), n.push(r);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        (l = (o + i) >> 1), e[n[l]] < a ? (o = l + 1) : (i = l);
      a < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
  return n;
}
const Zl = (e) => e.__isTeleport,
  Lt = (e) => e && (e.disabled || e.disabled === ""),
  us = (e) => typeof SVGElement < "u" && e instanceof SVGElement,
  lr = (e, t) => {
    const n = e && e.to;
    return re(n) ? (t ? t(n) : null) : n;
  },
  Gl = {
    __isTeleport: !0,
    process(e, t, n, r, s, o, i, l, c, a) {
      const {
          mc: f,
          pc: h,
          pbc: g,
          o: { insert: w, querySelector: E, createText: S, createComment: $ },
        } = a,
        m = Lt(t.props);
      let { shapeFlag: y, children: N, dynamicChildren: A } = t;
      if (e == null) {
        const B = (t.el = S("")),
          W = (t.anchor = S(""));
        w(B, n, r), w(W, n, r);
        const D = (t.target = lr(t.props, E)),
          _ = (t.targetAnchor = S(""));
        D && (w(_, D), (i = i || us(D)));
        const R = (I, V) => {
          y & 16 && f(N, I, V, s, o, i, l, c);
        };
        m ? R(n, W) : D && R(D, _);
      } else {
        t.el = e.el;
        const B = (t.anchor = e.anchor),
          W = (t.target = e.target),
          D = (t.targetAnchor = e.targetAnchor),
          _ = Lt(e.props),
          R = _ ? n : W,
          I = _ ? B : D;
        if (
          ((i = i || us(W)),
          A
            ? (g(e.dynamicChildren, A, R, s, o, i, l), Lr(e, t, !0))
            : c || h(e, t, R, I, s, o, i, l, !1),
          m)
        )
          _ || sn(t, n, B, a, 1);
        else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
          const V = (t.target = lr(t.props, E));
          V && sn(t, V, null, a, 0);
        } else _ && sn(t, W, D, a, 1);
      }
      Ro(t);
    },
    remove(e, t, n, r, { um: s, o: { remove: o } }, i) {
      const {
        shapeFlag: l,
        children: c,
        anchor: a,
        targetAnchor: f,
        target: h,
        props: g,
      } = e;
      if ((h && o(f), (i || !Lt(g)) && (o(a), l & 16)))
        for (let w = 0; w < c.length; w++) {
          const E = c[w];
          s(E, t, n, !0, !!E.dynamicChildren);
        }
    },
    move: sn,
    hydrate: ec,
  };
function sn(e, t, n, { o: { insert: r }, m: s }, o = 2) {
  o === 0 && r(e.targetAnchor, t, n);
  const { el: i, anchor: l, shapeFlag: c, children: a, props: f } = e,
    h = o === 2;
  if ((h && r(i, t, n), (!h || Lt(f)) && c & 16))
    for (let g = 0; g < a.length; g++) s(a[g], t, n, 2);
  h && r(l, t, n);
}
function ec(
  e,
  t,
  n,
  r,
  s,
  o,
  { o: { nextSibling: i, parentNode: l, querySelector: c } },
  a,
) {
  const f = (t.target = lr(t.props, c));
  if (f) {
    const h = f._lpa || f.firstChild;
    if (t.shapeFlag & 16)
      if (Lt(t.props))
        (t.anchor = a(i(e), t, l(e), n, r, s, o)), (t.targetAnchor = h);
      else {
        t.anchor = i(e);
        let g = h;
        for (; g; )
          if (
            ((g = i(g)), g && g.nodeType === 8 && g.data === "teleport anchor")
          ) {
            (t.targetAnchor = g),
              (f._lpa = t.targetAnchor && i(t.targetAnchor));
            break;
          }
        a(h, t, f, n, r, s, o);
      }
    Ro(t);
  }
  return t.anchor && i(t.anchor);
}
const qa = Gl;
function Ro(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid),
        (n = n.nextSibling);
    t.ut();
  }
}
const ge = Symbol.for("v-fgt"),
  wt = Symbol.for("v-txt"),
  ve = Symbol.for("v-cmt"),
  Nt = Symbol.for("v-stc"),
  $t = [];
let Oe = null;
function Mo(e = !1) {
  $t.push((Oe = e ? null : []));
}
function tc() {
  $t.pop(), (Oe = $t[$t.length - 1] || null);
}
let Ut = 1;
function fs(e) {
  Ut += e;
}
function Fo(e) {
  return (
    (e.dynamicChildren = Ut > 0 ? Oe || pt : null),
    tc(),
    Ut > 0 && Oe && Oe.push(e),
    e
  );
}
function za(e, t, n, r, s, o) {
  return Fo(No(e, t, n, r, s, o, !0));
}
function Io(e, t, n, r, s) {
  return Fo(se(e, t, n, r, s, !0));
}
function wn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function rt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Nn = "__vInternal",
  Lo = ({ key: e }) => e ?? null,
  fn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? re(e) || ce(e) || K(e)
        ? { i: fe, r: e, k: t, f: !!n }
        : e
      : null
  );
function No(
  e,
  t = null,
  n = null,
  r = 0,
  s = null,
  o = e === ge ? 0 : 1,
  i = !1,
  l = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Lo(t),
    ref: t && fn(t),
    scopeId: Mn,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: r,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: fe,
  };
  return (
    l
      ? (Nr(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= re(n) ? 8 : 16),
    Ut > 0 &&
      !i &&
      Oe &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Oe.push(c),
    c
  );
}
const se = nc;
function nc(e, t = null, n = null, r = 0, s = null, o = !1) {
  if (((!e || e === bo) && (e = ve), wn(e))) {
    const l = Xe(e, t, !0);
    return (
      n && Nr(l, n),
      Ut > 0 &&
        !o &&
        Oe &&
        (l.shapeFlag & 6 ? (Oe[Oe.indexOf(e)] = l) : Oe.push(l)),
      (l.patchFlag |= -2),
      l
    );
  }
  if ((dc(e) && (e = e.__vccOpts), t)) {
    t = rc(t);
    let { class: l, style: c } = t;
    l && !re(l) && (t.class = _r(l)),
      ee(c) && (ro(c) && !k(c) && (c = ie({}, c)), (t.style = mr(c)));
  }
  const i = re(e) ? 1 : yl(e) ? 128 : Zl(e) ? 64 : ee(e) ? 4 : K(e) ? 2 : 0;
  return No(e, t, n, r, s, i, o, !0);
}
function rc(e) {
  return e ? (ro(e) || Nn in e ? ie({}, e) : e) : null;
}
function Xe(e, t, n = !1) {
  const { props: r, ref: s, patchFlag: o, children: i } = e,
    l = t ? sc(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && Lo(l),
    ref:
      t && t.ref ? (n && s ? (k(s) ? s.concat(fn(t)) : [s, fn(t)]) : fn(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ge ? (o === -1 ? 16 : o | 16) : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Xe(e.ssContent),
    ssFallback: e.ssFallback && Xe(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  };
}
function $o(e = " ", t = 0) {
  return se(wt, null, e, t);
}
function Ya(e, t) {
  const n = se(Nt, null, e);
  return (n.staticCount = t), n;
}
function Ja(e = "", t = !1) {
  return t ? (Mo(), Io(ve, null, e)) : se(ve, null, e);
}
function Ae(e) {
  return e == null || typeof e == "boolean"
    ? se(ve)
    : k(e)
    ? se(ge, null, e.slice())
    : typeof e == "object"
    ? Ve(e)
    : se(wt, null, String(e));
}
function Ve(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Xe(e);
}
function Nr(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null) t = null;
  else if (k(t)) n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Nr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(Nn in t)
        ? (t._ctx = fe)
        : s === 3 &&
          fe &&
          (fe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    K(t)
      ? ((t = { default: t, _ctx: fe }), (n = 32))
      : ((t = String(t)), r & 64 ? ((n = 16), (t = [$o(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function sc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const s in r)
      if (s === "class")
        t.class !== r.class && (t.class = _r([t.class, r.class]));
      else if (s === "style") t.style = mr([t.style, r.style]);
      else if (Vt(s)) {
        const o = t[s],
          i = r[s];
        i &&
          o !== i &&
          !(k(o) && o.includes(i)) &&
          (t[s] = o ? [].concat(o, i) : i);
      } else s !== "" && (t[s] = r[s]);
  }
  return t;
}
function Ce(e, t, n, r = null) {
  xe(e, t, 7, [n, r]);
}
const oc = Eo();
let ic = 0;
function lc(e, t, n) {
  const r = e.type,
    s = (t ? t.appContext : e.appContext) || oc,
    o = {
      uid: ic++,
      vnode: e,
      type: r,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new vi(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: To(r, s),
      emitsOptions: uo(r, s),
      emit: null,
      emitted: null,
      propsDefaults: te,
      inheritAttrs: r.inheritAttrs,
      ctx: te,
      data: te,
      props: te,
      attrs: te,
      slots: te,
      refs: te,
      setupState: te,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = dl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let le = null;
const $n = () => le || fe;
let $r,
  dt,
  ds = "__VUE_INSTANCE_SETTERS__";
(dt = Xn()[ds]) || (dt = Xn()[ds] = []),
  dt.push((e) => (le = e)),
  ($r = (e) => {
    dt.length > 1 ? dt.forEach((t) => t(e)) : dt[0](e);
  });
const Ct = (e) => {
    $r(e), e.scope.on();
  },
  lt = () => {
    le && le.scope.off(), $r(null);
  };
function Ho(e) {
  return e.vnode.shapeFlag & 4;
}
let Et = !1;
function cc(e, t = !1) {
  Et = t;
  const { props: n, children: r } = e.vnode,
    s = Ho(e);
  Kl(e, n, s, t), ql(e, r);
  const o = s ? ac(e, t) : void 0;
  return (Et = !1), o;
}
function ac(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = Ft(new Proxy(e.ctx, Il)));
  const { setup: r } = n;
  if (r) {
    const s = (e.setupContext = r.length > 1 ? Do(e) : null);
    Ct(e), xt();
    const o = ze(r, e, 0, [e.props, s]);
    if ((Tt(), lt(), ks(o))) {
      if ((o.then(lt, lt), t))
        return o
          .then((i) => {
            hs(e, i, t);
          })
          .catch((i) => {
            qt(i, e, 0);
          });
      e.asyncDep = o;
    } else hs(e, o, t);
  } else jo(e, t);
}
function hs(e, t, n) {
  K(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ee(t) && (e.setupState = io(t)),
    jo(e, n);
}
let ps;
function jo(e, t, n) {
  const r = e.type;
  if (!e.render) {
    if (!t && ps && !r.render) {
      const s = r.template || Fr(e).template;
      if (s) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
          { delimiters: l, compilerOptions: c } = r,
          a = ie(ie({ isCustomElement: o, delimiters: l }, i), c);
        r.render = ps(s, a);
      }
    }
    e.render = r.render || Pe;
  }
  Ct(e), xt(), Nl(e), Tt(), lt();
}
function uc(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return me(e, "get", "$attrs"), t[n];
      },
    }))
  );
}
function Do(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return uc(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function Hn(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(io(Ft(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in It) return It[n](e);
        },
        has(t, n) {
          return n in t || n in It;
        },
      }))
    );
}
function fc(e, t = !0) {
  return K(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function dc(e) {
  return K(e) && "__vccOpts" in e;
}
const ue = (e, t) => il(e, t, Et);
function cr(e, t, n) {
  const r = arguments.length;
  return r === 2
    ? ee(t) && !k(t)
      ? wn(t)
        ? se(e, null, [t])
        : se(e, t)
      : se(e, null, t)
    : (r > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : r === 3 && wn(n) && (n = [n]),
      se(e, t, n));
}
const hc = Symbol.for("v-scx"),
  pc = () => bt(hc),
  gc = "3.3.4",
  mc = "http://www.w3.org/2000/svg",
  st = typeof document < "u" ? document : null,
  gs = st && st.createElement("template"),
  _c = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, r) => {
      const s = t
        ? st.createElementNS(mc, e)
        : st.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          r &&
          r.multiple != null &&
          s.setAttribute("multiple", r.multiple),
        s
      );
    },
    createText: (e) => st.createTextNode(e),
    createComment: (e) => st.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => st.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, r, s, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (s && (s === o || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === o || !(s = s.nextSibling));

        );
      else {
        gs.innerHTML = r ? `<svg>${e}</svg>` : e;
        const l = gs.content;
        if (r) {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function yc(e, t, n) {
  const r = e._vtc;
  r && (t = (t ? [t, ...r] : [...r]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function bc(e, t, n) {
  const r = e.style,
    s = re(n);
  if (n && !s) {
    if (t && !re(t)) for (const o in t) n[o] == null && ar(r, o, "");
    for (const o in n) ar(r, o, n[o]);
  } else {
    const o = r.display;
    s ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (r.display = o);
  }
}
const ms = /\s*!important$/;
function ar(e, t, n) {
  if (k(n)) n.forEach((r) => ar(e, t, r));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const r = vc(e, t);
    ms.test(n)
      ? e.setProperty(at(r), n.replace(ms, ""), "important")
      : (e[r] = n);
  }
}
const _s = ["Webkit", "Moz", "ms"],
  Wn = {};
function vc(e, t) {
  const n = Wn[t];
  if (n) return n;
  let r = Ne(t);
  if (r !== "filter" && r in e) return (Wn[t] = r);
  r = xn(r);
  for (let s = 0; s < _s.length; s++) {
    const o = _s[s] + r;
    if (o in e) return (Wn[t] = o);
  }
  return t;
}
const ys = "http://www.w3.org/1999/xlink";
function wc(e, t, n, r, s) {
  if (r && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(ys, t.slice(6, t.length))
      : e.setAttributeNS(ys, t, n);
  else {
    const o = bi(t);
    n == null || (o && !Ws(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : n);
  }
}
function Cc(e, t, n, r, s, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    r && i(r, s, o), (e[t] = n ?? "");
    return;
  }
  const l = e.tagName;
  if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
    e._value = n;
    const a = l === "OPTION" ? e.getAttribute("value") : e.value,
      f = n ?? "";
    a !== f && (e.value = f), n == null && e.removeAttribute(t);
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const a = typeof e[t];
    a === "boolean"
      ? (n = Ws(n))
      : n == null && a === "string"
      ? ((n = ""), (c = !0))
      : a === "number" && ((n = 0), (c = !0));
  }
  try {
    e[t] = n;
  } catch {}
  c && e.removeAttribute(t);
}
function ht(e, t, n, r) {
  e.addEventListener(t, n, r);
}
function Ec(e, t, n, r) {
  e.removeEventListener(t, n, r);
}
function xc(e, t, n, r, s = null) {
  const o = e._vei || (e._vei = {}),
    i = o[t];
  if (r && i) i.value = r;
  else {
    const [l, c] = Tc(t);
    if (r) {
      const a = (o[t] = Oc(r, s));
      ht(e, l, a, c);
    } else i && (Ec(e, l, i, c), (o[t] = void 0));
  }
}
const bs = /(?:Once|Passive|Capture)$/;
function Tc(e) {
  let t;
  if (bs.test(e)) {
    t = {};
    let r;
    for (; (r = e.match(bs)); )
      (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : at(e.slice(2)), t];
}
let Vn = 0;
const Ac = Promise.resolve(),
  Sc = () => Vn || (Ac.then(() => (Vn = 0)), (Vn = Date.now()));
function Oc(e, t) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    xe(Pc(r, n.value), t, 5, [r]);
  };
  return (n.value = e), (n.attached = Sc()), n;
}
function Pc(e, t) {
  if (k(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((r) => (s) => !s._stopped && r && r(s))
    );
  } else return t;
}
const vs = /^on[a-z]/,
  Rc = (e, t, n, r, s = !1, o, i, l, c) => {
    t === "class"
      ? yc(e, r, s)
      : t === "style"
      ? bc(e, n, r)
      : Vt(t)
      ? dr(t) || xc(e, t, n, r, i)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Mc(e, t, r, s)
        )
      ? Cc(e, t, r, o, i, l, c)
      : (t === "true-value"
          ? (e._trueValue = r)
          : t === "false-value" && (e._falseValue = r),
        wc(e, t, r, s));
  };
function Mc(e, t, n, r) {
  return r
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && vs.test(t) && K(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (vs.test(t) && re(n))
    ? !1
    : t in e;
}
const Ke = "transition",
  Ot = "animation",
  Bo = (e, { slots: t }) => cr(Cl, Fc(e), t);
Bo.displayName = "Transition";
const ko = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Bo.props = ie({}, po, ko);
const et = (e, t = []) => {
    k(e) ? e.forEach((n) => n(...t)) : e && e(...t);
  },
  ws = (e) => (e ? (k(e) ? e.some((t) => t.length > 1) : e.length > 1) : !1);
function Fc(e) {
  const t = {};
  for (const M in e) M in ko || (t[M] = e[M]);
  if (e.css === !1) return t;
  const {
      name: n = "v",
      type: r,
      duration: s,
      enterFromClass: o = `${n}-enter-from`,
      enterActiveClass: i = `${n}-enter-active`,
      enterToClass: l = `${n}-enter-to`,
      appearFromClass: c = o,
      appearActiveClass: a = i,
      appearToClass: f = l,
      leaveFromClass: h = `${n}-leave-from`,
      leaveActiveClass: g = `${n}-leave-active`,
      leaveToClass: w = `${n}-leave-to`,
    } = e,
    E = Ic(s),
    S = E && E[0],
    $ = E && E[1],
    {
      onBeforeEnter: m,
      onEnter: y,
      onEnterCancelled: N,
      onLeave: A,
      onLeaveCancelled: B,
      onBeforeAppear: W = m,
      onAppear: D = y,
      onAppearCancelled: _ = N,
    } = t,
    R = (M, q, L) => {
      tt(M, q ? f : l), tt(M, q ? a : i), L && L();
    },
    I = (M, q) => {
      (M._isLeaving = !1), tt(M, h), tt(M, w), tt(M, g), q && q();
    },
    V = (M) => (q, L) => {
      const _e = M ? D : y,
        X = () => R(q, M, L);
      et(_e, [q, X]),
        Cs(() => {
          tt(q, M ? c : o), We(q, M ? f : l), ws(_e) || Es(q, r, S, X);
        });
    };
  return ie(t, {
    onBeforeEnter(M) {
      et(m, [M]), We(M, o), We(M, i);
    },
    onBeforeAppear(M) {
      et(W, [M]), We(M, c), We(M, a);
    },
    onEnter: V(!1),
    onAppear: V(!0),
    onLeave(M, q) {
      M._isLeaving = !0;
      const L = () => I(M, q);
      We(M, h),
        $c(),
        We(M, g),
        Cs(() => {
          M._isLeaving && (tt(M, h), We(M, w), ws(A) || Es(M, r, $, L));
        }),
        et(A, [M, L]);
    },
    onEnterCancelled(M) {
      R(M, !1), et(N, [M]);
    },
    onAppearCancelled(M) {
      R(M, !0), et(_, [M]);
    },
    onLeaveCancelled(M) {
      I(M), et(B, [M]);
    },
  });
}
function Ic(e) {
  if (e == null) return null;
  if (ee(e)) return [qn(e.enter), qn(e.leave)];
  {
    const t = qn(e);
    return [t, t];
  }
}
function qn(e) {
  return hi(e);
}
function We(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)),
    (e._vtc || (e._vtc = new Set())).add(t);
}
function tt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function Cs(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let Lc = 0;
function Es(e, t, n, r) {
  const s = (e._endId = ++Lc),
    o = () => {
      s === e._endId && r();
    };
  if (n) return setTimeout(o, n);
  const { type: i, timeout: l, propCount: c } = Nc(e, t);
  if (!i) return r();
  const a = i + "end";
  let f = 0;
  const h = () => {
      e.removeEventListener(a, g), o();
    },
    g = (w) => {
      w.target === e && ++f >= c && h();
    };
  setTimeout(() => {
    f < c && h();
  }, l + 1),
    e.addEventListener(a, g);
}
function Nc(e, t) {
  const n = window.getComputedStyle(e),
    r = (E) => (n[E] || "").split(", "),
    s = r(`${Ke}Delay`),
    o = r(`${Ke}Duration`),
    i = xs(s, o),
    l = r(`${Ot}Delay`),
    c = r(`${Ot}Duration`),
    a = xs(l, c);
  let f = null,
    h = 0,
    g = 0;
  t === Ke
    ? i > 0 && ((f = Ke), (h = i), (g = o.length))
    : t === Ot
    ? a > 0 && ((f = Ot), (h = a), (g = c.length))
    : ((h = Math.max(i, a)),
      (f = h > 0 ? (i > a ? Ke : Ot) : null),
      (g = f ? (f === Ke ? o.length : c.length) : 0));
  const w =
    f === Ke && /\b(transform|all)(,|$)/.test(r(`${Ke}Property`).toString());
  return { type: f, timeout: h, propCount: g, hasTransform: w };
}
function xs(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, r) => Ts(n) + Ts(e[r])));
}
function Ts(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function $c() {
  return document.body.offsetHeight;
}
const As = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return k(t) ? (n) => un(t, n) : t;
};
function Hc(e) {
  e.target.composing = !0;
}
function Ss(e) {
  const t = e.target;
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Xa = {
    created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
      e._assign = As(s);
      const o = r || (s.props && s.props.type === "number");
      ht(e, t ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let l = e.value;
        n && (l = l.trim()), o && (l = Jn(l)), e._assign(l);
      }),
        n &&
          ht(e, "change", () => {
            e.value = e.value.trim();
          }),
        t ||
          (ht(e, "compositionstart", Hc),
          ht(e, "compositionend", Ss),
          ht(e, "change", Ss));
    },
    mounted(e, { value: t }) {
      e.value = t ?? "";
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: r, number: s } },
      o,
    ) {
      if (
        ((e._assign = As(o)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (r && e.value.trim() === t) ||
              ((s || e.type === "number") && Jn(e.value) === t))))
      )
        return;
      const i = t ?? "";
      e.value !== i && (e.value = i);
    },
  },
  jc = ["ctrl", "shift", "alt", "meta"],
  Dc = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => jc.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  Qa =
    (e, t) =>
    (n, ...r) => {
      for (let s = 0; s < t.length; s++) {
        const o = Dc[t[s]];
        if (o && o(n, t)) return;
      }
      return e(n, ...r);
    },
  Bc = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  Za = (e, t) => (n) => {
    if (!("key" in n)) return;
    const r = at(n.key);
    if (t.some((s) => s === r || Bc[s] === r)) return e(n);
  },
  Uo = ie({ patchProp: Rc }, _c);
let Ht,
  Os = !1;
function kc() {
  return Ht || (Ht = Jl(Uo));
}
function Uc() {
  return (Ht = Os ? Ht : Xl(Uo)), (Os = !0), Ht;
}
const Ga = (...e) => {
    const t = kc().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Ko(r);
        if (!s) return;
        const o = t._component;
        !K(o) && !o.render && !o.template && (o.template = s.innerHTML),
          (s.innerHTML = "");
        const i = n(s, !1, s instanceof SVGElement);
        return (
          s instanceof Element &&
            (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
          i
        );
      }),
      t
    );
  },
  eu = (...e) => {
    const t = Uc().createApp(...e),
      { mount: n } = t;
    return (
      (t.mount = (r) => {
        const s = Ko(r);
        if (s) return n(s, !0, s instanceof SVGElement);
      }),
      t
    );
  };
function Ko(e) {
  return re(e) ? document.querySelector(e) : e;
}
const tu = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, s] of t) n[r] = s;
    return n;
  },
  Kc = window.__VP_SITE_DATA__;
function Hr(e) {
  return qs() ? (Ci(e), !0) : !1;
}
function Le(e) {
  return typeof e == "function" ? e() : oo(e);
}
const Wo = typeof window < "u" && typeof document < "u",
  Wc = Object.prototype.toString,
  Vc = (e) => Wc.call(e) === "[object Object]",
  Kt = () => {},
  Ps = qc();
function qc() {
  var e;
  return (
    Wo &&
    ((e = window == null ? void 0 : window.navigator) == null
      ? void 0
      : e.userAgent) &&
    /iP(ad|hone|od)/.test(window.navigator.userAgent)
  );
}
function zc(e, t) {
  function n(...r) {
    return new Promise((s, o) => {
      Promise.resolve(
        e(() => t.apply(this, r), { fn: t, thisArg: this, args: r }),
      )
        .then(s)
        .catch(o);
    });
  }
  return n;
}
const Vo = (e) => e();
function Yc(e, t = {}) {
  let n,
    r,
    s = Kt;
  const o = (l) => {
    clearTimeout(l), s(), (s = Kt);
  };
  return (l) => {
    const c = Le(e),
      a = Le(t.maxWait);
    return (
      n && o(n),
      c <= 0 || (a !== void 0 && a <= 0)
        ? (r && (o(r), (r = null)), Promise.resolve(l()))
        : new Promise((f, h) => {
            (s = t.rejectOnCancel ? h : f),
              a &&
                !r &&
                (r = setTimeout(() => {
                  n && o(n), (r = null), f(l());
                }, a)),
              (n = setTimeout(() => {
                r && o(r), (r = null), f(l());
              }, c));
          })
    );
  };
}
function Jc(e = Vo) {
  const t = ae(!0);
  function n() {
    t.value = !1;
  }
  function r() {
    t.value = !0;
  }
  const s = (...o) => {
    t.value && e(...o);
  };
  return { isActive: Sn(t), pause: n, resume: r, eventFilter: s };
}
function qo(...e) {
  if (e.length !== 1) return rl(...e);
  const t = e[0];
  return typeof t == "function" ? Sn(el(() => ({ get: t, set: Kt }))) : ae(t);
}
function zo(e, t, n = {}) {
  const { eventFilter: r = Vo, ...s } = n;
  return Ye(e, zc(r, t), s);
}
function Xc(e, t, n = {}) {
  const { eventFilter: r, ...s } = n,
    { eventFilter: o, pause: i, resume: l, isActive: c } = Jc(r);
  return {
    stop: zo(e, t, { ...s, eventFilter: o }),
    pause: i,
    resume: l,
    isActive: c,
  };
}
function Qc(e, t = !0) {
  $n() ? At(e) : t ? e() : On(e);
}
function nu(e, t, n = {}) {
  const { debounce: r = 0, maxWait: s = void 0, ...o } = n;
  return zo(e, t, { ...o, eventFilter: Yc(r, { maxWait: s }) });
}
function ru(e, t, n) {
  let r;
  ce(n) ? (r = { evaluating: n }) : (r = n || {});
  const {
      lazy: s = !1,
      evaluating: o = void 0,
      shallow: i = !0,
      onError: l = Kt,
    } = r,
    c = ae(!s),
    a = i ? Sr(t) : ae(t);
  let f = 0;
  return (
    Pr(async (h) => {
      if (!c.value) return;
      f++;
      const g = f;
      let w = !1;
      o &&
        Promise.resolve().then(() => {
          o.value = !0;
        });
      try {
        const E = await e((S) => {
          h(() => {
            o && (o.value = !1), w || S();
          });
        });
        g === f && (a.value = E);
      } catch (E) {
        l(E);
      } finally {
        o && g === f && (o.value = !1), (w = !0);
      }
    }),
    s ? ue(() => ((c.value = !0), a.value)) : a
  );
}
function Yo(e) {
  var t;
  const n = Le(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const De = Wo ? window : void 0;
function Wt(...e) {
  let t, n, r, s;
  if (
    (typeof e[0] == "string" || Array.isArray(e[0])
      ? (([n, r, s] = e), (t = De))
      : ([t, n, r, s] = e),
    !t)
  )
    return Kt;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const o = [],
    i = () => {
      o.forEach((f) => f()), (o.length = 0);
    },
    l = (f, h, g, w) => (
      f.addEventListener(h, g, w), () => f.removeEventListener(h, g, w)
    ),
    c = Ye(
      () => [Yo(t), Le(s)],
      ([f, h]) => {
        if ((i(), !f)) return;
        const g = Vc(h) ? { ...h } : h;
        o.push(...n.flatMap((w) => r.map((E) => l(f, w, E, g))));
      },
      { immediate: !0, flush: "post" },
    ),
    a = () => {
      c(), i();
    };
  return Hr(a), a;
}
function Zc(e) {
  return typeof e == "function"
    ? e
    : typeof e == "string"
    ? (t) => t.key === e
    : Array.isArray(e)
    ? (t) => e.includes(t.key)
    : () => !0;
}
function su(...e) {
  let t,
    n,
    r = {};
  e.length === 3
    ? ((t = e[0]), (n = e[1]), (r = e[2]))
    : e.length === 2
    ? typeof e[1] == "object"
      ? ((t = !0), (n = e[0]), (r = e[1]))
      : ((t = e[0]), (n = e[1]))
    : ((t = !0), (n = e[0]));
  const {
      target: s = De,
      eventName: o = "keydown",
      passive: i = !1,
      dedupe: l = !1,
    } = r,
    c = Zc(t);
  return Wt(
    s,
    o,
    (f) => {
      (f.repeat && Le(l)) || (c(f) && n(f));
    },
    i,
  );
}
function Gc() {
  const e = ae(!1);
  return (
    $n() &&
      At(() => {
        e.value = !0;
      }),
    e
  );
}
function ea(e) {
  const t = Gc();
  return ue(() => (t.value, !!e()));
}
function ta(e, t = {}) {
  const { window: n = De } = t,
    r = ea(() => n && "matchMedia" in n && typeof n.matchMedia == "function");
  let s;
  const o = ae(!1),
    i = (a) => {
      o.value = a.matches;
    },
    l = () => {
      s &&
        ("removeEventListener" in s
          ? s.removeEventListener("change", i)
          : s.removeListener(i));
    },
    c = Pr(() => {
      r.value &&
        (l(),
        (s = n.matchMedia(Le(e))),
        "addEventListener" in s
          ? s.addEventListener("change", i)
          : s.addListener(i),
        (o.value = s.matches));
    });
  return (
    Hr(() => {
      c(), l(), (s = void 0);
    }),
    o
  );
}
const on =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {},
  ln = "__vueuse_ssr_handlers__",
  na = ra();
function ra() {
  return ln in on || (on[ln] = on[ln] || {}), on[ln];
}
function Jo(e, t) {
  return na[e] || t;
}
function sa(e) {
  return e == null
    ? "any"
    : e instanceof Set
    ? "set"
    : e instanceof Map
    ? "map"
    : e instanceof Date
    ? "date"
    : typeof e == "boolean"
    ? "boolean"
    : typeof e == "string"
    ? "string"
    : typeof e == "object"
    ? "object"
    : Number.isNaN(e)
    ? "any"
    : "number";
}
const oa = {
    boolean: { read: (e) => e === "true", write: (e) => String(e) },
    object: { read: (e) => JSON.parse(e), write: (e) => JSON.stringify(e) },
    number: { read: (e) => Number.parseFloat(e), write: (e) => String(e) },
    any: { read: (e) => e, write: (e) => String(e) },
    string: { read: (e) => e, write: (e) => String(e) },
    map: {
      read: (e) => new Map(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e.entries())),
    },
    set: {
      read: (e) => new Set(JSON.parse(e)),
      write: (e) => JSON.stringify(Array.from(e)),
    },
    date: { read: (e) => new Date(e), write: (e) => e.toISOString() },
  },
  Rs = "vueuse-storage";
function jr(e, t, n, r = {}) {
  var s;
  const {
      flush: o = "pre",
      deep: i = !0,
      listenToStorageChanges: l = !0,
      writeDefaults: c = !0,
      mergeDefaults: a = !1,
      shallow: f,
      window: h = De,
      eventFilter: g,
      onError: w = (_) => {
        console.error(_);
      },
    } = r,
    E = (f ? Sr : ae)(t);
  if (!n)
    try {
      n = Jo("getDefaultStorage", () => {
        var _;
        return (_ = De) == null ? void 0 : _.localStorage;
      })();
    } catch (_) {
      w(_);
    }
  if (!n) return E;
  const S = Le(t),
    $ = sa(S),
    m = (s = r.serializer) != null ? s : oa[$],
    { pause: y, resume: N } = Xc(E, () => A(E.value), {
      flush: o,
      deep: i,
      eventFilter: g,
    });
  return h && l && (Wt(h, "storage", D), Wt(h, Rs, W)), D(), E;
  function A(_) {
    try {
      if (_ == null) n.removeItem(e);
      else {
        const R = m.write(_),
          I = n.getItem(e);
        I !== R &&
          (n.setItem(e, R),
          h &&
            h.dispatchEvent(
              new CustomEvent(Rs, {
                detail: { key: e, oldValue: I, newValue: R, storageArea: n },
              }),
            ));
      }
    } catch (R) {
      w(R);
    }
  }
  function B(_) {
    const R = _ ? _.newValue : n.getItem(e);
    if (R == null) return c && S !== null && n.setItem(e, m.write(S)), S;
    if (!_ && a) {
      const I = m.read(R);
      return typeof a == "function"
        ? a(I, S)
        : $ === "object" && !Array.isArray(I)
        ? { ...S, ...I }
        : I;
    } else return typeof R != "string" ? R : m.read(R);
  }
  function W(_) {
    D(_.detail);
  }
  function D(_) {
    if (!(_ && _.storageArea !== n)) {
      if (_ && _.key == null) {
        E.value = S;
        return;
      }
      if (!(_ && _.key !== e)) {
        y();
        try {
          (_ == null ? void 0 : _.newValue) !== m.write(E.value) &&
            (E.value = B(_));
        } catch (R) {
          w(R);
        } finally {
          _ ? On(N) : N();
        }
      }
    }
  }
}
function ia(e) {
  return ta("(prefers-color-scheme: dark)", e);
}
function la(e = {}) {
  const {
      selector: t = "html",
      attribute: n = "class",
      initialValue: r = "auto",
      window: s = De,
      storage: o,
      storageKey: i = "vueuse-color-scheme",
      listenToStorageChanges: l = !0,
      storageRef: c,
      emitAuto: a,
      disableTransition: f = !0,
    } = e,
    h = { auto: "", light: "light", dark: "dark", ...(e.modes || {}) },
    g = ia({ window: s }),
    w = ue(() => (g.value ? "dark" : "light")),
    E =
      c ||
      (i == null
        ? qo(r)
        : jr(i, r, o, { window: s, listenToStorageChanges: l })),
    S = ue(() => (E.value === "auto" ? w.value : E.value)),
    $ = Jo("updateHTMLAttrs", (A, B, W) => {
      const D =
        typeof A == "string"
          ? s == null
            ? void 0
            : s.document.querySelector(A)
          : Yo(A);
      if (!D) return;
      let _;
      if (f) {
        _ = s.document.createElement("style");
        const R =
          "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
        _.appendChild(document.createTextNode(R)),
          s.document.head.appendChild(_);
      }
      if (B === "class") {
        const R = W.split(/\s/g);
        Object.values(h)
          .flatMap((I) => (I || "").split(/\s/g))
          .filter(Boolean)
          .forEach((I) => {
            R.includes(I) ? D.classList.add(I) : D.classList.remove(I);
          });
      } else D.setAttribute(B, W);
      f && (s.getComputedStyle(_).opacity, document.head.removeChild(_));
    });
  function m(A) {
    var B;
    $(t, n, (B = h[A]) != null ? B : A);
  }
  function y(A) {
    e.onChanged ? e.onChanged(A, m) : m(A);
  }
  Ye(S, y, { flush: "post", immediate: !0 }), Qc(() => y(S.value));
  const N = ue({
    get() {
      return a ? E.value : S.value;
    },
    set(A) {
      E.value = A;
    },
  });
  try {
    return Object.assign(N, { store: E, system: w, state: S });
  } catch {
    return N;
  }
}
function ca(e = {}) {
  const { valueDark: t = "dark", valueLight: n = "" } = e,
    r = la({
      ...e,
      onChanged: (o, i) => {
        var l;
        e.onChanged
          ? (l = e.onChanged) == null || l.call(e, o === "dark", i, o)
          : i(o);
      },
      modes: { dark: t, light: n },
    });
  return ue({
    get() {
      return r.value === "dark";
    },
    set(o) {
      const i = o ? "dark" : "light";
      r.system.value === i ? (r.value = "auto") : (r.value = i);
    },
  });
}
function zn(e) {
  return typeof Window < "u" && e instanceof Window
    ? e.document.documentElement
    : typeof Document < "u" && e instanceof Document
    ? e.documentElement
    : e;
}
function ou(e, t, n = {}) {
  const { window: r = De } = n;
  return jr(e, t, r == null ? void 0 : r.localStorage, n);
}
function Xo(e) {
  const t = window.getComputedStyle(e);
  if (
    t.overflowX === "scroll" ||
    t.overflowY === "scroll" ||
    (t.overflowX === "auto" && e.clientWidth < e.scrollWidth) ||
    (t.overflowY === "auto" && e.clientHeight < e.scrollHeight)
  )
    return !0;
  {
    const n = e.parentNode;
    return !n || n.tagName === "BODY" ? !1 : Xo(n);
  }
}
function aa(e) {
  const t = e || window.event,
    n = t.target;
  return Xo(n)
    ? !1
    : t.touches.length > 1
    ? !0
    : (t.preventDefault && t.preventDefault(), !1);
}
function iu(e, t = !1) {
  const n = ae(t);
  let r = null,
    s;
  Ye(
    qo(e),
    (l) => {
      const c = zn(Le(l));
      if (c) {
        const a = c;
        (s = a.style.overflow), n.value && (a.style.overflow = "hidden");
      }
    },
    { immediate: !0 },
  );
  const o = () => {
      const l = zn(Le(e));
      !l ||
        n.value ||
        (Ps &&
          (r = Wt(
            l,
            "touchmove",
            (c) => {
              aa(c);
            },
            { passive: !1 },
          )),
        (l.style.overflow = "hidden"),
        (n.value = !0));
    },
    i = () => {
      const l = zn(Le(e));
      !l ||
        !n.value ||
        (Ps && (r == null || r()), (l.style.overflow = s), (n.value = !1));
    };
  return (
    Hr(i),
    ue({
      get() {
        return n.value;
      },
      set(l) {
        l ? o() : i();
      },
    })
  );
}
function lu(e, t, n = {}) {
  const { window: r = De } = n;
  return jr(e, t, r == null ? void 0 : r.sessionStorage, n);
}
function cu({ window: e = De } = {}) {
  if (!e) return { x: ae(0), y: ae(0) };
  const t = ae(e.scrollX),
    n = ae(e.scrollY);
  return (
    Wt(
      e,
      "scroll",
      () => {
        (t.value = e.scrollX), (n.value = e.scrollY);
      },
      { capture: !1, passive: !0 },
    ),
    { x: t, y: n }
  );
}
const Qo = /^[a-z]+:/i,
  ua = "vitepress-theme-appearance",
  Zo = /#.*$/,
  fa = /(index)?\.(md|html)$/,
  Ee = typeof document < "u",
  Go = {
    relativePath: "",
    filePath: "",
    title: "404",
    description: "Not Found",
    headers: [],
    frontmatter: { sidebar: !1, layout: "page" },
    lastUpdated: 0,
    isNotFound: !0,
  };
function da(e, t, n = !1) {
  if (t === void 0) return !1;
  if (((e = Ms(`/${e}`)), n)) return new RegExp(t).test(e);
  if (Ms(t) !== e) return !1;
  const r = t.match(Zo);
  return r ? (Ee ? location.hash : "") === r[0] : !0;
}
function Ms(e) {
  return decodeURI(e).replace(Zo, "").replace(fa, "");
}
function ha(e) {
  return Qo.test(e);
}
function pa(e, t) {
  var r, s, o, i, l, c, a;
  const n =
    Object.keys(e.locales).find(
      (f) => f !== "root" && !ha(f) && da(t, `/${f}/`, !0),
    ) || "root";
  return Object.assign({}, e, {
    localeIndex: n,
    lang: ((r = e.locales[n]) == null ? void 0 : r.lang) ?? e.lang,
    dir: ((s = e.locales[n]) == null ? void 0 : s.dir) ?? e.dir,
    title: ((o = e.locales[n]) == null ? void 0 : o.title) ?? e.title,
    titleTemplate:
      ((i = e.locales[n]) == null ? void 0 : i.titleTemplate) ??
      e.titleTemplate,
    description:
      ((l = e.locales[n]) == null ? void 0 : l.description) ?? e.description,
    head: ti(e.head, ((c = e.locales[n]) == null ? void 0 : c.head) ?? []),
    themeConfig: {
      ...e.themeConfig,
      ...((a = e.locales[n]) == null ? void 0 : a.themeConfig),
    },
  });
}
function ei(e, t) {
  const n = t.title || e.title,
    r = t.titleTemplate ?? e.titleTemplate;
  if (typeof r == "string" && r.includes(":title"))
    return r.replace(/:title/g, n);
  const s = ga(e.title, r);
  return `${n}${s}`;
}
function ga(e, t) {
  return t === !1
    ? ""
    : t === !0 || t === void 0
    ? ` | ${e}`
    : e === t
    ? ""
    : ` | ${t}`;
}
function ma(e, t) {
  const [n, r] = t;
  if (n !== "meta") return !1;
  const s = Object.entries(r)[0];
  return s == null ? !1 : e.some(([o, i]) => o === n && i[s[0]] === s[1]);
}
function ti(e, t) {
  return [...e.filter((n) => !ma(t, n)), ...t];
}
const _a = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g,
  ya = /^[a-z]:/i;
function Fs(e) {
  const t = ya.exec(e),
    n = t ? t[0] : "";
  return (
    n +
    e
      .slice(n.length)
      .replace(_a, "_")
      .replace(/(^|\/)_+(?=[^/]*$)/, "$1")
  );
}
const ba = Symbol(),
  ct = Sr(Kc);
function au(e) {
  const t = ue(() => pa(ct.value, e.data.relativePath)),
    n = t.value.appearance,
    r =
      n === "force-dark"
        ? ae(!0)
        : n
        ? ca({
            storageKey: ua,
            initialValue: () => (typeof n == "string" ? n : "auto"),
            ...(typeof n == "object" ? n : {}),
          })
        : ae(!1);
  return {
    site: t,
    theme: ue(() => t.value.themeConfig),
    page: ue(() => e.data),
    frontmatter: ue(() => e.data.frontmatter),
    params: ue(() => e.data.params),
    lang: ue(() => t.value.lang),
    dir: ue(() => t.value.dir),
    localeIndex: ue(() => t.value.localeIndex || "root"),
    title: ue(() => ei(t.value, e.data)),
    description: ue(() => e.data.description || t.value.description),
    isDark: r,
  };
}
function va() {
  const e = bt(ba);
  if (!e) throw new Error("vitepress data not properly injected in app");
  return e;
}
function wa(e, t) {
  return `${e}${t}`.replace(/\/+/g, "/");
}
function Is(e) {
  return Qo.test(e) || !e.startsWith("/") ? e : wa(ct.value.base, e);
}
function Ca(e) {
  let t = e.replace(/\.html$/, "");
  if (((t = decodeURIComponent(t)), (t = t.replace(/\/$/, "/index")), Ee)) {
    const n = "/docs/";
    t = Fs(t.slice(n.length).replace(/\//g, "_") || "index") + ".md";
    let r = __VP_HASH_MAP__[t.toLowerCase()];
    if (
      (r ||
        ((t = t.endsWith("_index.md")
          ? t.slice(0, -9) + ".md"
          : t.slice(0, -3) + "_index.md"),
        (r = __VP_HASH_MAP__[t.toLowerCase()])),
      !r)
    )
      return null;
    t = `${n}assets/${t}.${r}.js`;
  } else t = `./${Fs(t.slice(1).replace(/\//g, "_"))}.md.js`;
  return t;
}
let dn = [];
function uu(e) {
  dn.push(e),
    Ln(() => {
      dn = dn.filter((t) => t !== e);
    });
}
const Ea = Symbol(),
  ni = "http://a.com",
  xa = () => ({ path: "/", component: null, data: Go });
function fu(e, t) {
  const n = An(xa()),
    r = { route: n, go: s };
  async function s(l = Ee ? location.href : "/") {
    var c, a;
    (l = ur(l)),
      (await ((c = r.onBeforeRouteChange) == null ? void 0 : c.call(r, l))) !==
        !1 &&
        ($s(l),
        await i(l),
        await ((a = r.onAfterRouteChanged) == null ? void 0 : a.call(r, l)));
  }
  let o = null;
  async function i(l, c = 0, a = !1) {
    var g;
    if (
      (await ((g = r.onBeforePageLoad) == null ? void 0 : g.call(r, l))) === !1
    )
      return;
    const f = new URL(l, ni),
      h = (o = f.pathname);
    try {
      let w = await e(h);
      if (!w) throw new Error(`Page not found: ${h}`);
      if (o === h) {
        o = null;
        const { default: E, __pageData: S } = w;
        if (!E) throw new Error(`Invalid route component: ${E}`);
        (n.path = Ee ? h : Is(h)),
          (n.component = Ft(E)),
          (n.data = Ft(S)),
          Ee &&
            On(() => {
              let $ =
                ct.value.base +
                S.relativePath.replace(/(?:(^|\/)index)?\.md$/, "$1");
              if (
                (!ct.value.cleanUrls && !$.endsWith("/") && ($ += ".html"),
                $ !== f.pathname &&
                  ((f.pathname = $),
                  (l = $ + f.search + f.hash),
                  history.replaceState(null, "", l)),
                f.hash && !c)
              ) {
                let m = null;
                try {
                  m = document.getElementById(
                    decodeURIComponent(f.hash).slice(1),
                  );
                } catch (y) {
                  console.warn(y);
                }
                if (m) {
                  Ls(m, f.hash);
                  return;
                }
              }
              window.scrollTo(0, c);
            });
      }
    } catch (w) {
      if (
        (!/fetch|Page not found/.test(w.message) &&
          !/^\/404(\.html|\/)?$/.test(l) &&
          console.error(w),
        !a)
      )
        try {
          const E = await fetch(ct.value.base + "hashmap.json");
          (window.__VP_HASH_MAP__ = await E.json()), await i(l, c, !0);
          return;
        } catch {}
      o === h &&
        ((o = null),
        (n.path = Ee ? h : Is(h)),
        (n.component = t ? Ft(t) : null),
        (n.data = Go));
    }
  }
  return (
    Ee &&
      (window.addEventListener(
        "click",
        (l) => {
          if (l.target.closest("button")) return;
          const a = l.target.closest("a");
          if (
            a &&
            !a.closest(".vp-raw") &&
            (a instanceof SVGElement || !a.download)
          ) {
            const { target: f } = a,
              {
                href: h,
                origin: g,
                pathname: w,
                hash: E,
                search: S,
              } = new URL(
                a.href instanceof SVGAnimatedString ? a.href.animVal : a.href,
                a.baseURI,
              ),
              $ = window.location,
              m = w.match(/\.\w+$/);
            !l.ctrlKey &&
              !l.shiftKey &&
              !l.altKey &&
              !l.metaKey &&
              !f &&
              g === $.origin &&
              !(m && m[0] !== ".html") &&
              (l.preventDefault(),
              w === $.pathname && S === $.search
                ? (E !== $.hash &&
                    (history.pushState(null, "", E),
                    window.dispatchEvent(new Event("hashchange"))),
                  E
                    ? Ls(a, E, a.classList.contains("header-anchor"))
                    : ($s(h), window.scrollTo(0, 0)))
                : s(h));
          }
        },
        { capture: !0 },
      ),
      window.addEventListener("popstate", (l) => {
        i(ur(location.href), (l.state && l.state.scrollPosition) || 0);
      }),
      window.addEventListener("hashchange", (l) => {
        l.preventDefault();
      })),
    r
  );
}
function Ta() {
  const e = bt(Ea);
  if (!e) throw new Error("useRouter() is called without provider.");
  return e;
}
function ri() {
  return Ta().route;
}
function Ls(e, t, n = !1) {
  let r = null;
  try {
    r = e.classList.contains("header-anchor")
      ? e
      : document.getElementById(decodeURIComponent(t).slice(1));
  } catch (s) {
    console.warn(s);
  }
  if (r) {
    let a = function () {
        !n || Math.abs(c - window.scrollY) > window.innerHeight
          ? window.scrollTo(0, c)
          : window.scrollTo({ left: 0, top: c, behavior: "smooth" });
      },
      s = ct.value.scrollOffset,
      o = 0,
      i = 24;
    if (
      (typeof s == "object" &&
        "padding" in s &&
        ((i = s.padding), (s = s.selector)),
      typeof s == "number")
    )
      o = s;
    else if (typeof s == "string") o = Ns(s, i);
    else if (Array.isArray(s))
      for (const f of s) {
        const h = Ns(f, i);
        if (h) {
          o = h;
          break;
        }
      }
    const l = parseInt(window.getComputedStyle(r).paddingTop, 10),
      c = window.scrollY + r.getBoundingClientRect().top - o + l;
    requestAnimationFrame(a);
  }
}
function Ns(e, t) {
  const n = document.querySelector(e);
  if (!n) return 0;
  const r = n.getBoundingClientRect().bottom;
  return r < 0 ? 0 : r + t;
}
function $s(e) {
  Ee &&
    e !== ur(location.href) &&
    (history.replaceState({ scrollPosition: window.scrollY }, document.title),
    history.pushState(null, "", e));
}
function ur(e) {
  const t = new URL(e, ni);
  return (
    (t.pathname = t.pathname.replace(/(^|\/)index(\.html)?$/, "$1")),
    ct.value.cleanUrls
      ? (t.pathname = t.pathname.replace(/\.html$/, ""))
      : !t.pathname.endsWith("/") &&
        !t.pathname.endsWith(".html") &&
        (t.pathname += ".html"),
    t.pathname + t.search + t.hash
  );
}
const Hs = () => dn.forEach((e) => e()),
  du = Rr({
    name: "VitePressContent",
    props: { as: { type: [Object, String], default: "div" } },
    setup(e) {
      const t = ri(),
        { site: n } = va();
      return () =>
        cr(e.as, n.value.contentProps ?? { style: { position: "relative" } }, [
          t.component
            ? cr(t.component, { onVnodeMounted: Hs, onVnodeUpdated: Hs })
            : "404 Page Not Found",
        ]);
    },
  }),
  Aa = "modulepreload",
  Sa = function (e) {
    return "/docs/" + e;
  },
  js = {},
  hu = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      n.map((o) => {
        if (((o = Sa(o)), o in js)) return;
        js[o] = !0;
        const i = o.endsWith(".css"),
          l = i ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let f = s.length - 1; f >= 0; f--) {
            const h = s[f];
            if (h.href === o && (!i || h.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${o}"]${l}`)) return;
        const a = document.createElement("link");
        if (
          ((a.rel = i ? "stylesheet" : Aa),
          i || ((a.as = "script"), (a.crossOrigin = "")),
          (a.href = o),
          document.head.appendChild(a),
          i)
        )
          return new Promise((f, h) => {
            a.addEventListener("load", f),
              a.addEventListener("error", () =>
                h(new Error(`Unable to preload CSS for ${o}`)),
              );
          });
      }),
    )
      .then(() => t())
      .catch((o) => {
        const i = new Event("vite:preloadError", { cancelable: !0 });
        if (((i.payload = o), window.dispatchEvent(i), !i.defaultPrevented))
          throw o;
      });
  },
  pu = Rr({
    setup(e, { slots: t }) {
      const n = ae(!1);
      return (
        At(() => {
          n.value = !0;
        }),
        () => (n.value && t.default ? t.default() : null)
      );
    },
  });
function gu() {
  Ee &&
    window.addEventListener("click", (e) => {
      var n;
      const t = e.target;
      if (t.matches(".vp-code-group input")) {
        const r = (n = t.parentElement) == null ? void 0 : n.parentElement;
        if (!r) return;
        const s = Array.from(r.querySelectorAll("input")).indexOf(t);
        if (s < 0) return;
        const o = r.querySelector(".blocks");
        if (!o) return;
        const i = Array.from(o.children).find((a) =>
          a.classList.contains("active"),
        );
        if (!i) return;
        const l = o.children[s];
        if (!l || i === l) return;
        i.classList.remove("active"), l.classList.add("active");
        const c = r == null ? void 0 : r.querySelector(`label[for="${t.id}"]`);
        c == null || c.scrollIntoView({ block: "nearest" });
      }
    });
}
function mu() {
  if (Ee) {
    const e = new WeakMap();
    window.addEventListener("click", (t) => {
      var r;
      const n = t.target;
      if (n.matches('div[class*="language-"] > button.copy')) {
        const s = n.parentElement,
          o =
            (r = n.nextElementSibling) == null ? void 0 : r.nextElementSibling;
        if (!s || !o) return;
        const i = /language-(shellscript|shell|bash|sh|zsh)/.test(s.className);
        let l = "";
        o.querySelectorAll("span.line:not(.diff.remove)").forEach(
          (c) =>
            (l +=
              (c.textContent || "") +
              `
`),
        ),
          (l = l.slice(0, -1)),
          i && (l = l.replace(/^ *(\$|>) /gm, "").trim()),
          Oa(l).then(() => {
            n.classList.add("copied"), clearTimeout(e.get(n));
            const c = setTimeout(() => {
              n.classList.remove("copied"), n.blur(), e.delete(n);
            }, 2e3);
            e.set(n, c);
          });
      }
    });
  }
}
async function Oa(e) {
  try {
    return navigator.clipboard.writeText(e);
  } catch {
    const t = document.createElement("textarea"),
      n = document.activeElement;
    (t.value = e),
      t.setAttribute("readonly", ""),
      (t.style.contain = "strict"),
      (t.style.position = "absolute"),
      (t.style.left = "-9999px"),
      (t.style.fontSize = "12pt");
    const r = document.getSelection(),
      s = r ? r.rangeCount > 0 && r.getRangeAt(0) : null;
    document.body.appendChild(t),
      t.select(),
      (t.selectionStart = 0),
      (t.selectionEnd = e.length),
      document.execCommand("copy"),
      document.body.removeChild(t),
      s && (r.removeAllRanges(), r.addRange(s)),
      n && n.focus();
  }
}
function _u(e, t) {
  let n = [],
    r = !0;
  const s = (o) => {
    if (r) {
      r = !1;
      return;
    }
    n.forEach((i) => document.head.removeChild(i)),
      (n = []),
      o.forEach((i) => {
        const l = Ds(i);
        document.head.appendChild(l), n.push(l);
      });
  };
  Pr(() => {
    const o = e.data,
      i = t.value,
      l = o && o.description,
      c = (o && o.frontmatter.head) || [];
    document.title = ei(i, o);
    const a = l || i.description;
    let f = document.querySelector("meta[name=description]");
    f
      ? f.setAttribute("content", a)
      : Ds(["meta", { name: "description", content: a }]),
      s(ti(i.head, Ra(c)));
  });
}
function Ds([e, t, n]) {
  const r = document.createElement(e);
  for (const s in t) r.setAttribute(s, t[s]);
  return (
    n && (r.innerHTML = n), e === "script" && !t.async && (r.async = !1), r
  );
}
function Pa(e) {
  return e[0] === "meta" && e[1] && e[1].name === "description";
}
function Ra(e) {
  return e.filter((t) => !Pa(t));
}
const Yn = new Set(),
  si = () => document.createElement("link"),
  Ma = (e) => {
    const t = si();
    (t.rel = "prefetch"), (t.href = e), document.head.appendChild(t);
  },
  Fa = (e) => {
    const t = new XMLHttpRequest();
    t.open("GET", e, (t.withCredentials = !0)), t.send();
  };
let cn;
const Ia =
  Ee &&
  (cn = si()) &&
  cn.relList &&
  cn.relList.supports &&
  cn.relList.supports("prefetch")
    ? Ma
    : Fa;
function yu() {
  if (!Ee || !window.IntersectionObserver) return;
  let e;
  if ((e = navigator.connection) && (e.saveData || /2g/.test(e.effectiveType)))
    return;
  const t = window.requestIdleCallback || setTimeout;
  let n = null;
  const r = () => {
    n && n.disconnect(),
      (n = new IntersectionObserver((o) => {
        o.forEach((i) => {
          if (i.isIntersecting) {
            const l = i.target;
            n.unobserve(l);
            const { pathname: c } = l;
            if (!Yn.has(c)) {
              Yn.add(c);
              const a = Ca(c);
              a && Ia(a);
            }
          }
        });
      })),
      t(() => {
        document.querySelectorAll("#app a").forEach((o) => {
          const { hostname: i, pathname: l } = new URL(
              o.href instanceof SVGAnimatedString ? o.href.animVal : o.href,
              o.baseURI,
            ),
            c = l.match(/\.\w+$/);
          (c && c[0] !== ".html") ||
            (o.target !== "_blank" &&
              i === location.hostname &&
              (l !== location.pathname ? n.observe(o) : Yn.add(l)));
        });
      });
  };
  At(r);
  const s = ri();
  Ye(() => s.path, r),
    Ln(() => {
      n && n.disconnect();
    });
}
export {
  Qa as $,
  Ha as A,
  Ol as B,
  Ba as C,
  Ua as D,
  Sr as E,
  ge as F,
  uu as G,
  se as H,
  ka as I,
  Qo as J,
  ri as K,
  sc as L,
  bt as M,
  mr as N,
  On as O,
  cu as P,
  Ya as Q,
  Sn as R,
  su as S,
  Bo as T,
  Da as U,
  hu as V,
  iu as W,
  Ul as X,
  Za as Y,
  Wa as Z,
  tu as _,
  $o as a,
  Va as a0,
  cr as a1,
  _u as a2,
  Ea as a3,
  au as a4,
  ba as a5,
  du as a6,
  pu as a7,
  ct as a8,
  eu as a9,
  fu as aa,
  Ca as ab,
  yu as ac,
  mu as ad,
  gu as ae,
  Yo as af,
  Hr as ag,
  ru as ah,
  lu as ai,
  ou as aj,
  nu as ak,
  Ta as al,
  Wt as am,
  yo as an,
  ja as ao,
  Xa as ap,
  ce as aq,
  qa as ar,
  Ft as as,
  Ga as at,
  Io as b,
  za as c,
  Rr as d,
  Ja as e,
  Is as f,
  ue as g,
  ae as h,
  ha as i,
  At as j,
  No as k,
  oo as l,
  $a as m,
  _r as n,
  Mo as o,
  Na as p,
  da as q,
  Ka as r,
  Ee as s,
  La as t,
  va as u,
  ta as v,
  hl as w,
  Ye as x,
  Pr as y,
  Ln as z,
};
