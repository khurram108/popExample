let mongoose = require("mongoose")

let User = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: Number,
        enum: [1, 2], // 1> pending, 2> verified
        default: 1,
    },
    requested_to:{
        type: String,
        default: 'Admin'
    },
    uuid: {
        type: Number,
        required: true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("CashOut", User)