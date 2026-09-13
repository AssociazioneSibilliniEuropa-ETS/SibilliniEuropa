var SibilliniEuropaCommitteeWidget=(function(s){"use strict";const c={"scientific-committee":{title:"Comitato Scientifico",members:[{name:"Prof.ssa Alessandra Bitumi",institution:"Università di Teramo"},{name:"Prof. Alessandro Mulieri",institution:"CNRS Centre National de la Recherche Scientifique"},{name:"Prof Alessio Bartolacelli",institution:"Università di Modena e Reggio Emilia"},{name:"Prof.ssa Chiara Feliziani",institution:"Università di Macerata"},{name:"Dott.ssa Costanza Hermanin",institution:"European University Institute"},{name:"Prof.ssa Cristina Fasone",institution:"LUISS Guido Carli"},{name:"Dott. Dario Armini",institution:"Ministero degli Affari Esteri e della Cooperazione Internazionale"},{name:"Prof.ssa  Elena De Nictolis",institution:"LUISS Guido Carli"},{name:"Prof. Enrico Albanesi",institution:"Università di Genova"},{name:"Prof. Fabrizio Marongiu Buonaiuti",institution:"Università di Macerata"},{name:"Prof Gianluca Contaldi",institution:"Università di Macerata"},{name:"Dr. Joanna Kaminska",institution:"Parlamento Europeo"},{name:"Prof.ssa Laura Vagni",institution:"Università di Macerata"},{name:"Dott. Marco Valletta",institution:"Commissione Europea"},{name:"Prof. Mario Savino",institution:"Università della Tuscia"},{name:"Prof.ssa Mariolina Eliantonio",institution:"Università di Maastricht"},{name:"Prof. Mark Thatcher",institution:"LUISS Guido Carli"},{name:"Dott.ssa Michela Angeli",institution:"Rappresentanza permanente d’Italia presso l’Unione Europea"},{name:"Prof. Nicola Lucchi",institution:"Universitat Pompeu Fabra Barcelona"},{name:"Prof. Oreste Pollicino",institution:"Università Bocconi"},{name:"Dott.ssa Sara Cucci",institution:"Ministero degli Affari Esteri e della Cooperazione Internazionale"},{name:"Dott.ssa Simona Ardovino",institution:"Commissione Europea"},{name:"Prof.ssa Simona Romani",institution:"LUISS Guido Carli"}]}};function o(i){return String(i).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function d(i,e,t){return[...i.querySelectorAll(e)].filter(n=>n.dataset[t]!=="true")}function u(i,e){i.dataset[e]="true"}function l(i,e,t){i.dataset.state=t,i.textContent=e}function f(i,e,t){const n=Array.isArray(t.members)?t.members:[];if(n.length===0){l(i,`Committee "${e}" is empty or missing.`,"empty");return}const a=t.title||e;i.dataset.state="ready",i.innerHTML=`
    <section class="cmt-shell" aria-label="${o(a)}">
      <header class="cmt-header">
        <p class="cmt-kicker">Summer School</p>
        <h4 class="cmt-title">${o(a)}</h4>
      </header>

      <div class="cmt-table-wrap">
        <table class="cmt-table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Ente / Universit&agrave;</th>
            </tr>
          </thead>
          <tbody>
            ${n.map(m=>`
              <tr>
                <td data-label="Nome">${o(m.name)}</td>
                <td data-label="Ente / Universit&agrave;">${o(m.institution)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `}function r(i=document){const e=d(i,".committee-widget","cmtInitialized");if(e.length!==0)for(const t of e){const n=t.dataset.committeeSet||"scientific-committee",a=c[n];if(u(t,"cmtInitialized"),!a||!Array.isArray(a.members)||a.members.length===0){l(t,`Committee "${n}" is empty or missing.`,"empty");continue}f(t,n,a)}}return typeof window<"u"&&(window.CommitteeWidget={init:r},document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{r()},{once:!0}):r()),s.initCommitteeWidgets=r,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),s})({});
