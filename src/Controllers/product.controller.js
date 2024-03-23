const Product = require("../Models/product.model");


exports.getAllProducts = async(req,res) => {
    try{
        const products = await Product.find();
        if(!products.length){
            return res.status(400).send({message : "No Products found"});
        }
        return res.status(200).send(products);
    }catch(err){
        return res.status(500).send({message : "Something Went Wrong!"});
    }
}

exports.createProduct = async(req,res)=>{
    const {name,description,price,displayPrice,productCount,productUrl,tags,productImages} = req.body;
    const uId = Date.now();

    try{
        const newProduct = new Product({
            uId : uId,
            name : name,
            description : description,
            price : price,
            displayPrice : displayPrice,
            productCount : productCount,
            productUrl : productUrl,
            tags : tags,
            productImages : productImages
        });
        await newProduct.save();
        return res.status(201).send(newProduct);
    }catch(err){
        console.log(err)
        return res.status(500).send({ message: "Something Went Wrong!" })
    }

    // return res.status(200).send(req.admin);
};

