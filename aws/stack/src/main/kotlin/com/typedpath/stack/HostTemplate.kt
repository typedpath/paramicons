package com.typedpath.stack

import com.amazonaws.partitions.model.Service
import com.amazonaws.regions.Regions
import com.typedpath.awscloudformation.CloudFormationTemplate
import com.typedpath.awscloudformation.LambdaRuntime
import com.typedpath.awscloudformation.schema.*
import com.typedpath.awscloudformation.serverlessschema.ServerlessCloudformationTemplate
import com.typedpath.iam2kotlin.IamPolicy
import com.typedpath.iam2kotlin.resources.ec2.Ec2Action
import com.typedpath.iam2kotlin.resources.logs.LogsAction
import com.typedpath.iam2kotlin.resources.sts.StsAction
import com.typedpath.stack.WebCrawlerFunction.webCrawlerFunctionJs

// TODO fix bug in awscloudformation forcing templates to be in package com.typedpath.**

class HostTemplate(params: StackParams) : ServerlessCloudformationTemplate() {

    data class StackParams(
        val region: Regions,
        val name: String,
        val rootDomain: String,
        val wildCardSslCertArn: String,
        val cloudFrontHostedZoneId: String
    )

    // one day there will be some service infrastructure defined here !

    val webCrawlerFunctionRole = AWS_IAM_Role(assumeRolePolicyDocument = IamPolicy {
        statement {
            effect = IamPolicy.EffectType.Allow
            principal = mutableMapOf(
                IamPolicy.PrincipalType.Service to listOf(
                    "edgelambda.amazonaws.com",
                    "lambda.amazonaws.com"
                )
            )
            action(StsAction.AssumeRole)
        }
    }) {
        /*policies = listOf (
            AWS_IAM_Role.Policy(policyName = "access", policyDocument = IamPolicy() {
                 statement {
                     effect = IamPolicy.EffectType.Allow
                     action(Ec2Action.DescribeRegions)
                     action(LogsAction.DescribeLogGroups)
                     action(LogsAction.PutRetentionPolicy)
                     action(LogsAction.CreateLogStream)
                     action(LogsAction.PutLogEvents)
                     resource(IamPolicy.Resource.All)
                 }
            })
        )*/
        managedPolicyArns = listOf( "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole")
    }

    val webCrawlerFunctionGreen = AWS_Lambda_Function(
        code = AWS_Lambda_Function.Code {
            zipFile = inlineCode(webCrawlerFunctionJs(), "//");
        },
        role = ref(webCrawlerFunctionRole.arnAttribute()),
    ) {
        handler = "index.handler"
        runtime = "nodejs18.x"
    }

    val webCrawlerFunctionVersion = AWS_Lambda_Version(
        functionName = this.ref(webCrawlerFunctionGreen)
    )

    val webCrawlerFunctionAssociation = AWS_CloudFront_Distribution.LambdaFunctionAssociation() {
        eventType = "viewer-response";
        lambdaFunctionARN = this@HostTemplate.ref(webCrawlerFunctionVersion);
    }

    val webCrawlerFunction = AWS_Lambda_Function(
        code = AWS_Lambda_Function.Code {
            zipFile = inlineCode(webCrawlerFunctionJs(), "//");
        },
        role = ref(webCrawlerFunctionRole.arnAttribute()),
    ) {
        handler = "index.handler"
        runtime = "nodejs18.x"
    }

    val webCrawlerLambdaUrl = AWS_Lambda_Url(
        authType = "NONE",
        targetFunctionArn = ref(webCrawlerFunction)
    ) {

    }

   // val webcrawlerOrigin = AWS_CloudFront_Distribution.Origin(
   //     domainName = this.ref(webCrawlerLambdaUrl.functionUrlAttribute()),
   //     id = "webcrawler") {
   // }

    val websiteResources: CloudFormationTemplate.ResourceGroup = createStaticWebsiteResources(
        template = this,
        websiteDomainName = "${params.name}.${params.rootDomain}",
        sslCertArn = params.wildCardSslCertArn,
        deploymentFolder = null, domainRoot = params.rootDomain, region = params.region,
        cloudfrontHostedZoneId = params.cloudFrontHostedZoneId
        //,
        //lambdaFunctionAssociations =  listOf(webCrawlerFunctionAssociation)
        //path2ExtraOrigins = mapOf( "/view/*" to webcrawlerOrigin)
    )

    // cdk.Fn.select(2, cdk.Fn.split('/', functionUrl.url));
    //!Select [2, !Split ["/", !Ref LambdaFunctionUrl ]]
    val FunctionUrl = Output(this.ref(webCrawlerLambdaUrl.functionUrlAttribute())) {
        description = "API endpoint URL for Prod environment"
    }

    // cdk.Fn.select(2, cdk.Fn.split('/', functionUrl.url));
    //!Select [2, !Split ["/", !Ref LambdaFunctionUrl ]]
    val FunctionUrlDomainOnly = Output(this.rawInstrinsicFunctionCall("!Select [2, !Split [\"/\", !GetAtt webCrawlerLambdaUrl.FunctionUrl ]]")) {
        description = "API endpoint URL for Prod environment"
    }

}


