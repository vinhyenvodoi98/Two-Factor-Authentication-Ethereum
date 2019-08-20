import * as actions from '../actions/loginAction';

const initialState = {
  web3: null,
  TwoFactorAuth: null
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.WEB3_CONNECT:
      return {
        ...state,
        web3: action.web3
      };
    case actions.INSTANTIATE_CONTRACT:
      return {
        ...state,
        TwoFactorAuth: action.TwoFactorAuth
      };
    default:
      return state;
  }
};

export default loginReducer;
