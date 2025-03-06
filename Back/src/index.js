import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import routes from './Routes/server.js';

dotenv.config();

const dbUri = process.env.DATABASE_URI;

mongoose.connect(dbUri)
    .catch((error)=> console.log(error))
    .then(() => console.log("conected to database"))

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);


const PORT = process.env.PORT || 9875;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  


process.on("SIGTERM", () => {
    app.close(() => {
      console.log("Server closed, port released.");
      process.exit(0);
    });
  });

