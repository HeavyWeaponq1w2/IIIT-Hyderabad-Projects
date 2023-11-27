// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.25 <0.9.0;
import "./EntityTypes.sol";

contract ProductManagement {

    address adminAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    // constructor() public {
    //     adminAddress = 
    // }
    
    uint256 transactionId = 0;

    //Mappings
    mapping(uint256 => EntityTypes.Product) internal products;
    mapping(string => uint256) internal inventoryMapping; // serialNo => ProductId
    mapping(address => string[]) internal purchaseHistory; // SerialNo => List of customerid
    mapping(string => EntityTypes.Sales[]) internal sales; //SerialNO => SalesHistory
    mapping(string => EntityTypes.Customer_Service_Reuest[]) internal serviceReqHistory; // SerialNo => List of Customer_Service_Reuest 
    

    function addProduct(EntityTypes.Product memory product) public returns (uint256 prod){
        require(msg.sender == adminAddress); // @todo use modifiers
        // check if the Prouct Id being passed exists
        require(compareStrings(products[product.prodId].title, ""));

        products[product.prodId] = product;
        return product.prodId;   
    }

    function updateSerialNumberOfProduct( uint256 prodId, string memory serial_no ) public returns (bool sucess){
        require(msg.sender == adminAddress); // @todo use modifiers

        if(inventoryMapping[serial_no] == 0){
            inventoryMapping[serial_no] = prodId;
            return true;  
        }
        else{
            return false;
        }
        
         
    }


    function random(uint num) public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender))) % num;
    }

    function transferOwnership(address sellerAddress, address buyerAddress, string memory serialNo) public returns (bool sucess){
        require(msg.sender == adminAddress);
        require(inventoryMapping[serialNo] !=0);
        purchaseHistory[buyerAddress].push(serialNo);

        EntityTypes.Sales memory sale = EntityTypes.Sales(
            block.timestamp,
            "resale",
            serialNo,
            sellerAddress,
            buyerAddress,
            block.timestamp,
            products[inventoryMapping[serialNo]].price
            );
        
        sales[serialNo].push(sale); 

        return true;
    }

    function getPurchaseHistoryBySerialNumber( string memory serialNo ) public view returns (EntityTypes.Sales[] memory purchaseHistoryOfSerailNo){
        return sales[serialNo];
    }

    
    function getProductDetails(uint256 productId) public view returns (EntityTypes.Product memory prod)
    {
        return products[productId];
    }


    function getProductDetailsBySerialNumber(string memory serialNo) public view returns (EntityTypes.Product memory prod){
        require(msg.sender == adminAddress);
        return products[inventoryMapping[serialNo]];
    }


    function compareStrings(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    receive() external payable {
        // custom function code
    }

    fallback() external payable {

    }

}