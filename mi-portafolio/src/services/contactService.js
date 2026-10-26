import emailjs from '@emailjs/browser';

// `code` es una constante interna, no texto: la UI lo traduce con
// `contact.errors.<code>`. Códigos válidos: configuration, rateLimit,
// unavailable, delivery y autoresponder. Si añades uno, agrégalo a los tres locales.
export class ContactServiceError extends Error {
  constructor(code, cause) {
    super(code, { cause });
    this.name = 'ContactServiceError';
    this.code = code;
  }
}

// Recibe los códigos y etiquetas ya resueltos por `ContactForm`: no traduce nada
// aquí. `subjectLabel` va en el idioma del visitante y `subjectLabelEs` siempre
// en español para la notificación del administrador.
export async function sendContactMessage({
  name,
  email,
  subjectCode,
  subjectLabel,
  subjectLabelEs,
  language,
  message
}) {
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

  const commonParams = {
    name,
    email,
    message,
    to_email: email,
    subjectCode,
    subjectLabel,
    subjectLabelEs,
    language
  };

  // El admin recibe siempre el asunto en español; la autorespuesta usa el idioma del visitante.
  const adminParams = { ...commonParams, subject: subjectLabelEs };
  const userParams = { ...commonParams, subject: subjectLabel };

  try {
    // Primero se entrega la notificación al administrador para no confirmar mensajes que no llegaron.
    await emailjs.send(
      VITE_EMAILJS_SERVICE_ID,
      VITE_EMAILJS_TEMPLATE_ADMIN_ID,
      adminParams,
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
      userParams,
      { publicKey: VITE_EMAILJS_PUBLIC_KEY }
    );
  } catch (cause) {
    throw new ContactServiceError('autoresponder', cause);
  }
}
