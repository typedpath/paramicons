package paramicons.schemact

import schemact.domain.*
import schemact.domain.Function
import schemact.domain.string

val rootDomain =  Domain(name = "testedsoftware.org",
    wildcardCertificateRef = "arn:aws:acm:us-east-1:950651224730:certificate/78fab14f-b918-42cd-bb4f-2bea3153d252",
    cdnZoneReference = "Z2FDTNDATAQYW2",
    deployments = listOf(
    Deployment("paramicons"),
    Deployment("devparamicons"),
    Deployment("schemactsample")
))


val paramicons = Schemact(
domains = listOf(rootDomain),
entities = mutableListOf(metaDataEntity, paramsEntity),
userKeyedDatabase = UserKeyedDatabase(entities=mutableListOf(metaDataEntity, paramsEntity))
) {
    val sw = staticWebsite("homepage", "the main page")
    val thumbnailerFunction = Function("svgThumbnailer",
        description = "accepts an svg and creates an open graph friendly paramicon index page, returns index page url",
        paramType = Entity(name="param", description="Params" ) {
            string(name="svg", description="svg for rendering", maxLength = 4000)
            containsOne("bucketName", description="bucketName", type=StaticWebsite.BucketName())
        },
        returnType = StringType(200)
    )
    function(thumbnailerFunction)
}



