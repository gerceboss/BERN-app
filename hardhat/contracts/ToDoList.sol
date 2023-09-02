//0x874806B13dA2e975556CA084e52416c252CedF7F
//SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

contract ToDoList {
    struct Task {
        string content;
        bool completed;
    }

    event TaskCompleted(address user, string s);
    event TaskCreatedByUser(address user, string s, bool completed);

    mapping(address => Task[]) public taskListsOfUser;

    function completeTask(string memory _s) public {
        for (uint i = 0; i < taskListsOfUser[msg.sender].length; i++) {
            if (
                keccak256(abi.encodePacked(_s)) ==
                keccak256(
                    abi.encodePacked(taskListsOfUser[msg.sender][i].content)
                )
            ) {
                taskListsOfUser[msg.sender][i].completed = true;
                emit TaskCompleted(
                    msg.sender,
                    taskListsOfUser[msg.sender][i].content
                );
                break;
            }
        }
    }

    function createTask(string memory _s) public {
        Task memory t;
        t.content = _s;
        t.completed = false;
        taskListsOfUser[msg.sender].push(t);
        emit TaskCreatedByUser(msg.sender, _s, false);
    }

    function getMyTasks() public view returns (Task[] memory) {
        return taskListsOfUser[msg.sender];
    }
}
