export function initFormValidation() {
  const form = document.getElementById('contact-form');
  const messageEl = document.getElementById('form-message');

  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!name || !email || !message) {
      messageEl.textContent = 'Por favor completa todos los campos.';
      return;
    }

    messageEl.textContent = 'Formulario enviado correctamente. ¡Gracias!';
    form.reset();
  });
}
