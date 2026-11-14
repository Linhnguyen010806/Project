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

//Thêm sách vào giỏ hàng

(function() {

    // Lấy giỏ hàng đã lưu
    function layGioHang() {
        return JSON.parse(localStorage.getItem("gioHang") || "[]");
    }

    // Lưu giỏ hàng
    function luuGioHang(gioHang) {
        localStorage.setItem("gioHang", JSON.stringify(gioHang));
    }

    // Cập nhật số lượng trên biểu tượng giỏ hàng
    function capNhatGioHang() {
        let gioHang = layGioHang();
        let tong = 0;

        gioHang.forEach(function(sach) {
            tong += Number(sach.soLuong) || 0;
        });

        let hienThi = document.getElementById("so-luong-gio-hang");

        if (hienThi) {
            hienThi.textContent = tong;
        }
    }

    

    // Xử lý bấm nút thêm nhanh
    document.querySelectorAll(".san-pham .nut-them-nhanh").forEach(function(nut) {

        nut.addEventListener("click", function(event) {
            event.preventDefault();
            event.stopPropagation();

            let sanPham = nut.closest(".san-pham");

            if (!sanPham) return;

            let link = sanPham.querySelector('a[href*="id="]');
            let ten = sanPham.querySelector("h3");
            let anh = sanPham.querySelector(".khung-anh img");

            if (!link || !ten || !anh) {
                console.log("Thiếu thông tin sản phẩm");
                return;
            }

            let id = new URL(link.href).searchParams.get("id");
            let gia = Number(sanPham.dataset.gia);

            if (!id || !Number.isFinite(gia)) {
                console.log("Không lấy được mã sách hoặc giá sách");
                return;
            }

            let gioHang = layGioHang();

            let sachCo = gioHang.find(function(sach) {
                return sach.id === id;
            });

            if (sachCo) {
                sachCo.soLuong++;
            } else {
                gioHang.push({
                    id: id,
                    ten: ten.textContent.trim(),
                    gia: gia,
                    anh: anh.getAttribute("src"),
                    soLuong: 1
                });
            }

            luuGioHang(gioHang);
            capNhatGioHang();

            alert("Đã thêm sách vào giỏ hàng!");
        });

    });

    // Cập nhật số lượng khi mở trang
    capNhatGioHang();

    // ================================
// CHỨC NĂNG HIỂN THỊ POPUP GIỎ HÀNG
// ================================

// Mở giỏ hàng
document.addEventListener("click", function(event) {

    // Bấm nút giỏ hàng trên header
    if (event.target.closest("#nut-mo-gio-hang")) {
        event.preventDefault();

        let popup = document.getElementById("popup-gio-hang");

        if (popup) {
            popup.classList.add("hien-thi");
            hienThiDanhSachGioHang();
        }
    }

    // Đóng bằng nút X hoặc bấm ra ngoài
    if (
        event.target.closest("#dong-gio-hang") ||
        event.target.classList.contains("nen-gio-hang")
    ) {
        let popup = document.getElementById("popup-gio-hang");

        if (popup) {
            popup.classList.remove("hien-thi");
        }
    }

});


// Hiển thị danh sách sách trong giỏ hàng
// Hiển thị danh sách sách trong giỏ hàng
function hienThiDanhSachGioHang() {

    let gioHang = layGioHang();

    let danhSach = document.getElementById("danh-sach-gio-hang");
    let tongTien = document.getElementById("tong-tien-gio-hang");

    if (!danhSach || !tongTien) return;

    danhSach.innerHTML = "";

    // Nếu giỏ hàng trống
    if (gioHang.length === 0) {

        danhSach.innerHTML = `
            <div class="gio-hang-trong">
                <p>Giỏ hàng của bạn đang trống!</p>
            </div>
        `;

        tongTien.textContent = "0đ";
        return;
    }

    let tong = 0;

    // Hiển thị từng sản phẩm
    gioHang.forEach(function(sach) {

        let gia = Number(sach.gia) || 0;
        let soLuong = Number(sach.soLuong) || 0;

        tong += gia * soLuong;

        danhSach.innerHTML += `
            <div class="sach-trong-gio">

                <input type="checkbox"
                       class="chon-sach-gio"
                       data-id="${sach.id}"
                       checked>

                <a href="chitietsp.html?id=${encodeURIComponent(sach.id)}"
                    style="color: inherit; text-decoration: none;">

                    <img src="${sach.anh}" alt="${sach.ten}">

                </a>
<div class="thong-tin-sach-gio">

    <h3>
         <a href="chitietsp.html?id=${encodeURIComponent(sach.id)}"
           style="color: inherit; text-decoration: none;">
            ${sach.ten}
        </a>
    </h3>

                    <div class="gia-sach-gio">
                        ${gia.toLocaleString("vi-VN")}đ
                    </div>

                    <div class="so-luong-sach-gio">

                        <button data-hanh-dong="giam"
                                data-id="${sach.id}">-</button>

                        <span>${soLuong}</span>

                        <button data-hanh-dong="tang"
                                data-id="${sach.id}">+</button>

                    </div>

                    <button class="xoa-sach-gio"
                            data-hanh-dong="xoa"
                            data-id="${sach.id}">
                        Xóa
                    </button>

                </div>

            </div>
        `;
    });

tinhTongTienDaChon();
}

// Tính tổng tiền các sách được chọn
function tinhTongTienDaChon() {

    let gioHang = layGioHang();
    let tong = 0;

    gioHang.forEach(function(sach) {

        let checkbox = document.querySelector(
            `.chon-sach-gio[data-id="${sach.id}"]`
        );

        // Chỉ tính sách được tích chọn
        if (checkbox && checkbox.checked) {
            tong += Number(sach.gia) * Number(sach.soLuong);
        }

    });

    document.getElementById("tong-tien-gio-hang").textContent =
        tong.toLocaleString("vi-VN") + "đ";
}

// Cập nhật tổng tiền khi chọn hoặc bỏ chọn sách
document.addEventListener("change", function(event) {

    if (event.target.classList.contains("chon-sach-gio")) {
        tinhTongTienDaChon();
    }

});


// Xử lý tăng, giảm và xóa sách
document.addEventListener("click", function(event) {

    let nut = event.target.closest("[data-hanh-dong]");

    if (!nut) return;

    let hanhDong = nut.dataset.hanhDong;
    let id = nut.dataset.id;

    if (!id) return;

    let gioHang = layGioHang();

    let sach = gioHang.find(function(item) {
        return item.id === id;
    });

    if (!sach) return;

    if (hanhDong === "tang") {
        sach.soLuong++;
    }

    else if (hanhDong === "giam") {
        sach.soLuong--;

        if (sach.soLuong <= 0) {
            gioHang = gioHang.filter(function(item) {
                return item.id !== id;
            });
        }
    }

    else if (hanhDong === "xoa") {
        gioHang = gioHang.filter(function(item) {
            return item.id !== id;
        });
    }

    luuGioHang(gioHang);

    hienThiDanhSachGioHang();
    capNhatGioHang();
});
})();