const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB  = require('./config/db.js');
const morgan  =  require('morgan');
const authRoutes = require('./routes/authRoute.js');
const categoryRoute = require('./routes/categoryRoute.js');
const ProductRoute = require('./routes/productRoute.js');
const cors = require('cors');
dotenv.config();

//rest object
const app = express();

//connect db
connectDB();

//middlewatre
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/app/v1/auth",authRoutes);
app.use("/app/v1/category",categoryRoute);
app.use('/app/v1/products',ProductRoute)

//rest api
app.get('/',(req,res) => {
    res.send( "<h1>this is ecommerce home page</h1>");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is runing ${process.env.DEV_MODE} on port ${PORT}`.bgCyan.white);
})