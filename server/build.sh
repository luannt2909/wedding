#!/bin/bash
docker stop wedding-api
docker rm wedding-api
# docker build -t wedding-api .
docker run -d -p 8009:8000 -v $(pwd)/server/data:/app/data --name wedding-api wedding-api
docker run -p 8090:8000 \                                                  
    -v $(pwd)/data:/app/data \
    --name wedding-api \
    luannt2909/wedding-api