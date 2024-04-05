const express = require("express");
const db = require("./connectDB.js");
const route = require("./controllers/userController.js");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

const port = 5000;

app.use(bodyparser.json());
app.use(cors());
app.use("/api/users", route);

// app.use((err,req,res,next)=>{
//     console.log(err)
//     res.status(err.status || 500).('something  went wrong');
// })

db.query("select 1")
  .then((rows) => console.log(`Connected to MySQL Server`))
  .catch((err) => {
    console.error(err);
    // process.exit(-1);
  });

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  console.log(`http://localhost:${port}`);
});
