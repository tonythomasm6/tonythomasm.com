#!/bin/bash

DISTRIBUTION_ID="E36TUBQZM6END5"

aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*"
