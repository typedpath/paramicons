import com.amazonaws.auth.AWSCredentialsProvider
import com.amazonaws.regions.Regions
import com.amazonaws.services.cloudformation.model.Output
import com.typedpath.stack.HostTemplate
import com.typedpath.stack.util.createOrUpdateStack

val devStackParams = HostTemplate.StackParams(region=Regions.US_EAST_1, name ="devparamicons",
    rootDomain = "testedsoftware.org",
    cloudFrontHostedZoneId="Z2FDTNDATAQYW2",
    wildCardSslCertArn = "arn:aws:acm:us-east-1:950651224730:certificate/78fab14f-b918-42cd-bb4f-2bea3153d252")


fun main() {
    val template = HostTemplate(devStackParams)
    val stackName = devStackParams.name
    fun onSuccess(credentialsProvider: AWSCredentialsProvider, outputs: List<Output>) {
        println("created project ${devStackParams.name}")
    }

    createOrUpdateStack(
        template = template,
        stackName = stackName,
        region = devStackParams.region,
        cleanup = false,
        onSuccess = ::onSuccess/*,
                    blockUpdate = blockUpdate*/
    )
}