// constants
import Web3 from "web3";
import SmartContract from "../../contracts/uSTD.json";
import SmartContract2 from "../../contracts/WeMintCash.json";
import SmartContract3 from "../../contracts/wmc.json";
// logy
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
       // const NetworkData = await SmartContract.networks[networkId];
        if (networkId == 1) {
       // if (NetworkData) {
          const SmartContractObj = new web3.eth.Contract(
            SmartContract.abi,
            // NetworkData.address
            "0xf6cf31c74d05A5879Df2ec7AB2ACcE687E6B09C6" // uSTD
          );
          const SmartContractObj2 = new web3.eth.Contract(
            SmartContract2.abi,
            // NetworkData.address
            "0xA9cB55D05D3351dcD02dd5DC4614e764ce3E1D6e" // Washington
          );
          const SmartContractObj3 = new web3.eth.Contract(
            SmartContract3.abi,
            // NetworkData.address
            "0x1920B60969Bc3087E2bDA3A4ca60BcAAD747b1a2" // WMC
          );
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              smartContract2: SmartContractObj2,
              smartContract3: SmartContractObj3,
              web3: web3,
            })
          );
          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Ethereum."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};
