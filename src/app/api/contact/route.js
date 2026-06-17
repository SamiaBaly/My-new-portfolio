import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend. We check if the key exists to avoid build-time crashes.
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req) {
  try {
    const { firstName, lastName, subject, message } = await req.json();

    // 1. Basic server-side validation
    if (!firstName || !lastName || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // 2. Check if API key is configured and valid
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Email service is not configured. Please set the RESEND_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    if (resendApiKey === 're_your_api_key_here' || !resendApiKey.startsWith('re_')) {
      return NextResponse.json(
        { error: 'Invalid RESEND_API_KEY format. Resend API keys must start with "re_". Please update your .env.local file with a valid Resend key.' },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_RECIPIENT_EMAIL || 'samiabaly116@gmail.com';
    
    // Note: Onboarding domains on Resend only support sending from onboarding@resend.dev
    const sender = 'Portfolio Contact <onboarding@resend.dev>';

    // 3. Send email using Resend
    const { data, error } = await resend.emails.send({
      from: sender,
      to: recipient,
      subject: `[Portfolio Contact] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #fafafa; color: #333;">
          <h2 style="color: #F4AE52; border-bottom: 2px solid #F4AE52; padding-bottom: 10px; margin-top: 0;">New Message Received</h2>
          <p style="font-size: 16px;">You have received a new contact form submission from your portfolio website.</p>
          
          <div style="background-color: #ffffff; padding: 18px; border-radius: 8px; border: 1px solid #e1e1e1; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin: 0 0 10px 0;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 15px 0 5px 0;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #555;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 15px;">
            Sent automatically by Resend integration on your Next.js portfolio.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Contact API handler error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
