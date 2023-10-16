const Category = require('../models/categoryModel')

// categories

const getCategories = async (req, res) => {
    const categories = await Category.find({})

    res.status(200).json(categories)
}

const createCategory = async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Kategorijos pavadinimas būtinas' })
    }

    try {
        const category = await Category.create({ name })
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteCategory = async (req, res) => {
    console.log("delete ", req.params.id, " category")
    const { id } = req.params

    const category = await Category.findOneAndDelete({ _id: id })
    if (!category) {
        return res.status(404).json({ error: "No such Category" })
    }

    res.status(200).json(category)
}

module.exports = {
    getCategories,
    createCategory,
    deleteCategory
}