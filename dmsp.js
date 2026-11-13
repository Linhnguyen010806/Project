
function capNhatSoLuongSach() {
    const danhSach = document.querySelectorAll(
        ".khu-vuc-danh-sach .san-pham"
    );

    let soLuong = 0;

    danhSach.forEach(function(sach) {
        if (sach.getClientRects().length > 0) {
            soLuong++;
        }
    });

    const hienThiSoLuong = document.getElementById("so-luong-sach");

    if (hienThiSoLuong) {
        hienThiSoLuong.textContent = soLuong;
    }
}

let theLoaiDangChon = "all";
let mucGiaDangChon = "all";
let kieuSapXep = "moi-nhat";

// Lưu thứ tự ban đầu của các sản phẩm
const danhSachSanPham = Array.from(
    document.querySelectorAll(".khu-vuc-danh-sach .san-pham")
);


// Hàm lọc và sắp xếp sản phẩm
function locVaSapXepSach() {

    let min = 0;
    let max = Infinity;

    // Xác định khoảng giá
    if (mucGiaDangChon !== "all") {
        let khoangGia = mucGiaDangChon.split("-");

        min = Number(khoangGia[0]);
        max = Number(khoangGia[1]);
    }

    // Lọc theo thể loại và giá bán
    danhSachSanPham.forEach(function(sach) {

        let theLoai = sach.getAttribute("data-the-loai");
        let gia = Number(sach.dataset.gia);

        let dungTheLoai =
            theLoaiDangChon === "all" ||
            theLoai === theLoaiDangChon;

        let dungGia = Number.isFinite(gia) && gia >= min && gia <= max;

        if (dungTheLoai && dungGia) {
            sach.style.display = "";
        } else {
            sach.style.display = "none";
        }
    });


    
    // Sắp xếp sản phẩm
    let danhSachSapXep = [...danhSachSanPham];

    if (kieuSapXep === "gia-tang") {

        danhSachSapXep.sort(function(a, b) {
            return Number(a.dataset.gia) - Number(b.dataset.gia);
        });

    } else if (kieuSapXep === "gia-giam") {

        danhSachSapXep.sort(function(a, b) {
            return Number(b.dataset.gia) - Number(a.dataset.gia);
        });

    } else if (kieuSapXep === "ban-chay") {

        danhSachSapXep.sort(function(a, b) {
            let banChayA = a.querySelector(".ban-chay") ? 1 : 0;
            let banChayB = b.querySelector(".ban-chay") ? 1 : 0;

            return banChayB - banChayA;
        });

    } else if (kieuSapXep === "moi-nhat") {

        danhSachSapXep.sort(function(a, b) {
            let sachMoiA = a.dataset.moi === "true" ? 1 : 0;
            let sachMoiB = b.dataset.moi === "true" ? 1 : 0;

            return sachMoiB - sachMoiA;
        });

    }

    // Đưa sản phẩm về đúng thứ tự trên giao diện
    let noiChua = danhSachSanPham.length > 0
        ? danhSachSanPham[0].parentElement
        : null;

    if (noiChua) {
        danhSachSapXep.forEach(function(sach) {
            noiChua.appendChild(sach);
        });
    }

    // Cập nhật số lượng sách đang hiển thị
    capNhatSoLuongSach();

}


// LỌC THEO THỂ LOẠI
document.querySelectorAll(".loc-the-loai").forEach(function(muc) {

    muc.addEventListener("click", function(event) {

        event.preventDefault();

        theLoaiDangChon = this.getAttribute("data-the-loai") || "all";

        locVaSapXepSach();

    });

});


// LỌC THEO MỨC GIÁ
document.querySelectorAll('input[name="muc-gia"]').forEach(function(radio) {

    radio.addEventListener("change", function() {

        mucGiaDangChon = this.value;

        locVaSapXepSach();

    });

});


// SẮP XẾP SẢN PHẨM
const chonSapXep = document.getElementById("chon-sap-xep");

if (chonSapXep) {

    chonSapXep.addEventListener("change", function() {

        kieuSapXep = this.value;

        locVaSapXepSach();

    });

}


// Đếm số sách khi mở trang
locVaSapXepSach();




// let sanPhamThu = document.querySelector('.san-pham[data-id="dnt"]');

// if (sanPhamThu && books.dnt) {

//     let sach = books.dnt;

//     sanPhamThu.querySelector(".gia-ban").textContent = sach.price;
//     sanPhamThu.querySelector(".gia-goc").textContent = sach.originalPrice;

//     let giaBan = Number(sach.price.replace(/[^\d]/g, ""));
//     let giaGoc = Number(sach.originalPrice.replace(/[^\d]/g, ""));

//     let phanTram = Math.round((1 - giaBan / giaGoc) * 100);

//     sanPhamThu.querySelector(".nhan-giam-gia").textContent =
//         "-" + phanTram + "%";
// }


// function onMouseOver(sanPham) {
//     sanPham.querySelector(".nut-them-nhanh").style.display = "flex";
// }

// function onMouseOut(sanPham) {
//     sanPham.querySelector(".nut-them-nhanh").style.display = "none";
// }


// Tự động điền nhãn giảm giá
// Tự động tính nhãn giảm giá cho tất cả sách
document.querySelectorAll(".san-pham").forEach(function(sanPham) {

    let giaGoc = sanPham.querySelector(".gia-goc");
    let giaBan = sanPham.querySelector(".gia-ban");
    let nhanGiamGia = sanPham.querySelector(".nhan-giam-gia");

    if (giaGoc && giaBan && nhanGiamGia) {

        let giaGocSo = Number(giaGoc.textContent.replace(/[^\d]/g, ""));
        let giaBanSo = Number(giaBan.textContent.replace(/[^\d]/g, ""));

        if (giaGocSo > 0 && giaBanSo < giaGocSo) {

            let phanTram = Math.round(
                (giaGocSo - giaBanSo) / giaGocSo * 100
            );

            nhanGiamGia.textContent = "-" + phanTram + "%";
            nhanGiamGia.style.display = "inline-block";

        } else {
            nhanGiamGia.style.display = "none";
        }
    }
});

//Tìm kiếm sách hoặc tên tác giả

function bodau(chuoi) {
    return chuoi
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d");
}

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