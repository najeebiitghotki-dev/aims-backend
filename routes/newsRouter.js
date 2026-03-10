const express = require("express");

const newsRouter = express.Router();

const newsController = require("../controllers/newsController.js");
newsRouter.get("/", newsController.getNews);
// add an item in join
newsRouter.post("/", newsController.addNews);

newsRouter.put("/:id", newsController.updateNews);
// delete an item in join
newsRouter.delete("/:id", newsController.deleteNews);
module.exports = newsRouter;
