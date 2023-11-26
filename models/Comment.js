import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

import postSchema from "./Post.js";

const commentSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    post: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
