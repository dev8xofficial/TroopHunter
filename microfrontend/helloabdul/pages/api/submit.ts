import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
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
      const {
        name,
        company,
        phone,
        email,
        budget,
        timeline,
        project,
        referral,
        selectedStages,
      } = fields;

      // Parse toggle JSON if exists
      const toggleData = selectedStages ? JSON.parse(selectedStages as string) : {};

      const fileArray = Array.isArray(files.upload) ? files.upload : [files.upload].filter(Boolean);

      const attachments = fileArray.map((file: FormidableFile) => ({
        filename: file.originalFilename || 'attachment',
        path: file.filepath,
        contentType: file.mimetype,
      }));

      // ✅ Create a clean readable toggle summary
      const trueKeys = Object.entries(toggleData)
        .filter(([_, value]) => value === true)
        .map(([key]) => key)
        .join(', ') || 'None selected';

      // ✅ Setup nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      // ✅ Build mail message
      const mailOptions = {
        from: process.env.CONTACT_EMAIL_SENDER,
        to: process.env.CONTACT_EMAIL_SENDER,
        subject: `Mini Squad Request from ${name}`,
        text: `
        🧑 Name: ${name}
        🏢 Company: ${company}
        📞 Phone: ${phone}
        📧 Email: ${email}
    
      💰 Budget: ${budget || 'N/A'}
      ⏰ Timeline: ${timeline || 'N/A'}
      🧩 Referral: ${referral || 'N/A'}

      📘 Project Details:
      ${project || 'N/A'}

      🧱 Selected Options:
      ${trueKeys}

`,
        attachments,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Form submitted successfully with toggles!' });
    } catch (error) {
      console.error('❌ Email sending error:', error);
      return res.status(500).json({ message: 'Email sending failed' });
    }
  });
}
