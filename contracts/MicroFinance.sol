pragma solidity 0.4.24;

import "chainlink/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "chainlink/node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

import "./storage/MfStorage.sol";
import "./modifiers/MfOwnable.sol";


contract MicroFinance is Ownable, MfStorage, MfOwnable {

    using SafeMath for uint256;

    /*+ 
     * @dev Global variable
     */ 
    uint256 _dealId;

    constructor() public {}

    /*
    * @dev Create deal of micro finance
    */
    function CreateDeal(
        address _farmerAddr, 
        string _title, 
        string _description, 
        uint256 _desiredInvestmentAmount
    ) 
        public 
        returns (uint256, address, string, string, uint256) 
    {
        _dealId++;  // Counting deal ids are started from 1
        
        Deal memory deal = Deal({
            dealId: _dealId,
            farmerAddr: _farmerAddr,
            title: _title,
            description: _description,
            desiredInvestmentAmount: _desiredInvestmentAmount
        });
        deals.push(deal);

        return (deal.dealId, deal.farmerAddr, deal.title, deal.description, deal.desiredInvestmentAmount);
    }


    /**
    * @dev Micro Finance function（Reputation is for collecting Credit Score）
    */ 
    function CreditScoreReputation() public returns (bool) {}

}
