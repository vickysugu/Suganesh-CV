
const bar=document.getElementById('progressBar');
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.width=(window.scrollY/Math.max(h,1)*100)+'%';
});
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.pipeline .pipe-step').forEach((el,i)=>{
  el.style.transitionDelay=(i*70)+'ms';
});

document.getElementById('themeBtn').addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  document.getElementById('themeBtn').textContent=document.body.classList.contains('dark')?'☀':'☾';
});

const hero=document.querySelector('.hero');
window.addEventListener('scroll',()=>{
  const y=Math.min(window.scrollY,800);
  const mountain=document.querySelector('.hero-mountain');
  if(mountain) mountain.style.transform=`translateY(${y*.10}px)`;
  document.querySelectorAll('.cloud').forEach((c,i)=>c.style.transform=`translateX(${y*(i?-.035:.025)}px)`);
});
