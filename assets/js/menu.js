/* ============================================
   ZATAN - Menu Navigation
   Controle do menu mobile e navegação
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__link');
  const currentPath = window.location.pathname;

  // Toggle menu mobile
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      const isOpen = navList.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // Fechar menu ao clicar em um link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navList) {
        navList.classList.remove('active');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.innerHTML = '☰';
        }
      }
    });
  });

  // Marcar link ativo baseado na URL atual
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPath = href.split('/').pop() || 'index.html';
      const currentPage = currentPath.split('/').pop() || 'index.html';
      
      if (linkPath === currentPage || 
          (currentPage === '' && linkPath === 'index.html') ||
          (currentPage === 'index.html' && linkPath === 'index.html')) {
        link.classList.add('active');
      }
    }
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (navList && menuToggle && 
        !navList.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        navList.classList.contains('active')) {
      navList.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.innerHTML = '☰';
    }
  });
});

