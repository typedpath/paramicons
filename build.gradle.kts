import paramicons.schemact.mainPage
import paramicons.schemact.paramicons
import paramicons.schemact.thumbnailerFunction

plugins {
    kotlin("jvm") version "1.7.10"
    id("java")
    id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"
}

repositories {
    mavenCentral()
    mavenLocal()
}

schemactConfig {
    schemact = paramicons
    uiCodeBuildLocation = "${projectDir}/ui/param-icons/example/build"
    uiCodeBuildScript = """
export NODE_OPTIONS=--openssl-legacy-provider        
cd ui/param-icons
npm install
npm run build
cd example
npm install
npm run build
    """.trimIndent()

}

tasks.test {
    useJUnitPlatform()
}
