import Content from "../models/Content.js";

export const createContent = async (req, res) => {
  const content = await Content.create({
    ...req.body,
    author: req.user.id,
  });
  res.json(content);
};

export const getContents = async (req, res) => {
  const { status, type, tag } = req.query;
  let filter = {};

  if (status) filter.status = status;
  if (type) filter.type = type;
  if (tag) filter.tags = tag;

  const contents = await Content.find(filter).populate("author", "name");
  res.json(contents);
};

export const updateContent = async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (!content) return res.status(404).json({ msg: "Not found" });

  if (content.status !== "draft")
    return res.status(400).json({ msg: "Only draft can be edited" });

  if (content.author.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not allowed" });

  Object.assign(content, req.body);
  await content.save();
  res.json(content);
};

export const approveContent = async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (content.status !== "draft")
    return res.status(400).json({ msg: "Only draft can be approved" });

  content.status = "approved";
  content.approvedBy = req.user.id;
  await content.save();
  res.json(content);
};

export const publishContent = async (req, res) => {
  const content = await Content.findById(req.params.id);
  if (content.status !== "approved")
    return res.status(400).json({ msg: "Only approved can be published" });

  content.status = "published";
  content.publishedAt = new Date();
  await content.save();
  res.json(content);
};

export const deleteContent = async (req, res) => {
  const content = await Content.findById(req.params.id);

  if (!content) return res.status(404).json({ message: "Not found" });

  if (
    content.author.toString() !== req.user.id &&
    req.user.role.toLowerCase() !== "admin"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }


  await content.deleteOne();
  return res.status(200).json({ success: true });
};

export const getSingleContent = async (req, res) => {
  const content = await Content.findById(req.params.id).populate("author", "name");
  if (!content) return res.status(404).json({ msg: "Not found" });
  res.json(content);
};
