import Web3 from "web3";
import PropTypes from "prop-types";
import ABI from "./../../../api/ABI.json";
import { useNavigate } from "react-router-dom";
const Wallet = (props) => {
  const navigateTo = useNavigate();
  const connectWallet = async () => {
    try {
      //as metamask is inserted by this window.ethereum object
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(web3, accounts);
        const contractAddress = "0x874806B13dA2e975556CA084e52416c252CedF7F";
        const contract = new web3.eth.Contract(ABI, contractAddress);
        console.log(contract);
        {
          props.saveState({
            web3: web3,
            account: accounts[0],
            contract: contract,
          });
        }
        navigateTo("/getAllTasks");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <button onClick={connectWallet}>Connect Wallet!</button>
    </>
  );
};
Wallet.propTypes = {
  saveState: PropTypes.func.isRequired,
};
export default Wallet;
