const Product = require("../Models/product.model")

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