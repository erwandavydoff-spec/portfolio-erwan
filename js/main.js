(function(){
  // Cursor
  const c = document.getElementById('cursor');
  const cb = document.getElementById('cursor-blur');
  if(c && cb){
    document.addEventListener('mousemove', (e)=>{
      c.style.left = e.clientX + 'px';
      c.style.top = e.clientY + 'px';
      cb.style.left = e.clientX + 'px';
      cb.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseenter', ()=>{ c.style.display='block'; cb.style.display='block'; });
    document.addEventListener('mouseleave', ()=>{ c.style.display='none'; cb.style.display='none'; });
  }

  // Mobile menu
  const navToggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('mobile-menu');
  function closeMobile(){ mobile && mobile.classList.remove('open'); }
  if(navToggle && mobile){
    navToggle.addEventListener('click', ()=> mobile.classList.toggle('open'));
    window.closeMobile = closeMobile; // used by inline onclicks
  }

  // Reveal observer
  const ro = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  },{threshold:0.18});
  document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

  // Simple terminal animation
  const term = document.getElementById('term-output');
  if(term){
    const lines = [
      'erwan@kali:~$ git status',
      'Sur la branche main',
      'Rien à valider, working tree clean',
      'erwan@kali:~$ echo "Hello from Erwan"'
    ];
    let i=0;
    function pushLine(){
      if(i>=lines.length) return;
      const div = document.createElement('div'); div.className='to'; div.textContent = lines[i++];
      term.appendChild(div); term.scrollTop = term.scrollHeight; setTimeout(pushLine, 900);
    }
    setTimeout(pushLine, 800);
  }
})();