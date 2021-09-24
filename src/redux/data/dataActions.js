// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let name = await store
        .getState()
        .blockchain.smartContract.methods.name()
        .call();
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      let balanceOf = await store
        .getState()
        .blockchain.smartContract.methods.balanceOf(account)
        .call();
      let getAllRewards = await store
        .getState()
        .blockchain.smartContract.methods.getAllRewards(account)
        .call();
      let getTokensStaked = await store
        .getState()
        .blockchain.smartContract.methods.getTokensStaked(account)
        .call();
      dispatch(
        fetchDataSuccess({
          name,
          totalSupply,
          balanceOf,
          getAllRewards,
          getTokensStaked,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
