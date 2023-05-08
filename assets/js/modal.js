// Get the modal
var modal = document.getElementById("myModal");

// Get the close button
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Show the modal with a custom message
function showModal(message) {
    let modalButton = modal.querySelector("button");
    modalButton.innerHTML = "Close";
    // input is hidden in case showModal2 has revealed it before calling this function.
    let modalInput = modal.querySelector("input");
    modalInput.style.display = "None";
    let modalContent = modal.querySelector("h2");
    modalContent.innerHTML = message;
    modal.style.display = "flex";
}

// Show the modal with a message and input field
function showModal2(message) {
    let modalContent = modal.querySelector("h2");
    modalContent.innerHTML = message;
    let modalButton = modal.querySelector("button");
    modalButton.innerHTML = "Enter";
    let modalInput = modal.querySelector("input");
    modalInput.style.display = "inline-block";
    modal.style.display = "flex";
}

// Close the modal when the user clicks the close button
closeBtn.onclick = function() {
  modal.style.display = "none";
}