#!/bin/bash
# Interactive Terminal Portfolio Launcher
# Download to temp file to preserve stdin for interactive input
TEMP_SCRIPT=$(mktemp)
trap "rm -f $TEMP_SCRIPT" EXIT

if curl -fsSL https://jlang.dev/resume/portfolio.py -o "$TEMP_SCRIPT"; then
    python3 "$TEMP_SCRIPT" 2>/dev/null || python "$TEMP_SCRIPT"
else
    echo "❌ Failed to download portfolio script. Please check your internet connection."
    exit 1
fi
