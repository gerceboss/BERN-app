/* eslint-disable react/prop-types */
import { useState } from "react";
import Navigation from "./Navigation";
const CompleteTask = ({ state }) => {
  const [taskList, settaskList] = useState([]);
  const { contract, account } = state;
  const completeTask = async (event) => {
    event.preventDefault();
    // example: account = "0x777777777777777777777777777777";
    const taskContent = document.getElementById("content").value;

    try {
      console.log(`http://localhost:3000/api/ethereum/completeTask/${account}`);
      const res = await fetch(
        `http://localhost:3000/api/ethereum/completeTask/${account}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            content: taskContent,
          }),
        }
      );
      const data = await res.json();
      if (data.status === 200) {
        await contract.methods
          .completeTask(taskContent)
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

      if (data.status === 200) {
        settaskList(await data.yourTasks);
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
  // async function z() {
  //   await completeTask();
  //   await getAllTasks();
  //   displayAll();
  // }
  return (
    <>
      <Navigation />

      <label>
        task to complete:<input id="content"></input>
      </label>
      <button onClick={completeTask}>Complete Task</button>
    </>
  );
};
export default CompleteTask;
