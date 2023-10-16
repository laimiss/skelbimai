const Ad = require('../models/adModel')
const mongoose = require('mongoose')


// get all Ads
const getAds = async (req, res) => {
    const ads = await Ad.find({})
        .populate('user', '-password')
        .populate("category")
        .sort({ createdAt: -1 })
    res.status(200).json(ads)
}

const getMyAds = async (req, res) => {

    const user = req.user
    const ads = await Ad.find({ user })
        .populate('user', '-password')
        .populate("category")
        .sort({ createdAt: -1 })
    // console.log(ads)


    res.status(200).json(ads)
}
// get a single Ad
const getAd = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Advertisement" })
    }

    const ad = await Ad.findById(id)
    .populate('user', '-password')
    .populate("category")
    if (!ad) {
        return res.status(404).json({ error: "No such Advertisement" })
    }


    res.status(200).json(ad)
}

// create a new Ad 
const createAd = async (req, res) => {
    const { title, description, price, category } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!price) {
        emptyFields.push('price')
    }
    if (!category) {
        emptyFields.push('category')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Užpildyti ne visi laukai', emptyFields })
    }

    // console.dir(req.user)

    try {
        const user = req.user
        const ad = await Ad.create({ title, description, price, user, category })
        res.status(200).json(ad)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update an Ad
const updateAd = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Advertisement" })
    }

    const ad = await Ad.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!ad) {
        return res.status(404).json({ error: "No such Advertisement" })
    }
    res.status(200).json(ad)
}

// delete an Ad
const deleteAd = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Advertisement" })
    }

    const ad = await Ad.findOneAndDelete({ _id: id })
    if (!ad) {
        return res.status(404).json({ error: "No such Advertisement" })
    }

    res.status(200).json(ad)

}


module.exports = {
    getAds,
    getMyAds,
    getAd,
    createAd,
    updateAd,
    deleteAd
}