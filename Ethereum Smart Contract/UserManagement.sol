pragma solidity >=0.4.25 <0.9.0;
import "./EntityTypes.sol";

contract UserManagement {
    
    address adminAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    mapping(address => EntityTypes.Customer) internal customers;
    mapping(uint256 =>  EntityTypes.CustomerService) internal customerServices; // serialNo => ProductId
    

    function addCustomer(EntityTypes.Customer memory customer) public returns (uint256 customerId){
        require(msg.sender == adminAddress); // @todo use modifiers
        require( customers[ customer._address ]._id == 0 );

        customers[ customer._address ] = customer;
        return customer._id;   
    }

    function getCustomer( address _address) public view returns (EntityTypes.Customer memory cutomer){
        return customers[_address];
    }

    function addCustomerService(EntityTypes.CustomerService memory customerService) public returns (uint256 customerServiceId){
        require(msg.sender == adminAddress); // @todo use modifiers
        require( customerServices[ customerService._id ]._id == 0 );

        customerServices[ customerService._id ] = customerService;
        return customerService._id;   
    }

    function getCustomer( uint256 _id) public view returns (EntityTypes.CustomerService memory cutomerService){
        return customerServices[_id];
    }

}



