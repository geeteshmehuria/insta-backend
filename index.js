// index.js

const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRouters");
const { pictureRouter } = require("./routes/pictureRouters");
const cors = require("cors");
// const { UserModule } = require("./model/userModel");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/users", userRouter);
app.use("/pictures", pictureRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected o the mongodb");
    console.log(`server is running at ${process.env.port}`);
  } catch (error) {
    console.log("Error in connecting to the database ", error);
  }
});

// {
//   "username": "geetesh",
//   "email": "geetesh@gmail.com",
//   "password": "geetesh",
//   "city": "jhansi",
//   "age": "24",
//   "gender": "male"
// }
