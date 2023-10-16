const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false
    }
})


// static signup method
userSchema.statics.signup = async function (email, password) {

    // Validacija

    if (!email || !password) {
        throw Error("Visi laukai turi būti užpildyti")
    }

    if (!validator.isEmail(email)) {
        throw Error('Emailas ne taisyklingas')
    }

    if (!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0
    })) {
        throw Error('Slaptažodis per silpnas: minimalus ilgis 8, bent vienas skaičius')
    }


    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Toks emailas jau yra užregistruotas')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hashedPassword })

    return user

}

// static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error("Visi laukai turi būti užpildyti")
    }

    const user = await this.findOne({ email }).exec()
    if (!user) {
        throw Error('Neteisingi prisijungimo duomenys')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Neteisingas slaptažodis')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)