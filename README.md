# Fund Manager Monitor

An automated system that tracks portfolio manager changes across multiple funds and sources.

## 🚀 One-Click Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/lucasblake01-ux/fund-manager-monitor)

Click the button above to deploy your own instance! No coding required.

## Features

- **Dashboard** - Overview of funds, recent changes, and scraping status
- **Fund Management** - Add, edit, and manage up to 300+ funds
- **Automated Scraping** - Daily monitoring from Citywire, company websites, and Google
- **Changes Feed** - Timeline view of all detected portfolio manager changes
- **Email Notifications** - Optional email alerts for new changes
- **Multi-Source Support** - Track funds across multiple data sources

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation and serialization
- **APScheduler** - Scheduled scraping jobs
- **BeautifulSoup & Selenium** - Web scraping
- **SQLite** - Database (easily upgradeable to PostgreSQL)

### Frontend
- **React + TypeScript** - Type-safe UI development
- **Material UI v7** - Modern component library
- **Axios** - HTTP client
- **Vite** - Fast build tool

## Quick Start

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **npm or yarn**

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd fund-manager-monitor
   ```

2. **Run the setup script:**
   ```bash
   chmod +x scripts/dev-setup.sh
   ./scripts/dev-setup.sh
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

This starts both services:
- Backend API: http://localhost:8000
- Frontend UI: http://localhost:3000
- API Docs: http://localhost:8000/docs

### Manual Setup

If the script doesn't work, follow these steps:

#### Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```

#### Start Services
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Usage Guide

### 1. Add Funds

Navigate to **Funds** and click **Add Fund**:
- Enter fund name (required)
- Optionally add ISIN, description, and tags
- Save the fund

**Bulk Import:** You can also import multiple funds via the API:
```bash
curl -X POST http://localhost:8000/api/v1/funds/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "funds": [
      {"name": "Jupiter European Growth Fund"},
      {"name": "Fidelity Global Equity Fund"}
    ]
  }'
```

### 2. Run Scraping

From the **Dashboard**, click **Run Scraping** to start monitoring:
- Scraping runs across all funds
- Changes are detected and logged
- Results appear in the **Changes Feed**

**Scheduled Scraping:**
- Automatically runs daily at 8:00 AM (configurable in `.env`)
- Set `SCRAPING_SCHEDULE_HOUR` and `SCRAPING_SCHEDULE_MINUTE`

### 3. View Changes

Navigate to **Changes Feed** to see:
- Manager joined/left/changed events
- Fund details and timestamps
- Source information with links
- Filter by time period or change type

### 4. Email Notifications

Go to **Settings** to subscribe:
- Enter your email address
- Click **Subscribe**
- Receive alerts when changes are detected

**Note:** Email is currently in stub mode. To enable actual emails:
1. Update SMTP settings in `backend/.env`
2. Configure SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
3. Restart the backend

## API Documentation

### Interactive Docs
Visit http://localhost:8000/docs for interactive Swagger UI

### Key Endpoints

#### Funds
- `GET /api/v1/funds` - List all funds
- `POST /api/v1/funds` - Create fund
- `POST /api/v1/funds/bulk` - Bulk import
- `PATCH /api/v1/funds/{id}` - Update fund
- `DELETE /api/v1/funds/{id}` - Delete fund

#### Changes
- `GET /api/v1/changes` - List all changes
- `GET /api/v1/changes/recent?days=7` - Recent changes
- `GET /api/v1/changes/fund/{fund_id}` - Changes for specific fund

#### Scraping
- `POST /api/v1/scraping/run` - Trigger scraping
- `GET /api/v1/scraping/status` - Get scraping status
- `GET /api/v1/scraping/history` - Job history

#### Users
- `POST /api/v1/users/subscribe` - Subscribe to notifications
- `POST /api/v1/users/unsubscribe` - Unsubscribe

## Configuration

### Backend (.env)
```env
APP_NAME=Fund Manager Monitor API
DEBUG=true
PORT=8000

# Scraping Schedule (24-hour format)
SCRAPING_SCHEDULE_HOUR=8
SCRAPING_SCHEDULE_MINUTE=0

# Email (configure for actual email delivery)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_VERSION=v1
VITE_APP_NAME=Fund Manager Monitor
```

## Development

### Project Structure
```
fund-manager-monitor/
├── backend/
│   ├── app/
│   │   ├── api/v1/        # API endpoints
│   │   ├── models/        # Pydantic models
│   │   ├── services/      # Business logic
│   │   └── core/          # Configuration
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API clients
│   │   ├── types/         # TypeScript types
│   │   └── styles/        # CSS styles
│   └── package.json
└── scripts/               # Setup scripts
```

### Testing

```bash
# Backend tests
cd backend
source venv/bin/activate
pytest

# Frontend tests
cd frontend
npm run test
```

### Linting

```bash
# Backend
cd backend
ruff check .
black .

# Frontend
cd frontend
npm run lint
```

## Deployment

### Production Considerations

1. **Database:** Upgrade from SQLite to PostgreSQL
   - Update `DATABASE_URL` in backend `.env`
   - Install `psycopg2` dependency

2. **Email:** Configure SMTP for actual email delivery
   - Use SendGrid, AWS SES, or your SMTP server
   - Update email service in `backend/app/services/notification.py`

3. **Scraping:** Implement actual web scraping logic
   - Currently stubbed for prototype
   - Add parsers for Citywire, company sites, Google
   - Respect robots.txt and rate limits

4. **Authentication:** Add user authentication if needed
   - Implement JWT tokens
   - Add user login/registration

### Docker Deployment

```bash
# Build images
docker build -t fund-monitor-backend ./backend
docker build -t fund-monitor-frontend ./frontend

# Run with docker-compose
docker-compose up -d
```

## Roadmap

- [ ] Real web scraping implementation (Citywire, company sites)
- [ ] PostgreSQL database support
- [ ] Actual email delivery via SMTP/SendGrid
- [ ] User authentication and multi-user support
- [ ] Fuzzy fund name matching across sources
- [ ] Historical change tracking and analytics
- [ ] Export changes to CSV/Excel
- [ ] Mobile-responsive improvements
- [ ] Webhook notifications (Slack, Teams)

## Support

For issues or questions:
1. Check the API documentation at `/docs`
2. Review logs in terminal output
3. Verify `.env` configuration

## License

Proprietary - Internal use only

---

**Version:** 1.0.0 (Prototype)
