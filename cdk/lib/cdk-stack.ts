import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as iam from 'aws-cdk-lib/aws-iam';
import {Construct} from 'constructs';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Define ACM certificate for the domain
        const certificate = acm.Certificate.fromCertificateArn(this, 'fe8d8325-f0e0-4fcb-96a0-17cd1b42e519', 'arn:aws:acm:us-east-1:225593105905:certificate/fe8d8325-f0e0-4fcb-96a0-17cd1b42e519');

        // Create Cloudfront orogin Access Identity
        const oai = new cloudfront.OriginAccessIdentity(this, 'OAI', {
            comment: 'OAI for tonythomasm.com',
        });

        // Primary S3 bucket which hosts website
        const primaryBucket = new s3.Bucket(this, 'PrimaryWebsiteBucket', {
            bucketName: 'tonythomasm.com',
            websiteIndexDocument: 'index.html',
            publicReadAccess: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });

        // Add bucket policy to allo Cloudfront access
        primaryBucket.addToResourcePolicy(new iam.PolicyStatement(new iam.PolicyStatement({
            actions: ['S3:GetObject'],
            resources: [`${primaryBucket.bucketArn}/*`],
            principals: [new iam.CanonicalUserPrincipal(oai.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
        })));


        // Define cloudfront distribution
        const distribution = new cloudfront.CloudFrontWebDistribution(this, 'StaticWebsiteDistribution', {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: primaryBucket,
                        originAccessIdentity: oai,
                    },
                    behaviors: [{isDefaultBehavior: true}],
                },
            ],
            errorConfigurations: [
                {
                    errorCode: 403,
                    responseCode: 200,
                    responsePagePath: '/index.html'
                },
                {
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: '/index.html'
                }
            ],
            viewerCertificate: {
                // aliases: ['tonythomasm.com', 'www.tonythomas.com'], // ToDo
                aliases: ['tonythomasm.com'],
                props: {
                    acmCertificateArn: certificate.certificateArn,
                    sslSupportMethod: 'sni-only',
                }
            }
        });

        const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
            domainName: 'tonythomasm.com',
        });

        // Create A records in Route53 for this distribution
        new route53.ARecord(this, 'AliasRecordDomain', {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
            recordName: 'tonythomasm.com'
        })

        new route53.ARecord(this, 'AliasRecordSubDomain', {
            zone: hostedZone,
            target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
            recordName: 'www.tonythomasm.com'
        })
    };
}
