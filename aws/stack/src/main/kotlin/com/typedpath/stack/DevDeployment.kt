import com.amazonaws.auth.AWSCredentialsProvider
import com.amazonaws.regions.Regions
import com.amazonaws.services.cloudformation.model.Output
import com.amazonaws.services.s3.AmazonS3Client
import com.amazonaws.services.s3.model.PutObjectRequest
import com.typedpath.stack.CodeHostTemplate
import com.typedpath.stack.HostTemplate
import com.typedpath.stack.StackParams
import com.typedpath.stack.util.copyToS3
import com.typedpath.stack.util.createOrUpdateStack
import java.io.File


val devStackParams = StackParams(region=Regions.US_EAST_1, name ="devparamicons",
    rootDomain = "testedsoftware.org",
    cloudFrontHostedZoneId="Z2FDTNDATAQYW2",
    wildCardSslCertArn = "arn:aws:acm:us-east-1:950651224730:certificate/78fab14f-b918-42cd-bb4f-2bea3153d252",
    thumbnailerCodeJar= "svgthumbnailer-1.0.12-SNAPSHOT-fat.jar"
    )


fun main() {
    deployCode(devStackParams)
    deployInfrastructure(devStackParams)
    deployUiCode(devStackParams)

}

fun deployCode(stackParams: StackParams) {
    var stackName = stackParams.functionCodeStackName()

    fun onSuccess(credentialsProvider: AWSCredentialsProvider, outputs: List<Output>) = println("created stack $stackName}")

    createOrUpdateStack(
        template =  CodeHostTemplate(stackParams),
        stackName = stackName,
        region = stackParams.region,
        cleanup = false,
        onSuccess = ::onSuccess/*,
                    blockUpdate = blockUpdate*/
    )

    val thumbnailerCodeLocation = "aws/svgthumbnailer/build/libs/"

    val s3Builder = AmazonS3Client.builder()
    s3Builder.region = stackParams.region.getName()
    // .region(devStackParams.region) .build()
    val codeFile = File(thumbnailerCodeLocation + stackParams.thumbnailerCodeJar)
    println("reading file ${codeFile.absolutePath}")
    val req = PutObjectRequest(stackParams.functionCodeBucketName(),"${stackParams.thumbnailerCodeJar}", codeFile)
    val s3 = s3Builder.build()
    s3.putObject(req )

}

fun deployUiCode(stackParams: StackParams) {
    val uiCodeLocation = "ui/param-icons/example/build"

    val s3Builder = AmazonS3Client.builder()
    s3Builder.region = stackParams.region.getName()
    // .region(devStackParams.region) .build()
    copyToS3(bucketName = stackParams.websiteDomainName(), distributionDirectory=uiCodeLocation, bucketFolder = "", region=stackParams.region)
}
fun deployInfrastructure(stackParams: StackParams) {

    val stackName = stackParams.name
    fun onSuccess(credentialsProvider: AWSCredentialsProvider, outputs: List<Output>) = println("created stack $stackName}")
    createOrUpdateStack(
        template = HostTemplate(stackParams),
        stackName = stackName,
        region = devStackParams.region,
        cleanup = false,
        onSuccess = ::onSuccess/*,
                    blockUpdate = blockUpdate*/
    )
}