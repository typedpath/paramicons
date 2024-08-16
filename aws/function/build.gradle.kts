import org.jetbrains.kotlin.gradle.dsl.KotlinJvmProjectExtension
import paramicons.schemact.paramicons

plugins {
    id("java")
    kotlin("jvm") version "1.7.10"
    id("com.typedpath.schemact4.schemact-plugin") version "1.0-SNAPSHOT"
}

schemactConfig {
    schemact= paramicons
    functions = paramicons.functions
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

val debug = tasks.register("debug") {
    actions.add  {
        sourceSets.forEach {
            println("source set: ${it.name}")
            it.allSource.forEach {
                println("   source dir ${it.absolutePath}")
            }
        }
        project.extensions.getByType<KotlinJvmProjectExtension>()
            .sourceSets.forEach {
                println("k source set: ${it.name}")
                it.kotlin.srcDirs.forEach {
                    println(" srcDir: ${it.absolutePath}")
                }
                it.kotlin.forEach {
                    println("   ${it.absolutePath}")
                }
            }
    }
}
