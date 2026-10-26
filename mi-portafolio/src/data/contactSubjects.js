// Códigos estables de materia. No son texto visible: no los traduzcas.
// - `contactSchema` los usa como opciones válidas del campo `subject`.
// - `ContactForm` los recorre y busca la etiqueta en `contact.subjects.<code>`.
// - `contactService` los envía como `subjectCode`; las etiquetas van aparte.
// Para añadir una materia: agrega el código aquí y la etiqueta en los tres locales.
export const CONTACT_SUBJECTS = ['job', 'freelance', 'consultation', 'other'];
