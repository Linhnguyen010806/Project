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

    // Thao tác tìm kiếm
    const oTimKiem = document.getElementById("o-tim-kiem");
const nutTimKiem = document.getElementById("nut-tim-kiem");
const lichSu = document.getElementById("lich-su-tim-kiem");

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

    localStorage.setItem("lichSuTimKiem", JSON.stringify(lichSuCu));
}

// Hiển thị lịch sử tìm kiếm
function hienThiLichSu() {
    let lichSuCu = layLichSu();

    let danhSach = document.getElementById("danh-sach-lich-su");
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

        muc.onclick = function() {
            oTimKiem.value = tuKhoa;
            timKiemSach();
        };

        let nutXoa = document.createElement("button");
        nutXoa.className = "nut-xoa-lich-su";
        nutXoa.textContent = "×";

        nutXoa.onclick = function() {
            xoaLichSu(index);
        };

        dong.appendChild(muc);
        dong.appendChild(nutXoa);

        danhSach.appendChild(dong);
    });
}  
function xoaLichSu(index) {
    let lichSuCu = layLichSu();

    lichSuCu.splice(index, 1);

    localStorage.setItem(
        "lichSuTimKiem",
        JSON.stringify(lichSuCu)
    );

    hienThiLichSu();
}
// Tìm kiếm sách
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

// Sự kiện tìm kiếm
nutTimKiem.addEventListener("click", timKiemSach);

oTimKiem.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        timKiemSach();
    }
});

// Hiển thị lịch sử khi chọn ô tìm kiếm
oTimKiem.addEventListener("focus", hienThiLichSu);

// Ẩn lịch sử khi bấm ra ngoài
document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-box")) {
        lichSu.style.display = "none";
    }
});
})
    .catch(error => console.error("Lỗi tìm kiếm:", error));
    
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

});