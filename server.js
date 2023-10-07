const express = require("express");
const dontenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const cors = require("cors");

connectDb();
const app = express();
app.use(cors())

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/blog", require("./routes/blogRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use('/',(req, res)=>{
  res.send('Rxpert APIs')
})

app.use(errorHandler);

app.listen(port, () => {
  console.log(`starting server on port ${port}`);
});
