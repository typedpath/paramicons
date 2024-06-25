# Paramicons

This repo is for fun but also because . . . 
- Icons should be parameterised
  -  TODO examples why 
- Icons should be svgs

## ui

The ui is deployed here : [paramicons.testedsoftware.org](https://paramicons.testedsoftware.org/)

This is structured as library + example app.  
The app presents param icons located in the library exposed via metadata defined in file [Property.tsx](paramicons.ui/param-icons/src/iconz/Property.tsx). This arrangement is to enable development of multiple, versioned paramicons libraries that can be accessed from 1 app.

## infrastructure

Infrastructure is deployed via main program [DevDeployment.kt](aws/stack/src/main/kotlin/com/typedpath/stack/).
Please note file CloudFormationUtil.kt does not belong here it should be in [cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin) 

