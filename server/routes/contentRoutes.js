import express from "express";
import {
  createContent,
  getContents,
  updateContent,
  approveContent,
  publishContent,
  deleteContent,
  getSingleContent,
} from "../controllers/contentController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createContent);
router.get("/", protect, getContents);
router.put("/:id", protect, updateContent);
router.put("/:id/approve", protect, adminOnly, approveContent);
router.put("/:id/publish", protect, adminOnly, publishContent);
router.delete("/:id", protect, deleteContent);
router.get("/:id", protect, getSingleContent);



export default router;
