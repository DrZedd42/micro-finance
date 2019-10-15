pragma solidity ^0.4.24;


contract MfEvents {

    event CreateDeal (
        uint256 dealId,
        address farmerAddr,
        string title,
        string description,
        uint256 desiredBorrowAmount,
        uint256 repayAmount
    );

    event ExampleEvent (
        uint exampleId,
        string exampleName,
        address exampleAddr
    );

}
