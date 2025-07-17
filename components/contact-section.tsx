"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Send, Star } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { countryCodes } from "@/lib/country-codes"

export default function ContactSection() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountryCode, setSelectedCountryCode] = useState("+90")
  const [formStatus, setFormStatus] = useState<null | "success" | "error" | "loading">(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const section = document.getElementById("contact")
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (e) => {
    const input = e.target.value
    setPhoneNumber(input)

    // Auto-detect country code
    let detectedCode = selectedCountryCode
    for (const country of countryCodes) {
      if (input.startsWith(country.code)) {
        detectedCode = country.code
        break
      }
    }
    setSelectedCountryCode(detectedCode)
  }

  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus("loading")

    try {
      const fullPhoneNumber = `${selectedCountryCode}${phoneNumber}`

      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: fullPhoneNumber,
        message: formData.message,
        language: language,
        submittedAt: new Date().toISOString(),
      }

      // Send to webhook
      const response = await fetch("/api/webhook/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setFormStatus("success")
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        })
        setPhoneNumber("")
        setSelectedCountryCode("+90")

        // Redirect to thank you page after a short delay
        setTimeout(() => {
          window.location.href = "/thank-you"
        }, 1500)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus("error")

      // Reset error status after 5 seconds
      setTimeout(() => {
        setFormStatus(null)
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-alabaster to-parchment relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-secondary text-sm uppercase tracking-[0.4em] font-light mb-4 block">
            {t("contact.connectWithUs")}
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-primary mb-6 tracking-tight">
            {t("contact.inquireWithin").split(" ")[0]}
            <span className="block font-serif italic text-secondary" style={{ fontFamily: "var(--font-bodoni)" }}>
              {t("contact.inquireWithin").split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className="text-lg text-slate-grey max-w-3xl mx-auto leading-relaxed">{t("contact.introText")}</p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-secondary to-accent mx-auto mt-8"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div
              className={`bg-parchment/95 backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {formStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-green-600" />
                    {t("contact.successMessage")}
                  </div>
                </div>
              )}

              {formStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                  {t("contact.errorMessage")}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                    {t("contact.fullName")} <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus === "loading"}
                    placeholder={t("contact.fullName")}
                    className="w-full px-4 py-3 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 bg-alabaster/80 backdrop-blur-sm disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    {t("contact.emailAddress")} <span className="text-secondary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus === "loading"}
                    placeholder={t("contact.emailAddress")}
                    className="w-full px-4 py-3 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 bg-alabaster/80 backdrop-blur-sm disabled:opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                    {t("contact.phoneNumber")} <span className="text-secondary">*</span>
                  </label>
                  <div className="flex">
                    <select
                      id="country-code"
                      name="countryCode"
                      value={selectedCountryCode}
                      onChange={handleCountryCodeChange}
                      disabled={formStatus === "loading"}
                      className="flex-shrink-0 px-4 py-3 border border-r-0 border-secondary/30 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 bg-alabaster/80 backdrop-blur-sm text-primary disabled:opacity-50"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      required
                      disabled={formStatus === "loading"}
                      placeholder={t("contact.phoneNumber")}
                      className="flex-1 px-4 py-3 border border-secondary/30 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 bg-alabaster/80 backdrop-blur-sm disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    disabled={formStatus === "loading"}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full px-4 py-3 border border-secondary/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all duration-300 resize-none bg-alabaster/80 backdrop-blur-sm disabled:opacity-50"
                  ></textarea>
                </div>

                <div className="text-sm text-slate-grey italic mb-6 p-4 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl border border-secondary/20">
                  <Star className="w-4 h-4 inline mr-2 text-secondary" />
                  {t("contact.formNote")}
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="group w-full bg-gradient-to-r from-secondary to-accent text-white py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 hover:scale-105 flex items-center justify-center font-medium relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Send size={18} className="mr-2 relative z-10" />
                  <span className="relative z-10">
                    {formStatus === "loading" ? "Sending..." : t("contact.requestInformation")}
                  </span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div
              className={`bg-parchment/95 backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-secondary/20 transition-all duration-700 flex flex-col ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-light text-primary">{t("contact.contactDetails")}</h3>
                  <div className="flex space-x-1.5">
                    <a
                      href="https://www.facebook.com/DovecConstruction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center text-secondary hover:bg-gradient-to-br hover:from-secondary hover:to-accent hover:text-white transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/dovec_group"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center text-secondary hover:bg-gradient-to-br hover:from-secondary hover:to-accent hover:text-white transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href="https://x.com/Dovec_Group"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center text-secondary hover:bg-gradient-to-br hover:from-secondary hover:to-accent hover:text-white transition-all duration-300"
                      aria-label="Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="space-y-4 flex-grow">
                  {/* Phone Card */}
                  <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl border border-secondary/20 p-4 flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 mr-4">
                      <Phone className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-grey mb-0.5">{t("contact.callUs")}</p>
                      <a
                        href="tel:+905488370015"
                        className="text-lg text-primary hover:text-secondary transition-colors duration-300 font-medium"
                      >
                        +90 548 837 0015
                      </a>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl border border-secondary/20 p-4 flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 mr-4">
                      <Mail className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-grey mb-0.5">{t("contact.emailUs")}</p>
                      <a
                        href="mailto:info@dovecgroup.com"
                        className="text-lg text-primary hover:text-secondary transition-colors duration-300 font-medium"
                      >
                        info@dovecgroup.com
                      </a>
                    </div>
                  </div>

                  {/* Address Card */}
                  <div className="bg-gradient-to-r from-secondary/5 to-accent/5 rounded-xl border border-secondary/20 p-4 flex items-center">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 mr-4">
                      <MapPin className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-grey mb-0.5">{t("contact.visitUs")}</p>
                      <p className="text-primary font-medium mb-0.5">{t("contact.headquarters")}</p>
                      <p className="text-slate-grey text-sm">{t("contact.address")}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-primary/10 p-4 flex items-center mt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mr-3">
                    <Star className="text-secondary" size={16} />
                  </div>
                  <div>
                    <p className="text-primary font-medium text-sm">{t("contact.premiumServiceTitle")}</p>
                    <p className="text-slate-grey text-xs">{t("contact.premiumServiceDesc")}</p>
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
