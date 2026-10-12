const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  mainNav.classList.toggle('is-open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mainNav.classList.remove('is-open');
  });
});

const quoteForm = document.querySelector('#quote-form');
const successMessage = document.querySelector('.form-success');

quoteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...quoteForm.querySelectorAll('input:not([type="checkbox"]), select')];
  const checkbox = quoteForm.querySelector('input[type="checkbox"]');
  let firstInvalid = null;

  fields.forEach((field) => {
    const error = field.parentElement.querySelector('.error');
    let message = '';
    if (!field.validity.valid) {
      message = field.validity.valueMissing
        ? 'Please complete this field.'
        : field.type === 'email'
          ? 'Please enter a valid email address.'
          : 'Please enter at least two characters.';
    }
    error.textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
    if (message && !firstInvalid) firstInvalid = field;
  });

  const checkError = quoteForm.querySelector('.check-error');
  checkError.textContent = checkbox.checked ? '' : 'Please confirm you understand this is a demo.';
  checkbox.setAttribute('aria-invalid', String(!checkbox.checked));
  if (!checkbox.checked && !firstInvalid) firstInvalid = checkbox;

  if (firstInvalid) {
    successMessage.hidden = true;
    firstInvalid.focus();
    return;
  }

  // This is intentionally local-only. No network request or storage is used.
  successMessage.hidden = false;
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  quoteForm.reset();
});
