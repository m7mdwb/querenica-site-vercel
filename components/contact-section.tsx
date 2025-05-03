"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    requestCatalog: true,
    submitted: false,
    loading: false,
  })

  // Check if user came from a catalog request
  useEffect(() => {
    const catalogRequested = window.localStorage.getItem("requestCatalog")
    if (catalogRequested === "true") {
      // Focus on the form and scroll to it
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }

      // Highlight the form with a subtle animation
      const formElement = document.getElementById("contact-form")
      if (formElement) {
        formElement.classList.add("highlight-form")
        setTimeout(() => {
          formElement.classList.remove("highlight-form")
        }, 2000)
      }

      // Clear the flag
      window.localStorage.removeItem("requestCatalog")
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormState((prev) => ({ ...prev, requestCatalog: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState((prev) => ({ ...prev, loading: true }))

    // Simulate form submission
    setTimeout(() => {
      setFormState((prev) => ({ ...prev, submitted: true, loading: false }))

      // If catalog was requested, trigger download
      if (formState.requestCatalog) {
        downloadCatalog()
      }
    }, 1500)
  }

  const downloadCatalog = () => {
    // Create a link to download the catalog
    const link = document.createElement("a")
    link.href = "https://sites.google.com/u/0/d/1PzQEUZsWPXnQcYaQlyJBHIElD5tv0kpS/preview"
    link.target = "_blank"
    link.download = "Querencia-Catalog.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section ref={ref} id="contact" className="bg-[#f8f8f8] py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:mb-16 md:text-5xl">
          Inquire Within
        </h2>

        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            <div
              className={cn(
                "transition-all duration-1000",
                inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
              )}
            >
              {formState.submitted ? (
                <div className="rounded-lg bg-white p-8 text-center shadow-md">
                  <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-medium text-[#1a1a1a]">Thank You!</h3>
                  <p className="mb-6 text-[#666]">Your inquiry has been received. Our team will contact you shortly.</p>
                  {formState.requestCatalog && (
                    <div className="rounded-lg bg-[#f8f8f8] p-4">
                      <p className="mb-3 text-sm text-[#666]">
                        Your catalog download should begin automatically. If it doesn't, click the button below:
                      </p>
                      <Button onClick={downloadCatalog} variant="outline" className="flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download Catalog
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <form
                  id="contact-form"
                  className="space-y-5 rounded-lg bg-white p-6 shadow-md transition-all duration-300 md:p-8 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1a1a1a]">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="border-[#ddd] focus-visible:ring-[#c9a77c]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1a1a1a]">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="border-[#ddd] focus-visible:ring-[#c9a77c]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#1a1a1a]">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      className="border-[#ddd] focus-visible:ring-[#c9a77c]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#1a1a1a]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your interest in Querencia"
                      className="min-h-[120px] border-[#ddd] focus-visible:ring-[#c9a77c]"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="requestCatalog"
                      checked={formState.requestCatalog}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="requestCatalog"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1a1a]"
                    >
                      Send me the Querencia catalog
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#2c4051] text-white hover:bg-[#3a526a]"
                    disabled={formState.loading}
                  >
                    {formState.loading ? "Sending..." : "Request Information"}
                  </Button>
                </form>
              )}
            </div>

            <div
              className={cn(
                "flex flex-col justify-center transition-all delay-300 duration-1000",
                inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
              )}
            >
              <div className="rounded-lg bg-white p-6 shadow-md sm:p-8">
                <h3 className="mb-5 text-xl font-light text-[#1a1a1a] sm:mb-6 sm:text-2xl">
                  Sales and Customer Service
                </h3>

                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Call Us</p>
                      <a href="tel:+905488370015" className="text-lg text-[#2c4051] hover:text-[#c9a77c]">
                        +90 548 837 0015
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Email Us</p>
                      <a
                        href="mailto:info@dovecconstruction.com"
                        className="text-lg text-[#2c4051] hover:text-[#c9a77c]"
                      >
                        info@dovecconstruction.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2c4051]/5 text-[#2c4051]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Visit Us</p>
                      <p className="text-lg text-[#2c4051]">Döveç Head Quarters</p>
                      <p className="text-sm text-[#666]">Uluçam Road, No.2, Sakarya, Famagusta, TRNC</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg bg-[#f8f8f8] p-4">
                    <p className="text-center text-sm text-[#666]">
                      Our sales team is available Monday to Saturday, 9am to 6pm.
                      <br />
                      Private viewings available by appointment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
