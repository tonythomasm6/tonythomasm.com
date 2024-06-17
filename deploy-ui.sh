#!/bin/bash

# Remove existing contents
aws s3 rm s3://tonythomasm.com/ --recursive
# Sync files to S3 bucket
aws s3 cp --recursive --only-show-errors ui s3://tonythomasm.com

# Clear out cache after every ui deployment
DISTRIBUTION_ID="E7WE7ETDQ400N"
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"
