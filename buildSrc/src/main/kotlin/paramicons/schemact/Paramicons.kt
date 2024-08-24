package paramicons.schemact

import schemact.domain.*
import schemact.domain.Function
import schemact.domain.Language.Typescript
import schemact.domain.string

val rootDomain =  Domain(name = "testedsoftware.org",
    wildcardCertificateRef = "arn:aws:acm:us-east-1:950651224730:certificate/78fab14f-b918-42cd-bb4f-2bea3153d252",
    cdnZoneReference = "Z2FDTNDATAQYW2",
    deployments = listOf(
    Deployment(subdomain = "paramicons", codeBranch = "prod"),
    Deployment(subdomain = "devparamicons", codeBranch ="dev"),
    Deployment(subdomain = "schemactsample", codeBranch = "sample")
))

val thumbnailerFunction = Function("svgThumbnail",
    description = "accepts an svg and creates an open graph friendly paramicon index page, returns index page url",
    paramType = Entity(name="param", description="Params" ) {
        string(name="svg", description="svg for rendering", maxLength = 4000)
        string(name="editParams", description="ui params for editing paramicon", maxLength = 500)
        containsOne("bucketName", description="bucketName", type=StaticWebsite.BucketName())
    },
    returnType = StringType(200)
)

lateinit var  mainPage : StaticWebsite

val paramicons = Schemact(
name = "paramicons",
domains = listOf(rootDomain),
entities = mutableListOf(metaDataEntity, paramsEntity),
userKeyedDatabase = UserKeyedDatabase(entities=mutableListOf(metaDataEntity, paramsEntity))
) {
    mainPage = staticWebsite("mainPage", "the main page") {
        client(thumbnailerFunction, Typescript)
    }
    function(thumbnailerFunction)
}



