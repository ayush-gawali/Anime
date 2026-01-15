import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./DB/db.js";

import userRoute from "./Routes/userRoute.js";
import animeRoute from "./Routes/animeRoute.js";
import authRoute from "./Routes/authRoute.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());
app.use(cors());


connectDB();


app.get("/", (req, res) => (
    res.send("<h1>Api Working</h1>")
));

app.use("/auth", authRoute);
app.use("/anime", animeRoute);
app.use("/user", userRoute);


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});