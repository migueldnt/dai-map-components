##scripts

`npm run dev` para probar en componente reusable en la aplicacion contenida en *dev/App.vue*

`npm run build` para construir la libreria en el folder *dist*


## como se creo este proyecto


```bash
#se asume que se tiene instalado vue-cli, primero se crea el proyecto
vue create name_project
#borrar src y html folder
#crear component.vue e index dentro de src ( el index con la funcion install)
#agregar build command en package.json
#opcionalmente crear la carpeta dev y un App.vue para probar el componente
```