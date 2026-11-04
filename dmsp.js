
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

    document.getElementById("so-luong-sach").textContent = soLuong;
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



// Thử



// document.querySelectorAll(".san-pham").forEach(function(sanPham) {

//     let giaBan = Number(sanPham.dataset.gia);
//     let giamGia = Number(sanPham.dataset.giam);

//     if (!sanPham.hasAttribute("data-gia") ||
//         !Number.isFinite(giaBan) || giaBan < 0 ||
//         !Number.isFinite(giamGia) || giamGia < 0 || giamGia >= 100) {
//         return;
//     }

//     let giaGoc = giaBan / (1 - giamGia / 100);
//     giaGoc = Math.round(giaGoc / 1000) * 1000;

//     let dinhDangGia = function(gia) {
//         return gia.toLocaleString("vi-VN") + "đ";
//     };

//     let giaBanHienThi = sanPham.querySelector(".gia-ban");
//     let giaGocHienThi = sanPham.querySelector(".gia-goc");
//     let nhanGiamGia = sanPham.querySelector(".nhan-giam-gia");

//     if (giaBanHienThi) {
//         giaBanHienThi.textContent = dinhDangGia(giaBan);
//     }

//     if (giamGia > 0) {
//         if (nhanGiamGia) {
//             nhanGiamGia.textContent = "-" + giamGia + "%";
//         }

//         if (giaGocHienThi) {
//             giaGocHienThi.textContent = dinhDangGia(giaGoc);
//         }
//     } else {
//         if (nhanGiamGia) {
//             nhanGiamGia.style.display = "none";
//         }

//         if (giaGocHienThi) {
//             giaGocHienThi.style.display = "none";
//         }
//     }

// });

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