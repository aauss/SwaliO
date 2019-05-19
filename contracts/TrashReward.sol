pragma solidity ^0.5.7;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";


contract TrashReward is Ownable {

  mapping (address => bool) public container_list;

  event ContainerAdded(address indexed container, int latitude, int longitude);
  event ContainerRemoved(address indexed container);
  event CitizenRewarded(uint amount);

  modifier onlyContainer(){
    require(container_list[msg.sender]);
    _;
  }

  function() external payable {
    // Receive funds by default transfers.
  }

  function addContainer(address _container, int _latitude, int _longitude) external onlyOwner {
    require(!container_list[_container], 'Container is already registered!');
    container_list[_container] = true;
    emit ContainerAdded(_container, _latitude, _longitude);
  }

  function removeContainer(address _container) external onlyOwner {
    require(container_list[_container], 'No such container registered!');
    container_list[_container] = false;
    emit ContainerRemoved(_container);
  }

  function rewardCitizen(address _citizen, uint _amount) external onlyContainer {
    require(address(this).balance >= _amount, 'Not enough funds to reward citizen!');
    address payable citizen = address(uint160(_citizen));
    citizen.transfer(_amount);
    emit CitizenRewarded(_amount);
  }
}
