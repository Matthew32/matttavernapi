var mongoose = require("mongoose");

var Schema = mongoose.Schema,
  modelSchema;

modelSchema = new Schema(
  {
    id: {
      type: String
    },
    rate: {
      type: String
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comments'
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
    timestamps: true

  }
);

module.exports = mongoose.model("ratecomments", modelSchema);
