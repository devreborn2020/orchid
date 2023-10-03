import {
  a1 as i,
  s,
  a2 as c,
  a3 as l,
  a4 as d,
  a5 as f,
  a6 as m,
  a7 as h,
  a8 as A,
  a9 as y,
  aa as g,
  ab as P,
  V as v,
  d as w,
  u as C,
  j as R,
  y as _,
  ac as b,
  ad as D,
  ae as E,
} from "./chunks/framework.7f6db421.js";
import { t as p } from "./chunks/theme.bf1e8c0a.js";
const L = {
  extends: p,
  Layout: () => i(p.Layout, null, {}),
  enhanceApp({ app: e, router: a, siteData: t }) {},
};
function u(e) {
  if (e.extends) {
    const a = u(e.extends);
    return {
      ...a,
      ...e,
      async enhanceApp(t) {
        a.enhanceApp && (await a.enhanceApp(t)),
          e.enhanceApp && (await e.enhanceApp(t));
      },
    };
  }
  return e;
}
const o = u(L),
  T = w({
    name: "VitePressApp",
    setup() {
      const { site: e } = C();
      return (
        R(() => {
          _(() => {
            (document.documentElement.lang = e.value.lang),
              (document.documentElement.dir = e.value.dir);
          });
        }),
        b(),
        D(),
        E(),
        o.setup && o.setup(),
        () => i(o.Layout)
      );
    },
  });
async function j() {
  const e = O(),
    a = x();
  a.provide(l, e);
  const t = d(e.route);
  return (
    a.provide(f, t),
    a.component("Content", m),
    a.component("ClientOnly", h),
    Object.defineProperties(a.config.globalProperties, {
      $frontmatter: {
        get() {
          return t.frontmatter.value;
        },
      },
      $params: {
        get() {
          return t.page.value.params;
        },
      },
    }),
    o.enhanceApp && (await o.enhanceApp({ app: a, router: e, siteData: A })),
    { app: a, router: e, data: t }
  );
}
function x() {
  return y(T);
}
function O() {
  let e = s,
    a;
  return g((t) => {
    let n = P(t),
      r = null;
    return (
      n &&
        (e && (a = n),
        (e || a === n) && (n = n.replace(/\.js$/, ".lean.js")),
        (r = v(() => import(n), []))),
      s && (e = !1),
      r
    );
  }, o.NotFound);
}
s &&
  j().then(({ app: e, router: a, data: t }) => {
    a.go().then(() => {
      c(a.route, t.site), e.mount("#app");
    });
  });
export { j as createApp };
