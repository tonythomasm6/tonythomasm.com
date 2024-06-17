#!/bin/bash

cd cdk
npm install
npm run build
cdk deploy CdkStack --require-approval never