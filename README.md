# patrisha-de-boon-site

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
``` 

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy
Linux
```
sh deploy.sh
```

Windows
```
.\deploy.ps1
```

Note that on Windows when running the deploy script in powershell, you may encounter a "File _ cannot be loaded" error because deploy.ps1 is not digitally signed. If this happens, you can run the following command to bypass this security check for your current powershell process (And not other sessions).

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

If you wish to maintain your current execution policy within the active session you can save the existing policy and restore it afterwards using the following series of commands.
```
$currPolicy = Get-ExecutionPolicy
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\deploy.ps1
Set-ExecutionPolicy -Scope Process -ExecutionPolicy $currPolicy
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### References and Resources

The following sources were referenced when creating this project. 
If any code is adapted from a source, the source will also be referenced in the relevent file.

[Deploying Vue Apps to Github Pages](https://medium.com/swlh/deploy-vue-app-to-github-pages-2ada48d7397e)
[Create an animated Vue 3 component when scrolling into view](https://michael-verschoof.medium.com/create-an-animated-vue-3-component-when-scrolling-into-view-f8e793e221c8)
[Automatic Height When Embedding A Youtube Video](https://stackoverflow.com/questions/35814653/automatic-height-when-embedding-a-youtube-video)