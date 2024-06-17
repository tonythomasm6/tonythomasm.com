#!/bin/bash

# Set AWS credentials
export AWS_ACCESS_KEY_ID=AKIATJBTFTXY2ZSLUK6K
export AWS_SECRET_ACCESS_KEY=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
export AWS_DEFAULT_REGION=ap-southeast-2

# Sync files to S3 bucket
aws s3 sync ui/ s3://tonythomasm.com/