if (typeof web3 !== "undefined") {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(
	  new Web3.providers.HttpProvider("http://localhost:8545")
	);
}

// set contract address and ABI
const contractAddress = '0xEa2f1BAD9Bd14251DE8507E0ba231794D83A73b6';
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_DairyAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_DairyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_NABLAccrNo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_NABLAccrValidUpto",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_FSSAIRegnNo",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_FSSAILicenseValidUpto",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_DairyPinCode",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_DairyStatus",
				"type": "bool"
			}
		],
		"name": "addDairyPlant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_VDCS",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_batchQR",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_milkTemp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_Fatpct",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_SNFpct",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_batchpH",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_sensoryTestPass",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_adulterantTestPass",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_chemContamTestPass",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_microContamTestPass",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_preprocessTestPass",
				"type": "bool"
			}
		],
		"name": "addDairyQAData",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_farmer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_farmerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_regnID",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "_FarmerPinCode",
				"type": "uint32"
			},
			{
				"internalType": "bool",
				"name": "_kycStatus",
				"type": "bool"
			}
		],
		"name": "addFarmer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_dateOfMilking",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_prodHash",
				"type": "uint256"
			}
		],
		"name": "addPdt",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batchCount",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_QRCodes",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "_pcsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pcsMethod",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_BBD",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_PdtQualityPass",
				"type": "bool"
			}
		],
		"name": "addProcessData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_beneficiary",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_sampleID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_QR",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_receptionTemp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_SNFPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fatPercent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_lactosePercent",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_QAPass",
				"type": "bool"
			}
		],
		"name": "addQAData",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_QALab",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_QALabName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_NABLacrdNo",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "_LabPinCode",
				"type": "uint32"
			}
		],
		"name": "addQALab",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_Dairy",
				"type": "address"
			}
		],
		"name": "checkDairy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_digits",
				"type": "uint256"
			}
		],
		"name": "setQRDigits",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "FarmerList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "FarmerQuery",
		"outputs": [
			{
				"internalType": "address",
				"name": "addfmr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "FarmerName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "RegnID",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "FarmerPinCode",
				"type": "uint32"
			},
			{
				"internalType": "bool",
				"name": "KYCverified",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_QRData",
				"type": "uint256"
			}
		],
		"name": "fetchProductBasicDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "prodName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "prodHash",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "quantity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dateOfMilking",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "LabTestDate",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "QRCode",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "QAPass",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "LabTestStatus",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "Farmer",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "LabTestDoneBy",
						"type": "address"
					}
				],
				"internalType": "struct ProductContract.Product",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "addfmr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "FarmerName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "RegnID",
						"type": "string"
					},
					{
						"internalType": "uint32",
						"name": "FarmerPinCode",
						"type": "uint32"
					},
					{
						"internalType": "bool",
						"name": "KYCverified",
						"type": "bool"
					}
				],
				"internalType": "struct Stakeholders.FmrRegister",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "addLab",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "QAName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "AcrdNo",
						"type": "string"
					},
					{
						"internalType": "uint32",
						"name": "LabPinCode",
						"type": "uint32"
					}
				],
				"internalType": "struct Stakeholders.QALabRegister",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "industryAdd",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "industryName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "nabl",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "nablValidity",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fssaiRegn",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fssairegnValidUpto",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "plantPincode",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "plantStatus",
						"type": "bool"
					}
				],
				"internalType": "struct Stakeholders.Industry",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batchQRCode",
				"type": "uint256"
			}
		],
		"name": "fetchProductTechDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "Temp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pH",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "SNF",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "fat",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "Lcts",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "QALabTestPass",
						"type": "bool"
					}
				],
				"internalType": "struct QALabContract.TechData",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "milkTemp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pctFAT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pctSNF",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pH",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "InhouseQAtime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "SensData",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "NoAdulterants",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "NoChemCont",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "NoMicroCont",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "preProcTestpass",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "ModStatus",
						"type": "bool"
					}
				],
				"internalType": "struct ProcessorContract.DairyQA",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "pcsHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "pcsMethod",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "BBD",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "processTime",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "finalPdtQuality",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "pcsStatus",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "ProcDoneBy",
						"type": "address"
					}
				],
				"internalType": "struct ProcessorContract.ProcessData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getQRCode",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "LabQuery",
		"outputs": [
			{
				"internalType": "address",
				"name": "addLab",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "QAName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "AcrdNo",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "LabPinCode",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pdtCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pdtTag",
		"outputs": [
			{
				"internalType": "string",
				"name": "prodName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "prodHash",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dateOfMilking",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LabTestDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "QRCode",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "QAPass",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "LabTestStatus",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "Farmer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "LabTestDoneBy",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ProcIndList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "ProcIndQuery",
		"outputs": [
			{
				"internalType": "address",
				"name": "industryAdd",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "industryName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "nabl",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "nablValidity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fssaiRegn",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fssairegnValidUpto",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "plantPincode",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "plantStatus",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "QALablist",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "QRquery",
		"outputs": [
			{
				"internalType": "string",
				"name": "prodName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "prodHash",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dateOfMilking",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "LabTestDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "QRCode",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "QAPass",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "LabTestStatus",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "Farmer",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "LabTestDoneBy",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "TechParam",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "Temp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pH",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "SNF",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fat",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "Lcts",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "QALabTestPass",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// create contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// login authentication
async function loginAuth(){
	let account = document.getElementById('loginAdd').value;
	console.log(account)
	window.myApp = { account };
	if(!web3.utils.isAddress(account)){
		showModal('Invalid Address, Please enter a valid Ethereum address');
		return false;
	} 
	const admin = await contract.methods.admin().call({ from: account })
	if(account == admin){
		const url = "admin.html" + "?account=" + account;
		loadPage(url)
		return false;
	}
	let address;
	let i = 1;
	while(address != 0x0000000000000000000000000000000000000000){
		address = await contract.methods.FarmerList(i).call({ from: account });
		i++;
		if(address == account){
			const url = "farmer.html" + "?account=" + account;
			loadPage(url);
			return false;
		}
	}
	address = admin;
	i = 1;
	while(address != 0x0000000000000000000000000000000000000000){
		address = await contract.methods.QALablist(i).call({ from: account });
		i++;
		if(address == account){
			const url = "QALab.html" + "?account=" + account;
			loadPage(url);
			return false;
		}
	}
	address = admin;
	i = 1;
	while(address != 0x0000000000000000000000000000000000000000){
		address = await contract.methods.ProcIndList(i).call({ from: account });
		i++;
		if(address == account){
			const url = "dairyPlant.html" + "?account=" + account;
			loadPage(url);
			return false;
		}
	}
	const url = "customer.html" + "?account=" + account;
	loadPage(url);
}

function loadPage(url) {
	window.location.href = url;
}

// getting account address from url passes at login page
const params = new URLSearchParams(window.location.search);
const account = params.get("account");
console.log(account)

async function setQRDigits() {
	event.preventDefault(); // Prevent the default form submission behavior
	// showing modal for entering QR digit value
	showModal2("Please enter value between 8 and 20:");
	// Get the button element
	const button = document.getElementById("modalBtn");

	// Add the event listener running only once, to prevent looping
	button.addEventListener("click", async function(){
		// QR digit decides length of the QR code
		let QRDigit = document.getElementById('modalInp').value;
		// checking if qr digit is within proper range
		if(QRDigit<8 || QRDigit>20){
			// alert("Digits not set. Please enter a value within range.");
			showModal("QR Digits not set. Please enter a value within range.");
		}else{	

			// Call the contract method
			contract.methods.setQRDigits(QRDigit).send({ from: account, gas: 200000})
			.then(function(receipt) {
				console.log('Transaction receipt:', receipt);
				// The transaction is confirmed
				showModal("QR digits set!");
			})
			.catch(function(error) {
				console.error('Transaction error:', error);
				// If there is an error
				const keyword = "revert";
				const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
				const errorMessage = error.toString().substring(startIndex);
				showModal((errorMessage)? "Failed! "+errorMessage:"QR digits not set! Check the Console.");
			});
		}
	}, { once: true });
}

async function addFarmer() {
	event.preventDefault(); // Prevent the default form submission behavior
	if (confirm("Are you sure you want to submit this form?")) {
		console.log("Adding Farmer...");
		const farmerAddress = document.getElementById('farmerAddress').value;
		const farmerName = document.getElementById('farmerName').value;
		const regnID = document.getElementById('regnID').value;
		const FarmerPinCode = document.getElementById('FarmerPinCode').value;
		const kycStatus = document.getElementById('kycStatus').checked;
		if(!web3.utils.isAddress(farmerAddress)){
			showModal('Invalid Address, Please enter a valid Ethereum address');
			return false;
		}


		// Call the contract method
		contract.methods.addFarmer(farmerAddress, farmerName, regnID, FarmerPinCode, kycStatus).send({ from: account, gas: 200000})
		.then(function(receipt) {
			console.log('Transaction receipt:', receipt);
			// The transaction is confirmed
			showModal("Farmer Added!");
		})
		.catch(function(error) {
			console.error('Transaction error:', error);
			// If there is an error
			const keyword = "revert";
			const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
			const errorMessage = error.toString().substring(startIndex);
			showModal((errorMessage)? "Failed! "+errorMessage:"Adding Failed! Check the Console.");
		});	
	}
}

async function addQALab() {
	event.preventDefault(); // Prevent the default form submission behavior
	if (confirm("Are you sure you want to submit this form?")) {
		console.log("Adding QA Lab...");
		const QALab = document.getElementById('QALab').value;
		const QALabName = document.getElementById('QALabName').value;
		const NABLacrdNo = document.getElementById('NABLacrdNo').value;
		const LabPinCode = document.getElementById('LabPinCode').value;
		if(!web3.utils.isAddress(QALab)){
			showModal('Invalid Address, Please enter a valid Ethereum address');
			return false;
		}

		// Call the contract method
		contract.methods.addQALab(QALab, QALabName, NABLacrdNo, LabPinCode).send({ from: account, gas: 200000})
		.then(function(receipt) {
			console.log('Transaction receipt:', receipt);
			//The transaction is confirmed
			showModal("QA Lab Added!");
		})
		.catch(function(error) {
			console.error('Transaction error:', error);
			// If there is an error
			const keyword = "revert";
			const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
			const errorMessage = error.toString().substring(startIndex);
			showModal((errorMessage)? "Failed! "+errorMessage:"Adding Failed! Check the Console.");
		});
	}
}

async function addDairyPlant() {
	event.preventDefault(); // Prevent the default form submission behavior
	if (confirm("Are you sure you want to submit this form?")) {
		console.log("Adding Dairy Plant...");
		const DairyAddress = document.getElementById('DairyAddress').value;
		const DairyName = document.getElementById('DairyName').value;
		const NABLAccrNo = document.getElementById('NABLAccrNo').value;
		const dateInput1 = document.getElementById('NABLAccrValidUpto').value;
		const FSSAIRegnNo = document.getElementById('FSSAIRegnNo').value;
		const dateInput2 = document.getElementById('FSSAILicenseValidUpto').value;
		const DairyPinCode = document.getElementById('DairyPinCode').value;
		const DairyStatus = document.getElementById('DairyStatus').checked;
		const NABLAccrValidUpto = Math.floor(new Date(dateInput1).getTime() / 1000);
		const FSSAILicenseValidUpto = Math.floor(new Date(dateInput2).getTime() / 1000);
		
		if(!web3.utils.isAddress(DairyAddress)){
			showModal('Invalid Address, Please enter a valid Ethereum address');
			return false;
		}

		// Call the contract method
		contract.methods.addDairyPlant(DairyAddress, DairyName, NABLAccrNo, NABLAccrValidUpto, FSSAIRegnNo, FSSAILicenseValidUpto, DairyPinCode, DairyStatus).send({ from: account, gas: 300000})
		.then(function(receipt) {
			console.log('Transaction receipt:', receipt);
			// Do something after the transaction is confirmed
			showModal("Dairy Plant Added!");
		})
		.catch(function(error) {
			console.error('Transaction error:', error);
			// If there is an error
			const keyword = "revert";
			const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
			const errorMessage = error.toString().substring(startIndex);
			showModal((errorMessage)? "Failed! "+errorMessage:"Adding Failed! Check the Console.");
		});
	}
}

async function addPdt() {
	event.preventDefault(); // Prevent the default form submission behavior
	if (confirm("Are you sure you want to submit this form?")) {
		console.log("Adding Product...");
		const productName = document.getElementById('productName').value;
		const quantity = document.getElementById('quantity').value;
		const dateInput1 = document.getElementById('dateOfMilking').value;
		const prodHash = document.getElementById('prodHash').value;
		const dateOfMilking = Math.floor(new Date(dateInput1).getTime() / 1000);
		// const dateOfMilking = dateInput1.replace(/-/g, '');

		// Call the contract method
		contract.methods.addPdt(productName, quantity, dateOfMilking, prodHash).send({ from: account, gas: 400000})
		.then(function(receipt) {
			console.log('Transaction receipt:', receipt);
			// Making asynchronous calls so that QR obtained is after current product is added
			return contract.methods.getQRCode().call({ from: account });
		})
		.then(function(result){
			// After the transaction is confirmed
			console.log(result);
			showModal("Product Added! Note-<br><br>OR Code: "+result[0]+"<br><br>Sample Number: "+result[1]);
		})
		.catch(function(error) {
			console.error('Transaction error:', error);
			// If there is an error
			const keyword = "revert";
			const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
			const errorMessage = error.toString().substring(startIndex);
			showModal((errorMessage)? "Failed! "+errorMessage:"Adding Failed! Check the Console.");
		});	
	}
}

async function addQAData() {
	event.preventDefault(); // Prevent the default form submission behavior
	if (confirm("Are you sure you want to submit this form? Data cannot be changed.")) {
		console.log("Adding QA data...");
		const beneficiary = document.getElementById('beneficiary').value;
		const sampleID = document.getElementById('sampleID').value;
		const QR = document.getElementById('QR').value;
		const pH = document.getElementById('pH').value;
		const receptionTemp = document.getElementById('receptionTemp').value;
		const SNFPercent = document.getElementById('SNFPercent').value;
		const fatPercent = document.getElementById('fatPercent').value;
		const lactosePercent = document.getElementById('lactosePercent').value;
		const QAPass = document.getElementById('QAPass').checked;

		// Call the contract method
		contract.methods.addQAData(beneficiary, sampleID, QR, pH, receptionTemp, SNFPercent, fatPercent, lactosePercent, QAPass).send({ from: account, gas: 300000})
		.then(function(receipt) {
			console.log('Transaction receipt:', receipt);
			// After the transaction is confirmed
			showModal("QA data Added!");
		})
		.catch(function(error) {
			console.error('Transaction error:', error);
			// If there is an error
			const keyword = "revert";
			const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
			const errorMessage = error.toString().substring(startIndex);
			showModal((errorMessage)? "Failed! "+errorMessage:"Adding Failed! Check the Console.");
		});
	}
}

async function addDairyQAData() {
	event.preventDefault(); // Prevent the default form submission behavior
	if (confirm("Are you sure you want to submit this form? data cannot be CHANGED")) {
		console.log("Adding QA data...");
		const VDCS = document.getElementById('VDCS').value;
		const batchQR = document.getElementById('batchQR').value;
		const milkTemp = document.getElementById('milkTemp').value;
		const Fatpct = document.getElementById('Fatpct').value;
		const SNFpct = document.getElementById('SNFpct').value;
		const batchpH = document.getElementById('batchpH').value;
		const sensoryTestPass = document.getElementById('sensoryTestPass').checked;
		const adulterantTestPass = document.getElementById('adulterantTestPass').checked;
		const chemContamTestPass = document.getElementById('chemContamTestPass').checked;
		const microContamTestPass = document.getElementById('microContamTestPass').checked;
		const preprocessTestPass = document.getElementById('preprocessTestPass').checked;

		// Call the contract method
		contract.methods.addDairyQAData(VDCS, batchQR, milkTemp, Fatpct, SNFpct, batchpH,
			sensoryTestPass, adulterantTestPass, chemContamTestPass, microContamTestPass, preprocessTestPass).send({ from: account, gas: 400000})
		.then(function(receipt) {
			console.log('Transaction receipt:', receipt);
			// After the transaction is confirmed
			showModal("QA data Added!");
		})
		.catch(function(error) {
			console.error('Transaction error:', error);
			// If there is an error
			const keyword = "revert";
			const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
			const errorMessage = error.toString().substring(startIndex);
			showModal((errorMessage)? "Failed! "+errorMessage:"Adding Failed! Check the Console.");
		});
	}
}

async function addProcessData() {
	event.preventDefault(); // Prevent the default form submission behavior
	if (confirm("Are you sure you want to submit this form?")) {
		console.log("Adding Process data...");
		const batchCount = document.getElementById('batchCount').value;
		const inputString = document.getElementById('QRCodes').value;
		const QRCodes = inputString.split(",").map(value => parseInt(value));
		console.log(QRCodes)
		const pcsHash = document.getElementById('pcsHash').value;
		const pcsMethod = document.getElementById('Fatpct').value;
		const BBD = document.getElementById('BBD').value;
		const PdtQualityPass = document.getElementById('PdtQualityPass').checked;

		// Call the contract method
		contract.methods.addProcessData(batchCount, QRCodes, pcsHash, pcsMethod, BBD, PdtQualityPass).send({ from: account, gas: 400000})
		.then(function(receipt) {
			console.log('Transaction receipt:', receipt);
			// After the transaction is confirmed
			showModal("QA data Added!");
		})
		.catch(function(error) {
			console.error('Transaction error:', error);
			// If there is an error
			const keyword = "revert";
			const startIndex = error.toString().indexOf(keyword) + keyword.length + 1;
			const errorMessage = error.toString().substring(startIndex);
			showModal((errorMessage)? "Failed! "+errorMessage:"Adding Failed! Check the Console.");
		});
	}
}

// string funtionName will substitute the name of function to be called in contract
async function fetchData(functionName) {
	// removing event listeners and html created by previuos calls
	$(".list").off("click"); 
	$("li").remove();

	console.log("Fetching list...");
	$(".list").append("<p>Fetching List...<p/>");
	
	// Reading all address in the chain
	// Showing only the latest and Unique addresses added by this admin account
	let address = await contract.methods[functionName](1).call({ from: account });
	let iterator = 1
	const set = new Set();

	while(address != 0x0000000000000000000000000000000000000000){
		// using set to add Unique addresses only
		set.add(address);
		address = await contract.methods[functionName](++iterator).call({ from: account });
	}

	// remove 'Fetching List...' text after list has been fetched
	$("p").remove();
	
	// Add the HTML to the "list" ul tag using jQuery
	for (const element of set) {
		$(".list").append("<li class='listItem'><p>&#8226; "+element+"</p><span class='plus'>&#43;</span></li>");
	}
	set.clear();
	$(".list").on("click", ".plus", function() {
		$(".innerList").remove(); // clearing off previous innerList

		const element = $(this).prev();
		let map = new Map();
		map.set("FarmerList", "FarmerQuery");
		map.set("QALablist", "LabQuery");
		map.set("ProcIndList", "ProcIndQuery");
		query(map.get(functionName), element);

		$(this).hide();
		$(".plus").not(this).show();
	});
	console.log("Done!");
}

async function query(functionName, element) {
	// Fetch details of the element
	const address = element.text().substring(2);
	let details = await contract.methods[functionName](address).call({ from: account });
	// Create HTML for the details, parsing it from raw JSON format
	const jsonString = JSON.stringify(details);
	const data = JSON.parse(jsonString);
	// Adding ul tag to the list for making sub lists
	element.append("<ul class='innerList'></ul>")
	for (const key in data) {
		const value = data[key];
		if (!isNaN(key)) {
			continue;
		}
		const innerListItem = $("<li class='innerListItem'></li>");
		innerListItem.text(`${key}: ${value}`);
		$(".innerList").append(innerListItem);
	}
}

async function FarmerList(){
	fetchData("FarmerList");
}

async function QALablist(){
	fetchData("QALablist");
}

async function ProcIndList(){
	fetchData("ProcIndList");
}

async function pdtTag(){
	// removing event listeners and html created by previuos calls
	$(".list").off("click"); 
	$("li").remove();

	console.log("Fetching list...");
	$(".list").append("<p>Fetching List...<p/>");

	// Finding Total Entries by the farmer
	let count = await contract.methods.pdtCount(account).call({ from: account });
	// remove 'Fetching List...' text after list has been fetched
	$("p").remove();

	for(let i=0; i<count; i++){
		$(".list").append("<li class='listItem'><p>&#8226; Entry Number: "+(i+1)+"</p><span class='plus pdt'>&#43;</span></li>");
		let pdt = await contract.methods.pdtTag(account, i+1).call({ from: account });
		if(!(pdt["QAPass"] && pdt["LabTestStatus"])){
			$(".listItem").eq(i).find("p").append(" ⚠");
		}
	}

	$(".list").on("click", ".plus", async function() {
		$(".innerList").remove(); // clearing off previous innerList
		const element = $(this).prev();
		const text = element.text();
		let i = 0;
		if(text.substring(text.length-1,text.length) == "⚠"){
			i = text.substring(16, text.length-2);
		}else{
			i = text.substring(16);
		}
		
		let pdt = await contract.methods.pdtTag(account, i).call({ from: account });
		// Create HTML for the details, parsing it from raw JSON format
		const jsonString = JSON.stringify(pdt);
		const data = JSON.parse(jsonString);
		// Adding ul tag to the list for making sub lists
		element.append("<ul class='innerList'></ul>")
		for (const key in data) {
			const value = data[key];
			if (!isNaN(key)) {
				continue;
			}
			const innerListItem = $("<li class='innerListItem'></li>");
			innerListItem.text(`${key}: ${value}`);
			$(".innerList").append(innerListItem);
		}
		$(this).hide();
		$(".plus").not(this).show();
	});
	console.log("Done!");
}

// loading query page to display product details 
async function customerQuery(){
	const QRValue = document.getElementById('QRValue').value;
	let checker = await contract.methods.fetchProductBasicDetails(QRValue).call({ from: account });
	console.log(checker)
	if(checker[0][8] == 0x0000000000000000000000000000000000000000){
		showModal("Invalid QR code!")
	}else {
		const url = "customerQuery.html" + "?account=" + account+ "&QRValue=" + QRValue;
		loadPage(url);
	}
}