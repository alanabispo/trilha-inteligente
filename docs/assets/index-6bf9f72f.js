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
  let div2;
  let t6;
  let button;
  let t7;
  let div7;
  let div4;
  let t9;
  let div5;
  let p2;
  let t11;
  let p3;
  let t12;
  let t13;
  let div6;
  let img1;
  let img1_src_value;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (ctx2[0])
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
      t3 = text(ctx[2]);
      t4 = space();
      div2 = element("div");
      div2.textContent = "Sua vez!";
      t6 = space();
      button = element("button");
      if_block.c();
      t7 = space();
      div7 = element("div");
      div4 = element("div");
      div4.textContent = "Vez dele!";
      t9 = space();
      div5 = element("div");
      p2 = element("p");
      p2.innerHTML = `<b>Computador</b>`;
      t11 = space();
      p3 = element("p");
      t12 = text(ctx[3]);
      t13 = space();
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
      toggle_class(div2, "exibir", ctx[1] == Turno.Jogador1);
      attr(div3, "class", "svelte-1hi2mz1");
      attr(button, "class", "svelte-1hi2mz1");
      toggle_class(button, "pararJogo", ctx[0]);
      attr(div4, "class", "svelte-1hi2mz1");
      toggle_class(div4, "exibir", ctx[1] == Turno.Jogador2IA);
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
      append(div3, t4);
      append(div3, div2);
      append(div8, t6);
      append(div8, button);
      if_block.m(button, null);
      append(div8, t7);
      append(div8, div7);
      append(div7, div4);
      append(div7, t9);
      append(div7, div5);
      append(div5, p2);
      append(div5, t11);
      append(div5, p3);
      append(p3, t12);
      append(div7, t13);
      append(div7, div6);
      append(div6, img1);
      if (!mounted) {
        dispose = listen(button, "click", ctx[4]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 4)
        set_data(t3, ctx2[2]);
      if (dirty & 2) {
        toggle_class(div2, "exibir", ctx2[1] == Turno.Jogador1);
      }
      if (current_block_type !== (current_block_type = select_block_type(ctx2))) {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(button, null);
        }
      }
      if (dirty & 1) {
        toggle_class(button, "pararJogo", ctx2[0]);
      }
      if (dirty & 2) {
        toggle_class(div4, "exibir", ctx2[1] == Turno.Jogador2IA);
      }
      if (dirty & 8)
        set_data(t12, ctx2[3]);
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
  let { isJogoRunning = false } = $$props;
  let { turno = Turno.Parado } = $$props;
  let { msgP1 = "" } = $$props;
  let { msgP2 = "" } = $$props;
  const clickDispatch = createEventDispatcher();
  function handleClick() {
    clickDispatch("mudarEstado", {});
  }
  $$self.$$set = ($$props2) => {
    if ("isJogoRunning" in $$props2)
      $$invalidate(0, isJogoRunning = $$props2.isJogoRunning);
    if ("turno" in $$props2)
      $$invalidate(1, turno = $$props2.turno);
    if ("msgP1" in $$props2)
      $$invalidate(2, msgP1 = $$props2.msgP1);
    if ("msgP2" in $$props2)
      $$invalidate(3, msgP2 = $$props2.msgP2);
  };
  return [isJogoRunning, turno, msgP1, msgP2, handleClick];
}
class Placar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$3, safe_not_equal, {
      isJogoRunning: 0,
      turno: 1,
      msgP1: 2,
      msgP2: 3
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
var Mensagens = /* @__PURE__ */ ((Mensagens2) => {
  Mensagens2["Aguardando"] = "Aguardando";
  Mensagens2["Ganhou"] = "Ganhou";
  Mensagens2["Perdeu"] = "Perdeu";
  Mensagens2["Coloca"] = "Colocar";
  Mensagens2["Move"] = "Mover";
  Mensagens2["Voa"] = "Voar";
  return Mensagens2;
})(Mensagens || {});
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
  let if_block = ctx[5] && create_if_block(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      set_style(div, "--posX", ctx[0]);
      set_style(div, "--posY", ctx[1]);
      set_style(div, "--stateColor", ctx[6]);
      attr(div, "class", "svelte-1jxi15w");
      toggle_class(div, "realce", ctx[3]);
      toggle_class(div, "seleciona", ctx[4]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
      if (!mounted) {
        dispose = listen(div, "click", ctx[7]);
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (ctx2[5]) {
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
      if (dirty & 64) {
        set_style(div, "--stateColor", ctx2[6]);
      }
      if (dirty & 8) {
        toggle_class(div, "realce", ctx2[3]);
      }
      if (dirty & 16) {
        toggle_class(div, "seleciona", ctx2[4]);
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
  let { seleciona = false } = $$props;
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
    if ("seleciona" in $$props2)
      $$invalidate(4, seleciona = $$props2.seleciona);
    if ("displayNumero" in $$props2)
      $$invalidate(5, displayNumero2 = $$props2.displayNumero);
    if ("corPeca" in $$props2)
      $$invalidate(6, corPeca = $$props2.corPeca);
  };
  return [posX, posY, num, realce, seleciona, displayNumero2, corPeca, handleClick];
}
class Peca extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {
      posX: 0,
      posY: 1,
      num: 2,
      realce: 3,
      seleciona: 4,
      displayNumero: 5,
      corPeca: 6
    });
  }
}
class DadosPeca {
  constructor(adjacentes) {
    __publicField(this, "jogador");
    __publicField(this, "selecionada");
    this.adjacentes = adjacentes;
    this.init();
    this.selecionada = false;
  }
  init() {
    this.jogador = NumJogador.SemJogador;
  }
}
class Jogador {
  constructor(id) {
    __publicField(this, "_id");
    __publicField(this, "rodadaJogador");
    __publicField(this, "numRodadas");
    __publicField(this, "pecasDisponiveis");
    this.resetarJogo();
    this._id = id;
    this.numRodadas = 0;
  }
  resetarJogo() {
    this.rodadaJogador = RodadaJogo.ColocarPecas;
    this.numRodadas = 0;
    this.pecasDisponiveis = 0;
  }
  get id() {
    return this._id;
  }
}
class Jogo {
  constructor(posicoesTotal2) {
    __publicField(this, "grafo");
    __publicField(this, "trincas");
    __publicField(this, "grafoEstado");
    __publicField(this, "pecas");
    __publicField(this, "jogadores");
    __publicField(this, "pecaSelecionada");
    __publicField(this, "removerPinturas");
    __publicField(this, "removerPeca");
    __publicField(this, "func");
    __publicField(this, "pecaSelecionadaAnteriormente");
    __publicField(this, "modoRemocao");
    __publicField(this, "_numRodadas");
    __publicField(this, "_turno");
    __publicField(this, "_trincaAtiva");
    this.posicoesTotal = posicoesTotal2;
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
    this.trincas = [
      [0, 1, 2],
      [2, 4, 7],
      [7, 6, 5],
      [5, 3, 0],
      [8, 9, 10],
      [10, 12, 15],
      [15, 14, 13],
      [13, 11, 8],
      [16, 17, 18],
      [18, 20, 23],
      [23, 22, 21],
      [21, 19, 16],
      [1, 9, 17],
      [4, 12, 20],
      [6, 14, 22],
      [3, 11, 19]
    ];
    this.pecas = new Array(posicoesTotal2).fill(0).map((_, i) => new DadosPeca(this.grafo[i]));
    this.grafoEstado = new Array(posicoesTotal2).fill(-1).map((_) => new Array(posicoesTotal2).fill(TipoOcupacao.NaoUtilizada));
    this._turno = Turno.Parado;
    this.pecaSelecionada = -1;
    this.func = [];
    this._trincaAtiva = [{}, {}];
    this.pecaSelecionadaAnteriormente = -1;
    this.removerPinturas = [];
    this.modoRemocao = false;
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
    this.pecas = this.pecas.map((_, i) => new DadosPeca(this.grafo[i]));
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
      this.modoRemocao = false;
      this.cleanTabuleiro();
      return false;
    }
    this.modoRemocao = false;
    this.iniciarJogo();
    return true;
  }
  executarClickRemocao(num) {
    const turnoJogador = this._turno == Turno.Jogador1 ? NumJogador.Jogador1 : NumJogador.Jogador2IA;
    if (this.pecas[num].jogador == turnoJogador) {
      this.pecas[num].jogador = NumJogador.SemJogador;
      this.modoRemocao = false;
      return true;
    }
    return false;
  }
  executarClick(num) {
    const retornaFalha = () => {
      return {
        tipoAcao: TiposAcao.Falha,
        pecaSelecionada: [],
        pecaRealcadas: [],
        exibeAlertaGanhou: false,
        exibeAlertaPerdeu: false,
        permiteRemocao: false,
        erro: true
      };
    };
    if (this.modoRemocao) {
      return new Promise(retornaFalha);
    }
    if (this._turno == Turno.Parado) {
      return new Promise(retornaFalha);
    }
    const idJogador = this._turno == Turno.Jogador1 ? 0 : 1;
    const turnoJogador = this._turno == Turno.Jogador1 ? NumJogador.Jogador1 : NumJogador.Jogador2IA;
    const novoTurno = this._turno == Turno.Jogador1 ? Turno.Jogador2IA : Turno.Jogador1;
    const realcaPecasVazias = () => {
      if (idJogador == 0)
        return [];
      return new Array(this.posicoesTotal).fill(false).map((_, i) => this.pecas[i].jogador == NumJogador.SemJogador ? i : -1).filter((el) => el != -1);
    };
    const realcaPecasAdversario = () => {
      return new Array(this.posicoesTotal).fill(false).map((_, i) => this.pecas[i].jogador != turnoJogador && this.pecas[i].jogador != NumJogador.SemJogador ? i : -1).filter((el) => el != -1);
    };
    const verificaPecaVazia = () => {
      if (this.pecas[num].jogador == NumJogador.SemJogador) {
        return;
      }
      return Promise.reject();
    };
    const objToKey = (obj) => JSON.stringify(obj);
    const keyToObj = (obj) => JSON.parse(obj);
    const verificaTrinca = () => {
      const trincas = {};
      for (const [pos1, pos2, pos3] of this.trincas) {
        if (this.pecas[pos1].jogador == turnoJogador && this.pecas[pos2].jogador == turnoJogador && this.pecas[pos3].jogador == turnoJogador) {
          const trinca2 = [pos1, pos2, pos3];
          trincas[objToKey(trinca2)] = true;
        }
      }
      let trinca;
      let achouTrinca = false;
      for (const keyTrinca in trincas) {
        if (!this._trincaAtiva[idJogador][keyTrinca]) {
          achouTrinca = true;
          trinca = keyToObj(keyTrinca);
        }
      }
      this._trincaAtiva[idJogador] = trincas;
      return [achouTrinca, trinca];
    };
    const retornaColocarPecas = ([trinca, pecas]) => {
      if (trinca) {
        this.modoRemocao = true;
        return {
          exibeAlertaGanhou: false,
          exibeAlertaPerdeu: false,
          pecaRealcadas: realcaPecasAdversario(),
          pecaSelecionada: pecas,
          removerPintura: [],
          permiteRemocao: true,
          erro: false,
          msgP1: Mensagens.Coloca,
          msgP2: Mensagens.Coloca
        };
      }
      return {
        exibeAlertaGanhou: false,
        exibeAlertaPerdeu: false,
        pecaRealcadas: realcaPecasVazias(),
        pecaSelecionada: [],
        removerPintura: [],
        permiteRemocao: false,
        erro: false,
        msgP1: this.jogadores[0].numRodadas < 9 ? Mensagens.Coloca : Mensagens.Move,
        msgP2: this.jogadores[1].numRodadas < 9 ? Mensagens.Coloca : Mensagens.Move
      };
    };
    const incrementaRodada = () => {
      this._numRodadas++;
      this.jogadores[idJogador].numRodadas++;
      this._turno = novoTurno;
    };
    const ocupaPeca = () => {
      if (this.jogadores[idJogador].numRodadas < 8) {
        this.pecas[num].jogador = turnoJogador;
        return;
      }
      this.pecas[num].jogador = turnoJogador;
      this.jogadores[idJogador].rodadaJogador = RodadaJogo.MoverPecas;
    };
    const verificaSePecaJogador = () => {
      if (this.pecas[num].jogador == turnoJogador) {
        return;
      }
      return Promise.reject();
    };
    const retornaSelecionarMoverPecas = () => {
      const adjacentesLivres = [];
      for (const adjacente of this.grafo[num]) {
        if (this.pecas[adjacente].jogador == NumJogador.SemJogador) {
          adjacentesLivres.push(adjacente);
        }
      }
      this.pecaSelecionadaAnteriormente = num;
      return {
        exibeAlertaGanhou: false,
        exibeAlertaPerdeu: false,
        pecaRealcadas: adjacentesLivres,
        pecaSelecionada: [num],
        removerPintura: [],
        permiteRemocao: false,
        erro: false,
        msgP1: Mensagens.Move,
        msgP2: Mensagens.Move
      };
    };
    const movePeca = () => {
      this.pecas[this.pecaSelecionadaAnteriormente].jogador = NumJogador.SemJogador;
      this.pecas[num].jogador = turnoJogador;
      this.removerPinturas = [this.pecaSelecionadaAnteriormente];
      this.pecaSelecionadaAnteriormente = -1;
    };
    const retornaMoverPecas = ([trinca, pecas]) => {
      if (trinca) {
        this.modoRemocao = true;
        return {
          exibeAlertaGanhou: false,
          exibeAlertaPerdeu: false,
          pecaRealcadas: realcaPecasAdversario(),
          pecaSelecionada: pecas,
          permiteRemocao: true,
          removerPintura: this.removerPinturas,
          erro: false,
          msgP1: Mensagens.Move,
          msgP2: Mensagens.Move
        };
      }
      return {
        exibeAlertaGanhou: false,
        exibeAlertaPerdeu: false,
        pecaRealcadas: [],
        pecaSelecionada: [],
        permiteRemocao: false,
        removerPintura: this.removerPinturas,
        erro: false,
        msgP1: Mensagens.Move,
        msgP2: Mensagens.Move
      };
    };
    const verificaAdjacente = () => {
      if (this.grafo[this.pecaSelecionadaAnteriormente].indexOf(num) == -1) {
        return Promise.reject();
      }
    };
    switch (this.jogadores[idJogador].rodadaJogador) {
      case RodadaJogo.ColocarPecas:
        return Promise.resolve().then(verificaPecaVazia).then(ocupaPeca).then(incrementaRodada).then(verificaTrinca).then(retornaColocarPecas).catch(retornaFalha);
      case RodadaJogo.MoverPecas:
        if (this.pecaSelecionadaAnteriormente == -1 || this.pecas[num].jogador == turnoJogador) {
          return Promise.resolve().then(verificaSePecaJogador).then(retornaSelecionarMoverPecas).catch(retornaFalha);
        }
        return Promise.resolve().then(verificaPecaVazia).then(verificaAdjacente).then(movePeca).then(incrementaRodada).then(verificaTrinca).then(retornaMoverPecas).catch(retornaFalha);
      case RodadaJogo.FlutuarPecas:
        break;
    }
    return null;
  }
}
var TiposAcao = /* @__PURE__ */ ((TiposAcao2) => {
  TiposAcao2[TiposAcao2["ClickPosicaoLivreRodadaColocar"] = 0] = "ClickPosicaoLivreRodadaColocar";
  TiposAcao2[TiposAcao2["ClickPosicaoLivreRodadaColocarTrinca"] = 1] = "ClickPosicaoLivreRodadaColocarTrinca";
  TiposAcao2[TiposAcao2["ClickPecaJogadorRodadaMover"] = 2] = "ClickPecaJogadorRodadaMover";
  TiposAcao2[TiposAcao2["ClickPosicaoLivrePecaSelecionadaRodadaMover"] = 3] = "ClickPosicaoLivrePecaSelecionadaRodadaMover";
  TiposAcao2[TiposAcao2["ClickPosicaoLivrePecaSelecionadaRodadaMoverTrinca"] = 4] = "ClickPosicaoLivrePecaSelecionadaRodadaMoverTrinca";
  TiposAcao2[TiposAcao2["ClickPosicaoLivreRodadaFlutuar"] = 5] = "ClickPosicaoLivreRodadaFlutuar";
  TiposAcao2[TiposAcao2["ClickPosicaoLivreRodadaFlutuarTrinca"] = 6] = "ClickPosicaoLivreRodadaFlutuarTrinca";
  TiposAcao2[TiposAcao2["CondicaoGanhou"] = 7] = "CondicaoGanhou";
  TiposAcao2[TiposAcao2["CondicaoPerdeu"] = 8] = "CondicaoPerdeu";
  TiposAcao2[TiposAcao2["Falha"] = 9] = "Falha";
  return TiposAcao2;
})(TiposAcao || {});
const Tabuleiro_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  return child_ctx;
}
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  return child_ctx;
}
function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[23] = list[i];
  return child_ctx;
}
function get_each_context_3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[28] = list[i];
  return child_ctx;
}
function create_each_block_3(ctx) {
  let peca;
  let current;
  peca = new Peca({
    props: {
      posX: ctx[28].x,
      posY: ctx[28].y,
      num: ctx[28].n,
      displayNumero,
      realce: ctx[2][ctx[28].n],
      corPeca: ctx[3][ctx[28].n],
      seleciona: ctx[1][ctx[28].n]
    }
  });
  peca.$on("clickPeca", ctx[11]);
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
      if (dirty & 4)
        peca_changes.realce = ctx2[2][ctx2[28].n];
      if (dirty & 8)
        peca_changes.corPeca = ctx2[3][ctx2[28].n];
      if (dirty & 2)
        peca_changes.seleciona = ctx2[1][ctx2[28].n];
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
  let each_value_3 = ctx[23];
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
      if (dirty & 2574) {
        each_value_3 = ctx2[23];
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
      set_style(div, "--lado", ctx[23].lado + "px");
      set_style(div, "--dist", ctx[23].dist + "%");
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
      set_style(div, "--l", ctx[20].l);
      set_style(div, "--w", ctx[20].w);
      set_style(div, "--t", ctx[20].t);
      set_style(div, "--h", ctx[20].h);
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
      turno: ctx[4],
      msgP1: ctx[5],
      msgP2: ctx[6]
    }
  });
  placar.$on("mudarEstado", ctx[10]);
  let each_value_2 = ctx[9];
  let each_blocks_2 = [];
  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }
  const out = (i) => transition_out(each_blocks_2[i], 1, 1, () => {
    each_blocks_2[i] = null;
  });
  let each_value_1 = ctx[8];
  let each_blocks_1 = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  let each_value = ctx[7];
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
      if (dirty & 16)
        placar_changes.turno = ctx2[4];
      if (dirty & 32)
        placar_changes.msgP1 = ctx2[5];
      if (dirty & 64)
        placar_changes.msgP2 = ctx2[6];
      placar.$set(placar_changes);
      if (dirty & 2574) {
        each_value_2 = ctx2[9];
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
      if (dirty & 256) {
        each_value_1 = ctx2[8];
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
      if (dirty & 128) {
        each_value = ctx2[7];
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
const displayNumero = true;
const lado = 3;
const borda = 8;
const profundidade = 3;
const posicoesTotal = 24;
const ladoTabuleiro = 500;
function instance($$self, $$props, $$invalidate) {
  const centro = Math.ceil(lado / 2) - 1;
  const distanciaCentro = [0, 12.5, 25];
  let jogo = new Jogo(posicoesTotal);
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
  const pecasSelecionada = new Array(posicoesTotal).fill(false);
  const pecasRealcadas = new Array(posicoesTotal).fill(false);
  const corPecas = new Array(posicoesTotal).fill(CorPecas[0]);
  let novoTurno = jogo.turno;
  let tabuleiro = [];
  let msgP1 = Mensagens.Aguardando;
  let msgP2 = Mensagens.Aguardando;
  for (let i = 0; i < profundidade; i++) {
    linhas.push({
      lado: ladoTabuleiro - ladoTabuleiro * (distanciaCentro[i] / 100) * 2,
      dist: distanciaCentro[i]
    });
  }
  function determinaPosicao(i, k) {
    return 50 * i + (i == 1 ? 0 : i < 1 ? distanciaCentro[k] : -distanciaCentro[k]);
  }
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
  function ativarRealceTodasPecas() {
    for (let i = 0; i < posicoesTotal; i++) {
      if (corPecas[i] == CorPecas[0]) {
        $$invalidate(2, pecasRealcadas[i] = true, pecasRealcadas);
      }
    }
  }
  function desativarRealceTodasPecas() {
    for (let i = 0; i < posicoesTotal; i++) {
      $$invalidate(2, pecasRealcadas[i] = false, pecasRealcadas);
    }
  }
  function limpaRealces() {
    for (let i = 0; i < posicoesTotal; i++) {
      $$invalidate(2, pecasRealcadas[i] = false, pecasRealcadas);
      $$invalidate(1, pecasSelecionada[i] = false, pecasSelecionada);
    }
  }
  function onMudarEstado() {
    const estado = jogo.mudarEstado();
    limpaRealces();
    for (let i = 0; i < posicoesTotal; i++) {
      $$invalidate(3, corPecas[i] = CorPecas[NumJogador.SemJogador], corPecas);
    }
    if (estado) {
      ativarRealceTodasPecas();
      $$invalidate(5, msgP1 = Mensagens.Coloca);
      $$invalidate(6, msgP2 = Mensagens.Coloca);
    } else {
      desativarRealceTodasPecas();
      $$invalidate(5, msgP1 = Mensagens.Aguardando);
      $$invalidate(6, msgP2 = Mensagens.Aguardando);
    }
    $$invalidate(0, jogo);
    $$invalidate(4, novoTurno = jogo.turno);
  }
  let modoRemocao = false;
  function handleClickPeca(evt) {
    const evtDetails = evt.detail;
    const turnoAtual = jogo.turno;
    if (modoRemocao) {
      if (jogo.executarClickRemocao(evtDetails.num)) {
        modoRemocao = false;
        $$invalidate(3, corPecas[evtDetails.num] = CorPecas[NumJogador.SemJogador], corPecas);
        limpaRealces();
      }
      return;
    }
    jogo.executarClick(evtDetails.num).then((res) => {
      console.log("Res", res);
      if (res.erro)
        return;
      $$invalidate(3, corPecas[evtDetails.num] = CorPecas[turnoAtual], corPecas);
      for (const pintura of res.removerPintura) {
        $$invalidate(3, corPecas[pintura] = CorPecas[NumJogador.SemJogador], corPecas);
      }
      limpaRealces();
      for (const peca of res.pecaRealcadas) {
        $$invalidate(2, pecasRealcadas[peca] = true, pecasRealcadas);
      }
      for (const peca of res.pecaSelecionada) {
        $$invalidate(1, pecasSelecionada[peca] = true, pecasSelecionada);
      }
      $$invalidate(0, jogo);
      $$invalidate(4, novoTurno = jogo.turno);
      if (!!res.msgP1) {
        $$invalidate(5, msgP1 = res.msgP1);
      }
      if (!!res.msgP2) {
        $$invalidate(6, msgP2 = res.msgP2);
      }
      modoRemocao = res.permiteRemocao;
    });
  }
  return [
    jogo,
    pecasSelecionada,
    pecasRealcadas,
    corPecas,
    novoTurno,
    msgP1,
    msgP2,
    conectores,
    linhas,
    tabuleiro,
    onMudarEstado,
    handleClickPeca
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
  let t7;
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
    utilizando busca competitiva <a href="https://en.wikipedia.org/wiki/Minimax">MiniMax</a>.`;
      t7 = space();
      create_component(tabuleirotrilha.$$.fragment);
      attr(p, "class", "svelte-8riicj");
    },
    m(target, anchor) {
      insert(target, main, anchor);
      append(main, h1);
      append(main, t1);
      append(main, p);
      append(main, t7);
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
