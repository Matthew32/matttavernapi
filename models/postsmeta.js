var mongoose = require("mongoose");

var Schema = mongoose.Schema,
  modelSchema;

modelSchema = new Schema(
  {
    id: {
      type: String
    },
    id_post: {
      type: String
    },
    metaname: {
      type: String
    },
    metavalue: {
      type: String
    }
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("meta_posts", modelSchema);
