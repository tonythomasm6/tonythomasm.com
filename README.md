# Personal Website Deployment Guide

This guide provides step-by-step instructions to deploy the CDK stack for your personal website and update the CloudFront distribution ID for cache invalidation.

## Website URL
[www.tonythomasm.com](http://www.tonythomasm.com)

## Deployment Instructions

### 1. Deploy the CDK Stack

To deploy the CDK stack, follow these steps:

1. Navigate to the `cdk` directory:
   cd cdk
   run the command:  cdk deploy TonyThomasmComStack
   ### Once deployed and if new cloudformation is created, update deploy-ui with new DISTRIBUTION_ID
