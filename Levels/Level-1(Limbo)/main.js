//alerta inicio//
let myaler = document.getElementById("myAlert");
function closeAlert() {
    document.getElementById("myAlert").style.display = "none";
}
// document.getElementById(myAlert).style.display = "block ";

function closeAlert() {
    let alert = document.getElementById("myAlert");
    alert.classList.add("hidden");
  
    let imageContainer = document.getElementById("imageContainer");
    imageContainer.classList.remove("hidden");
  }

  function retryGame(){
    location.reload();
  }