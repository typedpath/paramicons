import paramicons.schemact.paramicons

plugins {
    id("java")
    id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}

schemactConfig {
    schemact = paramicons
    // TODO make these configs optional
    uiCodeLocation = "N/A"
    idToFunctionJars =  mapOf("thumbnail" to  File("${projectDir}/aws/svgthumbnailer/build/libs/svgthumbnailer-1.0.14-SNAPSHOT-fat.jar"))
    // TODO add list of functions in this module

}