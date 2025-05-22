import { NextRequest, NextResponse } from "next/server"

// Remove Twilio import
// import twilio from "twilio"

// Remove Twilio environment variable lookups
// function getEnvVar(name: string): string {
//   const value = process.env[name]
//   if (!value) {
//     throw new Error(`Missing required environment variable: ${name}`)
//   }
//   return value
// }

// Remove Twilio client initialization
// const accountSid = getEnvVar('TWILIO_ACCOUNT_SID')
// const authToken = getEnvVar('TWILIO_AUTH_TOKEN')
// const twilioNumber = getEnvVar('TWILIO_NUMBER')
// const myWhatsAppNumber = getEnvVar('MY_WHATSAPP_NUMBER')

// Remove Twilio client initialization
// const client = twilio(accountSid, authToken)

// Remove runtime export
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, message } = data

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Formspree endpoint URL
    /** @type {ProcessEnv} */
    const env = process.env;
    const formspreeUrl = env.FORMSPREE_CONTACT_FORM_URL;

    if (!formspreeUrl) {
       throw new Error("Missing FORMSPREE_CONTACT_FORM_URL environment variable");
    }

    // Send data to Formspree
    const formspreeResponse = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    // Check if Formspree submission was successful
    if (formspreeResponse.ok) {
      return NextResponse.json({ success: true, message: "Message sent successfully via Formspree" });
    } else {
      const errorData = await formspreeResponse.json();
      console.error("Formspree submission failed:", formspreeResponse.status, errorData);
      return NextResponse.json({ error: "Failed to send message via Formspree", details: errorData }, { status: formspreeResponse.status });
    }

  } catch (error: any) {
    console.error("Error processing contact form submission:", error)
    
    const errorResponse: any = {
      error: "Failed to process message",
      details: error instanceof Error ? error.message : 'Unknown error'
    }
    
    return NextResponse.json(errorResponse, { status: 500 })
  }
}
