import emailjs from '@emailjs/browser';

const errorMessages = {
  configuration: 'El formulario no está disponible. Inténtalo más tarde o contáctame por mis redes.',
  rateLimit: 'Has enviado varios mensajes recientemente. Espera un momento y vuelve a intentarlo.',
  unavailable: 'El servicio de contacto no está disponible temporalmente. Inténtalo más tarde.',
  delivery: 'No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.',
  autoresponder: 'El mensaje llegó, pero no se pudo enviar el correo de confirmación.'
};

export class ContactServiceError extends Error {
  constructor(code, cause) {
    super(errorMessages[code], { cause });
    this.name = 'ContactServiceError';
    this.code = code;
    this.userMessage = errorMessages[code];
  }
}

export async function sendContactMessage({ name, email, subject, message }) {
  // Vite reemplaza estas variables al compilar; la clave pública está diseñada para uso en cliente.
  const {
    VITE_EMAILJS_SERVICE_ID,
    VITE_EMAILJS_TEMPLATE_ADMIN_ID,
    VITE_EMAILJS_TEMPLATE_USER_ID,
    VITE_EMAILJS_PUBLIC_KEY
  } = import.meta.env;

  if (
    !VITE_EMAILJS_SERVICE_ID ||
    !VITE_EMAILJS_TEMPLATE_ADMIN_ID ||
    !VITE_EMAILJS_TEMPLATE_USER_ID ||
    !VITE_EMAILJS_PUBLIC_KEY
  ) {
    throw new ContactServiceError('configuration');
  }

  // Se comparten los mismos datos entre las dos plantillas; la autorespuesta usa to_email.
  const templateParams = {
    name,
    email,
    subject,
    message,
    to_email: email
  };

  try {
    // Primero se entrega la notificación al administrador para no confirmar mensajes que no llegaron.
    await emailjs.send(
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ADMIN_ID,
      templateParams,
      { publicKey: VITE_EMAILJS_PUBLIC_KEY }
    );
  } catch (cause) {
    const errorStatus =
      typeof cause === 'object' && cause !== null && 'status' in cause
        ? Number(cause.status)
        : undefined;

    if (errorStatus === 429) {
      throw new ContactServiceError('rateLimit', cause);
    }

    if (errorStatus === 401 || errorStatus === 403 || errorStatus === 503) {
      throw new ContactServiceError('unavailable', cause);
    }

    throw new ContactServiceError('delivery', cause);
  }

  try {
    // Se ejecuta solo después de confirmar la notificación; evita responder sobre un envío fallido.
    await emailjs.send(
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_USER_ID,
      templateParams,
      { publicKey: VITE_EMAILJS_PUBLIC_KEY }
    );
  } catch (cause) {
    throw new ContactServiceError('autoresponder', cause);
  }
}
