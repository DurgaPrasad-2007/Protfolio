import { Project } from "./types"

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "A task management application with AI features for task prioritization and smart reminders.",
    image: "/project-1.jpg",
    tags: ["React", "Next.js", "AI", "TensorFlow.js"],
    github_url: "https://github.com/polojuchandrakanth/ai-task-manager",
    demo_url: "https://ai-task-manager.vercel.app",
    featured: true,
    problem: "Managing tasks manually is inefficient and prone to forgetting important deadlines.",
    approach: "Implemented AI algorithms to prioritize tasks and send smart reminders based on user behavior.",
    outcome: "Users experienced improved productivity and timely task completion.",
    metrics: "Increased task completion rate by 30% within the first month."
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, and payment integration.",
    image: "/project-2.jpg",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    github_url: "https://github.com/polojuchandrakanth/ecommerce-platform",
    demo_url: "https://ecommerce-demo.vercel.app",
    featured: true,
    problem: "Small businesses lacked an easy-to-use online store solution with payment integration.",
    approach: "Built a scalable platform with product management, shopping cart, and Stripe payment gateway.",
    outcome: "Enabled businesses to launch online stores quickly and securely.",
    metrics: "Processed over $100K in transactions within the first quarter."
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "A real-time chat application with private messaging, group chats, and file sharing capabilities.",
    image: "/project-3.jpg",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    github_url: "https://github.com/polojuchandrakanth/realtime-chat",
    demo_url: "https://realtime-chat-app.vercel.app",
    featured: false,
    problem: "Existing chat apps lacked real-time responsiveness and file sharing in groups.",
    approach: "Used Socket.io for real-time communication and implemented file upload/download features.",
    outcome: "Users enjoyed seamless messaging and collaboration.",
    metrics: "Supported 10,000+ concurrent users with minimal latency."
  },
  {
    id: 4,
    title: "Portfolio Website Template",
    description: "A customizable portfolio website template for developers and designers.",
    image: "/project-4.jpg",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    github_url: "https://github.com/polojuchandrakanth/portfolio-template",
    demo_url: "https://portfolio-template-demo.vercel.app",
    featured: false,
    problem: "Developers needed a modern, customizable portfolio template to showcase their work.",
    approach: "Created a responsive template with Tailwind CSS and smooth animations using Framer Motion.",
    outcome: "Users could easily personalize and deploy their portfolios.",
    metrics: "Used by 500+ developers worldwide."
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "A weather dashboard with forecast data, location search, and interactive maps.",
    image: "/project-5.jpg",
    tags: ["React", "OpenWeather API", "Mapbox"],
    github_url: "https://github.com/polojuchandrakanth/weather-dashboard",
    demo_url: "https://weather-dashboard-demo.vercel.app",
    featured: false,
    problem: "Users wanted a consolidated view of weather forecasts with interactive maps.",
    approach: "Integrated OpenWeather API and Mapbox to display real-time weather and location data.",
    outcome: "Provided accurate forecasts and easy navigation.",
    metrics: "Achieved 4.5-star rating on user feedback."
  },
  {
    id: 6,
    title: "AI Image Generator",
    description: "An AI-powered image generator using machine learning models to create unique images.",
    image: "/project-6.jpg",
    tags: ["React", "TensorFlow.js", "AI", "Canvas API"],
    github_url: "https://github.com/polojuchandrakanth/ai-image-generator",
    demo_url: "https://ai-image-generator-demo.vercel.app",
    featured: true,
    problem: "Creating unique images manually is time-consuming and requires artistic skills.",
    approach: "Leveraged TensorFlow.js models to generate images based on user input and styles.",
    outcome: "Users could create custom images effortlessly.",
    metrics: "Generated over 10,000 images in the first month."
  },
]

export const defaultFilters = [
  { value: "all", label: "All Projects" },
  { value: "featured", label: "Featured" },
  { value: "React", label: "React" },
  { value: "Next.js", label: "Next.js" },
  { value: "AI", label: "AI" },
]
