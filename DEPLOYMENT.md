# HintForge - Complete Deployment Guide

This guide will help you deploy your HintForge application to the internet so others can use it.

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Understanding API Keys (IMPORTANT)](#understanding-api-keys)
3. [Deploy to Vercel](#deploy-to-vercel)
4. [Setup Custom Domain](#setup-custom-domain)
5. [Configure Environment Variables](#configure-environment-variables)
6. [Verify Deployment](#verify-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you start, make sure you have:

- ✅ GitHub account (you already have this)
- ✅ GitHub Student Developer Pack activated
- ✅ Your code pushed to a GitHub repository
- ✅ Supabase account with your database set up
- ✅ OpenRouter API key

---

## Understanding API Keys (IMPORTANT)

### ❓ Why API keys are NOT shown publicly

**Your API keys should NEVER be in your code!** Here's why:

- If someone sees your OpenRouter API key, they can use YOUR credits
- If someone gets your Supabase keys, they can access YOUR database
- API keys = passwords to your services

### ✅ How your app works WITHOUT exposing keys

Your app uses **environment variables** which are stored securely on the server:

1. **Local Development (.env.local)** - Only on your computer
2. **Production (Vercel)** - Stored in Vercel's secure dashboard
3. **Your Code** - Only references the variable names, NOT the actual keys

```
❌ BAD: const apiKey = "sk-1234567890abcdef"
✅ GOOD: const apiKey = process.env.OPENROUTER_API_KEY
```

When deployed, Vercel injects these keys at runtime, so they're never exposed to users.

---

## Deploy to Vercel

Vercel is **FREE** and perfect for Next.js apps. GitHub Student Pack gives you extra benefits!

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### Step 2: Push Your Code to GitHub

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit - HintForge app"

# Create a new repository on GitHub (github.com/new)
# Then connect and push:
git remote add origin https://github.com/YOUR-USERNAME/dsa-tool.git
git branch -M main
git push -u origin main
```

### Step 3: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your `dsa-tool` repository
4. Configure project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

5. **IMPORTANT**: Before clicking "Deploy", click "Environment Variables"

---

## Configure Environment Variables

You need to add your API keys to Vercel so your app can use them.

### Step 1: Add Environment Variables in Vercel

In the Vercel deployment screen, add these variables:

#### Required Variables:

| Variable Name | Where to Get It | Example Value |
|--------------|----------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API → anon public | `eyJhbGciOi...` (long key) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → service_role | `eyJhbGciOi...` (long key) |
| `OPENROUTER_API_KEY` | OpenRouter Dashboard → Keys | `sk-or-v1-...` |

#### Optional (but recommended):

| Variable Name | Value | Purpose |
|--------------|-------|---------|
| `RATE_LIMIT_MAX_REQUESTS` | `20` | Max requests per minute per user |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate limit window (60 seconds) |

### Step 2: How to Find Your Keys

#### Supabase Keys:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "Settings" (⚙️) in sidebar
4. Click "API"
5. Copy:
   - **URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ KEEP THIS SECRET!)

#### OpenRouter API Key:
1. Go to https://openrouter.ai/keys
2. Copy your API key
3. Paste as `OPENROUTER_API_KEY`

### Step 3: Deploy!

1. After adding all environment variables, click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://dsa-tool-abc123.vercel.app`

---

## Setup Custom Domain

With GitHub Student Pack, you get a **FREE .me domain** from Namecheap!

### Step 1: Get Free Domain

1. Go to https://education.github.com/pack
2. Find "Namecheap" in the list
3. Click "Get access" → Get your free .me domain for 1 year
4. Choose a domain name (e.g., `dsatutor.me`, `codepractice.me`)
5. Complete registration

### Step 2: Connect Domain to Vercel

1. In Vercel, go to your project
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your domain (e.g., `dsatutor.me`)
5. Vercel will show DNS records to add

### Step 3: Update DNS in Namecheap

1. Go to Namecheap Dashboard → Domain List
2. Click "Manage" on your domain
3. Go to "Advanced DNS"
4. Add these records (Vercel will tell you exact values):

   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   ```

5. Wait 5-30 minutes for DNS to propagate
6. Your site will be live at `https://yourdomain.me`

---

## Verify Deployment

### Test Your Deployment:

1. **Visit your site** - Open your Vercel URL or custom domain
2. **Test problem solving**:
   - Go to "Solve Problem" page
   - Paste a coding problem
   - Click "Analyze Problem" - Should work!
   - Request hints - Should work!
   - Submit code - Should work!
3. **Check history** - Your sessions should save
4. **Check patterns** - Pattern tracking should work

### Common Issues After Deployment:

#### ❌ "Failed to analyze problem"
- **Cause**: OpenRouter API key not set or invalid
- **Fix**: Go to Vercel → Settings → Environment Variables → Check `OPENROUTER_API_KEY`

#### ❌ "Database error" or "Failed to fetch history"
- **Cause**: Supabase keys not set correctly
- **Fix**: Verify all 3 Supabase environment variables in Vercel

#### ❌ "Rate limit exceeded"
- **Cause**: Too many requests (normal behavior)
- **Fix**: Wait 1 minute or increase `RATE_LIMIT_MAX_REQUESTS`

---

## Post-Deployment Checklist

- [ ] Site loads at your URL
- [ ] Can analyze problems
- [ ] Can get hints (all 5 levels)
- [ ] Can submit code and get feedback
- [ ] History page shows past problems
- [ ] Patterns page tracks progress
- [ ] Custom domain working (if set up)

---

## Sharing Your App

Now that your app is deployed, you can share it with:

- **Friends**: Send them your URL
- **Resume/Portfolio**: Add as a project
- **Social Media**: Share on LinkedIn, Twitter
- **GitHub README**: Add deployment link

### Add Deployment Badge to GitHub

Add this to your repository's `README.md`:

```markdown
## 🚀 Live Demo

**[Visit HintForge](https://your-domain.me)** ← Replace with your URL

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/dsa-tool)
```

---

## Troubleshooting

### Build Failed on Vercel

**Error**: `Type error: Property 'X' does not exist`
- **Fix**: Run `npm run build` locally first to catch TypeScript errors

**Error**: `Module not found`
- **Fix**: Make sure all dependencies are in `package.json`, run `npm install`

### Environment Variables Not Working

1. Check spelling (case-sensitive!)
2. Remove quotes around values in Vercel
3. Redeploy after adding variables (click "Redeploy" in Vercel)

### Database Connection Issues

1. Verify Supabase project is not paused (free tier auto-pauses after inactivity)
2. Check Row Level Security (RLS) policies allow public access for anonymous users
3. Test Supabase connection in their dashboard SQL editor

### OpenRouter API Not Working

1. Check your OpenRouter credits: https://openrouter.ai/credits
2. Verify model availability: `nvidia/nemotron-3-nano-30b-a3b:free`
3. Test API key with the test script: `node test-openrouter.js`

---

## Cost Breakdown (FREE!)

| Service | Cost | What You Get |
|---------|------|-------------|
| **Vercel** | FREE | Hosting, SSL, CDN, Auto-deployments |
| **Supabase** | FREE | Database, 500MB storage, 2GB bandwidth |
| **OpenRouter** | FREE | $0.20 free credits (~200 requests) |
| **Domain (.me)** | FREE (1 year) | From GitHub Student Pack |
| **Total** | **$0** | Fully functional app! |

### After Free Credits:

- **OpenRouter**: Pay as you go ($0.0002 per request with free model)
- **Domain**: ~$10/year to renew
- **Vercel**: Free forever for hobby projects
- **Supabase**: Free forever (with limits)

---

## Updating Your Deployed App

When you make changes:

```bash
# 1. Make your changes locally
# 2. Test them (npm run dev)
# 3. Commit and push to GitHub
git add .
git commit -m "Description of changes"
git push

# 4. Vercel automatically detects and redeploys! 🎉
```

**Auto-deployment** is enabled by default. Every push to `main` branch = new deployment.

---

## Security Best Practices

### ✅ DO:
- Keep `.env.local` in `.gitignore` (already done)
- Use environment variables for all secrets
- Regenerate API keys if accidentally exposed
- Enable Supabase RLS (Row Level Security)
- Monitor OpenRouter usage for unusual activity

### ❌ DON'T:
- Commit `.env.local` to GitHub
- Share your API keys publicly
- Use service_role key in client-side code
- Disable RLS in production

---

## Getting Help

If you run into issues:

1. **Vercel Docs**: https://vercel.com/docs
2. **Supabase Docs**: https://supabase.com/docs
3. **Next.js Docs**: https://nextjs.org/docs
4. **Check Vercel Logs**: Project → Deployments → Click deployment → Logs

---

## 🎉 Congratulations!

You've deployed your first full-stack application! 

**Your app is now live and accessible to everyone on the internet.**

### Next Steps:
- Share your project on LinkedIn
- Add it to your resume/portfolio
- Get feedback from friends
- Keep building and improving

**Good luck with your DSA learning journey!** 🚀

---

## Appendix: Manual Deployment (Alternative)

If you prefer not to use Vercel, here are alternatives:

### Option 2: Railway
- Similar to Vercel, free tier available
- https://railway.app

### Option 3: Netlify
- Another Vercel alternative
- https://netlify.com

### Option 4: Self-hosting (VPS)
- Requires more setup
- Options: DigitalOcean, AWS, Google Cloud (free credits in GitHub Student Pack)
- Not recommended for beginners

**Recommended: Stick with Vercel for easiest deployment!**
