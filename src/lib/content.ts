// Copy from the approved redesign v2 home page (founder, 23 Oct 2026),
// word for word. Shared so other pages reuse the same lines.

export const whoTiles = [
  { label: "Landlords", line: "The shared alarm in the common parts.", bg: "bg-pink", href: "/landlords" },
  { label: "Portfolios and managing agents", line: "Many buildings, one contract.", bg: "bg-butter", href: "/landlords" },
  { label: "Businesses", line: "Serviced offices, warehouses, hotels, gyms, dentists, shops.", bg: "bg-mint", href: "/contact#survey" },
  { label: "Server and plant rooms", line: "Gas suppression on the same contract.", bg: "bg-peri", href: "/services#gas-suppression" },
] as const;

export const stats = {
  source:
    "https://www.gov.uk/government/statistics/fire-prevention-and-protection-england-year-ending-march-2026/fire-prevention-and-protection-statistics-england-april-2025-to-march-2026",
};

export const stories = [
  {
    big: "£75k",
    head: "A hotel fined for a faulty fire alarm.",
    body: "Inspectors found the alarm faulty and served a notice. Months later the work still wasn’t done.",
    src: "Northamptonshire Fire and Rescue, 2025",
    href: "https://www.northantsfire.gov.uk/2025/11/05/prosecution-results-in-wellingborough-hotel-being-fined-75k-for-fire-safety-failures/",
  },
  {
    big: "£124k",
    head: "Care homes with missing alarms.",
    body: "Two directors pleaded guilty to 12 offences across four care homes, including missing detection and alarms.",
    src: "East Sussex Fire and Rescue, 2024",
    href: "https://www.esfrs.org/east-sussex-fire-and-rescue-service-welcomes-successful-fire-safety-prosecution",
  },
  {
    big: "No alarm",
    head: "Staff sleeping in a restaurant loft.",
    body: "No fire detection at all. The fire service banned the loft from use and the owner was prosecuted.",
    src: "Fire Industry Association, 2024",
    href: "https://www.fia.uk.com/news/northampton-restaurant-owner-fined-for-severe-fire-safety-breaches.html",
  },
] as const;

export const compare = [
  { topic: "Your certificates", us: "In your portal after every visit.", ask: "Where is my last certificate, right now?" },
  { topic: "Your price", us: "Fixed for the year’s servicing, in writing. Any extra work quoted before it’s done.", ask: "Is my price fixed for the year, in writing?" },
  { topic: "One contract", us: "Fire alarm and gas suppression, every site, one invoice.", ask: "How many firms look after my buildings?" },
  { topic: "Who you deal with", us: "One named contact who knows your buildings.", ask: "Who do I ring, and do they know my building?" },
] as const;

export const scopes = {
  alarm: {
    label: "Fire alarms",
    standard: "BS 5839-1",
    title: "A fire alarm service visit",
    note: "You get a certificate and a log book entry after each visit.",
    items: [
      "Log book and fault history checked",
      "Panel, power and standby batteries tested",
      "Detectors and call points tested, every one covered at least once a year",
      "Sounders and beacons checked",
      "Faults recorded, explained and quoted",
      "Certificate and log book entry in your portal",
    ],
  },
  gas: {
    label: "Gas suppression",
    standard: "BS EN 15004",
    title: "A gas suppression service visit",
    note: "For server rooms, plant rooms and archives, on the same contract as your fire alarm.",
    items: [
      "Cylinder contents and pressure checked",
      "Detection and control panel tested",
      "Hold and abort controls checked",
      "Room checked for openings that would let the gas escape",
      "Warning signs and notices checked",
      "Report and certificate in your portal",
    ],
  },
} as const;

export const whatWeLookAfter = [
  {
    id: "fire-alarms",
    name: "Fire alarms",
    body: "Servicing to BS 5839-1, with a certificate after each visit.",
    bg: "bg-highlight",
  },
  {
    id: "gas-suppression",
    name: "Gas suppression",
    body: "Maintenance to BS EN 15004 for server rooms, plant rooms and archives.",
    bg: "bg-peri",
  },
] as const;

export const otherServices = "design and installation · emergency lighting · fire risk assessments.";

export const howItWorks = [
  { n: "1", name: "Survey", body: "A look at what you have and what it needs." },
  { n: "2", name: "Fixed price, in writing", body: "One price for the year’s servicing, agreed before we start." },
  { n: "3", name: "Your annual plan", body: "Every service visit booked ahead, around your tenants and staff." },
  { n: "4", name: "Certificate", body: "In your portal after each visit." },
] as const;

export const onTheDay = [
  { name: "Booked ahead", body: "You know the date and time well before the visit." },
  { name: "Explained", body: "Before the visit ends, you’re told what was tested and what was found." },
  { name: "Tidy", body: "Covers back on, ceilings clean, nothing left behind." },
  { name: "One number", body: "Ring the same number, whatever the question." },
] as const;

export const faqs = [
  { q: "How often should a fire alarm be serviced?", a: "BS 5839-1 says approximately every six months. Anything from five to seven months is treated as acceptable." },
  { q: "Is the fire alarm my responsibility?", a: "Under the Fire Safety Order, the Responsible Person must keep fire safety systems maintained. For shared parts of a building, that’s often the landlord or whoever controls the common parts." },
  { q: "What is in the customer portal?", a: "Certificates, visit history, log book entries and the asset register, with an evidence pack you can download for your insurer or fire risk assessor." },
  { q: "Which areas do you cover?", a: "London and the South East." },
] as const;
