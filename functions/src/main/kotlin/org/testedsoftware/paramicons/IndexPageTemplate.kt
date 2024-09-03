package org.testedsoftware.paramicons

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

object IndexPageTemplate {
fun indexPage(tag: OpenGraphTagging, urlRoot: String, rawQueryString: String, svg: String) = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>my title</title>
    <!--meta property="fb:app_id" content="<your-fb-app-id>"-->
    <meta property="og:title" content="${tag.title}" />
    <meta property="og:description" content="${tag.description}" />
    <meta property="og:image" content="${tag.image.url}" />

    <meta property="og:url" content="${tag.url}" />
    <meta property="og:type" content="${tag.type}" />
    <meta property="og:locale" content="en_GB" />
    
    <meta property="og:image:url" content="${tag.image.url}" />
    <meta property ="og:image:width" content="${tag.image.width}" />
    <meta property ="og:image:height" content="${tag.image.height}" />
    <meta property="og:updated_time" content="${DateTimeFormatter.ISO_DATE_TIME.format(LocalDateTime.now())}" />
</head>
<body>
<h1>
<a href="${urlRoot}?${rawQueryString}">click to edit
    <br/>
    $svg
</a>
</h1>
</body>
</html>    
"""
}