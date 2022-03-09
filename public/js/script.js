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

// const formLike = document.querySelector(".form-like")
// const formDislike = document.querySelector(".form-dislike")

// formLike.addEventListener("submit", e => {
//     e.preventDefault()

//     console.log("submit")

//     let form = e.target

//     form.submit()
// })

// likeBtn.addEventListener("click", (event) => {
//     event.preventDefault()
//     const topCard = document.querySelector(".largeCard:last-of-type")
//     console.log("liked!")
// })

// dislikeBtn.addEventListener("click", () => {
//     const topCard = document.querySelector(".largeCard:last-of-type")
//     console.log("disliked!")
// })