
plugins {
    kotlin("jvm") version "1.7.10"
    id("java")
}

group = "org.example"
version = "1.0.14-SNAPSHOT"

val ktor_version: String by project

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

    testImplementation("io.ktor:ktor-client-core:$ktor_version")
    testImplementation("io.ktor:ktor-client-cio:$ktor_version")

    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.1")

}

val fatJar = tasks.register<Jar>("fatJar") {
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    archiveClassifier.set("fat")

    from(sourceSets.main.get().output)

    println("sourceSets.main : ${sourceSets.main.javaClass} ${sourceSets.main} ")

    println("sourceSets.main.get().output: ${sourceSets.main.get().output.javaClass} ${sourceSets.main.get().output}")

    dependsOn(configurations.runtimeClasspath)
    //println ("configurations.runtimeClasspath: ${configurations.runtimeClasspath.javaClass} ${configurations.runtimeClasspath}")
    println ("configurations.runtimeClasspath.get(): ${configurations.runtimeClasspath.get().javaClass} ${configurations.runtimeClasspath.get()}")

    from({
        configurations.runtimeClasspath.get().filter { it.name.endsWith("jar") }
            //.onEach{ println("processing ${it.javaClass} $it")}
            .map {
            //println("about to zipTree ${it.javaClass} $it")
            zipTree(it)
           // println("Zip Treed ${it.javaClass} $it")

        }
    })
}


tasks.test {
    useJUnitPlatform()
}

