var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const app = "";
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
  if (!src_url_equal_anchor) {
    src_url_equal_anchor = document.createElement("a");
  }
  src_url_equal_anchor.href = url;
  return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function append(target, node) {
  target.appendChild(node);
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i])
      iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
  if (value == null)
    node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value)
    node.setAttribute(attribute, value);
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.wholeText !== data)
    text2.data = data;
}
function set_style(node, key, value, important) {
  if (value === null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, important ? "important" : "");
  }
}
function toggle_class(element2, name, toggle) {
  element2.classList[toggle ? "add" : "remove"](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  const e = document.createEvent("CustomEvent");
  e.initCustomEvent(type, bubbles, cancelable, detail);
  return e;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(type, detail, { cancelable });
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  const saved_component = current_component;
  do {
    while (flushidx < dirty_components.length) {
      const component = dirty_components[flushidx];
      flushidx++;
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block))
      return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2)
          block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor, customElement) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  if (!customElement) {
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
  }
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i])
        $$.bound[i](value);
      if (ready)
        make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro)
      transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1)
        callbacks.splice(index, 1);
    };
  }
  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }
}
const MulherNegra = "assets/mulher-negra-b61d7544.png";
const Robo = "assets/robo-dfa03d3f.png";
var NumJogador = /* @__PURE__ */ ((NumJogador2) => {
  NumJogador2[NumJogador2["SemJogador"] = 0] = "SemJogador";
  NumJogador2[NumJogador2["Jogador1"] = 1] = "Jogador1";
  NumJogador2[NumJogador2["Jogador2IA"] = 2] = "Jogador2IA";
  return NumJogador2;
})(NumJogador || {});
var Turno = /* @__PURE__ */ ((Turno2) => {
  Turno2[Turno2["Parado"] = 0] = "Parado";
  Turno2[Turno2["Jogador1"] = 1] = "Jogador1";
  Turno2[Turno2["Jogador2IA"] = 2] = "Jogador2IA";
  return Turno2;
})(Turno || {});
var TipoOcupacao = /* @__PURE__ */ ((TipoOcupacao2) => {
  TipoOcupacao2[TipoOcupacao2["NaoUtilizada"] = -1] = "NaoUtilizada";
  TipoOcupacao2[TipoOcupacao2["Vazio"] = 0] = "Vazio";
  TipoOcupacao2[TipoOcupacao2["Ocupado"] = 1] = "Ocupado";
  return TipoOcupacao2;
})(TipoOcupacao || {});
var RodadaJogo = /* @__PURE__ */ ((RodadaJogo2) => {
  RodadaJogo2[RodadaJogo2["ColocarPecas"] = 0] = "ColocarPecas";
  RodadaJogo2[RodadaJogo2["MoverPecas"] = 1] = "MoverPecas";
  RodadaJogo2[RodadaJogo2["FlutuarPecas"] = 2] = "FlutuarPecas";
  RodadaJogo2[RodadaJogo2["Ganhou"] = 3] = "Ganhou";
  RodadaJogo2[RodadaJogo2["Perdeu"] = 4] = "Perdeu";
  return RodadaJogo2;
})(RodadaJogo || {});
const Placar_svelte_svelte_type_style_lang = "";
function create_else_block(ctx) {
  let t;
  return {
    c() {
      t = text("Iniciar!");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_if_block$1(ctx) {
  let t;
  return {
    c() {
      t = text("Parar!");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$3(ctx) {
  let div8;
  let div3;
  let div0;
  let img0;
  let img0_src_value;
  let t0;
  let div1;
  let p0;
  let t2;
  let p1;
  let t3;
  let t4;
  let t5;
  let div2;
  let t7;
  let button;
  let t8;
  let div7;
  let div4;
  let t10;
  let div5;
  let p2;
  let t12;
  let p3;
  let t13;
  let t14;
  let t15;
  let div6;
  let img1;
  let img1_src_value;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (ctx2[2])
      return create_if_block$1;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div8 = element("div");
      div3 = element("div");
      div0 = element("div");
      img0 = element("img");
      t0 = space();
      div1 = element("div");
      p0 = element("p");
      p0.innerHTML = `<b>Humano P1</b>`;
      t2 = space();
      p1 = element("p");
      t3 = text("Vitórias: ");
      t4 = text(ctx[0]);
      t5 = space();
      div2 = element("div");
      div2.textContent = "Sua vez!";
      t7 = space();
      button = element("button");
      if_block.c();
      t8 = space();
      div7 = element("div");
      div4 = element("div");
      div4.textContent = "Vez oponente!";
      t10 = space();
      div5 = element("div");
      p2 = element("p");
      p2.innerHTML = `<b>IA P2</b>`;
      t12 = space();
      p3 = element("p");
      t13 = text("Vitórias: ");
      t14 = text(ctx[1]);
      t15 = space();
      div6 = element("div");
      img1 = element("img");
      if (!src_url_equal(img0.src, img0_src_value = MulherNegra))
        attr(img0, "src", img0_src_value);
      attr(img0, "alt", "mulher negra representando humanidade");
      attr(img0, "class", "svelte-1hi2mz1");
      attr(div0, "class", "svelte-1hi2mz1");
      attr(p0, "class", "svelte-1hi2mz1");
      attr(p1, "class", "svelte-1hi2mz1");
      attr(div1, "class", "nome-jogador svelte-1hi2mz1");
      attr(div2, "class", "svelte-1hi2mz1");
      toggle_class(div2, "exibir", ctx[3] == Turno.Jogador1);
      attr(div3, "class", "svelte-1hi2mz1");
      attr(button, "class", "svelte-1hi2mz1");
      toggle_class(button, "pararJogo", ctx[2]);
      attr(div4, "class", "svelte-1hi2mz1");
      toggle_class(div4, "exibir", ctx[3] == Turno.Jogador2IA);
      attr(p2, "class", "svelte-1hi2mz1");
      attr(p3, "class", "svelte-1hi2mz1");
      attr(div5, "class", "nome-jogador svelte-1hi2mz1");
      if (!src_url_equal(img1.src, img1_src_value = Robo))
        attr(img1, "src", img1_src_value);
      attr(img1, "alt", "robo representando inteligência artificial");
      attr(img1, "class", "svelte-1hi2mz1");
      attr(div6, "class", "svelte-1hi2mz1");
      attr(div7, "class", "svelte-1hi2mz1");
      attr(div8, "class", "placar svelte-1hi2mz1");
    },
    m(target, anchor) {
      insert(target, div8, anchor);
      append(div8, div3);
      append(div3, div0);
      append(div0, img0);
      append(div3, t0);
      append(div3, div1);
      append(div1, p0);
      append(div1, t2);
      append(div1, p1);
      append(p1, t3);
      append(p1, t4);
      append(div3, t5);
      append(div3, div2);
      append(div8, t7);
      append(div8, button);
      if_block.m(button, null);
      append(div8, t8);
      append(div8, div7);
      append(div7, div4);
      append(div7, t10);
      append(div7, div5);
      append(div5, p2);
      append(div5, t12);
      append(div5, p3);
      append(p3, t13);
      append(p3, t14);
      append(div7, t15);
      append(div7, div6);
      append(div6, img1);
      if (!mounted) {
        dispose = listen(button, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t4, ctx2[0]);
      if (dirty & 8) {
        toggle_class(div2, "exibir", ctx2[3] == Turno.Jogador1);
      }
      if (current_block_type !== (current_block_type = select_block_type(ctx2))) {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(button, null);
        }
      }
      if (dirty & 4) {
        toggle_class(button, "pararJogo", ctx2[2]);
      }
      if (dirty & 8) {
        toggle_class(div4, "exibir", ctx2[3] == Turno.Jogador2IA);
      }
      if (dirty & 2)
        set_data(t14, ctx2[1]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div8);
      if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { vitoriasJogador1 = 0 } = $$props;
  let { vitoriasJogador2IA = 0 } = $$props;
  let { isJogoRunning = false } = $$props;
  let { turno = Turno.Parado } = $$props;
  const clickDispatch = createEventDispatcher();
  function handleClick() {
    clickDispatch("mudarEstado", {});
  }
  $$self.$$set = ($$props2) => {
    if ("vitoriasJogador1" in $$props2)
      $$invalidate(0, vitoriasJogador1 = $$props2.vitoriasJogador1);
    if ("vitoriasJogador2IA" in $$props2)
      $$invalidate(1, vitoriasJogador2IA = $$props2.vitoriasJogador2IA);
    if ("isJogoRunning" in $$props2)
      $$invalidate(2, isJogoRunning = $$props2.isJogoRunning);
    if ("turno" in $$props2)
      $$invalidate(3, turno = $$props2.turno);
  };
  return [vitoriasJogador1, vitoriasJogador2IA, isJogoRunning, turno, handleClick];
}
class Placar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$3, safe_not_equal, {
      vitoriasJogador1: 0,
      vitoriasJogador2IA: 1,
      isJogoRunning: 2,
      turno: 3
    });
  }
}
const Cores = {
  Branco: "#fff",
  Verde: "#5dd306",
  Vermelho: "#d30606"
};
const CorPecas = {
  [NumJogador.SemJogador]: Cores.Branco,
  [NumJogador.Jogador1]: Cores.Verde,
  [NumJogador.Jogador2IA]: Cores.Vermelho
};
const Peca_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[2]);
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 4)
        set_data(t, ctx2[2]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let mounted;
  let dispose;
  let if_block = ctx[4] && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      set_style(div, "--posX", ctx[0]);
      set_style(div, "--posY", ctx[1]);
      set_style(div, "--stateColor", ctx[5]);
      attr(div, "class", "svelte-2mv14g");
      toggle_class(div, "realce", ctx[3]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      if (!mounted) {
        dispose = listen(div, "click", ctx[6]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[4]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      if (dirty & 1) {
        set_style(div, "--posX", ctx2[0]);
      }
      if (dirty & 2) {
        set_style(div, "--posY", ctx2[1]);
      }
      if (dirty & 32) {
        set_style(div, "--stateColor", ctx2[5]);
      }
      if (dirty & 8) {
        toggle_class(div, "realce", ctx2[3]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  const clickDispatch = createEventDispatcher();
  let { posX = "0%" } = $$props;
  let { posY = "0%" } = $$props;
  let { num = 0 } = $$props;
  let { realce = false } = $$props;
  let { displayNumero: displayNumero2 = false } = $$props;
  let { corPeca = CorPecas[NumJogador.SemJogador] } = $$props;
  function handleClick() {
    clickDispatch("clickPeca", { num, corPeca });
  }
  $$self.$$set = ($$props2) => {
    if ("posX" in $$props2)
      $$invalidate(0, posX = $$props2.posX);
    if ("posY" in $$props2)
      $$invalidate(1, posY = $$props2.posY);
    if ("num" in $$props2)
      $$invalidate(2, num = $$props2.num);
    if ("realce" in $$props2)
      $$invalidate(3, realce = $$props2.realce);
    if ("displayNumero" in $$props2)
      $$invalidate(4, displayNumero2 = $$props2.displayNumero);
    if ("corPeca" in $$props2)
      $$invalidate(5, corPeca = $$props2.corPeca);
  };
  return [posX, posY, num, realce, displayNumero2, corPeca, handleClick];
}
class Peca extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {
      posX: 0,
      posY: 1,
      num: 2,
      realce: 3,
      displayNumero: 4,
      corPeca: 5
    });
  }
}
class HandlerPeca {
  constructor() {
    __publicField(this, "jogador");
    __publicField(this, "realce");
    this.init();
  }
  init() {
    this.realce = false;
    this.jogador = NumJogador.SemJogador;
  }
  ativaRealce() {
    this.realce = true;
  }
  desativaRealce() {
    this.realce = false;
  }
}
class Jogador {
  constructor(id) {
    __publicField(this, "_rodadaJogador");
    __publicField(this, "_vitorias");
    __publicField(this, "_id");
    this.resetarJogo();
    this._vitorias = 0;
    this._id = id;
  }
  resetarJogo() {
    this._rodadaJogador = RodadaJogo.ColocarPecas;
  }
  get rodadaJogador() {
    return this._rodadaJogador;
  }
  get vitorias() {
    return this._vitorias;
  }
  get id() {
    return this.id;
  }
}
class Jogo {
  constructor(posicoesTotal2, redrawn) {
    __publicField(this, "grafo");
    __publicField(this, "grafoEstado");
    __publicField(this, "pecas");
    __publicField(this, "jogadores");
    __publicField(this, "_vitorias");
    __publicField(this, "_numRodadas");
    __publicField(this, "_turno");
    this.posicoesTotal = posicoesTotal2;
    this.redrawn = redrawn;
    this.pecas = new Array(posicoesTotal2).fill(0).map((_) => new HandlerPeca());
    this.grafo = [
      [1, 3],
      [0, 2, 9],
      [1, 4],
      [0, 5, 11],
      [2, 7, 12],
      [3, 6],
      [5, 7, 14],
      [4, 6],
      [9, 11],
      [1, 8, 10, 17],
      [9, 12],
      [3, 8, 13, 19],
      [4, 10, 15, 20],
      [11, 14],
      [6, 13, 15, 22],
      [12, 14],
      [17, 19],
      [9, 16, 18],
      [17, 20],
      [11, 16, 21],
      [12, 18, 23],
      [19, 22],
      [14, 21, 23],
      [20, 22]
    ];
    this.grafoEstado = new Array(posicoesTotal2).fill(-1).map((_) => new Array(posicoesTotal2).fill(TipoOcupacao.NaoUtilizada));
    this._turno = Turno.Parado;
    this._vitorias = [0, 0];
  }
  get turno() {
    return this._turno;
  }
  get numRodadas() {
    return this._numRodadas;
  }
  get isJogoRunning() {
    return this._turno != Turno.Parado;
  }
  get vitorias() {
    return this._vitorias;
  }
  iniciarJogo() {
    this._numRodadas = 0;
    this._turno = Turno.Jogador1;
    this.jogadores = [
      new Jogador(1),
      new Jogador(2)
    ];
    for (let i = 0; i < this.grafo.length; i++) {
      for (const j of this.grafo[i]) {
        this.grafoEstado[i][j] = TipoOcupacao.Vazio;
      }
    }
    this.pecas = this.pecas.map((_) => new HandlerPeca());
    this.realcaTodasPecas();
  }
  realcaTodasPecas() {
    for (const peca of this.pecas) {
      peca.ativaRealce();
    }
    this.redrawn();
  }
  finalizaJogo(estadoFim) {
  }
  cleanTabuleiro() {
    for (let i = 0; i < this.grafo.length; i++) {
      for (const j of this.grafo[i]) {
        this.grafoEstado[i][j] = TipoOcupacao.Vazio;
      }
    }
  }
  mudarEstado() {
    if (this._turno != Turno.Parado) {
      this._turno = Turno.Parado;
      this.cleanTabuleiro();
      return false;
    }
    this.iniciarJogo();
    return true;
  }
  getProximaPosicoesMovimento(pos) {
    return null;
  }
}
const Tabuleiro_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  child_ctx[25] = i;
  return child_ctx;
}
function create_each_block_3(ctx) {
  let peca;
  let current;
  peca = new Peca({
    props: {
      posX: ctx[23].x,
      posY: ctx[23].y,
      num: ctx[23].n,
      displayNumero,
      realce: ctx[1][ctx[25]],
      corPeca: ctx[2][ctx[25]]
    }
  });
  peca.$on("clickPeca", ctx[6]);
  return {
    c() {
      create_component(peca.$$.fragment);
    },
    m(target, anchor) {
      mount_component(peca, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const peca_changes = {};
      if (dirty & 2)
        peca_changes.realce = ctx2[1][ctx2[25]];
      if (dirty & 4)
        peca_changes.corPeca = ctx2[2][ctx2[25]];
      peca.$set(peca_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(peca.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(peca.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(peca, detaching);
    }
  };
}
function create_each_block_2(ctx) {
  let each_1_anchor;
  let current;
  let each_value_3 = ctx[18];
  let each_blocks = [];
  for (let i = 0; i < each_value_3.length; i += 1) {
    each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & 102) {
        each_value_3 = ctx2[18];
        let i;
        for (i = 0; i < each_value_3.length; i += 1) {
          const child_ctx = get_each_context_3(ctx2, each_value_3, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_3(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value_3.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value_3.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_each_block_1(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "linha svelte-co0e2r");
      set_style(div, "--lado", ctx[18].lado + "px");
      set_style(div, "--dist", ctx[18].dist + "%");
      set_style(div, "--borda", borda + "px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_each_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "conectores svelte-co0e2r");
      set_style(div, "--l", ctx[15].l);
      set_style(div, "--w", ctx[15].w);
      set_style(div, "--t", ctx[15].t);
      set_style(div, "--h", ctx[15].h);
      set_style(div, "--borda", borda + "px");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_fragment$1(ctx) {
  let placar;
  let t0;
  let div1;
  let div0;
  let t1;
  let t2;
  let current;
  placar = new Placar({
    props: {
      isJogoRunning: ctx[0].isJogoRunning,
      turno: ctx[0].turno,
      vitoriasJogador1: ctx[0].vitorias[0],
      vitoriasJogador2IA: ctx[0].vitorias[0]
    }
  });
  placar.$on("mudarEstado", ctx[7]);
  let each_value_2 = ctx[5];
  let each_blocks_2 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  const out = (i) => transition_out(each_blocks_2[i], 1, 1, () => {
    each_blocks_2[i] = null;
  });
  let each_value_1 = ctx[4];
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  let each_value = ctx[3];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      create_component(placar.$$.fragment);
      t0 = space();
      div1 = element("div");
      div0 = element("div");
      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].c();
      }
      t1 = space();
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }
      t2 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div0, "class", "tabuleiro svelte-co0e2r");
      set_style(div0, "--lado", ladoTabuleiro + "px");
      attr(div1, "class", "container-tabuleiro svelte-co0e2r");
    },
    m(target, anchor) {
      mount_component(placar, target, anchor);
      insert(target, t0, anchor);
      insert(target, div1, anchor);
      append(div1, div0);
      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].m(div0, null);
      }
      append(div0, t1);
      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(div0, null);
      }
      append(div0, t2);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div0, null);
      }
      current = true;
    },
    p(ctx2, [dirty]) {
      const placar_changes = {};
      if (dirty & 1)
        placar_changes.isJogoRunning = ctx2[0].isJogoRunning;
      if (dirty & 1)
        placar_changes.turno = ctx2[0].turno;
      if (dirty & 1)
        placar_changes.vitoriasJogador1 = ctx2[0].vitorias[0];
      if (dirty & 1)
        placar_changes.vitoriasJogador2IA = ctx2[0].vitorias[0];
      placar.$set(placar_changes);
      if (dirty & 102) {
        each_value_2 = ctx2[5];
        let i;
        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx2, each_value_2, i);
          if (each_blocks_2[i]) {
            each_blocks_2[i].p(child_ctx, dirty);
            transition_in(each_blocks_2[i], 1);
          } else {
            each_blocks_2[i] = create_each_block_2(child_ctx);
            each_blocks_2[i].c();
            transition_in(each_blocks_2[i], 1);
            each_blocks_2[i].m(div0, t1);
          }
        }
        group_outros();
        for (i = each_value_2.length; i < each_blocks_2.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (dirty & 16) {
        each_value_1 = ctx2[4];
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
          } else {
            each_blocks_1[i] = create_each_block_1(child_ctx);
            each_blocks_1[i].c();
            each_blocks_1[i].m(div0, t2);
          }
        }
        for (; i < each_blocks_1.length; i += 1) {
          each_blocks_1[i].d(1);
        }
        each_blocks_1.length = each_value_1.length;
      }
      if (dirty & 8) {
        each_value = ctx2[3];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div0, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(placar.$$.fragment, local);
      for (let i = 0; i < each_value_2.length; i += 1) {
        transition_in(each_blocks_2[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(placar.$$.fragment, local);
      each_blocks_2 = each_blocks_2.filter(Boolean);
      for (let i = 0; i < each_blocks_2.length; i += 1) {
        transition_out(each_blocks_2[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_component(placar, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div1);
      destroy_each(each_blocks_2, detaching);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
    }
  };
}
const displayNumero = false;
const lado = 3;
const borda = 8;
const profundidade = 3;
const posicoesTotal = 24;
const ladoTabuleiro = 500;
function instance($$self, $$props, $$invalidate) {
  const centro = Math.ceil(lado / 2) - 1;
  const distanciaCentro = [0, 12.5, 25];
  let tt = new Array(posicoesTotal).fill(-1).map((_) => () => {
  });
  function t() {
    $$invalidate(0, jogo);
    for (let i = 0; i < posicoesTotal; i++)
      tt[i]();
  }
  let jogo = new Jogo(posicoesTotal, t);
  const conectores = [
    {
      l: `calc(50% - ${borda / 2}px)`,
      t: "0",
      w: `${borda}px`,
      h: `${distanciaCentro[2]}%`
    },
    {
      l: `${100 - distanciaCentro[2]}%`,
      t: `calc(50% - ${borda / 2}px)`,
      w: `${distanciaCentro[2]}%`,
      h: `${borda}px`
    },
    {
      l: `calc(50% - ${borda / 2}px)`,
      t: `${100 - distanciaCentro[2]}%`,
      w: `${borda}px`,
      h: `${distanciaCentro[2]}%`
    },
    {
      l: "0",
      t: `calc(50% - ${borda / 2}px)`,
      w: `${distanciaCentro[2]}%`,
      h: `${borda}px`
    }
  ];
  const linhas = [];
  for (let i = 0; i < profundidade; i++) {
    linhas.push({
      lado: ladoTabuleiro - ladoTabuleiro * (distanciaCentro[i] / 100) * 2,
      dist: distanciaCentro[i]
    });
  }
  function determinaPosicao(i, k) {
    return 50 * i + (i == 1 ? 0 : i < 1 ? distanciaCentro[k] : -distanciaCentro[k]);
  }
  let tabuleiro = [];
  for (let i = 0, k = 0, z = 0; i < lado * profundidade; i++) {
    if (i != 0 && i % profundidade == 0) {
      k++;
    }
    const l = i % profundidade;
    tabuleiro.push([]);
    for (let j = 0; j < lado; j++) {
      if (l == centro && j == centro) {
        continue;
      }
      tabuleiro[i].push({
        x: `${determinaPosicao(j, k)}%`,
        y: `${determinaPosicao(l, k)}%`,
        n: z,
        handler: jogo.pecas[z]
      });
      z++;
    }
  }
  const pecasRealcadas = new Array(posicoesTotal).fill(false);
  const corPecas = new Array(posicoesTotal).fill(CorPecas[0]);
  function handleClickPeca(evt) {
    console.log("Peca clicada", evt);
    const evtDetails = evt.detail;
    $$invalidate(2, corPecas[evtDetails.num] = CorPecas[jogo.turno], corPecas);
  }
  function ativarRealceTodasPecas() {
    for (let i = 0; i < posicoesTotal; i++) {
      $$invalidate(1, pecasRealcadas[i] = true, pecasRealcadas);
    }
  }
  function desativarRealceTodasPecas() {
    for (let i = 0; i < posicoesTotal; i++) {
      $$invalidate(1, pecasRealcadas[i] = false, pecasRealcadas);
    }
  }
  function onMudarEstado() {
    const estado = jogo.mudarEstado();
    if (estado) {
      ativarRealceTodasPecas();
    } else {
      desativarRealceTodasPecas();
    }
    $$invalidate(0, jogo);
  }
  return [
    jogo,
    pecasRealcadas,
    corPecas,
    conectores,
    linhas,
    tabuleiro,
    handleClickPeca,
    onMudarEstado
  ];
}
class Tabuleiro extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment$1, safe_not_equal, {});
  }
}
const App_svelte_svelte_type_style_lang = "";
function create_fragment(ctx) {
  let main;
  let h1;
  let t1;
  let p;
  let t9;
  let tabuleirotrilha;
  let current;
  tabuleirotrilha = new Tabuleiro({});
  return {
    c() {
      main = element("main");
      h1 = element("h1");
      h1.textContent = "Trilha-Inteligente!";
      t1 = space();
      p = element("p");
      p.innerHTML = `Jogo de <a href="http://www.tabuleirocriativo.com.br/post_trilha.html">Trilha</a> 
    utilizando busca competitiva <a href="https://en.wikipedia.org/wiki/Minimax">MinMax</a>, 
    e arvóre de decisão <a href="https://en.wikipedia.org/wiki/Markov_decision_process">MDP</a> 
    (Markov-Decision-Process).`;
      t9 = space();
      create_component(tabuleirotrilha.$$.fragment);
      attr(p, "class", "svelte-8riicj");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      append(main, h1);
      append(main, t1);
      append(main, p);
      append(main, t9);
      mount_component(tabuleirotrilha, main, null);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(tabuleirotrilha.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(tabuleirotrilha.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(main);
      destroy_component(tabuleirotrilha);
    }
  };
}
class App extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
new App({
  target: document.getElementById("app")
});
