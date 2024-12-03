pragma solidity >=0.7.0 <0.9.0;

contract BatchSender {

    function multisendEther(address[] calldata _recipients) external payable {
        uint256 total = msg.value;
        uint256 transferValue = 1000 wei; 
        require(total >= _recipients.length*transferValue, "Insufficient funds");
        uint256 i = 0;
        for (i; i < _recipients.length; i++) {
            (bool success, ) = _recipients[i].call{value:transferValue}("");
            require(success, "Transfer failed.");
        }
    }
}    