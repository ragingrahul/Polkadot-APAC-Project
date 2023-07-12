// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DotcomUserV1 {
    uint256 id=0;

    struct DotUser{
        uint256 id;
        string name;
        address userAddress;
        string avatar;
        string bio;
        uint256 dob;
        address[] following;
    }

    
    mapping(address=>uint256) public addressToId;
    mapping(uint256=>DotUser) public idToUser;

    function initializeUser(string memory name,string memory avatar,string memory bio,uint256 dob)external{
        require(addressToId[msg.sender]==0,"User exists");
        id=id+1;
        DotUser memory newUser;
        newUser.id=id;
        newUser.name=name;
        newUser.userAddress=msg.sender;
        newUser.avatar=avatar;
        newUser.bio=bio;
        newUser.dob=dob;
        addressToId[msg.sender]=id;
        idToUser[id]=newUser;
    }

    function updateUser(string memory name,string memory avatar,string memory bio,uint256 dob)external{
        require(addressToId[msg.sender]!=0,"User doesn't exists");
        uint256 userId=addressToId[msg.sender];
        DotUser memory updatedUser=idToUser[userId];
        updatedUser.name=name;
        updatedUser.avatar=avatar;
        updatedUser.bio=bio;
        updatedUser.dob=dob;
        idToUser[userId]=updatedUser;
    }

    function addFollowers(address userAddress) external{
        uint256 userId=addressToId[msg.sender];
        idToUser[userId].following.push(userAddress);
        
    }
}