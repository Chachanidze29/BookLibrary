#!/bin/bash

set -ex

if [[ $1 == "--build-no-cache" ]]; then
    echo "Building the application..."
    vendor/bin/sail build --no-cache
fi

if [[ $1 == "--build" ]]; then
    echo "Building the application..."
    vendor/bin/sail --build up -d
fi

echo "Starting the application..."
vendor/bin/sail up
npm run dev
