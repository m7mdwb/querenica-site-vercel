"use client"

import { useEffect } from "react"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  Home,
  ArrowLeft,
  Download,
  Phone,
  Mail,
  ExternalLink,
  MapPin, // <<< --- ADD MapPin HERE
} from "lucide-react"
import Link from "next/link"
import "./thank-you.css"

// LoadingScreen import is not needed if this page never shows it.
// import LoadingScreen from "@/components/loading-screen";

export default function ThankYouPage() {
  useEffect(() => {
    // Scroll to top when the page loads
    window.scrollTo(0, 0)

    // Clear the specific flag set by the ContactSection
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("showThankYouPageLoading")
    }
  }, [])

  const handleCatalogDownload = () => {
    const catalogUrl = "https://sites.google.com/u/0/d/1PzQEUZsWPXnQcYaQlyJBHIElD5tv0kpS/preview";
    window.open(catalogUrl, "_blank");
  };

  const projects = [
    {
      id: "la-casalia",
      name: "La Casalia",
      description: "Luxury villas with private pools and panoramic sea views.",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%201-G0mes18sTWOZ2cWwd6FM2eYbgfGL3y.jpg",
      location: "Kyrenia, North Cyprus",
      websiteUrl: "https://dovecgroup.com/projects/la-casalia",
    },
    {
      id: "natalux",
      name: "Natalux",
      description: "Modern apartments in the heart of the city.",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%201-32NbplBa3pvC5dJqzWeUHJjRLVo6LO.jpg",
      location: "Famagusta, North Cyprus",
      websiteUrl: "https://dovecgroup.com/projects/natalux",
    },
    {
      id: "la-isla",
      name: "La Isla",
      description: "Beachfront residences with exclusive amenities.",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/B-C-D%202%2B1%201-pSGOjrRyvS0wWb9aPMmoGMGsQmskUP.jpg",
      location: "Bafra, North Cyprus",
      websiteUrl: "https://dovecgroup.com/projects/la-isla",
    },
    {
      id: "panorama",
      name: "Panorama",
      description: "Elevated living with 360° mountain and sea views.",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%201-8wK1VD3e6L1ZKnGmxYPvCUIbOzPMym.jpg",
      location: "Iskele, North Cyprus",
      websiteUrl: "https://dovecgroup.com/projects/panorama",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a] relative overflow-hidden">
      {/* Optional: Placeholder for Abstract Background Art (if you keep it) */}
      {/* <div className="thank-you-background-art" aria-hidden="true"></div> */}

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        {/* Card with fade-in animation defined in thank-you.css */}
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-xl sm:p-8 md:p-10 fade-in"> {/* Use a general fade-in class */}
          <div className="mb-6 flex flex-col items-center justify-center text-center md:mb-8">
            <div className="mb-5 w-36 md:w-44">
              <img
                src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png"
                alt="Querencia"
                className="w-full h-auto"
              />
            </div>
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c] md:h-20 md:w-20">
              <CheckCircle className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h1 className="mb-2 text-2xl font-light tracking-wide text-[#1a1a1a] sm:text-3xl md:text-4xl">
              Thank You for Your Inquiry
            </h1>
            <p className="mb-6 text-base text-[#555] md:text-lg">
              We've received your message and will be in touch shortly.
            </p>
            <div className="w-20 border-t border-slate-300"></div>
          </div>

          <div className="space-y-5 md:space-y-6">
            <div className="rounded-md bg-slate-50 p-5 md:p-6 fade-in-delay-1">
              <h2 className="mb-3 text-lg font-semibold text-[#2c4051] md:text-xl">What Happens Next?</h2>
              <ul className="space-y-2.5 text-sm text-[#555] md:text-base">
                <li className="flex items-start">
                  <span className="mr-2.5 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></span>
                  <span>A member of our dedicated team will review your details.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2.5 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></span>
                  <span>Expect to hear from us within 24-48 hours.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2.5 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></span>
                  <span>If you requested our catalog, it's ready for you below!</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-md border border-slate-200 p-5 md:p-6 fade-in-delay-2">
              <h2 className="mb-3 text-lg font-semibold text-[#2c4051] md:text-xl">Immediate Assistance</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <div className="mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#666]">Call Us</p>
                    <a href="tel:+905488370015" className="text-sm text-[#2c4051] hover:text-[#c9a77c] font-medium md:text-base">
                      +90 548 837 0015
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#666]">Email Us</p>
                    <a href="mailto:info@dovecgroup.com" className="text-sm text-[#2c4051] hover:text-[#c9a77c] font-medium md:text-base break-all">
                      info@dovecgroup.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between fade-in-delay-3">
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 transition-colors">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Homepage
                </Link>
              </Button>
              <Button
                className="bg-[#c9a77c] text-white shadow hover:bg-[#b89669] transition-colors"
                onClick={handleCatalogDownload}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Catalog
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl md:mt-20 fade-in-delay-3">
          <h2 className="mb-8 text-center text-2xl font-light tracking-wider text-[#1a1a1a] md:text-3xl">
            Explore Other Dovec Group Ventures
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={project.websiteUrl} // Make sure websiteUrl is defined in your project objects
                target="_blank"
                rel="noopener noreferrer"
                className={`group overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl project-card-animation`}
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image || "/images/placeholder-project.jpg"} // Fallback for project image
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => ((e.target as HTMLImageElement).src = "/images/placeholder-project.jpg")} // Type assertion for onError
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                   <div className="absolute bottom-3 right-3 rounded-full bg-white/80 p-1.5 text-[#c9a77c] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                    </div>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="mb-1 text-md font-semibold text-[#2c4051] transition-colors group-hover:text-[#c9a77c] md:text-lg">{project.name}</h3>
                  <p className="mb-2 text-xs text-[#666] line-clamp-2 md:text-sm">{project.description}</p>
                  <div className="flex items-center text-xs text-[#888]">
                    <MapPin className="mr-1.5 h-3 w-3 flex-shrink-0" /> {/* MapPin is used here */}
                    <span>{project.location}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button
              size="lg"
              className="bg-[#2c4051] px-8 py-3 text-base text-white shadow-md hover:bg-[#3a526a] transition-all duration-300 hover:scale-105"
              asChild
            >
              <a
                href="https://dovecgroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Visit Dovec Group
              </a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center md:mt-20 fade-in-delay-3">
          <h2 className="mb-6 text-2xl font-light tracking-wider text-[#1a1a1a] md:text-3xl">Discover More of Querencia</h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {["Residences", "Gallery", "Virtual Tour"].map((item) => (
                 <Button asChild key={item} variant="outline" className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors px-6 py-2.5 text-sm md:text-base">
                    <Link href={`/#${item.toLowerCase().replace(" ", "-")}`}>{item === "Virtual Tour" ? "360° Virtual Tour" : `Explore ${item}`}</Link>
                 </Button>
            ))}
            <Button asChild className="bg-[#2c4051] text-white shadow hover:bg-[#3a526a] transition-colors px-6 py-2.5 text-sm md:text-base">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
