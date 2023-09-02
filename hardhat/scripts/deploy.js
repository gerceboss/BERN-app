(async () => {
  try {
    const ToDoList = await hre.ethers.getContractFactory("ToDoList");
    const ToDoListinstance = await ToDoList.deploy();
    await ToDoListinstance.deployed();
    console.log(` contract deployed at ${ToDoListinstance.address}`);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
})();
