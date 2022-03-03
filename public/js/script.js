console.log("hello")

const navBtn = document.querySelector(".navBtn")
const nav = document.querySelector("#nav")

console.log(navBtn, nav)

navBtn.addEventListener("click", e => {
    nav.classList.toggle("is-open")
})


// click n drag

const largeCard = document.querySelector(".largeCard")

console.log(largeCard)

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

largeCard.addEventListener("click", function(e){
    console.log(e.target)
})

largeCard.addEventListener("touchstart", dragStart, false)
largeCard.addEventListener("touchend", dragEnd, false)
largeCard.addEventListener("touchmove", drag, false);

largeCard.addEventListener("mousedown", dragStart, false);
largeCard.addEventListener("mouseup", dragEnd, false);
largeCard.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart"){
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    }else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === largeCard) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset - currentY;

        setTranslate(currentX, currentY, largeCard)
    }

}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d("+ xPos + "px, " + yPos + "px, 0)"; 
}