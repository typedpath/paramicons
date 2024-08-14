package org.testedsoftware.function

import org.apache.batik.transcoder.TranscoderOutput
import org.apache.batik.transcoder.image.ImageTranscoder
import java.awt.image.BufferedImage


class BufferedImageTranscoder : ImageTranscoder() {
    override fun createImage(w: Int, h: Int): BufferedImage {
        return BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB)
    }

    override fun writeImage(img: BufferedImage?, output: TranscoderOutput?) {
        bufferedImage = img
    }

    var bufferedImage: BufferedImage? = null
        private set
}