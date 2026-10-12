var SibilliniEuropaDonationWidget=(function(s){"use strict";function r(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function d(t,n,e){return[...t.querySelectorAll(n)].filter(i=>i.dataset[e]!=="true")}function c(t,n){t.dataset[n]="true"}function f(t,n,e){t.dataset.state=e,t.textContent=n}const p="EUR",m="Sostienici",b="Altro importo";function u(t){const n=t?.trim();if(!n)return null;try{const e=new URL(n);return e.protocol==="https:"?e.href:null}catch{return null}}function w(t){return t?t.split(",").map(n=>{const e=n.indexOf(":");if(e===-1)return null;const i=Number.parseFloat(n.slice(0,e).trim()),a=u(n.slice(e+1));return Number.isFinite(i)&&i>0&&a?{amount:i,url:a}:null}).filter(Boolean):[]}function g(t,n){try{return new Intl.NumberFormat("it-IT",{style:"currency",currency:n,maximumFractionDigits:0}).format(t)}catch{return`${t} ${n}`}}function h(t){const n=t.dataset.donationCurrency?.trim()||p,e=u(t.dataset.donationUrl),i=w(t.dataset.donationLinks).map(({amount:o,url:L})=>({label:g(o,n),url:L}));e&&i.length>0&&i.push({label:b,url:e});const a=i[0]?.url??e;return a?{options:i,defaultUrl:a,title:t.dataset.donationTitle?.trim()||m,subtitle:t.dataset.donationSubtitle?.trim()||""}:null}function A(t,n){t.dataset.state="ready",t.innerHTML=`
    <section class="dw-shell" aria-label="${r(n.title)}">
      <header class="dw-header">
        <p class="dw-kicker">Donazione</p>
        <h4 class="dw-title">${r(n.title)}</h4>
        ${n.subtitle?`<p class="dw-subtitle">${r(n.subtitle)}</p>`:""}
      </header>

      <div class="dw-form">
        ${n.options.length>0?`
          <div class="dw-amounts" role="group" aria-label="Importo donazione">
            ${n.options.map((a,o)=>`
              <button type="button" class="dw-amount-btn" data-url="${r(a.url)}" aria-pressed="${o===0}">${r(a.label)}</button>
            `).join("")}
          </div>
        `:""}

        <a class="dw-submit" href="${r(n.defaultUrl)}" target="_blank" rel="noopener">Dona con SumUp</a>
      </div>
    </section>
  `;const e=t.querySelector(".dw-submit"),i=[...t.querySelectorAll(".dw-amount-btn")];i.forEach(a=>{a.addEventListener("click",()=>{e.href=a.dataset.url,i.forEach(o=>o.setAttribute("aria-pressed",String(o===a)))})})}function l(t=document){const n=d(t,".donation-widget","dwInitialized");if(n.length!==0)for(const e of n){c(e,"dwInitialized");const i=h(e);if(!i){f(e,"Donation widget: manca un link di pagamento SumUp valido (data-donation-url o data-donation-links).","error");continue}A(e,i)}}return typeof window<"u"&&(window.DonationWidget={init:l},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{l()},{once:!0}):l()),s.initDonationWidgets=l,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),s})({});
