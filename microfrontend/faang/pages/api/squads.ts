import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File as FormidableFile } from 'formidable';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: false, // Important for formidable
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
      // ✅ Extract fields from form
      const { name, company, phone, email, project, selectedStages, addOns } = fields;

      // ✅ Parse safely
      const parsedStages = selectedStages ? JSON.parse(selectedStages as string) : [];
      const parsedAddOns = addOns ? JSON.parse(addOns as string) : [];

      // ✅ Create readable lists
      const formattedStages =
        parsedStages.length > 0
          ? parsedStages.map((s: any) => `${s.label} (${s.price})`).join(', ')
          : 'None selected';

      const formattedAddOns =
        parsedAddOns.length > 0
          ? parsedAddOns.map((a: any) => `${a.label} (${a.price})`).join(', ')
          : 'None selected';

      // ✅ File attachments (optional, future-proof)
      const fileArray = Array.isArray(files.upload) ? files.upload : [files.upload].filter(Boolean);
      const attachments = fileArray.map((file: FormidableFile) => ({
        filename: file.originalFilename || 'attachment',
        path: file.filepath,
        contentType: file.mimetype,
      }));

      // ✅ Nodemailer transport
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      // ✅ Clean, styled HTML email
      const htmlTemplate = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f9fafb; padding: 24px; border-radius: 12px; color: #111827;">
          <h2 style="color:#2563eb;">🚀 Mini Squad Inquiry</h2>
          <p><strong>👤 Name:</strong> ${name}</p>
          <p><strong>🏢 Company:</strong> ${company}</p>
          <p><strong>📞 Phone:</strong> ${phone}</p>
          <p><strong>📧 Email:</strong> ${email}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p><strong>🧩 Project Description:</strong><br />${project}</p>
          <p><strong>📍 Selected Stages:</strong> ${formattedStages}</p>
          <p><strong>💡 Add-Ons:</strong> ${formattedAddOns}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 12px; color: #6b7280;">
            Sent via <strong>Dev8X Mini Squad</strong> form submission.
          </p>
        </div>
      `;

      // ✅ Email options
      const mailOptions = {
        from: process.env.CONTACT_EMAIL_SENDER,
        to: process.env.CONTACT_EMAIL_RECEIVER || process.env.CONTACT_EMAIL_SENDER,
        subject: `Mini Squad Request from ${name}`,
        html: htmlTemplate,
        attachments,
      };

      // ✅ Send email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Form submitted successfully with formatted email!' });
    } catch (error) {
      console.error('❌ Email sending error:', error);
      return res.status(500).json({ message: 'Email sending failed' });
    }
  });
}
