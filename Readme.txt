PC & Tech - Backend

Descripción:
Backend de la tienda en línea PC & Tech. Gestiona usuarios, productos, carrito y pagos mediante Stripe. Proporciona endpoints RESTful consumidos por el frontend en React.

Tecnologías utilizadas:
- Node.js
- Express
- MongoDB + Mongoose
- Stripe (pagos)
- dotenv para variables de entorno
- CORS y autenticación con JWT

Repositorio:
https://github.com/Preydet/backend-Proyecto7.git

URL en producción:
https://backend-proyecto7.onrender.com

Estructura del proyecto:

backend/
├─ config/
│  ├─ db.js          (conexión a MongoDB)
│  └─ stripe.js      (configuración de Stripe)
├─ controllers/
│  ├─ cartController.js
│  ├─ productController.js
│  └─ userController.js
├─ models/
│  ├─ Cart.js
│  ├─ Product.js
│  └─ User.js
├─ routes/
│  ├─ cartRoutes.js
│  ├─ productRoutes.js
│  └─ userRoutes.js
├─ middleware/
│  ├─ auth.js        (verificación de token JWT)
│  └─ errorHandler.js
├─ utils/
│  └─ helpers.js
├─ .env
├─ package.json
├─ server.js
└─ README.txt

Endpoints principales:
- /users/register       Registro de usuario
- /users/login          Login de usuario
- /users/verify-user    Verificación de sesión
- /users/:id            Actualizar usuario
- /products             Listado de productos
- /products/:id         Detalle de producto
- /products/categories  Listado de categorías
- /carts/get-cart       Obtener carrito de usuario
- /carts/edit-cart      Modificar carrito
- /carts/create-checkout-session   Iniciar checkout con Stripe

Variables de entorno:
- MONGODB_URI = URI de MongoDB
- STRIPE_SECRET_KEY = Clave secreta de Stripe
- PORT = Puerto del servidor
- CORS_ORIGIN = Origen permitido para CORS

Instalación:
1. Clonar repositorio:
   git clone https://github.com/Preydet/backend-Proyecto7.git
   cd backend-Proyecto7
2. Instalar dependencias:
   npm install
3. Configurar archivo .env con variables de entorno
4. Ejecutar proyecto:
   npm run dev
5. Servidor escuchando en http://localhost:<PORT> o en Render:
   https://backend-proyecto7.onrender.com

Autor:
- Pablo Reydet Vásquez