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


app.get(`${api}/products`, (req,res)=>{
    const product = {
        id:1,
        name: 'hair dresser',
        image: 'some url'
    }
    res.send(product);
})

app.post (`${api}/products`, (req, res)=>{
    const newProduct = req.body;
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