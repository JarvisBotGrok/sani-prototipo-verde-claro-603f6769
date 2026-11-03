// Protótipo da Rede - T.I — JS vanilla: menu fullscreen, reveal, timeline, bottom sheet, galeria
document.documentElement.classList.remove('no-js');
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const mb=$('.menu-btn');if(mb)mb.addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');mb.setAttribute('aria-expanded',o)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.classList.remove('menu-open','sheet-open');mb&&mb.setAttribute('aria-expanded',false)}});
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver' in window&&!rm){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el))}else $$('.reveal').forEach(el=>el.classList.add('on'));
// timeline (tabs ARIA)
const tabs=$$('[role=tab]');tabs.forEach((t,i)=>{t.addEventListener('click',()=>sel(i));t.addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight'].includes(e.key)){e.preventDefault();sel((i+1)%tabs.length,1)}if(['ArrowUp','ArrowLeft'].includes(e.key)){e.preventDefault();sel((i-1+tabs.length)%tabs.length,1)}})});
function sel(i,f){tabs.forEach((t,j)=>{t.setAttribute('aria-selected',i===j);t.tabIndex=i===j?0:-1;const p=document.getElementById(t.getAttribute('aria-controls'));p.hidden=i!==j;if(i===j){p.classList.remove('in');void p.offsetWidth;p.classList.add('in')}});if(f)tabs[i].focus()}
// bottom sheet filtros
$$('[data-sheet]').forEach(b=>b.addEventListener('click',()=>document.body.classList.toggle('sheet-open',b.dataset.sheet==='open')));
// galeria
$$('.thumbs button').forEach(b=>b.addEventListener('click',()=>{$$('.thumbs button').forEach(x=>x.setAttribute('aria-pressed',x===b));$('.gallery .gl').textContent=b.dataset.label}));
