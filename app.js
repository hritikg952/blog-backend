require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//importing routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

//importing middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const port = 5500;

//connecting to DATABASE
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//middlewares to run after connection established
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//ROUTES
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", commentRoute);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
