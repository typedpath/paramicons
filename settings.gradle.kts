rootProject.name = "paramicons"
include("aws")


pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenLocal()
    }
}
include("aws:functions")
findProject(":aws:functions")?.name = "functions"
