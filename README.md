# MI Evening Dresses Fashion E-Commerce Store

**Магазин по продаже эксклюзивных вечерних платьев "-=MI=-"**

## Project Description
Professional e-commerce platform for selling exclusive evening dresses. Built with Next.js, Node.js, Express, MongoDB, and integrated with Telegram Bot API for order notifications.

## Tech Stack

### Frontend
- **Next.js** 14+ (React, SSR, SSG, SEO optimization)
- **TailwindCSS** for styling with fashion design
- **i18next** for multilingual support (Ukrainian, English, Russian)
- **Axios** for API calls
- **Framer Motion** for animations

### Backend
- **Node.js** with **Express.js**
- **MongoDB** for database
- **Mongoose** for ORM
- **Telegram Bot API** for notifications
- **AWS S3** for media storage
- **JWT** for authentication

### Infrastructure
- **AWS EC2/Amplify** for hosting
- **Cloudflare** for DNS and CDN
- **GitHub** for version control

## Project Structure

```
mibeyoung-shop/
├── backend/
│   ├── index.js                    # Express app entry point
│   ├── package.json                # Backend dependencies
│   ├── models/
│   │   ├── Product.js              # Product MongoDB model
│   │   ├── Order.js                # Order model
│   │   └── User.js                 # User/Customer model
│   ├── routes/
│   │   ├── products.js             # Product API routes
│   │   ├── orders.js               # Order API routes
│   │   └── admin.js                # Admin panel routes
│   ├── controllers/
│   │   ├── productController.js    # Product logic
│   │   ├── orderController.js      # Order logic
│   │   └── adminController.js      # Admin logic
│   ├── config/
│   │   └── config.json             # Configuration (tokens, chat IDs, exchange rates)
│   └── scripts/
│       └── telegram-parser.js      # Telegram channel parser
├── frontend/
│   ├── pages/
│   │   ├── index.tsx               # Homepage
│   │   ├── catalog.tsx             # Product catalog
│   │   ├── product/[id].tsx        # Product detail page
│   │   ├── cart.tsx                # Shopping cart
│   │   ├── checkout.tsx            # Order checkout
│   │   └── admin/
│   │       ├── index.tsx           # Admin panel
│   │       ├── products.tsx        # Manage products
│   │       └── settings.tsx        # Settings
│   ├── components/
│   │   ├── ProductCard.tsx         # Product card component
│   │   ├── ProductFilter.tsx       # Filter component
│   │   ├── Cart.tsx                # Cart component
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Footer
│   │   └── OrderForm.tsx           # Order form
│   ├── locales/
│   │   ├── uk/translation.json     # Ukrainian translations
│   │   ├── en/translation.json     # English translations
│   │   └── ru/translation.json     # Russian translations
│   ├── styles/
│   │   └── globals.css             # Global styles
│   ├── package.json                # Frontend dependencies
│   └── next.config.js              # Next.js configuration
├── .gitignore
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account or local MongoDB
- AWS account (S3, EC2 or Amplify)
- Telegram Bot Token
- Cloudflare account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
USD_TO_UAH=36.7
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=eu-west-1
```

3. Start backend:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start frontend:
```bash
npm run dev
```

Access the site at `http://localhost:3000`

## Features

### Product Management
- ✅ Catalog with product cards (photos, videos, descriptions, prices)
- ✅ Product filtering (size, color, price, style)
- ✅ Product detail pages with image gallery
- ✅ Sale/discount marking
- ✅ Multi-language product descriptions

### Shopping Cart & Checkout
- ✅ Shopping cart with add/remove functionality
- ✅ Cart total calculation in USD and UAH
- ✅ Order form with customer details
- ✅ Address and delivery information
- ✅ Order confirmation via email

### Telegram Integration
- ✅ Automatic order notifications to manager via Telegram
- ✅ Order details including customer info and products
- ✅ Real-time notifications

### Admin Panel
- ✅ Product management (add, edit, delete)
- ✅ Inventory management
- ✅ Sale status management
- ✅ Currency exchange rate settings
- ✅ Order management and tracking
- ✅ Configuration management

### Multilingual Support
- ✅ Ukrainian (uk)
- ✅ English (en)
- ✅ Russian (ru)
- ✅ Language switcher in header

### Design & UX
- ✅ Fashion industry design aesthetic
- ✅ Elegant typography
- ✅ Smooth animations
- ✅ Mobile-responsive layout
- ✅ Professional color scheme

## Configuration

### Backend Config (`backend/config/config.json`)

```json
{
  "telegram_bot_token": "YOUR_TELEGRAM_BOT_TOKEN",
  "telegram_chat_id": "YOUR_CHAT_ID",
  "usd_to_uah": 36.7
}
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?size=M&color=black` - Get filtered products
- `GET /api/products/:id` - Get product by ID
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `POST /api/admin/orders` - Get all orders (admin)

### Admin
- `POST /api/admin/settings` - Update settings
- `GET /api/admin/settings` - Get current settings

## Deployment

### Deploy Frontend (AWS Amplify)

1. Connect your GitHub repository to AWS Amplify
2. Set environment variables
3. Configure build settings for Next.js
4. Deploy

### Deploy Backend (AWS EC2)

1. Launch EC2 instance
2. Install Node.js
3. Clone repository
4. Install dependencies: `npm install`
5. Set up `.env` file
6. Start server: `npm start`
7. Configure security groups for port 5000

### Configure Cloudflare

1. Point domain to Cloudflare nameservers
2. Create DNS records:
   - Frontend: CNAME to Amplify
   - Backend API: A record to EC2 IP
3. Enable SSL/TLS
4. Set up page rules for caching

## Telegram Bot Setup

1. Create bot with @BotFather in Telegram
2. Get your bot token
3. Create a private group or channel
4. Add bot to the group
5. Get the chat ID using:
   ```bash
   curl https://api.telegram.org/botYOUR_TOKEN/getUpdates
   ```
6. Add token and chat ID to config.json

## Database Models

### Product
```javascript
{
  name: { ru, ua, en },
  description: { ru, ua, en },
  images: [String],           // S3 URLs
  videos: [String],           // S3 URLs
  sizes: [String],
  colors: [String],
  style: String,
  price_usd: Number,
  price_uah: Number,
  is_sale: Boolean,
  createdAt: Date
}
```

### Order
```javascript
{
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String
  },
  items: [
    {
      product_id: ObjectId,
      quantity: Number,
      price_uah: Number
    }
  ],
  total_uah: Number,
  total_usd: Number,
  status: String,  // pending, confirmed, shipped, delivered
  createdAt: Date
}
```

## Environment Variables

### Backend
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `TELEGRAM_BOT_TOKEN` - Telegram bot token
- `TELEGRAM_CHAT_ID` - Telegram chat/channel ID
- `USD_TO_UAH` - USD to UAH exchange rate
- `JWT_SECRET` - JWT secret for authentication
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region

### Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Support & Documentation

For questions and support, please contact:
- Email: info@mibeyoung.com
- Telegram: @mibeyoung
- Website: mibeyoung.com

## License
Private Project - MI Evening Dresses

## Company Info
**Company:** MI Fashion (Мода и Вдохновение)
**Location:** Odesa, Ukraine
**Specialization:** Exclusive Evening Dresses
**Years in Business:** 10+ years in fashion industry
