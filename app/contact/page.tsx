import Link from "next/link"
import { Playfair_Display } from "next/font/google"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail } from "lucide-react"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <header className="mb-16 text-center">
          <Link href="/" className="inline-block mb-8">
            <h1 className={`${playfair.className} text-3xl font-light tracking-wider`}>Querencia</h1>
          </Link>
          <h2 className="text-2xl md:text-4xl font-light mb-4">Contact Us</h2>
          <div className="w-16 h-px bg-amber-300 mx-auto"></div>
        </header>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xl mb-6 font-light">Get in Touch</h3>
            <p className="text-slate-300 mb-8">
              We invite you to connect with us to learn more about Querencia. Our dedicated team is ready to assist you
              with any inquiries and provide personalized information about our residences and services.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin className="text-amber-300 mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-slate-300">123 Luxury Avenue, Platinum District</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-amber-300 mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-slate-300">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-amber-300 mr-4 mt-1" size={20} />
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-slate-300">info@courtyardplatinum.com</p>
                </div>
              </div>
            </div>

            <div className="border border-slate-800 p-6">
              <h4 className="text-amber-300 mb-4">Viewing Appointments</h4>
              <p className="text-slate-300 mb-4">
                Experience Querencia in person. Schedule a private viewing with our concierge team.
              </p>
              <Button
                variant="outline"
                className="border-amber-300 text-amber-300 hover:bg-amber-300/10 bg-transparent"
              >
                Book an Appointment
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-xl mb-6 font-light">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm">
                    Name
                  </label>
                  <Input
                    id="name"
                    className="bg-slate-800 border-slate-700 focus:border-amber-300/50"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-slate-800 border-slate-700 focus:border-amber-300/50"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm">
                  Subject
                </label>
                <Input
                  id="subject"
                  className="bg-slate-800 border-slate-700 focus:border-amber-300/50"
                  placeholder="Subject"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm">
                  Message
                </label>
                <Textarea
                  id="message"
                  className="bg-slate-800 border-slate-700 focus:border-amber-300/50 min-h-[150px]"
                  placeholder="Your message"
                />
              </div>

              <Button className="bg-amber-300 text-slate-900 hover:bg-amber-400">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
