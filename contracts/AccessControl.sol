
pragma solidity ^0.5.0;

contract AccessControl {
    address payable public ceoAddress;

    // set up admin ( is must be address of account in server)
    // This only allows the server to interact with the initialization function in Factory.
    constructor() public {
        ceoAddress = msg.sender;
    }

    modifier onlyCeo() {
        require(msg.sender == ceoAddress, "sender must be ceo");
        _;
    }

    function setCeo(address payable _newCeo) external onlyCeo {
        require(_newCeo != address(0), "Ceo mustn't address(0)");
        ceoAddress = _newCeo;
    }
}
