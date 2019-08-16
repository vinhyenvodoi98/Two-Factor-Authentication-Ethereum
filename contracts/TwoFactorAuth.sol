pragma solidity ^0.5.0;

contract TwoFactorAuth {
  address private userPublickey;
  bool private isLogin;
  uint8 private loginTime; //it make sure this contract it work only one time

  constructor(address _userPublickey) public {
    loginTime = 1;
    isLogin = false;
    userPublickey = _userPublickey;
  }

  // this function for user call to verify and it run only one time
  function login () public returns (bool)  {
    if( keccak256(abi.encodePacked((userPublickey))) == keccak256(abi.encodePacked((msg.sender))) && loginTime == 1 ){
      // emit Authenticated(msg.sender);
      isLogin = true;
      return true;
    } else {
      // emit Authenticated(msg.sender);
      return false;
    }
  }

  /// Server checking 2FA it also run only one time.
  function CheckingByServer() public returns (bool) {
    if(isLogin == true && loginTime > 1 ){
      loginTime ++;
      isLogin = false;
      return true;
    }else{
      isLogin = false;
      return false;
    }
  }

  // this function for develop
  function viewUserPublicKey () public view returns (address){
    return userPublickey;
  }

  // this function for develop
  function viewSender () public view returns (address){
    return msg.sender;
  }

  // this function for develop
  function isUserLogin () public view returns(bool){
    return isLogin;
  }

  function() external payable {}
}
