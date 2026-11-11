document.addEventListener("DOMContentLoaded", function () {

    // Tải Header
    fetch("./header.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Không tìm thấy header.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("header_container").innerHTML = data;

    
            // =========================THAO TÁC TÌM KIẾM
            const oTimKiem = document.getElementById("o-tim-kiem");
            const nutTimKiem = document.getElementById("nut-tim-kiem");
            const lichSu = document.getElementById("lich-su-tim-kiem");
            const danhSach = document.getElementById("danh-sach-lich-su");

            // Lấy lịch sử tìm kiếm
            function layLichSu() {
                return JSON.parse(localStorage.getItem("lichSuTimKiem")) || [];
            }

            // Lưu lịch sử tìm kiếm
            function luuLichSu(tuKhoa) {
                let lichSuCu = layLichSu();

                // Loại bỏ từ khóa đã tồn tại
                lichSuCu = lichSuCu.filter(function(item) {
                    return item.toLowerCase() !== tuKhoa.toLowerCase();
                });

                // Thêm từ khóa mới lên đầu
                lichSuCu.unshift(tuKhoa);

                // Chỉ lưu 5 từ khóa gần nhất
                lichSuCu = lichSuCu.slice(0, 5);

                localStorage.setItem(
                    "lichSuTimKiem",
                    JSON.stringify(lichSuCu)
                );
            }

            // =========================
            // HIỂN THỊ LỊCH SỬ
            // =========================
            function hienThiLichSu() {
                let lichSuCu = layLichSu();

                danhSach.innerHTML = "";

                if (lichSuCu.length === 0) {
                    lichSu.style.display = "none";
                    return;
                }

                lichSu.style.display = "block";

                lichSuCu.forEach(function(tuKhoa, index) {

                    let dong = document.createElement("div");
                    dong.className = "dong-lich-su";

                    let muc = document.createElement("span");
                    muc.textContent = tuKhoa;

                    // Nhấn vào từ khóa để tìm kiếm lại
                    muc.onclick = function() {
                        oTimKiem.value = tuKhoa;
                        timKiemSach();
                    };

                    // Nút xóa từng từ khóa
                    let nutXoa = document.createElement("button");

                    nutXoa.className = "nut-xoa-lich-su";
                    nutXoa.textContent = "×";
                    nutXoa.type = "button";

                    nutXoa.onclick = function(e) {
                        e.stopPropagation();
                        xoaLichSu(index);
                    };

                    dong.appendChild(muc);
                    dong.appendChild(nutXoa);

                    danhSach.appendChild(dong);
                });

                // Nút xóa tất cả lịch sử
                let nutXoaTatCa = document.createElement("button");

                nutXoaTatCa.id = "nut-xoa-tat-ca";
                nutXoaTatCa.type = "button";
                nutXoaTatCa.textContent = "Xóa tất cả lịch sử";

                nutXoaTatCa.onclick = function() {
                    localStorage.removeItem("lichSuTimKiem");

                    danhSach.innerHTML = "";
                    lichSu.style.display = "none";
                };

                danhSach.appendChild(nutXoaTatCa);
            }

            // =========================
            // XÓA TỪ KHÓA
            // =========================
            function xoaLichSu(index) {
                let lichSuCu = layLichSu();

                lichSuCu.splice(index, 1);

                localStorage.setItem(
                    "lichSuTimKiem",
                    JSON.stringify(lichSuCu)
                );

                hienThiLichSu();
            }

            // =========================
            // TÌM KIẾM SÁCH
            // =========================
            function timKiemSach() {
                let tuKhoa = oTimKiem.value.trim();

                if (tuKhoa === "") {
                    alert("Vui lòng nhập tên sách hoặc tên tác giả!");
                    return;
                }

                // Lưu từ khóa trước khi chuyển trang
                luuLichSu(tuKhoa);

                window.location.href =
                    "dmsp.html?search=" + encodeURIComponent(tuKhoa);
            }

            // Nhấn nút tìm kiếm
            nutTimKiem.addEventListener("click", timKiemSach);

            // Nhấn Enter để tìm kiếm
            oTimKiem.addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    timKiemSach();
                }
            });

            // Hiển thị lịch sử khi chọn ô tìm kiếm
            oTimKiem.addEventListener("focus", hienThiLichSu);

            // Ẩn lịch sử khi nhấn ra ngoài
            document.addEventListener("click", function(event) {
                if (!event.target.closest(".search-box")) {
                    lichSu.style.display = "none";
                }
            });

        })
        .catch(error => console.error("Lỗi Header:", error));

        // Lấy từ khóa trên đường dẫn
const thamSo = new URLSearchParams(window.location.search);
const tuKhoa = thamSo.get("search");

if (tuKhoa) {

    const danhSach = document.querySelectorAll(
        ".khu-vuc-danh-sach .san-pham"
    );

    let tuKhoaBoDau = bodau(tuKhoa);
    let soSachTimThay = 0;
    let sachDauTien = null;

    danhSach.forEach(function(sanPham) {

        // Lấy tên sách
        let tenSach = sanPham.querySelector("h3").textContent;

        // Lấy tên tác giả
        let tenTacGia = sanPham.querySelector("h3").nextElementSibling.textContent;

        // Ghép tên sách và tên tác giả
        let thongTinSach = bodau(tenSach + " " + tenTacGia);

        // Kiểm tra từ khóa
        if (thongTinSach.includes(tuKhoaBoDau)) {

            sanPham.style.display = "";

            soSachTimThay++;

            if (sachDauTien === null) {
                sachDauTien = sanPham;
            }

        } else {
            sanPham.style.display = "none";
        }
    });

    // Cập nhật số lượng sách
    capNhatSoLuongSach();

    // Kiểm tra kết quả tìm kiếm
    if (soSachTimThay === 0) {

        alert("Không tìm thấy sách phù hợp với từ khóa: " + tuKhoa);

    } else {

        // Cuộn xuống khu vực danh sách sách
        setTimeout(function() {

            document.querySelector(".khu-vuc-danh-sach").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            // Làm nổi bật quyển sách đầu tiên tìm thấy
            sachDauTien.style.outline = "2px solid #b88954";
            sachDauTien.style.outlineOffset = "5px";

        }, 300);
    }
}

// ========================================
// CHỨC NĂNG THÊM SÁCH VÀO GIỎ HÀNG
// ========================================

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

    


    // Tải Footer
    fetch("./footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Không tìm thấy footer.html");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("footer_container").innerHTML = data;
        })
        .catch(error => console.error("Lỗi Footer:", error));

})});