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
        projectType,
        plan,
        addOns,
        selectedStages,
      } = fields;

      // ✅ Parse safely
      const parsedProjectType = projectType ? JSON.parse(projectType as string) : null;
      const parsedPlan = plan ? JSON.parse(plan as string) : null;
      const parsedAddOns = addOns ? JSON.parse(addOns as string) : [];
      const parsedToggles = selectedStages ? JSON.parse(selectedStages as string) : {};

      // ✅ Convert toggles to readable list
      const selectedOptions =
        Object.entries(parsedToggles)
          .filter(([_, value]) => value === true)
          .map(([key]) => key)
          .join(', ') || 'None selected';

      // ✅ Convert add-ons array into readable format
      const formattedAddOns =
        parsedAddOns.length > 0
          ? parsedAddOns.map((a: any) => `${a.label} (${a.secondaryLabel || ''})`).join(', ')
          : 'None selected';

      // ✅ File attachments
      const fileArray = Array.isArray(files.upload) ? files.upload : [files.upload].filter(Boolean);
      const attachments = fileArray.map((file: FormidableFile) => ({
        filename: file.originalFilename || 'attachment',
        path: file.filepath,
        contentType: file.mimetype,
      }));

      // ✅ Nodemailer setup
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      // ✅ Basic clean HTML email template
      const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; background: #f9fafb; padding: 20px; border-radius: 10px;">
        <h1><strong>📩 ${parsedPlan?.name || 'N/A'}</strong></h1>
        <p><strong>🧑 Name:</strong> ${name}</p>
        <p><strong>🏢 Company:</strong> ${company}</p>
        <p><strong>📞 Phone:</strong> ${phone}</p>
        <p><strong>📧 Email:</strong> ${email}</p>
        <hr style="margin: 16px 0;" />
        <p><strong>💰 Project Type:</strong> ${parsedProjectType?.name || 'N/A'}</p>
        <p><strong>🧩 Add-ons:</strong> ${formattedAddOns}</p>
        <p><strong>🔘 Selected Options:</strong> ${selectedOptions}</p>
        <hr style="margin: 16px 0;" />
        <p style="font-size: 12px; color: #6b7280;">This message was sent from the> ${parsedPlan?.name || 'N/A'} on your website.</p>
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

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Form submitted successfully with formatted email!' });
    } catch (error) {
      console.error('❌ Email sending error:', error);
      return res.status(500).json({ message: 'Email sending failed' });
    }
  });
}
