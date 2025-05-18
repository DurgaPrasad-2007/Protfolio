"use client"

import { motion } from "framer-motion"
// Import any necessary UI components like Card, etc.
// import { Card, CardContent } from "@/components/ui/card";

const CertificatesSection = () => {
  const certificates = [
    {
      title: "The Ultimate 2025 Fullstack Web Development Bootcamp",
      issuer: "Udemy",
      issueDate: "Apr 2025",
      credentialId: "UC-f6442a91-c551-4bed-9e5c-6be77fca6dc3",
      credentialUrl: "#", // Replace with actual URL if available
      image: "/images/udemy-fullstack-certificate.png", // Placeholder for image path
      description: "Issued for completing the fullstack web development bootcamp."
    },
    {
      title: "SOFTWARE TESTING TRAINING",
      issuer: "Besant Technologies",
      issueDate: "Mar 2025",
      credentialId: "BT-ECFT-387026",
      credentialUrl: "#", // Replace with actual URL if available
      image: "/images/besant-software-testing-certificate.pdf", // Placeholder for image path (consider how to display PDF)
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
        
        {/* Add space for dynamic animation and smooth transitions */}
        {/* The motion.div around each certificate item already provides basic animation. */}
        {/* Further dynamic animations and transitions can be added using Framer Motion. */}
      </div>
    </section>
  );
};

export default CertificatesSection; 