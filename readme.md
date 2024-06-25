# Paramicons

This repo is for fun but also because . . . 
- Icons should be parameterised
  -  TODO examples why 
- Icons should be svgs

## UI

The ui is deployed here : [paramicons.testedsoftware.org](https://paramicons.testedsoftware.org/)

This is structured as library + example app.  
The app presents param icons located in the library exposed via metadata defined in file [Property.tsx](ui/param-icons/src/iconz/Property.tsx). This arrangement is to enable development of multiple, versioned paramicons libraries that can be accessed from 1 app.

## Infrastructure

Infrastructure is deployed via main program [DevDeployment.kt](aws/stack/src/main/kotlin/com/typedpath/stack/DevDeployment.kt).
Currently 
Please note file CloudFormationUtil.kt does not belong here it should be in [cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin) 

## TODO
### Whatsapp sharing 
-  The share button must generate the URL required to edit the shared paramicon.
-  Whatsapp requires a meta tag in index html something like this : &lt;meta property ="og:image" content="https://paramicons.testedsoftware.org/thumbnail[sharid].png" />
-  The thumbnail creation + storage must happen pre share - via a new thumbnail service. 
-  Thumbnail service could map svg to png for example.