const {
  createTask,
  completeTask,
  getAllTasks,
} = require("./../controllers/controllers");

//console.log(contract);
const express = require("express");
const router = express.Router();
// app.get("/api/ethereum/getMyTasks/:addr", getAllTasks);

// app.post("/api/ethereum/createTask/:addr", createTask);
// app.patch("/api/ethereum/completeTask/:addr", completeTask);
router.route("/createTask/:addr").post(createTask);
router.route("/completeTask/:addr").patch(completeTask);
router.route("/getMyTasks/:addr").get(getAllTasks);
module.exports = router;
