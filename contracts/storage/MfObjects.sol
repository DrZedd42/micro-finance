pragma solidity ^0.4.24;


contract MfObjects {

    struct Photo {
        uint256 tokenId;
        address curretOwnerAddr;
        string ipfsHash;
        uint256 reputation;
    }


    struct ExampleObject {
        uint exampleId;
        string exampleName;
        address exampleAddr;
    }

}
