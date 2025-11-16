// Telegram Bot Integration
// Sends order notifications to manager

const TelegramBot = require('node-telegram-bot-api');
const Order = require('../models/Order');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const MANAGER_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

// Send order notification to manager
async function notifyManagerNewOrder(orderId, orderData) {
  try {
    const message = `
🎉 <b>NEW ORDER</b> - #${orderId}

Customer: ${orderData.customerName}
Email: ${orderData.email}
Phone: ${orderData.phone}

Products: ${orderData.items.length}
Total: $${orderData.totalPrice}

Delivery Address:
${orderData.address}

Message: ${orderData.message || 'N/A'}

🔗 View in dashboard
    `;
    
    await bot.sendMessage(MANAGER_CHAT_ID, message, { parse_mode: 'HTML' });
    console.log(`Order notification sent for order ${orderId}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

// Send inventory alert
async function notifyLowStock(productName, quantity) {
  try {
    const message = `
⚠️ <b>LOW STOCK ALERT</b>

Product: ${productName}
Remaining: ${quantity} units

Please restock soon!
    `;
    
    await bot.sendMessage(MANAGER_CHAT_ID, message, { parse_mode: 'HTML' });
  } catch (error) {
    console.error('Error sending alert:', error);
  }
}

// Handle bot commands
bot.onText(/\/orders/, async (msg) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(5);
    let response = '<b>Recent Orders:</b>
';
    
    orders.forEach((order, index) => {
      response += `
${index + 1}. ${order.customerName} - $${order.totalPrice}`;
    });
    
    await bot.sendMessage(msg.chat.id, response, { parse_mode: 'HTML' });
  } catch (error) {
    await bot.sendMessage(msg.chat.id, 'Error fetching orders');
  }
});

bot.onText(/\/start/, async (msg) => {
  const welcome = 'Welcome to MI Evening Dresses Manager Bot!

Available commands:
/orders - View recent orders
/stats - View statistics';
  
  await bot.sendMessage(msg.chat.id, welcome);
});

module.exports = {
  notifyManagerNewOrder,
  notifyLowStock,
};
