package org.testedsoftware.paramicons

fun main() {
    val svg ="<svg height=\"200\" viewBox=\"0 0 185.07147802708494 177.25808255284744\" width=\"200\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"70\" cy=\"70\" r=\"50\" fill=\"red\"></circle><circle cx=\"146.60993956554648\" cy=\"114.23076923076923\" r=\"38.46153846153846\" fill=\"orange\"></circle><circle cx=\"87.34692227636235\" cy=\"147.67228373627938\" r=\"29.585798816568044\" fill=\"yellow\"></circle><animateTransform attributeType=\"xml\" attributeName=\"transform\" type=\"rotate\" from=\"360 8.4 9.5\" to=\"0 8.4 9.5\" dur=\"5.0s\" additive=\"sum\" repeatCount=\"indefinite\"></animateTransform></svg>"
    val domainName= "devparamicons.testedsoftware.org"
    println(thumbnailToS3(bucketName = domainName, svg = svg, urlRoot="https://$domainName", height=256, width = 256))

}