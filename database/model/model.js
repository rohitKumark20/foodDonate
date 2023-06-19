const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

const donateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requierd: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    expireAt: {
        type: Date, 
        default: Date.now, 
        index: { expires: '1d' } 
    }
})

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        requierd: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    expireAt: { 
        type: Date, 
        default: Date.now, 
        index: { expires: '1d' } 
    }
})

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ id: this._id }, "x3V9LcU67DKjWlP5ZT8GfX2NrYvSEsCq", {
            expiresIn: '1h'
        });
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (error) {
        console.log(error);
    }
}


userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        const passHash = await bcrypt.hash(this.password, 10);
        this.password = passHash;
        this.cpassword = passHash;
    }

    next();
})

const User = mongoose.model('User', userSchema)
const Donate = mongoose.model('Donate', donateSchema)
const request = mongoose.model('Request', requestSchema)

module.exports = { User, Donate, request }