#!/bin/bash

cd cdk
npm install
npm run build
npx cdk deploy CdkStack --require-approval never