import getWeb3 from '../Utilis/getWeb3';
import TwoFactorAuthJson from '../contracts/TwoFactorAuth.json';

export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async (dispatch) => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    dispatch({
      type: WEB3_CONNECT,
      web3
    });
  } else {
    console.log('Account not found');
  }
  // call getAliasAcount() funciton to get or create alias accout
};

export const INSTANTIATE_CONTRACT = 'INSTANTIATE_CONTRACT';
export const instantiateContracts = (address) => async (dispatch, getState) => {
  const state = getState();
  let web3 = state.tomo.web3;
  const TwoFactorAuth = new web3.eth.Contract(TwoFactorAuthJson.abi, address, {
    transactionConfirmationBlocks: 1
  });
  dispatch({
    type: INSTANTIATE_CONTRACT,
    TwoFactorAuth
  });
  //   dispatch(instantiateAdminGame());
};
