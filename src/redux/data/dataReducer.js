const initialState = {
  loading: false,
  name: "",
  totalSupply: 0,
  balanceOf: 0,
  getAllRewards: 0,
  getTokensStaked: [],
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        name: action.payload.name,
        totalSupply: action.payload.totalSupply,
        getAllRewards: action.payload.getAllRewards,
        balanceOf: action.payload.balanceOf,
        getAllRewards: action.payload.getAllRewards,
        getTokensStaked: action.payload.getTokensStaked,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
