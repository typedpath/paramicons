rootProject.name = "paramicons"


pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenLocal()
    }
}
include(":functions")
findProject(":functions")?.name = "functions"
