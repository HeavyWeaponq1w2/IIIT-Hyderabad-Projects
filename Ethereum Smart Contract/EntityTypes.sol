// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.25 <0.9.0;

library EntityTypes {

    enum CustomerType {
        Normal, // 0
        Celebrity // 1
    }

    enum CustomerServiceType {
        Regular, // 0
        Repair // 1
    }

    struct Customer {
        uint256 _id;
        address _address;
        string name;
        CustomerType customertype;
    }

    struct CustomerService {
        uint256 _id;
        string Name;
        CustomerServiceType customerServiceType;
    }

    struct Customer_Service_Reuest {
        uint256 _id;
        string description;
        Inventory_Mapping inventory_Mapping;
        Customer customer;
        CustomerService customerService;
    }

    enum ProductType {
        Consumable, // 0
        NonConsumable // 1      
    }

    struct Manufacturer {
        uint256 _id;
        address _address;
        string _name;
    }

    struct Product {
        uint256 prodId;
        string title;
        string desciption;
        bool isAvailable;
        uint256 price;
        Manufacturer manufacturer;
        ProductType productType;
        uint256 manDateEpoch;
        uint256 expDateEpoch;
        uint256 warrenty;
    }

    struct Inventory_Mapping {
        string serialNo;
        Product product;
    }

    struct Sales {
        uint Transaction_Id;
        string sale_Type;
        string serial_No;
        address from;
        address to;
        uint256 saleDateEpoch;
        uint256 sale_Price;
    }

   
 
}