// getting QR code entered by customer 
const QRValue = params.get("QRValue");

// loading ths when page is opened so that summary can be updated
window.onload = async function() {
    const details1 = await contract.methods.fetchProductBasicDetails(QRValue).call({ from: account });
    const details2 = await contract.methods.fetchProductTechDetails(QRValue).call({ from: account });
    // checking farmer kyc status
    if(!details1[1][4]){
        $("#ic1").attr("src","assets/img/cross.png");
    }
    // checking Quality Analysis Lab Data
    if(!details2[0][5]){
        $("#ic2").attr("src","assets/img/cross.png");
    }
    // checking  Pre-Processing QA test Data
    if(!(details2[1][5] && details2[1][6] && details2[1][7] && details2[1][8] && details2[1][9] && details2[1][10])){
        $("#ic3").attr("src","assets/img/cross.png");
    }
    // checking Processing Data
    if(!(details2[2][4] && details2[2][5])){
        $("#ic4").attr("src","assets/img/cross.png");
    }
    console.log(details2[1])
};

// event listener that executes when '+' is clicked
$(".queryList").on("click", ".plus", async function() {
    $(".innerQueryList").remove(); // clearing off previous innerQueryList
    const element = $(this).prev();
    const i =element.text().substring(0,1);
    
    element.closest('#queryBox').append("<ul class='innerQueryList scroll-container'><p>Fetching Details...</p></ul>")
    showDetails(i)
    $(this).hide();
    $(".plus").not(this).show();
});

async function showDetails(i){
    // removing the div element to make space for showing details
    $("#summary").remove(); 
    let n = 1;
    let details; 
    if(i<5){
        details = await contract.methods.fetchProductBasicDetails(QRValue).call({ from: account });
    } else{
        details = await contract.methods.fetchProductTechDetails(QRValue).call({ from: account });
        n = 5
    }
    // After details fetched, we are clearing off "Fetching Details.."
    $(".innerQueryList").children().remove();
    console.log(details)
    for (const key in details[i-n]) {
        const value = details[i-n][key];
        if (!isNaN(key)) {
            continue;
        }
        const innerListItem = $("<li class='listItem'></li>");
        innerListItem.text(`• ${key}: ${value}`);
        $(".innerQueryList").append(innerListItem);
    }
}

// getting product summary which is automatically loaded when page is refreshed
function showSummary(){
    location.reload();
}

function newQR(){
    const url = "customer.html" + "?account=" + account;
    loadPage(url);
}