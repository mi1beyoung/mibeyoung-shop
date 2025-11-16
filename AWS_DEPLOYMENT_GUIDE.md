AWS_DEPLOYMENT_GUIDE.md  # AWS Deployment Guide

## Quick Start
This guide provides step-by-step instructions for deploying MI Evening Dresses shop to AWS.

## Prerequisites
- AWS Account
- AWS CLI configured
- GitHub repository access
- Domain name (optional for custom domain)

## Step 1: Set Up EC2 Instance

### Launch Instance
1. Go to AWS EC2 Console
2. Click "Launch Instance"
3. Select "Ubuntu Server 22.04 LTS"
4. Choose instance type: t3.medium (recommended)
5. Configure security group:
   - HTTP: 80
   - HTTPS: 443
   - SSH: 22 (from your IP)
   - Custom: 5000 (Backend API)

### Connect and Setup
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git curl
```

## Step 2: Deploy Backend

```bash
cd /home/ubuntu
git clone https://github.com/mi1beyoung/mibeyoung-shop.git
cd mibeyoung-shop/backend
npm install
```

## Step 3: Configure Environment

Create .env file:
```bash
sudo nano .env
```

Add:
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/mibeyoung
PORT=5000
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id
JWT_SECRET=your_secret_key
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

## Step 4: Set Up MongoDB Atlas

1. Create cluster at mongodb.com
2. Create database user
3. Get connection string
4. Whitelist IP address

## Step 5: Deploy Frontend (AWS Amplify)

1. Push frontend code to GitHub
2. Go to AWS Amplify Console
3. Connect GitHub repository
4. Configure build settings
5. Deploy

## Step 6: Set Up Domain (Cloudflare)

1. Transfer domain to Cloudflare
2. Add DNS records:
   - A record pointing to CloudFront distribution
   - CNAME for www
3. Enable SSL/TLS

## Monitoring

- CloudWatch for logs
- X-Ray for tracing
- CloudFormation for infrastructure

## Costs

- EC2 t3.medium: ~$30/month
- MongoDB Atlas: ~$50/month
- Amplify: ~$10/month
- Total: ~$90/month

## Troubleshooting

See DEPLOYMENT_AND_SETUP.md for common issues.
