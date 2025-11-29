/* ============================================
   ZATAN - Main JavaScript
   Funcionalidades gerais e inicialização
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes
  initAccessibility();
  initSmoothScroll();
  initFormValidation();
  initVideoAudio();
});

// Acessibilidade
function initAccessibility() {
  // Adicionar aria-labels em ícones sem texto
  document.querySelectorAll('i[class*="icon"], .icon').forEach(icon => {
    if (!icon.getAttribute('aria-label') && !icon.textContent.trim()) {
      const parent = icon.closest('a, button');
      if (parent && parent.textContent.trim()) {
        icon.setAttribute('aria-hidden', 'true');
      } else {
        icon.setAttribute('aria-label', 'Ícone');
      }
    }
  });

  // Melhorar navegação por teclado
  document.querySelectorAll('a, button').forEach(element => {
    if (!element.hasAttribute('tabindex') && !element.disabled) {
      element.setAttribute('tabindex', '0');
    }
  });
}

// Scroll suave
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Validação de formulários
function initFormValidation() {
  const forms = document.querySelectorAll('.form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const errors = validateForm(form);
      
      if (errors.length === 0) {
        // Simular envio (sem backend)
        showFormSuccess(form);
        form.reset();
      } else {
        showFormErrors(form, errors);
      }
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });
    });
  });
}

function validateForm(form) {
  const errors = [];
  const requiredFields = form.querySelectorAll('[required]');
  
  requiredFields.forEach(field => {
    const error = validateField(field);
    if (error) {
      errors.push({ field, error });
    }
  });

  // Validação de email
  const emailFields = form.querySelectorAll('input[type="email"]');
  emailFields.forEach(field => {
    if (field.value && !isValidEmail(field.value)) {
      errors.push({ field, error: 'Email inválido' });
    }
  });

  return errors;
}

function validateField(field) {
  const errorElement = field.parentElement.querySelector('.form__error');
  
  // Limpar erro anterior
  if (errorElement) {
    errorElement.classList.remove('active');
    errorElement.textContent = '';
  }

  // Validar campo obrigatório
  if (field.hasAttribute('required') && !field.value.trim()) {
    showFieldError(field, 'Este campo é obrigatório');
    return 'Campo obrigatório';
  }

  // Validar email
  if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
    showFieldError(field, 'Email inválido');
    return 'Email inválido';
  }

  return null;
}

function showFieldError(field, message) {
  let errorElement = field.parentElement.querySelector('.form__error');
  
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.className = 'form__error';
    field.parentElement.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  errorElement.classList.add('active');
  field.setAttribute('aria-invalid', 'true');
}

function showFormErrors(form, errors) {
  errors.forEach(({ field, error }) => {
    showFieldError(field, error);
  });
}

function showFormSuccess(form) {
  const successElement = form.querySelector('.form__success');
  if (successElement) {
    successElement.classList.add('active');
    successElement.textContent = 'Mensagem enviada com sucesso! Obrigado pelo seu feedback.';
    
    // Esconder após 5 segundos
    setTimeout(() => {
      successElement.classList.remove('active');
    }, 5000);
  } else {
    alert('Mensagem enviada com sucesso! Obrigado pelo seu feedback.');
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Inicializar vídeos e áudios
function initVideoAudio() {
  // Adicionar controles de acessibilidade
  document.querySelectorAll('video, audio').forEach(media => {
    if (!media.hasAttribute('controls')) {
      media.setAttribute('controls', '');
    }
    
    // Adicionar aria-label se não tiver
    if (!media.getAttribute('aria-label')) {
      const title = media.getAttribute('title') || 'Mídia';
      media.setAttribute('aria-label', title);
    }
  });
}

// Função utilitária para detectar mobile
function isMobile() {
  return window.innerWidth <= 768;
}

// Função para scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Exportar funções globais
window.ZATAN = {
  scrollToTop,
  isMobile
};

