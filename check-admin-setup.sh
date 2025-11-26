#!/bin/bash

# Admin Access Test Script
# This script helps verify your admin configuration

echo "==================================="
echo "PNJ App Portal - Admin Access Test"
echo "==================================="
echo ""

# Check if .env file exists
if [ ! -f "client/.env" ]; then
    echo "❌ ERROR: client/.env file not found!"
    echo "   Please create it from client/.env.example"
    exit 1
fi

echo "✓ Found client/.env file"
echo ""

# Read VITE_ADMIN_EMAILS
ADMIN_EMAILS=$(grep VITE_ADMIN_EMAILS client/.env | cut -d '=' -f2)

if [ -z "$ADMIN_EMAILS" ]; then
    echo "⚠️  WARNING: VITE_ADMIN_EMAILS is not set in client/.env"
    echo "   You need to configure admin emails to access the admin page"
    echo ""
    echo "   Example:"
    echo "   VITE_ADMIN_EMAILS=admin@example.com,user@domain.com"
    exit 1
fi

echo "✓ Admin emails configured:"
echo "  $ADMIN_EMAILS"
echo ""

# Check if servers are running
echo "Checking if servers are running..."
echo ""

# Check backend
if curl -s http://localhost:3000/api/apps > /dev/null 2>&1; then
    echo "✓ Backend server is running (http://localhost:3000)"
else
    echo "❌ Backend server is NOT running"
    echo "   Start it with: cd server && npm run dev"
fi

# Check frontend
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✓ Frontend server is running (http://localhost:5173)"
else
    echo "❌ Frontend server is NOT running"
    echo "   Start it with: cd client && npm run dev"
fi

echo ""
echo "==================================="
echo "Next Steps:"
echo "==================================="
echo ""
echo "1. Make sure both servers are running"
echo "2. Log in to the application"
echo "3. Check browser console (F12) for admin status logs"
echo "4. Navigate to http://localhost:5173/admin"
echo ""
echo "If you get 'Access Denied', verify that your OIDC email"
echo "matches one of the emails in VITE_ADMIN_EMAILS"
echo ""
