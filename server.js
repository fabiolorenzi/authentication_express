const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");

const users = require("./routes/api/users.js");

const app = express();

connectDB();

app.use(cors({origin: true, credentials: true}));
app.use(express.json({extended: false}));
app.get("/", (req, res) => res.send("The server is running"));
app.use("/api/users", users);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server is running on port ${port}`));