
document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. KHAI BÁO CÁC PHẦN TỬ HTML
    // =====================================

    const danhSachSanPham = document.getElementById("checkoutItems");
    const tamTinhElement = document.getElementById("tamTinh");
    const phiVanChuyenElement = document.getElementById("phiShip");
    const tongThanhToanElement = document.getElementById("tongThanhToan");
    const formThanhToan = document.getElementById("form-thanh-toan");

    const PHI_VAN_CHUYEN = 30000;

    // =====================================
    // 2. LẤY DỮ LIỆU TỪ LOCAL STORAGE
    // =====================================

    function docDuLieu(key) {
        try {
            const duLieu = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(duLieu) ? duLieu : [];
        } catch (error) {
            console.error("Lỗi đọc dữ liệu:", key, error);
            return [];
        }
    }

    // Ưu tiên lấy danh sách sản phẩm thanh toán
    let danhSachThanhToan = docDuLieu("sanPhamThanhToan");

    // Nếu chưa có thì lấy trực tiếp từ giỏ hàng
    if (danhSachThanhToan.length === 0) {
        danhSachThanhToan = docDuLieu("gioHang");
    }

    // =====================================
    // 3. CÁC HÀM LẤY THÔNG TIN SẢN PHẨM
    // =====================================

    function layTen(sach) {
        return sach.ten || sach.tenSach || sach.name || "Sách Hanami";
    }

    function layGia(sach) {
        return Number(sach.gia) || 0;
    }

    function laySoLuong(sach) {
        return Math.max(1, Number(sach.soLuong) || 1);
    }

    function layAnh(sach) {
        return sach.anh || sach.hinhAnh || sach.image || "";
    }

    function dinhDangTien(tien) {
        return tien.toLocaleString("vi-VN") + "đ";
    }

    function escapeHTML(noiDung) {
        return String(noiDung).replace(/[&<>"']/g, function (kyTu) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[kyTu];
        });
    }

    // =====================================
    // 4. LƯU LẠI DANH SÁCH THANH TOÁN
    // =====================================

    function luuDanhSachThanhToan() {
        localStorage.setItem(
            "sanPhamThanhToan",
            JSON.stringify(danhSachThanhToan)
        );
    }

    // =====================================
    // 5. HIỂN THỊ DANH SÁCH SẢN PHẨM
    // =====================================

    function hienThiDonHang() {

        if (!danhSachSanPham) return;

        if (danhSachThanhToan.length === 0) {

            danhSachSanPham.innerHTML = `
                <div class="gio-hang-trong">
                    <p>Giỏ hàng của bạn đang trống!</p>
                    <a href="index.html" class="nut-quay-lai">
                        Quay lại cửa hàng
                    </a>
                </div>
            `;

            tamTinhElement.textContent = "0đ";
            phiVanChuyenElement.textContent = "0đ";
            tongThanhToanElement.textContent = "0đ";

            return;
        }

        let html = "";
        let tongTien = 0;

        danhSachThanhToan.forEach(function (sach, index) {

            const ten = layTen(sach);
            const gia = layGia(sach);
            const soLuong = laySoLuong(sach);
            const anh = layAnh(sach);

            const thanhTien = gia * soLuong;

            tongTien += thanhTien;

            html += `
                <div class="san-pham">

                    <img
                        src="${escapeHTML(anh)}"
                        alt="${escapeHTML(ten)}"
                        onerror="this.style.display='none'"
                    >

                    <div class="thong-tin-sach">

                        <h3>${escapeHTML(ten)}</h3>

                        <p class="gia-sach">
                            ${dinhDangTien(gia)}
                        </p>

                        <div class="so-luong">

                            <button type="button"
                                onclick="thayDoiSoLuong(${index}, -1)">
                                -
                            </button>

                            <span>${soLuong}</span>

                            <button type="button"
                                onclick="thayDoiSoLuong(${index}, 1)">
                                +
                            </button>

                        </div>

                        <button type="button"
                            class="xoa-san-pham"
                            onclick="xoaSanPham(${index})">
                            Xóa sản phẩm
                        </button>

                    </div>

                </div>
            `;
        });

        danhSachSanPham.innerHTML = html;

        const phiShip = tongTien > 0 ? PHI_VAN_CHUYEN : 0;
        const tongThanhToan = tongTien + phiShip;

        tamTinhElement.textContent = dinhDangTien(tongTien);
        phiVanChuyenElement.textContent = dinhDangTien(phiShip);
        tongThanhToanElement.textContent = dinhDangTien(tongThanhToan);
    }

    // =====================================
    // 6. THAY ĐỔI SỐ LƯỢNG SẢN PHẨM
    // =====================================

    window.thayDoiSoLuong = function (index, thayDoi) {

        if (!danhSachThanhToan[index]) return;

        const soLuongMoi =
            laySoLuong(danhSachThanhToan[index]) + thayDoi;

        if (soLuongMoi < 1) return;

        danhSachThanhToan[index].soLuong = soLuongMoi;

        luuDanhSachThanhToan();
        hienThiDonHang();
    };

    // =====================================
    // 7. XÓA SẢN PHẨM KHỎI ĐƠN HÀNG
    // =====================================

    window.xoaSanPham = function (index) {

        if (!danhSachThanhToan[index]) return;

        const xacNhan = confirm("Bạn có chắc muốn xóa sản phẩm này?");

        if (!xacNhan) return;

        danhSachThanhToan.splice(index, 1);

        luuDanhSachThanhToan();
        hienThiDonHang();
    };

    // =====================================
    // 8. XỬ LÝ ĐẶT HÀNG
    // =====================================

    if (formThanhToan) {

        formThanhToan.addEventListener("submit", function (event) {

            event.preventDefault();

            if (danhSachThanhToan.length === 0) {
                alert("Giỏ hàng đang trống!");
                return;
            }

            const hoTen = document.getElementById("ho-ten").value.trim();
            const soDienThoai = document.getElementById("so-dien-thoai").value.trim();
            const email = document.getElementById("email").value.trim();
            const diaChi = document.getElementById("dia-chi").value.trim();
            const ghiChu = document.getElementById("ghi-chu").value.trim();

            const phuongThuc = document.querySelector(
                'input[name="phuong-thuc"]:checked'
            ).value;

            if (!hoTen || !soDienThoai || !diaChi) {
                alert("Vui lòng nhập đầy đủ thông tin nhận hàng!");
                return;
            }

            let tongTien = 0;

            danhSachThanhToan.forEach(function (sach) {
                tongTien += layGia(sach) * laySoLuong(sach);
            });

            const phiShip = tongTien > 0 ? PHI_VAN_CHUYEN : 0;

            const donHang = {
                maDonHang: "HANAMI" + Date.now(),
                ngayDat: new Date().toLocaleString("vi-VN"),

                khachHang: {
                    hoTen: hoTen,
                    soDienThoai: soDienThoai,
                    email: email,
                    diaChi: diaChi,
                    ghiChu: ghiChu
                },

                sanPham: danhSachThanhToan,

                tamTinh: tongTien,
                phiVanChuyen: phiShip,
                tongThanhToan: tongTien + phiShip,

                phuongThucThanhToan: phuongThuc,

                trangThai: "Chờ xác nhận"
            };

            // Lưu đơn hàng gần nhất
            localStorage.setItem(
                "donHangGanNhat",
                JSON.stringify(donHang)
            );

            // Lưu lịch sử đơn hàng
            let lichSuDonHang = docDuLieu("lichSuDonHang");
            lichSuDonHang.push(donHang);

            localStorage.setItem(
                "lichSuDonHang",
                JSON.stringify(lichSuDonHang)
            );

            alert(
                "Đặt hàng thành công!\n" +
                "Mã đơn hàng: " + donHang.maDonHang + "\n" +
                "Tổng thanh toán: " +
                dinhDangTien(donHang.tongThanhToan)
            );

            // Xóa giỏ hàng sau khi đặt hàng thành công
            localStorage.removeItem("gioHang");
            localStorage.removeItem("sanPhamThanhToan");

            // Chuyển về trang chủ
            window.location.href = "index.html";
        });
    }

    // =====================================
    // 9. KHỞI CHẠY TRANG THANH TOÁN
    // =====================================

    hienThiDonHang();

});
