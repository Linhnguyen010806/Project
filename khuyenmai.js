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
       1. ĐỒNG HỒ ĐẾM NGƯỢC: NGÀY : GIỜ : PHÚT : GIÂY
       ========================================================= */
    const DEADLINE = new Date(2026, 10, 30, 23, 59, 59);   // 30/11/2026 23:59:59 (tháng tính từ 0)
    const timeEls = { days: $("#days"), hours: $("#hours"), minutes: $("#minutes"), seconds: $("#seconds") };

    function setTime(el, value) {
        if (!el || el.textContent === value) return;
        el.textContent = value;
        el.classList.remove("tick");
        void el.offsetWidth;                   // chạy lại hiệu ứng lật số
        el.classList.add("tick");
    }

    function updateTimer() {
        const left = Math.max(0, Math.floor((DEADLINE - Date.now()) / 1000));
        const pad = n => String(n).padStart(2, "0");
        setTime(timeEls.days, pad(Math.floor(left / 86400)));
        setTime(timeEls.hours, pad(Math.floor((left % 86400) / 3600)));
        setTime(timeEls.minutes, pad(Math.floor((left % 3600) / 60)));
        setTime(timeEls.seconds, pad(left % 60));
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
                window.hanami && hanami.voucherSaved(code);   // báo lên chuông: "Đã lưu voucher"
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
       3. LỌC THEO THỂ LOẠI, SẮP XẾP VÀ "XEM THÊM"
       ========================================================= */
    const PAGE_SIZE = 6;                       // số sách hiện ban đầu và mỗi lần bấm "Xem thêm"
    const moreBtn = $("#moreDeals");
    const emptyMessage = $("#emptyMessage");
    const allCards = $$(".promo-product", productGrid);   // giữ thứ tự gốc (data-order)
    let currentGenre = "all", shown = PAGE_SIZE, query = "";

    function renderProducts() {
        const mode = sortSelect ? sortSelect.value : "featured";
        const priceOf = p => Number(p.dataset.price || 0);
        const orderOf = p => Number(p.dataset.order || 0);

        const list = allCards.filter(p =>
            (currentGenre === "all" || p.dataset.genre === currentGenre) &&
            (!query || p.textContent.toLocaleLowerCase("vi").includes(query))
        );

        if (mode === "low") list.sort((a, b) => priceOf(a) - priceOf(b));
        else if (mode === "high") list.sort((a, b) => priceOf(b) - priceOf(a));
        else list.sort((a, b) => orderOf(a) - orderOf(b));

        allCards.forEach(p => { p.hidden = true; });
        list.slice(0, shown).forEach(p => {
            p.hidden = false;
            productGrid.appendChild(p);
        });

        if (emptyMessage) emptyMessage.hidden = list.length !== 0;
        if (moreBtn) moreBtn.hidden = shown >= list.length;
    }

    $$(".tab-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            $$(".tab-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            currentGenre = this.dataset.category;
            shown = PAGE_SIZE;
            renderProducts();
        });
    });

    moreBtn?.addEventListener("click", function () {
        shown += PAGE_SIZE;                    // chỉ hiện thêm sách giảm giá, không chuyển trang
        renderProducts();
    });

    sortSelect?.addEventListener("change", renderProducts);

    function filterProducts() {
        query = (searchInput?.value || "").trim().toLocaleLowerCase("vi");
        shown = PAGE_SIZE;
        renderProducts();
    }
    searchButton?.addEventListener("click", filterProducts);
    searchInput?.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); filterProducts(); }
    });

    renderProducts();

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

/* =========================================================
       5. THÊM VÀO GIỎ HÀNG
       Lưu vào khoá "hanamiCart": [{ id, qty }] (cùng định dạng với trang Yêu thích).
       thongbao.js tự nhận ra và báo "Đã thêm vào giỏ hàng" trên chuông.
       ========================================================= */
    const CART_KEY = "hanamiCart";
    const toastEl = document.createElement("div");
    toastEl.className = "yt-toast";            // kiểu thông báo nhỏ có sẵn trong yeuthich.css
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    document.body.appendChild(toastEl);
    let toastTimer;

    function showToast(message) {
        toastEl.textContent = message;
        toastEl.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
    }

    function addToCart(id) {
        let cart = [];
        try {
            cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
            if (!Array.isArray(cart)) cart = [];
        } catch (error) {
            cart = [];
        }

        const item = cart.find(c => c && c.id === id);
        if (item) {
            const key = ("quantity" in item && !("qty" in item)) ? "quantity" : "qty";
            item[key] = (Number(item[key]) || 1) + 1;
        } else {
            cart.push({ id: id, qty: 1 });
        }

        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (error) {}
        window.hanami && hanami.refresh();
    }

    $$(".add-cart").forEach(btn => {
        const original = btn.innerHTML;
        btn.addEventListener("click", function (e) {
            e.stopPropagation();               // không mở trang chi tiết khi bấm nút
            e.preventDefault();

            addToCart(this.dataset.cart);

            const card = this.closest(".promo-product");
            const name = card ? card.querySelector("h4").textContent.trim() : "sách";
            showToast("Đã thêm “" + name + "” vào giỏ hàng");

            this.innerHTML = '<i class="fas fa-check"></i> Đã thêm';
            this.classList.add("added");
            setTimeout(() => {
                this.innerHTML = original;
                this.classList.remove("added");
            }, 1400);
        });
    });

        renderVouchers();
});