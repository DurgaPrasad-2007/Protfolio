const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Get Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const myWhatsAppNumber = process.env.RECIPIENT_PHONE_NUMBER;

// Debug logging for environment variables
console.log('Environment Variables Status:');
console.log('TWILIO_ACCOUNT_SID:', accountSid ? 'Present' : 'Missing');
console.log('TWILIO_AUTH_TOKEN:', authToken ? 'Present' : 'Missing');
console.log('TWILIO_PHONE_NUMBER:', twilioNumber ? 'Present' : 'Missing');
console.log('RECIPIENT_PHONE_NUMBER:', myWhatsAppNumber ? 'Present' : 'Missing');

// Validate environment variables
if (!accountSid || !authToken || !twilioNumber || !myWhatsAppNumber) {
  console.error('Missing required Twilio environment variables. Please check your environment configuration.');
  console.error('Required variables:');
  console.error('- TWILIO_ACCOUNT_SID');
  console.error('- TWILIO_AUTH_TOKEN');
  console.error('- TWILIO_PHONE_NUMBER');
  console.error('- RECIPIENT_PHONE_NUMBER');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

// Serve the contact form at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle contact form submissions
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    const whatsappMessage = `New contact from:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

    await client.messages.create({
      body: whatsappMessage,
      from: twilioNumber,
      to: myWhatsAppNumber
    });

    res.status(200).json({ message: 'Message sent to WhatsApp successfully' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
}); 