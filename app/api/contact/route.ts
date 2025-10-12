import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('[Contact API] Request received');
    const body = await request.json();
    const { name, email, company, subject, message } = body;
    
    console.log('[Contact API] Form data:', { name, email, company, subject });

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('[Contact API] Validation failed: missing fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('[Contact API] Validation failed: invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = {
      to: 'wasedajoe@gmail.com',
      from: email,
      subject: `Contact Form: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'N/A'}
Subject: ${subject}

Message:
${message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #0ea5e9; }
    .value { margin-top: 5px; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #0ea5e9; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
      <p>SAIL Lab Website</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Company:</div>
        <div class="value">${company || 'N/A'}</div>
      </div>
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `
    };

    // Use Resend API to send email
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    console.log('[Contact API] RESEND_API_KEY exists:', !!RESEND_API_KEY);
    
    if (!RESEND_API_KEY) {
      console.error('[Contact API] RESEND_API_KEY is not configured');
      console.log('[Contact API] Email content:', emailContent);
      return NextResponse.json({ 
        success: true, 
        message: 'Form submitted successfully (email service not configured)' 
      });
    }

    // Send email using Resend
    // Note: Use onboarding@resend.dev for testing, or your verified domain
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    console.log('[Contact API] Sending email from:', fromEmail);
    console.log('[Contact API] Sending email to:', 'wasedajoe@gmail.com');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: 'wasedajoe@gmail.com',
        reply_to: email,
        subject: `[SAIL Lab Contact] ${subject}`,
        html: emailContent.html,
      }),
    });

    const data = await response.json();
    
    console.log('[Contact API] Resend response status:', response.status);
    console.log('[Contact API] Resend response data:', data);
    
    if (!response.ok) {
      console.error('[Contact API] Resend API error:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('[Contact API] Email sent successfully! ID:', data.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

