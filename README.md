# Práctica: Comma Separated Values

## Tecnologías utilizadas

Se hace uso de varias tecnologías en el desarrollo de esta actividad:

* localStorage.
* jQuery.
* Underscore y EJS.
* Express.
* SASS.
* Heroku.

## Descripción

Se trata de añadir los requisitos que a continuación se detallan al proyecto
de partida que se encuentra en [este repositorio](https://github.com/crguezl/csv).
En él, se resuelve el problema de analizar una entrada de valores separados por 
comas generando como salida una tabla con el resultado del análisis.

## Enlaces

* El repositorio [hello-express](https://github.com/SYTW/hello-express).
* [Apuntes](http://crguezl.github.io/pl-html/node11.html) del profesor.
* Despliegue en [gh-pages](http://crguezl.github.io/csv/) de la aplicación inicial.
* Despliegue en [Heroku](https://csv-app.herokuapp.com/) de la aplicación final.

## Requisitos (1)

* Modificar la solución actual para obtener una aplicación cliente-servidor (más detalles [aquí](https://casianorodriguezleon.gitbooks.io/pl1516/content/practicas/csv.html)).
* Utilizar SASS para generar el estilo CSS.
* Usar GULP para la automatización de tareas.
* Se debe hacer uso de localStorage para almacenar las últimas entradas (ya hecho en la versión inicial).
* Se usa también Underscore para las plantillas en el cliente y EJS para las del servidor.

## Requisitos (2)
* Realizar un _request AJAX_ de manera que el navegador lea los datos de entrada y los envíe al servidor,
quien calcula la tabla y devuelve en formato JSON la tabla (el array de arrays) que finalmente es insertado en
la página por el cliente/navegador.
* Aislar el cálculo de la tabla en un módulo Node.js (notación module.exports);
* Añadir botones de selección que permitan cargar un fichero específico en una lista de ficheros en el textarea 
de entrada.
* Añadir una zona de Drag-and-Drop a la que se pueda arrastrar un fichero para analizar.
* Añadir un botón de lectura de fichero para cargar una entrada desde fichero.