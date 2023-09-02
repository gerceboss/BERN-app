import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <header>
      <div className="logo">TODO 3.O</div>
      <nav>
        <ul>
          <li>
            <Link className="nav_link" to="/">
              Wallet
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/getAllTasks">
              Get All Tasks
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/createTask">
              Create Task
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/completeTask">
              Complete Task
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navigation;
