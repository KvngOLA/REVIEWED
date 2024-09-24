const dotenv = require("dotenv");
dotenv.config();

const blogModel = require("../model/blog");

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const authorId = req.user.id;

    const newBlog = await blogModel.create({
      title,
      content,
      author: authorId,
    });
    res.status(200).json({ message: newBlog });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const viewBlog = async (req, res) => {
  try {
    const id = req.user.id;
    const blogs = await blogModel.findById({ id }).populate({
      path: "author",
      select: "name",
    });
    return res.status(200).json({ message: "Here are your blogs", blogs });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

module.exports = {
  createBlog,
  viewBlog,
};
