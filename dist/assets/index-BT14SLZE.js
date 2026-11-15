(function(){const v=document.createElement("link").relList;if(v&&v.supports&&v.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))S(s);new MutationObserver(s=>{for(const f of s)if(f.type==="childList")for(const y of f.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&S(y)}).observe(document,{childList:!0,subtree:!0});function _(s){const f={};return s.integrity&&(f.integrity=s.integrity),s.referrerPolicy&&(f.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?f.credentials="include":s.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function S(s){if(s.ep)return;s.ep=!0;const f=_(s);fetch(s.href,f)}})();const te="modulepreload",re=function(p,v){return new URL(p,v).href},W={},ne=function(v,_,S){let s=Promise.resolve();if(_&&_.length>0){const y=document.getElementsByTagName("link"),d=document.querySelector("meta[property=csp-nonce]"),R=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=Promise.allSettled(_.map(b=>{if(b=re(b,S),b in W)return;W[b]=!0;const w=b.endsWith(".css"),E=w?'[rel="stylesheet"]':"";if(!!S)for(let x=y.length-1;x>=0;x--){const O=y[x];if(O.href===b&&(!w||O.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${b}"]${E}`))return;const h=document.createElement("link");if(h.rel=w?"stylesheet":te,w||(h.as="script"),h.crossOrigin="",h.href=b,R&&h.setAttribute("nonce",R),document.head.appendChild(h),w)return new Promise((x,O)=>{h.addEventListener("load",x),h.addEventListener("error",()=>O(new Error(`Unable to preload CSS for ${b}`)))})}))}function f(y){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=y,window.dispatchEvent(d),!d.defaultPrevented)throw y}return s.then(y=>{for(const d of y||[])d.status==="rejected"&&f(d.reason);return v().catch(f)})};var D={exports:{}},r={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Y;function oe(){if(Y)return r;Y=1;var p=Symbol.for("react.element"),v=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),s=Symbol.for("react.profiler"),f=Symbol.for("react.provider"),y=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),R=Symbol.for("react.suspense"),b=Symbol.for("react.memo"),w=Symbol.for("react.lazy"),E=Symbol.iterator;function $(e){return e===null||typeof e!="object"?null:(e=E&&e[E]||e["@@iterator"],typeof e=="function"?e:null)}var h={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},x=Object.assign,O={};function P(e,t,n){this.props=e,this.context=t,this.refs=O,this.updater=n||h}P.prototype.isReactComponent={},P.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},P.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function z(){}z.prototype=P.prototype;function T(e,t,n){this.props=e,this.context=t,this.refs=O,this.updater=n||h}var G=T.prototype=new z;G.constructor=T,x(G,P.prototype),G.isPureReactComponent=!0;var F=Array.isArray,U=Object.prototype.hasOwnProperty,V={current:null},B={key:!0,ref:!0,__self:!0,__source:!0};function M(e,t,n){var i,o={},c=null,a=null;if(t!=null)for(i in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(c=""+t.key),t)U.call(t,i)&&!B.hasOwnProperty(i)&&(o[i]=t[i]);var l=arguments.length-2;if(l===1)o.children=n;else if(1<l){for(var u=Array(l),g=0;g<l;g++)u[g]=arguments[g+2];o.children=u}if(e&&e.defaultProps)for(i in l=e.defaultProps,l)o[i]===void 0&&(o[i]=l[i]);return{$$typeof:p,type:e,key:c,ref:a,props:o,_owner:V.current}}function Q(e,t){return{$$typeof:p,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function q(e){return typeof e=="object"&&e!==null&&e.$$typeof===p}function X(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var N=/\/+/g;function A(e,t){return typeof e=="object"&&e!==null&&e.key!=null?X(""+e.key):t.toString(36)}function C(e,t,n,i,o){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(c){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case p:case v:a=!0}}if(a)return a=e,o=o(a),e=i===""?"."+A(a,0):i,F(o)?(n="",e!=null&&(n=e.replace(N,"$&/")+"/"),C(o,t,n,"",function(g){return g})):o!=null&&(q(o)&&(o=Q(o,n+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(N,"$&/")+"/")+e)),t.push(o)),1;if(a=0,i=i===""?".":i+":",F(e))for(var l=0;l<e.length;l++){c=e[l];var u=i+A(c,l);a+=C(c,t,n,u,o)}else if(u=$(e),typeof u=="function")for(e=u.call(e),l=0;!(c=e.next()).done;)c=c.value,u=i+A(c,l++),a+=C(c,t,n,u,o);else if(c==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function I(e,t,n){if(e==null)return e;var i=[],o=0;return C(e,i,"","",function(c){return t.call(n,c,o++)}),i}function Z(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var m={current:null},j={transition:null},ee={ReactCurrentDispatcher:m,ReactCurrentBatchConfig:j,ReactCurrentOwner:V};function H(){throw Error("act(...) is not supported in production builds of React.")}return r.Children={map:I,forEach:function(e,t,n){I(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return I(e,function(){t++}),t},toArray:function(e){return I(e,function(t){return t})||[]},only:function(e){if(!q(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},r.Component=P,r.Fragment=_,r.Profiler=s,r.PureComponent=T,r.StrictMode=S,r.Suspense=R,r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ee,r.act=H,r.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var i=x({},e.props),o=e.key,c=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(c=t.ref,a=V.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)U.call(t,u)&&!B.hasOwnProperty(u)&&(i[u]=t[u]===void 0&&l!==void 0?l[u]:t[u])}var u=arguments.length-2;if(u===1)i.children=n;else if(1<u){l=Array(u);for(var g=0;g<u;g++)l[g]=arguments[g+2];i.children=l}return{$$typeof:p,type:e.type,key:o,ref:c,props:i,_owner:a}},r.createContext=function(e){return e={$$typeof:y,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:f,_context:e},e.Consumer=e},r.createElement=M,r.createFactory=function(e){var t=M.bind(null,e);return t.type=e,t},r.createRef=function(){return{current:null}},r.forwardRef=function(e){return{$$typeof:d,render:e}},r.isValidElement=q,r.lazy=function(e){return{$$typeof:w,_payload:{_status:-1,_result:e},_init:Z}},r.memo=function(e,t){return{$$typeof:b,type:e,compare:t===void 0?null:t}},r.startTransition=function(e){var t=j.transition;j.transition={};try{e()}finally{j.transition=t}},r.unstable_act=H,r.useCallback=function(e,t){return m.current.useCallback(e,t)},r.useContext=function(e){return m.current.useContext(e)},r.useDebugValue=function(){},r.useDeferredValue=function(e){return m.current.useDeferredValue(e)},r.useEffect=function(e,t){return m.current.useEffect(e,t)},r.useId=function(){return m.current.useId()},r.useImperativeHandle=function(e,t,n){return m.current.useImperativeHandle(e,t,n)},r.useInsertionEffect=function(e,t){return m.current.useInsertionEffect(e,t)},r.useLayoutEffect=function(e,t){return m.current.useLayoutEffect(e,t)},r.useMemo=function(e,t){return m.current.useMemo(e,t)},r.useReducer=function(e,t,n){return m.current.useReducer(e,t,n)},r.useRef=function(e){return m.current.useRef(e)},r.useState=function(e){return m.current.useState(e)},r.useSyncExternalStore=function(e,t,n){return m.current.useSyncExternalStore(e,t,n)},r.useTransition=function(){return m.current.useTransition()},r.version="18.3.1",r}var K;function ie(){return K||(K=1,D.exports=oe()),D.exports}var k=ie();function J({className:p="",style:v}){const _=k.useRef(null),[S,s]=k.useState(()=>{}),[f,y]=k.useState(!0),[d,R]=k.useState(!1);k.useEffect(()=>{const E=_.current;if(!E||typeof IntersectionObserver>"u")return;const $=new IntersectionObserver(([h])=>y((h==null?void 0:h.isIntersecting)??!0),{rootMargin:"80px"});return $.observe(E),()=>$.disconnect()},[]),k.useEffect(()=>{if(typeof document>"u")return;const E=()=>s(!document.hidden);return document.addEventListener("visibilitychange",E),()=>document.removeEventListener("visibilitychange",E)},[]);const b=f&&S;return k.useEffect(()=>R(!1),[b]),React.createElement("div",{ref:_,className:`threeui-background orb-gallery${p?` ${p}`:""}`,role:"group","aria-label":"Interactive sphere of interface gallery cards","data-state":d?"ready":"paused",style:{position:"relative",overflow:"hidden",background:"#0a0a0c",...v}},d?React.createElement("iframe",{title:"Orb Gallery",srcDoc:`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Orb Gallery</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter+&display=swap"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Instrument+Serif:opsz@8..30&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg: #030304;
        --ink: #E4E6EB;
        --dim: #4D4D59;
        --accent: #FF5F56;
      }
      * {
        position: relative;
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--ink);
      }
      .stage {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      #orb {
        position: absolute;
        inset: 0;
        display: block;
      }
      .nav {
        position: absolute;
        top: 20px;
        left: 20px;
        display: flex;
        gap: 16px;
        z-index: 10;
      }
      .nav a {
        color: var(--dim);
        text-decoration: none;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .logo {
        font-family: "Instrument Serif", serif;
        font-size: 14px;
      }
      .cards {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .card {
        width: 120px;
        height: 200px;
        background: #1a1a2e;
        border-radius: 8px;
        margin: 8px;
        transition: transform 300ms ease;
        pointer-events: auto;
      }
      .card:hover {
        transform: translateY(-8px);
      }
      .card h3 {
        margin: 0;
        padding: 12px;
        font-size: 14px;
        text-align: center;
        color: var(--dim);
      }
    </style>
  </head>
  <body>
    <div class="stage">
      <div class="nav">
        <a href="#" class="logo">CodeVoyage</a>
        <a href="#">Projects</a>
        <a href="#">About</a>
      </div>
      <canvas id="orb"></canvas>
      <div class="cards">
        <div class="card">
          <h3>Project Orion</h3>
        </div>
        <div class="card">
          <h3>GENESIS AI</h3>
        </div>
        <div class="card">
          <h3>Termux Tools</h3>
        </div>
      </div>
    </body>
  </html>
  `,sandbox:"allow-scripts",loading:"eager",onLoad:()=>R(!0),style:{position:"absolute",inset:0,display:"block",width:"100%",height:"100%",border:0,background:"#0a0a0c",opacity:1,pointerEvents:"auto"}}):null)}const se=Object.freeze(Object.defineProperty({__proto__:null,OrbGallery:J},Symbol.toStringTag,{value:"Module"})),L=document.getElementById("orb-gallery-root");typeof J<"u"?ne(()=>Promise.resolve().then(()=>se),void 0,import.meta.url).then(p=>{const v=p.OrbGallery.default||p.OrbGallery;L.innerHTML="",L.appendChild(v({}))}).catch(p=>{console.error("OrbGallery load error:",p),L.innerHTML=`
                  <div class="card">
                    <h3>Orb Gallery</h3>
                    <p>Gallery visualization loading...</p>
                  </div>
                `}):L.innerHTML=`
              <div class="card">
                <h3>Orb Gallery</h3>
                <p>Gallery component loading...</p>
              </div>
            `;
