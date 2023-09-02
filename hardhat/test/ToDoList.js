const hre = require("hardhat");
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
describe("ToDoList", async () => {
  async function deployInstance() {
    const ToDoList = await hre.ethers.getContractFactory("ToDoList");
    const ToDoListinstance = await ToDoList.deploy();
    const [user] = await hre.ethers.getSigners();
    const t1 = await ToDoListinstance.createTask("this is the first task");
    return { ToDoListinstance };
  }
  it("should be able to create task", async () => {
    const { ToDoListinstance } = await loadFixture(deployInstance);
    //const [user] = await hre.ethers.getSigners();
    const t2 = await ToDoListinstance.getMyTasks();

    expect(await t2[0]).to.have.deep.members(["this is the first task", false]);
    // expect(t3).to.include(false);
  });
  it("should be able to check task completion ", async () => {
    const { ToDoListinstance } = await loadFixture(deployInstance);
    const [user] = await hre.ethers.getSigners();

    const t2 = await ToDoListinstance.completeTask("this is the first task");
    const t3 = await ToDoListinstance.getMyTasks();
    expect(await t3[0]).to.include(true);
  });

  it("should emit proper events", async () => {
    const { ToDoListinstance } = await loadFixture(deployInstance);
    const [user] = await hre.ethers.getSigners();
    await expect(
      ToDoListinstance.connect(user).createTask("this is the first task")
    )
      .to.emit(ToDoListinstance, "TaskCreatedByUser")
      .withArgs(user.address, "this is the first task", false);
    await expect(
      ToDoListinstance.connect(user).completeTask("this is the first task")
    )
      .to.emit(ToDoListinstance, "TaskCompleted")
      .withArgs(user.address, "this is the first task");
  });
});
