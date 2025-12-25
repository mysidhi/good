
setTimeout((5) => {
  document.getElementById("popup").style.display = "flex";
}, 5000);

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// fade animation when scrolling
const items = document.querySelectorAll("[data-anim]");

function animate() {
  items.forEach(el=>{
    const rect = el.getBoundingClientRect().top;
    if(rect < window.innerHeight - 80){
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", animate);
animate(); // run once on load
