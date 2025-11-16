# MI Evening Dresses - Deployment & Setup Guide

## Quick Start (5 minutes)

### Backend
```bash
cd backend
npm install

# Create .env file with:
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/mibeyoung
PORT=5000
TELEGRAM_BOT_TOKEN=<your_telegram_bot_token>
TELEGRAM_CHAT_ID=<your_chat_id>
USD_TO_UAH=36.7
JWT_SECRET=your_secret_key

npm run dev
```

### Frontend
```bash
cd frontend
npm install

# Create .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000

npm run dev
```

Access: http://localhost:3000

## Production Deployment

### AWS Amplify (Frontend)
1. Connect GitHub repository
2. Build settings: `npm install && npm run build`
3. Deploy

### AWS EC2 (Backend)
1. SSH into instance
2. `git clone <repo>`
3. `cd backend && npm install`
4. Create `.env` file
5. `npm start`

### Cloudflare DNS Setup
- Point domain to Cloudflare nameservers
- Create A record for backend (EC2 IP)
- Create CNAME for frontend (Amplify domain)
- Enable SSL/TLS

## Database Setup

### MongoDB Atlas
1. Create cluster at mongodb.com
2. Create database user
3. Whitelist IP addresses
4. Copy connection string to MONGO_URI

## Telegram Bot Setup

1. Message @BotFather on Telegram
2. Create new bot: `/newbot`
3. Get token
4. Create private group/channel
5. Add bot to group
6. Get chat ID:
   ```bash
   curl https://api.telegram.org/bot<TOKEN>/getUpdates
   ```

## Configuration File

`backend/config/config.json`:
```json
{
  "telegram_bot_token": "YOUR_TOKEN",
  "telegram_chat_id": "YOUR_CHAT_ID",
  "usd_to_uah": 36.7
}
```

## Monitoring

- Backend logs: `tail -f logs/app.log`
- MongoDB: MongoDB Atlas dashboard
- Frontend: AWS Amplify console

## Troubleshooting

**Port 5000 already in use:**
```bash
lsof -ti:5000 | xargs kill -9
```

**MongoDB connection error:**
- Check IP whitelist
- Verify credentials
- Check connection string

**Telegram notifications not working:**
- Verify bot token is correct
- Check chat ID is valid
- Ensure bot is member of chat

## Next Steps

1. Customize designs in `frontend/styles/`
2. Add products via admin panel
3. Set exchange rate
4. Connect Telegram notifications
5. Configure domain
