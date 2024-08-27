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
include("aws:functions")
findProject(":aws:functions")?.name = "functions"
