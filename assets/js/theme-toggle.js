
/* ============================================
   ZATAN - Theme & Accessibility Controls
   Modo claro/escuro, alto contraste e tamanho de fonte
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const contrastToggle = document.querySelector('.contrast-toggle');
  const fontDecrease = document.querySelector('.font-size-decrease');
  const fontReset = document.querySelector('.font-size-reset');
  const fontIncrease = document.querySelector('.font-size-increase');

  // ---------- TEMA (CLARO / ESCURO / ALTO CONTRASTE) ----------
  const THEME_KEY = 'zatan-theme';
  const BASE_THEME_KEY = 'zatan-base-theme';

  function applyTheme(theme, baseThemeOverride) {
    const baseTheme = baseThemeOverride || localStorage.getItem(BASE_THEME_KEY) || 'light';

    if (theme === 'high-contrast') {
      root.setAttribute('data-theme', 'high-contrast');
    } else {
      root.setAttribute('data-theme', theme);
    }

    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem(BASE_THEME_KEY, theme === 'high-contrast' ? baseTheme : theme);

    updateThemeToggleUI(theme, baseTheme);
    updateContrastToggleUI(theme);
  }

  function getCurrentTheme() {
    return root.getAttribute('data-theme') || localStorage.getItem(THEME_KEY) || 'light';
  }

  function getBaseTheme() {
    return localStorage.getItem(BASE_THEME_KEY) || 'light';
  }

  function updateThemeToggleUI(theme, baseTheme) {
    if (!themeToggle) return;
    const effective = theme === 'high-contrast' ? baseTheme : theme;

    themeToggle.setAttribute('aria-pressed', effective === 'dark' ? 'true' : 'false');
    themeToggle.title = effective === 'dark'
      ? 'Usando tema escuro. Clique para voltar ao tema claro.'
      : 'Usando tema claro. Clique para alternar para o tema escuro.';
    themeToggle.textContent = effective === 'dark' ? '🌙' : '🌞';
  }

  function updateContrastToggleUI(theme) {
    if (!contrastToggle) return;
    const isHigh = theme === 'high-contrast';
    contrastToggle.setAttribute('aria-pressed', isHigh ? 'true' : 'false');
    contrastToggle.textContent = isHigh ? 'Contraste padrão' : 'Alto contraste';
  }

  // Inicialização do tema ao carregar página
  (function initTheme() {
    let savedTheme = localStorage.getItem(THEME_KEY);
    let baseTheme = localStorage.getItem(BASE_THEME_KEY) || 'light';

    if (!savedTheme) {
      // Usa preferência do sistema como padrão, se não houver escolha do usuário
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      savedTheme = prefersDark ? 'dark' : 'light';
      baseTheme = savedTheme;
    }

    root.setAttribute('data-theme', savedTheme === 'high-contrast' ? 'high-contrast' : savedTheme);
    localStorage.setItem(THEME_KEY, savedTheme);
    localStorage.setItem(BASE_THEME_KEY, baseTheme);

    updateThemeToggleUI(savedTheme, baseTheme);
    updateContrastToggleUI(savedTheme);
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = getCurrentTheme();
      const baseTheme = getBaseTheme();
      let nextBaseTheme = baseTheme === 'light' ? 'dark' : 'light';

      if (currentTheme === 'high-contrast') {
        // Apenas atualiza o tema base para quando o contraste for desligado
        localStorage.setItem(BASE_THEME_KEY, nextBaseTheme);
        updateThemeToggleUI('high-contrast', nextBaseTheme);
      } else {
        applyTheme(nextBaseTheme);
      }
    });
  }

  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      const currentTheme = getCurrentTheme();
      const baseTheme = getBaseTheme() || 'light';

      if (currentTheme === 'high-contrast') {
        applyTheme(baseTheme, baseTheme);
      } else {
        applyTheme('high-contrast', baseTheme);
      }
    });
  }

  // ---------- TAMANHO DE FONTE ----------
  const FONT_KEY = 'zatan-font-size';
  const BASE_FONT = 16; // px
  const MIN_FONT = 14;
  const MAX_FONT = 22;
  const STEP = 2;

  function applyFontSize(size) {
    const clamped = Math.min(MAX_FONT, Math.max(MIN_FONT, size));
    document.documentElement.style.fontSize = clamped + 'px';
    localStorage.setItem(FONT_KEY, String(clamped));
  }

  (function initFontSize() {
    const saved = parseInt(localStorage.getItem(FONT_KEY), 10);
    if (!isNaN(saved)) {
      applyFontSize(saved);
    } else {
      applyFontSize(BASE_FONT);
    }
  })();

  if (fontDecrease) {
    fontDecrease.addEventListener('click', () => {
      const current = parseInt(getComputedStyle(document.documentElement).fontSize, 10) || BASE_FONT;
      applyFontSize(current - STEP);
    });
  }

  if (fontReset) {
    fontReset.addEventListener('click', () => applyFontSize(BASE_FONT));
  }

  if (fontIncrease) {
    fontIncrease.addEventListener('click', () => {
      const current = parseInt(getComputedStyle(document.documentElement).fontSize, 10) || BASE_FONT;
      applyFontSize(current + STEP);
    });
  }
});
