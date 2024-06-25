package com.typedpath.stack

import com.amazonaws.regions.Regions
import com.typedpath.awscloudformation.CloudFormationTemplate
import com.typedpath.awscloudformation.serverlessschema.ServerlessCloudformationTemplate

// TODO fix bug in awscloudformation forcing templates to be in package com.typedpath.**

class HostTemplate(params: StackParams) : ServerlessCloudformationTemplate() {

    data class StackParams(val region: Regions, val name: String, val rootDomain: String, val wildCardSslCertArn: String,
                           val cloudFrontHostedZoneId: String)

    // one day there will be some service infrastructure defined here !

    val websiteResources: CloudFormationTemplate.ResourceGroup = createStaticWebsiteResources(
        template = this,
        websiteDomainName = "${params.name}.${params.rootDomain}",
        sslCertArn = params.wildCardSslCertArn,
        deploymentFolder = null, domainRoot = params.rootDomain, region = params.region,
        cloudfrontHostedZoneId=params.cloudFrontHostedZoneId)
}

