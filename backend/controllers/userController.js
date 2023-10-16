const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {

    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' })

}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        console.dir(user)
        res.status(200).json({ email, admin: user.admin, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({ email, user, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getUsers = async (req, res) => {

    const users = await User.find({})

    res.status(200).json(users)
}

const removeUser = async (req, res) => {
    console.log(("delete user ", req.params.id))
    const { id } = req.params

    const userToRemove = await User.findOneAndDelete({_id: id})
    if(!userToRemove) {
        return res.status(404).json({error: "No such User"})
    }

}

module.exports = { loginUser, signupUser, getUsers, removeUser }