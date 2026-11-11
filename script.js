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

    // ---------- 1. FLASH SALE ----------
    const flashList = document.querySelector("#flashList");
    const FLASH_VISIBLE = 4;
    let flashIndex = 0;

    window.moveFlash = direction => {
        if (!flashList) return;

        const cards = flashList.querySelectorAll(".flash-card");
        if (!cards.length) return;

        const gap = parseFloat(getComputedStyle(flashList).columnGap) || 0;
        const step = cards[0].getBoundingClientRect().width + gap;
        const maxIndex = Math.max(0, cards.length - FLASH_VISIBLE);

        flashIndex = Math.max(
            0,
            Math.min(flashIndex + direction, maxIndex)
        );

        flashList.style.transform =
            `translateX(-${flashIndex * step}px)`;
    };

    window.addEventListener("resize", () => {
        flashIndex = 0;
        if (flashList) {
            flashList.style.transform = "translateX(0)";
        }
    });


    // ---------- 2. SLIDER SẢN PHẨM MỚI ----------
    document.querySelectorAll(".danh-sach-sach").forEach(section => {

        const danhSach = section.querySelector(".danh-sach-san-pham");
        const nutTruoc = section.querySelector(".nut-san-pham-truoc");
        const nutSau = section.querySelector(".nut-san-pham-sau");

        if (!danhSach) return;

        nutTruoc?.addEventListener("click", () => {
            danhSach.scrollBy({
                left: -danhSach.clientWidth,
                behavior: "smooth"
            });
        });

        nutSau?.addEventListener("click", () => {
            danhSach.scrollBy({
                left: danhSach.clientWidth,
                behavior: "smooth"
            });
        });

    });

    //---- CHUYỂN TAB SÁCH THAM KHẢO VÀ GÓC NGOẠI NGỮ ----

document.querySelectorAll(".danh-sach-sach").forEach(section => {

    const buttons = section.querySelectorAll(".tab-btn");
    const contents = section.querySelectorAll(".tab-content");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const tabId = this.dataset.tab;

            // Bỏ active ở các nút
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Ẩn các nội dung
            contents.forEach(content => {
                content.classList.remove("active");
            });

            // Thêm active cho nút được chọn
            this.classList.add("active");

            // Hiện nội dung tương ứng
            const selectedContent = section.querySelector(
                `#${tabId}`
            );

            if (selectedContent) {
                selectedContent.classList.add("active");
            }

        });

    });

});

    // ---------- 3. NÚT QUAY LẠI ĐẦU TRANG ----------
    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {
            backToTop.style.display =
                window.scrollY > 300 ? "flex" : "none";
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

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