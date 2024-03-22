const {verifySignIn,verifySignUp, verifyAdminSignIn, verifyAdminSignUp} = require("../Middlewares/auth.middleware");
const {signIn,signUp, adminSignIn, adminSignUp} = require("../Controllers/auth.controller");

module.exports = (app)=>{
    app.post("/api/auth/signup",[verifySignUp],signUp);
    app.post("/api/auth/signin",[verifySignIn],signIn);
    app.post("/api/auth/admin/signin",[verifyAdminSignIn],adminSignIn);
    app.post("/api/auth/admin/signup",[verifyAdminSignUp],adminSignUp);
}