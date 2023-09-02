import { useState } from "react";
import Navigation from "./Navigation";

// eslint-disable-next-line react/prop-types
const GetAllTasks = (props) => {
  const { account } = props.state;
  const [taskList, setTaskList] = useState([]);
  async function getAllTasks() {
    try {
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
        console.log(await data.yourTasks);
        setTaskList(await data.yourTasks);
        console.log(taskList);
      }
    } catch (err) {
      console.error(err);
    }
  }
  // const displayAll = () => {
  //   taskList.map((task, index) => {
  //     return (
  //       <div
  //         key={index}
  //         style={
  //           task.content !== "" && task.status !== "" ? {} : { display: "none" }
  //         }
  //       >
  //         <p>{task.content}</p>
  //         <p>{task.status}</p>
  //       </div>
  //     );
  //   });
  // };

  // async function z() {
  //   await getAllTasks();
  //   displayAll();
  // }
  return (
    <>
      <Navigation />
      <button
        onClick={() => {
          getAllTasks();
          {
            taskList.map((task, index) => {
              return (
                <div
                  key={index}
                  style={
                    task.content !== "" && task.status !== ""
                      ? {}
                      : { display: "none" }
                  }
                >
                  <p>{task.content}</p>
                  <p>{task.status}</p>
                </div>
              );
            });
          }
        }}
      >
        GET TASKS
      </button>
    </>
  );
};

export default GetAllTasks;
