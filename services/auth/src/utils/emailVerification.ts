import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, html: string): Promise<any> => {
  try {
    const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, EMAIL_SENDER } = process.env;

    if (!MAIL_HOST || !MAIL_PORT || !MAIL_USER || !MAIL_PASS || !EMAIL_SENDER) {
      throw new Error('Missing required email environment variables');
    }

    const transporterPayload = {
      host: MAIL_HOST,
      port: parseInt(MAIL_PORT),
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    };

    const infoPayload = {
      from: `"TroopHunter" <${EMAIL_SENDER}>`,
      to,
      subject,
      html,
    };

    const transporter = nodemailer.createTransport(transporterPayload);

    const info = await transporter.sendMail(infoPayload);

    return info;
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;
