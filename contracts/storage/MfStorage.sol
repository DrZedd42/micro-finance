pragma solidity ^0.4.24;

import "chainlink/node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./MfObjects.sol";
import "./MfEvents.sol";


// shared storage
contract MfStorage is MfObjects, MfEvents, Ownable {

    Photo[] public photos;
    

    mapping (uint => ExampleObject) examples;

}

