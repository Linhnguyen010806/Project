/* ===== thongbao.js =====
   Trung tâm thông báo của Hanami (chuông trên header).

   Tự động thông báo (không cần sửa các trang khác):
     - Thêm sách vào yêu thích  -> theo dõi khoá "hanamiFavorites"
     - Thêm sách vào giỏ hàng   -> theo dõi khoá "hanamiCart"

   Gọi tay từ trang Khuyến mãi (khuyenmai.js):
     hanami.voucherSaved("Tên voucher");   // khi bấm Lưu voucher
     hanami.voucherRegistered();           // khi đăng ký nhận voucher thành công

   Thông báo tuỳ ý:
     hanami.notify({ type: "cart", title: "...", text: "...", href: "..." });
     type: "voucher" | "register" | "favorite" | "cart" | (bỏ trống = thông báo hệ thống)
*/
(function () {
    if (window.hanami && window.hanami.ready) return; // tránh nạp file 2 lần

    const NK = "hanamiNotifications", FK = "hanamiFavorites", CK = "hanamiCart", UK = "hanamiCurrentUser";
    const MIN = 60000, PREVIEW = 5, KEEP = 50; // PREVIEW: số thông báo hiện khi chưa mở rộng; KEEP: số thông báo lưu tối đa

    const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
    const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

    // Các loại thông báo tương ứng với hành động của người dùng
    const TYPES = {
        voucher:  { label: "Lưu voucher",     icon: "fa-ticket" },
        register: { label: "Đăng ký voucher", icon: "fa-user-plus" },
        favorite: { label: "Yêu thích",       icon: "fa-heart" },
        cart:     { label: "Giỏ hàng",        icon: "fa-cart-shopping" },
        system:   { label: "Khác",            icon: "fa-bell" }
    };
    const typeOf = (n) => (TYPES[n.type] ? n.type : "system");

    // Tên sách theo id (cùng id với yeuthich.js / chitiet.js) để thông báo ghi rõ tên cuốn sách
    const NAMES = {
        dnt: "Đắc Nhân Tâm", ttbt: "Thiên tài bên trái, kẻ điên bên phải", tlhtc: "Tâm lý học thành công", tdnvc: "Tư duy nhanh và chậm",
        tdn: "Tư duy ngược", dbg: "Dám bị ghét", ove: "Người đàn ông mang tên Ove", cam: "Cây cam ngọt của tôi", ngk: "Nhà giả kim",
        sd: "Số đỏ", td: "Tắt đèn", bsv: "Bông sen vàng", ehln: "Em học lễ nghĩa", ttgt: "Tự tin giao tiếp",
        cd1: "Tư duy cho bé - Câu đố", cd2: "Tư duy cho bé - Đồng dao", cd3: "Tư duy cho bé - Thơ", cd4: "Tư duy cho bé - Truyện",
        ttdd: "Tuổi thơ dữ dội", dm: "Dế mèn phiêu lưu ký", mhbtl: "Mẹ hỏi bé trả lời", "48nt": "48 nguyên tắc chủ chốt của quyền lực",
        ngcntb: "Người giàu có nhất thành Babylon", ttdvd: "Từ tốt đến vĩ đại", tdqld: "Peter Drucker - Tư duy đúng quản lý đúng",
        nttdcl: "Nghệ thuật tư duy chiến lược", lskthll: "Lược sử kinh tế học lầy lội",
        hsk1: "Giáo trình chuẩn HSK 1", hsk2: "Giáo trình chuẩn HSK 2", hsk3: "Giáo trình chuẩn HSK 3", hsk4: "Giáo trình chuẩn HSK 4",
        b1: "Tiếng Nhật sơ cấp cho người mới bắt đầu", b11: "Grammar And Vocabulary With Answer Key (Tái Bản 2025)",
        vhth: "Vui học tin học 2", al: "Sách Atlat Địa lý", tcthqt: "Tăng cường tin học quốc tế - IC3 GS6",
        mhtn: "60 đề minh họa Tốt nghiệp THPT 2026", mhtn2: "100 đề minh họa Tốt nghiệp THPT 2026", dptd: "Đột phá tư duy kỳ thi Tốt nghiệp THPT"
    };

    // Thông báo mặc định chào mừng thành viên mới
    const WELCOME = { type: "system", icon: "fa-gift", title: "Chào mừng đến Hanami", text: "Đăng ký ở trang Khuyến mãi để nhận voucher 100.000đ cho đơn đầu tiên.", href: "khuyenmai.html#nhan-voucher" };
    if (read(NK, null) === null) write(NK, [Object.assign({ ts: Date.now(), unread: true }, WELCOME)]);

    function ago(ts) {
        const m = Math.round((Date.now() - ts) / MIN);
        if (m < 1) return "Vừa xong";
        if (m < 60) return m + " phút trước";
        if (m < 1440) return Math.round(m / 60) + " giờ trước";
        return new Date(ts).toLocaleDateString("vi-VN");
    }

    /* ---------- Giao diện panel ---------- */
    const panel = document.createElement("div");
    panel.className = "hn-panel";
    panel.hidden = true;
    document.body.appendChild(panel);

    let expanded = false, filter = "all"; // expanded: đang xem tất cả; filter: lọc theo loại hành động

    function itemHTML(row) {
        const n = row.n, t = typeOf(n);
        const tag = t === "system" ? "" : esc(TYPES[t].label) + " · ";
        return `<a class="hn-item t-${t}${n.unread ? " new" : ""}" href="${esc(n.href || "#")}" data-i="${row.i}"><i class="fa-solid ${esc(n.icon || TYPES[t].icon)}"></i><div><b>${esc(n.title)}</b><p>${esc(n.text)}</p><small>${tag}${ago(n.ts)}</small></div></a>`;
    }

    function draw() {
        const all = read(NK, []), counts = {};
        all.forEach((n) => { const t = typeOf(n); counts[t] = (counts[t] || 0) + 1; });
        if (filter !== "all" && !counts[filter]) filter = "all";

        // data-i luôn là vị trí thật trong danh sách gốc, kể cả khi đang lọc
        let rows = all.map((n, i) => ({ n, i }));
        if (!expanded) rows = rows.slice(0, PREVIEW);
        else if (filter !== "all") rows = rows.filter((r) => typeOf(r.n) === filter);

        // Khi mở rộng: hiện số lượng thông báo theo từng hành động
        let tabs = "";
        if (expanded && all.length) {
            const tabList = [["all", "Tất cả", all.length]].concat(Object.keys(TYPES).filter((t) => counts[t]).map((t) => [t, TYPES[t].label, counts[t]]));
            tabs = '<div class="hn-tabs">' + tabList.map((t) => `<button type="button" class="${t[0] === filter ? "on" : ""}" data-hn-tab="${t[0]}">${t[1]} <b>${t[2]}</b></button>`).join("") + "</div>";
        }

        const old = panel.querySelector(".hn-body"), top = old ? old.scrollTop : 0;
        panel.innerHTML = '<div class="hn-head"><b>Thông báo</b><button type="button" data-hn="read">Đánh dấu tất cả đã đọc</button></div>' + tabs +
            '<div class="hn-body">' + (rows.length ? rows.map(itemHTML).join("") : '<p class="hn-empty">Chưa có thông báo nào.</p>') + "</div>" +
            '<button type="button" class="hn-foot" data-hn="toggle">' + (expanded ? "Thu gọn" : "Xem tất cả thông báo" + (all.length ? " (" + all.length + ")" : "")) + "</button>";
        const body = panel.querySelector(".hn-body");
        if (body) body.scrollTop = top;
    }

    function badge(a, n, cls) {
        if (!a) return;
        let b = a.querySelector(".hn-badge");
        if (!n) { if (b) b.remove(); return; }
        if (!b) { b = document.createElement("span"); b.className = "hn-badge " + cls; a.appendChild(b); }
        b.textContent = n > 9 ? "9+" : n;
    }

    function refresh() {
        // Số thông báo chưa đọc hiển thị trên icon chuông
        badge(document.querySelector(".notification-icon"), read(NK, []).filter((n) => n.unread).length, "");
        // Mục Yêu thích ở header chỉ là liên kết, không hiện số lượng nữa
        const fav = document.querySelector(".favorite-icon");
        if (fav) {
            fav.setAttribute("href", "yeuthich.html");
            const b = fav.querySelector(".hn-badge");
            if (b) b.remove();
        }
        const acc = document.querySelector('.top-icons a[href="dangnhap.html"], .top-icons a[data-logout]'), user = read(UK, null);
        if (acc && user && user.name) {
            acc.lastChild.textContent = " Chào, " + user.name.trim().split(/\s+/).pop();
            acc.setAttribute("href", "#");
            acc.dataset.logout = "1";
        }
    }

    /* ---------- Tạo thông báo ---------- */
    function push(item) {
        const t = TYPES[item.type] ? item.type : "system";
        const list = read(NK, []);
        list.unshift(Object.assign({ ts: Date.now(), unread: true }, item, { type: t, icon: item.icon || TYPES[t].icon }));
        write(NK, list.slice(0, KEEP));
        refresh();
        if (!panel.hidden) draw();
    }

    const quote = (s) => "“" + s + "”";
    function bookText(ids) {
        const n = ids.map((id) => (NAMES[id] ? quote(NAMES[id]) : "một cuốn sách"));
        return n.length <= 2 ? n.join(" và ") : n[0] + ", " + n[1] + " và " + (n.length - 2) + " cuốn khác";
    }
    function cartHref() {
        const a = document.querySelector('.top-icons a[href*="gio"], .top-icons a[href*="cart"], a.cart-icon'), h = a && a.getAttribute("href");
        return h && h !== "#" ? h : "#";
    }

    // Hàm toàn cục: gọi từ bất kỳ file JS nào
    window.hanami = {
        ready: true,
        refresh,
        notify: push,
        voucherSaved(name) {
            push({ type: "voucher", title: "Đã lưu voucher", href: "khuyenmai.html",
                text: (name ? "Voucher " + quote(name) : "Voucher") + " đã được lưu vào tài khoản. Bạn có thể dùng khi thanh toán." });
        },
        voucherRegistered(detail) {
            push({ type: "register", title: "Đăng ký voucher thành công", href: "khuyenmai.html",
                text: detail || "Bạn đã đăng ký nhận voucher. Hãy dùng cho đơn hàng đầu tiên nhé." });
        }
    };

    /* ---------- Tự động bắt hành động yêu thích + giỏ hàng ---------- */
    const idsOf = (v) => (Array.isArray(v) ? v.map((x) => (x && typeof x === "object" ? x.id : x)).filter((x) => x != null) : []);
    const qtyOf = (c) => Number(c && (c.qty ?? c.quantity)) || 1;

    function onStorage(key, before, after) {
        if (key === FK) {
            const had = new Set(idsOf(before)), added = [...new Set(idsOf(after))].filter((id) => !had.has(id));
            if (added.length) push({ type: "favorite", title: "Đã thêm sách yêu thích", href: "yeuthich.html", text: bookText(added) + " đã được lưu vào tủ sách yêu thích của bạn." });
        } else if (key === CK) {
            const had = {};
            (Array.isArray(before) ? before : []).forEach((c) => { if (c && c.id != null) had[c.id] = qtyOf(c); });
            const added = [...new Set((Array.isArray(after) ? after : []).filter((c) => c && c.id != null && (had[c.id] === undefined || qtyOf(c) > had[c.id])).map((c) => c.id))];
            if (added.length) push({ type: "cart", title: added.length === 1 ? "Đã thêm vào giỏ hàng" : "Đã thêm " + added.length + " cuốn vào giỏ hàng", href: cartHref(), text: bookText(added) + " đã được thêm vào giỏ hàng của bạn." });
        }
    }

    // Bọc localStorage.setItem: trang nào ghi vào 2 khoá trên cũng được ghi nhận, không cần sửa code trang đó
    try {
        const orig = Storage.prototype.setItem;
        Storage.prototype.setItem = function (key, value) {
            const watch = this === window.localStorage && (key === FK || key === CK);
            let before = null;
            if (watch) { try { before = JSON.parse(this.getItem(key)); } catch (e) {} }
            orig.apply(this, arguments);
            if (watch) { try { onStorage(key, before, JSON.parse(value)); } catch (e) {} }
        };
    } catch (e) {}

    /* ---------- Sự kiện ---------- */
    document.addEventListener("click", (e) => {
        const bell = e.target.closest(".notification-icon"), out = e.target.closest("[data-logout]"), item = e.target.closest(".hn-item"),
            toggle = e.target.closest("[data-hn=toggle]"), tab = e.target.closest("[data-hn-tab]"), all = e.target.closest("[data-hn=read]");
        if (bell) {
            e.preventDefault();
            if (!panel.hidden) { panel.hidden = true; return; }
            expanded = false; filter = "all";
            draw();
            const r = bell.getBoundingClientRect();
            panel.style.top = r.bottom + 8 + "px";
            panel.style.right = Math.max(12, window.innerWidth - r.right - 20) + "px";
            panel.hidden = false;
        } else if (out) {
            e.preventDefault();
            if (confirm("Đăng xuất khỏi tài khoản này?")) { try { localStorage.removeItem(UK); } catch (err) {} location.reload(); }
        } else if (item) {
            const list = read(NK, []), n = list[item.dataset.i];
            if (n) { n.unread = false; write(NK, list); refresh(); }
            if (item.getAttribute("href") === "#") { e.preventDefault(); draw(); }
        } else if (toggle) {
            expanded = !expanded; filter = "all";
            draw();
        } else if (tab) {
            filter = tab.dataset.hnTab;
            draw();
        } else if (all) {
            // Đánh dấu tất cả đã đọc -> badge trên chuông biến mất
            write(NK, read(NK, []).map((n) => Object.assign(n, { unread: false })));
            draw();
            refresh();
        } else if (!e.target.closest(".hn-panel")) panel.hidden = true;
    });

    const wait = setInterval(() => { if (document.querySelector(".notification-icon")) { clearInterval(wait); refresh(); } }, 150);
    setTimeout(() => clearInterval(wait), 8000);
})();