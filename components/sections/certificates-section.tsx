"use client"

import { motion } from "framer-motion"
import Image from 'next/image'; // Import the Image component
// Import any necessary UI components like Card, etc.
// import { Card, CardContent } from "@/components/ui/card";

const CertificatesSection = () => {
  const certificates = [
    {
      title: "The Ultimate 2025 Fullstack Web Development Bootcamp",
      issuer: "Udemy",
      issueDate: "Apr 2025",
      credentialId: "UC-f6442a91-c551-4bed-9e5c-6be77fca6dc3",
      credentialUrl: "https://www.udemy.com/certificate/UC-f6442a91-c551-4bed-9e5c-6be77fca6dc3/", // Actual URL
      image: "https://udemy-certificate.s3.amazonaws.com/image/UC-f6442a91-c551-4bed-9e5c-6be77fca6dc3.jpg?v=1745115344000", // Direct image URL
      description: "Issued for completing the fullstack web development bootcamp."
    },
    {
      title: "SOFTWARE TESTING TRAINING",
      issuer: "Besant Technologies",
      issueDate: "Mar 2025",
      credentialId: "BT-ECFT-387026",
      credentialUrl: "#", // Replace with actual URL if available
      image: "https://media.licdn.com/dms/image/v2/D562DAQEo6kWrqk1PQA/profile-treasury-document-cover-images_480/B56Zab3JdyGUA8-/0/1746371648563?e=1748268000&v=beta&t=7J_hLX1aIWbhXXvQQzzskk75U2P3rgD1yhgyWa9zqq0", // Direct image URL
      description: "Issued for completing software testing training."
    }
  ];

  return (
    <section id="certificates" className="py-16 lg:py-24 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold mb-12 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Licenses & Certifications
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((certificate, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Display Image if available */}
              {certificate.image && (
                <div className="mb-4 w-full h-48 relative rounded-md overflow-hidden">
                  {/* Use a Link component if the image should link to the credential URL */}
                  {certificate.credentialUrl ? (
                    <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                       <Image 
                        src={certificate.image}
                        alt={certificate.title}
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  ) : (
                    <Image 
                      src={certificate.image}
                      alt={certificate.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                 
                </div>
              )}

              {!certificate.image && (
                 <div className="mb-4 w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
                  {/* Placeholder for certificate image or icon */}
                  <span className="text-gray-500 dark:text-gray-400">Image Placeholder</span>
                </div>
              )}

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
        
        {/* Add space for dynamic animation and smooth transitions */}
        {/* The motion.div around each certificate item already provides basic animation. */}
        {/* Further dynamic animations and transitions can be added using Framer Motion. */}
      </div>
    </section>
  );
};

export default CertificatesSection; 