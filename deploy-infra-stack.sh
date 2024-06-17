#!/bin/bash

cd cdk
echo "Running npm install and build"
npm install
npm run build
echo "Deploying cdk"
npx cdk deploy CdkStack --require-approval never