const User = require("../01Models/user.schema");

exports.getAllUsers = async (req, res) => {
    const { id } = req.user
    try {
        const isAdmin = await User.findOne({ _id: id, role: "ADMIN" })
        if (isAdmin.role !== "ADMIN")
            return res.status(401).json({
                message: "You are not authorized to perform this action"
            })
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
    const { email } = req.body
    try {
        // const admin = await User.findById({id})
        // if (!admin){
        //     return req.status(400).json({message: "you're not authorized for this operation"})
        // }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            })
        }


        user.isBlocked = true;
        await user.save()

        return res.status(200).json({
            message: `User with the id: ${user._id}is blocked`
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
    const { id } = req.user
    try {
        // const isAdmin = await User.findOne({ _id: id, role: "ADMIN" })
        // if (isAdmin.role !== "ADMIN")
        //     return res.status(401).json({
        //         message: "You are not authorized to perform this action"
        //     })

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