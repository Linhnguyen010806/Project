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
        })
        .catch(error => console.error("Lỗi Header:", error));

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