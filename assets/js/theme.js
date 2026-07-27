(function () {
  var root = document.documentElement;
  var STORE = 'theme';

  var LABELS = {
    en: { light: 'light', dark: 'dark', title: 'Switch colour theme' },
    ru: { light: 'светлая', dark: 'тёмная', title: 'Переключить тему' }
  };

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function stored() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
  }

  apply(stored() || systemTheme());

  document.addEventListener('DOMContentLoaded', function () {
    var strings = LABELS[root.lang === 'ru' ? 'ru' : 'en'];

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!stored()) { apply(e.matches ? 'dark' : 'light'); sync(); }
      });
    }

    var buttons = document.querySelectorAll('[data-theme-toggle]');

    function sync() {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].textContent = strings[next];
        buttons[i].setAttribute('title', strings.title);
        buttons[i].setAttribute('aria-label', strings.title);
      }
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem(STORE, next); } catch (e) {}
        sync();
      });
    }

    sync();
  });
})();
