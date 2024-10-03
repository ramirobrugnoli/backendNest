<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://conexa.ai/meta-logo.jpg" width="240" alt="Conexa Logo" /></a>
</p>

  <p align="center"><b>Repositorio challenge conexa por Ramiro Brugnoli</b></p>
    <p align="center">


## Definición
  <p align="center">Este proyecto es un backend desarrollado en Nest con TypeScript, que consta de un servicio de logging y autorización a través de jwt para usuarios, y recupera información sobre peliculas a través de una API pública de star wars para guardarlos en una base de datos propia de la app (montada en PostgreSql).</p>
  <p>Los usuarios son definidos en 'user' / 'admin' / 'superadmin'. El 'superadmin' es el único usuario capaz de conceder/quitarle el status de admin al resto de los usuarios, a través de los endpoints definidos en /admin <a href="https://ibb.co/7KkCQf1"><img src="https://i.ibb.co/9WZghDr/image.png" alt="image" border="0"></a>  </p>
  <p>En "produccion" está definido como 'superadmin' el usuario con las credenciales <b>"admin@admin.com" "adminpassword"</b> para testear en local, hay que asignar este rol manualmente al usuario deseado.</p>
  <p>La aplicación consume la API de star wars al momento de su despliegue (onModuleInit()), y llena su base de datos con los objetos de peliculas (/films) devueltos por la API. A su vez, al momento de su despliegue hace una consulta al endpoints de (/characters) de la API, almacenando en su base toda la información, y estableciendo una relación entre films y characters, para luego cuando un usuario consulta por determinada película, en lugar de recibir las "url" de los characters, pueda visualizar el objeto completo. <a href="https://ibb.co/tz2FB9b"><img src="https://i.ibb.co/1MXjZk9/50243740-6-FFC-4-FF1-BC39-1-FEF92-FFE31-F.png" alt="50243740-6-FFC-4-FF1-BC39-1-FEF92-FFE31-F" border="0"></a><p>Cuenta con un sistema de @Cron, en donde automaticamente todos los días a medianoche consulta la API de StarWars, y sincroniza los datos devueltos con los que tenemos alojados</p>

## APIs
<p align="center">Todos sus endpoints están documentados a través de Swagger, por lo que podemos visualizar su funcionamiento entrando a la url/api.</p>
<a align="center" styles="width: 100%" href="https://ibb.co/PrsfQDP"><img src="https://i.ibb.co/D1PSprv/6-AABDB8-D-C9-BE-4462-8491-6-F3-DDF1488-A7.png" alt="6-AABDB8-D-C9-BE-4462-8491-6-F3-DDF1488-A7" border="0" align="center"></a>
<p>Para facilitar la prueba de las APis, se creó una colección en Postman:</p> <a>https://red-equinox-850655.postman.co/workspace/My-Workspace~2282bccc-4810-4a88-8ddf-2492e4415cb8/collection/23442081-2f885413-e054-49d5-bdf2-d84b3263a4f9?action=share&creator=23442081&active-environment=23442081-7c418555-9824-4ee6-a9af-484bd368e7a3</a> 
<p>Ya que la app funciona mediante un sistema de autorizaciones, la forma de acceder a las diferentes requests con distintos roles es la siguiente:</p>
<ul><li>Registrar un usuario</li>
<li>Con nuestro usuario registrado, hacemos el logging y la app nos va a devolver un "access_token" jwt</li>
<a href="https://ibb.co/XywfSQz"><img src="https://i.ibb.co/PTSswL5/54488-C36-D20-F-4653-BA80-88-C8-FB1679-E2.png" alt="54488-C36-D20-F-4653-BA80-88-C8-FB1679-E2" border="0"></a>
<li>Para testear el resto de funcionalidades, debemos cargar nuestro access_token en la pestaña 'Authorization', seleccionando el método "Bearer token"</li>
<a href="https://ibb.co/JcfxGtD"><img src="https://i.ibb.co/vc7sTq0/4824-F09-A-26-D7-4-F8-E-8026-F88-CE22348-F8.png" alt="4824-F09-A-26-D7-4-F8-E-8026-F88-CE22348-F8" border="0"></a></ul>


## Testing
<p>La app cuenta con todos sus servicios, controladores y guards testeados en jest</p>
<a href="https://ibb.co/LpNNmTT"><img src="https://i.ibb.co/7ykkP33/625-B4-F5-B-A2-E4-4518-BA85-A01-E9798229-C.png" alt="625-B4-F5-B-A2-E4-4518-BA85-A01-E9798229-C" border="0"></a>

## Deploy
<p>El proyecto backend está desplegado en un servidor de heroku, simulando "produccion".</p>
<a>https://challenge-conexa-ff15a1129240.herokuapp.com/</a>
<p>Por lo que podemos testear los endpoints tanto si levantamos la app localmente como en "producción"</p>
<a href="https://ibb.co/SR7Pmtc"><img src="https://i.ibb.co/V2ptCgx/image.png" alt="image" border="0"></a>
<a href="https://ibb.co/w06f97H"><img src="https://i.ibb.co/6nsk38h/image.png" alt="image" border="0"></a>

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Ramiro Brugnoli](https://www.linkedin.com/in/ramirobrugnoli/)

