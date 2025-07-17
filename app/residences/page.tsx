import Link from "next/link"
import Image from "next/image"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

export default function Residences() {
  const residences = [
    {
      id: "platinum-suite",
      name: "Platinum Suite",
      description: "Our signature suite offering panoramic views and unparalleled luxury.",
      size: "120-150 m²",
      features: ["Private balcony", "Marble bathroom", "Custom furnishings", "Smart home technology"],
    },
    {
      id: "executive-residence",
      name: "Executive Residence",
      description: "Spacious living with dedicated areas for entertaining and relaxation.",
      size: "180-220 m²",
      features: ["Gourmet kitchen", "Home office", "Walk-in closets", "Entertainment system"],
    },
    {
      id: "penthouse-collection",
      name: "Penthouse Collection",
      description: "The ultimate expression of luxury living with exclusive amenities.",
      size: "250-350 m²",
      features: ["Private roof terrace", "Wine cellar", "Personal concierge", "Spa bathroom"],
    },
  ]

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <header className="mb-16 text-center">
          <Link href="/" className="inline-block mb-8">
            <h1 className={`${playfair.className} text-3xl font-light tracking-wider`}>Querencia</h1>
          </Link>
          <h2 className="text-2xl md:text-4xl font-light mb-4">Our Residences</h2>
          <div className="w-16 h-px bg-amber-300 mx-auto"></div>
        </header>

        <div className="max-w-6xl mx-auto">
          <p className="text-center text-lg mb-16 max-w-3xl mx-auto">
            Each Querencia residence is a masterpiece of design, offering spacious layouts, premium finishes, and
            thoughtful amenities that cater to a sophisticated lifestyle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {residences.map((residence) => (
              <div
                key={residence.id}
                className="border border-slate-800 hover:border-amber-300/50 transition-colors group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={`/luxury-still-life.png?height=400&width=600&query=luxury ${residence.name} interior`}
                    alt={`Querencia at night`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className={`${playfair.className} text-2xl mb-2`}>{residence.name}</h3>
                  <p className="text-amber-300 text-sm mb-4">{residence.size}</p>
                  <p className="text-slate-300 mb-6">{residence.description}</p>
                  <ul className="text-sm text-slate-400 space-y-2 mb-8">
                    {residence.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-amber-300 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/residences/${residence.id}`}
                    className="text-amber-300 text-sm uppercase tracking-wider hover:text-amber-200 transition-colors"
                  >
                    Explore Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
