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
    
    # Check if we're running in a piped environment (like curl | bash)
    if [[ ! -t 0 ]]; then
        echo "⚠️ Detected piped execution. Starting in interactive mode..."
        # Re-open stdin to /dev/tty to restore interactivity
        if [[ -c /dev/tty ]]; then
            python3 "$TEMP_SCRIPT" < /dev/tty || python "$TEMP_SCRIPT" < /dev/tty
        else
            echo "❌ Cannot access terminal for interactive input."
            echo "💡 Try running directly: ./launch.sh"
            exit 1
        fi
    else
        # Normal execution - stdin is already a terminal
        python3 "$TEMP_SCRIPT" || python "$TEMP_SCRIPT"
    fi
else
    echo "❌ Failed to download portfolio script. Please check your internet connection."
    exit 1
fi
