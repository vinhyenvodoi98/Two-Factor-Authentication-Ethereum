pragma solidity ^0.5.0;


/// Use an ethereum address as proof of 2FA instead of a phone number.
contract TwoFactorAuth {
  address private userPublickey;
  string private webside; //check url where user verify
  bool private isLogin;
  uint8 private loginTime;

  /// @dev The event which logs an Ethereum 2FA call that a server can listen to.
  // event Authenticated(address _user);

  /// Set the url and service strings on construction.
  /// @param _userPublickey The url this contract is intended to provide 2FA for.

  constructor(address _userPublickey) public {
    loginTime = 1;
    isLogin = false;
    userPublickey = _userPublickey;
    // webside = _webside;
  }

  function login () public payable returns (bool)  {
    if( keccak256(abi.encodePacked((userPublickey))) == keccak256(abi.encodePacked((msg.sender))) && loginTime == 1 ){
      // emit Authenticated(msg.sender);
      isLogin = true;
      return true;
    } else {
      // emit Authenticated(msg.sender);
      return false;
    }
  }

  /// Server checking 2FA.
  function CheckingByServer() public payable returns (bool) {
    if(isLogin == true){
      loginTime ++;
      isLogin == false;
      return true;
    }else{
      isLogin == false;
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
}
