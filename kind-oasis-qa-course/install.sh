#!/bin/bash

# Kind Oasis QA Course - Installation Script
echo "🌿 Installing Kind Oasis Manufacturing Quality Assurance Course..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="18.0.0"

if ! node -p "require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION')" 2>/dev/null; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18+ and try again."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

echo "✅ Installation complete!"
echo ""
echo "🚀 To start the application:"
echo "   npm run dev"
echo ""
echo "📖 The course will be available at: http://localhost:5000"
echo ""
echo "📚 Features included:"
echo "   • 14 comprehensive training modules"
echo "   • Interactive tools: Risk Matrix, FMEA Calculator, Facility Designer"
echo "   • Progress tracking and certification system"
echo "   • Mobile-responsive design"
echo ""
echo "Happy learning! 🎓"