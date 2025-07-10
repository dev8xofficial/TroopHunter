import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import formidable, { File as FormidableFile } from 'formidable';

export const config = {
  api: {
    bodyParser: false // Required for formidable
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).json({ message: 'File parsing failed' });
    }

    const { name, company, phone, email, budget, timeline, project, referral } = fields;

    const fileArray = Array.isArray(files.upload) ? files.upload : [files.upload];
    const attachments = fileArray.map((file: FormidableFile) => ({
      filename: file.originalFilename || 'attachment',
      path: file.filepath,
      contentType: file.mimetype
    }));

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT), // 2525
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.SUPPORT_EMAIL_SENDER,
      to: process.env.SUPPORT_EMAIL_SENDER, // or whoever you want to receive it
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Company: ${company}
        Phone: ${phone}
        Email: ${email}
        Budget: ${budget}
        Timeline: ${timeline}
        Project: ${project}
        Referral: ${referral}
      `,
      attachments
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent with attachments' });
    } catch (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
  });
}
