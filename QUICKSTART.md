# Quick Start Guide

Get your Fund Manager Monitor up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
cd /home/coder/fund-manager-monitor
./scripts/dev-setup.sh
```

This will:
- Create Python virtual environment
- Install Python dependencies
- Install Node.js dependencies
- Create .env configuration files

## Step 2: Start the Application

```bash
npm run dev
```

This starts both services automatically:
- **Backend API**: http://localhost:8000
- **Frontend UI**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs

## Step 3: Add Your First Fund

1. Open http://localhost:3000 in your browser
2. Navigate to **Funds** in the top menu
3. Click **Add Fund**
4. Enter fund details:
   - Name: "Jupiter European Growth Fund"
   - Description: "European equity fund"
   - Tags: "Equity, Europe"
5. Click **Save**

## Step 4: Run Your First Scraping

1. Go to **Dashboard**
2. Click **Run Scraping**
3. Wait a few seconds for completion
4. Navigate to **Changes Feed** to see results

## Step 5: Subscribe to Notifications

1. Go to **Settings**
2. Enter your email address
3. Click **Subscribe**

**Note**: Email is currently stubbed. To enable real emails, configure SMTP in `backend/.env`

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Python Virtual Environment Issues

```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Node Modules Issues

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Manual Start (Alternative)

If `npm run dev` doesn't work, start services separately:

### Terminal 1 - Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

## Next Steps

1. **Bulk Import Funds**: Use the API to import your 300 funds
   ```bash
   curl -X POST http://localhost:8000/api/v1/funds/bulk \
     -H "Content-Type: application/json" \
     -d '{"funds": [{"name": "Fund 1"}, {"name": "Fund 2"}]}'
   ```

2. **Explore the API**: Visit http://localhost:8000/docs

3. **Configure Scraping**: Edit `backend/.env` to set scraping schedule

4. **Enable Emails**: Add SMTP credentials to `backend/.env`

## Need Help?

- Check the full README.md for detailed documentation
- Review API docs at http://localhost:8000/docs
- Check terminal output for error messages
