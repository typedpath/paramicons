package org.testedsoftware.paramicons

import org.apache.batik.transcoder.TranscoderInput
import org.apache.batik.transcoder.TranscoderOutput
import org.apache.batik.transcoder.image.JPEGTranscoder
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.util.*


data class Thumbnail (val indexPage: String,  val indexPageKey: String,
                      val thumbnailImage: ByteArray, val thumbnailImageKey: String, val id: String)
// Thread.currentThread().contextClassLoader.getResource(path) might be better ?
val indexPageTemplate = object {}.javaClass.getResource("/indexPageTemplate.html")?.readText()!!
//val indexPageTemplate  = Thread.currentThread().contextClassLoader.getResource("/indexPageTemplate.html").readText()
fun thumbnail(svg: String, urlRoot: String, rawQueryString:String, width: Int, height: Int) : Thumbnail{
    val id=UUID.randomUUID()!!
    val thumbnailImageKey = "indicies/$id.jpg"
    val indexPageKey = "indicies/$id.html"
    // convert svg
    // create index page
    val imageUrl = "$urlRoot/$thumbnailImageKey"
    val url = "$urlRoot/$indexPageKey"

    val imageTranscoder = JPEGTranscoder()
    imageTranscoder.addTranscodingHint(JPEGTranscoder.KEY_QUALITY, 0.8f)

    //val imageTranscoder = BufferedImageTranscoder()
    imageTranscoder.addTranscodingHint(JPEGTranscoder.KEY_WIDTH, width.toFloat())
    imageTranscoder.addTranscodingHint(JPEGTranscoder.KEY_HEIGHT, height.toFloat())
    val outputStream = ByteArrayOutputStream()
    val output = TranscoderOutput(outputStream)

    val input = TranscoderInput(ByteArrayInputStream(svg.toByteArray()))

    imageTranscoder.transcode(input, output)

    outputStream.flush()
    outputStream.close()

    val imgData: ByteArray = outputStream.toByteArray()

    val title = "Paramicon"
    val description = "Parameterized Icon"

    var indexPage = indexPageTemplate
    mapOf("og:title" to title, "og:description" to description,
        "og:image" to imageUrl, "og:url" to url,
        "og:type" to "my type",
        "og:image:width" to width.toString(), "og:image:height" to height.toString(),
        "og:updated_time" to System.currentTimeMillis().toString(),
        "svg" to svg,
        "urlRoot" to urlRoot,
        "rawQueryString" to rawQueryString
    ).entries.forEach{
        e ->  indexPage=indexPage.replace("\${${e.key}}", e.value)
    }


    return Thumbnail(indexPage = indexPage, indexPageKey=indexPageKey, thumbnailImage=imgData,
        thumbnailImageKey=thumbnailImageKey, id=id.toString())
}