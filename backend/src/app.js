const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectDB = require("./lib/ConnectDB");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Fleet management API running" });
})

app.listen(PORT, () => {
    console.log(`Server runnig in port : ${PORT}`)
});
