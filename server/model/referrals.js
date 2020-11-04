let mongoose = require("mongoose")

let Referrals = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId, // The user whom is referred
        ref: "User",
        required: true
    },
    name: {
        type: String,
        require: false

    },
    uuid: {
        type: Number, // The user who reffered me
        required: true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("Referrals", Referrals)