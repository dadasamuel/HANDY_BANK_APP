const User = require("../models/user.schema");

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json({
            Result: allUsers
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        })
    }
}

exports.blockAUser = async (req, res) => {
    const { emailAddress } = req.body
    try {
        const user = await User.findOne({ emailAddress })
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }
        if (user.isBlocked == true) {
            return res.status(404).json({
                message: `User with emailAddress: ${user.emailAddress} is blocked already`
            })
        }

        user.isBlocked = true;
        await user.save()

        return res.status(200).json({
            message: `User with the emailAddress: ${user.emailAddress} is blocked`
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}


exports.totalCountUsers = async (req, res) => {
    try {
        const totalUsers = await User.estimatedDocumentCount();
        return res.status(200).json({
            message: `There are ${totalUsers} registered users  `
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}