console.log("hello")

const navBtn = document.querySelector(".navBtn")
const nav = document.querySelector("#nav")

console.log(navBtn, nav)

navBtn.addEventListener("click", e => {
    nav.classList.toggle("is-open")
})