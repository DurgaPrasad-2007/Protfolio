"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MessageSquare } from "lucide-react"

// This is a mock sentiment analysis function
// In a real app, you would use TensorFlow.js to load and run a model
const analyzeSentiment = (text: string): Promise<{ label: string; score: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple mock sentiment analysis
      const words = text.toLowerCase().split(/\s+/)
      const positiveWords = ["good", "great", "excellent", "amazing", "love", "happy", "best", "awesome"]
      const negativeWords = ["bad", "terrible", "awful", "hate", "worst", "poor", "disappointing"]

      let score = 0.5 // Neutral starting point

      for (const word of words) {
        if (positiveWords.includes(word)) score += 0.1
        if (negativeWords.includes(word)) score -= 0.1
      }

      // Clamp between 0 and 1
      score = Math.max(0, Math.min(1, score))

      let label = "Neutral"
      if (score > 0.6) label = "Positive"
      if (score < 0.4) label = "Negative"

      resolve({ label, score })
    }, 1000) // Simulate processing time
  })
}

interface Message {
  role: "user" | "bot"
  content: string
}

// Mock chatbot responses
const getChatbotResponse = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerMessage = message.toLowerCase()

      if (lowerMessage.includes("skill") || lowerMessage.includes("can you do")) {
        resolve(
          "I can help with information about Poloju Durga Prasad Chary's skills, which include Python, C++, Machine Learning, and web development. He's particularly strong in AI and data analysis.",
        )
      } else if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
        resolve(
          "Poloju has worked on several projects including sentiment analysis models, object detection systems, and web applications. You can check them out in the Projects section!",
        )
      } else if (lowerMessage.includes("experience") || lowerMessage.includes("job")) {
        resolve(
          "Poloju is currently a Machine Learning Intern at Unified Mentor, where he works on NLP and Computer Vision projects. He previously interned at Micro It.",
        )
      } else if (lowerMessage.includes("education") || lowerMessage.includes("study")) {
        resolve("Poloju studied B.Tech in Computer Science at T. R. R. College of Technology in Hyderabad.")
      } else if (lowerMessage.includes("contact") || lowerMessage.includes("reach")) {
        resolve("You can contact Poloju through the Contact form on this website, or connect with him on LinkedIn.")
      } else {
        resolve(
          "I'm a portfolio assistant for Poloju Durga Prasad Chary. You can ask me about his skills, projects, experience, or education!",
        )
      }
    }, 800)
  })
}

const AiDemoSection = () => {
  const [sentimentText, setSentimentText] = useState("")
  const [sentimentResult, setSentimentResult] = useState<{ label: string; score: number } | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm Poloju's portfolio assistant. How can I help you today?" },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSentimentAnalysis = async () => {
    if (!sentimentText.trim()) return

    setIsAnalyzing(true)
    try {
      const result = await analyzeSentiment(sentimentText)
      setSentimentResult(result)
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { role: "user" as const, content: chatInput }
    setMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsTyping(true)

    try {
      const response = await getChatbotResponse(chatInput)
      setMessages((prev) => [...prev, { role: "bot", content: response }])
    } catch (error) {
      console.error("Error getting chatbot response:", error)
      setMessages((prev) => [...prev, { role: "bot", content: "I'm sorry, I couldn't process your request." }])
    } finally {
      setIsTyping(false)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <section id="ai-demo" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 font-handjet"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          AI Demos
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sentiment-input" className="block text-sm font-medium mb-2">
                      Enter text to analyze:
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="sentiment-input"
                        value={sentimentText}
                        onChange={(e) => setSentimentText(e.target.value)}
                        placeholder="e.g., I really enjoyed this portfolio website!"
                        className="flex-1"
                      />
                      <Button onClick={handleSentimentAnalysis} disabled={isAnalyzing || !sentimentText.trim()}>
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing
                          </>
                        ) : (
                          "Analyze"
                        )}
                      </Button>
                    </div>
                  </div>

                  {sentimentResult && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Result:</h3>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Sentiment:</span>
                          <span
                            className={`font-bold ${
                              sentimentResult.label === "Positive"
                                ? "text-green-600"
                                : sentimentResult.label === "Negative"
                                  ? "text-red-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {sentimentResult.label}
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <motion.div
                            className={`h-2.5 rounded-full ${
                              sentimentResult.label === "Positive"
                                ? "bg-green-600"
                                : sentimentResult.label === "Negative"
                                  ? "bg-red-600"
                                  : "bg-yellow-600"
                            }`}
                            style={{ width: "0%" }}
                            animate={{ width: `${sentimentResult.score * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Negative</span>
                          <span>Neutral</span>
                          <span>Positive</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>Portfolio Chatbot</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4 max-h-[300px]">
                  {messages.map((message, index) => (
                    <div key={index} className={`mb-3 ${message.role === "user" ? "text-right" : "text-left"}`}>
                      <div
                        className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-left mb-3">
                      <div className="inline-block rounded-lg px-4 py-2 bg-white dark:bg-gray-800">
                        <div className="flex space-x-1">
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about skills, projects, etc."
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isTyping || !chatInput.trim()}>
                    <MessageSquare className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AiDemoSection
