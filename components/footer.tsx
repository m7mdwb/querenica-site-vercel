import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#ddd] bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-[#666]">© {currentYear} Dovec Group | Querencia. All rights reserved.</p>

          <div className="flex space-x-4">
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#0a1a2a] hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#0a1a2a] hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#0a1a2a] hover:text-white"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] text-[#666] transition-colors hover:bg-[#0a1a2a] hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
