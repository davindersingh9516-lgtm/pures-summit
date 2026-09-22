import type { HeroSectionData, HomepageData, HomepageSection, NewsletterSignup } from "@/types";
import { createMockSEO } from "./seo.mock";

/**
 * MOCK DATA - stands in for the homepage's ACF Flexible Content field group
 * queried through WPGraphQL. Section order here IS page order - reordering
 * this array is exactly what a WordPress editor reordering Flexible Content
 * layouts would produce; `SectionRenderer` requires no code change either
 * way. See types/homepage-sections.types.ts for why "dynamic" sections
 * (productCarousel, testimonials, ...) carry only lightweight copy here
 * rather than embedding their full data.
 */

export const mockHero: HeroSectionData = {
  id: "section-hero",
  type: "hero",
  eyebrow: "Single-origin New Zealand Manuka honey",
  heading: "Honey worth tracing back to the hive.",
  subheading:
    "Raw, MGO 263+ graded Manuka honey harvested from remote New Zealand hives and independently lab tested for every batch. One product today, an unlimited catalogue tomorrow - the same storefront handles both.",
  media: {
    id: "hero-media",
    url: "/mocks/hero-1.webp",
    altText: "A jar of raw Manuka honey on a weathered wooden table at golden hour, misty native New Zealand bush in the background",
    width: 1024,
    height: 559,
  },
  video: {
    id: "hero-video",
    url: "/media/hero.mp4",
    poster: {
      id: "hero-video-poster",
      url: "/mocks/hero-1.webp",
      altText: "A jar of raw Manuka honey on a weathered wooden table at golden hour, misty native New Zealand bush in the background",
    },
    caption: "Pure Summit - from hive to jar",
  },
  overlay: "dark",
  buttons: [
    { label: "Browse the collection", url: "/shop", variant: "primary" },
    { label: "My account", url: "/account", variant: "secondary" },
  ],
  trustBadges: [
    {
      id: "hero-trust-lab",
      icon: "flask-conical",
      label: "Independently lab tested",
      description: "MGO, DHA and leptosperin assayed every batch",
    },
    {
      id: "hero-trust-authenticity",
      icon: "shield-check",
      label: "Authenticity guarantee",
      description: "Traceable to the harvest",
    },
    {
      id: "hero-trust-sealed",
      icon: "package-check",
      label: "Sealed on arrival",
      description: "Tamper-evident packaging",
    },
  ],
  scrollToId: "section-trust-icons",
};

export const mockHomepageNewsletter: NewsletterSignup = {
  enabled: true,
  title: "Join the Journal",
  description: "Seasonal harvest notes, lab results, and early access to limited batches.",
  consentText: "By subscribing you agree to our Privacy Policy.",
};

export const mockHomepageSections: HomepageSection[] = [
  mockHero,
  { id: "section-trust-icons", type: "trustIcons", heading: "Why Pure Summit" },
  {
    id: "section-featured-products",
    type: "featuredProducts",
    eyebrow: "Customer Favourites",
    heading: "Best Sellers",
    subheading: "The jars our customers reach for again and again.",
    viewAllUrl: "/shop",
    limit: 5,
  },
  {
    id: "section-why-manuka",
    type: "imageLeft",
    layout: "imageLeft",
    eyebrow: "Why Manuka Honey",
    heading: "Nature's Rarest Nectar, Verified at Every Step",
    description:
      "Manuka honey comes from the nectar of the native Manuka tree, found only in New Zealand and parts of Australia. Its natural antibacterial strength - measured as MGO, the concentration of methylglyoxal in the honey - makes it unlike any other honey on earth. We work with a small network of apiary partners across remote Northland, harvesting during a short six-week flowering window and lab-testing every batch before it reaches your table. Every jar carries a batch reference, so you can look up the exact harvest, hive location, and lab report before you open the lid.",
    highlights: [
      { id: "why-manuka-highlight-1", icon: "leaf", label: "100% Pure", value: "No blending, no additives" },
      { id: "why-manuka-highlight-2", icon: "flask-conical", label: "Lab Verified", value: "Every batch independently tested" },
      { id: "why-manuka-highlight-3", icon: "calendar-days", label: "6-Week Harvest", value: "A short, once-a-year flowering window" },
    ],
    media: {
      id: "why-manuka-media",
      url: "/mocks/why-manuka-poster.png",
      altText: "A Pure Summit Manuka honey jar surrounded by Manuka flowers in bloom",
    },
    video: {
      id: "why-manuka-video",
      url: "/media/why-manuka.mp4",
      poster: {
        id: "why-manuka-poster",
        url: "/mocks/why-manuka-poster.png",
        altText: "A Pure Summit Manuka honey jar surrounded by Manuka flowers in bloom",
      },
      caption: "Pure Summit - from bloom to jar",
    },
    buttons: [{ label: "Learn More", url: "/our-story", variant: "secondary" }],
  },
  {
    id: "section-harvest-process",
    type: "harvestProcess",
    eyebrow: "How It's Made",
    heading: "From Wild Hive to Sealed Jar",
    subheading: "Five steps, one short season - every batch follows the same path before it reaches you.",
    steps: [
      {
        id: "harvest-step-1",
        number: "01",
        icon: "map-pin",
        title: "Remote Hive Placement",
        description: "Hives are placed deep in wild Northland backcountry, far from farmland and roads.",
      },
      {
        id: "harvest-step-2",
        number: "02",
        icon: "flower-2",
        title: "The Bloom Window",
        description: "Manuka flowers for just four to six weeks a year - harvest timing is everything.",
      },
      {
        id: "harvest-step-3",
        number: "03",
        icon: "droplets",
        title: "Raw Extraction",
        description: "Honey is spun cold, straight from the comb, with nothing added or taken away.",
      },
      {
        id: "harvest-step-4",
        number: "04",
        icon: "flask-conical",
        title: "Independent Lab Testing",
        description: "Every batch is verified for MGO potency before it's cleared to bottle.",
      },
      {
        id: "harvest-step-5",
        number: "05",
        icon: "package-check",
        title: "Small-Batch Bottling",
        description: "Bottled and numbered in small batches, traceable back to its harvest and hive.",
      },
    ],
    closingNote: "No shortcuts, no blending across batches - just the same five steps, every harvest.",
  },
  {
    id: "section-mgo-explained",
    type: "featureCardsMedia",
    eyebrow: "Know Your Grade",
    heading: "MGO 263+, Explained",
    description:
      "MGO is the grading scale for Manuka honey, and it measures one thing directly: methylglyoxal, the naturally occurring compound behind Manuka's antibacterial strength. Every Pure Summit jar is graded MGO 263+, and every batch behind that number is backed by an independent lab report you can read.",
    button: { label: "View Lab Reports", url: "/lab-reports", variant: "secondary" },
    cards: [
      {
        id: "mgo-card-what",
        icon: "gauge",
        title: "What MGO Measures",
        description:
          "MGO stands for methylglyoxal, the naturally occurring molecule responsible for Manuka honey's non-peroxide antibacterial activity. Unlike vaguer 'strength' or 'active' claims, an MGO figure is a literal laboratory measurement: the concentration of methylglyoxal in milligrams per kilogram of honey. That makes it the most direct number in the category - there is nothing to interpret and no proprietary scale in between you and the result. It also means you can put our jar next to any other MGO-graded honey on the shelf and compare the two figures like for like.",
      },
      {
        id: "mgo-card-number",
        icon: "award",
        title: "Why 263+",
        description:
          "The '+' matters: MGO 263+ is a floor, not an average. It means an accredited laboratory measured at least 263 mg/kg of methylglyoxal in that specific batch, and most batches test somewhat above it. We publish a single grade across the whole range rather than a ladder of strengths because we bottle one honey from one harvest window - the 250g jar, the 500g jar and every value pack are filled from the same tested batches. The only thing that changes between our products is how much honey you take home.",
      },
      {
        id: "mgo-card-lab",
        icon: "flask-conical",
        title: "Independently Lab-Tested",
        description:
          "A grade only means something if the number behind it is real, which is why every batch we bottle is sent to an accredited, independent third-party laboratory before it is approved for sale. That lab measures methylglyoxal alongside the other markers of genuine Manuka - leptosperin, DHA and HMF - and issues a dated report tied to that specific harvest. We keep every one of those reports on file and publish them against the batch code on your jar, so you are never just trusting a label. You can read the actual test result behind the honey you are holding.",
      },
    ],
    media: {
      id: "mgo-media",
      url: "/mocks/mgo-media.jpg",
      altText: "A Pure Summit Manuka honey jar beside a magnifying glass and a printed lab certification report",
    },
    imagePosition: "right",
    stats: [
      { id: "mgo-stat-1", label: "100% Independently Tested" },
      { id: "mgo-stat-2", label: "Batch-Traceable Reports" },
    ],
  },
  {
    id: "section-shop-the-range",
    type: "productFilterGrid",
    eyebrow: "MGO 263+ Collection",
    heading: "Shop the Range",
    subheading: "One honey, two jar sizes, and multi-jar packs that cost less than buying the jars separately.",
    tabs: [
      { id: "tab-all", label: "All", tagPrefix: "" },
      { id: "tab-jars", label: "Single Jars", tagPrefix: "everyday" },
      { id: "tab-packs", label: "Value Packs", tagPrefix: "pack" },
    ],
    limit: 6,
    viewAllUrl: "/shop",
  },
  {
    id: "section-purity-promise",
    type: "purityPromise",
    headline: "Nothing Added. Nothing Hidden.",
    proofPoints: [
      { id: "purity-point-1", text: "Single Northland harvest - never blended across batches." },
      { id: "purity-point-2", text: "Cold-extracted and raw - nothing heated, nothing lost." },
      { id: "purity-point-3", text: "Zero syrup-cutting. Zero fillers. Just honey." },
      { id: "purity-point-4", text: "Independently lab-tested for purity, potency, and authenticity." },
      { id: "purity-point-5", text: "Every jar batch-numbered and traceable to its hive." },
    ],
    closingLine: "100% pure, start to finish.",
    batchLabel: "Batch NZ-0472 - Harvest 2026 - Lab Ref 00214",
  },
  {
    id: "section-origin-traceability",
    type: "originTraceability",
    eyebrow: "Origin & Traceability",
    heading: "See Exactly Where Your Honey Comes From",
    subheading:
      "Every jar traces back to a real region, a real beekeeper, and a lab-verified batch - click the map or check your own jar below.",
    map: {
      viewBox: "0 0 400 534",
      northIslandPath:
        "M 264.3,90.1 L 286.5,132.6 L 287.2,105.0 L 301.0,116.0 L 305.6,146.5 L 330.2,159.7 L 351.0,162.9 L 368.5,147.5 L 384.0,152.2 L 376.6,188.0 L 367.2,211.5 L 343.9,210.7 L 335.7,222.9 L 338.5,240.3 L 334.0,247.8 L 322.4,269.5 L 307.2,297.1 L 283.6,313.2 L 278.3,302.6 L 265.5,296.8 L 283.2,263.6 L 273.2,241.4 L 240.2,225.3 L 241.0,210.7 L 263.2,196.6 L 268.4,165.6 L 266.9,139.5 L 254.5,112.5 L 255.3,105.4 L 240.7,88.7 L 216.6,53.1 L 203.8,24.5 L 215.1,21.4 L 231.8,43.8 L 255.7,54.2 L 264.3,90.1 Z",
      southIslandPath:
        "M 215.5,282.2 L 222.5,298.8 L 244.3,282.5 L 253.2,299.5 L 253.2,316.5 L 241.8,335.1 L 221.7,364.8 L 206.1,381.1 L 217.4,400.5 L 193.7,401.0 L 167.5,416.2 L 159.3,442.5 L 141.9,483.3 L 117.8,501.4 L 102.5,512.9 L 74.3,512.0 L 54.4,498.7 L 21.1,495.9 L 16.0,481.1 L 32.5,451.2 L 71.0,411.4 L 90.8,403.8 L 112.8,388.4 L 139.1,367.3 L 157.5,346.4 L 171.1,316.4 L 182.7,306.2 L 187.3,283.6 L 208.7,265.0 L 215.5,282.2 Z",
    },
    regions: [
      {
        id: "region-northland",
        name: "Northland (Te Tai Tokerau)",
        x: 55.7,
        y: 9.0,
        beekeeper: "Hemi Walker",
        description:
          "New Zealand's largest wild Manuka region, with an early subtropical bloom that opens the harvest season each year.",
        harvestWindow: "Late Nov - Mid Dec",
        hiveCount: 620,
        mgoRange: "MGO 150+ - 400+",
        featured: true,
      },
      {
        id: "region-east-cape",
        name: "East Cape",
        x: 96.2,
        y: 28.5,
        beekeeper: "Aroha Ngata",
        description:
          "A remote, wave-battered headland where an intense early bloom produces some of our highest-potency harvests.",
        harvestWindow: "Early Dec - Late Dec",
        hiveCount: 240,
        mgoRange: "MGO 550+ - 1000+",
      },
      {
        id: "region-te-urewera",
        name: "Te Urewera",
        x: 85.5,
        y: 36.5,
        beekeeper: "Daniel Bishop",
        description:
          "Steep, roadless native forest reachable only by helicopter - unmanaged backcountry Manuka at its wildest.",
        harvestWindow: "Mid Dec - Mid Jan",
        hiveCount: 180,
        mgoRange: "MGO 400+ - 700+",
      },
      {
        id: "region-taranaki",
        name: "Taranaki",
        x: 61.9,
        y: 40.6,
        beekeeper: "Grace Symons",
        description: "Volcanic soils ringing Mt Taranaki, with hives set deep in isolated bush at the mountain's edge.",
        harvestWindow: "Early Dec - Early Jan",
        hiveCount: 310,
        mgoRange: "MGO 250+ - 550+",
      },
      {
        id: "region-marlborough",
        name: "Marlborough Sounds",
        x: 61.4,
        y: 53.8,
        beekeeper: "Toby Reid",
        description: "Drowned river valleys and boat-only islands - our flagship South Island harvest ground.",
        harvestWindow: "Mid Dec - Late Jan",
        hiveCount: 275,
        mgoRange: "MGO 300+ - 850+",
        featured: true,
      },
    ],
    batchLookup: {
      heading: "Check Your Batch",
      description: "Enter the code printed on the base of your jar to see its exact harvest region, date, and lab-verified potency.",
      inputLabel: "Batch code",
      placeholder: "e.g. PSNL2508",
      helperText: "Found on the base of your jar or the box flap. Usually 6-10 letters and numbers.",
      notFoundMessage:
        "We couldn't find that batch. Double-check the code on the base of your jar, or reach out and we'll verify it directly.",
      records: [
        {
          id: "batch-1",
          code: "PSNL2508",
          regionId: "region-northland",
          harvestDate: "14 Dec 2025",
          bestBefore: "Dec 2028",
          mgo: "MGO 291 (measured)",
          lab: "Analytica Laboratories",
        },
        {
          id: "batch-2",
          code: "PSNL2601",
          regionId: "region-northland",
          harvestDate: "02 Jan 2026",
          bestBefore: "Jan 2029",
          mgo: "MGO 268 (measured)",
          lab: "AsureQuality NZ",
        },
        {
          id: "batch-3",
          code: "PSEC2511",
          regionId: "region-east-cape",
          harvestDate: "08 Dec 2025",
          bestBefore: "Dec 2028",
          mgo: "MGO 342 (measured)",
          lab: "AsureQuality NZ",
        },
        {
          id: "batch-4",
          code: "PSTU2504",
          regionId: "region-te-urewera",
          harvestDate: "22 Dec 2025",
          bestBefore: "Dec 2028",
          mgo: "MGO 318 (measured)",
          lab: "Analytica Laboratories",
        },
        {
          id: "batch-5",
          code: "PSTK2509",
          regionId: "region-taranaki",
          harvestDate: "18 Dec 2025",
          bestBefore: "Dec 2028",
          mgo: "MGO 277 (measured)",
          lab: "AsureQuality NZ",
        },
        {
          id: "batch-6",
          code: "PSMB2601",
          regionId: "region-marlborough",
          harvestDate: "15 Jan 2026",
          bestBefore: "Jan 2029",
          mgo: "MGO 329 (measured)",
          lab: "Analytica Laboratories",
        },
      ],
    },
  },
  {
    id: "section-blog-preview",
    type: "blogPreview",
    eyebrow: "The Journal",
    heading: "From the Journal",
    subheading: "Harvest notes, grading guides, and life at the apiary.",
    viewAllUrl: "/blog",
    limit: 4,
  },
  {
    id: "section-faq-preview",
    type: "faqPreview",
    heading: "Common Questions",
    subheading: "Everything you need to know before your first order.",
    viewAllUrl: "/faqs",
    limit: 16,
    supportEmail: "hello@puresummit.co.nz",
  },
  {
    id: "section-contact-form",
    type: "contactForm",
    eyebrow: "Get In Touch",
    heading: "We're Here to Help",
    subheading: "Questions about an order, a batch, or stocking Pure Summit in your store - send us a message.",
    responseTimeNote: "We usually reply within 1 business day.",
    hours: "Mon-Fri, 9am-5pm NZST",
    email: "hello@puresummit.co.nz",
    phone: "+64 9 555 0142",
    phoneNote: "Wholesale & trade enquiries only",
    topics: ["General Question", "Order Support", "Wholesale / Trade", "Press", "Other"],
    trustBadges: [
      { id: "contact-badge-mgo", icon: "shield-check", label: "MGO 263+ Graded" },
      { id: "contact-badge-nz", icon: "map-pin", label: "100% NZ Owned" },
      { id: "contact-badge-lab", icon: "flask-conical", label: "Independently Lab-Tested" },
    ],
  },
  {
    id: "section-testimonials",
    type: "testimonials",
    eyebrow: "Loved By Customers",
    heading: "What Our Customers Say",
  },
];

export const mockHomepageData: HomepageData = {
  seo: createMockSEO({
    path: "/",
    title: "Pure Summit | Raw New Zealand Manuka Honey",
    description: "Raw, lab-tested New Zealand Manuka honey, cold-extracted from remote Northland groves.",
  }),
  sections: mockHomepageSections,
};
