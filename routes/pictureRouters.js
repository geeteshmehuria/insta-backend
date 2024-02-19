// picture routes

const express = require("express");
const { auth } = require("../middleware/authmiddleware");
const { upload } = require("../middleware/multerMiddleware");
const {
  addPicture,
  getPicture,
  updatePicture,
  deletePicture,
  getAllPictures,
  filterPicture,
} = require("../controller/pictureControllers");

pictureRouter = express.Router();

pictureRouter.post("/add", auth, upload.single("photo"), addPicture);
pictureRouter.get("/", auth, getPicture);
pictureRouter.patch("/:id", auth, updatePicture);
pictureRouter.delete("/:id", auth, deletePicture);
pictureRouter.get("/:id", auth, getAllPictures);
pictureRouter.get("/:id", auth, filterPicture);

module.exports = { pictureRouter };
