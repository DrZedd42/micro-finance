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

    // Repay rate is 8% which is flat rate.
    uint256 repayRate = 8;
    uint256 _repayRate = repayRate.div(100);


    constructor() public {}

    /*
    * @dev Create deal of micro finance
    */
    function createDeal(
        address _farmerAddr, 
        string _title, 
        string _description, 
        uint256 _desiredBorrowAmount
    ) 
        public 
        returns (uint256, address, string, string, uint256, uint256) 
    {
        _dealId++;  // Counting deal ids are started from 1

        // Calculate repay amount
        uint256 _repayAmount;
        _repayAmount = _desiredBorrowAmount.mul(_repayRate);
        
        Deal memory deal = Deal({
            dealId: _dealId,
            farmerAddr: _farmerAddr,
            title: _title,
            description: _description,
            desiredBorrowAmount: _desiredBorrowAmount,
            repayAmount: _repayAmount
        });
        deals.push(deal);

        emit CreateDeal(deal.dealId, 
                        deal.farmerAddr, 
                        deal.title, 
                        deal.description, 
                        deal.desiredBorrowAmount, 
                        deal.repayAmount);

        return (deal.dealId, 
                deal.farmerAddr, 
                deal.title, 
                deal.description, 
                deal.desiredBorrowAmount, 
                deal.repayAmount);
    }


    /**
    * @dev Micro Finance function（Reputation is for collecting Credit Score）
    */ 
    function CreditScoreReputation() public returns (bool) {}

}
