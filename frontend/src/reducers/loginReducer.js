import * as actions from '../actions/loginAction';

const initialState = {
  web3: null,
  TwoFactorAuth: null,
  etherAddress: '',
  data: {}
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3,
        etherAddress: action.etherAddress
      };
    case actions.INSTANTIATE_CONTRACT:
      return {
        ...state,
        TwoFactorAuth: action.TwoFactorAuth
      };
    case actions.GET_DATA_USER:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default loginReducer;
