import paramicons.schemact.paramicons

plugins {
    id("java")
    id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"
}

schemactConfig {
    schemact= paramicons
    functions = paramicons.functions
    codeGenerationTargetDirectory = File("${projectDir}/srcgendir ??")
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

