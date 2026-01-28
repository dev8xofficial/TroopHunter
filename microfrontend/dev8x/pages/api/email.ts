import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { from, to, cc, subject, message } = req.body;

  if (!from || !to || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Validate email formats
  const allRecipients = [to, ...(cc ? cc.split(',').map(e => e.trim()) : [])];
  if (!allRecipients.every(email => emailRegex.test(email))) {
    return res.status(400).json({ message: 'One or more email addresses are invalid' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Number(process.env.MAIL_PORT) === 465, // SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"${from}" <${process.env.MAIL_USER}>`,
      replyTo: from,
      to,
      cc,
      subject: subject.trim(),
      html: `<div style="font-family: Arial, sans-serif; font-size: 14px;">${message}</div>`,
      text: message.replace(/<[^>]*>/g, '')
    });

    return res.status(200).json({
      message: 'Email sent successfully',
      messageId: info.messageId,
      accepted: info.accepted,
      response: info.response
    });
  } catch (error: any) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ message: 'SMTP delivery failed', error: error.message });
  }
}
