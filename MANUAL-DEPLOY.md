# Manual Render Deployment (More Reliable)

The Blueprint deploy is having issues. Let's do it manually - it's actually easier!

## 🚀 Simple Manual Deployment Steps

### Step 1: Go to Render Dashboard
https://dashboard.render.com

### Step 2: Click "New +" Button
- In the top right corner
- Select **"Web Service"**

### Step 3: Connect Repository
- Click **"Connect a repository"**
- OR if you see "Build and deploy from a Git repository", click **"Next"**
- Find and select: `lucasblake01-ux/fund-manager-monitor`
- Click **"Connect"**

### Step 4: Fill In Settings

**Basic Settings:**
- **Name**: `fund-manager-monitor` (or anything you want)
- **Region**: Oregon (or closest to you)
- **Branch**: `main`
- **Root Directory**: Leave blank OR type `backend`
- **Runtime**: **Python 3**

**Build & Deploy:**
- **Build Command**:
  ```
  pip install -r requirements.txt
  ```

- **Start Command**:
  ```
  uvicorn app.main:app --host 0.0.0.0 --port $PORT
  ```

**Instance Type:**
- Select: **Free** ($0/month)

### Step 5: Environment Variables (Optional)

Scroll down to "Environment Variables" section and click **"Add Environment Variable"**:

Add these (one at a time):
- `APP_NAME` = `Fund Manager Monitor API`
- `DEBUG` = `false`
- `CORS_ORIGINS` = `["*"]`

(These are optional - app will work without them)

### Step 6: Create Service!

- Scroll to bottom
- Click **"Create Web Service"** button
- Wait 3-5 minutes for build

### Step 7: Success! 🎉

When done:
- Status will show: ✅ "Live"
- You'll see your URL: `https://fund-manager-monitor-xxxx.onrender.com`
- Click it to test!

---

## ✅ Testing Your Deployment

Visit these URLs (replace with YOUR url):

1. **Health Check**:
   `https://your-url.onrender.com/api/v1/health`

2. **API Docs** (Interactive):
   `https://your-url.onrender.com/docs`

3. **Root**:
   `https://your-url.onrender.com/`

---

## 🎯 What You'll Be Able To Do

Use the **API Docs** at `/docs` to:
- ✅ Add funds
- ✅ View funds
- ✅ Run scraping
- ✅ View changes
- ✅ All features work!

---

## 💡 This Should Work!

Manual deploy is more reliable than Blueprint. You're just filling in a form!

**Any questions?** Let me know what step you're on!
