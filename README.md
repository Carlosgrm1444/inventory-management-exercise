

# 🧪 API de Gestión de Inventario - Ejercicio Técnico Backend

Este proyecto fue desarrollado como parte de un ejercicio técnico para una vacante de **desarrollador backend**, utilizando **NestJS**, **MySQL** y **TypeORM**. La finalidad es construir una **API RESTful** para gestionar un inventario, incluyendo operaciones CRUD para usuarios, productos y categorías, además de funcionalidades de control de stock.

## ✅ Funcionalidades implementadas

* 🔐 **Autenticación con JWT**

  * Inicio de sesión para obtener token.
  * Protección de rutas mediante `AuthGuard`.
  * Solo los usuarios autenticados pueden interactuar con la API.
  * Encriptación de contraseñas con Bcrypt

* 🧑‍💼 **Módulo de Usuarios**

  * Registro y autenticación.
  * CRUD completo.
  * Validaciones con `class-validator`.
 
  
* 🛡️ Módulo de Roles
  * Gestión de roles de usuario.
  * Asociación de roles a los usuarios.
  

* 🗂️ **Módulo de Categorías**

  * CRUD completo.
  * Asociadas a los productos.
  * Validaciones.

* 📦 **Módulo de Productos**

  * CRUD completo.
  * Relación con categorías.
  * Campos: nombre, descripción, precio, stock, etc.

* 🔄 **Gestión de stock**

  * Endpoint para agregar stock a un producto (`PATCH /products/:id/increase`).
  * Endpoint para reducir stock (`PATCH /products/:id/decrease`).

## 💡 Funcionalidades extra

- 🕓 **Historial de movimientos de stock**
  - Registro de cada entrada y salida de inventario.
  - Endpoint disponible para consultar el historial por producto.

- 🔍 **Búsqueda y filtros**
  - Endpoint para buscar productos por nombre o descripción.
  - Endpoint para listar productos filtrados por categoría.

- 📄 **Documentación de la API**
  - Documentación generada automáticamente con Swagger (`@nestjs/swagger`).

- ⚙️ **Extras técnicos**
  - Proyecto desplegado en un servicio de infraestructura gratuito.
  - Uso de variables de entorno y configuración segura para proteger credenciales sensibles.
 


## ⚙️ Tecnologías y herramientas

* **NestJS** – framework principal
* **MySQL** – base de datos relacional
* **TypeORM** – ORM para manejo de entidades
* **JWT** – para autenticación segura
* **Class-validator** – validaciones en DTOs
* **Swagger** – documentación interactiva de la API
* **Bcrypt** - encriptación de contraseñas
* **Railway** - despliegue de la API

## 🧪 Probar la API

Puedes acceder a la documentación interactiva y probar los endpoints directamente desde Swagger en el siguiente enlace:

👉 [https://inventory-management-exercise-production.up.railway.app/docs#/](https://inventory-management-exercise-production.up.railway.app/docs#/)



