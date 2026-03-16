# 🚀 Deploy in 10 Minutes - Quick Reference

## What You're Doing
Turning your local app into a **real website** anyone can access!

---

## ✅ Prerequisites (5 minutes)
1. **GitHub Account** - https://github.com (free)
2. **Render Account** - https://render.com (free)
   - Sign up with GitHub for easier setup

---

## 📤 Step 1: Upload Code to GitHub (3 minutes)

### Easiest Way: GitHub Desktop
1. Download: https://desktop.github.com
2. Install & sign in
3. Add this folder: `/home/coder/data/fund-manager-monitor`
4. Click "Publish repository"
5. ✅ Done!

### Alternative: Command Line
```bash
# Your code is already committed! Just need to push:
cd /home/coder/data/fund-manager-monitor
git remote add origin https://github.com/YOUR-USERNAME/fund-manager-monitor.git
git push -u origin main
```

---

## 🌐 Step 2: Deploy on Render (5 minutes)

1. **Go to Render**: https://dashboard.render.com
2. **Click**: "New +" → "Web Service"
3. **Connect**: Your GitHub repo `fund-manager-monitor`
4. **Settings** (auto-filled from render.yaml):
   - Name: `fund-manager-monitor`
   - Plan: **Free**
5. **Add Disk** (Important!):
   - Advanced → Add Disk
   - Name: `fund-monitor-data`
   - Mount: `/opt/render/project/src/backend`
   - Size: 1 GB
6. **Click**: "Create Web Service"
7. **Wait**: 5-10 minutes for build
8. **Done!** You'll get a URL like: `https://fund-manager-monitor.onrender.com`

---

## 🎉 Step 3: Use Your Website

Visit your new URL:
- **Dashboard**: Add funds and view changes
- **API Docs**: `your-url.com/docs`
- **Works on**: Any device, anywhere!

---

## 📝 Important Notes

**Free Tier Sleep Mode**
- App sleeps after 15 min inactive
- First visit after sleep: ~30-50 sec load
- Normal behavior - not broken!

**Your Data is Safe**
- Saved in persistent disk storage
- Funds & changes persist forever
- Database won't disappear

---

## 🆘 Troubleshooting

**Build fails?**
→ Check logs in Render dashboard
→ Verify render.yaml file exists

**App won't start?**
→ Wait for "Deploy succeeded" message
→ Check Environment variables set correctly

**URL not working?**
→ Wait for full deployment (check logs)
→ Try URL in new incognito tab

---

## 🔄 Update Your Website Later

When you make changes:
```bash
git add .
git commit -m "Your update message"
git push
```
Render auto-deploys! No extra steps needed.

---

## 📞 Need More Help?

**Full Guide**: See `DEPLOYMENT.md` in this folder
**Render Docs**: https://render.com/docs
**Your Code**: Everything is in `/home/coder/data/fund-manager-monitor`

---

**That's it! You're deploying a real web application! 🚀**
