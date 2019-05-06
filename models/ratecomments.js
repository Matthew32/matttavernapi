var mongoose = require("mongoose");

var Schema = mongoose.Schema,
  modelSchema;

modelSchema = new Schema(
  {
    id: {
      type: String
    },
    id_comment: {
      type: String
    },
    rate: {
      type: String
    },
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("rate_comments", modelSchema);
