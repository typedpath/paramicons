import org.jetbrains.kotlin.gradle.dsl.KotlinJvmProjectExtension
import paramicons.schemact.paramicons

plugins {
    id("java")
    kotlin("jvm") version "1.7.10"
    id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"
}

schemactConfig {
    schemact= paramicons
    functions = paramicons.functions
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    // TODO - these should be added by plugin
    implementation("com.amazonaws:aws-lambda-java-core:1.2.1")
    implementation("com.amazonaws:aws-lambda-java-events:3.11.0")
    implementation("com.amazonaws:aws-java-sdk-s3:1.11.574")
}

tasks.test {
    useJUnitPlatform()
}
