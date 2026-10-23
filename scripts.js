const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleItems = [...galleryItems];
let currentIndex = 0;

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        galleryItems.forEach((item) => {
            const showItem =
                category === "all" || item.dataset.category === category;

            item.style.display = showItem ? "" : "none";
        });

        visibleItems = galleryItems.filter(
            (item) => item.style.display !== "none"
        );
    });
});

function openLightbox(index) {
    if (visibleItems.length === 0) return;

    currentIndex = index;
    const item = visibleItems[currentIndex];
    const image = item.querySelector("img");
    const caption = item.querySelector("h3");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption
        ? caption.textContent
        : image.alt;

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "";
}

function showNext() {
    if (visibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
}

function showPrevious() {
    if (visibleItems.length === 0) return;
    currentIndex =
        (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
}

galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        const index = visibleItems.indexOf(item);
        if (index !== -1) openLightbox(index);
    });
});

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrevious);

lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
    if (lightbox.style.display !== "flex") return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrevious();
});