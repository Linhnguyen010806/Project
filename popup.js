// ========================================
// POPUP ĐĂNG NHẬP - ĐĂNG KÝ
// ========================================

document.addEventListener("click", function(event) {

    const nutTaiKhoan = event.target.closest(
        '.top-icons a[title="Tài khoản"]'
    );

    if (!nutTaiKhoan) return;

    event.preventDefault();

    if (document.getElementById("auth-popup")) return;

    const popup = document.createElement("div");
    popup.id = "auth-popup";

    popup.innerHTML = `
        <div class="auth-overlay"></div>

        <div class="auth-content">
            <iframe src="dangnhap.html"
                    title="Đăng nhập Hanami Bookstore">
            </iframe>
        </div>
    `;

    const iframe = popup.querySelector("iframe");

    // Ẩn phần giới thiệu màu nâu trong popup
    iframe.onload = function() {
        iframe.contentDocument.body.classList.add("popup-mode");
    };

    document.body.appendChild(popup);

    // Đóng popup khi nhấn ra ngoài
    popup.querySelector(".auth-overlay").addEventListener("click", function() {
        popup.remove();
    });

});


// Nhận tín hiệu đóng popup
window.addEventListener("message", function(event) {

    if (event.data === "closeAuthPopup") {

        const popup = document.getElementById("auth-popup");

        if (popup) {
            popup.remove();
        }
    }

});