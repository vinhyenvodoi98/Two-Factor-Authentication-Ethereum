pragma solidity ^0.5.0;

contract TwoFactorAuth {
  address private userPublickey;
  bool private isLogin;
  uint8 private loginTime;


  constructor(address _userPublickey) public {
    loginTime = 1;
    isLogin = false;
    userPublickey = _userPublickey;
  }

  function login () public returns (bool)  {
    if( keccak256(abi.encodePacked((userPublickey))) == keccak256(abi.encodePacked((msg.sender))) && loginTime == 1 ){
      // emit Authenticated(msg.sender);
      loginTime ++;
      isLogin = true;
      return true;
    } else {
      // emit Authenticated(msg.sender);
      isLogin = false;
      return false;
    }
  }

  /// Server checking 2FA.
  function CheckingByServer() public returns (bool) {
    if(isLogin == true ){
      isLogin = false;
      return true;
    }else{
      return false;
    }
  }

  function viewUserPublicKey () public view returns (address){
    return userPublickey;
  }

  function viewsender () public view returns (address){
    return msg.sender;
  }

  function isUserLogin () public view returns(bool){
    return isLogin;
  }

  function() external payable {}
}
