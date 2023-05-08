//Nithin Raj Puthenveettil  21AG63R10 MTP IITKGP
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;
//Importing Admin Contract as per OOP principles
import "./Admin_Contract.sol";
/**
 * @title ProductContract
 * @dev The Product contract inherits functions from the admin
 * contract, helps in farmer product entry and updates the mapping
 * that the customer calls to traceback the product details
 */

contract ProductContract is AdminContract{
    /**
      * @dev Product Struct contains essential details of 
      * the batch that the farmer adds onto the system
      */
    struct Product{
        string prodName;
        uint  prodHash;
        uint quantity;
        uint dateOfMilking;
        uint LabTestDate; 
        uint QRCode;
        bool QAPass; 
        bool LabTestStatus;
        address Farmer;
        address LabTestDoneBy; 
    }
    
    uint QR;
    /**
      * @dev QR code generated is mapped (QRquery) to the Product struct
      * The address of the farmer is mapped (pdtCount) to the total number of product entries
      * A Nested mapping (pdtTag) is used to make a product entry. This helps in verifying
      * data before sending Ethers 
      */
    mapping(uint => Product) public QRquery;
    mapping (address => uint)  public pdtCount;
    mapping(address => mapping(uint => Product)) public pdtTag;
    
    /**
      * @dev Product entry is done only by registered farmers. A check if the 
      * farmer verification status is true helps restrict data entry
      * @param _productName  The name of the product (Cow Milk, Buffalo Milk etc)
      * @param _quantity  The batch quantity
      * @param _dateOfMilking  The date of Milking
      * @param _prodHash  The IPFS Hash (if available), for the batch
      * @return  The QR Code and product count/Sample ID of the Farmer
      */
    function addPdt(string memory _productName,
                    uint _quantity,
                    uint _dateOfMilking,
                    uint  _prodHash) public onlyFarmer returns(uint,
                                                               uint){
        require(FarmerQuery[msg.sender].KYCverified == true,
                    "Your Farmer Verification status has been revoked, contact Admin");
        pdtCount[msg.sender]++;
        // generates the QR Code
        QR = genQRCode(msg.sender, admin);

        pdtTag[msg.sender][pdtCount[msg.sender]].QRCode = QR;
        pdtTag[msg.sender][pdtCount[msg.sender]].prodName = _productName;
        pdtTag[msg.sender][pdtCount[msg.sender]].quantity = _quantity;
        pdtTag[msg.sender][pdtCount[msg.sender]].dateOfMilking = _dateOfMilking;
        pdtTag[msg.sender][pdtCount[msg.sender]].prodHash = _prodHash;
        pdtTag[msg.sender][pdtCount[msg.sender]].Farmer = msg.sender;

        //Updating QRquery mappping for traceback
        QRquery[QR].prodName =_productName;
        QRquery[QR].quantity = _quantity;
        QRquery[QR].dateOfMilking = _dateOfMilking;
        QRquery[QR].prodHash = _prodHash;
        QRquery[QR].QRCode = QR;
        QRquery[QR].Farmer = msg.sender;

        return (QR,pdtCount[msg.sender]); 
    }  

    function getQRCode() public view returns (uint, uint) {
      return (QR,pdtCount[msg.sender]);
    }

}





    
    