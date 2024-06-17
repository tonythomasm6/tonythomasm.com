#!/bin/bash

cd cdk
echo "Running npm install and build"
npm install
npm run build
echo "Deploying cdk"
aws sts get-caller-identity
cdk --version
npx cdk deploy CdkStack --require-approval never -v