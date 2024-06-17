#!/bin/bash

cd cdk
echo "Running npm install and build"
npm install
npm run build
echo "Deploying cdk"
npm install -g aws-cdk@2.122.0
cdk deploy CdkStack --require-approval never