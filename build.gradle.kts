import paramicons.schemact.paramicons

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

schemactConfig {
    schemact = paramicons
    uiCodeLocation = "${projectDir}/ui/param-icons/example/build"
    idToFunctionJars =  mapOf("thumbnail" to  File("${projectDir}/aws/svgthumbnailer/build/libs/svgthumbnailer-1.0.14-SNAPSHOT-fat.jar"))
}

dependencies {

}

tasks.test {
    useJUnitPlatform()
}
