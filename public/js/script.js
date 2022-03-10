console.log("hello")

const navBtn = document.querySelector(".navBtn")
const nav = document.querySelector("#nav")

console.log(navBtn, nav)

navBtn.addEventListener("click", e => {
    nav.classList.toggle("is-open")
})

// like dislike

const forms = document.querySelectorAll("form")

forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        fetch(e.target.action, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }).then((res) => {
            console.log("Request complete! response:", res);
        })
    })
})