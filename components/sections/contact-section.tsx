"use client"

import React, { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("Sending...")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      if (response.ok) {
        setStatus("Message sent successfully!")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setStatus(result.error || "Failed to send message.")
      }
    } catch (error) {
      setStatus("Failed to send message.")
    }
  }

  return (
    <section id="contact" className="py-12 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded border border-gray-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded border border-gray-300"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 rounded border border-gray-300"
          rows={5}
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark transition"
        >
          Send
        </button>
      </form>
      {status && (
        <div className="mt-4 p-3 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
          <p className="text-center">{status}</p>
        </div>
      )}
    </section>
  )
}
