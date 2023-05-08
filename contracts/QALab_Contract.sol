//Nithin Raj Puthenveettil  21AG63R10 MTP IITKGP
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;
//Importing Product Contract as per OOP principles
import "./Product_Contract.sol";
/**
 * @title QALabContract
 * @dev The QALab contract inherits functions from the product
 * contract, enters the details regarding QA test done at the VDCS level, if found
 * to be of satisfactory quality, initiates payments to the farmer in Ethers  
 */

contract QALabContract is  ProductContract{
    /**
      * @dev TechData Struct contains parameters usually tested at the VDCS level
      */
    struct TechData{
                     uint Temp; 
                     uint pH;
                     uint SNF;
                     uint fat;
                     uint Lcts;
                     bool QALabTestPass;
    }

    /**
      * @dev QR Code is mapped to the TechData struct, for traceback customer call
      */
    mapping (uint => TechData) public TechParam;

    /**
      * @dev Initial QA test results done at the VDCS level is added to the  
      * system and if the batch is found to be of satisfactory quality, the payments
      * are processed 
      * @param _beneficiary  The Ethereum EOA Address of the Farmer/VDCS
      * @param _sampleID  The product count/ sample ID of the batch
      * @param _QR  The QR Code of the batch
      * @param _pH  The pH of the Milk sample tested
      * @param _receptionTemp  The temperature of the milk sample upon reception
      * @param _SNFPercent  The SNF content in the sample
      * @param _fatPercent  The fat percent in the sample
      * @param _lactosePercent  The lactose percentage in the sample
      * @param _QAPass  The quality test status of the batch   
      */ 
    function addQAData(address  payable _beneficiary,
                       uint _sampleID,
                       uint _QR,
                       uint _pH,
                       uint _receptionTemp,
                       uint _SNFPercent,
                       uint _fatPercent,
                       uint _lactosePercent,
                       bool _QAPass) public payable onlyQALab {
        // Check to make sure that the data added is correct
        require( keccak256(abi.encodePacked(_QR)) == keccak256(abi.encodePacked(pdtTag[_beneficiary][_sampleID].QRCode)),
                "The data entered do not match ");

        // Check to ensure that only the lab data is modified once
        require(pdtTag[_beneficiary][_sampleID].LabTestStatus == false, 
                "The LabTest details have been already modified "); 
                
        pdtTag[_beneficiary][_sampleID].QAPass = _QAPass;
        pdtTag[_beneficiary][_sampleID].LabTestDate = block.timestamp;
        pdtTag[_beneficiary][_sampleID].LabTestStatus = true;
        pdtTag[_beneficiary][_sampleID].LabTestDoneBy = msg.sender;
        
        /**
          * @dev Updating the data to the TechParam mapping
          */
        TechParam[_QR] = TechData(_receptionTemp,
                                  _pH,
                                  _SNFPercent,
                                  _fatPercent,
                                  _lactosePercent,
                                  _QAPass);
        /**
          * @dev Payment initiated to the Farmer/VDCS
          */
        _beneficiary.transfer(msg.value);

        /**
          * @dev Updating the QRquery mapping for customer traceback
          */
        
        QRquery[_QR].QAPass = _QAPass;                 
        QRquery[_QR].LabTestDate = block.timestamp;    
        QRquery[_QR].LabTestStatus = true;             
        QRquery[_QR].LabTestDoneBy = msg.sender;       
    }
        
}