const User= require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async(req,res) => {
    try{
        const createUser = await User.create({
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
             age: req.body.age,
             gender: req.body.gender
        })

        const postResponse = {
            name: createUser.name,
            userId: createUser.userId,
            email: createUser.email,
             age: createUser.age,
             gender: createUser.gender
        }

        res.status(200).send(postResponse)
    }catch(e){
        console.log("Error occurred while creating the user")
        res.status(500).send({
            message: "Some internal error occured while creating the user"
        })
    }      
}

exports.login = async(req,res) => {
    const user = await User.findOne({userId: req.body.userId})
    if(!user){
        res.status(400).send({
            message: "Failed! UserId doesn't exist"
        })
        return;
    }

    

    //Check if password matches
    var isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

    if(!isPasswordValid){
        return res.status(401).send({
            message: "Password provided is invalid"
        })
    }

    var token = jwt.sign({id: user.userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        gender:user.gender,
        age: user.age,
        accessToken: token
    })
   
    }

    

   
         

          

