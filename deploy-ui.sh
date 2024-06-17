#!/bin/bash

# Remove existing contents
aws s3 rm s3://tonythomasm.com/ --recursive
# Sync files to S3 bucket
aws s3 cp --recursive --only-show-errors ui s3://tonythomasm.com

DISTRIBUTION_ID="E36TUBQZM6END5"

aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"
