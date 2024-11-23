const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const userRoute = require("./routes/userRoute");
const userPost = require("./routes/postRoute");
const likeRoute = require("./routes/likeRoute");
dotenv.config();
const app = express();
app.use(express.json());
app.use(userRoute);
app.use(userPost);
app.use(likeRoute);

const connectDb = async () => {
  const res = await mongoose.connect(process.env.MONGODB_URI);
  if (res) console.log("DB connected");
};
connectDb();

app.listen(8080, console.log("Your server is running"));
