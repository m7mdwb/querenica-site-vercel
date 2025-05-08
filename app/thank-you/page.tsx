"use client"

import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, ArrowLeft, Download, Phone, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import "./thank-you.css"

export default function ThankYouPage() {
  // Integrated catalog download functionality directly
  const handleCatalogDownload = () => {
    const catalogUrl = "https://sites.google.com/u/0/d/1PzQEUZsWPXnQcYaQlyJBHIElD5tv0kpS/preview"
    window.open(catalogUrl, "_blank")
  }

  // Project data
  const projects = [
    {
      id: "la-casalia",
      name: "La Casalia",
      description: "Luxury villas with private pools and panoramic sea views",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/2-%20A%20Block%201%2B1/A%20Blok%201%2B1%201-G0mes18sTWOZ2cWwd6FM2eYbgfGL3y.jpg",
      location: "Kyrenia, North Cyprus",
    },
    {
      id: "natalux",
      name: "Natalux",
      description: "Modern apartments in the heart of the city",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/3-%20A%20Block%202%2B1/A%20Blok%202%2B1%201-32NbplBa3pvC5dJqzWeUHJjRLVo6LO.jpg",
      location: "Famagusta, North Cyprus",
    },
    {
      id: "la-isla",
      name: "La Isla",
      description: "Beachfront residences with exclusive amenities",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/6-%20B-C-D%202%2B1/B-C-D%202%2B1%201-pSGOjrRyvS0wWb9aPMmoGMGsQmskUP.jpg",
      location: "Bafra, North Cyprus",
    },
    {
      id: "panorama",
      name: "Panorama",
      description: "Elevated living with 360° mountain and sea views",
      image:
        "https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Residencies/7-%20B-C-D%203%2B1/B-C-D%203%2B1%201-8wK1VD3e6L1ZKnGmxYPvCUIbOzPMym.jpg",
      location: "Iskele, North Cyprus",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a]">
      {/* Custom header with dark logo in top-left */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="container mx-auto">
          <div className="w-40 md:w-48">
            <img
              src="https://hctq5la9sjbfp4dk.public.blob.vercel-storage.com/Dark_logo-JYIL3AdIqeQgQe7UEUSUsl3ZMvuj1Y.png"
              alt="Querencia Hotel & Residence"
              className="w-full"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md fade-in">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            {/* Dark Logo */}

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#c9a77c]/20 text-[#c9a77c]">
              <CheckCircle className="h-10 w-10" />
            </div>

            <h1 className="mb-3 text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl">Thank You</h1>

            <p className="mb-6 text-lg text-[#666]">
              Your message has been successfully submitted. Our team will get back to you shortly.
            </p>

            <div className="w-16 border-t border-[#ddd]"></div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-[#f8f8f8] p-6 fade-in-delay-1">
              <h2 className="mb-3 text-xl font-light text-[#1a1a1a]">What happens next?</h2>
              <ul className="space-y-3 text-[#666]">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></span>
                  <span>A member of our team will review your inquiry</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></span>
                  <span>We'll contact you within 24-48 hours via your provided contact information</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a77c]"></span>
                  <span>If you requested a catalog, you can download it using the button below</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-lg border border-[#ddd] p-6 fade-in-delay-2">
              <h2 className="mb-3 text-xl font-light text-[#1a1a1a]">Need immediate assistance?</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#666]">Call Us</p>
                    <a href="tel:+905488370015" className="text-base text-[#2c4051] hover:text-[#c9a77c]">
                      +90 548 837 0015
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#666]">Email Us</p>
                    <a
                      href="mailto:info@dovecconstruction.com"
                      className="text-base text-[#2c4051] hover:text-[#c9a77c]"
                    >
                      info@dovecconstruction.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between fade-in-delay-3">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Homepage
                </Link>
              </Button>

              <Button
                className="flex items-center gap-2 bg-[#c9a77c] hover:bg-[#b89669]"
                onClick={handleCatalogDownload}
              >
                <Download className="h-4 w-4" />
                Download Catalog
              </Button>
            </div>
          </div>
        </div>

        {/* Project Cards Section */}
        <div className="mx-auto mt-16 max-w-5xl fade-in-delay-3">
          <h2 className="mb-8 text-center text-2xl font-light tracking-wider text-[#1a1a1a]">
            Explore More Dovec Group Projects
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={`https://dovecgroup.com/projects/${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg`}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-medium text-[#2c4051] group-hover:text-[#c9a77c]">{project.name}</h3>
                  <p className="mb-2 text-sm text-[#666]">{project.description}</p>
                  <div className="flex items-center text-xs text-[#999]">
                    <span>{project.location}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Dovec Group Website Button */}
          <div className="mt-12 flex justify-center">
            <Button
              size="lg"
              className="bg-[#2c4051] text-white hover:bg-[#3a526a] transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a
                href="https://dovecgroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Visit Dovec Group Website
              </a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center fade-in-delay-3">
          <h2 className="mb-6 text-2xl font-light tracking-wider text-[#1a1a1a]">Explore More of Querencia</h2>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="bg-white">
              <Link href="/#residences">View Residences</Link>
            </Button>

            <Button asChild variant="outline" className="bg-white">
              <Link href="/#gallery">Explore Gallery</Link>
            </Button>

            <Button asChild variant="outline" className="bg-white">
              <Link href="/#virtual-tour">Virtual Tour</Link>
            </Button>

            <Button asChild className="bg-[#2c4051] hover:bg-[#3a526a]">
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
  )
}
