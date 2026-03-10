const News = require("../models/newsModel.js");

exports.getNews = async (req, res, next) => {
  const myNews = await News.find();

  res.status(200).json({
    status: "success",
    results: myNews.length,
    data: {
      News: myNews,
    },
  });
};
// add an item in News
exports.addNews = async (req, res) => {
  try {
    console.log("News to add is ", req.body);

    const newItem = new News({
      title: req.body.title,
      details: req.body.details,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// update FacultyItem
exports.updateNews = async (req, res, next) => {
  const newsID = req.params.id; // now from URL, not body
  const updatedData = {
    title: req.body.title,
    details: req.body.details,
  };

  const updatedItem = await News.findByIdAndUpdate(newsID, updatedData, {
    new: true,
    runValidators: true,
  });

  if (!updatedItem) {
    return res.status(404).json({
      status: "fail",
      message: "Faculty item not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      faculty: updatedItem,
    },
  });
};
exports.deleteNews = async (req, res, next) => {
  const itemId = req.params.id;
  const deletedItem = await News.findByIdAndDelete(itemId);
  if (!deletedItem) {
    return res.status(404).json({
      status: "fail",
      news: "Item not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
