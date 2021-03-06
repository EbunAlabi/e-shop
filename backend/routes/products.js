
const Product = require ('../models/products')

const express =  require ('express');
const router = express.Router();


router.get(`/`, async (req,res)=>{
    const productList = await Product.find();

    if (!productList){
        res.status(500).json({success: false})
    }

    res.send(productList);
})

router.post (`/`, async (req, res)=>{
    //const newProduct = req.body;
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        rickDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })

    product.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err)=> {
        res.status(500).json({
            error: err,
            success:false
        })
    })
})

module.exports = router;