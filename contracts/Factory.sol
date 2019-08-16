pragma solidity ^0.5.0;
import "./AccessControl.sol";
import "./TwoFactorAuth.sol";

contract Factory is AccessControl {

    address[] public OTPS;

    // create verify contract with address of user inside and return address of contract
    function createTwoFactorAuth(address _userAddress)
        public
        onlyCeo
        returns(address)
    {
        address OTP = address(new TwoFactorAuth(_userAddress));
        OTPS.push(OTP);
        return OTP;
    }

    // return all verify address ( for development )
    function getAllOTP() public view returns (address[] memory) {
        return OTPS;
    }

    function() external payable {}
}
