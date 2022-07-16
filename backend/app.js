const express = require ('express');
const app = express();
const morgan = require ('morgan');
const mongoose = require ('mongoose');

require ('dotenv/config')

const api = process.env.API_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

//middleware
app.use(express.json());
app.use(morgan('tiny'));


//product schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number
})

//product model
const Product = mongoose.model('Product', productSchema)

app.get(`${api}/products`, (req,res)=>{
    const product = {
        id:1,
        name: 'hair dresser',
        image: 'some url'
    }
    res.send(product);
})

app.post (`${api}/products`, (req, res)=>{
    //const newProduct = req.body;
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })
    
    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success:false
        })
    })
    console.log(newProduct);
    res.send(newProduct);
})


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