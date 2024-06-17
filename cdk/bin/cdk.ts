#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';
import { EnvHelper } from './env-helper';


const app = new cdk.App();
new CdkStack(app, 'CdkStack', {
  env: EnvHelper.ENVIRONMENT
});