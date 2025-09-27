// main.js - mobile nav, slider, form validation, small utilities
document.addEventListener('DOMContentLoaded', () => {
  // Set year in footer
  const y = new Date().getFullYear();
  ['year','year2','year3'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  // Mobile nav toggles (multiple headers safe)
  document.querySelectorAll('.nav-toggle').forEach(button=>{
    button.addEventListener('click', ()=>{
      // find the nearest nav sibling
      const parent = button.closest('.header-inner') || document;
      const nav = parent.querySelector('.nav');
      if(!nav) return;
      nav.style.display = nav.style.display === 'block' ? '' : 'block';
      button.setAttribute('aria-expanded', nav.style.display === 'block');
    });
  });

  // Simple slider (text slides)
  const slidesContainer = document.getElementById('slides');
  if(slidesContainer){
    const slides = slidesContainer.children;
    let index = 0;
    function show(i){
      // translate slides container
      slidesContainer.style.transform = `translateX(-${i * 100}%)`;
      index = i;
    }
    // wrap in next/prev
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    if(next) next.addEventListener('click', ()=> show( (index + 1) % slides.length ) );
    if(prev) prev.addEventListener('click', ()=> show( (index - 1 + slides.length) % slides.length ) );

    // auto-advance
    setInterval(()=> show( (index + 1) % slides.length ), 4500);
  }

  // Contact form validation
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      const feedback = document.getElementById('formFeedback');

      // basic validation
      let ok = true;
      if(!name.value || name.value.trim().length < 2) { ok = false; name.classList.add('error'); }
      else name.classList.remove('error');

      if(!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) { ok = false; email.classList.add('error'); }
      else email.classList.remove('error');

      if(!message.value || message.value.trim().length < 10) { ok = false; message.classList.add('error'); }
      else message.classList.remove('error');

      if(!ok){
        feedback.textContent = 'Please fill in valid details.';
        feedback.style.color = 'salmon';
        return;
      }

      // Simulate submit (for static site). Replace with real endpoint if available.
      feedback.textContent = 'Thanks — your message has been received (demo).';
      feedback.style.color = 'lightgreen';
      contactForm.reset();
    });
  }
});
