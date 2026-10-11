# Victor Ekwemalor | Make Him Known

> "He must increase, but I must decrease." (John 3:30, KJV)

My personal Christian ministry website. Built with Next.js, TypeScript and Tailwind CSS, hosted free on Vercel.

---

## 1. Running the site on your computer

You only need to do the install step once.

1. Open the **Terminal** app.
2. Go to the project folder:
   ```
   cd "/Users/victorekwemalor/Desktop/NEW PROJECTS/VICTOR EKWEMALOR - SITE/Ministry_Victor_Ekwemalor"
   ```
3. Install everything the site needs (first time only):
   ```
   npm install
   ```
4. Start the site:
   ```
   npm run dev
   ```
5. Open **http://localhost:3000** in your browser.
6. To stop the site, go back to Terminal and press `Ctrl + C`.

While it is running, any file you save updates the browser straight away.

**To see the mobile view on your computer:** in Safari, turn on Settings → Advanced → "Show features for web developers", then use Develop → Enter Responsive Design Mode and pick an iPhone.

**To see it on your real iPhone:** make sure your phone is on the same Wi-Fi, then open the "Network" address that Terminal shows (for example `http://192.168.1.137:3000`).

---

## 2. Changing your details (the settings file)

All your personal details live in **one file**: `lib/site-config.ts`

Open it in any text editor (VS Code is a good free one). Change:

- `name`, `email`, `phone`
- `motto`, `keyVerse`, `hashtag`
- your social media links under `social`

Keep the quotes `"..."` and the commas. Save the file and the whole site updates.

**Social links:** your profile links are under `social`. To change one, paste the new link between the quotes. To hide a platform completely, delete its whole line.

---

## 3. Hiding your phone number and email

In `lib/site-config.ts`, change:

```ts
showContactDetails: true,
```

to

```ts
showContactDetails: false,
```

Your email and phone disappear from the Contact page. The contact form keeps working.

---

## 4. Your logo and icons

| File | What it is | Where it shows |
| ---- | ---------- | -------------- |
| `public/logo.png` | Full logo, black, transparent background | Large at the top of the Home page |
| `public/logo-white.png` | Full logo, white, transparent background | For any dark sections |
| `public/logo-icon.png` | Cross only, transparent background | Navigation bar (top-left) |
| `app/icon.png` | Cross on white, 512 × 512 | Browser tab (favicon) |
| `app/apple-icon.png` | Cross on white, 180 × 180 | iPhone home-screen icon |
| `assets/original-logo.png` | Your original logo file | Not shown on the site (kept as the master copy) |

**To replace any of them:** save the new image with exactly the same name in the same folder (overwrite the old one), then commit and push. Keep names lowercase. If a logo file is missing, the site falls back to a simple "VE" placeholder.

---

## 5. Editing the text on each page

| Page    | File                  |
| ------- | --------------------- |
| Home    | `app/page.tsx`        |
| About   | `app/about/page.tsx`  |
| Contact | `app/contact/page.tsx` |
| Footer  | `components/Footer.tsx` |

Open the file, find the words you want to change, edit only the words (not the code around them), and save.

**"My Story"** on the About page is a placeholder. In `app/about/page.tsx`, look for the comment that says
`PLACEHOLDER: REWRITE "MY STORY" HERE` and replace the paragraph underneath it.

The "What I Share" cards (Home) and "What I Believe" points (About) are lists near the top of their files, so they are easy to edit.

---

## 6. The contact form (Gmail)

Messages from the form are emailed to you through Gmail. This needs three private settings. They are **never** written in the code.

| Setting              | What it is                                   |
| -------------------- | -------------------------------------------- |
| `GMAIL_USER`         | Your Gmail address                           |
| `GMAIL_APP_PASSWORD` | A 16-character Gmail **App Password**        |
| `CONTACT_TO_EMAIL`   | Where messages should go (your Gmail)        |

**Getting an App Password:**

1. Turn on 2-Step Verification on your Google account.
2. Go to https://myaccount.google.com/apppasswords
3. Create one called "Website" and copy the 16 characters.

**On your computer:** put the values in the file `.env.local` (already created for you), then restart the site.
**On Vercel:** add them under Project → Settings → Environment Variables (see below).

`.env.local` is private. It is listed in `.gitignore`, so it is never uploaded to GitHub. `.env.example` shows which settings are needed, with no real values.

Built-in protection: a hidden "honeypot" field catches spam bots, and each visitor can send at most 5 messages every 10 minutes.

---

## 7. Deploying updates

Once the site is connected to GitHub and Vercel, updating is three commands:

```
git add .
git commit -m "Describe what you changed"
git push
```

Vercel notices the push and rebuilds the live site automatically in about a minute.

Before pushing, you can check that everything builds without errors:

```
npm run build
```

---

## Project layout

```
app/
  page.tsx              Home page
  about/page.tsx        About page
  contact/page.tsx      Contact page
  api/contact/route.ts  Sends contact form emails
  layout.tsx            Shared layout (navigation, footer, page titles)
  icon.png, apple-icon.png  Browser tab and iPhone icons
  opengraph-image.tsx   Preview image when the link is shared
  robots.ts, sitemap.ts For search engines
components/             Reusable pieces (logo, navigation, footer, cross, form)
lib/site-config.ts      ⭐ Your settings: edit this one
public/                 Logo images (logo.png, logo-white.png, logo-icon.png)
```

To God be the glory. #EyesOnJesus
