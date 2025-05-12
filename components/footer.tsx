"use client"

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import { X } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

// Social media links
const SOCIAL_LINKS = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/DovecConstruction" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/dovec_group" },
  { name: "X", icon: X, href: "https://x.com/Dovec_Group" },
  { name: "Youtube", icon: Youtube, href: "https://www.youtube.com/channel/UC8fZUDwu15NR7JTrWu-ihoA" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/18814152" },
]

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#ddd] bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-[#666]">
            © {currentYear} Dovec Group | Querencia. {t("footer.allRightsReserved")}
          </p>

          <div className="flex space-x-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#0a1a2a] hover:text-white"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
