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

exports.getCartItem = async(req,res)=>{
    const items = req.user.shoppingCart
    return res.status(200).send(items);
}

exports.addCartItem = async(req,res)=>{
    const {id} = req.body;
    const {user,product} = req;
    try{
        user.shoppingCart.push(id);
        await user.save();
        return res.status(201).send(user.shoppingCart);
    }catch(err){
        return res.status(500).send({message : "Something Went Wrong!"});
    }
}

exports.removeCartItem = async(req,res)=>{
    const {id} = req.body;
    const {user} = req;
    try{
        for(let i = 0 ; i < user.shoppingCart.length ; i++){
            if(id === user.shoppingCart[i]){
                user.shoppingCart.splice(i,1);
                break;
            }
        }
        await user.save();
        return res.status(200).send(user.shoppingCart)
    }
    catch(err){
        return res.status(500).send({message : "Something Went Wrong!"});
    }
}

exports.getProductById = async(req,res)=>{
    const id = req.params.id;
    try{
        const product = await Product.find({uId : id});
        if(!product.length){
            return res.status(400).send({message : "Product Not Found"});
        }
        return res.status(200).send(product[0]);
    }catch(err){
        return res.status(500).send({message : "Something Went Wrong!"})
    }
}

