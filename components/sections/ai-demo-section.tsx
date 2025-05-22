"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MessageSquare, TrendingUp, BarChart2, Activity, Clock, Brain, 
  Code2, Briefcase, GraduationCap, Mail, Github, Linkedin, Sparkles, 
  Lightbulb, Trophy, Rocket, Star, Heart, ThumbsUp, Smile, Sparkle, X } from "lucide-react"

// Icons mapping for chatbot responses
const icons = {
  Code2,
  Briefcase,
  GraduationCap,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Lightbulb,
  Trophy,
  Rocket,
  Star,
  Heart,
  ThumbsUp,
  Smile,
  Sparkle,
  MessageSquare,
  X
}

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
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY || ''}`,
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
       // Handle API errors
       console.error("Hugging Face API error:", error);
       // Return a default or simplified sentiment result in case of API failure
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
  icon?: React.ComponentType<{ className?: string }>
}

const getChatbotResponse = async (message: string): Promise<{ content: string; icon?: keyof typeof icons }> => {
  const lowerMessage = message.toLowerCase();

  // Simple keyword-based responses with icons
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return { content: "Hello! How can I help you today?", icon: 'Smile' };
  }
  if (lowerMessage.includes("skills")) {
    return { content: "I specialize in React, Next.js, TypeScript, and building AI/ML applications.", icon: 'Brain' };
  }
  if (lowerMessage.includes("projects")) {
    return { content: "You can find my projects in the Projects section above!", icon: 'Rocket' };
  }
  if (lowerMessage.includes("contact")) {
    return { content: "Feel free to reach out via the contact form below or connect with me on LinkedIn!", icon: 'Mail' };
  }
   if (lowerMessage.includes("fun fact")) {
    const funFacts = [
      "I once trained a model to distinguish between different types of pasta!",
      "I enjoy solving coding challenges in my free time.",
      "My first computer had less RAM than a modern smartphone!",
      "I believe AI can solve many of the world's problems.",
      "I'm always learning new technologies!"
    ];
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    return { content: randomFact, icon: 'Sparkles' };
  }
    if (lowerMessage.includes("sentiment analysis")) {
        return { content: "I can analyze the sentiment of text. Try typing a sentence in the sentiment analysis box!", icon: 'ThumbsUp' };
    }
    if (lowerMessage.includes("aspects")) {
        return { content: "I can analyze different aspects of text like quality, service, and value.", icon: 'Lightbulb' };
    }
     if (lowerMessage.includes("emotions")) {
        return { content: "I can detect emotions like joy, anger, and sadness in text.", icon: 'Heart' };
    }
     if (lowerMessage.includes("statistics")) {
        return { content: "I can provide statistics like word count and average word length.", icon: 'BarChart2' };
    }
     if (lowerMessage.includes("keywords")) {
        return { content: "I can extract important keywords from text.", icon: 'Star' };
    }
    if (lowerMessage.includes("resume")) {
        return { content: "You can view or download my resume from the navigation bar!", icon: 'Award' };
    }
     if (lowerMessage.includes("certificates")) {
        return { content: "Check out my certifications in the Certificates section!", icon: 'Trophy' };
    }
     if (lowerMessage.includes("github")) {
        return { content: "You can find my projects and contributions on GitHub.", icon: 'Github' };
    }
     if (lowerMessage.includes("linkedin")) {
        return { content: "Let's connect on LinkedIn!", icon: 'Linkedin' };
    }
      if (lowerMessage.includes("working hours")) {
        return { content: "You can find my working hours in the Contact section.", icon: 'Clock' };
    }

  // Fallback response
  return { content: "I'm still learning! Can you try asking something else?", icon: 'Brain' };
};

const AiDemoSection = () => {
  const [sentimentInput, setSentimentInput] = useState("")
  const [sentimentResult, setSentimentResult] = useState<any>(null) // Adjust type as needed
  const [loadingSentiment, setLoadingSentiment] = useState(false)
  const [sentimentError, setSentimentError] = useState<string | null>(null)
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [loadingChat, setLoadingChat] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const showRandomFunFact = () => {
    const funFacts = [
      "I once trained a model to distinguish between different types of pasta!",
      "I enjoy solving coding challenges in my free time.",
      "My first computer had less RAM than a modern smartphone!",
      "I believe AI can solve many of the world's problems.",
      "I'm always learning new technologies!"
    ];
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    // Add the fun fact as a bot message
    setChatMessages(prevMessages => [...prevMessages, { role: "bot", content: randomFact, icon: icons.Sparkles }]);
  };

  const handleSentimentAnalysis = async () => {
    setLoadingSentiment(true)
    setSentimentResult(null)
    setSentimentError(null)
    try {
      const result = await analyzeSentiment(sentimentInput)
      setSentimentResult(result)
    } catch (error) {
      console.error("Sentiment analysis error:", error)
      setSentimentError("Failed to perform sentiment analysis.")
    } finally {
      setLoadingSentiment(false)
    }
  }

  // Function to scroll to the bottom of the chat messages
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: behavior });
  };

   // Scroll to bottom whenever chatMessages update
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = chatInput
    setChatMessages(prevMessages => [...prevMessages, { role: "user", content: userMessage }])
    setChatInput("")
    setLoadingChat(true)
    setChatError(null)

    try {
      const botResponse = await getChatbotResponse(userMessage)
      setChatMessages(prevMessages => [...prevMessages, { role: "bot", content: botResponse.content, icon: botResponse.icon ? icons[botResponse.icon] : undefined }])
    } catch (error) {
      console.error("Chatbot error:", error)
      setChatError("Sorry, I'm having trouble responding right now.")
      setChatMessages(prevMessages => [...prevMessages, { role: "bot", content: "Sorry, I'm having trouble responding right now." }])
    } finally {
      setLoadingChat(false)
    }
  }

  // Initial bot message
  useEffect(() => {
    setChatMessages([
      { role: "bot", content: "Hello! I'm your portfolio chatbot. Ask me anything about the portfolio!", icon: icons.Smile }
    ]);
  }, []);

  // Train the model on component mount
  useEffect(() => {
    const trainModelOnMount = async () => {
      await trainModel();
      console.log('Sentiment model trained.');
    }
    // No need to train if using Hugging Face API
    // trainModelOnMount();
  }, []);


  return (
    <section id="ai-demo" className="py-20 px-4 max-w-6xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          AI Demos
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore some of the AI features I've been working on, including Sentiment Analysis and a Portfolio Chatbot.
        </p>
      </motion.div>

      {/* Sentiment Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-16"
      >
        <Card className="bg-gray-900/50 backdrop-blur-lg border border-gray-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-2xl font-bold">Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Enter text for sentiment analysis..."
                value={sentimentInput}
                onChange={(e) => setSentimentInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSentimentAnalysis();
                  }
                }}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <Button
                onClick={handleSentimentAnalysis}
                disabled={loadingSentiment}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {loadingSentiment ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <TrendingUp className="mr-2 h-5 w-5" />} Analyze
              </Button>
            </div>
            {sentimentResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mt-6 p-4 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-300"
              >
                <h4 className="font-semibold mb-2 text-white">Analysis Results:</h4>
                <p>Sentiment: <span className={`font-bold ${sentimentResult.label === 'Positive' ? 'text-green-500' : sentimentResult.label === 'Negative' ? 'text-red-500' : 'text-yellow-500'}`}>{sentimentResult.label}</span> (Confidence: {(sentimentResult.confidence * 100).toFixed(2)}%)</p>
                
                {/* Display Statistics */}
                {sentimentResult.statistics && (
                  <div className="mt-4 border-t border-gray-700 pt-4">
                     <h5 className="font-semibold mb-2 text-white text-base">Statistics:</h5>
                     <div className="grid grid-cols-2 gap-3 text-sm">
                        <p className="flex items-center gap-2"><BarChart2 className="h-4 w-4 text-blue-400"/> Word Count: {sentimentResult.statistics.wordCount}</p>
                        <p className="flex items-center gap-2"><Activity className="h-4 w-4 text-green-400"/> Avg Word Length: {sentimentResult.statistics.avgWordLength}</p>
                        <p className="flex items-center gap-2"><Brain className="h-4 w-4 text-purple-400"/> Complexity: {sentimentResult.statistics.complexity}</p>
                        <p className="flex items-center gap-2"><Sparkle className="h-4 w-4 text-yellow-400"/> Subjectivity: {sentimentResult.statistics.subjectivity}</p>
                        <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-400"/> Reading Time: {sentimentResult.statistics.readingTime} min</p>
                        {/* <p className="flex items-center gap-2"><TrendingUp className="h-4 w-4 text-rose-400"/> Sentiment Trend: {sentimentResult.statistics.sentimentTrend}</p> */}
                     </div>
                  </div>
                )}

                 {/* Display Aspects */}
                 {sentimentResult.aspects && sentimentResult.aspects.length > 0 && (
                   <div className="mt-4 border-t border-gray-700 pt-4">
                     <h5 className="font-semibold mb-2 text-white text-base">Aspect Analysis:</h5>
                     <div className="grid grid-cols-2 gap-3 text-sm">
                        {sentimentResult.aspects.map((aspect: any, index: number) => (
                           <p key={index}><span className="font-medium text-blue-400">{aspect.aspect}:</span> <span className={aspect.sentiment === 'Positive' ? 'text-green-500' : aspect.sentiment === 'Negative' ? 'text-red-500' : 'text-yellow-500'}>{aspect.sentiment}</span> (Score: {(aspect.score * 100).toFixed(0)}%)</p>
                        ))}
                     </div>
                   </div>
                 )}

                 {/* Display Emotions */}
                 {sentimentResult.emotions && sentimentResult.emotions.length > 0 && (
                   <div className="mt-4 border-t border-gray-700 pt-4">
                     <h5 className="font-semibold mb-2 text-white text-base">Emotion Detection:</h5>
                     <div className="grid grid-cols-2 gap-3 text-sm">
                        {sentimentResult.emotions.map((emotion: any, index: number) => (
                           <p key={index}><span className="font-medium text-purple-400">{emotion.emotion}:</span> {(emotion.score * 100).toFixed(0)}%</p>
                        ))}
                     </div>
                   </div>
                 )}

                  {/* Display Keywords */}
                 {sentimentResult.keywords && sentimentResult.keywords.length > 0 && (
                   <div className="mt-4 border-t border-gray-700 pt-4">
                     <h5 className="font-semibold mb-2 text-white text-base">Keywords:</h5>
                     <div className="flex flex-wrap gap-2 text-sm">
                        {sentimentResult.keywords.map((keyword: any, index: number) => (
                           <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${
                              keyword.impact > 0 ? 'bg-green-900/30 text-green-400' :
                              keyword.impact < 0 ? 'bg-red-900/30 text-red-400' :
                              'bg-gray-700/30 text-gray-300'
                           }`}>{keyword.word}</span>
                        ))}
                     </div>
                   </div>
                 )}


              </motion.div>
            )}
            {sentimentError && (
              <div className="mt-4 p-4 rounded-lg bg-amber-900/30 border border-amber-800 text-amber-400">
                <p className="text-center text-sm font-medium">{sentimentError}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Portfolio Chatbot Section - Initially hidden */}
      <AnimatePresence>
      {isChatbotOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 w-full max-w-sm bg-gray-900/90 backdrop-blur-lg rounded-lg shadow-xl z-50 border border-gray-800"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-gray-800">
              <CardTitle className="text-white text-lg font-bold">Portfolio Chatbot</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatbotOpen(false)} // Close chatbot
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-4 h-80 overflow-y-auto custom-scrollbar flex flex-col-reverse">
              {chatMessages.slice().reverse().map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                  className={`flex items-start mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-gray-200 rounded-bl-none'
                  }`}>
                    {message.icon && (
                       <div className="flex items-center gap-2 mb-1">
                         {React.createElement(message.icon, { className: 'h-5 w-5 text-blue-300' })}
                       </div>
                    )}
                    {message.content}
                  </div>
                </motion.div>
              ))}
              <div ref={chatMessagesEndRef} /> {/* Scroll to this div */}
              {loadingChat && (
                <div className="flex justify-start mb-4">
                  <div className="rounded-lg p-3 bg-gray-700 text-gray-200 rounded-bl-none">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
            </CardContent>
            <div className="p-4 border-t border-gray-800">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask me a question..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <Button type="submit" disabled={!chatInput.trim() || loadingChat} size="icon">
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </form>
               {chatError && (
                <p className="text-red-500 text-sm mt-2 text-center">{chatError}</p>
               )}
            </div>
          </Card>
        </motion.div>
      )}
      </AnimatePresence>

       {/* Floating Chat Icon Button */}
       <motion.button
         initial={{ opacity: 0, scale: 0.5 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
         className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none z-50"
         onClick={() => setIsChatbotOpen(true)} // Open chatbot
         aria-label="Open chatbot"
       >
         <MessageSquare className="h-6 w-6" />
       </motion.button>

    </section>
  )
}

export default AiDemoSection
