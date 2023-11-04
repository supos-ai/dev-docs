const p=e=>history.state&&history.replaceState(e,""),A=!!document.startViewTransition,y=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),S=e=>document.dispatchEvent(new Event(e)),v=()=>S("astro:page-load"),f="data-astro-transition-persist";let d=0;history.state?(d=history.state.index,scrollTo({left:0,top:history.state.scrollY})):y()&&history.replaceState({index:d,scrollY},"");const x=(e,n)=>{let t=!1,r=!1;return(...a)=>{if(t){r=!0;return}e(...a),t=!0,setTimeout(()=>{r&&(r=!1,e(...a)),t=!1},n)}};async function L(e){const n=await fetch(e),t=await n.text();return{ok:n.ok,html:t}}function T(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function k(){for(const e of document.scripts)e.dataset.astroExec=""}function R(){let e=Promise.resolve();for(const n of Array.from(document.scripts)){if(n.dataset.astroExec==="")continue;const t=document.createElement("script");t.innerHTML=n.innerHTML;for(const r of n.attributes){if(r.name==="src"){const a=new Promise(m=>{t.onload=m});e=e.then(()=>a)}t.setAttribute(r.name,r.value)}t.dataset.astroExec="",n.replaceWith(t)}return e}function q(e){const n=e.effect;return!n||!(n instanceof KeyframeEffect)||!n.target?!1:window.getComputedStyle(n.target,n.pseudoElement).animationIterationCount==="infinite"}const P=new DOMParser;async function E(e,n,t,r){const a=s=>{const l=s.getAttribute(f),u=l&&e.head.querySelector(`[${f}="${l}"]`);if(u)return u;if(s.matches("link[rel=stylesheet]")){const i=s.getAttribute("href");return e.head.querySelector(`link[rel=stylesheet][href="${i}"]`)}if(s.tagName==="SCRIPT"){let i=s;for(const o of e.scripts)if(i.textContent&&i.textContent===o.textContent||i.type===o.type&&i.src===o.src)return o}return null},m=()=>{e.querySelectorAll("head noscript").forEach(o=>o.remove());const s=document.documentElement,l=[...s.attributes].filter(({name:o})=>(s.removeAttribute(o),o.startsWith("data-astro-")));[...e.documentElement.attributes,...l].forEach(({name:o,value:c})=>s.setAttribute(o,c));for(const o of Array.from(document.head.children)){const c=a(o);c?c.remove():o.remove()}document.head.append(...e.head.children);const u=document.body;document.body.replaceWith(e.body);for(const o of u.querySelectorAll(`[${f}]`)){const c=o.getAttribute(f),g=document.querySelector(`[${f}="${c}"]`);g&&g.replaceWith(o)}scrollTo({left:0,top:0,behavior:"instant"});let i=0;if(!t&&n.hash){const o=decodeURIComponent(n.hash.slice(1)),c=document.getElementById(o);c&&(i=c.offsetTop)&&c.scrollIntoView()}else t&&t.scrollY!==0&&scrollTo(0,t.scrollY);!t&&history.pushState({index:++d,scrollY:i},"",n.href),S("astro:after-swap")},h=[];for(const s of e.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${f}="${s.getAttribute(f)}"], link[rel=stylesheet]`)){const l=document.createElement("link");l.setAttribute("rel","preload"),l.setAttribute("as","style"),l.setAttribute("href",s.getAttribute("href")),h.push(new Promise(u=>{["load","error"].forEach(i=>l.addEventListener(i,u)),document.head.append(l)}))}if(h.length&&await Promise.all(h),r==="animate"){const s=document.getAnimations();document.documentElement.dataset.astroTransitionFallback="old";const l=document.getAnimations().filter(o=>!s.includes(o)&&!q(o)),u=Promise.all(l.map(o=>o.finished)),i=()=>{m(),document.documentElement.dataset.astroTransitionFallback="new"};await u,i()}else m()}async function w(e,n,t){let r;const a=n.href,{html:m,ok:h}=await L(a);if(!h){location.href=a;return}const s=P.parseFromString(m,"text/html");if(!s.querySelector('[name="astro-view-transitions-enabled"]')){location.href=a;return}document.documentElement.dataset.astroTransition=e,A?r=document.startViewTransition(()=>E(s,n,t)).finished:r=E(s,n,t,T());try{await r}finally{await R(),k(),v()}}function I(e){if(document.querySelector(`link[rel=prefetch][href="${e}"]`))return;if(navigator.connection){let t=navigator.connection;if(t.saveData||/(2|3)g/.test(t.effectiveType||""))return}let n=document.createElement("link");n.setAttribute("rel","prefetch"),n.setAttribute("href",e),document.head.append(n)}if(A||T()!=="none"){k(),document.addEventListener("click",n=>{let t=n.target;if(t instanceof Element&&t.tagName!=="A"&&(t=t.closest("a")),!(!t||!(t instanceof HTMLAnchorElement)||t.dataset.astroReload!==void 0||t.hasAttribute("download")||!t.href||t.target&&t.target!=="_self"||t.origin!==location.origin||n.button!==0||n.metaKey||n.ctrlKey||n.altKey||n.shiftKey||n.defaultPrevented||!y())){if(location.pathname===t.pathname&&location.search===t.search){if(t.hash)return;if(n.preventDefault(),p({...history.state,scrollY}),scrollTo({left:0,top:0,behavior:"instant"}),location.hash){const r={index:++d,scrollY:0};history.pushState(r,"",t.href)}return}n.preventDefault(),p({index:d,scrollY}),w("forward",new URL(t.href))}}),addEventListener("popstate",n=>{if(!y()&&n.state){history.scrollRestoration&&(history.scrollRestoration="manual"),location.reload();return}if(n.state===null){history.scrollRestoration&&(history.scrollRestoration="auto");return}history.scrollRestoration&&(history.scrollRestoration="manual");const t=history.state,r=t.index,a=r>d?"forward":"back";d=r,w(a,new URL(location.href),t)}),["mouseenter","touchstart","focus"].forEach(n=>{document.addEventListener(n,t=>{if(t.target instanceof HTMLAnchorElement){let r=t.target;r.origin===location.origin&&r.pathname!==location.pathname&&y()&&I(r.pathname)}},{passive:!0,capture:!0})}),addEventListener("load",v);const e=()=>{p({...history.state,scrollY})};"onscrollend"in window?addEventListener("scrollend",e):addEventListener("scroll",x(e,300))}const M=document.querySelectorAll(".toggle-menu"),b=document.getElementById("mobileMenuContainer");M.forEach(e=>{e.addEventListener("click",()=>Y())});function Y(){const e=document.body.style.overflow==="";b.classList.toggle("translate-x-full",!e),b.classList.toggle("translate-x-0",e),document.body.style.overflow=e?"hidden":""}
