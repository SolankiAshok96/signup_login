const authController = require('../controller/auth.controller')
const {verifySignUp} = require('../middleware')


module.exports = function(app){

     app.post("/auth/api/v1/register" ,[verifySignUp.validateSignUpRequest] , authController.register)
     app.post("/auth/api/v1/login", authController.login)
}

