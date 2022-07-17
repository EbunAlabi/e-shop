//import all packages
const express = require ('express');
const app = express();
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const cors = require ('cors');
require ('dotenv/config')

//cors is cCross-Origin Resource Sharing necessary for frontend and backend interation
app.use (cors());
app.options('*', cors());


//use constants in environment
const api = process.env.API_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

//import the routes holding the key functions
const productRouter = require ('./routes/products');
const categoryRouter = require ('./routes/categories');

//middleware for parsing json
app.use(express.json());
app.use(morgan('tiny'));

//import routers
app.use (`${api}/products`, productRouter);
app.use (`${api}/categories`, categoryRouter);


//data collection structure
const Product = require('./models/products');
const Category = require('./models/category');





//connection details to database and server 
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log ('Database Connection is ready...')
})
.catch (()=>{
    console.log(err);
});

app.listen(3000, ()=> {
    console.log(api);
    console.log('the server is running http://localhost:3000');
})