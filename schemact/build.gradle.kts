import com.typedpath.aws.deployCode
import com.typedpath.aws.deployInfrastructure
import com.typedpath.aws.deployUiCode
import paramicons.schemact.*


plugins {
    kotlin("jvm") version "1.7.10"
    id("java")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
    mavenLocal()
}

dependencies {
    implementation("com.typedpath:schemact4:1.0-SNAPSHOT")
    testImplementation(platform("org.junit:junit-bom:5.9.1"))
    testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.test {
    useJUnitPlatform()
}

val thumbnailerJar = File("${projectDir}/../aws/svgthumbnailer/build/libs/svgthumbnailer-1.0.12-SNAPSHOT-fat.jar")

val deployTestCode = tasks.register("deployTestCode") {
    deployCode(paramicons, "schemactsample", thumbnailerJar)
}

val deployTestInfrastrure = tasks.register("deployInfrastructure") {
    deployInfrastructure(paramicons, "schemactsample", thumbnailerJar)
}


val uiCodeLocation = "${projectDir}/../ui/param-icons/example/build";

val deployTestUICode = tasks.register("deployUICode") {
    deployUiCode(paramicons, "schemactsample", uiCodeLocation)
}

