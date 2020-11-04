let mongoose = require("mongoose")

let User = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    agreement: {
        type: Boolean,
        required: true
    },
    country: {
        type: String,
        required: false
    },
    skype: {
        type: String,
        required: false
    },
    adressLine1: {
        type: String,
        required: false
    },
    adressLine2: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    country_billing: {
        type: String,
        required: false
    },
    confirmation_email: {
        type: String,
        required: false
    },
    uuid: {
        type: Number,
        required: true
    },
    referred_by: {
        type: Number,
        required: false
    },
    acc_status: {
        type: Number,
        enum: [1, 2], // 1 for activated account and 2 for unactivate account.
        default: 2
    }


}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("User", User)