"use client"

import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react"

interface FooterProps {
  dict: Record<string, string>
  locale: string
}

const SOCIAL_LINKS = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/DovecConstruction" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/dovec_group" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/Dovec_Group" },
  { name: "Youtube", icon: Youtube, href: "https://www.youtube.com/@DovecGroup" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/18814152" },
]

export default function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white py-6 border-t border-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-4 gap-y-2 text-sm">
            <span className="text-parchment/80 font-inter">
              {dict["footer.copyright"]?.replace("{currentYear}", currentYear.toString())}
            </span>
            <span className="hidden md:inline text-slate-grey">|</span>
            <span className="text-parchment/70 font-inter">{dict["footer.developedBy"]}</span>
          </div>

          <div className="flex items-center space-x-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-parchment/80 transition-all duration-300 hover:bg-secondary hover:text-white"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-3 w-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
