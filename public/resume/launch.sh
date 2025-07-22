#!/bin/bash
# Portfolio Launcher Script
# One-liner: curl -s https://raw.githubusercontent.com/jordolang/portfolio/main/public/resume/launch.sh | bash

echo "🚀 Launching Jordan Lang's Interactive Portfolio..."
echo "📥 Downloading portfolio script..."

# Create a temporary file to preserve stdin for interactive input
TEMP_SCRIPT=$(mktemp)
trap "rm -f $TEMP_SCRIPT" EXIT

# Download the Python portfolio script to temp file
if curl -s https://raw.githubusercontent.com/jordolang/portfolio/main/public/resume/portfolio.py -o "$TEMP_SCRIPT"; then
    echo "✅ Download complete! Starting portfolio..."
    echo ""
    # Execute the script directly (not piped) to preserve stdin
    python3 "$TEMP_SCRIPT" 2>/dev/null || python "$TEMP_SCRIPT"
else
    echo "❌ Failed to download portfolio script. Please check your internet connection."
    exit 1
fi
