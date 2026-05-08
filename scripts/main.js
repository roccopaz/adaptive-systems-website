/* Adaptive Systems — site JS
   - Mobile nav toggle
   - Contact form: client-side validation + honeypot spam check
   - No external dependencies. ES5-compatible for older locked-down browsers.
*/
(function () {
  'use strict';

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close nav on link click (mobile)
    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('teaming-form');
  if (!form) return;

  var success = form.querySelector('.form__success');

  function setError(field, msg) {
    var wrap = field.closest('.field');
    var err = wrap.querySelector('.field__error');
    if (msg) {
      wrap.classList.add('field--invalid');
      field.setAttribute('aria-invalid', 'true');
      if (err) err.textContent = msg;
    } else {
      wrap.classList.remove('field--invalid');
      field.removeAttribute('aria-invalid');
      if (err) err.textContent = '';
    }
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;

    // Honeypot — if filled, silently drop
    var hp = form.querySelector('input[name="website"]');
    if (hp && hp.value) {
      // Pretend success to avoid signaling the bot
      success.classList.add('is-visible');
      form.reset();
      return;
    }

    var required = form.querySelectorAll('[data-required]');
    for (var i = 0; i < required.length; i++) {
      var f = required[i];
      var v = (f.value || '').trim();
      if (!v) { setError(f, 'Required.'); ok = false; }
      else if (f.type === 'email' && !validEmail(v)) { setError(f, 'Enter a valid email.'); ok = false; }
      else { setError(f, ''); }
    }

    if (!ok) {
      var firstInvalid = form.querySelector('.field--invalid input, .field--invalid select, .field--invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend wired — surface a confirmation. Production: POST to /contact endpoint.
    success.classList.add('is-visible');
    form.reset();
    success.focus && success.focus();
    if (success.scrollTop !== undefined) {
      success.setAttribute('tabindex', '-1');
      success.focus();
    }
  });
})();
