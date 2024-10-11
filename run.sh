#!/bin/bash

set -ex

docker-compose -f docker-compose.prod.yml up -d
npm run dev
