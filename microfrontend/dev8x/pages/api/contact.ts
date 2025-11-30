import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import formidable, { File as FormidableFile } from 'formidable';

export const config = {
  api: {
    bodyParser: false // Required: formidable handles file parsing
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

    const {
      name,
      company,
      phone,
      email,
      budget,
      timeline,
      project,
      referral,
      date,
      timeSlot
    } = fields;

    // Handle file attachments safely
    const fileArray = Array.isArray(files.upload)
      ? files.upload
      : files.upload
        ? [files.upload]
        : [];

    const attachments = fileArray.map((file: FormidableFile) => ({
      filename: file.originalFilename || 'attachment',
      path: file.filepath,
      contentType: file.mimetype
    }));

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Number(process.env.MAIL_PORT) === 465, // true for 465, false otherwise
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // ✅ HTML Email Body
    const htmlMessage = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #222;">
        <h2 style="color: #111;">📅 New Call Booking Request</h2>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
        <p><strong>Referral:</strong> ${referral || 'N/A'}</p>
        <hr style="margin: 20px 0;">
        <p><strong>Selected Date:</strong> ${date || 'N/A'}</p>
        <p><strong>Selected Time Slot:</strong> ${timeSlot || 'N/A'}</p>
        <hr style="margin: 20px 0;">
        <p><strong>Project Details:</strong></p>
        <p>${project || 'No project details provided.'}</p>
      </div>
    `;

    // ✅ Mail Options
    const mailOptions = {
      from: process.env.CONTACT_EMAIL_SENDER,
      to: process.env.CONTACT_EMAIL_RECEIVER || process.env.CONTACT_EMAIL_SENDER,
      subject: `📞 New Schedule Call Request from ${name || 'Unknown User'}`,
      html: htmlMessage,
      attachments
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully from ${email}`);
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('❌ Email sending error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
  });
}
