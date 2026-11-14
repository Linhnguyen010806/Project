
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
