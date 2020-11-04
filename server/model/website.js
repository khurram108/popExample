let mongoose = require("mongoose")

let User = new mongoose.Schema({
    domain_url: {
        type: String,
        required: true
    },
    domain_category: {
        type: String,
        required: true
    },
    agree: {
        type: Boolean,
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
    uuid: {
        type: Number,
        required: true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("Websites", User)