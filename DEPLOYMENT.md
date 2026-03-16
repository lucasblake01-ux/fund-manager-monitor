# 🚀 Deploy Your Fund Manager Monitor to the Web

## Simple 3-Step Deployment (No Coding Required!)

Your app is ready to deploy to **Render.com** - a free hosting platform. Follow these steps:

---

## Step 1: Create a GitHub Account & Upload Your Code

### 1.1 Create GitHub Account (if you don't have one)
- Go to https://github.com
- Click "Sign up"
- Create your free account

### 1.2 Create a New Repository
- Once logged in, click the **+** icon (top right)
- Click **"New repository"**
- Name it: `fund-manager-monitor`
- Make it **Private** (recommended)
- Click **"Create repository"**

### 1.3 Upload Your Code
**Option A: Use GitHub Desktop (Easiest)**
1. Download GitHub Desktop: https://desktop.github.com
2. Install and sign in with your GitHub account
3. Click "Add" > "Add Existing Repository"
4. Select this folder: `/home/coder/data/fund-manager-monitor`
5. Click "Publish repository" button
6. Done!

**Option B: Use Command Line**
Run these commands in your terminal:
```bash
cd /home/coder/data/fund-manager-monitor
git remote add origin https://github.com/YOUR-USERNAME/fund-manager-monitor.git
git push -u origin main
```
(Replace `YOUR-USERNAME` with your actual GitHub username)

---

## Step 2: Sign Up for Render.com

1. Go to https://render.com
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Render to access your GitHub
5. You're now logged into Render!

---

## Step 3: Deploy Your App

### 3.1 Connect Your Repository
1. In Render dashboard, click **"New +"** button
2. Select **"Web Service"**
3. Click **"Connect a repository"**
4. Find and select your `fund-manager-monitor` repository
5. Click **"Connect"**

### 3.2 Configure Deployment (Render will auto-detect most settings)
- **Name**: `fund-manager-monitor` (or choose your own)
- **Region**: Choose closest to you (e.g., Oregon)
- **Branch**: `main`
- **Build Command**: Should auto-fill from `render.yaml`
- **Start Command**: Should auto-fill from `render.yaml`
- **Plan**: Select **"Free"** ($0/month)

### 3.3 Add Disk Storage (Important!)
- Scroll to **"Advanced"** section
- Click **"Add Disk"**
- Name: `fund-monitor-data`
- Mount Path: `/opt/render/project/src/backend`
- Size: `1 GB` (free tier)

### 3.4 Deploy!
- Click **"Create Web Service"** button
- Render will start building your app (takes 5-10 minutes)
- You'll see logs as it builds
- Wait for "Deploy succeeded" message

---

## Step 4: Access Your Website! 🎉

Once deployment succeeds:
1. Render will show you a URL like: `https://fund-manager-monitor.onrender.com`
2. Click that URL or copy it to your browser
3. Your Fund Manager Monitor is live!

### Your Website Will:
- ✅ Load the dashboard
- ✅ Let you add funds
- ✅ Run scraping jobs
- ✅ Track manager changes
- ✅ Work from any device with internet

---

## Important Notes

### Free Tier Limitations
- Your app will "sleep" after 15 minutes of no activity
- First visit after sleeping takes 30-50 seconds to wake up
- This is normal for free tier
- Upgrade to paid plan ($7/month) for always-on service

### Data Persistence
- Your database and data are saved permanently in the disk storage
- Funds and changes will persist between visits
- Don't delete the disk storage or you'll lose data

### If Deployment Fails
1. Check the build logs in Render
2. Common issues:
   - **Node version**: Make sure Node 18+ is installed
   - **Python version**: Should use Python 3.9+
   - **Missing dependencies**: All are in requirements.txt and package.json

---

## What You Get

### Your Live Website Features:
- **Dashboard**: Overview of funds and changes
- **Fund Management**: Add/edit/delete funds
- **Scraping**: Manual trigger or scheduled daily
- **Changes Feed**: Timeline of manager changes
- **Settings**: Email notifications (configure SMTP)

### Your URLs:
- **Main App**: `https://your-app-name.onrender.com`
- **API Docs**: `https://your-app-name.onrender.com/docs`
- **Health Check**: `https://your-app-name.onrender.com/api/v1/health`

---

## Need Help?

### Render Support
- Documentation: https://render.com/docs
- Community: https://community.render.com

### Common Questions

**Q: How do I update my app after making changes?**
A: Just push new code to GitHub, and Render will auto-deploy!

**Q: Can I use a custom domain?**
A: Yes! Render supports custom domains (even on free tier)
   - Go to Settings > Custom Domains
   - Add your domain (e.g., fundmonitor.com)

**Q: How do I add more funds?**
A: Use the UI, or bulk import via API:
```bash
curl -X POST https://your-app-name.onrender.com/api/v1/funds/bulk \
  -H "Content-Type: application/json" \
  -d '{"funds": [{"name": "Fund 1"}, {"name": "Fund 2"}]}'
```

**Q: How do I enable email notifications?**
A: Add SMTP credentials in Render:
   - Go to Environment tab
   - Add: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
   - Restart the service

---

## You're Done! 🎉

Your Fund Manager Monitor is now a **real website** accessible from anywhere!

Share your URL with colleagues or access it on your phone, tablet, or any device.

---

**Version**: 1.0.0
**Last Updated**: 2026-03-16
