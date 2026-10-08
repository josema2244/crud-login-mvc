# CRUD y Login con MVC

![PHP](https://img.shields.io/badge/PHP-8.2-777BB4?logo=php&logoColor=white)
![CodeIgniter](https://img.shields.io/badge/CodeIgniter-4-EF4223?logo=codeigniter&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?logo=microsoftsqlserver&logoColor=white)

## Índice

- [Descripción](#descripción)
- [Estado del proyecto](#estado-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Cómo está organizado el MVC](#cómo-está-organizado-el-mvc)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Tecnologías](#tecnologías)
- [Autor](#autor)
- [Licencia](#licencia)

## Descripción

Este proyecto es la Tarea 3 de Ingeniería Web en la UDLA. Es una aplicación que aplica el patrón MVC con un CRUD de productos y un sistema de login en el mismo proyecto.

Para el backend usé CodeIgniter 4. La interfaz está hecha en React y consume la API del backend en formato JSON. Los datos se guardan en SQL Server.

## Estado del proyecto

Terminado. Cumple con lo que pedía la tarea: MVC, CRUD, login, rutas protegidas y contraseñas cifradas.

## Funcionalidades

- Inicio y cierre de sesión.
- Crear, listar, editar y eliminar productos.
- Las rutas del CRUD están protegidas. Si no hay sesión iniciada, el servidor responde `401 No autenticado`.
- Las contraseñas se guardan cifradas con bcrypt. No usé MD5 porque ya no se considera seguro.
- Los datos se validan en el servidor antes de guardarse.



Video de la explicación: https://youtu.be/4SD96HOiYBw 

## Cómo está organizado el MVC

- **Modelo:** `app/Models/ProductoModel.php` y `app/Models/UsuarioModel.php`. Son los únicos que hablan con la base de datos.
- **Vista:** `frontend/src/App.jsx`. Es la interfaz en React.
- **Controlador:** `app/Controllers/ProductoController.php` y `app/Controllers/AuthController.php`. Reciben la petición, validan, usan el modelo y responden.
- **Rutas:** `app/Config/Routes.php`. Las rutas del CRUD están agrupadas con el filtro `auth`.
- **Filtro:** `app/Filters/AuthFilter.php`. Revisa que exista una sesión antes de llegar al controlador.

El recorrido de una petición es: React, rutas, filtro, controlador, modelo y SQL Server.

## Cómo ejecutarlo

Necesitas PHP 8.2 (con las extensiones `intl`, `mbstring`, `zip` y `sqlsrv`), Composer, Node.js, SQL Server con SSMS y el ODBC Driver 17 o 18.


Abre http://localhost:5173 e inicia sesión con el usuario `admin` y la contraseña `admin123`.


## Tecnologías

- PHP 8.2 y CodeIgniter 4
- React y Vite
- SQL Server
- Composer, npm, Git y VS Code

## Autor

José Jáuregui, estudiante de Ingeniería de Software en la Universidad de las Américas.
