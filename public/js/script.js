console.log("hello")

const navBtn = document.querySelector(".navBtn")
const nav = document.querySelector("#nav")

console.log(navBtn, nav)

navBtn.addEventListener("click", e => {
    nav.classList.toggle("is-open")
})

// like dislike

const likeBtn = document.querySelector(".like");
const dislikeBtn = document.querySelector(".dislike");

likeBtn.addEventListener("click", () => {
    const topCard = document.querySelector(".largeCard:last-of-type")
    // topCard.remove()
    console.log("liked!")
})

dislikeBtn.addEventListener("click", () => {
    const topCard = document.querySelector(".largeCard:last-of-type")
    // topCard.remove()
    console.log("disliked!")
})