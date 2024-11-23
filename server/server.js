const mongoose = require("mongoose");
const express = require("express");
const userRoute = require("./routes/userRoute");
const userPost = require("./routes/postRoute");
const likeRoute = require("./routes/likeRoute");
const app = express();
app.use(express.json());
app.use(userRoute);
app.use(userPost);
app.use(likeRoute);

const connectDb = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://ooyundari887:kPDwz0ydJKmhNTvX@cluster-1.l6azy.mongodb.net/instagram?retryWrites=true&w=majority&appName=Cluster-1"
  );
  if (res) console.log("DB connected");
};
connectDb();

app.listen(8080, console.log("Your server is running"));
