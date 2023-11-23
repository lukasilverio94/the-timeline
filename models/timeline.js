const mongoose = require("mongoose");
const moment = require("moment");
const schema = mongoose.Schema;

const postSchema = new schema(
  {
    name: {
      type: String,
    },

    post: {
      type: String,
      required: true,
    },

    getDate: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  },
  { timestamps: true }
);

// Delete Post
postSchema.statics.deletePost = async function (postId) {
  return this.deleteOne({ _id: postId });
};
module.exports = mongoose.model("post", postSchema);
