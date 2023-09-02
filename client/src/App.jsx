import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompleteTask from "./components/CompleteTask";
import CreateTask from "./components/CreateTask";

//import Navigation from "./components/Navigation";
import Wallet from "./components/Wallet";
import GetAllTasks from "./components/GetAllTasks";

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,
  });
  const [taskList, setTaskList] = useState(null);
  const saveState = ({ web3, account, contract }) => {
    setState({ web3: web3, account: account, contract: contract });
  };
  const savetaskList = (taskList) => {
    setTaskList(taskList);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wallet saveState={saveState} />,
    },
    //state is needed to interact with contract using frontend for write operations
    {
      path: "/createTask",
      element: <CreateTask state={state} savetaskList={savetaskList} />,
    },
    {
      path: "/completeTask",
      element: <CompleteTask state={state} taskList={taskList} />,
    },
    {
      path: "/getAllTasks",
      element: <GetAllTasks state={state} taskList={taskList} />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
