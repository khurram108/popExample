let mongoose = require("mongoose")

let User = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    eCPM: {
        type: Number,
        required: true,
        default: 0.25
    },
    impressions: {
        type: Number,
        required: true,
        default: 1
    },
    revenue: {
        type: Number,
        required: true,
        default: 0
    },
    domain_uuid: {
        type: Number,
        ref: "Websites",
        required: true
    },
    user_uuid: {
        type: Number,
        ref: "User",
        required: true
    }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model("Report", User)