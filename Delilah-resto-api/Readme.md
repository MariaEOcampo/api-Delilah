# Delilah Resto - API

Api concebida para pedidos de un resto. Se pueden registrar Usuarios administradores y usuarios administrativos son permisos diferenciados para que usuario cliente pueda registrarse, loguearse, listar productos, y realizar ordenes, y el Administrador será el que pueda agregar productos, editarlos y eliminarlos, asi como listar usuarios, ordenes permitiendo editar tambien estas últimas.

## Construido con 🛠️ 🚀

Node.js
Express.js
Mongo DB
Mongoose
Mongo DB Compass
GIT para control de versiones
Insomnia

## Instrucciones.


1.  Descargar el respositorio de github y ejecutar el comando npm install para instalar las dependencias. Instalar nodemon y ejecutar npm start para comenzar.
2. En la carpeta DBtest están los archivos JSON para armar la base de datos de nombre "resto" y poder desplegarla en Mongo DB Compass. 
Mongo DB Compass: https://www.mongodb.com/download-center/compass?tck=docs_compass
Puerto: 27017
Nombre de la db: resto
3. Realizar una nueva DATABASE y 3 Collections con los JSON adjuntados : "user", "products" y "orders".
4. Una vez conectado al localhost:8080 y a la db se pueden comenzar las pruebas.




### Verbos HTTP: 📋

user: cliente (con acceso limitado)
admin: administrador 

*GET /users: Obtiene todos los usuarios - **Solo para admin**
*GET /products  Obtiene todos los productos - **Para admin y users**
*GET /products/:productId  Obtiene producto por Id - **Para admin y users**
*GET /orders  Obtiene todas las ordenes - **Solo para admin**
*GET /orders:orderId  Obtiene Orden por Id - **Solo para admin**
*POST /users/signup Registrar nuevo usuario - **Para usuario nuevo ( por defecto user)**
*POST /users/login Registrar nuevo usuario -  **Para admin y users**
*POST /products Crear nuevo producto - **Para admin**
*POST /orders Crear nueva orden - **Para users y admin**
*PATCH /products/:productId Actualizar producto por Id - **Para admin**
*PATCH /orders/:orderId Actualizar orden por Id - **Para admin**


## Endpoints (con ejemplos) para probar ⚙️🔧
 
## Registrar un nuevo usuario

### POST /user/signup
Url: http://localhost:8080/user/signup

Usuario (cliente):

body de la petición:

{
"fullname" : "Juan Perez",
"adress": "Libertad 456",
"email": "juan@gmail.com",
"password": "123",
"role":"user" (Por defecto es rol user)
}

Si es admin
{
"fullname" : "Maria Ocampo",
"adress": "Colon 123",
"email": "maria@delilah.com",
"password": "123",
"role":"admin"    
}

Respuesta de signup:

{
  "message": "User Created"
}

Si el mail existe:
Error 409
{
  "message": "Mail exists"
}


### POST /user/login

Url: http://localhost:8080/user/signup

body de la petición:

{
"username":"maria@delilah.com",
"password": "123"
}

Respuesta de login:

{
  "message": "Auth successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlhQGRlbGlsYWguY29tIiwidXNlcklkIjoiNWVhMDc2MmQ2NGNkZWYxZjJjMzUxZmE5Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg3Njc5MDMzLCJleHAiOjE1ODc2ODI2MzN9.9CNDm0B5pBMT_rhCM3GbMy1hRV5Qj3tBzPQ22h_q7MM"
}

Si la contraseña es incorrecta:
Error 401 
Respuesta:
{
  "message": "Auth failed"
}

### GET /users

Sólo para administradores

Url: http://localhost:8080/users


Respuesta de login:

  {
    "role": "admin",
    "_id": "5ea0762d64cdef1f2c351fa9",
    "fullname": "Maria Ocampo",
    "email": "maria@delilah.com"
  },
  {
    "role": "user",
    "_id": "5ea0766264cdef1f2c351faa",
    "fullname": "Juan Perez",
    "email": "juan@gmail.com"
  },
  {
    "role": "user",
    "_id": "5ea21e7d97328014c89a2896",
    "fullname": "Homero Simpson",
    "email": "homero@gmail.com"
  }
]
Si no es administrador:
Error 401
{
  "message": "Auth failed"
}
### GET /products

Url: http://localhost:8080/products

Respuesta de get products:

[
  {
    "_id": "5ea1f19e1f6ddf2c187a53bb",
    "name": "Pizza Napolitana 8 porciones",
    "price": 400
  },
  {
    "_id": "5ea1f1cd1f6ddf2c187a53bc",
    "name": "Lomo Completo",
    "price": 300
  },
  {
    "_id": "5ea1f1da1f6ddf2c187a53bd",
    "name": "Milanesa Simple",
    "price": 200
  },
  {
    "_id": "5ea1f1ef1f6ddf2c187a53be",
    "name": "Coca-Cola 1.5 l.",
    "price": 150
  }
]

### GET /products/[id]

Url: http://localhost:8080/products/[id]

Se coloca el id en la ruta


Respuesta de get by id:

{
  "product": {
    "_id": "5ea1f1cd1f6ddf2c187a53bc",
    "name": "Lomo Completo"
  },
  "request": {
    "type": "GET",
    "description": "Get all products",
    "url": "http://localhost:8080/products/"
  }
}

### PATCH /products/[id]

Sólo para administradores

Url: http://localhost:8080/products/[id]

Se coloca el id en la ruta

Cuerpo de la peticion para actualizar un valor:

[
	{
		"propName":"name",
		"value":"Pizza de 4 porciones"
	}
]

Respuesta de modificación:

{
  "message": "Product updated Succesfully",
  "request": {
    "type": "GET",
    "url": "http://localhost:8080/products/5ea0ac8ec486271878d5e33a"
  }
}




### DELETE /products/[id]

Sólo para administradores

Url: http://localhost:8080/products/[id]

Se coloca el id en la ruta

Respuesta del delete: 

{
  "message": "Product deleted",
  "request": {
    "type": "POST",
    "url": "http://localhost:8080/products",
    "body": {
      "name": "String",
      "price": "Number"
    }
  }
}

### GET /orders

Sólo para administradores

Url: http://localhost:8080/orders

Respuesta de get orders:

{
  "count": 1,
  "orders": [
    {
      "_id": "5ea1f2981f6ddf2c187a53bf",
      "request": {
        "type": "GET",
        "url": "http://localhost:8080/orders/5ea1f2981f6ddf2c187a53bf"
      }
    }
  ]
}

### GET /orders/[id]

Sólo para administradores

Url: http://localhost:8080/orders/[id]

Se ingresa el id en la ruta

Respuesta de get orders:

{
  "order": {
    "Status": "sended",
    "_id": "5ea1f2981f6ddf2c187a53bf",
    "user": "5ea0766264cdef1f2c351faa",
    "Items": [
      {
        "quantity": 1,
        "_id": "5ea1f2981f6ddf2c187a53c0",
        "product": "5ea1f1cd1f6ddf2c187a53bc"
      },
      {
        "quantity": 2,
        "_id": "5ea1f2981f6ddf2c187a53c1",
        "product": "5ea1f1da1f6ddf2c187a53bd"
      }
    ],
    "paymentMethod": "cash",
    "date": "2020-04-23T19:55:04.409Z",
    "__v": 0
  },
  "request": {
    "type": "GET",
    "url": "http://localhost:8080/orders"
  }
}

 ### POST /orders

Url: http://localhost:8080/orders

body de la petición:

(se ingresa el ID del user)

{
"user":"5ea21e7d97328014c89a2896",
  
    "cart": [
        {
            "product": "5ea1f1da1f6ddf2c187a53bd",
            "quantity": 1
        },
        {
            "product": "5ea1f1ef1f6ddf2c187a53be",
            "quantity": 1
        }
    ],
"paymentMethod": "cash"
   
}

Respuesta de post de order:

{
  "message": "Order stored",
  "order": {
    "_id": "5ea226a897328014c89a289d",
    "user": "5ea0762d64cdef1f2c351fa9",
    "Items": [
      {
        "quantity": 1,
        "_id": "5ea226a897328014c89a289e",
        "product": "5ea1f1ef1f6ddf2c187a53be"
      }
    ],
    "paymentMethod": "cash"
  },
  "request": {
    "type": "GET",
    "url": "http://localhost:8080/orders/5ea226a897328014c89a289d"
  }
}

### PATCH /orders/[id]

Sólo para administradores

Url: http://localhost:8080/orders/[id]

Ingresar el id en la ruta

body de la peticion para actualizar el estado:

[
	{
		"propName":"Status",
		"value":"confirmed"
	}
]

Respuesta de la petición:

{
  "message": "Order updated",
  "request": {
    "type": "GET",
    "url": "http://localhost:8080/orders/5ea2266897328014c89a2897"
  }
}

## Checklist
_Poder registrar un nuevo usuario_ -----> POST/user/signup
_Un usuario debe poder listar todos los productos disponibles_-------> GET/products
_Un usuario debe poder generar un nuevo pedido al Restaurante con un listado de platos que desea_--------> POST/orders
_El usuario con roles de administrador debe poder actualizar el estado del pedido_----->PATCH/orders
_Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos_------> POST/products; PATCH/products; DELETE/products
_Un usuario sin roles de administrador no debe poder crear, editar o eliminar un producto, ni editar o eliminar un pedido.Tampoco debe poder acceder a informaciones de otros usuarios_---->
rutas con autenticacion



## Autora ✒️

Maria Emilia Ocampo


## Muchas Gracias!! 🎁


