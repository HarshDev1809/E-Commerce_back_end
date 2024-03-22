const { getAllProducts } = require("../Controllers/product.controller")

module.exports = (app)=>{
    app.get("/api/products",getAllProducts);
}