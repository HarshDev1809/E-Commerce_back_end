const Product = require("../Models/product.model");
const { defaultProductUrl } = require("../Utils/constants");
const { isValidObjectId } = require("../Utils/functions");

const verifyProduct = (req, res, next) => {
  const {
    name,
    description,
    price,
    displayPrice,
    productUrl,
    productCount,
    productImage,
  } = req.body;

  if (!name) {
    return res
      .status(400)
      .send({ message: "Name of the Product can't be Empty!" });
  }

  if (!description) {
    return res
      .status(400)
      .send({ message: "Description of the Product can't be Empty!" });
  }

  if (!price) {
    return res
      .status(400)
      .send({ message: "Price of the Product can't be Empty!" });
  }

  if (price < 0) {
    return res
      .status(400)
      .send({ message: "Price of the Product can't be less than Zero!" });
  }

  if (displayPrice < 0) {
    return res
      .status(400)
      .send({
        message: "Display Price of the Product can't be less than Zero!",
      });
  }

  if (!displayPrice) {
    req.body.displayPrice = price;
  }

  if (!productUrl) {
    req.body.productUrl = defaultProductUrl;
  }

  if (!productCount) {
    req.body.productCount = 1;
  }

  if (!productImage || !productImage.length) {
    console.log(productImages)
    console.log(productImages.length)
    console.log("inside if");
    req.body.productImage = [req.body.productUrl];
  }

  next();
};

const verifyProductId = async (req, res, next) => {
  const {id} = req.body;
  try {
    const product = await Product.find({ uId: id });
    if (!product.length) {
      return res.status(400).send({ message: "Product Not Found!" });
    }
    req.product = product[0];
    next();
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong!" });
  }
};

const verifyProductCount = async(req,res,next) =>{
  const {count} = req.body;
  console.log(count)
  if(!count){
    req.body.count = 1;
  }
  console.log(count)
  next();
}

module.exports = {
  verifyProduct,
  verifyProductId,
  verifyProductCount
};
