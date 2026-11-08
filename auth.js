// Đăng nhập
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Đăng nhập thành công!");

        window.location.href = "index.html";

    });
}


// Đăng ký
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    const passwordInput = document.getElementById("registerPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    // Kiểm tra mật khẩu xác nhận
    //Khi mật khẩu và xác nhận mật khẩu không giống nhau, trình duyệt sẽ hiện thông báo lỗi.
    function checkPassword() {

        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity(
                "Mật khẩu xác nhận không trùng khớp!"
            );
        } else {
            confirmPasswordInput.setCustomValidity("");
        }
    }

    // Kiểm tra khi người dùng nhập
    //Khi người dùng sửa lại mật khẩu, thông báo lỗi sẽ tự động được cập nhật.
    passwordInput.addEventListener("input", checkPassword);
    confirmPasswordInput.addEventListener("input", checkPassword);

    // Xử lý đăng ký
    //Chỉ khi các trường hợp lệ và hai mật khẩu trùng nhau, người dùng mới được chuyển sang trang đăng nhập.
    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        checkPassword();

        if (!registerForm.checkValidity()) {
            registerForm.reportValidity();
            return;
        }

        alert("Đăng ký thành công!");

        window.location.href = "dangnhap.html";

    });
}