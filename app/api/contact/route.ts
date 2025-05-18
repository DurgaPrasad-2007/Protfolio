import { NextRequest, NextResponse } from "next/server"
import twilio from "twilio"

// Get and validate environment variables
function getEnvVar(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

const accountSid = getEnvVar('TWILIO_ACCOUNT_SID')
const authToken = getEnvVar('TWILIO_AUTH_TOKEN')
const twilioNumber = getEnvVar('TWILIO_NUMBER')
const myWhatsAppNumber = getEnvVar('MY_WHATSAPP_NUMBER')

const client = twilio(accountSid, authToken)

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, message } = data

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Send plain WhatsApp message
    const whatsappMessage = `
New Contact Form Submission:
Name: ${name || 'Not provided'}
Email: ${email || 'Not provided'}
Message: ${message || 'No message content'}
    `

    console.log('Sending message to:', myWhatsAppNumber)
    console.log('From:', twilioNumber)
    console.log('Message:', whatsappMessage)

    const messageResponse = await client.messages.create({
      from: twilioNumber,
      to: myWhatsAppNumber,
      body: whatsappMessage
    })
    
    console.log('Message SID:', messageResponse.sid)

    return NextResponse.json({ success: true, message: "Message sent to WhatsApp" })
  } catch (error: any) {
    console.error("Error sending WhatsApp message:")
    console.error('Error details:', error)
    
    // Log the full error for debugging
    if (error instanceof Error) {
      console.error('Error stack:', error.stack)
    } else {
      console.error('Error (no stack trace):', error)
    }
    
    // Prepare error response
    const errorResponse: any = {
      error: "Failed to send message",
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
