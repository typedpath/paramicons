package org.testedsoftware.paramicons

import org.apache.batik.transcoder.TranscoderInput
import org.apache.batik.transcoder.TranscoderOutput
import org.apache.batik.transcoder.image.JPEGTranscoder
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.util.*



fun thumbnailExtra(svg: String, urlRoot: String, rawQueryString:String, openGraphTagging: OpenGraphTagging) : Thumbnail {
    val id=UUID.randomUUID()!!
    val thumbnailImageKey = "indicies/$id.jpg"
    val indexPageKey = "indicies/$id.html"
    // convert svg
    // create index page
    openGraphTagging.image.url = "$urlRoot/$thumbnailImageKey"
    openGraphTagging.url = "$urlRoot/$indexPageKey"

    val imageTranscoder = JPEGTranscoder()
    imageTranscoder.addTranscodingHint(JPEGTranscoder.KEY_QUALITY, 0.8f)

    //val imageTranscoder = BufferedImageTranscoder()
    imageTranscoder.addTranscodingHint(JPEGTranscoder.KEY_WIDTH, openGraphTagging.image.width.toFloat())
    imageTranscoder.addTranscodingHint(JPEGTranscoder.KEY_HEIGHT, openGraphTagging.image.height.toFloat())
    val outputStream = ByteArrayOutputStream()
    val output = TranscoderOutput(outputStream)

    val input = TranscoderInput(ByteArrayInputStream(svg.toByteArray()))

    imageTranscoder.transcode(input, output)

    outputStream.flush()
    outputStream.close()

    val imgData: ByteArray = outputStream.toByteArray()

    var indexPage = IndexPageTemplate.indexPage(tag=openGraphTagging, urlRoot=urlRoot, rawQueryString=rawQueryString,
         svg=svg)

    return Thumbnail(indexPage = indexPage, indexPageKey=indexPageKey, thumbnailImage=imgData,
        thumbnailImageKey=thumbnailImageKey, id=id.toString())
}