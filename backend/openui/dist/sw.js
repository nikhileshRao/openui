if(!self.define){let s,e={};const r=(r,i)=>(r=new URL(r+".js",i).href,e[r]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=r,s.onload=e,document.head.appendChild(s)}else s=r,importScripts(r),e()})).then((()=>{let s=e[r];if(!s)throw new Error(`Module ${r} didn’t register its module`);return s})));self.define=(i,n)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let o={};const t=s=>r(s,l),u={module:{uri:l},exports:o,require:t};e[l]=Promise.all(i.map((s=>u[s]||t(s)))).then((s=>(n(...s),o)))}}define(["./workbox-e1498109"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/babel-IQvuBHGA.js",revision:null},{url:"assets/CodeEditor-DM7e4Gfc.css",revision:null},{url:"assets/css-D1nB4Vcj.js",revision:null},{url:"assets/cssMode-FlSRPesK.js",revision:null},{url:"assets/html-Bd8jYZaa.js",revision:null},{url:"assets/html-DCTwL4e8.js",revision:null},{url:"assets/htmlMode-DcY2Qxr1.js",revision:null},{url:"assets/index-AyJwV1cd.css",revision:null},{url:"assets/index-BiDGAi_0.js",revision:null},{url:"assets/index-C79-nTMu.js",revision:null},{url:"assets/javascript-Bg8GUAtk.js",revision:null},{url:"assets/jsonMode-DSaY_-6V.js",revision:null},{url:"assets/markdown-7fQo6M4U.js",revision:null},{url:"assets/python-Dz57yKmt.js",revision:null},{url:"assets/standalone-HCIxKaAs.js",revision:null},{url:"assets/tsMode-BRfRgEPk.js",revision:null},{url:"assets/typescript-vWwIJH5m.js",revision:null},{url:"assets/yaml-DUTHxadb.js",revision:null},{url:"index.html",revision:"bbeba4dca8aa6559609de6d75ca03ff8"},{url:"logo.html",revision:"1feff685e57903f47db0338c082a26bf"},{url:"monacoeditorwork/css.worker.bundle.js",revision:"5a4960d89b4a1295264c1e4a3efa976d"},{url:"monacoeditorwork/editor.worker.bundle.js",revision:"9f3f43027e5c4718ddd195e431f9ad08"},{url:"monacoeditorwork/html.worker.bundle.js",revision:"dc378a1ea0ebd13c838930af3a1977b3"},{url:"monacoeditorwork/json.worker.bundle.js",revision:"e3d6c4834c086c6bbeff384984294140"},{url:"monacoeditorwork/tailwindcss.worker.bundle.js",revision:"c2b63abe4c80c6dd380978a4c10eb5b4"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"android-chrome-192x192.png",revision:"eaf4520b1ec5faf4542d685e9189bc9f"},{url:"android-chrome-512x512.png",revision:"6e102092d3749b94851ac1ee4037359a"},{url:"manifest.webmanifest",revision:"1c486f0c42305f6ff105d0688762966c"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"),{denylist:[/\/openui\/.*/]}))}));
