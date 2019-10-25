pragma solidity ^0.4.24;


contract MfEvents {

    event CreateDeal (
        uint256 dealId,
        address farmerAddr,
        string title,
        string description,
        uint256 desiredBorrowAmount,
        uint256 repayAmount,
        bool repayFinish
    );

    event GroupLending (
        uint256 groupId,
        address[] groupMemberAddr,
        string title,
        string description,
        uint256 desiredBorrowAmount,
        uint256 repayAmount,
        uint256 repayDeadline,
        bool repayFinish
    );
    

    event ExampleEvent (
        uint exampleId,
        string exampleName,
        address exampleAddr
    );

}
