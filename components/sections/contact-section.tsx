"use client"

import React, { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { formatNumber } from "./utils/formatNumber"
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
  const [visitorCount, setVisitorCount] = useState(0)
  const { theme } = useTheme()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send SMS notification via Twilio
      const response = await fetch('/api/twilio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }

      // Send email notification (existing code)
      const emailResponse = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      setFormData({ name: '', email: '', message: '' });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    fetch("/api/visitor")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.count))
      .catch((error) => console.error("Error fetching visitor count:", error))
  }, [])

  return (
    <section id="contact" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Get In Touch
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
        </p>
        <div className="mt-4 text-blue-400 font-medium">
          <span className="mr-2">Visitors:</span>
          <span className="text-white">{formatNumber(visitorCount)}</span>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-start"
      >
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-gray-800 shadow-xl h-full">
          <h3 className="text-2xl font-bold mb-8 text-white">Contact Information</h3>
          <div className="space-y-8 text-gray-300 text-lg">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <Mail className="h-7 w-7 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email</p>
                <p>polojudurgaprasad@gmail.com</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <Phone className="h-7 w-7 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Phone</p>
                <p>+91 9010242908</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <MapPin className="h-7 w-7 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Location</p>
                <p>Hyderabad, India</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <Clock className="h-7 w-7 text-blue-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">Working Hours</p>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Weekend: Available for urgent matters</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-8 border border-gray-800 shadow-xl">
          <h3 className="text-2xl font-bold mb-8 text-white">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Send Message
              </button>
            </div>
          </form>
          
          {status && (
            <div className={`mt-6 p-4 rounded-lg ${
              status.includes("success") ? "bg-green-900/30 border border-green-800" : "bg-amber-900/30 border border-amber-800"
            }`}>
              <p className="text-center text-sm font-medium">{status}</p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
