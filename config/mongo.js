import mongoose from "mongoose";
import { config } from "dotenv";
config();

const dbUrl = process.env.DB_URL;
mongoose
  .connect(dbUrl)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(err));

export default mongoose;
