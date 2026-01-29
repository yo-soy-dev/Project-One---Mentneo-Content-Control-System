import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    title: String,
    type: {
      type: String,
      enum: ["blog", "announcement", "website", "social", "reel"],
    },
    body: String,
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "approved", "published"],
      default: "draft",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Content", contentSchema);
