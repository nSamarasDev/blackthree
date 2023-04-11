const morgan = require('morgan')
const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const colors = require('colors')

const PORT = process.env.PORT || 5050

const app = express();

connectDB()


app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

//Define routing and comments
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/contact", require("./routes/api/contact"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));



app.listen(PORT, () => console.log(`Server running on ${PORT}`))

