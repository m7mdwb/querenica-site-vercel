import { siteConfig, languageSEO } from "@/app/metadata-config"

// Define sectionSEO
const sectionSEO = {
  apartments: {
    en: { title: "Apartments" },
    tr: { title: "Daireler" },
    de: { title: "Wohnungen" },
    ru: { title: "Квартиры" },
  },
  lifestyle: {
    en: { title: "Lifestyle" },
    tr: { title: "Yaşam Tarzı" },
    de: { title: "Lebensstil" },
    ru: { title: "Стиль жизни" },
  },
  investment: {
    en: { title: "Investment" },
    tr: { title: "Yatırım" },
    de: { title: "Investition" },
    ru: { title: "Инвестиции" },
  },
  location: {
    en: { title: "Location" },
    tr: { title: "Konum" },
    de: { title: "Lage" },
    ru: { title: "Местоположение" },
  },
  contact: {
    en: { title: "Contact" },
    tr: { title: "İletişim" },
    de: { title: "Kontakt" },
    ru: { title: "Контакт" },
  },
}

// Generate language-specific FAQ structured data
export function generateFAQStructuredData(lang: "en" | "tr" | "de" | "ru") {
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
    mainEntity: faqItems[lang].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

// Generate language-specific real estate structured data
export function generateRealEstateStructuredData(lang: "en" | "tr" | "de" | "ru") {
  // Get language-specific SEO data
  const langSEO = languageSEO[lang]

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.business.name,
    image: siteConfig.business.logo,
    "@id": `${siteConfig.url}/#organization`,
    url: siteConfig.url,
    telephone: siteConfig.business.contactPoint.telephone,
    priceRange: siteConfig.business.priceRange,
    description: langSEO.description,
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

// Generate language-specific residence structured data
export function generateResidenceStructuredData(lang: "en" | "tr" | "de" | "ru") {
  // Get language-specific SEO data
  const langSEO = languageSEO[lang]

  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: siteConfig.name,
    description: langSEO.description,
    url: lang === "en" ? siteConfig.url : `${siteConfig.url}/${lang}`,
    image: siteConfig.ogImage,
    numberOfRooms: "1-5",
    petsAllowed: true,
    tourBookingPage: `${siteConfig.url}/${lang === "en" ? "" : lang + "/"}#contact`,
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

// Generate language-specific breadcrumb structured data
export function generateBreadcrumbStructuredData(section: string, lang: "en" | "tr" | "de" | "ru") {
  // Get section SEO data
  const sectionData = sectionSEO[section as keyof typeof sectionSEO]
  const langData = sectionData ? sectionData[lang] : null

  // If no specific section data is found, use default language SEO
  const langSEOData = languageSEO[lang]

  // Use section-specific title if available, otherwise fall back to language defaults
  const title = langData?.title || langSEOData.title

  // Base URL
  const baseUrl = lang === "en" ? siteConfig.url : `${siteConfig.url}/${lang}`

  // Home label based on language
  const homeLabel = {
    en: "Home",
    tr: "Ana Sayfa",
    de: "Startseite",
    ru: "Главная",
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel[lang],
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

// Generate language-specific local business structured data
export function generateLocalBusinessStructuredData(lang: "en" | "tr" | "de" | "ru") {
  // Get language-specific SEO data
  const langSEO = languageSEO[lang]

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.business.name,
    image: siteConfig.business.logo,
    url: siteConfig.url,
    telephone: siteConfig.business.contactPoint.telephone,
    priceRange: siteConfig.business.priceRange,
    description: langSEO.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.business.address.streetAddress,
      addressLocality: siteConfig.business.address.addressLocality,
      addressRegion: siteConfig.business.address.addressCountry,
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
  }
}

// Generate language-specific product structured data for residences
export function generateProductStructuredData(lang: "en" | "tr" | "de" | "ru") {
  // Get language-specific SEO data
  const langSEO = languageSEO[lang]

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteConfig.name,
    description: langSEO.description,
    image: siteConfig.ogImage,
    brand: {
      "@type": "Brand",
      name: "Dovec Group",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "GBP",
      lowPrice: "145000",
      highPrice: "1500000",
      offerCount: siteConfig.property.numberOfUnits,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
    },
  }
}
