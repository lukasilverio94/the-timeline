import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    post: {
      type: String,
      required: true,
      minlength: 25,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// Delete Post
postSchema.statics.deletePost = async function (postId) {
  return this.deleteOne({ _id: postId });
};

const Post = mongoose.model("Post", postSchema);
export default Post;
