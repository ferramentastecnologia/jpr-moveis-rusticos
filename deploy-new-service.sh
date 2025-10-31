#!/bin/bash

# Create site using Netlify CLI
echo "Creating new Netlify site for New Service proposal..."

# Create the site and capture output
SITE_INFO=$(netlify api createSite --data='{"name":"proposta-new-service"}' 2>&1)

echo "$SITE_INFO"

# Extract site ID from the response
SITE_ID=$(echo "$SITE_INFO" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$SITE_ID" ]; then
    echo "Site created with ID: $SITE_ID"

    # Create .netlify directory and save site ID
    mkdir -p .netlify
    echo "{\"siteId\":\"$SITE_ID\"}" > .netlify/state.json

    # Deploy to production
    echo "Deploying to production..."
    netlify deploy --prod --dir=public
else
    echo "Failed to create site"
    echo "$SITE_INFO"
fi
