const { defaultProductUrl } = require("../Utils/constants");

const verifyProduct = (req,res,next)=>{
    const {name,description,price,displayPrice,productUrl,productCount,productImages} = req.body;

    if(!name){
        return res.status(400).send({message : "Name of the Product can't be Empty!"});
    }

    if(!description){
        return res.status(400).send({message : "Description of the Product can't be Empty!"});
    }

    if(!price){
        return res.status(400).send({message : "Price of the Product can't be Empty!"});
    }

    if(price < 0){
        return res.status(400).send({message : "Price of the Product can't be less than Zero!"});
    }

    if(displayPrice < 0){
        return res.status(400).send({message : "Display Price of the Product can't be less than Zero!"});
    }


    if(!displayPrice){
        req.body.displayPrice = price;
    }

    if(!productUrl){
        req.body.productUrl = defaultProductUrl;
    }

    if(!productCount){
        req.body.productCount = 1;
    }

    if(!productImages || !productImages.length){
        console.log("inside if");
        req.body.productImages = [req.body.productUrl];
        console.log(req.body);
    }

    next();
}

module.exports = {
    verifyProduct
}