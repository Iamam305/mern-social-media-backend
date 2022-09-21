import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routes/posts.js"; 
dotenv.config();

const app = express();

app.use('/posts', postRouter);
 

app.use(bodyParser.json({ limit: "30md", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30md", extended: true }));
app.use(cors());

const DB_URI = `${process.env.DB_URI}`;
const PORT = 5000;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`db connected and listning to port ${PORT}`)
    )
  )
  .catch((err) => {
    console.log(err);
  });

// mongoose.set("useFindAndModify", false);
