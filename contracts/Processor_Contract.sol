//Nithin Raj Puthenveettil  21AG63R10 MTP IITKGP
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;
//Importing QALab Contract as per OOP principles
import "./QALab_Contract.sol";  
/**
 * @title ProcessorContract
 * @dev The Processor contract inherits functions from the QALab contract, 
 * helps in pre-processing QA data entry and initiates payments to the beneficiary
 * if the batch is found to be of satisfactory quality and the processing parameters
 * are added by the Dairy, to enhance trust in the system   
 */
contract ProcessorContract is  QALabContract{
    /**
      * @dev DairyQA Struct stores the pre-processing parameters, Adopted as per the standards Proposed by FSSAI
      * Refer:(https://fssai.gov.in/upload/advisories/2019/10/5da6f078f3503Letter_Scheme_Diary_Plants_16_10_2019.pdf
      */
    struct DairyQA{
        uint milkTemp;       
        uint pctFAT;         
        uint pctSNF;      
        uint pH;            
        uint InhouseQAtime;    //  Logs the time of the test
        bool SensData;         //  Sensory evalaution data (True = The sample passes the sensor evaluation) 
        bool NoAdulterants;    //  Adulteration test boolean (True = No adulterants, safe milk)
        bool NoChemCont;       //  Chemical contamination test boolean (True = No chemical contamination, safe milk)
        bool NoMicroCont;      //  Microbial contamination test boolean (True = Satisfactory trst results, safe milk)
        bool preProcTestpass;  //  Boolean to indicate if the overall quality is satisfactory
        bool ModStatus;        //  Data modification check
    }

    /**
      * @dev ProcessData Struct contains processing side parameters, relevant to Milk
      */
    struct ProcessData{
        string pcsHash;         //  The IPFS hash of the IoT Device data (Time-Temp data or other data)
        string pcsMethod;       //  The processing method employed (UHT/LTST/HTST)
        uint BBD;               //  The Best Before date of the product
        uint processTime;       //  Logs the time when the processing was done (block.timestamp)
        bool finalPdtQuality;   //  The Inhouse QA Test status, just before being released to the market
        bool pcsStatus;         //  Boolean that restricts the data entry to only once
        address ProcDoneBy;     //  Stores the Ethereum Address of the Processor
            }

     /**
      * @dev Mapping ProcessData and Pre-processing data to the QRCode (uint)
      */  
    mapping (uint => ProcessData) internal ProcessParam;

    mapping (uint => DairyQA) internal InHouseQAResults;
    
    /**
      * @dev Modifier to restrict the data entry to only the registered dairies
      */
    modifier onlyInd(){
        require(checkDairy(msg.sender) == true,
        "You are not registered as a Dairy");
        _;
    }
    
    /**
      * @dev The Inhouse QA test results at the Dairy level is updated.
      * Once the batch is found to be of satisfactory quality, payments 
      * are processed to the VDCS QA Lab address
      * @param _VDCS  The Ethereum EOA Address of the VDCS QA Lab 
      * @param _batchQR  The QR Code of the batch
      * @param _milkTemp  The temperature of milk at reception
      * @param _Fatpct  The fat percent in the sample tested
      * @param _SNFpct  The SNF percent in the sample tested
      * @param _batchpH  The pH of the sample tested
      * @param _sensoryTestPass  The sensory test status of the sample
      * @param _adulterantTestPass  The adulteration test status the sample
      * @param _chemContamTestPass  The chemical cotamination test status of the sample
      * @param _microContamTestPass  The microbial contamination test status of the sample
      * @param _preprocessTestPass  The preprocessing QA test status of the batch  
      */ 
    function addDairyQAData(address payable _VDCS,
                            uint _batchQR,
                            uint _milkTemp,
                            uint _Fatpct,
                            uint _SNFpct,
                            uint _batchpH,
                            bool _sensoryTestPass,
                            bool _adulterantTestPass,
                            bool _chemContamTestPass,
                            bool _microContamTestPass,
                            bool _preprocessTestPass
                            ) public payable onlyInd{

            /**
              * @dev The check for permission status of the Dairy
              */
            require(ProcIndQuery[msg.sender].plantStatus == true,
                    "Your permission status has been revoked");
                    
            /**
               * @dev Check to confirm that the batch belongs to the correct VDCS, 
               * as payments are initiated in the function
               */
            require(keccak256(abi.encodePacked(_VDCS)) == keccak256(abi.encodePacked(QRquery[_batchQR].LabTestDoneBy)),
                              "Entered data do not match"); 

            /**
              * @dev The check for NABL License Validity of the Dairy 
              */
            require(block.timestamp <= ProcIndQuery[msg.sender].nablValidity,
                    "NABL License Validity expired, Please contact Admin");

            /**
              * @dev The check to see if the batch has passed the VDCS QALab test
              */
            require(QRquery[_batchQR].QAPass == true, 
                    "The batch does not meet the necessary quality stadards");

             /**
               * @dev Check to confirm that the batch data has not been previously modified
               */
            require(InHouseQAResults[_batchQR].ModStatus == false, 
                   "The DairyQA data has already been modified for the batch");
                   InHouseQAResults[_batchQR] = DairyQA(_milkTemp,
                                                        _Fatpct,
                                                        _SNFpct,
                                                        _batchpH,
                                                        block.timestamp,
                                                        _sensoryTestPass,
                                                        _adulterantTestPass,
                                                        _chemContamTestPass,
                                                        _microContamTestPass,
                                                        _preprocessTestPass,
                                                        true);   
            /**
               * @dev Payments are sent to the VDCS once the data entry is done
               */
           _VDCS.transfer(msg.value);
                
        }
    /**
      * @dev The Processing parameters are updated by the Dairy
      * Batches of milk (different QR Codes) are usually processed together,
      * for simplicity a array of batches can be updated all at once which also saves gas costs
      * @param _batchCount  The number of batches that are processed at once  
      * @param _QRCodes  The QR Codes of the milk batches being processed
      * @param _pcsHash  The IPFS hash of the processing data (if available)
      * @param _pcsMethod  The processing method employed (HTST/LTLT batch/UHT etc)
      * @param _BBD  The Best Before Date of the processed batch
      * @param _PdtQualityPass  The boolean that indicates the product quality after processing
      */
    function addProcessData(uint _batchCount,
                            uint[] memory _QRCodes,  
                            string memory _pcsHash,
                            string memory _pcsMethod,
                            uint _BBD,
                            bool _PdtQualityPass
                            ) public onlyInd{
        //for loop to run through the QR Codes
        for(uint p = 0; p < _batchCount; p ++){
             /**
               * @dev Check for permission status of the Dairy
               */
            require(ProcIndQuery[msg.sender].plantStatus == true,
                    "Your permission status has been revoked ");

             /**
               * @dev FSSAI License validity check
               */
            require(block.timestamp <= (ProcIndQuery[msg.sender].fssairegnValidUpto),
                    "The FSSAI License validity has expired, Please contact admin");

             /**
               * @dev Check to ensure that the batches have passed the 
               * inhouse Dairy QA tests
               */
            require(InHouseQAResults[_QRCodes[p]].preProcTestpass == true,
                    "The batch is not of satisfactory quality");

             /**
               * @dev Check to ensure that data can only be modifed once
               */
            require(bool(ProcessParam[_QRCodes[p]].pcsStatus) == false, 
                    "The Process parameters have been already modified for some QR");
            
            ProcessParam[_QRCodes[p]] = ProcessData(_pcsHash,
                                                    _pcsMethod,
                                                    _BBD,
                                                    block.timestamp,
                                                    _PdtQualityPass,
                                                    true,
                                                    msg.sender); 
                                                }        
    }
}