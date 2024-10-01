# Practica 2 dashboard con login
## Descripción
Este es un proyecto Node.js que utiliza Express.js como framework web, con autenticación mediante JWT, manejo de sesiones, y una base de datos MySQL. El proyecto incluye funcionalidades para la carga de archivos y un formulario de registro/login.

## Requisitos Previos
- Node.js (versión recomendada: 18.x o superior)
- MySQL/MariaDB
- npm 

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/juanhaag/practica-2.git
cd practica-2
```

2. Instalar dependencias:
```bash
npm install
```
3. Configuración del entorno:

   - Editar el archivo `.env` con tus configuraciones:
    ```
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASS=root
    DB_DATABASE=music
    JWT_SECRETO = 12345678
    JWT_TIEMPO_EXPIRA = 7d
    JWT_COOKIE_EXPIRES = 90
     ```


## Ejecución del Proyecto

```bash
nodemon app / node app
```


El servidor estará disponible en `http://localhost:3000` (el puerto se configura en el archivo .env)


## Características Principales
- Autenticación mediante JWT
- Manejo de sesiones de usuario
- Carga de archivos usando multer
- Plantillas EJS para el renderizado del lado del servidor
- Base de datos MySQL/MariaDB


## Middleware
### Multer
El proyecto utiliza multer para la gestión de carga de archivos. La configuración se encuentra en `middlewares/multerConfig.js`.

### Sesión
La gestión de sesiones se maneja a través de express-session. La configuración se encuentra en `middlewares/authMiddleware.js`.

## Base de Datos
El proyecto utiliza MySQL como base de datos. El esquema y las tablas iniciales se pueden encontrar en `database/initDatabase.sql`.


## Licencia
alguna

