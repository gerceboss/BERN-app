const express = require("express");
const routes = require("./routes/routes");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.use("/api/ethereum", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
