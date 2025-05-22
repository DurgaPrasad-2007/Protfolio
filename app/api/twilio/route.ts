import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { name, email, message, phone } = await request.json();

    // Send SMS notification
    const smsMessage = await client.messages.create({
      body: `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      from: twilioPhoneNumber,
      to: phone // Your phone number to receive notifications
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