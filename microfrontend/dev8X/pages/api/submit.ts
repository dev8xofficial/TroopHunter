import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false // required for formidable
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('❌ Formidable parse error:', err);
      return res.status(500).json({ message: 'Form parsing failed' });
    }

    try {
      const { name, phone, email, project, referral, address, position, preferredDate, salary, linkedin, portfolio, opportunity, whyJoin } = fields;

      const fileArray = Array.isArray(files.upload) ? files.upload : [files.upload].filter(Boolean);

      const attachments = fileArray.map((file: FormidableFile) => ({
        filename: file.originalFilename || 'resume',
        path: file.filepath,
        contentType: file.mimetype
      }));

      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: process.env.EMAIL_SENDER,
        subject: `New Application from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Address: ${address}

          Position: ${position}
          Preferred Start Date: ${preferredDate}
          Expected Salary: ${salary}
          LinkedIn: ${linkedin}
          Portfolio: ${portfolio}

          Referral: ${referral}
          Why Join: ${whyJoin}
          Project: ${project}
          Opportunity Source: ${opportunity}
        `,
        attachments
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('❌ Email sending error:', error);
      return res.status(500).json({ message: 'Email sending failed' });
    }
  });
}
