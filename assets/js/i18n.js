/* ============================================
   ZATAN - Internationalization (i18n)
   Sistema de tradução multilíngue
   ============================================ */

const translations = {
  pt: {
    // Navegação
    nav: {
      inicio: 'Início',
      oQueE: 'O que é ZATAN?',
      mapa: 'Mapa Interativo',
      areas: 'Áreas e Regras',
      qrCode: 'QR Code',
      quiz: 'Quiz',
      contato: 'Contato'
    },
    // Hero
    hero: {
      title: 'ZATAN – Zoneamento do Litoral Sul de PE',
      subtitle: 'Sinalização Interativa por QR Code',
      btnMapa: 'Mapa Interativo',
      btnSobre: 'O que é ZATAN?',
      btnRegras: 'Áreas e Regras'
    },
    // Comum
    common: {
      inicio: 'Início',
      voltar: 'Voltar',
      proximo: 'Próximo',
      anterior: 'Anterior',
      enviar: 'Enviar',
      carregando: 'Carregando...',
      aguarde: 'Por favor, aguarde.'
    }
  },
  en: {
    nav: {
      inicio: 'Home',
      oQueE: 'What is ZATAN?',
      mapa: 'Interactive Map',
      areas: 'Areas and Rules',
      qrCode: 'QR Code',
      quiz: 'Quiz',
      contato: 'Contact'
    },
    hero: {
      title: 'ZATAN – Zoning of the South Coast of PE',
      subtitle: 'Interactive Signage by QR Code',
      btnMapa: 'Interactive Map',
      btnSobre: 'What is ZATAN?',
      btnRegras: 'Areas and Rules'
    },
    common: {
      inicio: 'Home',
      voltar: 'Back',
      proximo: 'Next',
      anterior: 'Previous',
      enviar: 'Send',
      carregando: 'Loading...',
      aguarde: 'Please wait.'
    }
  },
  es: {
    nav: {
      inicio: 'Inicio',
      oQueE: '¿Qué es ZATAN?',
      mapa: 'Mapa Interactivo',
      areas: 'Áreas y Reglas',
      qrCode: 'Código QR',
      quiz: 'Cuestionario',
      contato: 'Contacto'
    },
    hero: {
      title: 'ZATAN – Zonificación de la Costa Sur de PE',
      subtitle: 'Señalización Interactiva por Código QR',
      btnMapa: 'Mapa Interactivo',
      btnSobre: '¿Qué es ZATAN?',
      btnRegras: 'Áreas y Reglas'
    },
    common: {
      inicio: 'Inicio',
      voltar: 'Volver',
      proximo: 'Siguiente',
      anterior: 'Anterior',
      enviar: 'Enviar',
      carregando: 'Cargando...',
      aguarde: 'Por favor, espere.'
    }
  }
};


let currentLanguage = 'pt';

const LANGUAGE_INFO = {
  pt: { label: 'Português', flag: '🇧🇷', htmlLang: 'pt-BR' },
  en: { label: 'English', flag: '🇺🇸', htmlLang: 'en' },
  es: { label: 'Español', flag: '🇪🇸', htmlLang: 'es' }
};

// Metadados por página para título e descrição
const PAGE_META = {
  'index.html': {
    pt: {
      title: 'ZATAN - Zoneamento do Litoral Sul de PE',
      description: 'ZATAN - Zoneamento Ambiental e Territorial das Atividades Náuticas no litoral sul de Pernambuco. Sistema de sinalização interativa por QR Code.',
      keywords: 'ZATAN, zoneamento, litoral sul, Pernambuco, atividades náuticas, QR Code, sinalização'
    },
    en: {
      title: 'ZATAN - Zoning of the South Coast of PE',
      description: 'ZATAN - Environmental and Nautical Activities Zoning System on the south coast of Pernambuco, Brazil. Interactive QR Code-based signage.',
      keywords: 'ZATAN, zoning, south coast, Pernambuco, nautical activities, QR Code, signage'
    },
    es: {
      title: 'ZATAN - Zonificación de la Costa Sur de PE',
      description: 'ZATAN - Sistema de zonificación ambiental y de actividades náuticas en la costa sur de Pernambuco, Brasil. Señalización interactiva con códigos QR.',
      keywords: 'ZATAN, zonificación, costa sur, Pernambuco, actividades náuticas, código QR, señalización'
    }
  },
  'o-que-e-zatan.html': {
    pt: {
      title: 'O que é ZATAN? - ZATAN',
      description: 'O que é o ZATAN? Conheça o Zoneamento Ambiental e Territorial das Atividades Náuticas no litoral sul de Pernambuco.',
      keywords: ''
    },
    en: {
      title: 'What is ZATAN? - ZATAN',
      description: 'What is ZATAN? Learn about the Environmental and Nautical Activities Zoning System on the south coast of Pernambuco, Brazil.',
      keywords: ''
    },
    es: {
      title: '¿Qué es ZATAN? - ZATAN',
      description: '¿Qué es ZATAN? Conozca el Sistema de Zonificación Ambiental y de Actividades Náuticas en la costa sur de Pernambuco, Brasil.',
      keywords: ''
    }
  },
  'mapa-interativo.html': {
    pt: {
      title: 'Mapa Interativo - ZATAN',
      description: 'Mapa Interativo ZATAN - Visualize as zonas de zoneamento do litoral sul de Pernambuco.',
      keywords: ''
    },
    en: {
      title: 'Interactive Map - ZATAN',
      description: 'ZATAN Interactive Map - View zoning areas along the south coast of Pernambuco, Brazil.',
      keywords: ''
    },
    es: {
      title: 'Mapa Interactivo - ZATAN',
      description: 'Mapa Interactivo de ZATAN: visualice las zonas de zonificación de la costa sur de Pernambuco, Brasil.',
      keywords: ''
    }
  },
  'areas-regras.html': {
    pt: {
      title: 'Áreas e Regras - ZATAN',
      description: 'Áreas e Regras do ZATAN - Conheça as diretrizes e normas específicas para cada zona de uso no litoral sul de Pernambuco.',
      keywords: ''
    },
    en: {
      title: 'Areas and Rules - ZATAN',
      description: 'ZATAN Areas and Rules - Learn about the guidelines and specific rules for each use zone on the south coast of Pernambuco, Brazil.',
      keywords: ''
    },
    es: {
      title: 'Áreas y Reglas - ZATAN',
      description: 'ZATAN Áreas y Reglas: conozca las directrices y normas específicas para cada zona de uso en la costa sur de Pernambuco, Brasil.',
      keywords: ''
    }
  },
  'qr-code.html': {
    pt: {
      title: 'QR Code - ZATAN',
      description: 'QR Code ZATAN - Saiba como usar os códigos QR nas placas de sinalização do litoral sul de Pernambuco.',
      keywords: ''
    },
    en: {
      title: 'QR Code - ZATAN',
      description: 'ZATAN QR Code - Learn how to use QR codes on signage boards along the south coast of Pernambuco, Brazil.',
      keywords: ''
    },
    es: {
      title: 'Código QR - ZATAN',
      description: 'Código QR de ZATAN: aprenda a utilizar los códigos QR en las placas de señalización de la costa sur de Pernambuco, Brasil.',
      keywords: ''
    }
  },
  'quiz.html': {
    pt: {
      title: 'Quiz - ZATAN',
      description: 'Quiz ZATAN - Teste seus conhecimentos sobre o zoneamento ambiental e territorial das atividades náuticas.',
      keywords: ''
    },
    en: {
      title: 'Quiz - ZATAN',
      description: 'ZATAN Quiz - Test your knowledge about the environmental and nautical activities zoning system.',
      keywords: ''
    },
    es: {
      title: 'Cuestionario - ZATAN',
      description: 'Cuestionario ZATAN: ponga a prueba sus conocimientos sobre el sistema de zonificación ambiental y de actividades náuticas.',
      keywords: ''
    }
  },
  'contato.html': {
    pt: {
      title: 'Contato/Feedback - ZATAN',
      description: 'Contato ZATAN - Envie elogios, dúvidas, sugestões ou críticas sobre o zoneamento ambiental e territorial das atividades náuticas.',
      keywords: ''
    },
    en: {
      title: 'Contact/Feedback - ZATAN',
      description: 'ZATAN Contact - Send compliments, questions, suggestions or feedback about the environmental and nautical activities zoning system.',
      keywords: ''
    },
    es: {
      title: 'Contacto/Feedback - ZATAN',
      description: 'Contacto ZATAN: envíe elogios, dudas, sugerencias o comentarios sobre el sistema de zonificación ambiental y de actividades náuticas.',
      keywords: ''
    }
  }
};

// Função para obter tradução
function t(key, lang = currentLanguage) {
  const keys = key.split('.');
  let value = translations[lang];

  for (const k of keys) {
    if (value && Object.prototype.hasOwnProperty.call(value, k)) {
      value = value[k];
    } else {
      // Fallback para português
      value = translations.pt;
      for (const k2 of keys) {
        value = value[k2];
      }
      break;
    }
  }

  return value || key;
}

// Atualiza título, descrição e atributo lang do HTML
function applyPageMeta() {
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  const metaConfig = PAGE_META[fileName];

  if (!metaConfig) return;

  const pageLangConfig = metaConfig[currentLanguage] || metaConfig.pt;

  // Título
  if (pageLangConfig.title) {
    document.title = pageLangConfig.title;
  }

  // Meta description
  const descTag = document.querySelector('meta[name="description"]');
  if (descTag && pageLangConfig.description) {
    descTag.setAttribute('content', pageLangConfig.description);
  }

  // Meta keywords
  const keywordsTag = document.querySelector('meta[name="keywords"]');
  if (keywordsTag && pageLangConfig.keywords !== undefined) {
    keywordsTag.setAttribute('content', pageLangConfig.keywords);
  }

  // Atributo lang no HTML
  const info = LANGUAGE_INFO[currentLanguage];
  if (info && info.htmlLang) {
    document.documentElement.setAttribute('lang', info.htmlLang);
  }
}

// Função para atualizar textos na página (elementos com data-i18n)
function updatePageTexts() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);

    if (element.tagName === 'INPUT' && element.type === 'submit') {
      element.value = translation;
    } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = translation;
    } else {
      element.textContent = translation;
    }
  });
}

// Atualiza a UI do seletor de idiomas
function updateLanguageSelectorUI() {
  const switcher = document.querySelector('.language-switcher');
  const trigger = switcher ? switcher.querySelector('.language-selector') : null;
  const options = switcher ? switcher.querySelectorAll('.language-selector__option') : null;

  const info = LANGUAGE_INFO[currentLanguage];
  if (trigger && info) {
    const labelEl = trigger.querySelector('.language-selector__label');
    const flagEl = trigger.querySelector('.language-selector__flag');
    if (labelEl) labelEl.textContent = info.label;
    if (flagEl) flagEl.textContent = info.flag;
    trigger.setAttribute('aria-label', info.label);
  }

  if (options && options.length) {
    options.forEach(option => {
      const lang = option.getAttribute('data-lang');
      const selected = lang === currentLanguage;
      option.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }
}

// Função para mudar idioma
function changeLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem('zatan-language', lang);
    updatePageTexts();
    applyPageMeta();
    updateLanguageSelectorUI();
  }
}

// Inicializar idioma e seletor ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('zatan-language') || 'pt';
  currentLanguage = translations[savedLang] ? savedLang : 'pt';

  // Aplica traduções iniciais
  updatePageTexts();
  applyPageMeta();
  updateLanguageSelectorUI();

  const switcher = document.querySelector('.language-switcher');
  const trigger = switcher ? switcher.querySelector('.language-selector') : null;
  const dropdown = switcher ? switcher.querySelector('.language-selector__dropdown') : null;
  const options = switcher ? switcher.querySelectorAll('.language-selector__option') : null;

  function openDropdown() {
    if (!dropdown || !trigger) return;
    dropdown.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    if (!dropdown || !trigger) return;
    dropdown.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown() {
    if (!dropdown || !trigger) return;
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      closeDropdown();
    } else {
      openDropdown();
      // Foca na opção atual
      const currentOption = switcher.querySelector('.language-selector__option[aria-selected="true"]');
      if (currentOption) {
        currentOption.focus();
      }
    }
  }

  if (trigger && dropdown) {
    // Estado inicial do dropdown
    dropdown.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleDropdown();
    });

    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDropdown();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        openDropdown();
        const firstOption = dropdown.querySelector('.language-selector__option');
        if (firstOption) firstOption.focus();
      }
    });
  }

  if (options && options.length) {
    options.forEach(option => {
      option.addEventListener('click', (event) => {
        event.stopPropagation();
        const lang = option.getAttribute('data-lang');
        if (lang) {
          changeLanguage(lang);
          closeDropdown();
          if (trigger) trigger.focus();
        }
      });

      option.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          const lang = option.getAttribute('data-lang');
          if (lang) {
            changeLanguage(lang);
            closeDropdown();
            if (trigger) trigger.focus();
          }
        } else if (event.key === 'Escape') {
          event.preventDefault();
          closeDropdown();
          if (trigger) trigger.focus();
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          const next = option.nextElementSibling || dropdown.querySelector('.language-selector__option');
          if (next) next.focus();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          const prev = option.previousElementSibling || dropdown.querySelector('.language-selector__option:last-child');
          if (prev) prev.focus();
        }
      });
    });
  }

  // Fechar dropdown ao clicar fora
  document.addEventListener('click', (event) => {
    if (!switcher) return;
    if (!switcher.contains(event.target)) {
      closeDropdown();
    }
  });
});

// Exportar para uso global
window.i18n = {
  t,
  changeLanguage,
  currentLanguage: () => currentLanguage
};
