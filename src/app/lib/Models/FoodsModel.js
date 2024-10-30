const { default: mongoose } = require("mongoose");

const FoodsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const FoodsModel = mongoose.models.foods || mongoose.model('foods', FoodsSchema);

module.exports = { FoodsModel };
