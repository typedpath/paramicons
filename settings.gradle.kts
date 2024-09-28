rootProject.name = "paramicons"


pluginManagement {
    repositories {
        gradlePluginPortal()
        maven {
            name = "schemact4"
            url = uri("https://schemact4code.typedpath.com/repository")
        }
    }
}
include(":functions")
findProject(":functions")?.name = "functions"
