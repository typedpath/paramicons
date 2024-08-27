# building source
- run gradle task schemact/genCode 
- this will generate code in folder build/schemactgen.
- The Handler class will not compile without an implementation in src/main/org.testedsoftware/paramicons/<functName>Impl.kt
- If this Impl clss file doesnt exist it will get autocreated
- An interface class is generated build/schemactgen - not sure if this has any value yet