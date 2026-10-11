I want you to build my personal Christian ministry website from scratch in this folder, then help me deploy it to Vercel's free hosting. I'm a beginner, so explain each step simply as you go, tell me exactly what commands to run, and check that everything works before moving on. (This PROMPT.md file is my instructions; leave it in the folder.)

## About me and the purpose of the site
- Name: Victor Ekwemalor
- I am a Christian content creator. I make voiceover storytelling videos that share biblical and spiritual messages.
- My mission: to make Jesus Christ known, not myself.
- My motto: "I have no desire to be known. I want HIM to be known."
- My key verse: John 3:30, "He must increase, but I must decrease." (KJV)
- Hashtag I use: #EyesOnJesus
- Location line I use: "In Christ Jesus"

The site must be Christ-centred: Jesus is the focus, not me. Use scripture throughout (King James Version).

## Tech stack
- Next.js (latest stable, App Router) with TypeScript
- Tailwind CSS for styling
- An API route for the contact form that sends emails to my Gmail using Nodemailer with a Gmail App Password
- Deploy target: Vercel (free Hobby plan)
- Keep it simple. No database, no login, no paid services.

## Design
- Colour palette: black and white only, with greys for subtle contrast. No other colours.
- Style: clean, calm, elegant and reverent. Plain but beautiful, not dramatic. Lots of white space.
- Fonts (from Google Fonts via next/font): an elegant serif for headings (e.g. Cormorant Garamond or Playfair Display) and a clean sans-serif for body text (e.g. Inter).
- A thin, simple cross (a minimal SVG line cross) used tastefully as a design accent, e.g. as a divider between sections.
- Subtle, gentle fade-in animations only. Respect "prefers-reduced-motion".
- Fully responsive: must look excellent on iPhone first, then tablet and desktop.
- Accessible: good contrast, alt text, keyboard navigable, proper heading order.

## Logo
- I have my own logo that I will add later.
- Create a clear place for it: the file should go at /public/logo.png.
- Show the logo in the top-left of the navigation bar on every page AND large and centred at the top of the Home page hero.
- Until I add my logo, show a tasteful placeholder: a simple circle containing a thin cross and the text "VE". When /public/logo.png exists, it should be used instead. Explain to me exactly how to add/replace the logo file.
- Also set up a favicon that I can replace with my logo later, and explain how.

## Site structure (3 pages + shared layout)
Shared on all pages:
- Navigation bar: logo (left), links to Home, About, Contact (right). Mobile hamburger menu.
- Footer: "I have no desire to be known. I want HIM to be known." with a small cross, John 3:30, social media icon links (Instagram, TikTok, Facebook, X, YouTube), and "(c) [current year] Victor Ekwemalor. To God be the glory."

### 1. Home page
- Hero: large logo, the motto as the main heading, John 3:30 beneath it, and two buttons: "My Story" (links to About) and "Get in Touch" (links to Contact).
- Section "Why I Do This": a short paragraph about using storytelling and film to share the gospel so that people encounter Jesus.
- Section "What I Share": three simple cards: "Bible Stories Retold", "Testimonies of Faith", "Daily Encouragement", each with one sentence.
- Section "Witnesses in John": a short scripture highlight featuring John 1:7 ("The same came for a witness, to bear witness of the Light, that all men through him might believe.") and John 20:31.
- Section "Follow the Journey": links to my social platforms.
- A closing line: "#EyesOnJesus" with a small cross.

### 2. About page
- Heading: "About Me"
- Opening statement: "A born-again servant of Jesus Christ, saved by grace and called to proclaim the gospel of our Lord Jesus Christ to the ends of the earth."
- "My Story": a placeholder paragraph I will rewrite later, clearly marked in the code with a comment.
- "What I Believe": a short, clear statement of faith in simple bullet points: one God (Father, Son and Holy Spirit); Jesus Christ is the Son of God, died for our sins and rose again; salvation is by grace through faith in Jesus; the Bible is the inspired Word of God; the Holy Spirit empowers believers; Jesus will return.
- "My Purpose": making Jesus known through storytelling, with John 3:30 and Mark 16:15 ("Go ye into all the world, and preach the gospel to every creature.").
- A closing call: "If my content has touched you, I'd love to hear from you" with a button to Contact.

### 3. Contact page
- Heading: "Get in Touch", with a short warm line inviting people to share prayer requests, testimonies, questions, or collaboration ideas.
- Contact form fields: Name (required), Email (required, validated), Subject (dropdown: Prayer Request, Testimony, Question about Faith, Collaboration, Other), Message (required).
- On submit: show a loading state, then a success message ("Thank you. Your message has been received. God bless you.") or a friendly error message.
- Also display my contact details (see the settings file below) with clickable mailto: and tel: links, but ONLY if the showContactDetails setting is true.
- Show the social links here as well.

## Settings file
Put all my personal details and links in ONE file (e.g. /lib/site-config.ts) so I can edit everything in one place without touching the pages:
- name: "Victor Ekwemalor"
- email: "victorkriss70@gmail.com"
- phone: "+44 7350 158316"
- showContactDetails: true   (if false, hide my email and phone on the site; the form must still work)
- social links:
  - tiktok: "https://www.tiktok.com/@victorekwemalor"
  - instagram, facebook, x, youtube: placeholder URLs I will replace later
- motto, key verse, and hashtag

## Contact form backend (Gmail)
- Create an API route (e.g. /app/api/contact/route.ts) that receives the form and sends me an email using Nodemailer through Gmail's SMTP with an App Password.
- The email is sent FROM my Gmail TO my Gmail, with the visitor's email set as "replyTo" so I can just hit Reply. The subject line should be "[Website] {Subject} - from {Name}".
- Format the email nicely in HTML, and also include a plain-text version.
- Secrets must NEVER be written in the code. Read them from environment variables:
  - GMAIL_USER
  - GMAIL_APP_PASSWORD
  - CONTACT_TO_EMAIL
- Create a .env.local for my local testing (and make sure it is in .gitignore) and a .env.example with empty values to show what's needed.
- Validate all input on the server too (required fields, valid email, sensible maximum lengths) and sanitise it before putting it in the email.
- Add simple spam protection: a hidden "honeypot" field that bots fill in (silently reject if filled), plus a basic per-IP rate limit (e.g. max 5 messages per 10 minutes).
- Return clear JSON success/error responses to the form.

## SEO and sharing
- Set proper page titles and descriptions for each page (e.g. "Victor Ekwemalor | Make Him Known").
- Add Open Graph tags so the link looks good when shared on WhatsApp, Instagram, X and Facebook.
- Add a robots.txt and sitemap.

## Quality checks before deployment
- Run the site locally and walk me through testing every page on desktop and on mobile size.
- Test the contact form end to end so I actually receive the email in my Gmail.
- Run the production build (npm run build) and fix every error and warning.

## Deployment to Vercel
After everything works locally, guide me step by step to:
1. Create a GitHub repository and push the code (make sure .env.local is NOT uploaded).
2. Import the repository into Vercel.
3. Add the three environment variables (GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL) in the Vercel project settings.
4. Deploy, then test the live contact form.
5. Explain how future updates work (edit, commit, push, and Vercel redeploys automatically).
6. Explain how I could connect a custom domain later if I buy one.

## Documentation
Write a README.md in plain, beginner-friendly English explaining: how to run the site, how to change my details in the settings file, how to add my logo, how to edit page text, how to hide my phone/email, and how to deploy updates.

Work through this in stages: (1) project setup, (2) layout, navigation, footer and logo, (3) Home page, (4) About page, (5) Contact page and email backend, (6) SEO, testing and build, (7) deployment. At the end of each stage, show me what you did and how to preview it before continuing.
