const { validateUserSignup, validateUserLogin } = require("../../Middlewares/joi.validate");
const User = require("../01Models/user.schema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config()

exports.signUp = async (req, res) => {
    try {
        const {firstName, lastName, emailAddress, phoneNumber, password, role} = req.body
        await validateUserSignup.validateAsync(req.body)
        const user = await User.findOne({phoneNumber, emailAddress})
        if (user) {
            return res.status(400).json({
                message: "User already exist. Please Login"
            })
        }
      const hashedPassword = await bcrypt.hash(password, 10)
        const uniqueId = Math.floor(Math.random() * 2000000)
            .toString()
            .substring(0, 10);
        const accountNumber = "20" + uniqueId;

      const newUser = await User.create({
        firstName, lastName, emailAddress, phoneNumber, accountNumber, password: hashedPassword, role
      })
          
      return res.status(201).json({
        message: "User Created Successfully",
        newUser,
      })
    } catch (error) {
       return res.status(500).json({
        message: "Something went wrong",
        error: error.message
       }) 
    }
}



exports.login = async (req, res) => {
    try {
        const {phoneNumber, password} = req.body
        await validateUserLogin.validateAsync(req.body)
        const user = await User.findOne({phoneNumber})
        if (!user){
            return res.status(401).json({
                message: "User does not exist"
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const userData = {id: user._id, role: user.role}
        const token = await jwt.sign(userData, process.env.JWT_SECRETKEY, {expiresIn: "1hr"} )
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 3, // 3 minutes
        });
        console.log(token.split(" "))
        return res.status(200).json({
            message:"Logged in successfully",
            token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
    }

    exports.getAccountNumber = async(req, res)=> {
        const {phoneNumber} = req.params;
        try {
           const retrieveAccountNumber = await User.findOne({phoneNumber});
            return res.status(200).json({
                message: "Account Number",
                accountNumber: retrieveAccountNumber.accountNumber
            })
        } catch (error) {
            return res.status(500).json({
                error: error.message
            })
        }
    }
