import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Get environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER;

// Only validate environment variables at runtime, not during build
const validateEnvVars = () => {
  if (!accountSid || !authToken || !twilioPhoneNumber || !recipientPhoneNumber) {
    throw new Error('Missing required Twilio environment variables');
  }
};

export async function POST(request: Request) {
  try {
    // Validate environment variables at runtime
    validateEnvVars();

    const { name, email, message } = await request.json();

    const client = twilio(accountSid, authToken);

    // Send SMS notification
    const smsMessage = await client.messages.create({
      body: `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber
    });

    return NextResponse.json({ success: true, messageId: smsMessage.sid });
  } catch (error) {
    console.error('Twilio API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
} 