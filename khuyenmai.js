
document.addEventListener("DOMContentLoaded", function () {
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    const VOUCHER_KEY = "hanamiPromoVouchers";
    const voucherMessage = $("#voucherMessage");
    const savedVouchers = $("#savedVouchers");
    const searchInput = $("#promoSearch");
    const searchButton = $("#searchButton");
    const productGrid = $("#productGrid");
    const sortSelect = $("#sortProducts");

    function readVouchers() {
        try {
            const data = JSON.parse(localStorage.getItem(VOUCHER_KEY) || "[]");
            return Array.isArray(data) ? data : [];
        } catch (error) {
            return [];
        }
    }

    function renderVouchers() {
        if (!savedVouchers) return;

        const codes = readVouchers();
        savedVouchers.innerHTML = "";

        if (codes.length === 0) {
            savedVouchers.innerHTML =
                '<p class="empty-message">Bạn chưa nhận voucher nào.</p>';
            return;
        }

        const list = document.createElement("div");
        list.className = "saved-voucher-list";

        codes.forEach(code => {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "saved-voucher";
            item.textContent = code + " — Sao chép";
            item.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(code);
                    if (voucherMessage) {
                        voucherMessage.textContent = "Đã sao chép mã " + code + ".";
                    }
                } catch (error) {
                    if (voucherMessage) {
                        voucherMessage.textContent = "Mã voucher của bạn: " + code;
                    }
                }
            });
            list.appendChild(item);
        });

        savedVouchers.appendChild(list);
    }

    $$("[data-code]").forEach(button => {
        const code = button.dataset.code;

        if (readVouchers().includes(code)) {
            button.textContent = "Đã lưu";
            button.disabled = true;
        }

        button.addEventListener("click", function () {
            const codes = readVouchers();

            if (!codes.includes(code)) {
                codes.push(code);
                try {
                    localStorage.setItem(VOUCHER_KEY, JSON.stringify(codes));
                } catch (error) {
                    // Trang vẫn hoạt động nếu trình duyệt chặn localStorage.
                }
            }

            button.textContent = "Đã lưu";
            button.disabled = true;

            if (voucherMessage) {
                voucherMessage.textContent = "Đã lưu mã " + code + " trên trình duyệt này.";
            }

            renderVouchers();
        });
    });

    $("#clearVouchers")?.addEventListener("click", function () {
        try {
            localStorage.removeItem(VOUCHER_KEY);
        } catch (error) {}

        $$("[data-code]").forEach(button => {
            button.disabled = false;
            button.textContent = "Nhận mã";
        });

        if (voucherMessage) {
            voucherMessage.textContent = "Đã xóa các voucher đã lưu.";
        }

        renderVouchers();
    });

    function filterProducts() {
        const query = (searchInput?.value || "").trim().toLocaleLowerCase("vi");
        const products = $$(".promo-product", productGrid);
        let visibleCount = 0;

        products.forEach(product => {
            const text = product.textContent.toLocaleLowerCase("vi");
            const matched = !query || text.includes(query);

            product.hidden = !matched;
            if (matched) visibleCount++;
        });

        const emptyMessage = $("#emptyMessage");
        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }

        if (query) {
            $("#sach-khuyen-mai")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    searchButton?.addEventListener("click", filterProducts);

    searchInput?.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            filterProducts();
        }
    });

    searchInput?.addEventListener("input", function () {
        const query = searchInput.value.trim().toLocaleLowerCase("vi");
        let visibleCount = 0;

        $$(".promo-product", productGrid).forEach(product => {
            const matched = !query ||
                product.textContent.toLocaleLowerCase("vi").includes(query);

            product.hidden = !matched;
            if (matched) visibleCount++;
        });

        const emptyMessage = $("#emptyMessage");
        if (emptyMessage) {
            emptyMessage.hidden = visibleCount !== 0;
        }
    });

    function sortProducts() {
        if (!productGrid || !sortSelect) return;

        const products = $$(".promo-product", productGrid);
        const mode = sortSelect.value;

        const priceOf = product =>
            Number(product.dataset.price || 0);

        if (mode === "low") {
            products.sort((a, b) => priceOf(a) - priceOf(b));
        } else if (mode === "high") {
            products.sort((a, b) => priceOf(b) - priceOf(a));
        } else if (mode === "name") {
            products.sort((a, b) =>
                a.querySelector("h3").textContent.trim().localeCompare(
                    b.querySelector("h3").textContent.trim(), "vi"
                )
            );
        } else {
            products.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
            // Thứ tự nổi bật mặc định được xác định bên dưới.
            const featuredOrder = ["99000", "120000", "86000"];
            products.sort((a, b) =>
                featuredOrder.indexOf(a.dataset.price) -
                featuredOrder.indexOf(b.dataset.price)
            );
        }

        products.forEach(product => productGrid.appendChild(product));
    }

    sortSelect?.addEventListener("change", sortProducts);

    // Ảnh bị lỗi sẽ được thay bằng khung trắng dự phòng.
    $$(".product-cover img").forEach(img => {
        img.addEventListener("error", function () {
            this.hidden = true;

            const cover = this.closest(".product-cover");
            if (!cover || cover.querySelector(".image-fallback")) return;

            const fallback = document.createElement("div");
            fallback.className = "image-fallback";
            fallback.innerHTML =
                '<i class="fas fa-book-open"></i><span>Hanami Bookstore</span>';

            cover.appendChild(fallback);
        }, { once: true });
    });

    renderVouchers();
});
