import paramicons.schemact.mainPage
import paramicons.schemact.paramicons
import paramicons.schemact.thumbnailerFunction

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
    uiCodeBuildLocation = "${projectDir}/ui/param-icons/example/build"
    functionToFunctionJars =  mapOf(thumbnailerFunction to
            File("${projectDir}/aws/functions/build/libs/functions-1.0.08-SNAPSHOT-schemact-aws-lambda.jar"))
}

dependencies {

}

tasks.test {
    useJUnitPlatform()
}
