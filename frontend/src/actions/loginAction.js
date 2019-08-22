import getWeb3 from '../Utilis/getWeb3';
import TwoFactorAuthJson from '../contracts/TwoFactorAuth.json';
import axios from 'axios';

export const WEB3_CONNECT = 'WEB3_CONNECT';
export const web3Connect = () => async (dispatch) => {
  const web3 = await getWeb3();
  const Account = await web3.eth.getAccounts();
  const etherAddress = Account.toString();
  if (etherAddress.length > 0) {
    dispatch({
      type: WEB3_CONNECT,
      web3,
      etherAddress
    });
  } else {
    console.log('Account not found');
  }
  // call getAliasAcount() funciton to get or create alias accout
};

export const INSTANTIATE_CONTRACT = 'INSTANTIATE_CONTRACT';
export const instantiateContracts = (contractAddress) => async (dispatch, getState) => {
  const state = getState();
  const web3 = state.login.web3;
  const from = state.login.etherAddress;

  // If transactionConfirmationBlocks too small as 1 ,it also return contract faster but may be contract doesn't exist on network
  const TwoFactorAuth = await new web3.eth.Contract(TwoFactorAuthJson.abi, contractAddress, {
    transactionConfirmationBlocks: 5
  });
  dispatch({
    type: INSTANTIATE_CONTRACT,
    TwoFactorAuth
  });
  await TwoFactorAuth.methods.login().send({ from });
  var isVerifyContract = await TwoFactorAuth.methods.isUserLogin().call({ from });
  console.log(isVerifyContract);
  if (isVerifyContract) {
    await axios
      .post('http://localhost:4000/checkVerify', {
        userAddress: from,
        contractAddress: contractAddress
      })
      .then((res) => {
        console.log('login Success : ', res.data);
        dispatch(getDataUser(res.data));
      });
  } else {
    console.log('Verify false by wrong wallet address or verify too many time');
  }
};

export const GET_DATA_USER = 'GET_DATA_USER';
export const getDataUser = (data) => async (dispatch) => {
  console.log(data);
  dispatch({
    type: GET_DATA_USER,
    data
  });
};
