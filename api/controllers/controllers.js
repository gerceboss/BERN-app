const { checkTaskClash } = require("./../utils/tasks");
const contract = require("./../contracts/fetch");
const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { addr } = req.params;
    const content = req.body.content;
    console.log(content);
    const task = await checkTaskClash(content, req);
    if (!task) {
      res.status(200).json({
        status: 200,
        message: "task received and not clashed",
      });
    } else {
      res.json({
        message: "cannot create same task",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "some server error",
    });
  }
};
const completeTask = async (req, res) => {
  try {
    console.log(req.body);
    const { addr } = req.params;
    const content = req.body.content;
    console.log(content);
    const task = await checkTaskClash(content, req);
    if (task) {
      res.status(200).json({
        status: 200,
        message: "task exists on chain",
      });
    } else {
      res.json({
        message: "task doesn't exist",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "some server error",
    });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const { addr } = req.params;
    const tasks = await contract.methods.getMyTasks().call({ from: `${addr}` });
    //console.log(tasks);
    const finalTasks = (tasks) => {
      const t = [];
      tasks.forEach((element) => {
        const status = element.completed ? "completed" : "not completed";
        t.push({ content: `${element.content}`, status: status });
      });
      return t;
    };
    const yourTasks = finalTasks(tasks);
    //console.log(yourTasks);
    res.status(200).json({
      status: 200,
      yourTasks,
      message: "tasks ",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      message: "some server error",
    });
  }
};

module.exports = { createTask, completeTask, getAllTasks };
