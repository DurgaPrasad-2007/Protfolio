import React from "react"

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Poloju Durga Prasad Chary",
    url: "https://polojudurgaprasadchary.com",
    jobTitle: "Machine Learning Intern",
    description: "Machine Learning Intern specializing in AI, cybersecurity, and software systems.",
    sameAs: [
      "https://github.com/DurgaPrasad-2007",
      "https://linkedin.com/in/poloju-durga-prasad-chary",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
