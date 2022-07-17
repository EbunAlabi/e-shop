const express = require ('express');
const app = express();
const morgan = require ('morgan');
const mongoose = require ('mongoose');
const cors = require ('cors');
require ('dotenv/config')


app.use (cors());
app.options('*', cors());


const api = process.env.API_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;


const productRouter = require ('./routes/products');

//middleware
app.use(express.json());
app.use(morgan('tiny'));

//import routers
app.use (`${api}/products`, productRouter);


const Product = require('./models/products');




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