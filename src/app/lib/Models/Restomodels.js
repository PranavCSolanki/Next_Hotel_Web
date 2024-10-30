import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
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

const RestaurantModel = mongoose.models.Restorents || mongoose.model("Restorents", RestaurantSchema);


module.exports = { RestaurantModel };