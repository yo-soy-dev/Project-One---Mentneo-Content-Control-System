import Content from "../models/Content.js";

// CREATE
export const createContent = async (req, res) => {
  const content = await Content.create({
    ...req.body,
    author: req.user.id,
  });
  res.json(content);
};

// READ with filters
export const getContents = async (req, res) => {
  const { status, type, tag } = req.query;
  let filter = {};

  if (status) filter.status = status;
  if (type) filter.type = type;
  if (tag) filter.tags = tag;

  const contents = await Content.find(filter).populate("author", "name");
  res.json(contents);
};

// UPDATE draft
export const updateContent = async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (!content) return res.status(404).json({ msg: "Not found" });

  if (content.author.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not allowed" });

  Object.assign(content, req.body);
  await content.save();
  res.json(content);
};

// APPROVE
export const approveContent = async (req, res) => {
  const content = await Content.findById(req.params.id);
  content.status = "approved";
  content.approvedBy = req.user.id;
  await content.save();
  res.json(content);
};

// PUBLISH
export const publishContent = async (req, res) => {
  const content = await Content.findById(req.params.id);
  content.status = "published";
  content.publishedAt = new Date();
  await content.save();
  res.json(content);
};
