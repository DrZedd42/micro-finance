pragma solidity 0.4.24;

import "chainlink/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "chainlink/node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract MicroFinance is Ownable {

    using SafeMath for uint256;

    constructor() public {}

    /**
    * @dev Micro Finance function（Reputation is for collecting Credit Score）
    */ 
    function CreditScoreReputation() public returns (bool) {
        
    }

}
