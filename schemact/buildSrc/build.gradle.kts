plugins {
    kotlin("jvm") version "1.9.0"
    id("java")
}

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
    implementation("com.typedpath:schemact4:1.0-SNAPSHOT")
    implementation("com.amazonaws:aws-java-sdk-core:1.11.574")
    implementation("com.amazonaws:aws-java-sdk-s3:1.11.574")
    implementation("com.amazonaws:aws-java-sdk-cloudformation:1.11.574")
    implementation("com.typedpath:cloudformation2kotlin:2.0.6-SNAPSHOT")
}

tasks.test {
    useJUnitPlatform()
}

