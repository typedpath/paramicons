# [Paramicons - paramicons.testedsoftware.org](https://paramicons.testedsoftware.org/)

This repo is for fun but also because . . . 
- Icons should be parameterised
  -  Menu item "Sample Doc" illustrates using a paramicon that is sensitive to text level.
- Icons should be svgs

#### A Sample Paramicon
![](paramiconsample.svg)

#### is defined by: (lib)param-icons/polarRadialCon2MetaData/(function)defaultPolarRadialCon2Params9

## UI

The ui is deployed here : [paramicons.testedsoftware.org](https://paramicons.testedsoftware.org/), the dev site is here: [devparamicons.testedsoftware.org](https://devparamicons.testedsoftware.org/)
The ui code is here [param-icons](ui/param-icons). Its built with npm version 8.6.0.
This is structured as library + example app.  
The app presents param icons located in the library exposed via metadata defined in file [Property.tsx](ui/param-icons/src/iconz/Property.tsx). This arrangement is to enable development of multiple, versioned paramicons libraries that can be accessed from 1 app.

## Server
The ui code is served using a standard AWS S3 static website pattern.
Whatsapp sharing is enabled by lambda functions (**svgThumbnailer**, **svgThumbnailerExtra**) located at paramicons.testedsoftware.org/functions/.
These functions maps ui created svgs into static content that works with the Whatsapp webcrawler.
See code here:  [SvgThumbnailImpl](functions/src/main/kotlin/org/testedsoftware/paramicons/SvgThumbnailImpl.kt), [SvgThumbnailExtraImpl](functions/src/main/kotlin/org/testedsoftware/paramicons/SvgThumbnailExtraImpl.kt)

## Code Build / Infrastructure / Deployment

Deployment including code and infrastructure build is via gradle plugin **schemact4**. 
This plugin deals with:
   - deploying infrastructure in aws
   - code generation of typescript lambda function clients 
   - code generation of lambda function wrappers  
   - build and deployment of code.
The (schemact4) model defining the project architecture is defined here: [paramicons.kt](buildSrc/src/main/kotlin/paramicons/schemact/Paramicons.kt)   

Schemact4 is not deployed to a public repo so downloading and local deployment the 2 modules in this project is necessary.

The steps for building schemact4 to local repo are described here:
https://github.com/typedpath/schemact4/blob/main/localdeployment.md

These are the steps for building and deployment:
  - run script [buildUiCode.sh]() 
  - run gradle task **schemact_<_deploymentName_>** e.g. **schemact_devparamicons**


The stack is: **Route 53 Record Set** = points to => **Cloudfront Distribution** ==uses origins => **S3 bucket**, **lambda function**.

diagram generated with this util:  https://www.npmjs.com/package/@mhlabs/cfn-diagram
```
cfn-dia draw.io -c true -t aws/stack/docs/renderedTemplates/HostTemplate.yaml  -o aws/stack/docs/renderedTemplates/HostTemplate.drawio
```
![](aws/stack/docs/renderedTemplates/HostTemplate.drawio.svg)

## TODO (next)
### ~~Include code build in deployment script~~
### Facebook , X Share
### Cost Prediction
### Rate Limiting 
review https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/WAF-one-click-rate-limiting.html
