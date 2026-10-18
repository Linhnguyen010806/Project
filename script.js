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





document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("bestList");

    if (!list) return;

    const items = list.querySelectorAll(".best-item");

    const image = document.getElementById("bestDetailImage");
    const title = document.getElementById("bestDetailTitle");
    const author = document.getElementById("bestDetailAuthor");
    const category = document.getElementById("bestDetailCategory");
    const price = document.getElementById("bestDetailPrice");
    const description = document.getElementById("bestDetailDescription");
    const cartButton = document.getElementById("bestCartBtn");

    function showBook(item) {
        items.forEach(function (book) {
            book.classList.toggle("active", book === item);
        });

        title.textContent = item.dataset.title || "";
        author.textContent = item.dataset.author || "";
        category.textContent = item.dataset.category || "";
        price.textContent = item.dataset.price || "";
        description.textContent = item.dataset.desc || "";

        image.src = item.dataset.image || "";
        image.alt = "Bìa sách " + (item.dataset.title || "");

        cartButton.dataset.title = item.dataset.title || "";
        cartButton.dataset.price = item.dataset.price || "";
    }

    items.forEach(function (item) {
        item.addEventListener("click", function () {
            showBook(item);
        });
    });

    // Mặc định hiển thị sách đầu tiên
    if (items.length > 0) {
        showBook(items[0]);
    }

    // Nút giỏ hàng minh họa
    cartButton.addEventListener("click", function () {
        alert(
            'Bạn đã chọn "' +
            (this.dataset.title || "sách") +
            '". Hãy kết nối nút này với chức năng giỏ hàng hiện có.'
        );
    });
});


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
function goToDetail(bookId) {
    window.location.href = "chitietsp.html?id=" + bookId;
}
// Khi bấm vào sản phẩm, chuyển sang trang chi tiết
function goToDetail(bookId) {
    window.location.href =
        "chitietsp.html?id=" + encodeURIComponent(bookId);
}
// thanh bar cố định khi cuộn trang
const navbar = document.querySelector('.navbar');

if (navbar) {
    const navbarTop = navbar.offsetTop;
    const navbarHeight = navbar.offsetHeight;

    window.addEventListener('scroll', function () {
        if (window.scrollY >= navbarTop) {
            navbar.classList.add('navbar-fixed');
            document.body.style.paddingTop = navbarHeight + 'px';
        } else {
            navbar.classList.remove('navbar-fixed');
            document.body.style.paddingTop = '';
        }
    });
}

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

