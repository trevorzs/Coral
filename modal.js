let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
 modal.style.display = "none";
 modalUp = false;
}

window.onclick = function(event) {
 if (event.target == modal) {
     modal.style.display = "none";
     modalUp = false;
 }
}
