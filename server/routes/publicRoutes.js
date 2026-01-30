import express from "express";
import Content from "../models/Content.js";

const router = express.Router();

router.get("/public/content", async (req, res) => {
  const { type } = req.query;
  const filter = { status: "published" };
  if (type) filter.type = type;

  const data = await Content.find(filter).sort({ publishedAt: -1 });
  res.json(data);
});

export default router;
