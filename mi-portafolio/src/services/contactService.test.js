import { beforeEach, describe, expect, it, vi } from 'vitest';
import emailjs from '@emailjs/browser';
import { ContactServiceError, sendContactMessage } from './contactService.js';

vi.mock('@emailjs/browser', () => ({
  default: { send: vi.fn() }
}));

const contact = {
  name: 'Chamuel Romero',
  email: 'chamuel@example.com',
  subjectCode: 'consultation',
  subjectLabel: 'Consultation',
  subjectLabelEs: 'Consulta',
  language: 'en',
  message: 'Quiero conversar sobre un proyecto.'
};

describe('sendContactMessage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv('VITE_EMAILJS_SERVICE_ID', 'service_test');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_ADMIN_ID', 'template_admin');
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_USER_ID', 'template_user');
    vi.stubEnv('VITE_EMAILJS_PUBLIC_KEY', 'public_test_key');
  });

  it('sends the Spanish admin notification and the localized autoresponse', async () => {
    emailjs.send.mockResolvedValue({ status: 200 });

    await sendContactMessage(contact);

    const commonParams = {
      ...contact,
      to_email: contact.email
    };
    const adminParams = { ...commonParams, subject: contact.subjectLabelEs };
    const userParams = { ...commonParams, subject: contact.subjectLabel };

    expect(emailjs.send).toHaveBeenCalledTimes(2);
    expect(emailjs.send).toHaveBeenNthCalledWith(
      1,
      'service_test',
      'template_admin',
      adminParams,
      { publicKey: 'public_test_key' }
    );
    expect(emailjs.send).toHaveBeenNthCalledWith(
      2,
      'service_test',
      'template_user',
      userParams,
      { publicKey: 'public_test_key' }
    );
  });

  it('rejects missing EmailJS configuration before sending', async () => {
    vi.stubEnv('VITE_EMAILJS_TEMPLATE_USER_ID', '');

    await expect(sendContactMessage(contact)).rejects.toMatchObject({
      name: 'ContactServiceError',
      code: 'configuration'
    });
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it('maps admin rate-limit errors and skips the autoresponse', async () => {
    emailjs.send.mockRejectedValueOnce({ status: 429 });

    await expect(sendContactMessage(contact)).rejects.toMatchObject({
      name: 'ContactServiceError',
      code: 'rateLimit'
    });
    expect(emailjs.send).toHaveBeenCalledTimes(1);
  });

  it('maps admin authorization errors to service unavailable', async () => {
    emailjs.send.mockRejectedValueOnce({ status: 403 });

    await expect(sendContactMessage(contact)).rejects.toMatchObject({
      name: 'ContactServiceError',
      code: 'unavailable'
    });
    expect(emailjs.send).toHaveBeenCalledTimes(1);
  });

  it('maps unexpected admin delivery errors and does not send a second email', async () => {
    emailjs.send.mockRejectedValueOnce(new Error('network unavailable'));

    await expect(sendContactMessage(contact)).rejects.toMatchObject({
      name: 'ContactServiceError',
      code: 'delivery'
    });
    expect(emailjs.send).toHaveBeenCalledTimes(1);
  });

  it('reports autoresponse failures separately after admin notification succeeds', async () => {
    emailjs.send
      .mockResolvedValueOnce({ status: 200 })
      .mockRejectedValueOnce({ status: 400 });

    await expect(sendContactMessage(contact)).rejects.toMatchObject({
      name: 'ContactServiceError',
      code: 'autoresponder'
    });
    expect(emailjs.send).toHaveBeenCalledTimes(2);
  });
});
