"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, PhoneIcon, MapPin } from "lucide-react" // Renamed Phone to PhoneIcon
import { PhoneInput } from "react-international-phone"
import "react-international-phone/style.css"
import { useLanguage } from "@/lib/i18n/context" // Your i18n hook

export default function ContactSection() {
  const router = useRouter()
  const { t } = useLanguage() // Initialize your translation function
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "+90", // Default to Turkey, or use a translated default from your i18n if needed
    message: "",
    requestCatalog: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const requestedFromOtherSection = window.localStorage.getItem("requestCatalogFromResidences") === "true"
      if (requestedFromOtherSection) {
        setFormState((prev) => ({ ...prev, requestCatalog: true }))
        window.localStorage.removeItem("requestCatalogFromResidences")
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormState((prev) => ({ ...prev, [id]: value }))
  }

  const handlePhoneChange = (phone: string) => {
    setFormState((prev) => ({ ...prev, phone }))
  }

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    if (typeof checked === "boolean") {
      setFormState((prev) => ({ ...prev, requestCatalog: checked }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Phone number is already in formState.phone (E.164 format from PhoneInput)
    console.log("Submitting Data:", {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      message: formState.message,
      requestCatalog: formState.requestCatalog,
    })

    // TODO: Add your ACTUAL form submission logic here (e.g., API call)

    if (formState.requestCatalog) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("catalogRequestedOnSubmit", "true")
      }
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("showThankYouPageLoading", "true")
    }
    router.push("/thank-you")
  }

  return (
    <section ref={ref} id="contact" className="bg-[#f8f8f8] py-20 md:py-32 scroll-mt-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-light tracking-wider text-[#1a1a1a] sm:text-4xl md:mb-16 md:text-5xl">
          {t("contact.title")}
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
                className="space-y-5 rounded-lg bg-white p-6 shadow-lg transition-shadow duration-300 md:p-8 md:space-y-6 hover:shadow-xl"
                onSubmit={handleSubmit}
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-[#333]">
                    {t("contact.form.fullName")}
                  </Label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.fullNamePlaceholder")}
                    className="border-slate-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#333]">
                    {t("contact.form.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className="border-slate-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-[#333]">
                    {t("contact.form.phone")}
                  </Label>
                  <div className="phone-input-container">
                    <PhoneInput
                      defaultCountry="tr"
                      value={formState.phone}
                      onChange={handlePhoneChange}
                      inputClassName="!w-full !h-10 !border-slate-300 !rounded-md !px-3 !py-2 !text-base focus:!ring-2 focus:!ring-[#c9a77c] focus:!ring-offset-1 focus:!border-[#c9a77c] focus:!outline-none"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">{t("contact.form.phoneExampleIntl")}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-[#333]">
                    {t("contact.form.message")}
                  </Label>
                  <Textarea
                    id="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.messagePlaceholder")}
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
                    {t("contact.form.requestCatalog")}
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2c4051] text-white py-3 text-base hover:bg-[#3a526a] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#c9a77c] focus-visible:ring-offset-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.submitButton")}
                </Button>
              </form>
            </div>

            <div
              className={cn(
                "flex flex-col justify-center transition-all delay-200 duration-1000 md:delay-300",
                inView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
              )}
            >
              <div className="rounded-lg bg-white p-6 shadow-lg sm:p-8">
                <h3 className="mb-5 text-xl font-semibold text-[#1a1a1a] sm:mb-6 sm:text-2xl">
                  {t("contact.contactDetails.title")}
                </h3>
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                      <PhoneIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">{t("contact.contactDetails.callUs")}</p>
                      <a
                        href="tel:+905488370015"
                        className="text-base text-[#2c4051] hover:text-[#c9a77c] transition-colors duration-300 md:text-lg"
                      >
                        +90 548 837 0015
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">{t("contact.contactDetails.emailUs")}</p>
                      <a
                        href="mailto:info@dovecgroup.com"
                        className="text-base text-[#2c4051] hover:text-[#c9a77c] transition-colors duration-300 md:text-lg break-all"
                      >
                        info@dovecgroup.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#c9a77c]/10 text-[#c9a77c]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-[#666]">{t("contact.contactDetails.visitUs")}</p>
                      <p className="text-base font-medium text-[#2c4051] md:text-lg">
                        {t("contact.contactDetails.headquarters")}
                      </p>
                      <a
                        href="https://maps.app.goo.gl/Vq7xfep4b49RTescA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#555] hover:text-[#c9a77c] hover:underline transition-colors duration-300"
                      >
                        Uluçam Road, No.2, Sakarya, Famagusta, TRNC
                      </a>
                    </div>
                  </div>
                  <div className="mt-6 rounded-md bg-slate-50 p-4">
                    <p className="text-center text-xs text-[#555] md:text-sm whitespace-pre-line">
                      {t("contact.contactDetails.availability")}
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
