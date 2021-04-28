## scripts

`npm run dev` para probar en componente reusable en la aplicacion contenida en *dev/App.vue*

`npm run build` para construir la libreria en el folder *dist*

## ejemplo de como se usa este componente en un aplcativo externo
En este repositorio en `dev/App.vue`

En un proyecto externo: [pruebas-componente-mapa1](https://github.com/migueldanto/pruebas-componente-mapa1) 
## como se creo este proyecto


```bash
#se asume que se tiene instalado vue-cli, primero se crea el proyecto
vue create name_project
#borrar src y html folder
#crear component.vue e index dentro de src ( el index con la funcion install)
#agregar build command en package.json
#opcionalmente crear la carpeta dev y un App.vue para probar el componente
```