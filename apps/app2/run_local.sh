#!/bin/bash
docker build -t listing_images_publisher .
docker run --cpus=1 --env-file .env listing_images_publisher
