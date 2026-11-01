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




 // ================= SLIDER VÀ TAB SÁCH =================

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".new-products").forEach(section => {

        const tabs = section.querySelectorAll(".tab-btn");
        const contents = section.querySelectorAll(".tab-content");
        const prev = section.querySelector(".productPrev");
        const next = section.querySelector(".productNext");

        // Khởi tạo slider riêng cho từng tab
        const sliderData = [];

        contents.forEach(content => {
            const track = content.querySelector(".product-track");
            if (!track) return;

            const cards = track.querySelectorAll(".product-card");

            sliderData.push({
                content: content,
                track: track,
                cards: cards,
                index: 0
            });
        });

        function updateSlider(slider) {
            if (!slider || slider.cards.length === 0) return;

            const cardWidth = slider.cards[0].getBoundingClientRect().width;

            if (cardWidth === 0) return;

            const maxIndex = Math.max(0, slider.cards.length - 4);

            slider.index = Math.max(0, Math.min(slider.index, maxIndex));

            slider.track.style.transform =
                `translateX(-${slider.index * cardWidth}px)`;
        }

        function getActiveSlider() {
            return sliderData.find(item =>
                item.content.classList.contains("active")
            );
        }

        // Chuyển tab
        tabs.forEach(tab => {
            tab.addEventListener("click", function () {

                tabs.forEach(btn => btn.classList.remove("active"));
                contents.forEach(content => content.classList.remove("active"));

                this.classList.add("active");

                const target = this.dataset.tab;
                const selected = section.querySelector(
                    `.tab-content[id="${target}"]`
                );

                if (selected) {
                    selected.classList.add("active");

                    const slider = sliderData.find(
                        item => item.content === selected
                    );

                    if (slider) {
                        requestAnimationFrame(() => updateSlider(slider));
                    }
                }
            });
        });

        // Nút sang phải
        if (next) {
            next.addEventListener("click", function () {
                const slider = getActiveSlider();
                if (!slider) return;

                const maxIndex = Math.max(0, slider.cards.length - 4);

                slider.index = Math.min(slider.index + 4, maxIndex);

                updateSlider(slider);
            });
        }

        // Nút sang trái
        if (prev) {
            prev.addEventListener("click", function () {
                const slider = getActiveSlider();
                if (!slider) return;

                slider.index = Math.max(slider.index - 4, 0);

                updateSlider(slider);
            });
        }

        // Cập nhật khi thay đổi kích thước màn hình
        window.addEventListener("resize", function () {
            const slider = getActiveSlider();
            if (slider) updateSlider(slider);
        });

    });

});


/* ===== SLIDER SÁCH THIẾU NHI ===== */
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".children-books");
    if (!section) return;

    const track = section.querySelector(".children-track");
    const prev = section.querySelector(".children-prev");
    const next = section.querySelector(".children-next");

    if (!track || !prev || !next) return;

    function getStep() {
        const book = track.querySelector(".book-item");
        if (!book) return 0;

        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        return book.getBoundingClientRect().width + gap;
    }

    prev.addEventListener("click", function () {
        track.scrollBy({
            left: -getStep(),
            behavior: "smooth"
        });
    });

    next.addEventListener("click", function () {
        track.scrollBy({
            left: getStep(),
            behavior: "smooth"
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

