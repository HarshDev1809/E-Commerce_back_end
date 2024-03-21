const {verifySignIn,verifySignUp} = require("../Middlewares/auth.middleware");
const {signIn,signUp} = require("../Controllers/auth.controller");

module.exports = (app)=>{
    app.post("/api/auth/signup",[verifySignUp],signUp);
    app.post("/api/auth/signin",[verifySignIn],signIn);
}