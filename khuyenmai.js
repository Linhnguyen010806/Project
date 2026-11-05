document.addEventListener("DOMContentLoaded", function () {
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    const VOUCHER_KEY = "hanamiPromoVouchers";
    const savedVouchers = $("#savedVouchers");
    const searchInput = $("#promoSearch");
    const searchButton = $("#searchButton");
    const productGrid = $("#productGrid");
    const sortSelect = $("#sortProducts");

    /* =========================================================
       1. ĐỒNG HỒ ĐẾM NGƯỢC CHUẨN XÁC THEO THỜI GIAN THỰC
       ========================================================= */
    const hoursEl = $("#hours");
    const minutesEl = $("#minutes");
    const secondsEl = $("#seconds");

    let totalSeconds = (89 * 3600) + (14 * 60) + 37;

    function updateTimer() {
        if (totalSeconds <= 0) {
            totalSeconds = (89 * 3600) + (14 * 60) + 37;
        }

        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        if (hoursEl) hoursEl.textContent = String(hrs).padStart(2, "0");
        if (minutesEl) minutesEl.textContent = String(mins).padStart(2, "0");
        if (secondsEl) secondsEl.textContent = String(secs).padStart(2, "0");

        totalSeconds--;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    /* =========================================================
       2. QUẢN LÝ VOUCHER & LOCALSTORAGE
       ========================================================= */
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
            savedVouchers.innerHTML = '<p class="empty-message">Bạn chưa lưu voucher nào.</p>';
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
                    alert("Đã sao chép mã: " + code);
                } catch (error) {
                    alert("Mã voucher của bạn: " + code);
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
                } catch (error) {}
            }

            button.textContent = "Đã lưu";
            button.disabled = true;
            renderVouchers();
        });
    });

    $("#clearVouchers")?.addEventListener("click", function () {
        try {
            localStorage.removeItem(VOUCHER_KEY);
        } catch (error) {}

        $$("[data-code]").forEach(button => {
            button.disabled = false;
            button.textContent = "Lưu mã";
        });

        renderVouchers();
    });

    /* =========================================================
       3. LỌC VÀ SẮP XẾP SẢN PHẨM TRONG KHUNG LIỀN MẠCH
       ========================================================= */
    const tabButtons = $$(".tab-btn");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            tabButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            const cat = this.dataset.category;
            $$(".promo-product", productGrid).forEach(prod => {
                if (cat === "all" || prod.dataset.cat === cat) {
                    prod.hidden = false;
                } else {
                    prod.hidden = true;
                }
            });
        });
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
    }

    searchButton?.addEventListener("click", filterProducts);
    searchInput?.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            filterProducts();
        }
    });

    function sortProducts() {
        if (!productGrid || !sortSelect) return;

        const products = $$(".promo-product", productGrid);
        const mode = sortSelect.value;
        const priceOf = product => Number(product.dataset.price || 0);

        if (mode === "low") {
            products.sort((a, b) => priceOf(a) - priceOf(b));
        } else if (mode === "high") {
            products.sort((a, b) => priceOf(b) - priceOf(a));
        } else {
            products.sort((a, b) => priceOf(a) - priceOf(b));
        }

        products.forEach(product => productGrid.appendChild(product));
    }

    sortSelect?.addEventListener("change", sortProducts);

    /* =========================================================
       4. NHẬN VOUCHER 100K CHO THÀNH VIÊN MỚI
       ========================================================= */
    const WELCOME_CODE = "HANAMI100K";            // đổi mã tại đây (nhớ đổi cả trong khuyenmai.html)
    const WELCOME_KEY = "hanamiWelcomeVoucher";
    const wvForm = $("#subscriberForm");
    const wvDone = $("#wvDone");

    function wvStep(n) {
        $$(".wv-steps li").forEach((li, i) => li.classList.toggle("on", i < n));
    }

    function wvShowDone() {
        wvForm.hidden = true;
        wvDone.hidden = false;
        wvStep(2);
    }

    // Hiện lỗi dưới ô nhập; trả về true nếu hợp lệ
    function wvCheck(id, message) {
        const el = $('.wv-err[data-for="' + id + '"]');
        if (el) el.textContent = message;
        return !message;
    }

    if (wvForm) {
        // Đã đăng nhập thì điền sẵn tên + email
        try {
            const user = JSON.parse(localStorage.getItem("hanamiCurrentUser"));
            if (user) {
                $("#wvName").value = user.name || "";
                $("#wvEmail").value = user.email || "";
            }
            if (localStorage.getItem(WELCOME_KEY)) wvShowDone();   // đã nhận rồi
        } catch (error) {}

        wvForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = $("#wvName").value.trim();
            const phone = $("#wvPhone").value.replace(/\s/g, "");
            const email = $("#wvEmail").value.trim();

            const valid = [
                wvCheck("wvName", name.length < 2 ? "Bạn cho Hanami biết tên nhé." : ""),
                wvCheck("wvPhone", /^(0|\+84)\d{9}$/.test(phone) ? "" : "Số điện thoại gồm 10 số, bắt đầu bằng 0."),
                wvCheck("wvEmail", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Email chưa đúng định dạng."),
                wvCheck("wvAgree", $("#wvAgree").checked ? "" : "Bạn cần đồng ý điều khoản để nhận voucher.")
            ].every(Boolean);
            if (!valid) return;

            // 1) ghi nhận đã nhận voucher
            try {
                localStorage.setItem(WELCOME_KEY, JSON.stringify({ name, phone, email, code: WELCOME_CODE, date: Date.now() }));
            } catch (error) {}

            // 2) cho mã vào "Ví Voucher Của Bạn"
            const codes = readVouchers();
            if (!codes.includes(WELCOME_CODE)) {
                codes.push(WELCOME_CODE);
                try { localStorage.setItem(VOUCHER_KEY, JSON.stringify(codes)); } catch (error) {}
            }
            renderVouchers();

            // 3) báo trên chuông thông báo
            const note = {
                icon: "fa-ticket",
                title: "Bạn nhận được voucher 100.000đ",
                text: "Mã " + WELCOME_CODE + " cho đơn đầu từ 499.000đ, dùng đến 30/11/2026.",
                href: "khuyenmai.html#voucher-section"
            };
            if (window.hanami) {
                hanami.notify(note);
            } else {
                try {
                    const list = JSON.parse(localStorage.getItem("hanamiNotifications")) || [];
                    list.unshift(Object.assign({ ts: Date.now(), unread: true }, note));
                    localStorage.setItem("hanamiNotifications", JSON.stringify(list));
                } catch (error) {}
            }

            wvShowDone();
        });

        $("#wvCopy")?.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(WELCOME_CODE);
                this.textContent = "Đã sao chép";
            } catch (error) {
                this.textContent = WELCOME_CODE;
            }
            setTimeout(() => { this.textContent = "Sao chép mã"; }, 1800);
        });
    }

    renderVouchers();
});