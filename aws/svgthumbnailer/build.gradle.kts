plugins {
    kotlin("jvm") version "1.7.10"
    id("java")
}

group = "org.example"
version = "1.0.12-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.amazonaws:aws-lambda-java-core:1.2.1")
    implementation("com.amazonaws:aws-lambda-java-events:3.11.0")

    implementation("org.apache.xmlgraphics:batik-all:1.17")
    implementation("com.amazonaws:aws-java-sdk-s3:1.11.574")
    implementation("com.amazonaws:aws-java-sdk-cloudformation:1.11.574")

    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")



}

val fatJar = tasks.register<Jar>("fatJar") {
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    archiveClassifier.set("fat")

    from(sourceSets.main.get().output)

    dependsOn(configurations.runtimeClasspath)
    from({
        configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }.map { zipTree(it) }
    })
}


tasks.test {
    useJUnitPlatform()
}