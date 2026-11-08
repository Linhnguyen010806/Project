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


// ================= FLASH SALE + SLIDER SÁCH =================

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- 1. FLASH SALE ---------- */

    const flashList = document.querySelector("#flashList");
    const FLASH_VISIBLE = 4;   // số sản phẩm hiện cùng lúc
    let flashIndex = 0;

    window.moveFlash = direction => {
        const cards = flashList?.querySelectorAll(".flash-card");
        if (!cards?.length) return;

        const gap = parseFloat(getComputedStyle(flashList).columnGap) || 0;
        const step = cards[0].getBoundingClientRect().width + gap;
        const maxIndex = Math.max(0, cards.length - FLASH_VISIBLE);

        flashIndex = Math.max(0, Math.min(flashIndex + direction, maxIndex));
        flashList.style.transform = `translateX(-${flashIndex * step}px)`;
    };

    window.addEventListener("resize", () => {
        flashIndex = 0;
        if (flashList) flashList.style.transform = "translateX(0)";
    });


    /* ---------- 2. SLIDER SÁCH (thiếu nhi, sản phẩm mới, tham khảo, ngoại ngữ) ---------- */

    document.querySelectorAll(".book-section").forEach(section => {
        const tabs = section.querySelectorAll(".tab-btn");
        const contents = section.querySelectorAll(".tab-content");

        // Track đang hiển thị: trong tab active, hoặc track duy nhất nếu không có tab
        const getTrack = () =>
            section.querySelector(".tab-content.active .product-track") ||
            section.querySelector(".product-track");

        // Mỗi lần bấm cuộn đúng một khung (4 quyển)
        const scrollTrack = direction => {
            const track = getTrack();
            if (!track) return;

            const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
            track.scrollBy({
                left: direction * (track.clientWidth + gap),
                behavior: "smooth"
            });
        };

        section.querySelector(".productPrev")?.addEventListener("click", () => scrollTrack(-1));
        section.querySelector(".productNext")?.addEventListener("click", () => scrollTrack(1));

        // Chuyển tab (nếu section có tab)
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                tabs.forEach(btn => btn.classList.toggle("active", btn === tab));
                contents.forEach(c => c.classList.toggle("active", c.id === tab.dataset.tab));
            });
        });
    });

});

/* NÚT QUAY LẠI ĐẦU TRANG */

document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// Chuyển sản phẩm Flash Sale
function moveFlash(direction) {
    const list = document.getElementById("flashList");

    list.scrollBy({
        left: direction * (list.clientWidth * 0.8),
        behavior: "smooth"
    });
}


// Đồng hồ đếm ngược
let flashTime = 1 * 3600 + 30 * 60;

function updateFlashTimer() {
    let h = Math.floor(flashTime / 3600);
    let m = Math.floor((flashTime % 3600) / 60);
    let s = flashTime % 60;

    document.getElementById("fs-hour").textContent =
        String(h).padStart(2, "0");

    document.getElementById("fs-minute").textContent =
        String(m).padStart(2, "0");

    document.getElementById("fs-second").textContent =
        String(s).padStart(2, "0");

    if (flashTime > 0) {
        flashTime--;
    }
}

updateFlashTimer();
setInterval(updateFlashTimer, 1000);