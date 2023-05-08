//Nithin Raj Puthenveettil  21AG63R10 MTP IITKGP
// SPDX-License-Identifier: UNLICENSED
//Admin side contract 
pragma solidity ^0.8.1;
/**
 * @title Stakeholders
 * @dev Library that contains the essentail details of the stakeholders
 * involved, arranged in the form of reusable structs within a library
 */
library Stakeholders{
    //struct to add the Farmer Details
    struct FmrRegister{
        address  addfmr;       // The Ethereum EOA address of the farmer
        string FarmerName;
        string RegnID;         // The Registered ID details with the Cooperative Union   
        uint32 FarmerPinCode;  // Indicates the approximate location of the stakeholder
        bool   KYCverified;    // Field Verification by the designated authority

    }
    //struct to add the QALab Details
    struct QALabRegister{
        address addLab;        // The Ethereum EOA address of the QALab
        string QAName;
        string AcrdNo;         // NABL Accreditation No. Example:"TC-9000" (string) 
        uint32 LabPinCode;
    }
    //Struct to add the Dairy
    struct Industry {
        address industryAdd;   // The Ethereum EOA address of the Dairy
        string industryName;  
        string nabl;           // NABL Accreditation number of the InhouseQALab (String)
        uint nablValidity;     // License valid for a period of 2 years from issue
        uint fssaiRegn;        // The Fssai Registration number (14 digits, uint)
        uint fssairegnValidUpto; // 1-5 year validity based on the license (Unix time, onlyAdmin)
        uint plantPincode;     // The location of the plant
        bool plantStatus;      // In an inadvertent event, this boolean can prevent further 
                               // data entry by the entity until further investigations are complete                      
    }
}
/**
 * @title AdminContract
 * @dev The Admin contract contains basic controls for the system admin, functions
 * to add Farmers, QALabs, performs the necessary checks for the stakeholders
 * and generates a QR Code for a particular batch of Milk upon reception at the 
 * Village Dairy Cooperative Society (VDCS) 
 */
contract AdminContract{
    /**
      * @dev Counter to track the number of Stakeholders
      */
    uint farmerCount = 1;
    uint LabCount = 1;
    uint IndCount = 1;

    /**
      * @dev The digits in QR Code and the Modulus required for its computation
      */
    uint   QRDigit;
    uint   QRCodeModulus;
    
    /**
      * @dev Boolean statements for various checks
      */ 
    bool FmrStatus;
    bool LabStatus;
    bool ProcStatus;
    bool IndStatus;

    /**
      * @dev Mapping Ethereum EOA to a counter, to track 
      * the total number of Stakeholders
      */ 
    mapping (uint => address) public FarmerList;
    mapping (uint => address) public QALablist;
    mapping (uint => address) public ProcIndList;

    /**
      * @dev Mapping Ethereum EOA to structs in Stakeholders library
      * Useful in retrieving data when a customer fetches product details 
      */ 
    mapping (address =>Stakeholders.FmrRegister) public FarmerQuery;
    mapping (address =>Stakeholders.QALabRegister) public LabQuery;
    mapping (address =>Stakeholders.Industry) public ProcIndQuery;

    /**
      * @dev The Ethereum EOA of the admin 
      */ 
    address public admin;

    /**
      * @dev Constructor to set the system admin 
      */
    constructor() public {
         admin = msg.sender;
    }
    
    /**
      * @dev Reverts/Throws if called by any account other than the admin
      */ 
    modifier onlyAdmin(){
        require(msg.sender == admin,
            "Only the System Admin is authorized for this action");
        _;
    }

    /**
      * @dev Reverts/Throws if called by any account 
      * other than the registered farmer
      */
    modifier onlyFarmer(){
        require(checkFarmer(msg.sender) == true,
            "You are not registered as a farmer");
        _;
    }

    /**
      * @dev Reverts/Throws if called by any account 
      * other than the registered QA Lab
      */
    modifier onlyQALab(){
        require(checkQALab(msg.sender) == true,
            "Only the QALAb is authorised to add this entry");
        _;
    }
    
    /**
      * @dev Adds farmer to the system, Only the system admin can call the function
      * @param _farmer  The Ethereum EOA address of the farmer
      * @param _farmerName  The name of the Farmer/VDCS
      * @param _regnID  The unique registration ID provided by the system admin, after field verification
      * @param _FarmerPinCode  The Indian PIN Code (location) of the farmer/VDCS
      * @param _kycStatus  Boolean that helps in restricting entries, incase the status needs to be revoked
      */
    function addFarmer (address _farmer,
                        string memory _farmerName,
                        string memory _regnID,
                        uint32 _FarmerPinCode,
                        bool _kycStatus) public onlyAdmin{ 
                        FarmerList[farmerCount] = _farmer;
                        FarmerQuery[_farmer] = Stakeholders.FmrRegister(_farmer,
                                                                        _farmerName,
                                                                        _regnID,
                                                                        _FarmerPinCode,
                                                                        _kycStatus); 
                        farmerCount ++;
    }
    
    /**
      * @dev Checks if the Ethereum EOA address belongs to the list of registered farmers
      * @param _fmr  The Ethereum EOA address to be checked
      * @return Boolean representing the status of the address,
      * true, if present in the list of registered farmers
      */
    function checkFarmer(address _fmr) internal returns(bool){
        FmrStatus = false; 
       for ( uint i = 1; i <= farmerCount; i++) {
           if(address(_fmr) ==  address(FarmerList[i])){
               FmrStatus = true;  
            }
        }
        return FmrStatus; 
    }

    /**
      * @dev Adds the QA Lab to the system, Only the system admin can call the function
      * @param _QALab  The Ethereum EOA address of the QA Lab
      * @param _QALabName  The Name of the QA Lab/ Equipment (Eg. MilkoScan)
      * @param _NABLacrdNo  The NABL Accreditation number (string) of the facility
      * @param _LabPinCode  The Indian PIN Code (location) of the QA Lab
      */
    function addQALab (address _QALab,
                       string memory _QALabName,
                       string memory _NABLacrdNo,
                       uint32 _LabPinCode) public onlyAdmin{
        QALablist[LabCount] = _QALab;
        LabQuery[_QALab] = Stakeholders.QALabRegister(_QALab,
                                                      _QALabName,
                                                      _NABLacrdNo,
                                                      _LabPinCode);
        LabCount ++;
    }

    /**
      * @dev Checks if the Ethereum EOA address belongs to the list of registered QA Labs
      * @param _lab  The Ethereum EOA address to be checked
      * @return Boolean representing the status of the address,
      * true, if present in the list of registered QA Labs
      */
    function checkQALab(address _lab) internal returns(bool){
        LabStatus = false; 
       for ( uint i = 1; i <= LabCount; i++) {
           if(address(_lab) ==  address(QALablist[i])){
               LabStatus = true;  
            }
        }
        return LabStatus; 
    }

    /**
      * @dev Adds the Dairy to the system, Only the system admin can call the function
      * @param _DairyAddress  The Ethereum EOA address of the Dairy plant
      * @param _DairyName  The Name of the Dairy
      * @param _NABLAccrNo  The NABL Accreditation number (string) of the facility
      * @param _NABLAccrValidUpto  The NABL license validity (unix time)
      * @param _FSSAIRegnNo  The FSSAI License number of the facility (integers, 14 digits)
      * @param _FSSAILicenseValidUpto  The FSSAI License validity (unix time)
      * @param _DairyPinCode  The Indian PIN Code (location) of the Dairy plant
      * @param _DairyStatus  Boolean that helps in restricting entries, incase the status needs to be revoked 
      */
    function addDairyPlant (address _DairyAddress,
                            string memory _DairyName,
                            string memory _NABLAccrNo,
                            uint _NABLAccrValidUpto,
                            uint _FSSAIRegnNo,
                            uint _FSSAILicenseValidUpto,
                            uint _DairyPinCode,
                            bool _DairyStatus) public onlyAdmin{
            ProcIndList[IndCount] = _DairyAddress;
            ProcIndQuery[_DairyAddress] = Stakeholders.Industry(_DairyAddress, 
                                                                _DairyName,
                                                                _NABLAccrNo,
                                                                _NABLAccrValidUpto,
                                                                _FSSAIRegnNo,
                                                                _FSSAILicenseValidUpto,
                                                                _DairyPinCode,
                                                                _DairyStatus);
            IndCount++;
    }

    /**
      * @dev Checks if the Ethereum EOA address belongs to the list of registered Dairy plants
      * @param _Dairy  The Ethereum EOA address to be checked
      * @return Boolean representing the status of the address,
      * true, if present in the list of registered Dairies
      */
    function checkDairy(address _Dairy) public returns(bool){
        IndStatus = false; 
       for ( uint j = 1; j <= IndCount; j++) {
           if(address(_Dairy) ==  address(ProcIndList[j])){
               IndStatus = true;  
            }
        }
        return IndStatus; 
    }

    /**
      * @dev The digits of the QR Code is assigned, Only the system admin can call the function
      * @param _digits  The number of digits required for the QR code
      */
    function setQRDigits(uint _digits) public onlyAdmin{
        QRDigit = _digits;
        QRCodeModulus =  10 ** QRDigit;
    }

    /**
      * @dev Generates a unique QR Code using Ethereum Keccak256 
      * hash function and timestamp of the block
      * @param _rand1  The Ethereum EOA address to be used while hashing
      * @param _rand2  The Ethereum EOA address to be used while hashing
      * @return Integer QR Code generated as specified by the digits in the QR Code
      */
    function genQRCode(address _rand1,
                       address _rand2) internal view returns(uint){
            uint hashedCode = uint(keccak256(abi.encodePacked(block.timestamp,
                                                              _rand1,
                                                              _rand2)));
            uint Code = hashedCode % QRCodeModulus;
        return Code;
    }
}