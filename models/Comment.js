import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

import postSchema from "./Post.js";

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
