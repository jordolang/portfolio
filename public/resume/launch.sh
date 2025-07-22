#!/bin/bash
# Portfolio Launcher Script
# One-liner: curl -s https://raw.githubusercontent.com/jordolang/portfolio/main/public/resume/launch.sh | bash

echo "🚀 Launching Jordan Lang's Interactive Portfolio..."
echo "📥 Downloading portfolio script..."

# Download and execute the Python portfolio script
curl -s https://raw.githubusercontent.com/jordolang/portfolio/main/public/resume/portfolio.py | python3

# Check if Python 3 failed, try python
if [ $? -ne 0 ]; then
    echo "⚠️  Python3 not found, trying 'python'..."
    curl -s https://raw.githubusercontent.com/jordolang/portfolio/main/public/resume/portfolio.py | python
fi
