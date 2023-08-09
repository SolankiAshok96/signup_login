const User = require("../model/user.model")


validateSignUpRequest = async (req, res, next) => {
    //Implement logic for validating the request

    //1.validate the name
    if(!req.body.name){
        res.status(400).send({
            message: "Failed! Name is not provided"
        })
        return;
    }

    //2. validate the userId
    if(!req.body.userId){
        res.status(400).send({
            message: "Failed! UserId is not provided"
        })
        return;
    }

    //3. validate if the userId already exists
    const user = await User.findOne({userId: req.body.userId});
    if(user != null){
        res.status(400).send({
            message: "Failed! UserId already exists"
        })
        return;
    }

    //4. validate email
    //Need to be implemented

    //5. validate if the emailId already exists
    const email = await User.findOne({email: req.body.email});
    if(email != null){
        res.status(400).send({
            message: "Failed! Email already exists"
        })
        return;
    }

    

    next();
}

const verifySignUp = {
    validateSignUpRequest: validateSignUpRequest
};

module.exports = verifySignUp