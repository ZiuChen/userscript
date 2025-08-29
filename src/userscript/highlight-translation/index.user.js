// ==UserScript==
// @name         划词翻译
// @namespace    https://github.com/ZiuChen/userscript
// @version      1.2.0
// @description  划词翻译，划词后按下 Ctrl/Command 即可展示翻译浮窗
// @author       ZiuChen
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNDg1NTg2IiBkPSJNMjAgNWgtOS4xMkwxMCAySDRhMiAyIDAgMCAwLTIgMnYxM2EyIDIgMCAwIDAgMiAyaDdsMSAzaDhhMiAyIDAgMCAwIDItMlY3YTIgMiAwIDAgMC0yLTJNNy4xNyAxNC41OWE0LjA5IDQuMDkgMCAwIDEtNC4wOS00LjA5YTQuMDkgNC4wOSAwIDAgMSA0LjA5LTQuMDljMS4wNCAwIDEuOTkuMzcgMi43NCAxLjA5bC4wOS4wNGwtMS4yNSAxLjE4bC0uMDYtLjA1Yy0uMjktLjI3LS43OC0uNTktMS41Mi0uNTljLTEuMzEgMC0yLjM4IDEuMDktMi4zOCAyLjQyczEuMDcgMi40MiAyLjM4IDIuNDJjMS4zNyAwIDEuOTYtLjg3IDIuMTItMS40Nkg3LjA4VjkuOTFoMy45NWwuMDEuMDljLjA0LjE5LjA1LjM4LjA1LjU5YzAgMi4zNS0xLjU5IDQtMy45MiA0bTYuMDMtMS43MWMuMzMuNjIuNzQgMS4xOCAxLjE5IDEuN2wtLjU0LjUzem0uNzctLjc2SDEzbC0uMzMtMS4wNGgzLjk5cy0uMzQgMS4zMS0xLjU2IDIuNzRjLS41Mi0uNjItLjg5LTEuMjMtMS4xMy0xLjdNMjEgMjBhMSAxIDAgMCAxLTEgMWgtN2wyLTJsLS44MS0yLjc3bC45Mi0uOTJMMTcuNzkgMThsLjcxLS43M2wtMi42OS0yLjY4Yy45LTEuMDMgMS42LTIuMjUgMS45Mi0zLjUxSDE5di0xLjA0aC0zLjY0VjloLTEuMDR2MS4wNGgtMS45NkwxMS4xOCA2SDIwYTEgMSAwIDAgMSAxIDF6Ii8+PC9zdmc+
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @connect      translate.googleapis.com
// @connect      translate.google.com
// @updateURL    https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/highlight-translation/index.user.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ZiuChen/userscript@main/src/userscript/highlight-translation/index.user.js
// ==/UserScript==
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=r(i);fetch(i.href,o)}})();const An="5";typeof window<"u"&&((window.__svelte??={}).v??=new Set).add(An);let ct=!1,Ln=!1;function Cn(){ct=!0}Cn();const Mn=1,$n=2,Pn=16,Nn=1,On=2,Rn=4,In=1,Dn=2,M=Symbol(),jn="http://www.w3.org/1999/xhtml",qn="@attach",xr=!1;var dt=Array.isArray,Fn=Array.prototype.indexOf,Dt=Array.from,Tt=Object.defineProperty,Fe=Object.getOwnPropertyDescriptor,Er=Object.getOwnPropertyDescriptors,Vn=Object.prototype,Un=Array.prototype,jt=Object.getPrototypeOf,Gt=Object.isExtensible;function zn(e){return typeof e=="function"}const fe=()=>{};function Kn(e){return e()}function At(e){for(var t=0;t<e.length;t++)e[t]()}function Bn(){var e,t,r=new Promise((n,i)=>{e=n,t=i});return{promise:r,resolve:e,reject:t}}const q=2,qt=4,vt=8,_e=16,te=32,ge=64,kr=128,K=256,rt=512,R=1024,B=2048,se=4096,W=8192,Ce=16384,pt=32768,Be=65536,Xt=1<<17,Hn=1<<18,He=1<<19,Sr=1<<20,Lt=1<<21,Ft=1<<22,ve=1<<23,ne=Symbol("$state"),Wn=Symbol(""),Vt=new class extends Error{name="StaleReactionError";message="The reaction that called `getAbortSignal()` was re-run or destroyed"};function Yn(){throw new Error("https://svelte.dev/e/await_outside_boundary")}function Gn(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function Xn(e){throw new Error("https://svelte.dev/e/effect_in_teardown")}function Jn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function Zn(e){throw new Error("https://svelte.dev/e/effect_orphan")}function Qn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function ei(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function ti(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function ri(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function ni(){console.warn("https://svelte.dev/e/select_multiple_invalid_value")}let ii=!1;function Tr(e){return e===this.v}function Ar(e,t){return e!=e?t==t:e!==t||e!==null&&typeof e=="object"||typeof e=="function"}function Lr(e){return!Ar(e,this.v)}let $=null;function nt(e){$=e}function Me(e,t=!1,r){$={p:$,c:null,e:null,s:e,x:null,l:ct&&!t?{s:null,u:null,$:[]}:null}}function $e(e){var t=$,r=t.e;if(r!==null){t.e=null;for(var n of r)Kr(n)}return $=t.p,{}}function We(){return!ct||$!==null&&$.l===null}const oi=new WeakMap;function ai(e){var t=x;if(t===null)return E.f|=ve,e;if((t.f&pt)===0){if((t.f&kr)===0)throw!t.parent&&e instanceof Error&&Cr(e),e;t.b.error(e)}else Ut(e,t)}function Ut(e,t){for(;t!==null;){if((t.f&kr)!==0)try{t.b.error(e);return}catch(r){e=r}t=t.parent}throw e instanceof Error&&Cr(e),e}function Cr(e){const t=oi.get(e);t&&(Tt(e,"message",{value:t.message}),Tt(e,"stack",{value:t.stack}))}let it=[];function si(){var e=it;it=[],At(e)}function ht(e){it.length===0&&queueMicrotask(si),it.push(e)}function ui(){for(var e=x.b;e!==null&&!e.has_pending_snippet();)e=e.parent;return e===null&&Yn(),e}function _t(e){var t=q|B,r=E!==null&&(E.f&q)!==0?E:null;return x===null||r!==null&&(r.f&K)!==0?t|=K:x.f|=He,{ctx:$,deps:null,effects:null,equals:Tr,f:t,fn:e,reactions:null,rv:0,v:M,wv:0,parent:r??x,ac:null}}function li(e,t){let r=x;r===null&&Gn();var n=r.b,i=void 0,o=ze(M),a=null,u=!E;return xi(()=>{try{var s=e()}catch(f){s=Promise.reject(f)}var l=()=>s;i=a?.then(l,l)??Promise.resolve(s),a=i;var d=N,h=n.pending;u&&(n.update_pending_count(1),h||d.increment());const v=(f,c=void 0)=>{a=null,h||d.activate(),c?c!==Vt&&(o.f|=ve,st(o,c)):((o.f&ve)!==0&&(o.f^=ve),st(o,f)),u&&(n.update_pending_count(-1),h||d.decrement()),Nr()};if(i.then(v,f=>v(null,f||"unknown")),d)return()=>{queueMicrotask(()=>d.neuter())}}),new Promise(s=>{function l(d){function h(){d===i?s(o):l(i)}d.then(h,h)}l(i)})}function fi(e){const t=_t(e);return Jr(t),t}function ot(e){const t=_t(e);return t.equals=Lr,t}function Mr(e){var t=e.effects;if(t!==null){e.effects=null;for(var r=0;r<t.length;r+=1)F(t[r])}}function ci(e){for(var t=e.parent;t!==null;){if((t.f&q)===0)return t;t=t.parent}return null}function zt(e){var t,r=x;ae(ci(e));try{Mr(e),t=tn(e)}finally{ae(r)}return t}function $r(e){var t=zt(e);if(e.equals(t)||(e.v=t,e.wv=Qr()),!Ne)if(Se!==null)Se.set(e,e.v);else{var r=(re||(e.f&K)!==0)&&e.deps!==null?se:R;D(e,r)}}function Pr(e,t,r){const n=We()?_t:ot;if(t.length===0){r(e.map(n));return}var i=N,o=x,a=di(),u=ui();Promise.all(t.map(s=>li(s))).then(s=>{i?.activate(),a();try{r([...e.map(n),...s])}catch(l){(o.f&Ce)===0&&Ut(l,o)}i?.deactivate(),Nr()}).catch(s=>{u.error(s)})}function di(){var e=x,t=E,r=$;return function(){ae(e),X(t),nt(r)}}function Nr(){ae(null),X(null),nt(null)}const Ie=new Set;let N=null,Se=null,Jt=new Set,at=[];function Or(){const e=at.shift();at.length>0&&queueMicrotask(Or),e()}let Ue=[],Kt=null,Ct=!1;class Te{current=new Map;#i=new Map;#o=new Set;#e=0;#l=null;#f=!1;#r=[];#a=[];#n=[];#t=[];#s=[];#c=[];#d=[];skipped_effects=new Set;process(t){Ue=[];var r=null;if(Ie.size>1){r=new Map,Se=new Map;for(const[o,a]of this.current)r.set(o,{v:o.v,wv:o.wv}),o.v=a;for(const o of Ie)if(o!==this)for(const[a,u]of o.#i)r.has(a)||(r.set(a,{v:a.v,wv:a.wv}),a.v=u)}for(const o of t)this.#p(o);if(this.#r.length===0&&this.#e===0){this.#v();var n=this.#n,i=this.#t;this.#n=[],this.#t=[],this.#s=[],N=null,Zt(n),Zt(i),N===null?N=this:Ie.delete(this),this.#l?.resolve()}else this.#u(this.#n),this.#u(this.#t),this.#u(this.#s);if(r){for(const[o,{v:a,wv:u}]of r)o.wv<=u&&(o.v=a);Se=null}for(const o of this.#r)ke(o);for(const o of this.#a)ke(o);this.#r=[],this.#a=[]}#p(t){t.f^=R;for(var r=t.first;r!==null;){var n=r.f,i=(n&(te|ge))!==0,o=i&&(n&R)!==0,a=o||(n&W)!==0||this.skipped_effects.has(r);if(!a&&r.fn!==null){if(i)r.f^=R;else if((n&qt)!==0)this.#t.push(r);else if((n&R)===0)if((n&Ft)!==0){var u=r.b?.pending?this.#a:this.#r;u.push(r)}else yt(r)&&((r.f&_e)!==0&&this.#s.push(r),ke(r));var s=r.first;if(s!==null){r=s;continue}}var l=r.parent;for(r=r.next;r===null&&l!==null;)r=l.next,l=l.parent}}#u(t){for(const r of t)((r.f&B)!==0?this.#c:this.#d).push(r),D(r,R);t.length=0}capture(t,r){this.#i.has(t)||this.#i.set(t,r),this.current.set(t,t.v)}activate(){N=this}deactivate(){N=null;for(const t of Jt)if(Jt.delete(t),t(),N!==null)break}neuter(){this.#f=!0}flush(){Ue.length>0?vi():this.#v(),N===this&&(this.#e===0&&Ie.delete(this),this.deactivate())}#v(){if(!this.#f)for(const t of this.#o)t();this.#o.clear()}increment(){this.#e+=1}decrement(){if(this.#e-=1,this.#e===0){for(const t of this.#c)D(t,B),Ae(t);for(const t of this.#d)D(t,se),Ae(t);this.#n=[],this.#t=[],this.flush()}else this.deactivate()}add_callback(t){this.#o.add(t)}settled(){return(this.#l??=Bn()).promise}static ensure(){if(N===null){const t=N=new Te;Ie.add(N),Te.enqueue(()=>{N===t&&t.flush()})}return N}static enqueue(t){at.length===0&&queueMicrotask(Or),at.unshift(t)}}function vi(){var e=Ee;Ct=!0;try{var t=0;for(tr(!0);Ue.length>0;){var r=Te.ensure();if(t++>1e3){var n,i;pi()}r.process(Ue),ie.clear()}}finally{Ct=!1,tr(e),Kt=null}}function pi(){try{Qn()}catch(e){Ut(e,Kt)}}let ce=null;function Zt(e){var t=e.length;if(t!==0){for(var r=0;r<t;){var n=e[r++];if((n.f&(Ce|W))===0&&yt(n)&&(ce=[],ke(n),n.deps===null&&n.first===null&&n.nodes_start===null&&(n.teardown===null&&n.ac===null?Yr(n):n.fn=null),ce.length>0)){ie.clear();for(const i of ce)ke(i);ce=[]}}ce=null}}function Ae(e){for(var t=Kt=e;t.parent!==null;){t=t.parent;var r=t.f;if(Ct&&t===x&&(r&_e)!==0)return;if((r&(ge|te))!==0){if((r&R)===0)return;t.f^=R}}Ue.push(t)}const ie=new Map;function ze(e,t){var r={f:0,v:e,reactions:null,equals:Tr,rv:0,wv:0};return r}function U(e,t){const r=ze(e);return Jr(r),r}function Rr(e,t=!1,r=!0){const n=ze(e);return t||(n.equals=Lr),ct&&r&&$!==null&&$.l!==null&&($.l.s??=[]).push(n),n}function O(e,t,r=!1){E!==null&&(!G||(E.f&Xt)!==0)&&We()&&(E.f&(q|_e|Ft|Xt))!==0&&!ee?.includes(e)&&ri();let n=r?we(t):t;return st(e,n)}function st(e,t){if(!e.equals(t)){var r=e.v;Ne?ie.set(e,t):ie.set(e,r),e.v=t;var n=Te.ensure();n.capture(e,r),(e.f&q)!==0&&((e.f&B)!==0&&zt(e),D(e,(e.f&K)===0?R:se)),e.wv=Qr(),Ir(e,B),We()&&x!==null&&(x.f&R)!==0&&(x.f&(te|ge))===0&&(V===null?Si([e]):V.push(e))}return t}function wt(e){O(e,e.v+1)}function Ir(e,t){var r=e.reactions;if(r!==null)for(var n=We(),i=r.length,o=0;o<i;o++){var a=r[o],u=a.f;if(!(!n&&a===x)){var s=(u&B)===0;s&&D(a,t),(u&q)!==0?Ir(a,se):s&&((u&_e)!==0&&ce!==null&&ce.push(a),Ae(a))}}}function we(e){if(typeof e!="object"||e===null||ne in e)return e;const t=jt(e);if(t!==Vn&&t!==Un)return e;var r=new Map,n=dt(e),i=U(0),o=pe,a=u=>{if(pe===o)return u();var s=E,l=pe;X(null),nr(o);var d=u();return X(s),nr(l),d};return n&&r.set("length",U(e.length)),new Proxy(e,{defineProperty(u,s,l){(!("value"in l)||l.configurable===!1||l.enumerable===!1||l.writable===!1)&&ei();var d=r.get(s);return d===void 0?d=a(()=>{var h=U(l.value);return r.set(s,h),h}):O(d,l.value,!0),!0},deleteProperty(u,s){var l=r.get(s);if(l===void 0){if(s in u){const d=a(()=>U(M));r.set(s,d),wt(i)}}else O(l,M),wt(i);return!0},get(u,s,l){if(s===ne)return e;var d=r.get(s),h=s in u;if(d===void 0&&(!h||Fe(u,s)?.writable)&&(d=a(()=>{var f=we(h?u[s]:M),c=U(f);return c}),r.set(s,d)),d!==void 0){var v=T(d);return v===M?void 0:v}return Reflect.get(u,s,l)},getOwnPropertyDescriptor(u,s){var l=Reflect.getOwnPropertyDescriptor(u,s);if(l&&"value"in l){var d=r.get(s);d&&(l.value=T(d))}else if(l===void 0){var h=r.get(s),v=h?.v;if(h!==void 0&&v!==M)return{enumerable:!0,configurable:!0,value:v,writable:!0}}return l},has(u,s){if(s===ne)return!0;var l=r.get(s),d=l!==void 0&&l.v!==M||Reflect.has(u,s);if(l!==void 0||x!==null&&(!d||Fe(u,s)?.writable)){l===void 0&&(l=a(()=>{var v=d?we(u[s]):M,f=U(v);return f}),r.set(s,l));var h=T(l);if(h===M)return!1}return d},set(u,s,l,d){var h=r.get(s),v=s in u;if(n&&s==="length")for(var f=l;f<h.v;f+=1){var c=r.get(f+"");c!==void 0?O(c,M):f in u&&(c=a(()=>U(M)),r.set(f+"",c))}if(h===void 0)(!v||Fe(u,s)?.writable)&&(h=a(()=>U(void 0)),O(h,we(l)),r.set(s,h));else{v=h.v!==M;var p=a(()=>we(l));O(h,p)}var _=Reflect.getOwnPropertyDescriptor(u,s);if(_?.set&&_.set.call(d,l),!v){if(n&&typeof s=="string"){var w=r.get("length"),b=Number(s);Number.isInteger(b)&&b>=w.v&&O(w,b+1)}wt(i)}return!0},ownKeys(u){T(i);var s=Reflect.ownKeys(u).filter(h=>{var v=r.get(h);return v===void 0||v.v!==M});for(var[l,d]of r)d.v!==M&&!(l in u)&&s.push(l);return s},setPrototypeOf(){ti()}})}function Qt(e){try{if(e!==null&&typeof e=="object"&&ne in e)return e[ne]}catch{}return e}function hi(e,t){return Object.is(Qt(e),Qt(t))}var er,Dr,jr,qr,Fr;function _i(){if(er===void 0){er=window,Dr=document,jr=/Firefox/.test(navigator.userAgent);var e=Element.prototype,t=Node.prototype,r=Text.prototype;qr=Fe(t,"firstChild").get,Fr=Fe(t,"nextSibling").get,Gt(e)&&(e.__click=void 0,e.__className=void 0,e.__attributes=null,e.__style=void 0,e.__e=void 0),Gt(r)&&(r.__t=void 0)}}function Ye(e=""){return document.createTextNode(e)}function Le(e){return qr.call(e)}function gt(e){return Fr.call(e)}function z(e,t){return Le(e)}function Ve(e,t){{var r=Le(e);return r instanceof Comment&&r.data===""?gt(r):r}}function he(e,t=1,r=!1){let n=e;for(;t--;)n=gt(n);return n}function gi(e){e.textContent=""}function Vr(){return!1}function yi(e,t){if(t){const r=document.body;e.autofocus=!0,ht(()=>{document.activeElement===r&&e.focus()})}}function Ge(e){var t=E,r=x;X(null),ae(null);try{return e()}finally{X(t),ae(r)}}function Ur(e){x===null&&E===null&&Zn(),E!==null&&(E.f&K)!==0&&x===null&&Jn(),Ne&&Xn()}function bi(e,t){var r=t.last;r===null?t.last=t.first=e:(r.next=e,e.prev=r,t.last=e)}function J(e,t,r,n=!0){var i=x;i!==null&&(i.f&W)!==0&&(e|=W);var o={ctx:$,deps:null,nodes_start:null,nodes_end:null,f:e|B,first:null,fn:t,last:null,next:null,parent:i,b:i&&i.b,prev:null,teardown:null,transitions:null,wv:0,ac:null};if(r)try{ke(o),o.f|=pt}catch(s){throw F(o),s}else t!==null&&Ae(o);if(n){var a=o;if(r&&a.deps===null&&a.teardown===null&&a.nodes_start===null&&a.first===a.last&&(a.f&He)===0&&(a=a.first),a!==null&&(a.parent=i,i!==null&&bi(a,i),E!==null&&(E.f&q)!==0&&(e&ge)===0)){var u=E;(u.effects??=[]).push(a)}}return o}function zr(e){const t=J(vt,null,!1);return D(t,R),t.teardown=e,t}function Mt(e){Ur();var t=x.f,r=!E&&(t&te)!==0&&(t&pt)===0;if(r){var n=$;(n.e??=[]).push(e)}else return Kr(e)}function Kr(e){return J(qt|Sr,e,!1)}function mi(e){return Ur(),J(vt|Sr,e,!0)}function wi(e){Te.ensure();const t=J(ge|He,e,!0);return(r={})=>new Promise(n=>{r.outro?Bt(t,()=>{F(t),n(void 0)}):(F(t),n(void 0))})}function Pe(e){return J(qt,e,!1)}function xi(e){return J(Ft|He,e,!0)}function Br(e,t=0){return J(vt|t,e,!0)}function ut(e,t=[],r=[]){Pr(t,r,n=>{J(vt,()=>e(...n.map(T)),!0)})}function Xe(e,t=0){var r=J(_e|t,e,!0);return r}function oe(e,t=!0){return J(te|He,e,!0,t)}function Hr(e){var t=e.teardown;if(t!==null){const r=Ne,n=E;rr(!0),X(null);try{t.call(null)}finally{rr(r),X(n)}}}function Wr(e,t=!1){var r=e.first;for(e.first=e.last=null;r!==null;){const i=r.ac;i!==null&&Ge(()=>{i.abort(Vt)});var n=r.next;(r.f&ge)!==0?r.parent=null:F(r,t),r=n}}function Ei(e){for(var t=e.first;t!==null;){var r=t.next;(t.f&te)===0&&F(t),t=r}}function F(e,t=!0){var r=!1;(t||(e.f&Hn)!==0)&&e.nodes_start!==null&&e.nodes_end!==null&&(ki(e.nodes_start,e.nodes_end),r=!0),Wr(e,t&&!r),lt(e,0),D(e,Ce);var n=e.transitions;if(n!==null)for(const o of n)o.stop();Hr(e);var i=e.parent;i!==null&&i.first!==null&&Yr(e),e.next=e.prev=e.teardown=e.ctx=e.deps=e.fn=e.nodes_start=e.nodes_end=e.ac=null}function ki(e,t){for(;e!==null;){var r=e===t?null:gt(e);e.remove(),e=r}}function Yr(e){var t=e.parent,r=e.prev,n=e.next;r!==null&&(r.next=n),n!==null&&(n.prev=r),t!==null&&(t.first===e&&(t.first=n),t.last===e&&(t.last=r))}function Bt(e,t){var r=[];Ht(e,r,!0),Gr(r,()=>{F(e),t&&t()})}function Gr(e,t){var r=e.length;if(r>0){var n=()=>--r||t();for(var i of e)i.out(n)}else t()}function Ht(e,t,r){if((e.f&W)===0){if(e.f^=W,e.transitions!==null)for(const a of e.transitions)(a.is_global||r)&&t.push(a);for(var n=e.first;n!==null;){var i=n.next,o=(n.f&Be)!==0||(n.f&te)!==0;Ht(n,t,o?r:!1),n=i}}}function Wt(e){Xr(e,!0)}function Xr(e,t){if((e.f&W)!==0){e.f^=W,(e.f&R)===0&&(D(e,B),Ae(e));for(var r=e.first;r!==null;){var n=r.next,i=(r.f&Be)!==0||(r.f&te)!==0;Xr(r,i?t:!1),r=n}if(e.transitions!==null)for(const o of e.transitions)(o.is_global||t)&&o.in()}}let Ee=!1;function tr(e){Ee=e}let Ne=!1;function rr(e){Ne=e}let E=null,G=!1;function X(e){E=e}let x=null;function ae(e){x=e}let ee=null;function Jr(e){E!==null&&(ee===null?ee=[e]:ee.push(e))}let I=null,j=0,V=null;function Si(e){V=e}let Zr=1,Ke=0,pe=Ke;function nr(e){pe=e}let re=!1;function Qr(){return++Zr}function yt(e){var t=e.f;if((t&B)!==0)return!0;if((t&se)!==0){var r=e.deps,n=(t&K)!==0;if(r!==null){var i,o,a=(t&rt)!==0,u=n&&x!==null&&!re,s=r.length;if((a||u)&&(x===null||(x.f&Ce)===0)){var l=e,d=l.parent;for(i=0;i<s;i++)o=r[i],(a||!o?.reactions?.includes(l))&&(o.reactions??=[]).push(l);a&&(l.f^=rt),u&&d!==null&&(d.f&K)===0&&(l.f^=K)}for(i=0;i<s;i++)if(o=r[i],yt(o)&&$r(o),o.wv>e.wv)return!0}(!n||x!==null&&!re)&&D(e,R)}return!1}function en(e,t,r=!0){var n=e.reactions;if(n!==null&&!ee?.includes(e))for(var i=0;i<n.length;i++){var o=n[i];(o.f&q)!==0?en(o,t,!1):t===o&&(r?D(o,B):(o.f&R)!==0&&D(o,se),Ae(o))}}function tn(e){var t=I,r=j,n=V,i=E,o=re,a=ee,u=$,s=G,l=pe,d=e.f;I=null,j=0,V=null,re=(d&K)!==0&&(G||!Ee||E===null),E=(d&(te|ge))===0?e:null,ee=null,nt(e.ctx),G=!1,pe=++Ke,e.ac!==null&&(Ge(()=>{e.ac.abort(Vt)}),e.ac=null);try{e.f|=Lt;var h=e.fn,v=h(),f=e.deps;if(I!==null){var c;if(lt(e,j),f!==null&&j>0)for(f.length=j+I.length,c=0;c<I.length;c++)f[j+c]=I[c];else e.deps=f=I;if(!re||(d&q)!==0&&e.reactions!==null)for(c=j;c<f.length;c++)(f[c].reactions??=[]).push(e)}else f!==null&&j<f.length&&(lt(e,j),f.length=j);if(We()&&V!==null&&!G&&f!==null&&(e.f&(q|se|B))===0)for(c=0;c<V.length;c++)en(V[c],e);return i!==null&&i!==e&&(Ke++,V!==null&&(n===null?n=V:n.push(...V))),(e.f&ve)!==0&&(e.f^=ve),v}catch(p){return ai(p)}finally{e.f^=Lt,I=t,j=r,V=n,E=i,re=o,ee=a,nt(u),G=s,pe=l}}function Ti(e,t){let r=t.reactions;if(r!==null){var n=Fn.call(r,e);if(n!==-1){var i=r.length-1;i===0?r=t.reactions=null:(r[n]=r[i],r.pop())}}r===null&&(t.f&q)!==0&&(I===null||!I.includes(t))&&(D(t,se),(t.f&(K|rt))===0&&(t.f^=rt),Mr(t),lt(t,0))}function lt(e,t){var r=e.deps;if(r!==null)for(var n=t;n<r.length;n++)Ti(e,r[n])}function ke(e){var t=e.f;if((t&Ce)===0){D(e,R);var r=x,n=Ee;x=e,Ee=!0;try{(t&_e)!==0?Ei(e):Wr(e),Hr(e);var i=tn(e);e.teardown=typeof i=="function"?i:null,e.wv=Zr;var o;xr&&Ln&&(e.f&B)!==0&&e.deps}finally{Ee=n,x=r}}}function T(e){var t=e.f,r=(t&q)!==0;if(E!==null&&!G){var n=x!==null&&(x.f&Ce)!==0;if(!n&&!ee?.includes(e)){var i=E.deps;if((E.f&Lt)!==0)e.rv<Ke&&(e.rv=Ke,I===null&&i!==null&&i[j]===e?j++:I===null?I=[e]:(!re||!I.includes(e))&&I.push(e));else{(E.deps??=[]).push(e);var o=e.reactions;o===null?e.reactions=[E]:o.includes(E)||o.push(E)}}}else if(r&&e.deps===null&&e.effects===null){var a=e,u=a.parent;u!==null&&(u.f&K)===0&&(a.f^=K)}if(Ne){if(ie.has(e))return ie.get(e);if(r){a=e;var s=a.v;return((a.f&R)===0&&a.reactions!==null||rn(a))&&(s=zt(a)),ie.set(a,s),s}}else if(r){if(a=e,Se?.has(a))return Se.get(a);yt(a)&&$r(a)}if((e.f&ve)!==0)throw e.v;return e.v}function rn(e){if(e.v===M)return!0;if(e.deps===null)return!1;for(const t of e.deps)if(ie.has(t)||(t.f&q)!==0&&rn(t))return!0;return!1}function bt(e){var t=G;try{return G=!0,e()}finally{G=t}}const Ai=-7169;function D(e,t){e.f=e.f&Ai|t}function nn(e){if(!(typeof e!="object"||!e||e instanceof EventTarget)){if(ne in e)$t(e);else if(!Array.isArray(e))for(let t in e){const r=e[t];typeof r=="object"&&r&&ne in r&&$t(r)}}}function $t(e,t=new Set){if(typeof e=="object"&&e!==null&&!(e instanceof EventTarget)&&!t.has(e)){t.add(e),e instanceof Date&&e.getTime();for(let n in e)try{$t(e[n],t)}catch{}const r=jt(e);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const n=Er(r);for(let i in n){const o=n[i].get;if(o)try{o.call(e)}catch{}}}}}const on=new Set,Pt=new Set;function an(e,t,r,n={}){function i(o){if(n.capture||qe.call(t,o),!o.cancelBubble)return Ge(()=>r?.call(this,o))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?ht(()=>{t.addEventListener(e,i,n)}):t.addEventListener(e,i,n),i}function xt(e,t,r,n,i){var o={capture:n,passive:i},a=an(e,t,r,o);(t===document.body||t===window||t===document||t instanceof HTMLMediaElement)&&zr(()=>{t.removeEventListener(e,a,o)})}function sn(e){for(var t=0;t<e.length;t++)on.add(e[t]);for(var r of Pt)r(e)}let ir=null;function qe(e){var t=this,r=t.ownerDocument,n=e.type,i=e.composedPath?.()||[],o=i[0]||e.target;ir=e;var a=0,u=ir===e&&e.__root;if(u){var s=i.indexOf(u);if(s!==-1&&(t===document||t===window)){e.__root=t;return}var l=i.indexOf(t);if(l===-1)return;s<=l&&(a=s)}if(o=i[a]||e.target,o!==t){Tt(e,"currentTarget",{configurable:!0,get(){return o||r}});var d=E,h=x;X(null),ae(null);try{for(var v,f=[];o!==null;){var c=o.assignedSlot||o.parentNode||o.host||null;try{var p=o["__"+n];if(p!=null&&(!o.disabled||e.target===o))if(dt(p)){var[_,...w]=p;_.apply(o,[e,...w])}else p.call(o,e)}catch(b){v?f.push(b):v=b}if(e.cancelBubble||c===t||c===null)break;o=c}if(v){for(let b of f)queueMicrotask(()=>{throw b});throw v}}finally{e.__root=t,delete e.currentTarget,X(d),ae(h)}}}function un(e){var t=document.createElement("template");return t.innerHTML=e.replaceAll("<!>","<!---->"),t.content}function ft(e,t){var r=x;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function H(e,t){var r=(t&In)!==0,n=(t&Dn)!==0,i,o=!e.startsWith("<!>");return()=>{i===void 0&&(i=un(o?e:"<!>"+e),r||(i=Le(i)));var a=n||jr?document.importNode(i,!0):i.cloneNode(!0);if(r){var u=Le(a),s=a.lastChild;ft(u,s)}else ft(a,a);return a}}function Li(e,t,r="svg"){var n=!e.startsWith("<!>"),i=`<${r}>${n?e:"<!>"+e}</${r}>`,o;return()=>{if(!o){var a=un(i),u=Le(a);o=Le(u)}var s=o.cloneNode(!0);return ft(s,s),s}}function Je(e,t){return Li(e,t,"svg")}function tt(){var e=document.createDocumentFragment(),t=document.createComment(""),r=Ye();return e.append(t,r),ft(t,r),e}function L(e,t){e!==null&&e.before(t)}function Ci(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const Mi=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function $i(e){return Mi.includes(e)}const Pi={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",defaultvalue:"defaultValue",defaultchecked:"defaultChecked",srcobject:"srcObject",novalidate:"noValidate",allowfullscreen:"allowFullscreen",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback"};function Ni(e){return e=e.toLowerCase(),Pi[e]??e}const Oi=["touchstart","touchmove"];function Ri(e){return Oi.includes(e)}let Nt=!0;function or(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??=e.nodeValue)&&(e.__t=r,e.nodeValue=r+"")}function Ii(e,t){return Di(e,t)}const be=new Map;function Di(e,{target:t,anchor:r,props:n={},events:i,context:o,intro:a=!0}){_i();var u=new Set,s=h=>{for(var v=0;v<h.length;v++){var f=h[v];if(!u.has(f)){u.add(f);var c=Ri(f);t.addEventListener(f,qe,{passive:c});var p=be.get(f);p===void 0?(document.addEventListener(f,qe,{passive:c}),be.set(f,1)):be.set(f,p+1)}}};s(Dt(on)),Pt.add(s);var l=void 0,d=wi(()=>{var h=r??t.appendChild(Ye());return oe(()=>{if(o){Me({});var v=$;v.c=o}i&&(n.$$events=i),Nt=a,l=e(h,n)||{},Nt=!0,o&&$e()}),()=>{for(var v of u){t.removeEventListener(v,qe);var f=be.get(v);--f===0?(document.removeEventListener(v,qe),be.delete(v)):be.set(v,f)}Pt.delete(s),h!==r&&h.parentNode?.removeChild(h)}});return ji.set(l,d),l}let ji=new WeakMap;function qi(e,t,...r){var n=e,i=fe,o;Xe(()=>{i!==(i=t())&&(o&&(F(o),o=null),o=oe(()=>i(n,...r)))},Be)}function de(e,t,r=!1){var n=e,i=null,o=null,a=M,u=r?Be:0,s=!1;const l=(f,c=!0)=>{s=!0,v(c,f)};var d=null;function h(){d!==null&&(d.lastChild.remove(),n.before(d),d=null);var f=a?i:o,c=a?o:i;f&&Wt(f),c&&Bt(c,()=>{a?o=null:i=null})}const v=(f,c)=>{if(a!==(a=f)){var p=Vr(),_=n;if(p&&(d=document.createDocumentFragment(),d.append(_=Ye())),a?i??=c&&oe(()=>c(_)):o??=c&&oe(()=>c(_)),p){var w=N,b=a?i:o,g=a?o:i;b&&w.skipped_effects.delete(b),g&&w.skipped_effects.add(g),w.add_callback(h)}else h()}};Xe(()=>{s=!1,t(l),s||v(null,null)},u)}function ln(e,t){return t}function Fi(e,t,r){for(var n=e.items,i=[],o=t.length,a=0;a<o;a++)Ht(t[a].e,i,!0);var u=o>0&&i.length===0&&r!==null;if(u){var s=r.parentNode;gi(s),s.append(r),n.clear(),Y(e,t[0].prev,t[o-1].next)}Gr(i,()=>{for(var l=0;l<o;l++){var d=t[l];u||(n.delete(d.k),Y(e,d.prev,d.next)),F(d.e,!u)}})}function fn(e,t,r,n,i,o=null){var a=e,u={flags:t,items:new Map,first:null};{var s=e;a=s.appendChild(Ye())}var l=null,d=!1,h=new Map,v=ot(()=>{var _=r();return dt(_)?_:_==null?[]:Dt(_)}),f,c;function p(){Vi(c,f,u,h,a,i,t,n,r),o!==null&&(f.length===0?l?Wt(l):l=oe(()=>o(a)):l!==null&&Bt(l,()=>{l=null}))}Xe(()=>{c??=x,f=T(v);var _=f.length;if(!(d&&_===0)){d=_===0;var w,b,g,y;if(Vr()){var m=new Set,S=N;for(b=0;b<_;b+=1){g=f[b],y=n(g,b);var A=u.items.get(y)??h.get(y);A?cn(A,g,b):(w=dn(null,u,null,null,g,y,b,i,t,r,!0),h.set(y,w)),m.add(y)}for(const[P,C]of u.items)m.has(P)||S.skipped_effects.add(C.e);S.add_callback(p)}else p();T(v)}})}function Vi(e,t,r,n,i,o,a,u,s){var l=t.length,d=r.items,h=r.first,v=h,f,c=null,p=[],_=[],w,b,g,y;for(y=0;y<l;y+=1){if(w=t[y],b=u(w,y),g=d.get(b),g===void 0){var m=n.get(b);if(m!==void 0){n.delete(b),d.set(b,m);var S=c?c.next:v;Y(r,c,m),Y(r,m,S),Et(m,S,i),c=m}else{var A=v?v.e.nodes_start:i;c=dn(A,r,c,c===null?r.first:c.next,w,b,y,o,a,s)}d.set(b,c),p=[],_=[],v=c.next;continue}if(cn(g,w,y),(g.e.f&W)!==0&&Wt(g.e),g!==v){if(f!==void 0&&f.has(g)){if(p.length<_.length){var P=_[0],C;c=P.prev;var Qe=p[0],Re=p[p.length-1];for(C=0;C<p.length;C+=1)Et(p[C],P,i);for(C=0;C<_.length;C+=1)f.delete(_[C]);Y(r,Qe.prev,Re.next),Y(r,c,Qe),Y(r,Re,P),v=P,c=Re,y-=1,p=[],_=[]}else f.delete(g),Et(g,v,i),Y(r,g.prev,g.next),Y(r,g,c===null?r.first:c.next),Y(r,c,g),c=g;continue}for(p=[],_=[];v!==null&&v.k!==b;)(v.e.f&W)===0&&(f??=new Set).add(v),_.push(v),v=v.next;if(v===null)continue;g=v}p.push(g),c=g,v=g.next}if(v!==null||f!==void 0){for(var ye=f===void 0?[]:Dt(f);v!==null;)(v.e.f&W)===0&&ye.push(v),v=v.next;var mt=ye.length;if(mt>0){var Sn=l===0?i:null;Fi(r,ye,Sn)}}e.first=r.first&&r.first.e,e.last=c&&c.e;for(var Tn of n.values())F(Tn.e);n.clear()}function cn(e,t,r,n){st(e.v,t),e.i=r}function dn(e,t,r,n,i,o,a,u,s,l,d){var h=(s&Mn)!==0,v=(s&Pn)===0,f=h?v?Rr(i,!1,!1):ze(i):i,c=(s&$n)===0?a:ze(a),p={i:c,v:f,k:o,a:null,e:null,prev:r,next:n};try{if(e===null){var _=document.createDocumentFragment();_.append(e=Ye())}return p.e=oe(()=>u(e,f,c,l),ii),p.e.prev=r&&r.e,p.e.next=n&&n.e,r===null?d||(t.first=p):(r.next=p,r.e.next=p.e),n!==null&&(n.prev=p,n.e.prev=p.e),p}finally{}}function Et(e,t,r){for(var n=e.next?e.next.e.nodes_start:r,i=t?t.e.nodes_start:r,o=e.e.nodes_start;o!==null&&o!==n;){var a=gt(o);i.before(o),o=a}}function Y(e,t,r){t===null?e.first=r:(t.next=r,t.e.next=r&&r.e),r!==null&&(r.prev=t,r.e.prev=t&&t.e)}function Oe(e,t){Pe(()=>{var r=e.getRootNode(),n=r.host?r:r.head??r.ownerDocument.head;if(!n.querySelector("#"+t.hash)){const i=document.createElement("style");i.id=t.hash,i.textContent=t.code,n.appendChild(i)}})}function ar(e,t,r){Pe(()=>{var n=bt(()=>t(e,r?.())||{});if(r&&n?.update){var i=!1,o={};Br(()=>{var a=r();nn(a),i&&Ar(o,a)&&(o=a,n.update(a))}),i=!0}if(n?.destroy)return()=>n.destroy()})}function Ui(e,t){var r=void 0,n;Xe(()=>{r!==(r=t())&&(n&&(F(n),n=null),r&&(n=oe(()=>{Pe(()=>r(e))})))})}function vn(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(r=vn(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function zi(){for(var e,t,r=0,n="",i=arguments.length;r<i;r++)(e=arguments[r])&&(t=vn(e))&&(n&&(n+=" "),n+=t);return n}function pn(e){return typeof e=="object"?zi(e):e??""}const sr=[...` 	
\r\f \v\uFEFF`];function Ki(e,t,r){var n=e==null?"":""+e;if(t&&(n=n?n+" "+t:t),r){for(var i in r)if(r[i])n=n?n+" "+i:i;else if(n.length)for(var o=i.length,a=0;(a=n.indexOf(i,a))>=0;){var u=a+o;(a===0||sr.includes(n[a-1]))&&(u===n.length||sr.includes(n[u]))?n=(a===0?"":n.substring(0,a))+n.substring(u+1):a=u}}return n===""?null:n}function ur(e,t=!1){var r=t?" !important;":";",n="";for(var i in e){var o=e[i];o!=null&&o!==""&&(n+=" "+i+": "+o+r)}return n}function kt(e){return e[0]!=="-"||e[1]!=="-"?e.toLowerCase():e}function Bi(e,t){if(t){var r="",n,i;if(Array.isArray(t)?(n=t[0],i=t[1]):n=t,e){e=String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g,"").trim();var o=!1,a=0,u=!1,s=[];n&&s.push(...Object.keys(n).map(kt)),i&&s.push(...Object.keys(i).map(kt));var l=0,d=-1;const p=e.length;for(var h=0;h<p;h++){var v=e[h];if(u?v==="/"&&e[h-1]==="*"&&(u=!1):o?o===v&&(o=!1):v==="/"&&e[h+1]==="*"?u=!0:v==='"'||v==="'"?o=v:v==="("?a++:v===")"&&a--,!u&&o===!1&&a===0){if(v===":"&&d===-1)d=h;else if(v===";"||h===p-1){if(d!==-1){var f=kt(e.substring(l,d).trim());if(!s.includes(f)){v!==";"&&h++;var c=e.substring(l,h).trim();r+=" "+c+";"}}l=h+1,d=-1}}}}return n&&(r+=ur(n)),i&&(r+=ur(i,!0)),r=r.trim(),r===""?null:r}return e==null?null:String(e)}function hn(e,t,r,n,i,o){var a=e.__className;if(a!==r||a===void 0){var u=Ki(r,n,o);u==null?e.removeAttribute("class"):t?e.className=u:e.setAttribute("class",u),e.__className=r}else if(o&&i!==o)for(var s in o){var l=!!o[s];(i==null||l!==!!i[s])&&e.classList.toggle(s,l)}return o}function St(e,t={},r,n){for(var i in r){var o=r[i];t[i]!==o&&(r[i]==null?e.style.removeProperty(i):e.style.setProperty(i,o,n))}}function _n(e,t,r,n){var i=e.__style;if(i!==t){var o=Bi(t,n);o==null?e.removeAttribute("style"):e.style.cssText=o,e.__style=t}else n&&(Array.isArray(n)?(St(e,r?.[0],n[0]),St(e,r?.[1],n[1],"important")):St(e,r,n));return n}function Ot(e,t,r=!1){if(e.multiple){if(t==null)return;if(!dt(t))return ni();for(var n of e.options)n.selected=t.includes(lr(n));return}for(n of e.options){var i=lr(n);if(hi(i,t)){n.selected=!0;return}}(!r||t!==void 0)&&(e.selectedIndex=-1)}function Hi(e){var t=new MutationObserver(()=>{Ot(e,e.__value)});t.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),zr(()=>{t.disconnect()})}function lr(e){return"__value"in e?e.__value:e.value}const De=Symbol("class"),je=Symbol("style"),gn=Symbol("is custom element"),yn=Symbol("is html");function Wi(e,t){t?e.hasAttribute("selected")||e.setAttribute("selected",""):e.removeAttribute("selected")}function fr(e,t,r,n){var i=bn(e);i[t]!==(i[t]=r)&&(t==="loading"&&(e[Wn]=r),r==null?e.removeAttribute(t):typeof r!="string"&&mn(e).includes(t)?e[t]=r:e.setAttribute(t,r))}function Yi(e,t,r,n,i=!1){var o=bn(e),a=o[gn],u=!o[yn],s=t||{},l=e.tagName==="OPTION";for(var d in t)d in r||(r[d]=null);r.class?r.class=pn(r.class):(n||r[De])&&(r.class=null),r[je]&&(r.style??=null);var h=mn(e);for(const g in r){let y=r[g];if(l&&g==="value"&&y==null){e.value=e.__value="",s[g]=y;continue}if(g==="class"){var v=e.namespaceURI==="http://www.w3.org/1999/xhtml";hn(e,v,y,n,t?.[De],r[De]),s[g]=y,s[De]=r[De];continue}if(g==="style"){_n(e,y,t?.[je],r[je]),s[g]=y,s[je]=r[je];continue}var f=s[g];if(!(y===f&&!(y===void 0&&e.hasAttribute(g)))){s[g]=y;var c=g[0]+g[1];if(c!=="$$")if(c==="on"){const m={},S="$$"+g;let A=g.slice(2);var p=$i(A);if(Ci(A)&&(A=A.slice(0,-7),m.capture=!0),!p&&f){if(y!=null)continue;e.removeEventListener(A,s[S],m),s[S]=null}if(y!=null)if(p)e[`__${A}`]=y,sn([A]);else{let P=function(C){s[g].call(this,C)};var b=P;s[S]=an(A,e,P,m)}else p&&(e[`__${A}`]=void 0)}else if(g==="style")fr(e,g,y);else if(g==="autofocus")yi(e,!!y);else if(!a&&(g==="__value"||g==="value"&&y!=null))e.value=e.__value=y;else if(g==="selected"&&l)Wi(e,y);else{var _=g;u||(_=Ni(_));var w=_==="defaultValue"||_==="defaultChecked";if(y==null&&!a&&!w)if(o[g]=null,_==="value"||_==="checked"){let m=e;const S=t===void 0;if(_==="value"){let A=m.defaultValue;m.removeAttribute(_),m.defaultValue=A,m.value=m.__value=S?A:null}else{let A=m.defaultChecked;m.removeAttribute(_),m.defaultChecked=A,m.checked=S?A:!1}}else e.removeAttribute(g);else w||h.includes(_)&&(a||typeof y!="string")?(e[_]=y,_ in o&&(o[_]=M)):typeof y!="function"&&fr(e,_,y)}}}return s}function ue(e,t,r=[],n=[],i,o=!1){Pr(r,n,a=>{var u=void 0,s={},l=e.nodeName==="SELECT",d=!1;if(Xe(()=>{var v=t(...a.map(T)),f=Yi(e,u,v,i,o);d&&l&&"value"in v&&Ot(e,v.value);for(let p of Object.getOwnPropertySymbols(s))v[p]||F(s[p]);for(let p of Object.getOwnPropertySymbols(v)){var c=v[p];p.description===qn&&(!u||c!==u[p])&&(s[p]&&F(s[p]),s[p]=oe(()=>Ui(e,()=>c))),f[p]=c}u=f}),l){var h=e;Pe(()=>{Ot(h,u.value,!0),Hi(h)})}d=!0})}function bn(e){return e.__attributes??={[gn]:e.nodeName.includes("-"),[yn]:e.namespaceURI===jn}}var cr=new Map;function mn(e){var t=cr.get(e.nodeName);if(t)return t;cr.set(e.nodeName,t=[]);for(var r,n=e,i=Element.prototype;i!==n;){r=Er(n);for(var o in r)r[o].set&&t.push(o);n=jt(n)}return t}const Gi=()=>performance.now(),Q={tick:e=>requestAnimationFrame(e),now:()=>Gi(),tasks:new Set};function wn(){const e=Q.now();Q.tasks.forEach(t=>{t.c(e)||(Q.tasks.delete(t),t.f())}),Q.tasks.size!==0&&Q.tick(wn)}function Xi(e){let t;return Q.tasks.size===0&&Q.tick(wn),{promise:new Promise(r=>{Q.tasks.add(t={c:e,f:r})}),abort(){Q.tasks.delete(t)}}}function et(e,t){Ge(()=>{e.dispatchEvent(new CustomEvent(t))})}function Ji(e){if(e==="float")return"cssFloat";if(e==="offset")return"cssOffset";if(e.startsWith("--"))return e;const t=e.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(r=>r[0].toUpperCase()+r.slice(1)).join("")}function dr(e){const t={},r=e.split(";");for(const n of r){const[i,o]=n.split(":");if(!i||o===void 0)break;const a=Ji(i.trim());t[a]=o.trim()}return t}const Zi=e=>e;function vr(e,t,r,n){var i=(e&Nn)!==0,o=(e&On)!==0,a=i&&o,u=(e&Rn)!==0,s=a?"both":i?"in":"out",l,d=t.inert,h=t.style.overflow,v,f;function c(){return Ge(()=>l??=r()(t,n?.()??{},{direction:s}))}var p={is_global:u,in(){if(t.inert=d,!i){f?.abort(),f?.reset?.();return}o||v?.abort(),et(t,"introstart"),v=Rt(t,c(),f,1,()=>{et(t,"introend"),v?.abort(),v=l=void 0,t.style.overflow=h})},out(g){if(!o){g?.(),l=void 0;return}t.inert=!0,et(t,"outrostart"),f=Rt(t,c(),v,0,()=>{et(t,"outroend"),g?.()})},stop:()=>{v?.abort(),f?.abort()}},_=x;if((_.transitions??=[]).push(p),i&&Nt){var w=u;if(!w){for(var b=_.parent;b&&(b.f&Be)!==0;)for(;(b=b.parent)&&(b.f&_e)===0;);w=!b||(b.f&pt)!==0}w&&Pe(()=>{bt(()=>p.in())})}}function Rt(e,t,r,n,i){var o=n===1;if(zn(t)){var a,u=!1;return ht(()=>{if(!u){var _=t({direction:o?"in":"out"});a=Rt(e,_,r,n,i)}}),{abort:()=>{u=!0,a?.abort()},deactivate:()=>a.deactivate(),reset:()=>a.reset(),t:()=>a.t()}}if(r?.deactivate(),!t?.duration)return i(),{abort:fe,deactivate:fe,reset:fe,t:()=>n};const{delay:s=0,css:l,tick:d,easing:h=Zi}=t;var v=[];if(o&&r===void 0&&(d&&d(0,1),l)){var f=dr(l(0,1));v.push(f,f)}var c=()=>1-n,p=e.animate(v,{duration:s,fill:"forwards"});return p.onfinish=()=>{p.cancel();var _=r?.t()??1-n;r?.abort();var w=n-_,b=t.duration*Math.abs(w),g=[];if(b>0){var y=!1;if(l)for(var m=Math.ceil(b/16.666666666666668),S=0;S<=m;S+=1){var A=_+w*h(S/m),P=dr(l(A,1-A));g.push(P),y||=P.overflow==="hidden"}y&&(e.style.overflow="hidden"),c=()=>{var C=p.currentTime;return _+w*h(C/b)},d&&Xi(()=>{if(p.playState!=="running")return!1;var C=c();return d(C,1-C),!0})}p=e.animate(g,{duration:b,fill:"forwards"}),p.onfinish=()=>{c=()=>n,d?.(n,1-n),i()}},{abort:()=>{p&&(p.cancel(),p.effect=null,p.onfinish=fe)},deactivate:()=>{i=fe},reset:()=>{n===0&&d?.(1,0)},t:()=>c()}}function pr(e,t){return e===t||e?.[ne]===t}function Qi(e={},t,r,n){return Pe(()=>{var i,o;return Br(()=>{i=o,o=[],bt(()=>{e!==r(...o)&&(t(e,...o),i&&pr(r(...i),e)&&t(null,...i))})}),()=>{ht(()=>{o&&pr(r(...o),e)&&t(null,...o)})}}),e}function Yt(e=!1){const t=$,r=t.l.u;if(!r)return;let n=()=>nn(t.s);if(e){let i=0,o={};const a=_t(()=>{let u=!1;const s=t.s;for(const l in s)s[l]!==o[l]&&(o[l]=s[l],u=!0);return u&&i++,i});n=()=>T(a)}r.b.length&&mi(()=>{hr(t,n),At(r.b)}),Mt(()=>{const i=bt(()=>r.m.map(Kn));return()=>{for(const o of i)typeof o=="function"&&o()}}),r.a.length&&Mt(()=>{hr(t,n),At(r.a)})}function hr(e,t){if(e.l.s)for(const r of e.l.s)T(r);t()}const eo={get(e,t){if(!e.exclude.includes(t))return e.props[t]},set(e,t){return!1},getOwnPropertyDescriptor(e,t){if(!e.exclude.includes(t)&&t in e.props)return{enumerable:!0,configurable:!0,value:e.props[t]}},has(e,t){return e.exclude.includes(t)?!1:t in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(t=>!e.exclude.includes(t))}};function le(e,t,r){return new Proxy({props:e,exclude:t},eo)}function _r(e,t,r,n){var i=n,o=!0,a=()=>(o&&(o=!1,i=n),i),u;u=e[t],u===void 0&&n!==void 0&&(u=a());var s;return s=()=>{var l=e[t];return l===void 0?a():(o=!0,l)},s}const gr={width:400,x:100,y:100},xn="highlight-translation-window-state";function to(){try{const e=GM_getValue(xn);if(e){const t=JSON.parse(e);return{hide:!0,text:"",bounds:{...gr,...t.bounds},isPinned:t.isPinned||!1}}}catch(e){console.warn("Failed to load window state:",e)}return{hide:!0,text:"",bounds:{...gr},isPinned:!1}}const yr=to(),k=we({hide:!0,text:"",bounds:yr.bounds,isPinned:yr.isPinned});function Ze(){try{GM_setValue(xn,JSON.stringify({...k}))}catch(e){console.warn("Failed to save window state:",e)}}function En(e){k.bounds={...k.bounds,...e},Ze()}function ro(){k.isPinned=!k.isPinned,Ze()}function no(e,t){if(k.text=e,k.hide=!1,!k.isPinned&&t){const r=window.innerWidth-k.bounds.width,n=Math.max(0,Math.min(t.x,r)),i=Math.max(0,t.y);k.bounds={...k.bounds,x:n,y:i}}Ze()}function kn(){k.hide=!0,k.text="",Ze()}function io(e){k.text=e,Ze()}const me=navigator.platform.toUpperCase().indexOf("MAC")>=0;function oo(e){let t=!1,r=!1,n=!1;const i=()=>{if(k.hide)return;const s=window.getSelection()?.toString().trim();s&&s.length>0&&s!==k.text&&io(s)};function o(u){if(u.key==="Escape"&&!k.hide){kn();return}if(me&&u.key==="Meta"){r=!0,n=!1;return}if(!me&&u.key==="Control"){t=!0,n=!1;return}(me?r:t)&&(n=!0)}function a(u){const s=me?r:t;if(me&&u.key==="Meta"||!me&&u.key==="Control"){if(s&&!n){const d=window.getSelection(),h=d?.toString().trim();if(h&&h.length>0){const f=d?.getRangeAt(0)?.getBoundingClientRect();let c;f&&(c={x:f.right+10,y:f.bottom+10}),no(h,c)}}t=!1,r=!1,n=!1}}return document.addEventListener("keydown",o),document.addEventListener("keyup",a),document.addEventListener("mouseup",i),{update(){},destroy(){document.removeEventListener("keydown",o),document.removeEventListener("keyup",a),document.removeEventListener("mouseup",i)}}}function ao(e){return e==="auto"?matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e}function so(e,t){const r=e.getRootNode();return r instanceof ShadowRoot&&t?r.querySelector(t):document.documentElement}function uo(e,t,r){const n=t==="dark";e.classList.toggle("dark",n),r&&e.setAttribute("data-theme",t);try{e.style.setProperty("color-scheme",n?"dark":"light")}catch{}}function lo(e,t={}){if(typeof window>"u"||typeof document>"u")return{update(){},destroy(){}};const r={storageKey:t.storageKey??"color-scheme",initialValue:t.initialValue??"auto",setDataThemeAttr:t.setDataThemeAttr??!0,rootSelector:t.rootSelector??""},n=matchMedia("(prefers-color-scheme: dark)"),i=so(e,r.rootSelector);let o;const a=()=>{try{const f=localStorage.getItem(r.storageKey);return f==="dark"||f==="light"||f==="auto"?f:null}catch{return null}},u=f=>{try{localStorage.setItem(r.storageKey,f)}catch{}},s=f=>{e.dispatchEvent(new CustomEvent("colormodechange",{detail:{mode:o,resolved:f}}))},l=(f,c=!0)=>{f&&(o=f);const p=ao(o);i&&uo(i,p,r.setDataThemeAttr),c&&s(p)};o=a()??r.initialValue,l(void 0,!1);const d=()=>{o==="auto"&&l()};n.addEventListener?.("change",d),"addListener"in n&&typeof n.addListener=="function"&&n.addListener(d);const h=f=>{if(f.key!==r.storageKey)return;const c=f.newValue??"auto";c!==o&&(o=c,l())};window.addEventListener("storage",h);const v=f=>{const p=f.detail;let _,w=!0;typeof p=="string"?_=p:(_=p.mode,p.persist!==void 0&&(w=p.persist)),!(_!=="light"&&_!=="dark"&&_!=="auto")&&(w&&u(_),l(_))};return e.addEventListener("setcolormode",v),{update(f){if(typeof f=="string"){const c=f;u(c),l(c);return}f&&(f.storageKey&&f.storageKey!==r.storageKey&&(r.storageKey=f.storageKey),f.setDataThemeAttr!==void 0&&(r.setDataThemeAttr=f.setDataThemeAttr),f.initialValue&&f.initialValue!==o?(o=f.initialValue,u(o),l()):l(o))},destroy(){n.removeEventListener?.("change",d),"removeListener"in n&&typeof n.removeListener=="function"&&n.removeListener(d),window.removeEventListener("storage",h),e.removeEventListener("setcolormode",v)}}}var fo=H("<button></button>");const co={hash:"svelte-1yh2n9c",code:".uno-8yiin0{position:absolute;bottom:0;right:0;width:8px;height:8px;cursor:ew-resize;}"};function vo(e,t){Me(t,!0),Oe(e,co);const r=le(t,["$$slots","$$events","$$legacy"]);let n=!1,i={x:0,y:0,width:0};const o=200;function a(d){n=!0,i.x=d.clientX,i.y=d.clientY,i.width=k.bounds.width,document.addEventListener("mousemove",u),document.addEventListener("mouseup",s),d.preventDefault(),d.stopPropagation()}function u(d){if(!n)return;const h=d.clientX-i.x;let v=Math.max(o,i.width+h);v=Math.min(window.innerWidth-k.bounds.x,v),En({width:v})}function s(){n=!1,document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",s)}var l=fo();ue(l,()=>({class:"uno-8yiin0",tabindex:"0",title:"拖拽调整窗口大小",onmousedown:a,...r})),L(e,l),$e()}var po=H("<div></div>"),ho=H("<div></div>");const _o={hash:"svelte-1up9h3u",code:".uno-6dodid{width:60%;}.uno-78ucd7{height:16px;animation:svelte-1up9h3u-pulse 2s cubic-bezier(0.4,0,.6,1) infinite;border-radius:2px;--un-bg-opacity:1;background-color:rgb(229 231 235 / var(--un-bg-opacity));}.uno-x1ukmj{display:flex;flex-direction:column;gap:4px;}.dark .uno-78ucd7{--un-bg-opacity:1;background-color:rgb(55 65 81 / var(--un-bg-opacity));}@keyframes svelte-1up9h3u-pulse{0%, 100% {opacity:1} 50% {opacity:.5}}"};function go(e,t){Oe(e,_o);const r=_r(t,"lines",3,2),n=_r(t,"shortLastLine",3,!0),i=le(t,["$$slots","$$events","$$legacy","lines","shortLastLine","class"]);var o=ho();ue(o,()=>({...i,class:["uno-x1ukmj",t.class]}),void 0,void 0,"svelte-1up9h3u"),fn(o,21,()=>Array(r()),ln,(a,u,s)=>{var l=po();ut(()=>hn(l,1,pn(["uno-78ucd7",n()&&s===r()-1&&"uno-6dodid"]),"svelte-1up9h3u")),L(a,l)}),L(e,o)}var yo=H("<button><!></button>");const bo={hash:"svelte-e96g1w",code:".uno-bp9ffo{display:flex;align-items:center;justify-content:center;border-radius:2px;background-color:transparent;padding:2px;font-size:12px;line-height:16px;--un-text-opacity:1;color:rgb(95 107 124 / var(--un-text-opacity));transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-duration:200ms;}.dark .uno-px57a5{background-color:rgb(255 255 255 / 0.1) !important;}.uno-px57a5{background-color:rgb(0 0 0 / 0.1) !important;}.dark .uno-bp9ffo:hover{background-color:rgb(255 255 255 / 0.1);}.uno-bp9ffo:hover{background-color:rgb(0 0 0 / 0.1);}.dark .uno-bp9ffo{--un-text-opacity:1;color:rgb(170 179 191 / var(--un-text-opacity));}"};function It(e,t){Oe(e,bo);let r=le(t,["$$slots","$$events","$$legacy","children","variant"]);const n=fi(()=>t.variant==="toggle-enabled");var i=yo();ue(i,()=>({class:["uno-bp9ffo",T(n)&&"uno-px57a5"],...r,"aria-label":t.variant!=="normal"?t.variant==="toggle-enabled"?"Enabled":"Disabled":void 0}));var o=z(i);qi(o,()=>t.children??fe),L(e,i)}var mo=Je('<svg><path fill="currentColor" d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12z"></path></svg>');function wo(e,t){const r=le(t,["$$slots","$$events","$$legacy"]);var n=mo();ue(n,()=>({viewBox:"0 0 24 24",width:"1.2em",height:"1.2em",...r})),L(e,n)}var xo=Je('<svg><path fill="currentColor" d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59z"></path></svg>');function Eo(e,t){const r=le(t,["$$slots","$$events","$$legacy"]);var n=xo();ue(n,()=>({viewBox:"0 0 24 24",width:"1.2em",height:"1.2em",...r})),L(e,n)}const ko={noun:"n.",verb:"v.",adjective:"adj.",adverb:"adv.",pronoun:"pron.",preposition:"prep.",conjunction:"conj.",interjection:"interj."},So=[{name:"google",host:"translate.google.com",executor:e=>{const t="https://translate.google.com/translate_a/single?client=gtx&dt=t&dt=bd&dt=rm&dj=1&source=input&hl=en&sl=auto";return new Promise((r,n)=>{GM_xmlhttpRequest({method:"GET",responseType:"json",url:`${t}&tl=${e.dest}&q=${encodeURIComponent(e.text)}`,onload:({response:i})=>{if(console.log("response:",i),i.dict?.length){r({translations:i.dict.map(o=>`${ko[o.pos]??o.pos} ${o.terms.join(", ")}`)});return}r({translations:[i?.sentences?.map(o=>o.trans).join("")??""]})},onerror:i=>n(i)})})}}];function To(e,t){const r=So.find(n=>n.name===e);return r?r.executor(t):Promise.reject(new Error(`Unknown translator: ${e}`))}var Ao=H('<span class="uno-yijdji"> </span>'),Lo=H("<p> </p>"),Co=H('<div class="uno-ysjubh"></div>'),Mo=H('<div class="uno-6n0moy group"><span class="uno-xivhpo">谷歌翻译</span> <div class="uno-fbxheb"><!></div> <div class="uno-htkuxq"><!></div></div>');const $o={hash:"svelte-rj79at",code:".group:hover .uno-fbxheb{visibility:visible;opacity:1;}.uno-fbxheb{visibility:hidden;position:absolute;top:4px;right:4px;display:flex;align-items:center;gap:4px;opacity:0;transition-property:opacity;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;}.uno-6n0moy{position:relative;flex:1 1 0%;cursor:default;border-width:1px;--un-border-opacity:1;border-color:rgb(212 213 215 / var(--un-border-opacity));border-radius:2px;--un-bg-opacity:1;background-color:rgb(255 255 255 / var(--un-bg-opacity));padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;font-size:14px;line-height:20px;}.uno-htkuxq{margin-top:4px;white-space:pre-wrap;overflow-wrap:break-word;line-height:1.3;}.uno-ysjubh>:not([hidden])~:not([hidden]){--un-space-y-reverse:0;margin-top:calc(2px * calc(1 - var(--un-space-y-reverse)));margin-bottom:calc(2px * var(--un-space-y-reverse));}.dark .uno-6n0moy{--un-border-opacity:1;border-color:rgb(90 96 100 / var(--un-border-opacity));--un-bg-opacity:1;background-color:rgb(37 42 49 / var(--un-bg-opacity));}.uno-yijdji{--un-text-opacity:1;color:rgb(239 68 68 / var(--un-text-opacity));}.uno-xivhpo{font-weight:700;}"};function Po(e,t){Me(t,!0),Oe(e,$o);let r=U(null),n=U(!1),i=U(null),o=U(!1);Mt(()=>{!t.text||!t.dest||(O(n,!0),O(i,null),To("google",{text:t.text,dest:t.dest}).then(p=>{O(r,p,!0)}).catch(p=>{console.error("Translation error:",p),O(i,`翻译失败: ${p?.message}`),O(r,null)}).finally(()=>{O(n,!1)}))});let a=null;function u(){a&&clearTimeout(a),O(o,!0),navigator.clipboard.writeText(T(r)?.translations.join(`
`)||""),a=setTimeout(()=>{O(o,!1)},1e3)}var s=Mo(),l=he(z(s),2),d=z(l);It(d,{onclick:u,children:(p,_)=>{var w=tt(),b=Ve(w);{var g=m=>{Eo(m,{})},y=m=>{wo(m,{})};de(b,m=>{T(o)?m(g):m(y,!1)})}L(p,w)},$$slots:{default:!0}});var h=he(l,2),v=z(h);{var f=p=>{go(p,{})},c=p=>{var _=tt(),w=Ve(_);{var b=y=>{var m=Ao(),S=z(m);ut(()=>or(S,T(i))),L(y,m)},g=y=>{var m=tt(),S=Ve(m);{var A=P=>{var C=Co();fn(C,21,()=>T(r).translations,ln,(Qe,Re)=>{var ye=Lo(),mt=z(ye);ut(()=>or(mt,T(Re))),L(Qe,ye)}),L(P,C)};de(S,P=>{T(r)&&P(A)},!0)}L(y,m)};de(w,y=>{T(i)?y(b):y(g,!1)},!0)}L(p,_)};de(v,p=>{T(n)?p(f):p(c,!1)})}L(e,s),$e()}const No=e=>e;function br(e,{delay:t=0,duration:r=400,easing:n=No}={}){const i=+getComputedStyle(e).opacity;return{delay:t,duration:r,easing:n,css:o=>`opacity: ${o*i}`}}function mr(e){return--e*e*e*e*e+1}var Oo=Je('<svg><path fill="currentColor" d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2z"></path></svg>');function Ro(e,t){const r=le(t,["$$slots","$$events","$$legacy"]);var n=Oo();ue(n,()=>({viewBox:"0 0 24 24",width:"1.2em",height:"1.2em",...r})),L(e,n)}var Io=Je('<svg><path fill="currentColor" d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2zm-7.2 2l1.2-1.2V4h4v8.8l1.2 1.2z"></path></svg>');function Do(e,t){const r=le(t,["$$slots","$$events","$$legacy"]);var n=Io();ue(n,()=>({viewBox:"0 0 24 24",width:"1.2em",height:"1.2em",...r})),L(e,n)}var jo=Je('<svg><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"></path></svg>');function qo(e,t){const r=le(t,["$$slots","$$events","$$legacy"]);var n=jo();ue(n,()=>({viewBox:"0 0 24 24",width:"1.2em",height:"1.2em",...r})),L(e,n)}var Fo=H('<div class="uno-3v4qvh"><div class="uno-5l61vk"><!></div> <div class="uno-ig83g9" role="button" tabindex="0"></div> <div class="uno-5l61vk"><!></div></div>');const Vo={hash:"svelte-mieqhr",code:".uno-ig83g9{margin-top:4px;margin-bottom:4px;margin-left:4px;margin-right:4px;min-width:5px;flex-shrink:0;flex-grow:1;cursor:grab;align-self:stretch;}.uno-3v4qvh{height:24px;display:flex;align-items:center;justify-content:space-between;border-width:1px;--un-border-opacity:1;border-color:rgb(212 213 215 / var(--un-border-opacity));border-style:none;border-bottom-style:solid;padding-left:4px;padding-right:4px;padding-top:4px;padding-bottom:4px;}.uno-5l61vk{display:flex;gap:16px;}.dark .uno-3v4qvh{--un-border-opacity:1;border-color:rgb(90 96 100 / var(--un-border-opacity));--un-border-opacity:.4 !important;border-color:rgba(17, 20, 24, var(--un-border-opacity)) !important;}"};function Uo(e,t){Me(t,!1),Oe(e,Vo);let r=!1,n={x:0,y:0},i=Rr(null);function o(c){r=!0,n.x=c.clientX-k.bounds.x,n.y=c.clientY-k.bounds.y,T(i)?.setPointerCapture(c.pointerId),c.preventDefault()}function a(c){if(!r)return;const p=c.clientX-n.x,_=c.clientY-n.y,w=Math.max(0,Math.min(window.innerWidth-k.bounds.width,p)),b=Math.max(0,_);En({x:w,y:b})}function u(c){r=!1,T(i)&&T(i).hasPointerCapture?.(c.pointerId)&&T(i).releasePointerCapture(c.pointerId)}Yt();var s=Fo(),l=z(s),d=z(l);{let c=ot(()=>k.isPinned?"toggle-enabled":"toggle"),p=ot(()=>k.isPinned?"取消固定":"固定到此处");It(d,{get variant(){return T(c)},get onclick(){return ro},get title(){return T(p)},children:(_,w)=>{var b=tt(),g=Ve(b);{var y=S=>{Ro(S,{})},m=S=>{Do(S,{})};de(g,S=>{k.isPinned?S(y):S(m,!1)})}L(_,b)},$$slots:{default:!0}})}var h=he(l,2);Qi(h,c=>O(i,c),()=>T(i));var v=he(h,2),f=z(v);It(f,{variant:"normal",get onclick(){return kn},title:"关闭窗口",children:(c,p)=>{qo(c,{})},$$slots:{default:!0}}),xt("pointerdown",h,o),xt("pointermove",h,a),xt("pointerup",h,u),L(e,s),$e()}const zo=e=>{e.stopPropagation()};var Ko=H('<div class="uno-qcxntm text-muted">请选择文字并按 Ctrl/Cmd 键来翻译</div>'),Bo=H('<div class="uno-pqqj04" role="dialog" tabindex="0"><!> <div class="uno-1aue3t"><!></div> <!></div>');const Ho={hash:"svelte-140i7ba",code:".uno-pqqj04{position:fixed;z-index:9999;min-width:200px;min-height:100px;max-width:100vw;max-height:100vh;height:auto;display:flex;flex-direction:column;--un-bg-opacity:1;background-color:rgb(246 247 249 / var(--un-bg-opacity));--un-text-opacity:1;color:rgb(34 34 34 / var(--un-text-opacity));font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Open Sans,Helvetica Neue,Icons16,sans-serif;--un-shadow:0 0 0 1px #1114181a, 0 4px 8px #11141833, 0 18px 46px 6px #11141833;box-shadow:var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);}.uno-1aue3t{display:flex;flex:1 1 0%;flex-direction:column;gap:8px;overflow:auto;padding:8px;}.dark .uno-pqqj04{--un-bg-opacity:1;background-color:rgb(28 33 39 / var(--un-bg-opacity));--un-text-opacity:1;color:rgb(246 246 246 / var(--un-text-opacity));}.uno-qcxntm{text-align:center;}"};function Wo(e,t){Me(t,!1),Oe(e,Ho),Yt();var r=Bo();r.__mouseup=[zo];let n;var i=z(r);Uo(i,{});var o=he(i,2),a=z(o);{var u=d=>{Po(d,{get text(){return k.text},dest:"zh-CN"})},s=d=>{var h=Ko();L(d,h)};de(a,d=>{k.text?d(u):d(s,!1)})}var l=he(o,2);vo(l,{}),ut(d=>n=_n(r,"",n,d),[()=>({width:`${k.bounds.width??""}px`,left:`${k.bounds.x??""}px`,top:`${k.bounds.y??""}px`})]),vr(1,r,()=>br,()=>({duration:200,easing:mr})),vr(2,r,()=>br,()=>({duration:200,easing:mr})),L(e,r),$e()}sn(["mouseup"]);var Yo=H('<div style="display:none" aria-hidden="true"></div> <div id="root" style="all: initial;"><!></div>',1);function Go(e,t){Me(t,!1),Yt();var r=Yo();ar(Dr.body,u=>oo?.());var n=Ve(r);ar(n,(u,s)=>lo?.(u,s),()=>({initialValue:"auto",storageKey:"color-scheme",setDataThemeAttr:!0,rootSelector:"#root"}));var i=he(n,2),o=z(i);{var a=u=>{Wo(u,{})};de(o,u=>{k.hide||u(a)})}L(e,r),$e()}const wr="";let xe=document.getElementById("__highlight-translation__");xe||(xe=document.createElement("div"),xe.id="__highlight-translation__",document.documentElement.appendChild(xe));const Z=xe.shadowRoot??xe.attachShadow({mode:"open"});if("adoptedStyleSheets"in Z&&"replaceSync"in CSSStyleSheet.prototype){let e=Z.__appSheet;e||(e=new CSSStyleSheet,e.replaceSync(wr),Z.__appSheet=e),Z.adoptedStyleSheets.includes(e)||(Z.adoptedStyleSheets=[...Z.adoptedStyleSheets,e])}else if(!Z.querySelector("style[data-app-style]")){const e=document.createElement("style");e.setAttribute("data-app-style","true"),e.textContent=wr,Z.appendChild(e)}Ii(Go,{target:Z});
(function(){"use strict";((i,e)=>{try{if(typeof document<"u"){var t=document.createElement("style");for(const n in e.attributes)t.setAttribute(n,e.attributes[n]);t.appendChild(document.createTextNode(i)),document.querySelector(`#${e.styleId}`)?.shadowRoot?.appendChild(t)}}catch(n){console.error("vite-plugin-css-injected-by-js",n)}})(`/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
2. [UnoCSS]: allow to override the default border color with css var \`--un-default-border-color\`
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: var(--un-default-border-color, #e5e7eb); /* 2 */
}

::before,
::after {
  --un-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS.
*/

html,
:host {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -moz-tab-size: 4; /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
[type='button'],
[type='reset'],
[type='submit'] {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/

:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/*
Make elements with the HTML hidden attribute stay hidden by default.
*/

[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
*,::before,::after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / 0.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: ;}`,{styleId:"__highlight-translation__"})})();
