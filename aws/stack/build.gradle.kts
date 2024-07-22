plugins {
    kotlin("jvm") version "1.7.10"
    id("java")
}

val ktor_version: String by project

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    mavenLocal()
    maven(uri( "https://admin.shareddev.testedsoftware.org/repository")) {
        url = uri( "https://admin.shareddev.testedsoftware.org/repository")
    }
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    testImplementation("io.ktor:ktor-client-core:$ktor_version")
    testImplementation("io.ktor:ktor-client-cio:$ktor_version")

    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.1")


    implementation("com.amazonaws:aws-java-sdk-s3:1.11.574")
    implementation("com.amazonaws:aws-java-sdk-cloudformation:1.11.574")
    implementation("com.typedpath:cloudformation2kotlin:2.0.6-SNAPSHOT")

    //TODO try cdk implementation("software.amazon.awscdk:aws-cdk-lib:2.0.0")

}

tasks.test {
    useJUnitPlatform()
}