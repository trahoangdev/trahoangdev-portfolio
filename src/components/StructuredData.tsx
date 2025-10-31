import { useEffect } from 'react';

interface PersonSchema {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  image?: string;
  email?: string;
  telephone?: string;
  address?: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  sameAs?: string[];
  knowsAbout?: string[];
}

interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
}

export const StructuredData = () => {
  useEffect(() => {
    // Person Schema
    const personSchema: PersonSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Hoàng Trọng Trà",
      jobTitle: "Full Stack Developer",
      description: "Full Stack Developer specializing in React, TypeScript, and modern web technologies. Available for freelance and full-time opportunities.",
      url: "https://trahoangdev.com",
      image: "https://trahoangdev.com/avatar.png",
      email: "trahoangdev@gmail.com",
      telephone: "+84906888888",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ho Chi Minh City",
        addressCountry: "VN"
      },
      sameAs: [
        "https://github.com/trahoangdev",
        "https://linkedin.com/in/trahoangdev"
      ],
      knowsAbout: [
        "React",
        "TypeScript",
        "Node.js",
        "Python",
        "AWS",
        "PostgreSQL",
        "Web Development",
        "Full Stack Development"
      ]
    };

    // WebSite Schema
    const websiteSchema: WebSiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "trahoangdev Portfolio",
      url: "https://trahoangdev.com",
      description: "Personal portfolio of trahoangdev - Full Stack Developer",
      author: {
        "@type": "Person",
        name: "Hoàng Trọng Trà"
      }
    };

    // Create and append script tags
    const createScript = (schema: PersonSchema | WebSiteSchema, id: string) => {
      // Remove existing script if present
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }

      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    createScript(personSchema, 'person-schema');
    createScript(websiteSchema, 'website-schema');

    // Cleanup on unmount
    return () => {
      const personScript = document.getElementById('person-schema');
      const websiteScript = document.getElementById('website-schema');
      if (personScript) personScript.remove();
      if (websiteScript) websiteScript.remove();
    };
  }, []);

  return null;
};

