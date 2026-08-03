/**
 * Furnix Zero-FOUC Theme Controller & Preference Listener
 * Manages dark/light theme persistence, OS system preferences, smooth transitions, and ARIA state updates.
 */

(function(global) {
  'use strict';

  const THEME_STORAGE_KEY = 'furnix_theme';

  class ThemeController {
    constructor() {
      this.currentTheme = this.getSavedTheme() || this.getSystemPreference();
      this.init();
    }

    init() {
      this.applyTheme(this.currentTheme, false);

      document.addEventListener('DOMContentLoaded', () => {
        this.bindToggleButtons();
        this.listenToSystemChanges();
      });
    }

    getSavedTheme() {
      try {
        return localStorage.getItem(THEME_STORAGE_KEY);
      } catch (e) {
        return null;
      }
    }

    getSystemPreference() {
      if (global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }

    applyTheme(theme, save = true) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }

      if (save) {
        try {
          localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
          console.warn('ThemeController: Could not save theme preference:', e);
        }
      }

      this.updateUIButtons();
      document.dispatchEvent(new CustomEvent('furnix-theme-changed', { detail: { theme } }));
    }

    toggleTheme() {
      const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(nextTheme, true);
      if (global.showToast) {
        global.showToast(`Switched to ${nextTheme} mode`, 'info', 2000);
      }
    }

    bindToggleButtons() {
      const toggles = document.querySelectorAll('.theme-toggle, #themeToggle');
      toggles.forEach(btn => {
        btn.addEventListener('click', () => this.toggleTheme());
      });
      this.updateUIButtons();
    }

    updateUIButtons() {
      const toggles = document.querySelectorAll('.theme-toggle, #themeToggle');
      const icons = document.querySelectorAll('#themeIcon, .theme-icon');

      toggles.forEach(btn => {
        btn.setAttribute('aria-pressed', this.currentTheme === 'dark' ? 'true' : 'false');
        btn.setAttribute('aria-label', `Switch to ${this.currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`);
      });

      icons.forEach(icon => {
        if (this.currentTheme === 'dark') {
          icon.className = 'fa-solid fa-sun';
        } else {
          icon.className = 'fa-solid fa-moon';
        }
      });
    }

    listenToSystemChanges() {
      if (!global.matchMedia) return;
      const mediaQuery = global.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!this.getSavedTheme()) {
          const systemTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(systemTheme, false);
        }
      });
    }
  }

  global.FurnixThemeController = new ThemeController();
})(typeof window !== 'undefined' ? window : this);
