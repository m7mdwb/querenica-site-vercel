"use client"

import type React from "react" // Not strictly necessary for this component's current usage
import { useState, useEffect } from "react" // useEffect for pre-filling catalog request
import { useInView } from "react-intersection-observer"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils" // Assuming this path is correct
import { Button } from "@/components/ui/button" // Assuming this path
import { Input } from "@/components/ui/input" // Assuming this path
import { Textarea } from "@/components/ui/textarea" // Assuming this path
import { Label } from "@/components/ui/label" // Assuming this path
import { Checkbox } from "@/components/ui/checkbox" // Assuming this path
import { Mail, Phone, MapPin } from "lucide-react"
// LoadingScreen import is removed as it's no longer used directly by this component to show on submit

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
    requestCatalog: true, // Default to true
  })
  const [isSubmitting, setIsSubmitting] = useState(false); // For button "Sending..." state

  // Effect to check localStorage for pre-filling catalog request
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if catalog was requested from another part of the site (e.g., residences section)
      const requestedFromOtherSection = window.localStorage.getItem("requestCatalogFromResidences") === "true";
      if (requestedFromOtherSection) {
        setFormState(prev => ({ ...prev, requestCatalog: true }));
        // It's good practice to remove the flag after using it to prevent it from always being true
        // on subsequent visits to the contact form if the user unchecks it.
        window.localStorage.removeItem("requestCatalogFromResidences");
      }
    }
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    if (typeof checked === 'boolean') {
      setFormState((prev) => ({ ...prev, requestCatalog: checked }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // ---
    // TODO: Add your ACTUAL form submission logic here (e.g., API call)
    // For example:
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formState), // Send relevant form data
    //   });
    //   if (!response.ok) {
    //     throw new Error('Form submission failed');
    //   }
    //   // Form submitted successfully to your backend
    // } catch (error) {
    //   console.error("Submission error:", error);
    //   setIsSubmitting(false); // Re-enable button on error
    //   // Optionally show an error message to the user here
    //   return; // Stop further processing if submission fails
    // }
    // ---

    // If catalog was requested, store in localStorage for the thank you page to potentially use
    if (formState.requestCatalog) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("catalogRequestedOnSubmit", "true")
      }
    }

    // Set a flag for ThankYouPage to show its own loading screen if desired
    if (typeof window !== "undefined") {
      sessionStorage.setItem("showThankYouPageLoading", "true");
    }

    // Redirect to thank you page immediately after setting flags (and after actual submission)
    router.push("/thank-you")

    // No need to set isSubmitting back to false here if we are navigating away.
    // If there was an error in submission, it should be set to false above.
  }

  // No longer conditionally rendering LoadingScreen here
  // if (showLoadingScreen) {
  //   return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  // }

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
                "transition-all duration-1000", // Entrance animation for the form
                inView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
              )}
            >
              <form
                id="contact-form"
                className="space-y-5 rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 md:p-8 md:space-y-6 hover:shadow-xl"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#333]">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="border-slate-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#333]">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="border-slate-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-[#333]">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="border-slate-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-[#333]">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your interest in Querencia"
                    className="min-h-[120px] border-slate-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-1"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2.5 pt-2">
                  <Checkbox
                    id="requestCatalog"
                    checked={formState.requestCatalog}
                    onCheckedChange={handleCheckboxChange}
                    className="data-[state=checked]:bg-[#c9a77c] data-[state=checked]:border-[#c9a77c] border-slate-400 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-1"
                  />
                  <label
                    htmlFor="requestCatalog"
                    className="cursor-pointer text-sm font-medium leading-none text-[#333] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send me the Querencia catalog
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2c4051] text-white py-3 text-base hover:bg-[#3a526a] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Request Information"}
                </Button>
              </form>
            </div>

            <div
              className={cn(
                "flex flex-col justify-center transition-all delay-200 duration-1000 md:delay-300", // Entrance animation for contact info
                inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
              )}
            >
              <div className="rounded-lg bg-white p-6 shadow-lg sm:p-8">
                <h3 className="mb-5 text-xl font-semibold text-[#1a1a1a] sm:mb-6 sm:text-2xl">
                  Sales and Customer Service
                </h3>
                <div className="space-y-5 sm:space-y-6">
                  {/* Contact Details - Phone */}
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Call Us</p>
                      <a href="tel:+905488370015" className="text-base text-[#2c4051] hover:text-[#c9a77c] transition-colors duration-300 md:text-lg">
                        +90 548 837 0015
                      </a>
                    </div>
                  </div>
                  {/* Contact Details - Email */}
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Email Us</p>
                      <a href="mailto:info@dovecgroup.com" className="text-base text-[#2c4051] hover:text-[#c9a77c] transition-colors duration-300 md:text-lg break-all">
                        info@dovecgroup.com
                      </a>
                    </div>
                  </div>
                  {/* Contact Details - Address */}
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Visit Us</p>
                      <p className="text-base font-medium text-[#2c4051] md:text-lg">Döveç Head Quarters</p>
                      <p className="text-sm text-[#555]">Uluçam Road, No.2, Sakarya, Famagusta, TRNC</p>
                    </div>
                  </div>
                  {/* Availability Note */}
                  <div className="mt-6 rounded-md bg-slate-50 p-4">
                    <p className="text-center text-xs text-[#555] md:text-sm">
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
