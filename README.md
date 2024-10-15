<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Descripción

Proyecto de Backend para ofrecer un servición monolítico que maneje la autenticación de una aplicación de gestión de tareas y maneje las operaciones CRUD de gestión de tareas, validando que se envie el token de autenticación válido para poder realizar las peticiones CRUD.

## Funcionalidades

### Gestión de Tareas
- **Crear Tarea**: Permite crear nuevas tareas en el sistema.
- **Obtener Todas las Tareas**: Recupera todas las tareas de un usuario específico.
- **Obtener Tarea Específica**: Recupera una tarea utilizando su ID.
- **Actualizar Tarea**: Permite actualizar la información de una tarea existente.
- **Eliminar Tarea**: Elimina una tarea específica utilizando su ID.

### Gestión de Usuarios
- **Registro de Usuario**: Permite a los nuevos usuarios registrarse en la aplicación.
- **Inicio de Sesión**: Permite a los usuarios existentes iniciar sesión y obtener un token de autenticación.

## Endpoints

### Tareas
| Método  | Endpoint            | Descripción                       |
| ------- | ------------------- | --------------------------------- |
| POST    | `/tareas`           | Crear una nueva tarea            |
| GET     | `/tareas`           | Obtener todas las tareas         |
| GET     | `/tareas/:id`       | Obtener una tarea específica      |
| PATCH   | `/tareas/:id`       | Actualizar una tarea             |
| DELETE  | `/tareas/:id`       | Eliminar una tarea               |

### Autenticación de Usuarios
| Método  | Endpoint              | Descripción                       |
| ------- | --------------------- | --------------------------------- |
| POST    | `/auth/signup`        | Registrar un nuevo usuario        |
| POST    | `/auth/signin`        | Iniciar sesión y obtener un token |


## Instalación

Primero, instala las dependencias del proyecto:

```bash
npm install
```
## Iniciar el monolito

```bash
docker compose up --build
```


## Desarrolladores
* Erick Lasluisa
* Francisco Quiroga
* Ariel Rivadeneira
* Augusto Salazar