const { getAllProducts, createProduct, getCartItem, addCartItem, removeCartItem, getProductById, updateCart } = require("../Controllers/product.controller");
const { verifyAdmin, verifyUser } = require("../Middlewares/auth.middleware");
const { verifyProduct, verifyProductId, verifyProductCount } = require("../Middlewares/product.middleware");

module.exports = (app)=>{
    app.get("/api/products",getAllProducts);
    app.post("/api/products/create",[verifyProduct,verifyAdmin],createProduct);
    app.get("/api/products/cart/items",[verifyUser],getCartItem);
    // app.put("/api/products/cart/add",[verifyUser,verifyProductId],addCartItem);
    app.put("/api/products/cart/remove",[verifyUser,verifyProductId],removeCartItem);
    app.put("/api/products/cart/update",[verifyUser,verifyProductId,verifyProductCount],updateCart)
    app.get("/api/products/:id",getProductById)
    // app.put("/api/products/create",[verifyAdmin],createProduct);
}