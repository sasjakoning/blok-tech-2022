console.log("hello")

const navBtn = document.querySelector(".navBtn")
const nav = document.querySelector("#nav")

console.log(navBtn, nav)

navBtn.addEventListener("click", e => {
    nav.classList.toggle("is-open")
})

// like dislike

const likeBtn = document.querySelector(".like")
const dislikeBtn = document.querySelector(".dislike")

const card = document.querySelector(".largeCard:first-of-type")

const likeForm = document.querySelector(".form-like")

likeForm.addEventListener("submit", (e) => {
    console.log("submitted")
    e.preventDefault()
    setTimeout(() => {
        fetch(e.target.action, {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        }).then((res) => {
            console.log("request complete!")
        })
    }, 3000);
})

// likeBtn.addEventListener("click", (e) => {
//     card.classList.add(".cardLike")
//     console.log("yes")
// })


const forms = document.querySelectorAll("form")

// forms.forEach((form) => {
//     form.addEventListener("submit", (e) => {
//         e.preventDefault();

//         fetch(e.target.action, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//         }).then((res) => {
//             console.log("Request complete! response:", res);
//         })
//     })
// })