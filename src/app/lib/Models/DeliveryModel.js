import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
});

const DeliveryModel = mongoose.models.Delivery || mongoose.model("Delivery", DeliverySchema);


module.exports = { DeliveryModel };