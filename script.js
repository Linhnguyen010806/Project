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

// =====================================
// SLIDER BANNER HANAMI BOOKSTORE
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".slider");
    const slideTrack = document.querySelector(".slides");
    const images = document.querySelectorAll(".slide");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");

    if (!slider || !slideTrack || images.length === 0) return;

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    let autoSlide;

    // Hiển thị banner
    function showSlide(index) {

        currentIndex = (index + images.length) % images.length;

        slideTrack.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        images.forEach((img, i) => {
            img.classList.toggle("active", i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    // Banner tiếp theo
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Banner trước
    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    // Nút chuyển ảnh
    next?.addEventListener("click", function () {
        nextSlide();
        resetAutoSlide();
    });

    prev?.addEventListener("click", function () {
        prevSlide();
        resetAutoSlide();
    });

    // Nhấn dấu chấm
    dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Vuốt trên điện thoại
    slider.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    }, { passive: true });

    slider.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) {
            nextSlide();
            resetAutoSlide();
        } else if (endX - startX > 50) {
            prevSlide();
            resetAutoSlide();
        }
    });

    // Kéo chuột trên máy tính
    slider.addEventListener("mousedown", function (e) {
        startX = e.clientX;
    });

    slider.addEventListener("mouseup", function (e) {
        endX = e.clientX;

        if (startX - endX > 50) {
            nextSlide();
            resetAutoSlide();
        } else if (endX - startX > 50) {
            prevSlide();
            resetAutoSlide();
        }
    });

    // Tự động chuyển banner
    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // Khởi chạy
    showSlide(0);
    startAutoSlide();

});

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


    // ---------- 2. SLIDER SẢN PHẨM VÀ CHUYỂN TAB ----------

document.querySelectorAll(".danh-sach-sach").forEach(section => {

    // Chuyển tab
    const buttons = section.querySelectorAll(".tab-btn");
    const contents = section.querySelectorAll(".tab-content");

    buttons.forEach(button => {
        button.addEventListener("click", function () {

            const tabId = this.dataset.tab;

            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");

            const selectedContent = section.querySelector(`#${tabId}`);

            if (selectedContent) {
                selectedContent.classList.add("active");
            }
        });
    });

    // Nút trượt sản phẩm
    section.querySelectorAll(".tab-content").forEach(tab => {

        const danhSach = tab.querySelector(".danh-sach-san-pham");
        const nutTruoc = tab.querySelector(".nut-san-pham-truoc");
        const nutSau = tab.querySelector(".nut-san-pham-sau");

        if (!danhSach || !nutTruoc || !nutSau) return;

        nutTruoc.addEventListener("click", () => {
            danhSach.scrollBy({
                left: -danhSach.clientWidth,
                behavior: "smooth"
            });
        });

        nutSau.addEventListener("click", () => {
            danhSach.scrollBy({
                left: danhSach.clientWidth,
                behavior: "smooth"
            });
        });

    });

});

// NÚT QUAY LẠI ĐẦU TRANG
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
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
// ================= POPUP KHUYẾN MÃI =================

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("popup-overlay");
    const closeBtn = document.getElementById("close-popup");

    if (!popup || !closeBtn) return;

    // Chỉ hiện một lần trong mỗi phiên truy cập
    if (!sessionStorage.getItem("popupShown")) {

        popup.style.display = "flex";

        sessionStorage.setItem("popupShown", "true");
    }

    // Đóng khi nhấn nút X
    closeBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Đóng khi nhấn ra ngoài popup
    popup.addEventListener("click", function (e) {

        if (e.target === popup) {
            popup.style.display = "none";
        }

    });

    // Đóng bằng phím ESC
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {
            popup.style.display = "none";
        }

    });

});