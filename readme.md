# [Paramicons](https://paramicons.testedsoftware.org/)

This repo is for fun but also because . . . 
- Icons should be parameterised
  -  TODO insert examples into ui app "About" 
- Icons should be svgs

#### A Sample Paramicon
![](paramiconsample.svg)

#### is defined by: (lib)param-icons/polarRadialCon2MetaData/(function)defaultPolarRadialCon2Params9

## UI

The ui is deployed here : [paramicons.testedsoftware.org](https://paramicons.testedsoftware.org/)
The ui code is here [param-icons](ui/param-icons). Its built with npm version 8.6.0.
This is structured as library + example app.  
The app presents param icons located in the library exposed via metadata defined in file [Property.tsx](ui/param-icons/src/iconz/Property.tsx). This arrangement is to enable development of multiple, versioned paramicons libraries that can be accessed from 1 app.

## Infrastructure

Infrastructure is deployed via main program [DevDeployment.kt](aws/stack/src/main/kotlin/com/typedpath/stack/DevDeployment.kt).
Its run with java 17.
The stack is: **Route 53 Record Set** / **Cloudfront Distribution** / **S3 bucket**.  Its defined using kotlin DSL [cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin).
File [CloudFormationUtil.kt]([cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin) ) does not belong here - it should be in [cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin) 
Similarly [StaticWebsiteResources.kt](aws/stack/src/main/kotlin/com/typedpath/stack/StaticWebsiteResources.kt) does not belong in this repo as it defines a generic aws static website hosting.

## TODO (next)
### Dev Deployment
[https://devparamicons.testedsoftware.org/](https://devparamicons.testedsoftware.org/)

### Cost Prediction
### Rate Limiting 
https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/WAF-one-click-rate-limiting.html
