"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MessageSquare, TrendingUp, BarChart2, Activity, Clock, Brain } from "lucide-react"

// Training data for sentiment analysis
const trainingData = [
  { text: "I love this product, it's amazing!", sentiment: 1 },
  { text: "This is the best experience ever!", sentiment: 1 },
  { text: "Really good service and quality", sentiment: 0.8 },
  { text: "It's okay, nothing special", sentiment: 0.5 },
  { text: "Not bad, but could be better", sentiment: 0.3 },
  { text: "I'm disappointed with the quality", sentiment: 0.2 },
  { text: "This is terrible, worst experience", sentiment: 0 },
  { text: "Absolutely awful, don't buy this", sentiment: 0 },
  // Add more training examples here
]

// Simple word embedding function
const createEmbedding = (text: string): number[] => {
  const words = text.toLowerCase().split(/\s+/)
  const embedding = new Array(50).fill(0) // 50-dimensional embedding
  
  words.forEach((word, index) => {
    // Simple character-based embedding
    word.split('').forEach((char, charIndex) => {
      const position = (index * 10 + charIndex) % 50
      embedding[position] += char.charCodeAt(0) / 1000
    })
  })
  
  return embedding
}

// Lightweight neural network for sentiment analysis
class SentimentModel {
  private weights: number[][]
  private bias: number[]
  private learningRate: number

  constructor() {
    this.weights = Array(50).fill(0).map(() => Array(1).fill(Math.random() * 0.1))
    this.bias = [Math.random() * 0.1]
    this.learningRate = 0.01
  }

  predict(embedding: number[]): number {
    let sum = this.bias[0]
    for (let i = 0; i < embedding.length; i++) {
      sum += embedding[i] * this.weights[i][0]
    }
    return 1 / (1 + Math.exp(-sum)) // Sigmoid activation
  }

  train(embedding: number[], target: number) {
    const prediction = this.predict(embedding)
    const error = target - prediction
    const gradient = prediction * (1 - prediction) * error

    // Update weights and bias
    for (let i = 0; i < embedding.length; i++) {
      this.weights[i][0] += this.learningRate * gradient * embedding[i]
    }
    this.bias[0] += this.learningRate * gradient
  }
}

// Initialize and train the model
let model: SentimentModel | null = null
let isModelTrained = false

const initializeModel = () => {
  if (!model) {
    model = new SentimentModel()
  }
  return model
}

const trainModel = async () => {
  const model = initializeModel()
  
  // Train for multiple epochs
  for (let epoch = 0; epoch < 10; epoch++) {
    for (const example of trainingData) {
      const embedding = createEmbedding(example.text)
      model.train(embedding, example.sentiment)
    }
  }
  
  isModelTrained = true
  return model
}

// Enhanced sentiment analysis using Hugging Face API
const analyzeSentiment = async (text: string): Promise<{
  label: string
  score: number
  confidence: number
  aspects: { aspect: string; sentiment: string; score: number }[]
  emotions: { emotion: string; score: number }[]
  statistics: {
    wordCount: number
    avgWordLength: number
    complexity: number
    subjectivity: number
    readingTime: number
    sentimentTrend: number
  }
  keywords: { word: string; impact: number }[]
}> => {
  return new Promise(async (resolve) => {
    try {
      // Call Hugging Face API for sentiment analysis
      const response = await fetch(
        "https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      const result = await response.json();
      
      // Process the API response
      const sentimentScores = result[0];
      const maxScore = Math.max(...sentimentScores.map((s: any) => s.score));
      const sentiment = sentimentScores.find((s: any) => s.score === maxScore);
      
      // Map sentiment labels
      let label = "Neutral";
      let score = 0.5;
      
      switch(sentiment.label) {
        case "POS":
          label = "Positive";
          score = 0.8;
          break;
        case "NEG":
          label = "Negative";
          score = 0.2;
          break;
        case "NEU":
          label = "Neutral";
          score = 0.5;
          break;
      }

      // Calculate text statistics
      const words = text.toLowerCase().split(/\s+/);
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const wordCount = words.length;
      const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
      const avgWordLength = totalWordLength / wordCount;
      
      // Calculate complexity and subjectivity
      const complexity = Math.min(1, (avgWordLength / 8) * (wordCount / 20) * (sentences.length / 5));
      const subjectivity = Math.min(1, words.filter(w => 
        ["love", "hate", "good", "bad", "great", "terrible", "amazing", "awful"].includes(w)
      ).length / wordCount);

      // Analyze aspects
      const aspects = [
        { aspect: "Overall", keywords: ["overall", "in general", "all in all"] },
        { aspect: "Quality", keywords: ["quality", "standard", "excellence", "workmanship"] },
        { aspect: "Service", keywords: ["service", "support", "help", "assistance", "response"] },
        { aspect: "Value", keywords: ["value", "price", "worth", "cost", "affordable"] },
        { aspect: "Experience", keywords: ["experience", "interaction", "interface", "usability"] }
      ].map(({ aspect, keywords }) => {
        const matches = keywords.filter(keyword => text.toLowerCase().includes(keyword));
        const contextScore = matches.length > 0 ? 0.5 + (matches.length * 0.1) : 0.5;
        const sentiment = contextScore > 0.6 ? "Positive" : contextScore < 0.4 ? "Negative" : "Neutral";
        return { aspect, sentiment, score: contextScore };
      });

      // Detect emotions
      const emotions = [
        { emotion: "Joy", keywords: ["happy", "joy", "delighted", "pleased", "excited", "thrilled"] },
        { emotion: "Anger", keywords: ["angry", "furious", "annoyed", "irritated", "frustrated"] },
        { emotion: "Sadness", keywords: ["sad", "disappointed", "unhappy", "depressed", "gloomy"] },
        { emotion: "Fear", keywords: ["afraid", "scared", "worried", "anxious", "nervous"] },
        { emotion: "Surprise", keywords: ["surprised", "amazed", "astonished", "shocked"] },
        { emotion: "Trust", keywords: ["trust", "confident", "reliable", "dependable"] }
      ].map(({ emotion, keywords }) => {
        const matches = keywords.filter(keyword => text.toLowerCase().includes(keyword));
        const score = matches.length > 0 ? Math.min(1, matches.length * 0.25) : 0;
        return { emotion, score };
      });

      // Extract keywords
      const keywords = [...new Set(words)]
        .filter(word => ["love", "hate", "good", "bad", "great", "terrible", "amazing", "awful"].includes(word))
        .map(word => {
          let impact = 0;
          if (["love", "great", "amazing"].includes(word)) impact = 1;
          else if (["hate", "terrible", "awful"].includes(word)) impact = -1;
          else if (["good"].includes(word)) impact = 0.7;
          else if (["bad"].includes(word)) impact = -0.7;
          return { word, impact };
        })
        .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
        .slice(0, 5);

      resolve({
        label,
        score,
        confidence: sentiment.score,
        aspects,
        emotions,
        statistics: {
          wordCount,
          avgWordLength: parseFloat(avgWordLength.toFixed(2)),
          complexity: parseFloat(complexity.toFixed(2)),
          subjectivity: parseFloat(subjectivity.toFixed(2)),
          readingTime: Math.ceil(wordCount / 200),
          sentimentTrend: 0 // Simplified for now
        },
        keywords
      });
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      // Fallback to basic analysis if API fails
      resolve({
        label: "Neutral",
        score: 0.5,
        confidence: 0.5,
        aspects: [],
        emotions: [],
        statistics: {
          wordCount: text.split(/\s+/).length,
          avgWordLength: 0,
          complexity: 0,
          subjectivity: 0,
          readingTime: 0,
          sentimentTrend: 0
        },
        keywords: []
      });
    }
  });
};

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
  const [error, setError] = useState<string | null>(null)
  const [detailedAnalysis, setDetailedAnalysis] = useState<{
    confidence: number
    aspects: { aspect: string; sentiment: string; score: number }[]
    emotions: { emotion: string; score: number }[]
  } | null>(null)
  const [statistics, setStatistics] = useState<{
    wordCount: number
    avgWordLength: number
    complexity: number
    subjectivity: number
    readingTime: number
    sentimentTrend: number
  } | null>(null)
  const [keywords, setKeywords] = useState<{ word: string; impact: number }[]>([])

  const [chatInput, setChatInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm Poloju's portfolio assistant. How can I help you today?" },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTraining, setIsTraining] = useState(false)
  const [modelStatus, setModelStatus] = useState("Not Trained")

  const handleSentimentAnalysis = async () => {
    if (!sentimentText.trim()) return

    setIsAnalyzing(true)
    setError(null)
    try {
      const result = await analyzeSentiment(sentimentText)
      setSentimentResult({ label: result.label, score: result.score })
      setDetailedAnalysis({
        confidence: result.confidence,
        aspects: result.aspects,
        emotions: result.emotions
      })
      setStatistics(result.statistics)
      setKeywords(result.keywords)
    } catch (error) {
      console.error("Error analyzing sentiment:", error)
      setError("Failed to analyze sentiment. Please try again.")
      setSentimentResult(null)
      setDetailedAnalysis(null)
      setStatistics(null)
      setKeywords([])
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

  useEffect(() => {
    // Train model on component mount
    const trainModelOnMount = async () => {
      setIsTraining(true)
      setModelStatus("Training...")
      try {
        await trainModel()
        setModelStatus("Trained")
      } catch (error) {
        console.error("Error training model:", error)
        setModelStatus("Training Failed")
      } finally {
        setIsTraining(false)
      }
    }

    trainModelOnMount()
  }, [])

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
                <CardTitle className="flex items-center justify-between">
                  <span>Sentiment Analysis</span>
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="h-4 w-4" />
                    <span className={modelStatus === "Trained" ? "text-green-500" : "text-yellow-500"}>
                      {modelStatus}
                    </span>
                  </div>
                </CardTitle>
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
                        onChange={(e) => {
                          setSentimentText(e.target.value)
                          setError(null)
                        }}
                        placeholder="e.g., I really enjoyed this portfolio website!"
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSentimentAnalysis} 
                        disabled={isAnalyzing || !sentimentText.trim()}
                        className="min-w-[100px]"
                      >
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
                    {error && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                        {error}
                      </p>
                    )}
                  </div>

                  {isAnalyzing && (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Analyzing sentiment...
                        </p>
                      </div>
                    </div>
                  )}

                  {sentimentResult && !isAnalyzing && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Result:</h3>
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Sentiment:</span>
                          <span
                            className={`font-bold ${
                              sentimentResult.label === "Very Positive" || sentimentResult.label === "Positive"
                                ? "text-green-600"
                                : sentimentResult.label === "Very Negative" || sentimentResult.label === "Negative"
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
                              sentimentResult.label === "Very Positive" || sentimentResult.label === "Positive"
                                ? "bg-green-600"
                                : sentimentResult.label === "Very Negative" || sentimentResult.label === "Negative"
                                  ? "bg-red-600"
                                  : "bg-yellow-600"
                            }`}
                            style={{ width: "0%" }}
                            animate={{ width: `${sentimentResult.score * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>

                        {detailedAnalysis && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Confidence: {Math.round(detailedAnalysis.confidence * 100)}%</h4>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <motion.div
                                  className="h-2 rounded-full bg-blue-600"
                                  style={{ width: "0%" }}
                                  animate={{ width: `${detailedAnalysis.confidence * 100}%` }}
                                  transition={{ duration: 0.5 }}
                                />
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Aspects Analysis</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {detailedAnalysis.aspects.map((aspect, index) => (
                                  <div key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex justify-between text-sm">
                                      <span>{aspect.aspect}</span>
                                      <span className={aspect.sentiment === "Positive" ? "text-green-600" : aspect.sentiment === "Negative" ? "text-red-600" : "text-yellow-600"}>
                                        {aspect.sentiment}
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                                      <div
                                        className={`h-1.5 rounded-full ${
                                          aspect.sentiment === "Positive"
                                            ? "bg-green-600"
                                            : aspect.sentiment === "Negative"
                                              ? "bg-red-600"
                                              : "bg-yellow-600"
                                        }`}
                                        style={{ width: `${aspect.score * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium mb-2">Emotions Detected</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {detailedAnalysis.emotions.map((emotion, index) => (
                                  <div key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex justify-between text-sm">
                                      <span>{emotion.emotion}</span>
                                      <span>{Math.round(emotion.score * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                                      <div
                                        className="h-1.5 rounded-full bg-purple-600"
                                        style={{ width: `${emotion.score * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {statistics && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Text Statistics</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex items-center gap-2 text-sm">
                                      <TrendingUp className="h-4 w-4" />
                                      <span>Word Count: {statistics.wordCount}</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex items-center gap-2 text-sm">
                                      <BarChart2 className="h-4 w-4" />
                                      <span>Avg Word Length: {statistics.avgWordLength}</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Activity className="h-4 w-4" />
                                      <span>Complexity: {statistics.complexity * 100}%</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Activity className="h-4 w-4" />
                                      <span>Subjectivity: {statistics.subjectivity * 100}%</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Clock className="h-4 w-4" />
                                      <span>Reading Time: {statistics.readingTime} min</span>
                                    </div>
                                  </div>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                    <div className="flex items-center gap-2 text-sm">
                                      <TrendingUp className="h-4 w-4" />
                                      <span>Sentiment Trend: {statistics.sentimentTrend > 0 ? '↑' : statistics.sentimentTrend < 0 ? '↓' : '→'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {keywords.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Key Impact Words</h4>
                                <div className="flex flex-wrap gap-2">
                                  {keywords.map((keyword, index) => (
                                    <div
                                      key={index}
                                      className={`px-2 py-1 rounded text-sm ${
                                        keyword.impact > 0
                                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                      }`}
                                    >
                                      {keyword.word}
                                      <span className="ml-1 text-xs">
                                        {keyword.impact > 0 ? '+' : ''}{Math.round(keyword.impact * 100)}%
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
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
