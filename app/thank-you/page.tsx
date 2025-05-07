"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, ArrowLeft, Download, Phone, Mail } from "lucide-react"
import Link from "next/link"
import "./thank-you.css"

export default function ThankYouPage() {
  // Integrated catalog download functionality directly
  const handleCatalogDownload = () => {
    const catalogUrl = "https://sites.google.com/u/0/d/1PzQEUZsWPXnQcYaQlyJBHIElD5tv0kpS/preview"
    window.open(catalogUrl, "_blank")
  }

  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#1a1a1a]">
      <Navbar />

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md fade-in">
          <div className="mb-8 flex flex-col items-center justify-center text-center">
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
