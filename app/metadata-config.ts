import type { Metadata } from "next"

// Language-specific SEO data
export const languageSEO = {
  en: {
    title: "Querencia Hotel & Residence | Luxury Living in North Cyprus",
    description:
      "Experience luxury living at Querencia Hotel & Residence in North Cyprus with panoramic sea views, premium amenities, and exclusive residences starting from £145,000.",
    keywords: [
      "luxury residence North Cyprus",
      "sea view apartments Cyprus",
      "Querencia Cyprus",
      "luxury hotel Trikomo",
      "North Cyprus property investment",
      "Mediterranean luxury homes",
      "beachfront property Cyprus",
      "exclusive residences Cyprus",
    ],
    locale: "en_US",
    ogLocale: "en_US",
    ogSiteName: "Querencia Hotel & Residence",
    twitterSite: "@Dovec_Group",
    twitterCreator: "@Dovec_Group",
  },
  tr: {
    title: "Querencia Hotel & Residence | Kuzey Kıbrıs'ta Lüks Yaşam",
    description:
      "Kuzey Kıbrıs'taki Querencia Hotel & Residence'ta panoramik deniz manzarası, premium olanaklar ve £145,000'dan başlayan fiyatlarla özel rezidanslarda lüks yaşamı deneyimleyin.",
    keywords: [
      "Kuzey Kıbrıs lüks konut",
      "deniz manzaralı daireler Kıbrıs",
      "Querencia Kıbrıs",
      "lüks otel Trikomo",
      "Kuzey Kıbrıs gayrimenkul yatırımı",
      "Akdeniz lüks evleri",
      "deniz kenarı mülk Kıbrıs",
      "özel rezidanslar Kıbrıs",
    ],
    locale: "tr_TR",
    ogLocale: "tr_TR",
    ogSiteName: "Querencia Hotel & Residence",
    twitterSite: "@Dovec_Group",
    twitterCreator: "@Dovec_Group",
  },
  de: {
    title: "Querencia Hotel & Residence | Luxuriöses Wohnen in Nordzypern",
    description:
      "Erleben Sie luxuriöses Wohnen im Querencia Hotel & Residence in Nordzypern mit Panorama-Meerblick, erstklassigen Annehmlichkeiten und exklusiven Residenzen ab £145.000.",
    keywords: [
      "Luxusresidenz Nordzypern",
      "Apartments mit Meerblick Zypern",
      "Querencia Zypern",
      "Luxushotel Trikomo",
      "Nordzypern Immobilieninvestition",
      "Mittelmeer Luxusimmobilien",
      "Strandimmobilien Zypern",
      "exklusive Residenzen Zypern",
    ],
    locale: "de_DE",
    ogLocale: "de_DE",
    ogSiteName: "Querencia Hotel & Residence",
    twitterSite: "@Dovec_Group",
    twitterCreator: "@Dovec_Group",
  },
  ru: {
    title: "Querencia Hotel & Residence | Роскошная жизнь на Северном Кипре",
    description:
      "Испытайте роскошную жизнь в Querencia Hotel & Residence на Северном Кипре с панорамным видом на море, первоклассными удобствами и эксклюзивными резиденциями от £145,000.",
    keywords: [
      "элитная резиденция Северный Кипр",
      "апартаменты с видом на море Кипр",
      "Querencia Кипр",
      "роскошный отель Трикомо",
      "инвестиции в недвижимость Северный Кипр",
      "роскошные дома Средиземноморье",
      "недвижимость на берегу моря Кипр",
      "эксклюзивные резиденции Кипр",
    ],
    locale: "ru_RU",
    ogLocale: "ru_RU",
    ogSiteName: "Querencia Hotel & Residence",
    twitterSite: "@Dovec_Group",
    twitterCreator: "@Dovec_Group",
  },
}

// Section-specific SEO data for all languages
export const sectionSEO = {
  about: {
    en: {
      title: "About Querencia | Luxury Living in North Cyprus",
      description:
        "Discover the story behind Querencia, a pinnacle of luxury living in North Cyprus where architectural brilliance meets uncompromising quality and excellence.",
      keywords: [
        "Querencia development",
        "luxury living North Cyprus",
        "premium residences Cyprus",
        "Dovec Group development",
      ],
    },
    tr: {
      title: "Querencia Hakkında | Kuzey Kıbrıs'ta Lüks Yaşam",
      description:
        "Mimari mükemmelliğin ödün vermeyen kalite ve mükemmellikle buluştuğu, Kuzey Kıbrıs'taki lüks yaşamın zirvesi Querencia'nın hikayesini keşfedin.",
      keywords: [
        "Querencia geliştirme",
        "Kuzey Kıbrıs lüks yaşam",
        "premium rezidanslar Kıbrıs",
        "Dovec Group geliştirme",
      ],
    },
    de: {
      title: "Über Querencia | Luxuriöses Wohnen in Nordzypern",
      description:
        "Entdecken Sie die Geschichte hinter Querencia, einem Höhepunkt des luxuriösen Wohnens in Nordzypern, wo architektonische Brillanz auf kompromisslose Qualität und Exzellenz trifft.",
      keywords: [
        "Querencia Entwicklung",
        "luxuriöses Wohnen Nordzypern",
        "Premium-Residenzen Zypern",
        "Dovec Group Entwicklung",
      ],
    },
    ru: {
      title: "О Querencia | Роскошная жизнь на Северном Кипре",
      description:
        "Откройте для себя историю Querencia, вершины роскошной жизни на Северном Кипре, где архитектурное великолепие сочетается с бескомпромиссным качеством и совершенством.",
      keywords: [
        "Разработка Querencia",
        "роскошная жизнь Северный Кипр",
        "премиальные резиденции Кипр",
        "разработка Dovec Group",
      ],
    },
  },
  location: {
    en: {
      title: "Location | Querencia North Cyprus",
      description:
        "Explore Querencia's strategic location in Trikomo, North Cyprus, offering easy access to pristine Mediterranean beaches, international airport, and urban amenities.",
      keywords: [
        "Querencia location",
        "Trikomo North Cyprus",
        "Mediterranean beachfront property",
        "strategic location Cyprus",
      ],
    },
    tr: {
      title: "Konum | Querencia Kuzey Kıbrıs",
      description:
        "Querencia'nın Kuzey Kıbrıs'ın Trikomo bölgesindeki stratejik konumunu keşfedin; berrak Akdeniz plajlarına, uluslararası havalimanına ve şehir olanaklarına kolay erişim sağlar.",
      keywords: ["Querencia konum", "Trikomo Kuzey Kıbrıs", "Akdeniz sahil mülkü", "stratejik konum Kıbrıs"],
    },
    de: {
      title: "Standort | Querencia Nordzypern",
      description:
        "Entdecken Sie Querencias strategische Lage in Trikomo, Nordzypern, die einfachen Zugang zu unberührten Mittelmeerstränden, dem internationalen Flughafen und städtischen Annehmlichkeiten bietet.",
      keywords: ["Querencia Standort", "Trikomo Nordzypern", "Mittelmeer Strandimmobilie", "strategische Lage Zypern"],
    },
    ru: {
      title: "Расположение | Querencia Северный Кипр",
      description:
        "Исследуйте стратегическое расположение Querencia в Трикомо, Северный Кипр, обеспечивающее легкий доступ к нетронутым пляжам Средиземного моря, международному аэропорту и городским удобствам.",
      keywords: [
        "Расположение Querencia",
        "Трикомо Северный Кипр",
        "Недвижимость на берегу Средиземного моря",
        "стратегическое расположение Кипр",
      ],
    },
  },
  residences: {
    en: {
      title: "Luxury Residences | Querencia North Cyprus",
      description:
        "Explore our 705 luxury apartments in North Cyprus, each offering 180° uninterrupted sea views, with exclusive penthouses featuring private pools and panoramic terraces.",
      keywords: [
        "luxury apartments Cyprus",
        "sea view residences",
        "penthouses North Cyprus",
        "private pool residences",
      ],
    },
    tr: {
      title: "Lüks Rezidanslar | Querencia Kuzey Kıbrıs",
      description:
        "Kuzey Kıbrıs'taki her biri 180° kesintisiz deniz manzarası sunan 705 lüks dairemizi keşfedin, özel havuzlu ve panoramik teraslı özel çatı katlarını keşfedin.",
      keywords: [
        "lüks daireler Kıbrıs",
        "deniz manzaralı rezidanslar",
        "çatı katları Kuzey Kıbrıs",
        "özel havuzlu rezidanslar",
      ],
    },
    de: {
      title: "Luxusresidenzen | Querencia Nordzypern",
      description:
        "Entdecken Sie unsere 705 Luxuswohnungen in Nordzypern, die jeweils einen 180° ungehinderten Meerblick bieten, mit exklusiven Penthäusern mit privaten Pools und Panoramaterrassen.",
      keywords: [
        "Luxuswohnungen Zypern",
        "Residenzen mit Meerblick",
        "Penthäuser Nordzypern",
        "Residenzen mit privatem Pool",
      ],
    },
    ru: {
      title: "Роскошные Резиденции | Querencia Северный Кипр",
      description:
        "Исследуйте наши 705 роскошных апартаментов на Северном Кипре, каждый из которых предлагает 180° беспрепятственный вид на море, с эксклюзивными пентхаусами с частными бассейнами и панорамными террасами.",
      keywords: [
        "роскошные апартаменты Кипр",
        "резиденции с видом на море",
        "пентхаусы Северный Кипр",
        "резиденции с частным бассейном",
      ],
    },
  },
  amenities: {
    en: {
      title: "Premium Amenities | Querencia North Cyprus",
      description:
        "Discover the premium amenities at Querencia including swimming pools, spa, restaurants, sports courts, and 24-hour security in a luxurious North Cyprus setting.",
      keywords: [
        "luxury amenities Cyprus",
        "swimming pools North Cyprus",
        "spa resort Cyprus",
        "premium facilities Trikomo",
      ],
    },
    tr: {
      title: "Premium Olanaklar | Querencia Kuzey Kıbrıs",
      description:
        "Querencia'daki yüzme havuzları, spa, restoranlar, spor sahaları ve 24 saat güvenlik dahil olmak üzere lüks Kuzey Kıbrıs ortamındaki premium olanakları keşfedin.",
      keywords: [
        "lüks olanaklar Kıbrıs",
        "yüzme havuzları Kuzey Kıbrıs",
        "spa resort Kıbrıs",
        "premium tesisler Trikomo",
      ],
    },
    de: {
      title: "Premium-Annehmlichkeiten | Querencia Nordzypern",
      description:
        "Entdecken Sie die erstklassigen Annehmlichkeiten in Querencia, darunter Schwimmbäder, Spa, Restaurants, Sportplätze und 24-Stunden-Sicherheit in einer luxuriösen Umgebung in Nordzypern.",
      keywords: [
        "Luxus-Annehmlichkeiten Zypern",
        "Schwimmbäder Nordzypern",
        "Spa-Resort Zypern",
        "Premium-Einrichtungen Trikomo",
      ],
    },
    ru: {
      title: "Премиальные Удобства | Querencia Северный Кипр",
      description:
        "Откройте для себя первоклассные удобства в Querencia, включая бассейны, спа, рестораны, спортивные площадки и круглосуточную охрану в роскошной обстановке Северного Кипра.",
      keywords: ["роскошные удобства Кипр", "бассейны Северный Кипр", "спа-курорт Кипр", "премиальные объекты Трикомо"],
    },
  },
  gallery: {
    en: {
      title: "Photo Gallery | Querencia North Cyprus",
      description:
        "Browse our gallery of stunning images showcasing Querencia luxury residences, amenities, and breathtaking Mediterranean views in North Cyprus.",
      keywords: [
        "Querencia photos",
        "North Cyprus luxury property images",
        "Mediterranean views gallery",
        "luxury residence pictures",
      ],
    },
    tr: {
      title: "Fotoğraf Galerisi | Querencia Kuzey Kıbrıs",
      description:
        "Kuzey Kıbrıs'taki Querencia lüks rezidansları, olanakları ve nefes kesen Akdeniz manzaralarını sergileyen muhteşem görüntüler galerimize göz atın.",
      keywords: [
        "Querencia fotoğrafları",
        "Kuzey Kıbrıs lüks mülk görüntüleri",
        "Akdeniz manzaraları galerisi",
        "lüks rezidans resimleri",
      ],
    },
    de: {
      title: "Fotogalerie | Querencia Nordzypern",
      description:
        "Durchstöbern Sie unsere Galerie mit atemberaubenden Bildern, die die Luxusresidenzen, Annehmlichkeiten und atemberaubenden Mittelmeerausblicke von Querencia in Nordzypern zeigen.",
      keywords: [
        "Querencia Fotos",
        "Nordzypern Luxusimmobilien Bilder",
        "Mittelmeerausblicke Galerie",
        "Luxusresidenz Bilder",
      ],
    },
    ru: {
      title: "Фотогалерея | Querencia Северный Кипр",
      description:
        "Просмотрите нашу галерею потрясающих изображений, демонстрирующих роскошные резиденции Querencia, удобства и захватывающие виды на Средиземное море на Северном Кипре.",
      keywords: [
        "Фотографии Querencia",
        "Изображения роскошной недвижимости Северного Кипра",
        "Галерея видов Средиземного моря",
        "Фотографии роскошных резиденций",
      ],
    },
  },
  "virtual-tour": {
    en: {
      title: "Virtual Tour | Querencia North Cyprus",
      description:
        "Take a virtual tour of Querencia luxury residences and experience our premium properties from every angle with our immersive 360° virtual tour.",
      keywords: [
        "Querencia virtual tour",
        "360 tour North Cyprus property",
        "immersive property tour",
        "virtual property viewing Cyprus",
      ],
    },
    tr: {
      title: "Sanal Tur | Querencia Kuzey Kıbrıs",
      description:
        "Querencia lüks rezidanslarının sanal turunu yapın ve sürükleyici 360° sanal turumuzla premium mülklerimizi her açıdan deneyimleyin.",
      keywords: [
        "Querencia sanal tur",
        "360 tur Kuzey Kıbrıs mülk",
        "sürükleyici mülk turu",
        "sanal mülk görüntüleme Kıbrıs",
      ],
    },
    de: {
      title: "Virtuelle Tour | Querencia Nordzypern",
      description:
        "Machen Sie eine virtuelle Tour durch die Luxusresidenzen von Querencia und erleben Sie unsere Premium-Immobilien aus jedem Blickwinkel mit unserer immersiven 360°-virtuellen Tour.",
      keywords: [
        "Querencia virtuelle Tour",
        "360-Tour Nordzypern Immobilie",
        "immersive Immobilientour",
        "virtuelle Immobilienbesichtigung Zypern",
      ],
    },
    ru: {
      title: "Виртуальный Тур | Querencia Северный Кипр",
      description:
        "Совершите виртуальный тур по роскошным резиденциям Querencia и ощутите наши премиальные объекты с любого ракурса с помощью нашего иммерсивного 360° виртуального тура.",
      keywords: [
        "Виртуальный тур Querencia",
        "360 тур недвижимость Северный Кипр",
        "иммерсивный тур по недвижимости",
        "виртуальный просмотр недвижимости Кипр",
      ],
    },
  },
  contact: {
    en: {
      title: "Contact Us | Querencia North Cyprus",
      description:
        "Contact our sales team to inquire about Querencia luxury residences in North Cyprus. Request information, schedule a viewing, or download our catalog.",
      keywords: [
        "Querencia contact",
        "North Cyprus property inquiry",
        "luxury residence viewing",
        "property sales Cyprus",
      ],
    },
    tr: {
      title: "Bize Ulaşın | Querencia Kuzey Kıbrıs",
      description:
        "Kuzey Kıbrıs'taki Querencia lüks rezidansları hakkında bilgi almak için satış ekibimizle iletişime geçin. Bilgi isteyin, görüntüleme planlayın veya kataloğumuzu indirin.",
      keywords: [
        "Querencia iletişim",
        "Kuzey Kıbrıs mülk sorgusu",
        "lüks rezidans görüntüleme",
        "mülk satışları Kıbrıs",
      ],
    },
    de: {
      title: "Kontaktieren Sie Uns | Querencia Nordzypern",
      description:
        "Kontaktieren Sie unser Verkaufsteam, um Informationen über die Luxusresidenzen von Querencia in Nordzypern zu erhalten. Fordern Sie Informationen an, vereinbaren Sie eine Besichtigung oder laden Sie unseren Katalog herunter.",
      keywords: [
        "Querencia Kontakt",
        "Nordzypern Immobilienanfrage",
        "Luxusresidenz Besichtigung",
        "Immobilienverkauf Zypern",
      ],
    },
    ru: {
      title: "Свяжитесь с Нами | Querencia Северный Кипр",
      description:
        "Свяжитесь с нашей командой продаж, чтобы узнать о роскошных резиденциях Querencia на Северном Кипре. Запросите информацию, запланируйте просмотр или загрузите наш каталог.",
      keywords: [
        "Контакт Querencia",
        "Запрос о недвижимости Северный Кипр",
        "Просмотр роскошной резиденции",
        "Продажа недвижимости Кипр",
      ],
    },
  },
  "thank-you": {
    en: {
      title: "Thank You | Querencia North Cyprus",
      description:
        "Thank you for your interest in Querencia luxury residences. Our team will contact you shortly with more information about our North Cyprus properties.",
      keywords: [
        "Querencia inquiry confirmation",
        "North Cyprus property information",
        "luxury residence follow-up",
        "property investment Cyprus",
      ],
    },
    tr: {
      title: "Teşekkürler | Querencia Kuzey Kıbrıs",
      description:
        "Querencia lüks rezidanslarına gösterdiğiniz ilgi için teşekkür ederiz. Ekibimiz kısa süre içinde Kuzey Kıbrıs mülklerimiz hakkında daha fazla bilgiyle sizinle iletişime geçecektir.",
      keywords: ["Querencia sorgu onayı", "Kuzey Kıbrıs mülk bilgisi", "lüks rezidans takibi", "mülk yatırımı Kıbrıs"],
    },
    de: {
      title: "Vielen Dank | Querencia Nordzypern",
      description:
        "Vielen Dank für Ihr Interesse an den Luxusresidenzen von Querencia. Unser Team wird sich in Kürze mit weiteren Informationen zu unseren Immobilien in Nordzypern bei Ihnen melden.",
      keywords: [
        "Querencia Anfrage Bestätigung",
        "Nordzypern Immobilieninformation",
        "Luxusresidenz Nachverfolgung",
        "Immobilieninvestition Zypern",
      ],
    },
    ru: {
      title: "Спасибо | Querencia Северный Кипр",
      description:
        "Благодарим вас за интерес к роскошным резиденциям Querencia. Наша команда свяжется с вами в ближайшее время с дополнительной информацией о нашей недвижимости на Северном Кипре.",
      keywords: [
        "Подтверждение запроса Querencia",
        "Информация о недвижимости Северный Кипр",
        "Последующая связь по роскошной резиденции",
        "Инвестиции в недвижимость Кипр",
      ],
    },
  },
}

// Base URL for the website
export const siteConfig = {
  name: "Querencia Hotel & Residence",
  description:
    "Luxury hotel and residence in North Cyprus offering panoramic sea views, premium amenities, and exclusive living spaces.",
  url: "https://querenciacyprus.com",
  ogImage:
    "https://8k9skxif1sms4ctv.public.blob.vercel-storage.com/Hero%20Section/querencia-hero-section-PSfKHchhEjIfGpDkXDJBFkE6boXMqE.webp",
  keywords: [
    "luxury residence",
    "North Cyprus property",
    "sea view apartments",
    "Querencia",
    "luxury hotel",
    "Trikomo",
  ],
  authors: [{ name: "Dovec Group" }],
  // Business information for structured data
  business: {
    name: "Dovec Group",
    legalName: "Dovec Construction Ltd.",
    url: "https://dovecgroup.com",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark_logo_querencia-RKneFVNYlNklaf0DSks551nwWQaotI.png",
    address: {
      streetAddress: "Uluçam Road, No.2",
      addressLocality: "Famagusta",
      addressRegion: "Sakarya",
      postalCode: "",
      addressCountry: "TRNC",
    },
    contactPoint: {
      telephone: "+905488370015",
      email: "info@dovecgroup.com",
      contactType: "customer service",
      areaServed: ["North Cyprus", "Cyprus", "Turkey", "UK", "Germany", "Russia"],
      availableLanguage: ["English", "Turkish", "German", "Russian"],
    },
    sameAs: [
      "https://www.facebook.com/DovecConstruction",
      "https://www.instagram.com/dovec_group",
      "https://x.com/Dovec_Group",
      "https://www.youtube.com/channel/UC8fZUDwu15NR7JTrWu-ihoA",
      "https://www.linkedin.com/company/18814152",
    ],
    openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 09:00-18:00",
    priceRange: "£££",
  },
  // Property information for structured data
  property: {
    priceRange: "£145,000 - £1,500,000",
    numberOfUnits: 705,
    amenities: [
      "Swimming Pools",
      "Aquapark",
      "24-Hour Security",
      "Covered Parking",
      "Wellness & Spa",
      "Restaurants & Bars",
      "Sports Courts",
      "Mini Golf",
      "Kids' Club",
      "Business Center",
      "Walking Paths",
      "Entertainment Zones",
    ],
    propertyTypes: ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom", "Penthouse", "Duplex"],
    location: {
      latitude: 35.2901,
      longitude: 33.9138,
      name: "Trikomo, North Cyprus",
    },
  },
}

// Default metadata for the site
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: "Dovec Group",
  publisher: "Dovec Group",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Dovec_Group",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteConfig.url,
    languages: {
      en: `${siteConfig.url}/en`,
      tr: `${siteConfig.url}/tr`,
      de: `${siteConfig.url}/de`,
      ru: `${siteConfig.url}/ru`,
    },
  },
}

// Generate metadata for each section with language support
export function generateSectionMetadata(section: string, lang = "en"): Metadata {
  // Validate language
  const validLang = ["en", "tr", "de", "ru"].includes(lang) ? lang : "en"

  // Get section SEO data
  const sectionData = sectionSEO[section as keyof typeof sectionSEO]
  const langData = sectionData ? sectionData[validLang as keyof typeof sectionData] : null

  // If no specific section data is found, use default language SEO
  const langSEO = languageSEO[validLang as keyof typeof languageSEO]

  // Generate URL
  const url = lang === "en" ? `${siteConfig.url}/${section}` : `${siteConfig.url}/${lang}/${section}`

  // Use section-specific data if available, otherwise fall back to language defaults
  const title = langData?.title || langSEO.title
  const description = langData?.description || langSEO.description
  const keywords = langData?.keywords || langSEO.keywords

  return {
    title: title,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/${section}`,
        tr: `${siteConfig.url}/tr/${section}`,
        de: `${siteConfig.url}/de/${section}`,
        ru: `${siteConfig.url}/ru/${section}`,
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      locale: langSEO.ogLocale,
      siteName: langSEO.ogSiteName,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [siteConfig.ogImage],
      site: langSEO.twitterSite,
      creator: langSEO.twitterCreator,
    },
  }
}

// Generate home page metadata with language support
export function generateHomeMetadata(lang = "en"): Metadata {
  // Validate language
  const validLang = ["en", "tr", "de", "ru"].includes(lang) ? lang : "en"

  // Get language-specific SEO data
  const langSEO = languageSEO[validLang as keyof typeof languageSEO]

  // Generate URL
  const url = validLang === "en" ? siteConfig.url : `${siteConfig.url}/${validLang}`

  return {
    title: langSEO.title,
    description: langSEO.description,
    keywords: langSEO.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: siteConfig.url,
        tr: `${siteConfig.url}/tr`,
        de: `${siteConfig.url}/de`,
        ru: `${siteConfig.url}/ru`,
      },
    },
    openGraph: {
      title: langSEO.title,
      description: langSEO.description,
      url: url,
      locale: langSEO.ogLocale,
      siteName: langSEO.ogSiteName,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: langSEO.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: langSEO.title,
      description: langSEO.description,
      images: [siteConfig.ogImage],
      site: langSEO.twitterSite,
      creator: langSEO.twitterCreator,
    },
  }
}

// Generate structured data for real estate
export function generateRealEstateStructuredData(lang = "en") {
  // Validate language
  const validLang = ["en", "tr", "de", "ru"].includes(lang) ? lang : "en"

  // Get language-specific SEO data
  const langSEO = languageSEO[validLang as keyof typeof languageSEO]

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.business.name,
    image: siteConfig.business.logo,
    "@id": `${siteConfig.url}/#organization`,
    url: siteConfig.url,
    telephone: siteConfig.business.contactPoint.telephone,
    priceRange: siteConfig.business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.address.streetAddress,
      addressLocality: siteConfig.business.address.addressLocality,
      addressRegion: siteConfig.business.address.addressRegion,
      addressCountry: siteConfig.business.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.property.location.latitude,
      longitude: siteConfig.property.location.longitude,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: siteConfig.business.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.business.contactPoint.telephone,
      contactType: "sales",
      areaServed: siteConfig.business.contactPoint.areaServed,
      availableLanguage: siteConfig.business.contactPoint.availableLanguage,
    },
  }
}

// Generate structured data for residence
export function generateResidenceStructuredData(lang = "en") {
  // Validate language
  const validLang = ["en", "tr", "de", "ru"].includes(lang) ? lang : "en"

  // Get language-specific SEO data
  const langSEO = languageSEO[validLang as keyof typeof languageSEO]

  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: siteConfig.name,
    description: langSEO.description,
    url: validLang === "en" ? siteConfig.url : `${siteConfig.url}/${validLang}`,
    image: siteConfig.ogImage,
    numberOfRooms: "1-5",
    petsAllowed: true,
    tourBookingPage: `${siteConfig.url}/${validLang === "en" ? "" : validLang + "/"}#contact`,
    amenityFeature: siteConfig.property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    })),
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.property.location.latitude,
      longitude: siteConfig.property.location.longitude,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Trikomo",
      addressRegion: "North Cyprus",
      addressCountry: "Cyprus",
    },
    telephone: siteConfig.business.contactPoint.telephone,
    priceRange: siteConfig.property.priceRange,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: "145000",
      highPrice: "1500000",
      offerCount: siteConfig.property.numberOfUnits,
    },
  }
}

// Generate structured data for FAQ
export function generateFAQStructuredData(lang = "en") {
  // Validate language
  const validLang = ["en", "tr", "de", "ru"].includes(lang) ? lang : "en"

  // FAQ questions and answers based on language
  const faqItems = {
    en: [
      {
        question: "Where is Querencia located?",
        answer:
          "Querencia is strategically positioned in Trikomo, North Cyprus, offering both tranquility and convenience. It's just 5 minutes from pristine Mediterranean beaches, 30 minutes from the international airport, and 20 minutes from the biggest university.",
      },
      {
        question: "What types of residences are available at Querencia?",
        answer:
          "Querencia offers 705 luxury apartments including studios, 1-bedroom, 2-bedroom, and 3-bedroom residences, as well as exclusive penthouses with private pools and panoramic terraces. Each residence offers 180° uninterrupted sea views.",
      },
      {
        question: "What amenities are available at Querencia?",
        answer:
          "Querencia features premium amenities including swimming pools, aquapark, wellness & spa, restaurants & bars, sports courts, mini golf, 24-hour security, covered parking, kids' club, business center, and walking/jogging/bicycle paths.",
      },
      {
        question: "What is the starting price for Querencia residences?",
        answer: "Prices for Querencia residences start from £145,000.",
      },
      {
        question: "When will Querencia be completed?",
        answer:
          "Querencia is being developed in three phases: Phase 1 (Block A) in April 2026, Phase 2 (Block B) in December 2026, and Phase 3 (Blocks C & D) in June 2027.",
      },
    ],
    tr: [
      {
        question: "Querencia nerede bulunuyor?",
        answer:
          "Querencia, Kuzey Kıbrıs'ın Trikomo bölgesinde stratejik bir konumda yer alarak hem huzur hem de kolaylık sunmaktadır. Berrak Akdeniz plajlarına 5 dakika, uluslararası havalimanına 30 dakika ve en büyük üniversiteye 20 dakika mesafededir.",
      },
      {
        question: "Querencia'da hangi tür rezidanslar mevcut?",
        answer:
          "Querencia, stüdyo, 1 yatak odalı, 2 yatak odalı ve 3 yatak odalı rezidanslar ile özel havuzlu ve panoramik teraslı özel çatı katları dahil olmak üzere 705 lüks daire sunmaktadır. Her rezidans 180° kesintisiz deniz manzarası sunmaktadır.",
      },
      {
        question: "Querencia'da hangi olanaklar mevcut?",
        answer:
          "Querencia, yüzme havuzları, aquapark, sağlık ve spa, restoranlar ve barlar, spor sahaları, mini golf, 24 saat güvenlik, kapalı otopark, çocuk kulübü, iş merkezi ve yürüyüş/koşu/bisiklet yolları gibi premium olanaklar sunmaktadır.",
      },
      {
        question: "Querencia rezidansları için başlangıç fiyatı nedir?",
        answer: "Querencia rezidansları için fiyatlar £145,000'dan başlamaktadır.",
      },
      {
        question: "Querencia ne zaman tamamlanacak?",
        answer:
          "Querencia üç aşamada geliştirilmektedir: Aşama 1 (A Blok) Nisan 2026'da, Aşama 2 (B Blok) Aralık 2026'da ve Aşama 3 (C ve D Blokları) Haziran 2027'de.",
      },
    ],
    de: [
      {
        question: "Wo befindet sich Querencia?",
        answer:
          "Querencia ist strategisch in Trikomo, Nordzypern, positioniert und bietet sowohl Ruhe als auch Komfort. Es ist nur 5 Minuten von unberührten Mittelmeerstränden, 30 Minuten vom internationalen Flughafen und 20 Minuten von der größten Universität entfernt.",
      },
      {
        question: "Welche Arten von Residenzen sind in Querencia verfügbar?",
        answer:
          "Querencia bietet 705 Luxuswohnungen, darunter Studios, 1-Zimmer-, 2-Zimmer- und 3-Zimmer-Residenzen sowie exklusive Penthäuser mit privaten Pools und Panoramaterrassen. Jede Residenz bietet einen 180° ungehinderten Meerblick.",
      },
      {
        question: "Welche Annehmlichkeiten sind in Querencia verfügbar?",
        answer:
          "Querencia bietet erstklassige Annehmlichkeiten wie Schwimmbäder, Wasserpark, Wellness & Spa, Restaurants & Bars, Sportplätze, Minigolf, 24-Stunden-Sicherheit, überdachte Parkplätze, Kinderclub, Business Center und Wander-/Jogging-/Fahrradwege.",
      },
      {
        question: "Was ist der Anfangspreis für Querencia-Residenzen?",
        answer: "Die Preise für Querencia-Residenzen beginnen bei £145.000.",
      },
      {
        question: "Wann wird Querencia fertiggestellt sein?",
        answer:
          "Querencia wird in drei Phasen entwickelt: Phase 1 (Block A) im April 2026, Phase 2 (Block B) im Dezember 2026 und Phase 3 (Blöcke C & D) im Juni 2027.",
      },
    ],
    ru: [
      {
        question: "Где расположен Querencia?",
        answer:
          "Querencia стратегически расположен в Трикомо, Северный Кипр, предлагая как спокойствие, так и удобство. Он находится всего в 5 минутах от нетронутых пляжей Средиземного моря, в 30 минутах от международного аэропорта и в 20 минутах от крупнейшего университета.",
      },
      {
        question: "Какие типы резиденций доступны в Querencia?",
        answer:
          "Querencia предлагает 705 роскошных апартаментов, включая студии, резиденции с 1, 2 и 3 спальнями, а также эксклюзивные пентхаусы с частными бассейнами и панорамными террасами. Каждая резиденция предлагает 180° беспрепятственный вид на море.",
      },
      {
        question: "Какие удобства доступны в Querencia?",
        answer:
          "Querencia предлагает первоклассные удобства, включая бассейны, аквапарк, велнес и спа, рестораны и бары, спортивные площадки, мини-гольф, круглосуточную охрану, крытую парковку, детский клуб, бизнес-центр и дорожки для прогулок/бега/велосипедных прогулок.",
      },
      {
        question: "Какова начальная цена резиденций Querencia?",
        answer: "Цены на резиденции Querencia начинаются от £145,000.",
      },
      {
        question: "Когда будет завершен Querencia?",
        answer:
          "Querencia разрабатывается в три этапа: Этап 1 (Блок A) в апреле 2026 года, Этап 2 (Блок B) в декабре 2026 года и Этап 3 (Блоки C и D) в июне 2027 года.",
      },
    ],
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems[validLang as keyof typeof faqItems].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(section: string, lang = "en") {
  // Validate language
  const validLang = ["en", "tr", "de", "ru"].includes(lang) ? lang : "en"

  // Get section SEO data
  const sectionData = sectionSEO[section as keyof typeof sectionSEO]
  const langData = sectionData ? sectionData[validLang as keyof typeof sectionData] : null

  // If no specific section data is found, use default language SEO
  const langSEO = languageSEO[validLang as keyof typeof languageSEO]

  // Use section-specific title if available, otherwise fall back to language defaults
  const title = langData?.title || langSEO.title

  // Base URL
  const baseUrl = validLang === "en" ? siteConfig.url : `${siteConfig.url}/${validLang}`

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${baseUrl}/${section}`,
      },
    ],
  }
}
