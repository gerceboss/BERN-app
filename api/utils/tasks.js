const contract = require("./../contracts/fetch");
async function checkTaskClash(taskContent, req) {
  const { addr } = req.params;
  const tasks = await contract.methods.getMyTasks().call({ from: `${addr}` });
  const foundTask = tasks.find(
    (task) => task.content === taskContent && task.completed != true
  );
  return foundTask;
}
module.exports = { checkTaskClash };
