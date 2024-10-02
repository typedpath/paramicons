import paramicons.schemact.functionsModule
import paramicons.schemact.mainPage
import paramicons.schemact.paramicons

plugins {
    id("java")
    kotlin("jvm") version "1.7.10"
    id("com.typedpath.schemact4.schemact-plugin") version "1.0.1-SNAPSHOT"
}

val ktor_version: String by project

schemactConfig {
    schemact= paramicons
    module = functionsModule
    staticWebSiteToSourceRoot =  mapOf ( mainPage to File("${project.projectDir}/../ui/param-icons/example/src"))
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.apache.xmlgraphics:batik-all:1.17")

    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("io.ktor:ktor-client-core:$ktor_version")
    testImplementation("io.ktor:ktor-client-cio:$ktor_version")
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.1")

}

tasks.test {
    useJUnitPlatform()
}
