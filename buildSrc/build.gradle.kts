plugins {
    kotlin("jvm") version "1.9.0"
    id("java")
   // id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"

}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    mavenLocal()
    /*maven(uri( "https://admin.shareddev.testedsoftware.org/repository")) {
        url = uri( "https://admin.shareddev.testedsoftware.org/repository")
    }*/
}

dependencies {
    implementation("com.typedpath:schemact4:1.0-SNAPSHOT")
}

tasks.test {
    useJUnitPlatform()
}

