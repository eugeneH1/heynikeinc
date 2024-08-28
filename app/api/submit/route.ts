// app/server/submitForm/route.ts
import type  Request  from 'next';
import nodemailer from 'nodemailer';

interface ReqBody {
  name: string;
  phone: number;
  email: string;
  treatment: string;
  myself: boolean;
  message: string;
}

// Define the POST method handler
export async function POST(request: Request) {
  // Extract details from the request body
  const { name, phone, email, treatment, myself, message }: ReqBody = await request.json();

  // Set up NodeMailer transport
  const transporter = nodemailer.createTransport({
      host: "mail.thelodgerehab.co.za",
      port: 465,
      secure: true,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
      },
  });

  // Email content
  const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@thelodgerehab.co.za',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nInterested in: ${treatment}\n${myself ? 'Asking for myself': 'Asking for someone else'}\nMessage: ${message}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ status: 'Success', message: 'Email sent' }), { status: 200 });
  } catch (error) {
      if (error instanceof Error) {
          console.log(error.message);
          return new Response(JSON.stringify({ status: 'Error', message: error.message }), { status: 500 });
      } else {
          console.log('An unexpected error occurred');
          return new Response(JSON.stringify({ status: 'Error', message: 'An unexpected error occurred' }), { status: 500 });
      }
  }
}

// If you need to handle other HTTP methods, define them similarly