# 🚀 Your Complete Setup Guide
### Hosting + Contact Form · No coding needed · ~20 minutes total

---

## What's in this folder

```
mithun-v2/
  index.html           ← the website
  css/style.css        ← all the visual design
  js/app.js            ← all the page logic
  data/content.json    ← ALL your content lives here (this is the one you'll edit)
  SETUP-GUIDE.md       ← this file
```

---

## PART 1 — Set up your contact form (Formspree) · 5 minutes

This makes the contact form on your website actually send emails to you.

### Step 1
Go to **formspree.io** and click **Get Started Free**

### Step 2
Sign up with your email (the one you want to receive messages on)

### Step 3
Click **New Form** → name it anything (e.g. "Portfolio Contact")

### Step 4
You'll see a form ID that looks like this: `xpzgkrqw`
Copy that ID.

### Step 5
Open the file `data/content.json` in any text editor (on Mac: TextEdit works, or just double-click it)

Find this line near the top:
```
"formspreeId": "YOUR_FORMSPREE_ID"
```

Replace `YOUR_FORMSPREE_ID` with the ID you copied. For example:
```
"formspreeId": "xpzgkrqw"
```

Save the file.

✅ Your contact form will now send emails to you whenever someone fills it in.

---

## PART 2 — Put your website online (Netlify) · 10 minutes

### Step 1 — Create a GitHub account
Go to **github.com** → Sign up → enter your email, password, username → verify email

> Think of GitHub as a safe home for your website files. Netlify reads from it.

### Step 2 — Create a repository on GitHub
1. Click the **+** icon (top right of GitHub) → **New repository**
2. Name it: `mithun-portfolio`
3. Set visibility to **Public**
4. Click **Create repository**

### Step 3 — Upload your files
1. On the repository page, click **uploading an existing file**
2. Open your `mithun-v2` folder on your computer
3. Select ALL the files and folders inside it (index.html, css folder, js folder, data folder)
4. Drag them into the GitHub upload area
5. Scroll down → click **Commit changes**

### Step 4 — Deploy on Netlify
1. Go to **netlify.com** → click **Sign up** → choose **Sign up with GitHub**
2. Allow Netlify to access your GitHub account
3. Click **Add new site** → **Import an existing project**
4. Select **GitHub** → click on `mithun-portfolio`
5. Leave all settings as they are (no changes needed)
6. Click **Deploy site**

⏳ Wait about 60 seconds.

✅ **Your site is now live!** You'll get a URL like `delightful-swan-abc123.netlify.app`

---

## PART 3 — Get a better URL (optional) · 2 minutes, free

On Netlify:
1. Go to **Site configuration** → **Change site name**
2. Type something like: `mithunmurali-ibdesign`
3. Your URL becomes: `mithunmurali-ibdesign.netlify.app`

---

## PART 4 — Get a custom domain like mithunmurali.com (optional) · ~₹800/year

1. Go to **namecheap.com** and search for your preferred domain name
2. Buy it (takes 2 minutes with a card)
3. In Netlify → **Domain management** → **Add a domain**
4. Type your domain name and follow the 3 steps Netlify shows you
5. Done — takes about 30 minutes to go live globally

---

## How to update your website content later

All your text lives in ONE file: `data/content.json`

To edit it:
1. Go to **github.com** → open your `mithun-portfolio` repository
2. Click `data` → click `content.json`
3. Click the **pencil icon** (Edit this file) at the top right
4. Find the section you want to change, edit the text carefully
5. Click **Commit changes** (green button)

Your website updates automatically within 30 seconds.

### ⚠️ Important when editing content.json
- Keep all the `"quote marks"` intact
- Keep all the `,` commas in the right places
- Don't delete any `{` curly braces `}` or `[` square brackets `]`
- If you're unsure, copy the whole file first and paste it somewhere safe before editing

---

## Adding a new unit plan

In `content.json`, find the `"units"` section, then find the right MYP level.
Inside the `"units": [ ]` array for that level, add a new unit block.

Copy this template and fill in your details:
```json
{
  "id": "your-unit-id",
  "title": "Your Unit Title",
  "desc": "A short description of the unit.",
  "criteria": ["A", "B", "C", "D"],
  "focus": "Your Focus Skill",
  "duration": "X Weeks",
  "status": "outline"
}
```

Change `"status": "outline"` to `"status": "full"` only when you have all the detail ready.

---

## Files work on any computer

Whether you're on Mac or Windows — these are plain files. They work the same on everything. No special software needed to edit them (any text editor works).

---

## Need help?

Come back and tell me what you need. I'll walk you through it step by step.
