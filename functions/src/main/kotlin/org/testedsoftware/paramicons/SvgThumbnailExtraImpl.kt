
package org.testedsoftware.paramicons
class SvgThumbnailExtraImpl { 
    fun svgThumbnailExtra(svg: String, editParams: String, bucketName: String,
                          openGraphTagging: OpenGraphTagging) : String =
        thumbnailExtraToS3(bucketName=bucketName, svg=svg, openGraphTagging=openGraphTagging,
            rawQueryString = editParams, urlRoot = "https://$bucketName")
}
