"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

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
              <form className="space-y-5 md:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#333]">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="border-[#ddd] bg-white focus-visible:ring-[#c9a77c]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#333]">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="border-[#ddd] bg-white focus-visible:ring-[#c9a77c]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-[#333]">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter your phone number"
                    className="border-[#ddd] bg-white focus-visible:ring-[#c9a77c]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#333]">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your interest in Querencia"
                    className="min-h-[120px] border-[#ddd] bg-white focus-visible:ring-[#c9a77c]"
                  />
                </div>

                <Button type="submit" className="w-full bg-[#0a1a2a] text-white hover:bg-[#132639]">
                  Request Information
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
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a1a2a]/10 text-[#0a1a2a]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Call Us</p>
                      <a href="tel:+905488370015" className="text-lg text-[#1a1a1a] hover:text-[#c9a77c]">
                        +90 548 837 0015
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a1a2a]/10 text-[#0a1a2a]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Email Us</p>
                      <a
                        href="mailto:info@dovecconstruction.com"
                        className="text-lg text-[#1a1a1a] hover:text-[#c9a77c]"
                      >
                        info@dovecconstruction.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a1a2a]/10 text-[#0a1a2a]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">Visit Us</p>
                      <p className="text-lg text-[#1a1a1a]">Döveç Head Quarters</p>
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
