import com.amazonaws.regions.Regions
import com.typedpath.stack.*

val devStackParams = StackParams(region=Regions.US_EAST_1, name ="devparamicons",
    rootDomain = "testedsoftware.org",
    cloudFrontHostedZoneId="Z2FDTNDATAQYW2",
    wildCardSslCertArn = "arn:aws:acm:us-east-1:950651224730:certificate/78fab14f-b918-42cd-bb4f-2bea3153d252",
    thumbnailerCodeJar= "svgthumbnailer-1.0.12-SNAPSHOT-fat.jar"
    )

fun main() {
    //deployCode(devStackParams)
    //deployInfrastructure(devStackParams)
    deployUiCode(devStackParams)
    //renderTemplatesToDocs(devStackParams)
}

