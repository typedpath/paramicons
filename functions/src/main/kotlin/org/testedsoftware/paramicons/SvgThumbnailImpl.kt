
package org.testedsoftware.paramicons
class SvgThumbnailImpl { 
    // created from template  functionSampleImpl at 2024-08-18T14:45:43.357091600       
    fun svgThumbnail(svg: String, editParams: String, bucketName: String) : String {
        println("svg=$svg")
        println("editParams=$editParams")
        println("bucketName=$bucketName")
        return thumbnailToS3(bucketName=bucketName, svg,  urlRoot = "https://$bucketName",
            width = 256, height = 256, rawQueryString =  editParams)
    }
}
