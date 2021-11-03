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
      let getAllRewardsWMC = await store
        .getState()
        .blockchain.smartContract3.methods.getAllRewards(account)
        .call();
      let getTokensStaked = await store
        .getState()
        .blockchain.smartContract.methods.getTokensStaked(account)
        .call();
      let getTokensStakedWMC = await store
        .getState()
        .blockchain.smartContract3.methods.getTokensStaked(account)
        .call();
      
      let balanceOfWMC = await store
        .getState()
        .blockchain.smartContract3.methods.balanceOf(account)
        .call();

      let isApprovedUSTD = await store
        .getState()
        .blockchain.smartContract2.methods.isApprovedForAll(account, "0xf6cf31c74d05A5879Df2ec7AB2ACcE687E6B09C6")
        .call();

      let isApprovedWMC = await store
        .getState()
        .blockchain.smartContract2.methods.isApprovedForAll(account, "0x1920B60969Bc3087E2bDA3A4ca60BcAAD747b1a2")
        .call();

      dispatch(
        fetchDataSuccess({
          name,
          totalSupply,
          balanceOf,
          getAllRewards,
          getAllRewardsWMC,
          getTokensStaked,
          getTokensStakedWMC,
          balanceOfWMC,
          isApprovedUSTD,
          isApprovedWMC,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
