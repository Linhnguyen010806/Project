/* ===== khuyenmai.js — Trang Khuyến mãi Hanami =====
   1. Đồng hồ đếm ngược Ngày : Giờ : Phút : Giây tới hạn chót ghi ở data-deadline của .countdown-wireframe-box
   2. Lưu voucher + Ví voucher (khoá "hanamiVouchers")  -> báo ở chuông thông báo (hanami.voucherSaved)
   3. Danh mục deal hot: lọc theo thể loại, sắp xếp theo giá, nút "Xem thêm" (không chuyển trang)
   4. Thêm vào giỏ hàng (khoá "hanamiCart": [{id, qty}]) -> thongbao.js tự báo ở chuông
   5. Đăng ký nhận voucher thành viên mới -> báo ở chuông thông báo (hanami.voucherRegistered)

   Muốn thêm sách giảm giá: chép 1 khối <div class="san-pham promo-product" data-genre=".." data-price=".." data-order="..">
   trong khuyenmai.html, file này tự nhận diện thể loại, số lượng và phân trang. */
(function () {
    "use strict";

    const $ = (s, r) => (r || document).querySelector(s);
    const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
    const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
    const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const reduceMotion = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    // thongbao.js nạp sau file này nên chỉ gọi khi người dùng bấm (lúc đó window.hanami đã có)
    const notify = (fn, arg) => { if (window.hanami && typeof window.hanami[fn] === "function") window.hanami[fn](arg); };

    // Phòng khi script.js chưa định nghĩa goToDetail (thẻ sản phẩm gọi hàm này khi bấm)
    if (typeof window.goToDetail !== "function") window.goToDetail = (id) => { location.href = "chitietsp.html?id=" + encodeURIComponent(id); };

    /* =====================================================
       1. ĐỒNG HỒ ĐẾM NGƯỢC
       ===================================================== */
    (function countdown() {
        const box = $(".countdown-wireframe-box"), face = $(".timer-display");
        const els = { days: $("#days"), hours: $("#hours"), minutes: $("#minutes"), seconds: $("#seconds") };
        if (!box || !face || !els.days || !els.hours || !els.minutes || !els.seconds) return;

        const FALLBACK = "2026-12-12T23:59:59+07:00";   // 23:59:59 ngày 12/12/2026 (giờ Việt Nam)
        let end = new Date(box.dataset.deadline || FALLBACK).getTime();
        if (isNaN(end)) end = new Date(FALLBACK).getTime();

        const pad = (n) => String(n).padStart(2, "0");
        const units = {};

        // Mỗi ô gồm: nửa trên, nửa dưới và 1 "lá" lật (mặt trước = nửa trên số cũ, mặt sau = nửa dưới số mới)
        Object.keys(els).forEach((k) => {
            const el = els[k];
            el.setAttribute("aria-hidden", "true");   // số đã được đọc qua aria-label của .timer-display
            el.innerHTML =
                '<span class="fl-half fl-top"><i>00</i></span>' +
                '<span class="fl-half fl-bot"><i>00</i></span>' +
                '<span class="fl-leaf">' +
                '<span class="fl-face fl-front"><i>00</i></span>' +
                '<span class="fl-face fl-back"><i>00</i></span>' +
                "</span>";
            units[k] = {
                v: undefined, t: 0,
                leaf: $(".fl-leaf", el),
                top: $(".fl-top i", el), bot: $(".fl-bot i", el),
                front: $(".fl-front i", el), back: $(".fl-back i", el)
            };
        });

        const setAll = (u, v) => { u.top.textContent = u.bot.textContent = u.front.textContent = u.back.textContent = v; };
        function finish(u) { setAll(u, u.v); u.leaf.classList.remove("go"); }

        function set(u, v) {
            if (u.v === v) return;
            const old = u.v;
            u.v = v;
            if (old === undefined || reduceMotion() || document.hidden) { clearTimeout(u.t); setAll(u, v); u.leaf.classList.remove("go"); return; }
            u.top.textContent = v;        // nửa trên số mới nằm sẵn dưới lá đang lật
            u.front.textContent = old;    // lá lật đang mang nửa trên số cũ
            u.back.textContent = v;       // mặt sau của lá là nửa dưới số mới
            u.leaf.classList.remove("go");
            void u.leaf.offsetWidth;      // khởi động lại hiệu ứng
            u.leaf.classList.add("go");
            clearTimeout(u.t);
            u.t = setTimeout(() => finish(u), 640);
        }

        let timer = 0, lastLabel = "";
        function tick() {
            clearTimeout(timer);
            const left = Math.max(0, end - Date.now()), s = Math.floor(left / 1000);
            const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
            set(units.days, pad(d));
            set(units.hours, pad(h));
            set(units.minutes, pad(m));
            set(units.seconds, pad(sec));

            const label = "Còn " + d + " ngày " + h + " giờ " + m + " phút";
            if (label !== lastLabel) { lastLabel = label; face.setAttribute("aria-label", label); }

            if (!left) {
                const sub = $(".countdown-sub", box);
                if (sub) sub.textContent = "Flash sale 12.12 đã kết thúc. Hẹn bạn ở đợt ưu đãi tiếp theo!";
                return;
            }
            timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 15);   // gõ nhịp đúng đầu mỗi giây
        }
        document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
        tick();
    })();

    /* =====================================================
       2. VOUCHER + VÍ VOUCHER
       ===================================================== */
    const VK = "hanamiVouchers";
    const VOUCHERS = {
        HANAMI20K: "Giảm 20K cho đơn từ 150.000đ",
        HANAMIFS: "Freeship tối đa 30K cho đơn từ 200K",
        HANAMI50: "Giảm 50% cho đơn hàng đầu tiên",
        HANAMI100K: "Giảm 100.000đ cho đơn đầu từ 499.000đ"
    };
    const wallet = $("#savedVouchers"), clearBtn = $("#clearVouchers");
    const getSaved = () => { const v = read(VK, []); return Array.isArray(v) ? v.filter((c) => typeof c === "string") : []; };

    function renderWallet() {
        const saved = getSaved();
        if (wallet) {
            wallet.innerHTML = saved.length
                ? '<div class="saved-voucher-list">' + saved.map((c) =>
                    '<button type="button" class="saved-voucher" data-copy="' + esc(c) + '" title="Bấm để sao chép mã">' + esc(c) +
                    "<span>" + esc(VOUCHERS[c] || "Voucher Hanami") + "</span></button>").join("") + "</div>"
                : '<p class="empty-message">Bạn chưa lưu voucher nào.</p>';
        }
        if (clearBtn) clearBtn.hidden = !saved.length;
        $$(".get-voucher").forEach((b) => {
            const on = saved.indexOf(b.dataset.code) !== -1;
            b.disabled = on;
            b.innerHTML = on ? '<i class="fas fa-check"></i> Đã lưu' : "Lưu mã";
        });
    }

    function saveVoucher(code) {
        if (!code) return;
        const saved = getSaved();
        if (saved.indexOf(code) !== -1) return;
        saved.push(code);
        write(VK, saved);
        renderWallet();
        notify("voucherSaved", code);     // chuông thông báo: "Bạn đã lưu voucher ..."
    }

    function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
        return new Promise((ok, no) => {
            const t = document.createElement("textarea");
            t.value = text;
            t.setAttribute("readonly", "");
            t.style.cssText = "position:fixed;top:0;left:0;opacity:0";
            document.body.appendChild(t);
            t.select();
            try { document.execCommand("copy") ? ok() : no(); } catch (e) { no(e); }
            t.remove();
        });
    }
    function flashLabel(el, text) {
        if (el.dataset.busy) return;
        el.dataset.busy = "1";
        const old = el.innerHTML;
        el.textContent = text;
        setTimeout(() => { el.innerHTML = old; delete el.dataset.busy; }, 1400);
    }

    document.addEventListener("click", (e) => {
        const get = e.target.closest(".get-voucher"), copy = e.target.closest(".saved-voucher"), clear = e.target.closest("#clearVouchers");
        if (get && !get.disabled) saveVoucher(get.dataset.code);
        else if (copy) copyText(copy.dataset.copy).then(() => flashLabel(copy, "Đã sao chép " + copy.dataset.copy), () => {});
        else if (clear) { write(VK, []); renderWallet(); }
    });

    /* =====================================================
       3. DANH MỤC DEAL HOT: lọc thể loại + sắp xếp + Xem thêm
       ===================================================== */
    const grid = $("#productGrid");
    if (grid) {
        const PAGE = 6;                                   // mỗi lần hiện thêm 6 cuốn
        const items = $$(".promo-product", grid);
        const sortSel = $("#sortProducts"), more = $("#moreDeals"), empty = $("#emptyMessage"), tabs = $$(".tab-btn");
        let cat = "all", sort = "featured", shown = PAGE;

        items.forEach((el, i) => { el._i = i; });
        const orderOf = (el) => { const n = Number(el.dataset.order); return isNaN(n) ? el._i : n; };
        const priceOf = (el) => Number(el.dataset.price) || 0;

        // Nhận diện thể loại từ chính các thẻ sách và ghi số cuốn lên từng tab
        tabs.forEach((t) => {
            const c = t.dataset.category;
            const n = c === "all" ? items.length : items.filter((el) => el.dataset.genre === c).length;
            if (!$(".tab-count", t)) t.insertAdjacentHTML("beforeend", ' <span class="tab-count">(' + n + ")</span>");
            t.setAttribute("aria-pressed", t.classList.contains("active") ? "true" : "false");
        });

        const cmp = {
            featured: (a, b) => orderOf(a) - orderOf(b),
            low: (a, b) => priceOf(a) - priceOf(b) || orderOf(a) - orderOf(b),
            high: (a, b) => priceOf(b) - priceOf(a) || orderOf(a) - orderOf(b)
        };

        function render(from) {
            const list = items.slice().sort(cmp[sort] || cmp.featured);
            list.forEach((el) => grid.appendChild(el));   // sắp lại thứ tự thật trong DOM
            const match = list.filter((el) => cat === "all" || el.dataset.genre === cat);

            items.forEach((el) => { el.hidden = true; el.classList.remove("reveal"); });
            match.forEach((el, i) => {
                el.hidden = i >= shown;
                if (typeof from === "number" && i >= from && i < shown && !reduceMotion()) {
                    el.style.setProperty("--i", i - from);
                    el.classList.add("reveal");
                    el.addEventListener("animationend", () => el.classList.remove("reveal"), { once: true });
                }
            });

            if (empty) empty.hidden = match.length > 0;
            if (more) {
                const wrap = more.parentElement;
                wrap.hidden = match.length <= PAGE;
                const left = match.length - shown;
                more.textContent = left > 0 ? "Xem thêm " + Math.min(PAGE, left) + " cuốn đang giảm giá" : "Thu gọn";
            }
            return match.length;
        }

        tabs.forEach((t) => t.addEventListener("click", () => {
            cat = t.dataset.category || "all";
            shown = PAGE;
            tabs.forEach((x) => { const on = x === t; x.classList.toggle("active", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
            render();
        }));

        if (sortSel) sortSel.addEventListener("change", () => { sort = sortSel.value; render(); });

        if (more) more.addEventListener("click", () => {
            const total = items.filter((el) => cat === "all" || el.dataset.genre === cat).length;
            if (shown < total) {
                const from = shown;
                shown = Math.min(total, shown + PAGE);
                render(from);
            } else {
                shown = PAGE;
                render();
                const box = $("#sach-khuyen-mai");
                if (box) box.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth", block: "start" });
            }
        });

        /* ---------- 4. Thêm vào giỏ hàng ---------- */
        // Bắt ở pha capture để nút không kích hoạt onclick="goToDetail()" của thẻ sách
        grid.addEventListener("click", (e) => {
            const btn = e.target.closest(".add-cart");
            if (!btn) return;
            e.stopPropagation();
            const id = btn.dataset.cart;
            if (!id) return;
            const cart = read("hanamiCart", []);
            const list = Array.isArray(cart) ? cart : [];
            const it = list.find((c) => c && c.id === id);
            if (it) it.qty = (Number(it.qty ?? it.quantity) || 1) + 1; else list.push({ id: id, qty: 1 });
            write("hanamiCart", list);        // thongbao.js tự nhận ra và báo "Đã thêm vào giỏ hàng"

            if (btn.dataset.busy) return;
            btn.dataset.busy = "1";
            const old = btn.innerHTML;
            btn.classList.add("added");
            btn.innerHTML = 'Đã thêm vào giỏ <i class="fas fa-check"></i>';
            setTimeout(() => { btn.classList.remove("added"); btn.innerHTML = old; delete btn.dataset.busy; }, 1400);
        }, true);

        render();
    }

    /* =====================================================
       5. ĐĂNG KÝ NHẬN VOUCHER THÀNH VIÊN MỚI
       ===================================================== */
    const form = $("#subscriberForm");
    if (form) {
        const F = { name: $("#wvName"), phone: $("#wvPhone"), email: $("#wvEmail"), agree: $("#wvAgree") };
        const done = $("#wvDone"), steps = $$(".wv-steps li");

        function setErr(id, msg) {
            const out = $('.wv-err[data-for="' + id + '"]'), input = document.getElementById(id);
            if (out) out.textContent = msg || "";
            if (input) input.setAttribute("aria-invalid", msg ? "true" : "false");
        }
        const rules = {
            wvName: () => (F.name.value.trim().length >= 2 ? "" : "Vui lòng nhập họ và tên của bạn."),
            wvPhone: () => (/^(0|\+?84)[35789]\d{8}$/.test(F.phone.value.replace(/[\s.\-]/g, "")) ? "" : "Số điện thoại chưa đúng. Ví dụ: 0912345678."),
            wvEmail: () => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(F.email.value.trim()) ? "" : "Email chưa đúng. Ví dụ: ban@email.com."),
            wvAgree: () => (F.agree.checked ? "" : "Bạn cần đồng ý với điều khoản để nhận voucher.")
        };

        form.addEventListener("input", (e) => { if (e.target.id && rules[e.target.id]) setErr(e.target.id, ""); });
        form.addEventListener("change", (e) => { if (e.target.id === "wvAgree") setErr("wvAgree", ""); });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            let firstBad = null;
            Object.keys(rules).forEach((id) => {
                const msg = rules[id]();
                setErr(id, msg);
                if (msg && !firstBad) firstBad = document.getElementById(id);
            });
            if (firstBad) { firstBad.focus(); return; }

            write("hanamiSubscriber", { name: F.name.value.trim(), phone: F.phone.value.trim(), email: F.email.value.trim(), ts: Date.now() });

            const saved = getSaved();
            if (saved.indexOf("HANAMI100K") === -1) { saved.push("HANAMI100K"); write(VK, saved); }
            renderWallet();

            form.hidden = true;
            if (done) done.hidden = false;
            steps.forEach((li, i) => li.classList.toggle("on", i < 2));    // Đăng ký -> Nhận mã
            notify("voucherRegistered", "Mã HANAMI100K đã vào ví voucher của bạn. Dùng cho đơn hàng đầu tiên từ 499.000đ nhé.");
        });

        const copyBtn = $("#wvCopy");
        if (copyBtn) copyBtn.addEventListener("click", () => copyText("HANAMI100K").then(() => flashLabel(copyBtn, "Đã sao chép"), () => {}));
    }

    renderWallet();
})();