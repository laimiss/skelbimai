const requireAdmin = async (req, res, next) => {
    if (req.user.admin) {
        next()
    } else {
        console.log("Not admin")
        res.status(401).json({ error: "Required Admin priveleges", user: req.user })
    }
}

module.exports = requireAdmin