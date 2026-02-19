require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const productRouter = require("./src/routes/product.routes");
const cartRouter = require("./src/routes/cart.routes");
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

const whitelist = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174',
    'https://frontend-proyecto-7.onrender.com',
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};


//middlewares
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'ok'});
});

app.use("/users", userRouter);

app.use("/products", productRouter);

app.use("/carts", cartRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto` + PORT) ;
});