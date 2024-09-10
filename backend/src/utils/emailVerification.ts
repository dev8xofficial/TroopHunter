import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(`${process.env.MAIL_PORT}`),
      // secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
  }
};

export default sendEmail;
