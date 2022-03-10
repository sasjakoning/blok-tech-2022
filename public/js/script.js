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

const card = document.querySelector(".largeCard:nth-of-type(2)")

console.log(card)

const likeForm = document.querySelector(".form-like")

console.log(likeForm);

likeForm.addEventListener("submit", (e) => {
    console.log("submitted")
    // e.preventDefault()

    card.classList.add("cardLike")
    setTimeout(() => {
        fetch(e.target.action, {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        }).then((res) => {
            // likeForm.submit()
            console.log("request complete!")
        })
    }, 1000);
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

