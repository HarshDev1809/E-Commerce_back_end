const { getAllProducts, createProduct } = require("../Controllers/product.controller");
const { verifyAdmin } = require("../Middlewares/auth.middleware");
const { verifyProduct } = require("../Middlewares/product.middleware");

module.exports = (app)=>{
    app.get("/api/products",getAllProducts);
    app.put("/api/products/create",[verifyProduct,verifyAdmin],createProduct);
    // app.put("/api/products/create",[verifyAdmin],createProduct);
}