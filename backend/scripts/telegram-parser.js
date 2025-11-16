// Telegram Product Parser Script
// Usage: node scripts/telegram-parser.js

const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const MONGO_URI = process.env.MONGO_URI;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));

// Parse product from message
async function parseProduct(message) {
  try {
    const text = message.text || message.caption || '';
    const photo = message.photo ? message.photo[message.photo.length - 1].file_id : null;
    
    // Extract product details using regex patterns
    const titleMatch = text.match(/[Назва|Title]:\s*(.+?)(?=\n|$)/i);
    const priceMatch = text.match(/[Ціна|Price]:\s*([\d.]+)/i);
    const sizeMatch = text.match(/[Розміри|Sizes]:\s*(.+?)(?=\n|$)/i);
    const colorMatch = text.match(/[Колір|Color]:\s*(.+?)(?=\n|$)/i);
    
    if (titleMatch && priceMatch) {
      const product = new Product({
        name: titleMatch[1].trim(),
        price: parseFloat(priceMatch[1]),
        sizes: sizeMatch ? sizeMatch[1].split(',').map(s => s.trim()) : [],
        colors: colorMatch ? colorMatch[1].split(',').map(c => c.trim()) : [],
        image: photo,
        description: text,
        category: 'Evening Dresses',
        inStock: true,
      });
      
      await product.save();
      console.log(`Product saved: ${product.name}`);
      return product;
    }
  } catch (error) {
    console.error('Error parsing product:', error);
  }
}

// Listen for channel messages
bot.on('channel_post', async (msg) => {
  console.log('New channel message:', msg.message_id);
  await parseProduct(msg);
});

console.log('Telegram parser running... Waiting for messages...');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Parser stopped.');
  process.exit(0);
});
