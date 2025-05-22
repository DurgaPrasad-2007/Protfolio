import { NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Get environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER
const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER

// Only validate environment variables at runtime, not during build
const validateEnvVars = () => {
  if (!accountSid || !authToken || !twilioPhoneNumber || !recipientPhoneNumber) {
    throw new Error('Missing required Twilio environment variables')
  }
}

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables at runtime
    validateEnvVars()

    const data = await request.json()
    const { name, email, message } = data

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = twilio(accountSid, authToken)

    // Send SMS notification
    const smsMessage = await client.messages.create({
      body: `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      from: twilioPhoneNumber,
      to: recipientPhoneNumber
    })

    return NextResponse.json({ success: true, messageId: smsMessage.sid })
  } catch (error: any) {
    console.error('Twilio API Error:')
    console.error('Error details:', error)
    
    // Log the full error for debugging
    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
    } else {
      console.error('Error (no stack trace):', error)
    }
    
    // Prepare error response
    const errorResponse: any = {
      error: "Failed to send notification",
      details: error instanceof Error ? error.message : 'Unknown error'
    }
    
    // Add Twilio error details if available
    if (error && typeof error === 'object') {
      errorResponse.twilioError = {
        code: 'code' in error ? error.code : undefined,
        moreInfo: 'moreInfo' in error ? error.moreInfo : undefined,
        status: 'status' in error ? error.status : undefined,
        message: error.message || undefined
      }
    }
    
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
