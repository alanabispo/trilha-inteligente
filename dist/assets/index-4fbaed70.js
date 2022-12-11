var Qe=Object.defineProperty;var We=(e,t,n)=>t in e?Qe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var z=(e,t,n)=>(We(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();function N(){}function Fe(e){return e()}function Ee(){return Object.create(null)}function K(e){e.forEach(Fe)}function He(e){return typeof e=="function"}function ie(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let Z;function Ce(e,t){return Z||(Z=document.createElement("a")),Z.href=t,e===Z.href}function Ze(e){return Object.keys(e).length===0}function h(e,t){e.appendChild(t)}function I(e,t,n){e.insertBefore(t,n||null)}function E(e){e.parentNode&&e.parentNode.removeChild(e)}function te(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function b(e){return document.createElement(e)}function V(e){return document.createTextNode(e)}function A(){return V(" ")}function xe(){return V("")}function Te(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function v(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function et(e){return Array.from(e.childNodes)}function _e(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function J(e,t,n,o){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function X(e,t,n){e.classList[n?"add":"remove"](t)}function tt(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(e,n,o,t),r}let G;function U(e){G=e}function nt(){if(!G)throw new Error("Function called outside component initialization");return G}function Oe(){const e=nt();return(t,n,{cancelable:o=!1}={})=>{const r=e.$$.callbacks[t];if(r){const c=tt(t,n,{cancelable:o});return r.slice().forEach(l=>{l.call(e,c)}),!c.defaultPrevented}return!0}}const q=[],Ie=[],ne=[],Me=[],rt=Promise.resolve();let me=!1;function ot(){me||(me=!0,rt.then(qe))}function ve(e){ne.push(e)}const de=new Set;let x=0;function qe(){const e=G;do{for(;x<q.length;){const t=q[x];x++,U(t),it(t.$$)}for(U(null),q.length=0,x=0;Ie.length;)Ie.pop()();for(let t=0;t<ne.length;t+=1){const n=ne[t];de.has(n)||(de.add(n),n())}ne.length=0}while(q.length);for(;Me.length;)Me.pop()();me=!1,de.clear(),U(e)}function it(e){if(e.fragment!==null){e.update(),K(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(ve)}}const re=new Set;let B;function Ue(){B={r:0,c:[],p:B}}function Ge(){B.r||K(B.c),B=B.p}function j(e,t){e&&e.i&&(re.delete(e),e.i(t))}function D(e,t,n,o){if(e&&e.o){if(re.has(e))return;re.add(e),B.c.push(()=>{re.delete(e),o&&(n&&e.d(1),o())}),e.o(t)}else o&&o()}function Pe(e){e&&e.c()}function le(e,t,n,o){const{fragment:r,after_update:c}=e.$$;r&&r.m(t,n),o||ve(()=>{const l=e.$$.on_mount.map(Fe).filter(He);e.$$.on_destroy?e.$$.on_destroy.push(...l):K(l),e.$$.on_mount=[]}),c.forEach(ve)}function se(e,t){const n=e.$$;n.fragment!==null&&(K(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function lt(e,t){e.$$.dirty[0]===-1&&(q.push(e),ot(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ae(e,t,n,o,r,c,l,f=[-1]){const u=G;U(e);const s=e.$$={fragment:null,ctx:[],props:c,update:N,not_equal:r,bound:Ee(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:Ee(),dirty:f,skip_bound:!1,root:t.target||u.$$.root};l&&l(s.root);let w=!1;if(s.ctx=n?n(e,t.props||{},(d,_,...y)=>{const m=y.length?y[0]:_;return s.ctx&&r(s.ctx[d],s.ctx[d]=m)&&(!s.skip_bound&&s.bound[d]&&s.bound[d](m),w&&lt(e,d)),_}):[],s.update(),w=!0,K(s.before_update),s.fragment=o?o(s.ctx):!1,t.target){if(t.hydrate){const d=et(t.target);s.fragment&&s.fragment.l(d),d.forEach(E)}else s.fragment&&s.fragment.c();t.intro&&j(e.$$.fragment),le(e,t.target,t.anchor,t.customElement),qe()}U(u)}class ce{$destroy(){se(this,1),this.$destroy=N}$on(t,n){if(!He(n))return N;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!Ze(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const st="/assets/mulher-negra-b61d7544.png",at="/assets/robo-dfa03d3f.png";var T=(e=>(e[e.SemJogador=0]="SemJogador",e[e.Jogador1=1]="Jogador1",e[e.Jogador2IA=2]="Jogador2IA",e))(T||{}),C=(e=>(e[e.Parado=0]="Parado",e[e.Jogador1=1]="Jogador1",e[e.Jogador2IA=2]="Jogador2IA",e))(C||{}),oe=(e=>(e[e.NaoUtilizada=-1]="NaoUtilizada",e[e.Vazio=0]="Vazio",e[e.Ocupado=1]="Ocupado",e))(oe||{}),Ke=(e=>(e[e.ColocarPecas=0]="ColocarPecas",e[e.MoverPecas=1]="MoverPecas",e[e.FlutuarPecas=2]="FlutuarPecas",e[e.Ganhou=3]="Ganhou",e[e.Perdeu=4]="Perdeu",e))(Ke||{});function ct(e){let t;return{c(){t=V("Iniciar!")},m(n,o){I(n,t,o)},d(n){n&&E(t)}}}function ut(e){let t;return{c(){t=V("Parar!")},m(n,o){I(n,t,o)},d(n){n&&E(t)}}}function ft(e){let t,n,o,r,c,l,f,u,s,w,d,_,y,m,a,g,P,i,p,F,L,R,ye,O,we,ue,Je,Q,H,ke,fe,ze;function Ae(k,$){return k[2]?ut:ct}let W=Ae(e),S=W(e);return{c(){t=b("div"),n=b("div"),o=b("div"),r=b("img"),l=A(),f=b("div"),u=b("p"),u.innerHTML="<b>Humano P1</b>",s=A(),w=b("p"),d=V("Vitórias: "),_=V(e[0]),y=A(),m=b("div"),m.textContent="Sua vez!",a=A(),g=b("button"),S.c(),P=A(),i=b("div"),p=b("div"),p.textContent="Vez oponente!",F=A(),L=b("div"),R=b("p"),R.innerHTML="<b>IA P2</b>",ye=A(),O=b("p"),we=V("Vitórias: "),ue=V(e[1]),Je=A(),Q=b("div"),H=b("img"),Ce(r.src,c=st)||v(r,"src",c),v(r,"alt","mulher negra representando humanidade"),v(r,"class","svelte-1hi2mz1"),v(o,"class","svelte-1hi2mz1"),v(u,"class","svelte-1hi2mz1"),v(w,"class","svelte-1hi2mz1"),v(f,"class","nome-jogador svelte-1hi2mz1"),v(m,"class","svelte-1hi2mz1"),X(m,"exibir",e[3]==C.Jogador1),v(n,"class","svelte-1hi2mz1"),v(g,"class","svelte-1hi2mz1"),X(g,"pararJogo",e[2]),v(p,"class","svelte-1hi2mz1"),X(p,"exibir",e[3]==C.Jogador2IA),v(R,"class","svelte-1hi2mz1"),v(O,"class","svelte-1hi2mz1"),v(L,"class","nome-jogador svelte-1hi2mz1"),Ce(H.src,ke=at)||v(H,"src",ke),v(H,"alt","robo representando inteligência artificial"),v(H,"class","svelte-1hi2mz1"),v(Q,"class","svelte-1hi2mz1"),v(i,"class","svelte-1hi2mz1"),v(t,"class","placar svelte-1hi2mz1")},m(k,$){I(k,t,$),h(t,n),h(n,o),h(o,r),h(n,l),h(n,f),h(f,u),h(f,s),h(f,w),h(w,d),h(w,_),h(n,y),h(n,m),h(t,a),h(t,g),S.m(g,null),h(t,P),h(t,i),h(i,p),h(i,F),h(i,L),h(L,R),h(L,ye),h(L,O),h(O,we),h(O,ue),h(i,Je),h(i,Q),h(Q,H),fe||(ze=Te(g,"click",e[4]),fe=!0)},p(k,[$]){$&1&&_e(_,k[0]),$&8&&X(m,"exibir",k[3]==C.Jogador1),W!==(W=Ae(k))&&(S.d(1),S=W(k),S&&(S.c(),S.m(g,null))),$&4&&X(g,"pararJogo",k[2]),$&8&&X(p,"exibir",k[3]==C.Jogador2IA),$&2&&_e(ue,k[1])},i:N,o:N,d(k){k&&E(t),S.d(),fe=!1,ze()}}}function dt(e,t,n){let{vitoriasJogador1:o=0}=t,{vitoriasJogador2IA:r=0}=t,{isJogoRunning:c=!1}=t,{turno:l=C.Parado}=t;const f=Oe();function u(){f("mudarEstado",{})}return e.$$set=s=>{"vitoriasJogador1"in s&&n(0,o=s.vitoriasJogador1),"vitoriasJogador2IA"in s&&n(1,r=s.vitoriasJogador2IA),"isJogoRunning"in s&&n(2,c=s.isJogoRunning),"turno"in s&&n(3,l=s.turno)},[o,r,c,l,u]}class ht extends ce{constructor(t){super(),ae(this,t,dt,ft,ie,{vitoriasJogador1:0,vitoriasJogador2IA:1,isJogoRunning:2,turno:3})}}const he={Branco:"#fff",Verde:"#5dd306",Vermelho:"#d30606"},pe={[T.SemJogador]:he.Branco,[T.Jogador1]:he.Verde,[T.Jogador2IA]:he.Vermelho};function je(e){let t;return{c(){t=V(e[2])},m(n,o){I(n,t,o)},p(n,o){o&4&&_e(t,n[2])},d(n){n&&E(t)}}}function gt(e){let t,n,o,r=e[4]&&je(e);return{c(){t=b("div"),r&&r.c(),J(t,"--posX",e[0]),J(t,"--posY",e[1]),J(t,"--stateColor",e[5]),v(t,"class","svelte-2mv14g"),X(t,"realce",e[3])},m(c,l){I(c,t,l),r&&r.m(t,null),n||(o=Te(t,"click",e[6]),n=!0)},p(c,[l]){c[4]?r?r.p(c,l):(r=je(c),r.c(),r.m(t,null)):r&&(r.d(1),r=null),l&1&&J(t,"--posX",c[0]),l&2&&J(t,"--posY",c[1]),l&32&&J(t,"--stateColor",c[5]),l&8&&X(t,"realce",c[3])},i:N,o:N,d(c){c&&E(t),r&&r.d(),n=!1,o()}}}function _t(e,t,n){const o=Oe();let{posX:r="0%"}=t,{posY:c="0%"}=t,{num:l=0}=t,{realce:f=!1}=t,{displayNumero:u=!1}=t,{corPeca:s=pe[T.SemJogador]}=t;function w(){o("clickPeca",{num:l,corPeca:s})}return e.$$set=d=>{"posX"in d&&n(0,r=d.posX),"posY"in d&&n(1,c=d.posY),"num"in d&&n(2,l=d.num),"realce"in d&&n(3,f=d.realce),"displayNumero"in d&&n(4,u=d.displayNumero),"corPeca"in d&&n(5,s=d.corPeca)},[r,c,l,f,u,s,w]}class mt extends ce{constructor(t){super(),ae(this,t,_t,gt,ie,{posX:0,posY:1,num:2,realce:3,displayNumero:4,corPeca:5})}}class Ne{constructor(){z(this,"jogador");z(this,"realce");this.init()}init(){this.realce=!1,this.jogador=T.SemJogador}ativaRealce(){this.realce=!0}desativaRealce(){this.realce=!1}}class Le{constructor(t){z(this,"_rodadaJogador");z(this,"_vitorias");z(this,"_id");this.resetarJogo(),this._vitorias=0,this._id=t}resetarJogo(){this._rodadaJogador=Ke.ColocarPecas}get rodadaJogador(){return this._rodadaJogador}get vitorias(){return this._vitorias}get id(){return this.id}}class vt{constructor(t,n){z(this,"grafo");z(this,"grafoEstado");z(this,"pecas");z(this,"jogadores");z(this,"_vitorias");z(this,"_numRodadas");z(this,"_turno");this.posicoesTotal=t,this.redrawn=n,this.pecas=new Array(t).fill(0).map(o=>new Ne),this.grafo=[[1,3],[0,2,9],[1,4],[0,5,11],[2,7,12],[3,6],[5,7,14],[4,6],[9,11],[1,8,10,17],[9,12],[3,8,13,19],[4,10,15,20],[11,14],[6,13,15,22],[12,14],[17,19],[9,16,18],[17,20],[11,16,21],[12,18,23],[19,22],[14,21,23],[20,22]],this.grafoEstado=new Array(t).fill(-1).map(o=>new Array(t).fill(oe.NaoUtilizada)),this._turno=C.Parado,this._vitorias=[0,0]}get turno(){return this._turno}get numRodadas(){return this._numRodadas}get isJogoRunning(){return this._turno!=C.Parado}get vitorias(){return this._vitorias}iniciarJogo(){this._numRodadas=0,this._turno=C.Jogador1,this.jogadores=[new Le(1),new Le(2)];for(let t=0;t<this.grafo.length;t++)for(const n of this.grafo[t])this.grafoEstado[t][n]=oe.Vazio;this.pecas=this.pecas.map(t=>new Ne),this.realcaTodasPecas()}realcaTodasPecas(){for(const t of this.pecas)t.ativaRealce();this.redrawn()}finalizaJogo(t){}cleanTabuleiro(){for(let t=0;t<this.grafo.length;t++)for(const n of this.grafo[t])this.grafoEstado[t][n]=oe.Vazio}mudarEstado(){return this._turno!=C.Parado?(this._turno=C.Parado,this.cleanTabuleiro(),!1):(this.iniciarJogo(),!0)}getProximaPosicoesMovimento(t){return null}}function Re(e,t,n){const o=e.slice();return o[15]=t[n],o}function Ve(e,t,n){const o=e.slice();return o[18]=t[n],o}function Se(e,t,n){const o=e.slice();return o[18]=t[n],o}function $e(e,t,n){const o=e.slice();return o[23]=t[n],o[25]=n,o}function Xe(e){let t,n;return t=new mt({props:{posX:e[23].x,posY:e[23].y,num:e[23].n,displayNumero:bt,realce:e[1][e[25]],corPeca:e[2][e[25]]}}),t.$on("clickPeca",e[6]),{c(){Pe(t.$$.fragment)},m(o,r){le(t,o,r),n=!0},p(o,r){const c={};r&2&&(c.realce=o[1][o[25]]),r&4&&(c.corPeca=o[2][o[25]]),t.$set(c)},i(o){n||(j(t.$$.fragment,o),n=!0)},o(o){D(t.$$.fragment,o),n=!1},d(o){se(t,o)}}}function Ye(e){let t,n,o=e[18],r=[];for(let l=0;l<o.length;l+=1)r[l]=Xe($e(e,o,l));const c=l=>D(r[l],1,1,()=>{r[l]=null});return{c(){for(let l=0;l<r.length;l+=1)r[l].c();t=xe()},m(l,f){for(let u=0;u<r.length;u+=1)r[u].m(l,f);I(l,t,f),n=!0},p(l,f){if(f&102){o=l[18];let u;for(u=0;u<o.length;u+=1){const s=$e(l,o,u);r[u]?(r[u].p(s,f),j(r[u],1)):(r[u]=Xe(s),r[u].c(),j(r[u],1),r[u].m(t.parentNode,t))}for(Ue(),u=o.length;u<r.length;u+=1)c(u);Ge()}},i(l){if(!n){for(let f=0;f<o.length;f+=1)j(r[f]);n=!0}},o(l){r=r.filter(Boolean);for(let f=0;f<r.length;f+=1)D(r[f]);n=!1},d(l){te(r,l),l&&E(t)}}}function Be(e){let t;return{c(){t=b("div"),v(t,"class","linha svelte-co0e2r"),J(t,"--lado",e[18].lado+"px"),J(t,"--dist",e[18].dist+"%"),J(t,"--borda",M+"px")},m(n,o){I(n,t,o)},p:N,d(n){n&&E(t)}}}function De(e){let t;return{c(){t=b("div"),v(t,"class","conectores svelte-co0e2r"),J(t,"--l",e[15].l),J(t,"--w",e[15].w),J(t,"--t",e[15].t),J(t,"--h",e[15].h),J(t,"--borda",M+"px")},m(n,o){I(n,t,o)},p:N,d(n){n&&E(t)}}}function pt(e){let t,n,o,r,c,l,f;t=new ht({props:{isJogoRunning:e[0].isJogoRunning,turno:e[0].turno,vitoriasJogador1:e[0].vitorias[0],vitoriasJogador2IA:e[0].vitorias[0]}}),t.$on("mudarEstado",e[7]);let u=e[5],s=[];for(let a=0;a<u.length;a+=1)s[a]=Ye(Se(e,u,a));const w=a=>D(s[a],1,1,()=>{s[a]=null});let d=e[4],_=[];for(let a=0;a<d.length;a+=1)_[a]=Be(Ve(e,d,a));let y=e[3],m=[];for(let a=0;a<y.length;a+=1)m[a]=De(Re(e,y,a));return{c(){Pe(t.$$.fragment),n=A(),o=b("div"),r=b("div");for(let a=0;a<s.length;a+=1)s[a].c();c=A();for(let a=0;a<_.length;a+=1)_[a].c();l=A();for(let a=0;a<m.length;a+=1)m[a].c();v(r,"class","tabuleiro svelte-co0e2r"),J(r,"--lado",be+"px"),v(o,"class","container-tabuleiro svelte-co0e2r")},m(a,g){le(t,a,g),I(a,n,g),I(a,o,g),h(o,r);for(let P=0;P<s.length;P+=1)s[P].m(r,null);h(r,c);for(let P=0;P<_.length;P+=1)_[P].m(r,null);h(r,l);for(let P=0;P<m.length;P+=1)m[P].m(r,null);f=!0},p(a,[g]){const P={};if(g&1&&(P.isJogoRunning=a[0].isJogoRunning),g&1&&(P.turno=a[0].turno),g&1&&(P.vitoriasJogador1=a[0].vitorias[0]),g&1&&(P.vitoriasJogador2IA=a[0].vitorias[0]),t.$set(P),g&102){u=a[5];let i;for(i=0;i<u.length;i+=1){const p=Se(a,u,i);s[i]?(s[i].p(p,g),j(s[i],1)):(s[i]=Ye(p),s[i].c(),j(s[i],1),s[i].m(r,c))}for(Ue(),i=u.length;i<s.length;i+=1)w(i);Ge()}if(g&16){d=a[4];let i;for(i=0;i<d.length;i+=1){const p=Ve(a,d,i);_[i]?_[i].p(p,g):(_[i]=Be(p),_[i].c(),_[i].m(r,l))}for(;i<_.length;i+=1)_[i].d(1);_.length=d.length}if(g&8){y=a[3];let i;for(i=0;i<y.length;i+=1){const p=Re(a,y,i);m[i]?m[i].p(p,g):(m[i]=De(p),m[i].c(),m[i].m(r,null))}for(;i<m.length;i+=1)m[i].d(1);m.length=y.length}},i(a){if(!f){j(t.$$.fragment,a);for(let g=0;g<u.length;g+=1)j(s[g]);f=!0}},o(a){D(t.$$.fragment,a),s=s.filter(Boolean);for(let g=0;g<s.length;g+=1)D(s[g]);f=!1},d(a){se(t,a),a&&E(n),a&&E(o),te(s,a),te(_,a),te(m,a)}}}const bt=!1,ge=3,M=8,ee=3,Y=24,be=500;function Pt(e,t,n){const o=Math.ceil(ge/2)-1,r=[0,12.5,25];let c=new Array(Y).fill(-1).map(i=>()=>{});function l(){n(0,f);for(let i=0;i<Y;i++)c[i]()}let f=new vt(Y,l);const u=[{l:`calc(50% - ${M/2}px)`,t:"0",w:`${M}px`,h:`${r[2]}%`},{l:`${100-r[2]}%`,t:`calc(50% - ${M/2}px)`,w:`${r[2]}%`,h:`${M}px`},{l:`calc(50% - ${M/2}px)`,t:`${100-r[2]}%`,w:`${M}px`,h:`${r[2]}%`},{l:"0",t:`calc(50% - ${M/2}px)`,w:`${r[2]}%`,h:`${M}px`}],s=[];for(let i=0;i<ee;i++)s.push({lado:be-be*(r[i]/100)*2,dist:r[i]});function w(i,p){return 50*i+(i==1?0:i<1?r[p]:-r[p])}let d=[];for(let i=0,p=0,F=0;i<ge*ee;i++){i!=0&&i%ee==0&&p++;const L=i%ee;d.push([]);for(let R=0;R<ge;R++)L==o&&R==o||(d[i].push({x:`${w(R,p)}%`,y:`${w(L,p)}%`,n:F,handler:f.pecas[F]}),F++)}const _=new Array(Y).fill(!1),y=new Array(Y).fill(pe[0]);function m(i){console.log("Peca clicada",i);const p=i.detail;n(2,y[p.num]=pe[f.turno],y)}function a(){for(let i=0;i<Y;i++)n(1,_[i]=!0,_)}function g(){for(let i=0;i<Y;i++)n(1,_[i]=!1,_)}function P(){f.mudarEstado()?a():g(),n(0,f)}return[f,_,y,u,s,d,m,P]}class yt extends ce{constructor(t){super(),ae(this,t,Pt,pt,ie,{})}}function wt(e){let t,n,o,r,c,l,f;return l=new yt({}),{c(){t=b("main"),n=b("h1"),n.textContent="Trilha-Inteligente!",o=A(),r=b("p"),r.innerHTML=`Jogo de <a href="http://www.tabuleirocriativo.com.br/post_trilha.html">Trilha</a> 
    utilizando busca competitiva <a href="https://en.wikipedia.org/wiki/Minimax">MinMax</a>, 
    e arvóre de decisão <a href="https://en.wikipedia.org/wiki/Markov_decision_process">MDP</a> 
    (Markov-Decision-Process).`,c=A(),Pe(l.$$.fragment),v(r,"class","svelte-8riicj")},m(u,s){I(u,t,s),h(t,n),h(t,o),h(t,r),h(t,c),le(l,t,null),f=!0},p:N,i(u){f||(j(l.$$.fragment,u),f=!0)},o(u){D(l.$$.fragment,u),f=!1},d(u){u&&E(t),se(l)}}}class Jt extends ce{constructor(t){super(),ae(this,t,null,wt,ie,{})}}new Jt({target:document.getElementById("app")});
