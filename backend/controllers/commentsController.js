const Comment = require('../models/commentModel')


const getComments = async (req, res) => {
    const { ad_id } = req.params

    try {
        const ads = await Comment.find({ ad: ad_id })
            .sort({ createdAt: 1 })
        res.status(200).json(ads)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}


const createComment = async (req, res) => {
    const { ad, name, text } = req.body
    console.log(ad, name, text)

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!text) {
        emptyFields.push('text')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Užpildyti ne visi laukai', emptyFields })
    }

    try {
        const comment = await Comment.create({ ad, name, text })
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const deleteComment = async (req, res) => {


}


module.exports = {
    getComments,
    createComment,
    deleteComment
}