"use client"

import { motion } from "framer-motion"
import { GraduationCap, Award, Calendar } from "lucide-react"
import { useState } from "react"

interface Education {
  degree: string
  institution: string
  period: string
  description: string
  achievements?: string[]
}

// Define interface for certificates if needed, based on the CertificatesSection structure
interface Certificate {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image?: string; // Assuming images will be added
  description?: string;
}

const educations: Education[] = [
  {
    degree: "Diploma in Computer Science",
    institution: "T. R. R. College of Technology, Hyderabad",
    period: "Jul 2023 - May 2026",
    description: "Studying computer science with a focus on programming, algorithms, and software development.",
    achievements: [
      "Active participation in Public Speaking activities",
      "Engaged in various technical workshops and seminars",
    ],
  },
  {
    degree: "High School",
    institution: "KarthiKeya Concept School",
    period: "Jul 2016 - Apr 2023",
    description: "Completed high school education with a focus on mathematics and science.",
    achievements: [
      "Participated in various school competitions",
      "Developed interest in computer science and programming",
    ],
  },
]

const CoursesAndCertifications = () => {
  const certificates: Certificate[] = [
    {
      title: "The Ultimate 2025 Fullstack Web Development Bootcamp",
      issuer: "Udemy",
      issueDate: "Apr 2025",
      credentialId: "UC-f6442a91-c551-4bed-9e5c-6be77fca6dc3",
      credentialUrl: "#", // Replace with actual URL if available
      image: "https://udemy-certificate.s3.amazonaws.com/image/UC-f6442a91-c551-4bed-9e5c-6be77fca6dc3.jpg?v=1745115344000", // Placeholder for image path
      description: "Issued for completing the fullstack web development bootcamp."
    },
    {
      title: "SOFTWARE TESTING TRAINING",
      issuer: "Besant Technologies",
      issueDate: "Mar 2025",
      credentialId: "BT-ECFT-387026",
      credentialUrl: "#", // Replace with actual URL if available 
      image: "https://media.licdn.com/dms/image/v2/D562DAQEo6kWrqk1PQA/profile-treasury-document-cover-images_480/B56Zab3JdyGUA8-/0/1746371648563?e=1748268000&v=beta&t=7J_hLX1aIWbhXXvQQzzskk75U2P3rgD1yhgyWa9zqq0", // Placeholder for image path (consider how to display PDF)
      description: "Issued for completing software testing training."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{/* Adopt grid layout from CertificatesSection */}
      {certificates.map((certificate, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          {/* Add space for image */}
          <div className="mb-4 w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
            {/* Placeholder for certificate image or icon */}
            <span className="text-gray-500 dark:text-gray-400">Image Placeholder</span>
            {/* You can use an Image component here */}
            {/* <Image src={certificate.image} alt={certificate.title} width={...} height={...} /> */}
          </div>

          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{certificate.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Issuer: {certificate.issuer}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Issued: {certificate.issueDate}</p>

          {certificate.credentialId && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">Credential ID: {certificate.credentialId}</p>
          )}

          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline dark:text-blue-400"
            >
              Show credential
            </a>
          )}
          {/* You can add description here if needed */}
          {/* <p className="text-gray-700 dark:text-gray-300 mt-4">{certificate.description}</p> */}
        </motion.div>
      ))}
    </div>
  );
};

const EducationSection = () => {
  const [activeTab, setActiveTab] = useState('formal');

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 font-handjet"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education & Training
        </motion.h2>

        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-3 rounded-l-lg text-lg font-medium transition-colors ${
              activeTab === 'formal'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('formal')}
          >
            <GraduationCap className="inline-block mr-2" size={20} />Formal Education
          </button>
          <button
            className={`px-6 py-3 rounded-r-lg text-lg font-medium transition-colors ${
              activeTab === 'certifications'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('certifications')}
          >
             <Award className="inline-block mr-2" size={20} />Courses & Certifications
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          {activeTab === 'formal' && (
            <div>
              {educations.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="text-primary" size={24} />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">{edu.degree}</h3>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Award size={16} />
                        <p>{edu.institution}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <p>{edu.period}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">{edu.description}</p>

                    {edu.achievements && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 text-gray-800 dark:text-white">Achievements:</h4>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                          {edu.achievements.map((achievement, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            >
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
             <CoursesAndCertifications />
          )}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
