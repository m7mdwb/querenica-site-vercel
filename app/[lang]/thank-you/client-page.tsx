"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/context"
import { thankYouTranslations } from "@/lib/i18n/thank-you-translations"

const ThankYouPage = () => {
  const router = useRouter()
  const { language } = useLanguage()
  const t = thankYouTranslations[language] || thankYouTranslations.en

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full mx-auto text-center">
        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="mx-auto mb-6 bg-[#c9a77c] rounded-full p-3 w-16 h-16 flex items-center justify-center"
        >
          <Check className="text-white w-8 h-8" />
        </motion.div>

        {/* Thank you message */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 text-gray-800"
        >
          {t.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg mb-8 text-gray-600"
        >
          {t.message}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="w-16 h-1 bg-[#c9a77c] mx-auto mb-8"
        ></motion.div>

        {/* Return button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Button
            onClick={() => router.push(`/${language}`)}
            variant="outline"
            className="group border-[#c9a77c] text-[#c9a77c] hover:bg-[#c9a77c] hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t.returnButton}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default ThankYouPage
