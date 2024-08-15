package com.typedpath.stack

import com.amazonaws.regions.Regions

data class StackParams(
    val region: Regions,
    val name: String,
    val rootDomain: String,
    val wildCardSslCertArn: String,
    val cloudFrontHostedZoneId: String,
    val thumbnailerCodeJar: String
) {
    fun functionCodeBucketName() = "code.${name}.${rootDomain}"
    fun functionCodeStackName() = "${name}Code"

    fun websiteDomainName() = "${name}.${rootDomain}"

}