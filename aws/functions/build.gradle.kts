import paramicons.schemact.mainPage
import paramicons.schemact.paramicons

plugins {
    id("java")
    kotlin("jvm") version "1.7.10"
    id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"
}

val ktor_version: String by project

schemactConfig {
    schemact= paramicons
    functions = paramicons.functions
    staticWebSiteToSourceRoot =  mapOf ( mainPage to File("${project.projectDir}/../../ui/param-icons/example/src"))
}

group = "org.example"
version = "1.0.08-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    implementation("org.apache.xmlgraphics:batik-all:1.17")


    testImplementation("io.ktor:ktor-client-core:$ktor_version")
    testImplementation("io.ktor:ktor-client-cio:$ktor_version")

    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.1")

    // TODO - these should be added by plugin
    implementation("com.amazonaws:aws-lambda-java-core:1.2.1")
    implementation("com.amazonaws:aws-lambda-java-events:3.11.0")
    implementation("com.amazonaws:aws-java-sdk-s3:1.11.574")



}

tasks.test {
    useJUnitPlatform()
}