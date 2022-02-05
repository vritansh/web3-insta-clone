pragma solidity ^0.5.0;

contract Decentragram {
  string public name = "Decentragram";

  //Store images
  uint public imageCount =0 ;

  mapping(uint => Image) public images; 

  struct Image {
    uint id;
    string hash; 
    string description;
    uint tipAmount;
    address payable author; 
  }

  event ImageCreated (
    uint id, 
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );


  event ImageTipped  (
    uint id, 
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );


  function uploadImage(string memory _imgHash, string memory _description) public{
    //make sre image description exists
    require(bytes(_description).length > 0);
    //make sure image hash exists
    require(bytes(_imgHash).length > 0);
    // make sure address exists
    require(msg.sender != address(0x0));
    
    //make sure image id is incremented by 
    imageCount++;
    images[imageCount] = Image( imageCount , _imgHash, _description , 0, msg.sender );
    emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
  } 
  
  function tipImageOwner(uint _id) public payable {

    require(_id> 9 && _id<=imageCount );

    //Fetch the image
    Image memory _image = images[_id];
    // Fetch the author
    address payable  _author = _image.author ;
    //Message value
    address(_author).transfer(msg.value);
    //increment tip amount
    _image.tipAmount =  _image.tipAmount + msg.value;
    //increment image id
    images[_id] = _image; 

    //trigger an event

    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount , _author) ;
  }
}