// const { default: mongoose } = require("mongoose");

// const OrderSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   foodItems: [{
//     prodid: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//     }
//   }],
//   restaurantId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   deleveryboy_id: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },

// });

// const OrderModel =
//   mongoose.models.order || mongoose.model("order", OrderSchema);

// module.exports = { OrderModel };

const { default: mongoose } = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  foodItems: [{
    prodid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    }
  }],
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deleveryboy_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const OrderModel =
  mongoose.models.order || mongoose.model("order", OrderSchema);

module.exports = { OrderModel };

