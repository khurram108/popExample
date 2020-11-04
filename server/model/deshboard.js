let mongoose = require("mongoose")

let Assets = new mongoose.Schema({
    referral_earning: {
        type: Number,
        required: false,
        default: 0.00
    },
    total_payout: {
        type: Number,
        required: false,
        default: 0.00
    },
    available_balance: {
        type: Number,
        required: false,
        default: 0.00
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("Assets",Assets)