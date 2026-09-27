import"./NZTpNUN0.js";import"./B-EN1fuD.js";import{g as B,a as C,b as v,ai as I,p as L,h,i as O,u as P,j as s,f as E,d as x,aj as U,r as y,s as X,t as k,ak as T,c as Y,k as c,e as z}from"./DN6kR-x0.js";import{I as G,s as H,b as $,c as q}from"./KoKtNJYn.js";import{l as A,s as D,p as F}from"./8BMz-fWT.js";import{b as w,i as J}from"./D9HSQ3sq.js";import{ad as K,ae as Q}from"./CkgR09Na.js";function it(m,i){const u=A(i,["children","$$slots","$$events","$$legacy"]);/**
 * @license lucide-svelte v0.554.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const n=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];G(m,D({name:"upload"},()=>u,{get iconNode(){return n},children:(p,l)=>{var a=B(),r=C(a);H(r,i,"default",{}),v(p,a)},$$slots:{default:!0}}))}var S=E("<span> </span>"),V=E('<span role="tooltip"><!></span> <!>',1);function rt(m,i){L(i,!0);let u=F(i,"position",3,"top"),n=h(!1),p=null,l,a=h(void 0),r=h(O({x:0,y:0}));function f(){p=setTimeout(()=>{if(!l)return;const t=l.getBoundingClientRect();switch(u()){case"top":c(r,{x:t.left+t.width/2,y:t.top-10},!0);break;case"bottom":c(r,{x:t.left+t.width/2,y:t.bottom+10},!0);break;case"left":c(r,{x:t.left-10,y:t.top+t.height/2},!0);break;case"right":c(r,{x:t.right+10,y:t.top+t.height/2},!0);break}c(n,!0)},500)}function d(){c(n,!1),p&&clearTimeout(p)}function g(t){if(!s(n)||!l)return;const e=l.getBoundingClientRect();t.clientX>=e.left&&t.clientX<=e.right&&t.clientY>=e.top&&t.clientY<=e.bottom||d()}P(()=>(s(n)&&s(a)&&(document.body.appendChild(s(a)),document.addEventListener("mousemove",g)),()=>{s(a)&&s(a).parentNode===document.body&&document.body.removeChild(s(a)),document.removeEventListener("mousemove",g)}));var _=V(),o=C(_);o.__focusin=f,o.__focusout=d,o.__touchstart=f,o.__touchend=d;var M=x(o);U(M,()=>i.children),y(o),w(o,t=>l=t,()=>l);var N=X(o,2);{var R=t=>{var e=S(),b=x(e,!0);y(e),w(e,j=>c(a,j),()=>s(a)),k(()=>{$(e,1,`tooltip tooltip-${u()??""}`,"svelte-14e12rk"),q(e,`left: ${s(r).x??""}px; top: ${s(r).y??""}px;`),z(b,i.text)}),K(3,e,()=>Q,()=>({duration:100})),v(t,e)};J(N,t=>{s(n)&&t(R)})}k(()=>$(o,1,`relative inline-block ${i.className??""}`,"svelte-14e12rk")),T("mouseenter",o,f),T("mouseleave",o,d),v(m,_),Y()}I(["focusin","focusout","touchstart","touchend"]);export{rt as T,it as U};
