pragma solidity ^0.4.24;


contract MfObjects {

    struct Deal {
        uint256 dealId;
        address farmerAddr;
        string title;
        string description;
        uint256 desiredBorrowAmount;
        uint256 repayAmount;
        bool repayFinish;
    }


    struct Group {
        uint256 groupId;
        address[] groupMemberAddr;
        string title;
        string description;
        uint256 desiredBorrowAmount;
        uint256 repayAmount;
        uint256 repayDeadline;
        bool repayFinish;
        uint256 repaidCountTotal;  // Sum of all of group member's repaidCount
    }


    struct Individual {
        uint256 individualId;
        address addr;
        uint256 repaidCount;  // That works as Credit Score
    }
    


    struct ExampleObject {
        uint exampleId;
        string exampleName;
        address exampleAddr;
    }

}
