// ================= Countdown =================

let time = 60 * 60;

const countdown = document.getElementById("countdown");

function updateTimer() {

    if (!countdown) return;

    let h = Math.floor(time / 3600);
    let m = Math.floor((time % 3600) / 60);
    let s = time % 60;

    countdown.innerHTML =
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0");

    if (time > 0) time--;
}

if (countdown) {
    setInterval(updateTimer, 1000);
    updateTimer();
}

// ================= Danh mục =================

const toggleBtn = document.getElementById("toggleMenu");
const categoryList = document.getElementById("categoryList");

if (toggleBtn && categoryList) {
    toggleBtn.addEventListener("click", () => {
        categoryList.classList.toggle("show");
    });
}

// ================= Slideshow =================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let current = 0;

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

if (nextBtn && prevBtn && slides.length > 0) {
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    setInterval(nextSlide, 3000);
}

// ================= Slider sản phẩm mới =================

const productTrack = document.querySelector(".product-track");
const productPrev = document.getElementById("productPrev");
const productNext = document.getElementById("productNext");

let productIndex = 0;

if (productTrack && productPrev && productNext) {

    productNext.addEventListener("click", () => {

        if (productIndex < 1) productIndex++;

        productTrack.style.transform =
            `translateX(-${productIndex * 100}%)`;

    });

    productPrev.addEventListener("click", () => {

        if (productIndex > 0) productIndex--;

        productTrack.style.transform =
            `translateX(-${productIndex * 100}%)`;

    });

}

// ================= Best Seller =================

const bestItems = document.querySelectorAll(".best-item");

const featureImg = document.getElementById("featureImg");
const featureTitle = document.getElementById("featureTitle");
const featureAuthor = document.getElementById("featureAuthor");
const featurePrice = document.getElementById("featurePrice");
const featureDesc = document.getElementById("featureDesc");

if (
    bestItems.length &&
    featureImg &&
    featureTitle &&
    featureAuthor &&
    featurePrice &&
    featureDesc
) {

    bestItems.forEach(item => {

        item.addEventListener("click", () => {

            bestItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            featureImg.src = item.dataset.img;
            featureImg.alt = item.dataset.title;

            featureTitle.textContent = item.dataset.title;
            featureAuthor.textContent = item.dataset.author;
            featurePrice.textContent = item.dataset.price;
            featureDesc.textContent = item.dataset.desc;
        });

    });

}
// ===== Tabs Sách tham khảo =====

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        tabBtns.forEach(b => b.classList.remove("active"));
        tabContents.forEach(c => c.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");

    });

});