require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mibeyoung', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

// Load config
let config = {
  telegram_bot_token: process.env.TELEGRAM_BOT_TOKEN,
  telegram_chat_id: process.env.TELEGRAM_CHAT_ID,
  usd_to_uah: 36.7
};

// Product Model
const productSchema = new mongoose.Schema({
  name: { ru: String, ua: String, en: String },
  description: { ru: String, ua: String, en: String },
  images: [String],
  videos: [String],
  sizes: [String],
  colors: [String],
  style: String,
  price_usd: Number,
  price_uah: Number,
  is_sale: Boolean,
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

// Order Model
const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String
  },
  items: [{
    product_id: mongoose.Schema.Types.ObjectId,
    name: String,
    quantity: Number,
    price_uah: Number
  }],
  total_uah: Number,
  total_usd: Number,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', orderSchema);

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { size, color, style, priceMax, priceMin } = req.query;
    let query = {};
    
    if (size) query.sizes = { $in: [size] };
    if (color) query.colors = { $in: [color] };
    if (style) query.style = style;
    if (priceMax) query.price_usd = { $lte: parseFloat(priceMax) };
    if (priceMin) query.price_usd = { ...query.price_usd, $gte: parseFloat(priceMin) };
    
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // Send Telegram notification
    const text = `New Order!\nCustomer: ${req.body.customer.name}\nPhone: ${req.body.customer.phone}\nTotal: $${req.body.total_usd}`;
    await axios.post(`https://api.telegram.org/bot${config.telegram_bot_token}/sendMessage`, {
      chat_id: config.telegram_chat_id,
      text: text
    });
    
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Create product
app.post('/api/admin/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update product
app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Delete product
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Update settings
app.post('/api/admin/settings', (req, res) => {
  config = { ...config, ...req.body };
  res.json({ success: true, config });
});

// Get settings
app.get('/api/admin/settings', (req, res) => {
  res.json(config);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
