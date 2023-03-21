var popup = document.getElementById("popup");
var closeLink = document.getElementById("close-popup-link");

closeLink.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
}