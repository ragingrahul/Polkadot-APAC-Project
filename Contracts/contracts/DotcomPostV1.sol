 //SPDX-License-Identifier : MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract dotComPost is ERC721URIStorage,Ownable{
    using Counters for Counters.Counter;

    uint256 public _tokenIds=0;
    uint256 public postPrice=100000000000000000;

    constructor() ERC721("dotCom","DTC"){}

    function mintPostNFT(address dotter,string memory tokenURI) public returns(uint256){

        _tokenIds=_tokenIds+1;
        uint256 newId=_tokenIds;
        _safeMint(dotter,newId);
        _setTokenURI(newId,tokenURI);

        return newId;
    }

    function transferPost(address payable _to,address _from,uint256 _tokenId)external payable{
        require(msg.value>postPrice,"Not enough eth");
        (bool sent, bytes memory data)=_to.call{value:msg.value}("");
        approve(_from,_tokenId);
        safeTransferFrom(_to,_from,_tokenId);
    }

    function setPrice(uint256 _price)external onlyOwner{
        postPrice=_price;
    }

    receive() external payable{}

    fallback() external payable{}
    

}