
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

// Lọc sách theo thể loại
document.querySelectorAll(".loc-the-loai").forEach(function(muc) {
    muc.addEventListener("click", function(event) {
        event.preventDefault();

        const theLoai = this.getAttribute("data-the-loai");

        const cacTheLoai = document.querySelectorAll(
            ".khu-vuc-danh-sach .san-pham"
        );

        cacTheLoai.forEach(function(khuVuc) {
            if (theLoai === "all" || khuVuc.getAttribute("data-the-loai") === theLoai) {
                khuVuc.style.display = "";
            } else {
                khuVuc.style.display = "none";
            }
        });

        capNhatSoLuongSach();
    });
});

// Đếm số sách khi mở trang
capNhatSoLuongSach();


//Lọc sp theo giá
document.querySelectorAll('input[name=muc-gia]').forEach(function(radio){
    radio.addEventListener("change",function(){
        let mgia=this.value;

        let min=0;
        let max=Infinity;

        if(mgia != "all"){
            let gia=mgia.split("-");

            min=Number(gia[0]);
            max=Number(gia[1]);
        }

        let danhsach=document.querySelectorAll(".san-pham");

        danhsach.forEach(function(sanpham){
            let gias=Number(sanpham.dataset.gia);

            if(gias>=min && gias<=max){
                sanpham.style.display="";

            }else
                sanpham.style.display="none";
        });

        capNhatSoLuongSach();
    });
});


let sanPhamThu = document.querySelector('.san-pham[data-id="dnt"]');

if (sanPhamThu && books.dnt) {

    let sach = books.dnt;

    sanPhamThu.querySelector(".gia-ban").textContent = sach.price;
    sanPhamThu.querySelector(".gia-goc").textContent = sach.originalPrice;

    let giaBan = Number(sach.price.replace(/[^\d]/g, ""));
    let giaGoc = Number(sach.originalPrice.replace(/[^\d]/g, ""));

    let phanTram = Math.round((1 - giaBan / giaGoc) * 100);

    sanPhamThu.querySelector(".nhan-giam-gia").textContent =
        "-" + phanTram + "%";
}


function onMouseOver(sanPham) {
    sanPham.querySelector(".nut-them-nhanh").style.display = "flex";
}

function onMouseOut(sanPham) {
    sanPham.querySelector(".nut-them-nhanh").style.display = "none";
}


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

})();