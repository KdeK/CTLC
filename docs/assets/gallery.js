const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

let lastFocusedElement = null;

function openLightbox(link) {
  const image = link.querySelector("img");

  if (!lightbox || !lightboxImage || !image) {
    return;
  }

  lastFocusedElement = document.activeElement;
  lightboxImage.src = link.href;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = image.alt;
  lightbox.hidden = false;
  document.body.classList.add("is-lightbox-open");
  lightboxClose.focus();
}

function closeLightbox() {
  if (!lightbox || lightbox.hidden) {
    return;
  }

  lightbox.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";
  document.body.classList.remove("is-lightbox-open");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

document.querySelectorAll(".photo-grid a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openLightbox(link);
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});
