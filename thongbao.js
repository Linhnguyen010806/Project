/* ===== thongbao.js ===== */
(function () {
    const NK = "hanamiNotifications", FK = "hanamiFavorites", UK = "hanamiCurrentUser", MIN = 60000;
    const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
    const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
 
    const WELCOME = { icon: "fa-gift", title: "Chào mừng đến Hanami", text: "Đăng ký ở trang Khuyến mãi để nhận voucher 100.000đ cho đơn đầu tiên.", href: "khuyenmai.html#nhan-voucher" };
    if (read(NK, null) === null) write(NK, [Object.assign({ ts: Date.now(), unread: true }, WELCOME)]);
 
    function ago(ts) {
        const m = Math.round((Date.now() - ts) / MIN);
        if (m < 1) return "Vừa xong";
        if (m < 60) return m + " phút trước";
        if (m < 1440) return Math.round(m / 60) + " giờ trước";
        return new Date(ts).toLocaleDateString("vi-VN");
    }
 
    const panel = document.createElement("div");
    panel.className = "hn-panel";
    panel.hidden = true;
    document.body.appendChild(panel);
 
    function draw() {
        const list = read(NK, []);
        panel.innerHTML = '<div class="hn-head"><b>Thông báo</b><button type="button" data-hn="read">Đánh dấu đã đọc</button></div>' +
            (list.length
                ? list.map((n, i) => `<a class="hn-item ${n.unread ? "new" : ""}" href="${n.href || "#"}" data-i="${i}"><i class="fa-solid ${n.icon || "fa-bell"}"></i><div><b>${n.title}</b><p>${n.text}</p><small>${ago(n.ts)}</small></div></a>`).join("")
                : '<p class="hn-empty">Chưa có thông báo nào.</p>') +
            '<a class="hn-foot" href="khuyenmai.html">Xem tất cả khuyến mãi</a>';
    }
 
    function badge(a, n, cls) {
        if (!a) return;
        let b = a.querySelector(".hn-badge");
        if (!n) { if (b) b.remove(); return; }
        if (!b) { b = document.createElement("span"); b.className = "hn-badge " + cls; a.appendChild(b); }
        b.textContent = n > 9 ? "9+" : n;
    }
 
    function refresh() {
        badge(document.querySelector(".notification-icon"), read(NK, []).filter((n) => n.unread).length, "");
        const fav = document.querySelector(".favorite-icon");
        if (fav) { 
            fav.setAttribute("href", "yeuthich.html"); // Tự động liên kết icon trái tim sang trang yêu thích
            badge(fav, read(FK, []).length, "soft"); 
        }
        const acc = document.querySelector('.top-icons a[href="dangnhap.html"], .top-icons a[data-logout]'), user = read(UK, null);
        if (acc && user && user.name) {
            acc.lastChild.textContent = " Chào, " + user.name.trim().split(/\s+/).pop();
            acc.setAttribute("href", "#");
            acc.dataset.logout = "1";
        }
    }
 
    window.hanami = {
        refresh,
        notify(item) {
            const list = read(NK, []);
            list.unshift(Object.assign({ icon: "fa-bell", ts: Date.now(), unread: true }, item));
            write(NK, list);
            refresh();
        }
    };
 
    document.addEventListener("click", (e) => {
        const bell = e.target.closest(".notification-icon"), out = e.target.closest("[data-logout]"), item = e.target.closest(".hn-item");
        if (bell) {
            e.preventDefault();
            if (!panel.hidden) { panel.hidden = true; return; }
            draw();
            const r = bell.getBoundingClientRect();
            panel.style.top = r.bottom + 8 + "px";
            panel.style.right = Math.max(12, window.innerWidth - r.right - 20) + "px";
            panel.hidden = false;
        } else if (out) {
            e.preventDefault();
            if (confirm("Đăng xuất khỏi tài khoản này?")) { try { localStorage.removeItem(UK); } catch (err) {} location.reload(); }
        } else if (item) {
            const list = read(NK, []);
            if (list[item.dataset.i]) { list[item.dataset.i].unread = false; write(NK, list); refresh(); }
            if (item.getAttribute("href") === "#") e.preventDefault();
        } else if (e.target.closest("[data-hn=read]")) {
            write(NK, read(NK, []).map((n) => Object.assign(n, { unread: false })));
            draw(); refresh();
        } else if (!e.target.closest(".hn-panel")) panel.hidden = true;
    });
 
    const wait = setInterval(() => { if (document.querySelector(".notification-icon")) { clearInterval(wait); refresh(); } }, 150);
    setTimeout(() => clearInterval(wait), 8000);
})();