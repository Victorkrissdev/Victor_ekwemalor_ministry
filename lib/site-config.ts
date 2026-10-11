/**
 * SITE SETTINGS
 * -------------
 * All of your personal details and links live in this one file.
 * Change a value here, save, and it updates everywhere on the website.
 *
 * Tip: keep the quotes "..." around text values, and keep the commas at
 * the end of each line.
 */

export const siteConfig = {
  name: "Victor Ekwemalor",

  // Short tagline used in page titles, e.g. "About | Victor Ekwemalor"
  tagline: "Make Him Known",

  // Used by Google and when your link is shared
  description:
    "Christian voiceover storytelling that shares biblical and spiritual messages. I have no desire to be known. I want HIM to be known.",

  // Your live website address. Vercel fills this in automatically,
  // but you can type your custom domain here later, e.g. "https://victorekwemalor.com"
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  // Contact details
  email: "victorkriss70@gmail.com",
  phone: "+44 7350 158316",

  // Set to false to HIDE your email and phone on the website.
  // The contact form keeps working either way.
  showContactDetails: true,

  motto: "I have no desire to be known. I want HIM to be known.",
  keyVerse: {
    text: "He must increase, but I must decrease.",
    reference: "John 3:30",
  },
  hashtag: "#EyesOnJesus",
  location: "In Christ Jesus",

  // Social media links. To hide a platform, delete its line.
  social: {
    instagram: "https://www.instagram.com/victor_ekwemalor/",
    tiktok: "https://www.tiktok.com/@victorekwemalor",
    facebook: "https://www.facebook.com/ekwemalor.victor/",
    x: "https://x.com/victor_lightt",
    youtube: "https://www.youtube.com/@VictorEkwemalor",
  },
};

export type SocialPlatform = keyof typeof siteConfig.social;
