# [Paramicons](https://paramicons.testedsoftware.org/)

This repo is for fun but also because . . . 
- Icons should be parameterised
  -  Menu item "Sample Doc" illustrates using a paramicon that is sensitive to text level.
- Icons should be svgs

#### A Sample Paramicon
![](paramiconsample.svg)

#### is defined by: (lib)param-icons/polarRadialCon2MetaData/(function)defaultPolarRadialCon2Params9

## UI

The ui is deployed here : [paramicons.testedsoftware.org](https://paramicons.testedsoftware.org/)
The ui code is here [param-icons](ui/param-icons). Its built with npm version 8.6.0.
This is structured as library + example app.  
The app presents param icons located in the library exposed via metadata defined in file [Property.tsx](ui/param-icons/src/iconz/Property.tsx). This arrangement is to enable development of multiple, versioned paramicons libraries that can be accessed from 1 app.

## Server
The ui code is served using a standard AWS S3 static website pattern.
Whatsapp sharing is enabled by a single lambda function (**svgThumbnailer**) located at deveparamicons.testedsoftware.org/share/.
This function maps ui created svgs into static content that works with the Whatsapp webcrawler.
See code here: [SvgThumbnailHandler](aws/svgthumbnailer/src/main/kotlin/org/testedsoftware/paramicons/SvgThumbnailHandler.kt) 

## Infrastructure

Infrastructure is deployed via main program [DevDeployment.kt](aws/stack/src/main/kotlin/com/typedpath/stack/DevDeployment.kt).
Its run with java 17.
The stack is: **Route 53 Record Set** = points to => **Cloudfront Distribution** ==uses origins => **S3 bucket**, **lambda function**.  Its defined using kotlin DSL [cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin).
File [CloudFormationUtil.kt]([cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin) ) does not belong here - it should be in [cloudformation2kotlin](https://github.com/typedpath/cloudformation2kotlin) 
Similarly [StaticWebsiteResources.kt](aws/stack/src/main/kotlin/com/typedpath/stack/StaticWebsiteResources.kt) does not belong in this repo as it defines a generic aws static website hosting.

diagram generated with this util:  https://www.npmjs.com/package/@mhlabs/cfn-diagram
```
cfn-dia draw.io -c true -t aws/stack/docs/renderedTemplates/CodeHostTemplate.yaml  -o aws/stack/docs/renderedTemplates/CodeHostTemplate.drawio
cfn-dia draw.io -c true -t aws/stack/docs/renderedTemplates/HostTemplate.yaml  -o aws/stack/docs/renderedTemplates/HostTemplate.drawio
```
![](C:\data5hp\training\projects\paramicons\aws\stack\docs\renderedTemplates\HostTemplate.drawio.svg)

## TODO (next)
### Include code build in deployment script
### Facebook , X Share
### Cost Prediction
### Rate Limiting 
review https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/WAF-one-click-rate-limiting.html
