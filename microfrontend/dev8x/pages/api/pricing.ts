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

  // Check if the request is JSON (for pricing form)
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    try {
      // Manually read the raw body stream
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const bodyString = Buffer.concat(buffers).toString();
      const data = JSON.parse(bodyString);
      const { selectedRole, selectedSkills, selectedPeople, selectedPriceType } = data;

      const transporter = nodemailer.createTransport({
        host: process.env.comPRIVACY_EMAIL_SENDER,
        port: Number(process.env.MAIL_PORT),
        auth: {
          user: process.env.comPRIVACY_EMAIL_SENDER,
          pass: process.env.MAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.CAREERS_EMAIL_SENDER,
        to: process.env.CAREERS_EMAIL_SENDER,
        subject: `New Pricing Booking Request`,
        text: `
          Pricing Booking Request\n\n
          Selected Role: ${selectedRole?.title || ''}
          Selected Skills: ${
            selectedSkills
              ? Object.entries(selectedSkills)
                  .filter(([_, v]) => v)
                  .map(([k]) => k)
                  .join(', ')
              : ''
          }
          Number of Employees: ${selectedPeople?.name || ''}
          Rate Type: ${selectedPriceType?.name || ''}
        `
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Pricing booking submitted successfully' });
    } catch (error) {
      console.error('❌ Pricing email sending error:', error);
      return res.status(500).json({ message: 'Pricing email sending failed' });
    }
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('❌ Formidable parse error:', err);
      return res.status(500).json({ message: 'Form parsing failed' });
    }

    try {
      const { name, phone, email, project, location, position, startDate, salary, linkedin, portfolio, opportunity, whyJoin } = fields;

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
        from: process.env.CAREERS_EMAIL_SENDER,
        to: process.env.CAREERS_EMAIL_SENDER,
        subject: `New Application from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Location: ${location}

          Position: ${position}
          Start Date: ${startDate}
          Expected Salary: ${salary}
          LinkedIn: ${linkedin}
          Portfolio: ${portfolio}

          Why Join Us: ${whyJoin}
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
