// fix for transitions firing on load
window.addEventListener("load", () => {
  document.querySelector("body").classList.remove("preload");
  console.log("removed preload");
});

/****************/
/* like dislike */
/****************/

// check if on correct page
if (document.URL.includes("like")) {
  const actionOverlay = document.querySelector(".actionOverlay");
  const actionOverlayImg = actionOverlay.querySelector("img");

  const card = document.querySelector(".largeCard:first-of-type");

  const likeForm = document.querySelector(".form-like");

  likeForm.addEventListener("submit", (e) => {
    console.log("submitted");

    e.preventDefault();

    card.classList.add("cardLike");
    actionOverlay.classList.add("actionLiked");
    actionOverlayImg.src = "/images/overlayLike.svg";

    card.addEventListener("animationend", () => {
      likeForm.submit();
    });
  });

  const dislikeForm = document.querySelector(".form-dislike");

  dislikeForm.addEventListener("submit", (e) => {
    console.log("submitted");

    e.preventDefault();

    card.classList.add("cardDislike");
    actionOverlay.classList.add("actionDisliked");
    actionOverlayImg.src = "/images/overlayDislike.svg";

    setTimeout(() => {
      dislikeForm.submit();
    }, 500);
  });

  // match popup
  const continueBtn = document.querySelector(".continue");
  const matchBackground = document.querySelector(".matchBackground");
  const matchPopup = document.querySelector(".matchPopup");

  //check if element exists
  if (matchBackground != null) {
    continueBtn.addEventListener("click", (e) => {
      e.preventDefault();
      matchBackground.remove();
      matchPopup.remove();
    });
  }
}
