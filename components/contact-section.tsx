"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const router = useRouter()
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
    loading: false,
  })

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

    // If catalog was requested, store in localStorage for the thank you page
    if (formState.requestCatalog) {
      window.localStorage.setItem("requestCatalog", "true")
    }

    // Redirect to thank you page
    router.push("/thank-you")
  }

  return (
    <section ref={ref} id="contact" className="bg-[#f8f8f8] py-20 md:py-32 scroll-mt-20">
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
                      <a href="mailto:info@dovecgroup.com" className="text-lg text-[#2c4051] hover:text-[#c9a77c]">
                        info@dovecgroup.com
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
                      Our sales team is available 24/7.
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
