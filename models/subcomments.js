var mongoose = require("mongoose");

var Schema = mongoose.Schema,
  modelSchema;

modelSchema = new Schema(
  {
    id: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    tags: {
      type: String
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comments'
    },
    id_user: {
      type: String
    }
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
    timestamps: true

  }
);

module.exports = mongoose.model("subcomments", modelSchema);
