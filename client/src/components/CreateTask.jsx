/* eslint-disable react/prop-types */
// import { useState } from "react";
import Navigation from "./Navigation";
const CreateTask = (props) => {
  const [taskList, setTaskList] = useState([]);
  const { contract, account } = props.state;
  const createTask = async (event) => {
    event.preventDefault();

    // const addr = "0x74bbf4b2223496C4547c44268242A5196E3c6499";
    const taskContent = document.getElementById("content").value;
    const taskCompleted = false;
    try {
      console.log(`http://localhost:3000/api/ethereum/createTask/${account}`);
      const res = await fetch(
        `http://localhost:3000/api/ethereum/createTask/${account}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            content: taskContent,
            completed: taskCompleted,
          }),
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        await contract.methods
          .createTask(taskContent)
          .send({ from: `${account}` });

        getAllTasks();
        displayAll();
      }
    } catch (err) {
      console.error(err);
    }
  };
  async function getAllTasks() {
    try {
      // const addr = document.querySelector("#content");
      const res = await fetch(
        `http://localhost:3000/api/ethereum/getMyTasks/${account}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      //console.log(data);
      if (data.status === 200) {
        //console.log(await data.yourTasks);
        props.savetaskList(await data.yourTasks);
      }
    } catch (err) {
      console.error(err);
    }
  }
  const displayAll = () => {
    taskList.map((task, index) => {
      return (
        <div
          className="all_tasks"
          key={index}
          style={
            task.content !== "" && task.status !== "" ? {} : { display: "none" }
          }
        >
          <p>{task.content}</p>
          <p>{task.status}</p>
        </div>
      );
    });
  };

  return (
    <>
      <Navigation />

      <label>
        task:<input id="content"></input>
      </label>
      <button onClick={createTask}>Create Task</button>
    </>
  );
};
export default CreateTask;
