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

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (password !== confirmPassword) {

            alert("Mật khẩu xác nhận không trùng khớp!");

            return;
        }


        alert("Đăng ký thành công!");

        window.location.href = "dangnhap.html";

    });
}