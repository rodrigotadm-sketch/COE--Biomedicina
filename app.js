
(async()=>{
const root=document.getElementById('coe-app');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let D;
try{
  D=await fetch('coe.json',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()});
}catch(e){
  root.innerHTML='<div class="panel">Não foi possível carregar os dados da COE.</div>';
  return;
}

function memberCard(m){
 const coord=!!m.course_role;
 return `<article class="card ${coord?'coordination':''}">
   <div class="badges"><span class="badge">${esc(m.role)}</span>${m.status?`<span class="badge status">${esc(m.status)}</span>`:''}</div>
   <h3>${esc(m.name)}</h3>
   <div class="dept">${esc(m.department)}</div>
   ${m.course_role?`<div class="course-role">${esc(m.course_role)}</div>`:''}
   <div class="actions">
     ${m.email?`<a href="mailto:${esc(m.email)}">E-mail</a>`:''}
     ${m.lattes?`<a href="${esc(m.lattes)}" target="_blank" rel="noopener">Currículo Lattes</a>`:''}
   </div>
 </article>`;
}

root.innerHTML=`
<section class="hero">
  <div class="eyebrow">UFPR · CURSO DE BIOMEDICINA</div>
  <h1>${esc(D.title)}</h1>
  <p>${esc(D.course)}</p>
</section>

<section class="section">
  <h2>Composição atual</h2>
  <div class="member-grid">${D.members.map(memberCard).join('')}</div>
</section>

<section class="section">
  <h2>O que é a COE</h2>
  <div class="panel">${esc(D.intro)}</div>
</section>

<section class="section">
  <h2>Principais atribuições</h2>
  <div class="attrib-grid">
    ${D.attributions.map(a=>`<article class="attrib"><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`).join('')}
  </div>
</section>

<section class="section">
  <h2>Responsáveis por modalidade de estágio</h2>
  <div class="responsibility-grid">
   ${D.responsibilities.map(r=>`<article class="responsibility">
      <h3>${esc(r.area)}</h3>
      <p>${esc(r.description)}</p>
      <div class="who">${esc(r.responsible)}</div>
      <div class="dept">${esc(r.department)}</div>
   </article>`).join('')}
  </div>
</section>

<section class="section">
  <h2>Documentos e orientações</h2>
  <div class="links-grid">
    ${D.quick_links.map(l=>`<article class="link-card"><div><strong>${esc(l.label)}</strong></div><p>${esc(l.description)}</p><div><a href="${esc(l.url)}" target="_blank" rel="noopener">Acessar</a></div></article>`).join('')}
  </div>
</section>

<section class="section">
  <h2>Contato</h2>
  <div class="panel">
    <div class="contact"><a href="mailto:${esc(D.contact.email)}">${esc(D.contact.email)}</a><span>${esc(D.contact.phone)}</span></div>
    <div class="dept" style="margin-top:8px">${esc(D.contact.address)}</div>
  </div>
</section>`;
})();
