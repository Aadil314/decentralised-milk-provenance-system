//Nithin Raj Puthenveettil  21AG63R10 MTP IITKGP
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;
//Importing Processor Contract as per OOP principles
import "./Processor_Contract.sol";  
/**
 * @title CustomerContract
 * @dev The customer contract contains functions that fetches the
 * details of the product; The stakeholder details (the farmer/VDCS,
 * the QALab and the Dairy that has processed the batch). The technical details
 * such as the QA Lab Test details can also be queried for complete transparency.
 * The functions are view-only and doesn't incur any gas fees/transaction charges
 */
contract CustomerContract is  ProcessorContract{      
    /**
      * @dev This function fetches the stakeholders that have been involved from
      * farm to fork; The farmer/VDCS details, the QALab details and the Dairy details
      * @param _QRData  The QR Code of the batch 
      * @return Product  The Product Struct details
      * @return FmrRegister  The FmrRegister struct containing the details of the Farmer/VDCS
      * @return QALabRegister  The QALabRegister struct containing the details of the QA Lab
      * @return Industry  The Industry struct that contains  the details of Dairy 
      */    
      function fetchProductBasicDetails(uint _QRData) public view returns(Product memory,
                                                                          Stakeholders.FmrRegister memory,
                                                                          Stakeholders.QALabRegister memory,
                                                                          Stakeholders.Industry memory){
                return (QRquery[_QRData], 
                        FarmerQuery[QRquery[_QRData].Farmer],
                        LabQuery[QRquery[_QRData].LabTestDoneBy],
                        ProcIndQuery[ProcessParam[_QRData].ProcDoneBy]);
      }

    /**
      * @dev This function fetches the technical parameters; The QA Lab test details,
      * the pre-processing QA test results and the aspects relevant to Milk processing  
      * @param _batchQRCode  The QR Code of the batch 
      * @return TechData  The TechData Struct containing the initial QA Lab test details
      * @return DairyQA  The DairyQA struct containing pre-processing QA test results
      * @return ProcessData  The ProcessData struct that contains parameters relevant to Milk processing 
      */   
      function fetchProductTechDetails(uint _batchQRCode) public view returns(TechData memory,
                                                                              DairyQA memory,
                                                                              ProcessData memory){
                return(TechParam[_batchQRCode],
                       InHouseQAResults[_batchQRCode],
                       ProcessParam[_batchQRCode]);
      }
}
   