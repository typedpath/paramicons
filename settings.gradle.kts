rootProject.name = "paramicons"
include("aws")
include("aws:svgthumbnailer")
//include("schemact")


pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenLocal()
    }
}
include("aws:function")
findProject(":aws:function")?.name = "function"
