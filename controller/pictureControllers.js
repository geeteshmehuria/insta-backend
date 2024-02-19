// pictureController.js

const { PictureModule } = require("../model/pictureModule");

const addPicture = async (req, res) => {
  // const { quote, device ,userId} = req.body;
  const photo = req.file.path;

  console.log(">>>>>>>>>>", req.body);
  console.log(photo);
  try {
    const newPicture = new PictureModule({ quote, photo, device, userId });
    await newPicture.save();
    res.status(201).json({ message: "Picture added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPicture = async (req, res) => {
  try {
    const userId = req.userId;
    const pictures = await PictureModule.find({ userId });
    res.status(200).send({ pictures });
  } catch (error) {
    console.error("Error in getting pictures:", error);
    res.status(500).send({ error: "Error in fetching pictures" });
  }
};

const updatePicture = async (req, res) => {
  const { id } = req.params;
  try {
    const { quote, device } = req.body;
    const picture = await PictureModule.findByIdAndUpdate(
      { _id: id },
      { quote, device },
      { new: true }
    );
    if (!picture) {
      return res.status(404).send({ msg: "No such picture found" });
    }
    res.status(200).send({ msg: "Picture updated successfully" });
  } catch (error) {
    console.error("Error updating picture:", error);
    res.status(500).send({ error: "Error updating picture" });
  }
};

const deletePicture = async (req, res) => {
  const { id } = req.params;
  try {
    const picture = await PictureModule.findByIdAndDelete({ _id: id });
    if (!picture) {
      return res.status(404).send({ msg: "No such picture found" });
    }
    res.status(200).send({ msg: "Picture deleted successfully" });
  } catch (error) {
    console.error("Error deleting picture:", error);
    res.status(500).send({ error: "Error deleting picture" });
  }
};

const getAllPictures = async (req, res) => {
  try {
    const userId = req.userId;
    const pictures = await PictureModule.find({ userId });
    res.status(200).send({ pictures });
  } catch (error) {
    console.error("Error in getting all pictures:", error);
    res.status(500).send({ error: "Error in fetching pictures" });
  }
};

const filterPicture = async (req, res) => {
  try {
    const { device, minComments, maxComments } = req.query;
    const userId = req.userId;
    let query = { userId };
    if (device) {
      query.device = device;
    }
    if (minComments && maxComments) {
      query.commentsCount = { $gte: minComments, $lte: maxComments };
    } else if (minComments) {
      query.commentsCount = { $gte: minComments };
    } else if (maxComments) {
      query.commentsCount = { $lte: maxComments };
    }
    const filteredPictures = await PictureModule.find(query);
    res.status(200).json({ pictures: filteredPictures });
  } catch (error) {
    console.error("Error in filtering pictures:", error);
    res.status(500).send({ error: "Error in filtering pictures" });
  }
};

module.exports = {
  addPicture,
  getPicture,
  updatePicture,
  deletePicture,
  getAllPictures,
  filterPicture,
};
