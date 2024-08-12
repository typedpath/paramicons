import paramicons.schemact.*


plugins {
    kotlin("jvm") version "1.7.10"
    id("java")
    id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    mavenLocal()
}

val thumbnailerJar = File("${projectDir}/../aws/svgthumbnailer/build/libs/svgthumbnailer-1.0.12-SNAPSHOT-fat.jar")


schemactConfig {
    testMessage = "hello world this is the end or is it ??"
    schemact = paramicons
    uiCodeLocation = "${projectDir}/../ui/param-icons/example/build"
    thumbnailerJar = "${projectDir}/../aws/svgthumbnailer/build/libs/svgthumbnailer-1.0.12-SNAPSHOT-fat.jar"
}

dependencies {
    implementation("com.typedpath:schemact4:1.0-SNAPSHOT")
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}
