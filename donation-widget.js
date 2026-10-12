var SibilliniEuropaDonationWidget=(function(u){"use strict";function o(t){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function d(t,n,e){return[...t.querySelectorAll(n)].filter(i=>i.dataset[e]!=="true")}function c(t,n){t.dataset[n]="true"}function f(t,n,e){t.dataset.state=e,t.textContent=n}const m="EUR",p="Sostieni l'associazione",b="Altro importo";function s(t){const n=t?.trim();if(!n)return null;try{const e=new URL(n);return e.protocol==="https:"?e.href:null}catch{return null}}function g(t){return t?t.split(",").map(n=>{const e=n.indexOf(":");if(e===-1)return null;const i=Number.parseFloat(n.slice(0,e).trim()),r=s(n.slice(e+1));return Number.isFinite(i)&&i>0&&r?{amount:i,url:r}:null}).filter(Boolean):[]}function A(t,n){try{return new Intl.NumberFormat("it-IT",{style:"currency",currency:n,maximumFractionDigits:0}).format(t)}catch{return`${t} ${n}`}}function L(t){const n=t.dataset.donationCurrency?.trim()||m,e=s(t.dataset.donationUrl),i=g(t.dataset.donationLinks).map(({amount:a,url:E})=>({label:A(a,n),url:E}));e&&i.length>0&&i.push({label:b,url:e});const r=i[0]?.url??e;return r?{options:i,defaultUrl:r,label:t.dataset.donationLabel?.trim()||p}:null}function w(t,n){t.dataset.state="ready",t.innerHTML=`
    <div class="dw-form">
      ${n.options.length>0?`
        <div class="dw-amounts" role="group" aria-label="Importo donazione">
          ${n.options.map((r,a)=>`
            <button type="button" class="dw-amount-btn" data-url="${o(r.url)}" aria-pressed="${a===0}">${o(r.label)}</button>
          `).join("")}
        </div>
      `:""}

      <a class="dw-submit" href="${o(n.defaultUrl)}" target="_blank" rel="noopener">${o(n.label)}</a>
    </div>
  `;const e=t.querySelector(".dw-submit"),i=[...t.querySelectorAll(".dw-amount-btn")];i.forEach(r=>{r.addEventListener("click",()=>{e.href=r.dataset.url,i.forEach(a=>a.setAttribute("aria-pressed",String(a===r)))})})}function l(t=document){const n=d(t,".donation-widget","dwInitialized");if(n.length!==0)for(const e of n){c(e,"dwInitialized");const i=L(e);if(!i){f(e,"Donation widget: manca un link di pagamento SumUp valido (data-donation-url o data-donation-links).","error");continue}w(e,i)}}return typeof window<"u"&&(window.DonationWidget={init:l},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{l()},{once:!0}):l()),u.initDonationWidgets=l,Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),u})({});
