/* ===== yeuthich.js — Trang Yêu thích Hanami =====
   Yêu thích lưu trong localStorage (khoá "hanamiFavorites") dưới dạng danh sách id sách,
   cùng id với chitiet.js (vd: "cam", "ngk"). Trang chi tiết chỉ cần thêm/bớt id vào khoá này. */
(function () {
    const KEY = "hanamiFavorites", CART = "hanamiCart";
    const DEMO = false; // đặt true để xem thử giao diện khi chưa lưu cuốn nào
    const DEMO_IDS = ["cam", "ngk", "dnt", "ove", "dm", "dbg", "ngcntb", "tdnvc"];

    // Danh sách sách (id, tên, tác giả, thể loại, giá, giá gốc nếu đang giảm, ảnh)
    const BOOKS = [
        {"id": "dnt", "name": "Đắc Nhân Tâm", "author": "Dale Carnegie", "cat": "Phát triển bản thân", "price": 86000, "old": 140000, "img": "images/dnt.webp"},
        {"id": "ttbt", "name": "Thiên tài bên trái, kẻ điên bên phải", "author": "Alain de Botton", "cat": "Phát triển bản thân", "price": 179000, "img": "images/ttbt2.webp"},
        {"id": "tlhtc", "name": "Tâm lý học thành công", "author": "Carol S. Dweck", "cat": "Phát triển bản thân", "price": 199000, "img": "images/tlhtc.webp"},
        {"id": "tdnvc", "name": "Tư duy nhanh và chậm", "author": "Daniel Kahneman", "cat": "Phát triển bản thân", "price": 269000, "img": "images/tdnvc.webp"},
        {"id": "tdn", "name": "Tư duy ngược", "author": "Nguyễn Anh Dũng", "cat": "Phát triển bản thân", "price": 139000, "img": "images/tdn.jpg"},
        {"id": "dbg", "name": "Dám bị ghét", "author": "Ichiro Kishimi", "cat": "Phát triển bản thân", "price": 129000, "img": "images/dbg.webp"},
        {"id": "ove", "name": "Người đàn ông mang tên Ove", "author": "Fredrik Backman", "cat": "Tiểu thuyết", "price": 160000, "img": "images/ndomtov.webp"},
        {"id": "cam", "name": "Cây cam ngọt của tôi", "author": "José Mauro de Vasconcelos", "cat": "Tiểu thuyết", "price": 120000, "old": 150000, "img": "images/ccnct1.webp"},
        {"id": "ngk", "name": "Nhà giả kim", "author": "Paulo Coelho", "cat": "Tiểu thuyết", "price": 109000, "img": "images/ngk.webp"},
        {"id": "sd", "name": "Số đỏ", "author": "Vũ Trọng Phụng", "cat": "Tiểu thuyết", "price": 99000, "img": "images/sd.webp"},
        {"id": "td", "name": "Tắt đèn", "author": "Ngô Tất Tố", "cat": "Tiểu thuyết", "price": 99000, "img": "images/td.webp"},
        {"id": "bsv", "name": "Bông sen vàng", "author": "Nhiều tác giả", "cat": "Tiểu thuyết", "price": 169000, "img": "images/bsv.webp"},
        {"id": "ehln", "name": "Em học lễ nghĩa", "author": "Nhiều tác giả", "cat": "Thiếu nhi", "price": 99000, "img": "images/ehln.webp"},
        {"id": "ttgt", "name": "Tự tin giao tiếp", "author": "Nhiều tác giả", "cat": "Thiếu nhi", "price": 59000, "img": "images/ttgt.webp"},
        {"id": "cd1", "name": "Tư duy cho bé - Câu đố", "author": "Nhiều tác giả", "cat": "Thiếu nhi", "price": 29000, "img": "images/cd1.webp"},
        {"id": "cd2", "name": "Tư duy cho bé - Đồng dao", "author": "Nhiều tác giả", "cat": "Thiếu nhi", "price": 29000, "img": "images/cd2.webp"},
        {"id": "cd3", "name": "Tư duy cho bé - Thơ", "author": "Nhiều tác giả", "cat": "Thiếu nhi", "price": 29000, "img": "images/cd3.webp"},
        {"id": "cd4", "name": "Tư duy cho bé - Truyện", "author": "Nhiều tác giả", "cat": "Thiếu nhi", "price": 29000, "img": "images/cd4.webp"},
        {"id": "ttdd", "name": "Tuổi thơ dữ dội", "author": "Phùng Quán", "cat": "Thiếu nhi", "price": 59000, "img": "images/ttdd.webp"},
        {"id": "dm", "name": "Dế mèn phiêu lưu ký", "author": "Tô Hoài", "cat": "Thiếu nhi", "price": 49000, "old": 70000, "img": "images/dm.webp"},
        {"id": "mhbtl", "name": "Mẹ hỏi bé trả lời", "author": "Nhiều tác giả", "cat": "Thiếu nhi", "price": 49000, "img": "images/mhbtl.jpg"},
        {"id": "48nt", "name": "48 nguyên tắc chủ chốt của quyền lực", "author": "Robert Greene", "cat": "Kinh doanh", "price": 200000, "img": "images/48nt.webp"},
        {"id": "ngcntb", "name": "Người giàu có nhất thành Babylon", "author": "George S. Clason", "cat": "Kinh doanh", "price": 99000, "old": 150000, "img": "images/ngcntb.webp"},
        {"id": "ttdvd", "name": "Từ tốt đến vĩ đại", "author": "Jim Collins", "cat": "Kinh doanh", "price": 129000, "img": "images/ttdvd.webp"},
        {"id": "tdqld", "name": "Peter Drucker - Tư duy đúng quản lý đúng", "author": "Peter Drucker", "cat": "Kinh doanh", "price": 199000, "img": "images/tdqld.webp"},
        {"id": "nttdcl", "name": "Nghệ thuật tư duy chiến lược", "author": "Avinash K. Dixit và Barry J. Nalebuff", "cat": "Kinh doanh", "price": 249000, "img": "images/nttdcl.webp"},
        {"id": "lskthll", "name": "Lược sử kinh tế học lầy lội", "author": "Đang cập nhật", "cat": "Kinh doanh", "price": 199000, "img": "images/lskthll.webp"},
        {"id": "hsk1", "name": "Giáo trình chuẩn HSK 1", "author": "Đang cập nhật", "cat": "Ngoại ngữ", "price": 199000, "old": 265000, "img": "images/hsk1.webp"},
        {"id": "hsk2", "name": "Giáo trình chuẩn HSK 2", "author": "Đang cập nhật", "cat": "Ngoại ngữ", "price": 199000, "img": "images/hsk2.webp"},
        {"id": "hsk3", "name": "Giáo trình chuẩn HSK 3", "author": "Đang cập nhật", "cat": "Ngoại ngữ", "price": 299000, "img": "images/hsk3.webp"},
        {"id": "hsk4", "name": "Giáo trình chuẩn HSK 4", "author": "Đang cập nhật", "cat": "Ngoại ngữ", "price": 299000, "img": "images/hsk4.webp"},
        {"id": "b1", "name": "Tiếng Nhật sơ cấp cho người mới bắt đầu", "author": "Đang cập nhật", "cat": "Ngoại ngữ", "price": 99000, "img": "images/b1.webp"},
        {"id": "b11", "name": "Grammar And Vocabulary With Answer Key (Tái Bản 2025)", "author": "Đang cập nhật", "cat": "Ngoại ngữ", "price": 199000, "img": "images/b11.webp"},
        {"id": "vhth", "name": "Vui học tin học 2", "author": "Đang cập nhật", "cat": "Sách tham khảo", "price": 39000, "img": "images/vhth.webp"},
        {"id": "al", "name": "Sách Atlat Địa lý", "author": "Đang cập nhật", "cat": "Sách tham khảo", "price": 59000, "img": "images/al.webp"},
        {"id": "tcthqt", "name": "Tăng cường tin học quốc tế - IC3 GS6", "author": "Đang cập nhật", "cat": "Sách tham khảo", "price": 79000, "img": "images/tcthqt.webp"},
        {"id": "mhtn", "name": "60 đề minh họa Tốt nghiệp THPT 2026", "author": "Đang cập nhật", "cat": "Sách tham khảo", "price": 199000, "old": 285000, "img": "images/mhtn.webp"},
        {"id": "mhtn2", "name": "100 đề minh họa Tốt nghiệp THPT 2026", "author": "Đang cập nhật", "cat": "Sách tham khảo", "price": 199000, "img": "images/mhtn2.webp"},
        {"id": "dptd", "name": "Đột phá tư duy kỳ thi Tốt nghiệp THPT", "author": "Đang cập nhật", "cat": "Sách tham khảo", "price": 159000, "img": "images/dptd.webp"}
    ];

    const $ = (s) => document.querySelector(s);
    const money = (n) => n.toLocaleString("vi-VN") + "đ";
    const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
    const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
    const byId = {};
    BOOKS.forEach((b) => (byId[b.id] = b));

    let favs = read(KEY, null);
    if (favs === null) { favs = DEMO ? DEMO_IDS.slice() : []; write(KEY, favs); }
    favs = favs.filter((id) => byId[id]);

    // Tên chủ tủ sách: đã đăng nhập → hiện tên; chưa đăng nhập → link sang trang đăng nhập
    // Tên chủ tủ sách: hiển thị bình thường, không gắn link và không gạch chân
    const user = read("hanamiCurrentUser", DEMO ? { name: "Linh An" } : null);
    function renderOwner() {
        const who = $("#ytWho");
        if (!who) return;
        if (user && user.name) { 
            who.textContent = user.name; 
        } else {
            who.textContent = "bạn"; 
        }
    }

    let cat = "Tất cả", sort = "new";
    const picked = new Set();
    const pct = (b) => (b.old ? Math.round((1 - b.price / b.old) * 100) : 0);
    const save = () => { write(KEY, favs); window.hanami && hanami.refresh(); };

    /* ---------- Thông báo nhỏ ---------- */
    let timer;
    function toast(msg, undo) {
        const el = $("#ytToast");
        el.innerHTML = msg + (undo ? ' <button type="button" id="ytUndo">Hoàn tác</button>' : "");
        el.classList.add("show");
        clearTimeout(timer);
        timer = setTimeout(() => el.classList.remove("show"), 3500);
        if (undo) $("#ytUndo").onclick = () => { undo(); el.classList.remove("show"); };
    }

    /* ---------- Giỏ hàng (lưu khoá "hanamiCart": [{id, qty}]) ---------- */
    function addCart(ids) {
        const cart = read(CART, []);
        ids.forEach((id) => {
            const it = cart.find((c) => c.id === id);
            it ? it.qty++ : cart.push({ id, qty: 1 });
        });
        write(CART, cart);
        window.hanami && hanami.refresh();
        toast("Đã thêm " + ids.length + " cuốn vào giỏ hàng");
    }

    /* ---------- Lọc + sắp xếp ---------- */
    function visible() {
        let l = favs.map((id) => byId[id]);
        if (cat !== "Tất cả") l = l.filter((b) => b.cat === cat);
        if (sort === "new") l.reverse();
        else if (sort === "low") l.sort((a, b) => a.price - b.price);
        else if (sort === "high") l.sort((a, b) => b.price - a.price);
        else l.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        return l;
    }

    /* ---------- Giao diện ---------- */
    const card = (b) => {
        const p = pct(b);
        return `<article class="yt-card">
            <div class="yt-cover">
                ${p ? `<span class="yt-badge">-${p}%</span>` : ""}
                <button type="button" class="yt-heart" data-rm="${b.id}" title="Bỏ yêu thích" aria-label="Bỏ yêu thích ${b.name}"><i class="fa-solid fa-heart"></i></button>
                <input type="checkbox" class="yt-pick" data-pick="${b.id}" ${picked.has(b.id) ? "checked" : ""} aria-label="Chọn ${b.name}">
                <a href="chitietsp.html?id=${b.id}"><img src="${b.img}" alt="${b.name}" loading="lazy"></a>
            </div>
            <div class="yt-info">
                <h3><a href="chitietsp.html?id=${b.id}">${b.name}</a></h3>
                <p class="yt-author">${b.author}</p>
                <p class="yt-rate"><i class="fa-solid fa-star"></i> 4.9</p>
                <p class="yt-price"><strong>${money(b.price)}</strong>${b.old ? `<del>${money(b.old)}</del>` : ""}</p>
                <p class="yt-stock"><i class="fa-solid fa-circle-check"></i> Còn hàng</p>
                <button type="button" class="yt-add" data-add="${b.id}"><i class="fa-solid fa-cart-shopping"></i> Thêm vào giỏ</button>
            </div>
        </article>`;
    };

    function updateBar() {
        const list = visible(), n = picked.size;
        $("#ytAll").checked = list.length > 0 && n === list.length;
        $("#ytAllText").textContent = n ? `Đã chọn ${n}/${list.length} cuốn` : `Chọn tất cả ${list.length} cuốn`;
        $("#ytAddAll").innerHTML = '<i class="fa-solid fa-cart-plus"></i> ' + (n ? `Thêm ${n} cuốn đã chọn vào giỏ` : "Thêm tất cả vào giỏ");
    }

    function render() {
        const all = favs.map((id) => byId[id]);
        if (cat !== "Tất cả" && !all.some((b) => b.cat === cat)) cat = "Tất cả";
        const list = visible(), sale = all.filter(pct);

        $(".yt-page").classList.toggle("is-empty", !all.length);
        $("#ytCount").textContent = String(all.length).padStart(2, "0");

        $("#ytAlert").hidden = !sale.length;
        if (sale.length) $("#ytAlertText").innerHTML = `<b>Tin vui! ${sale.length} cuốn bạn lưu đang giảm giá.</b><span>Giảm tới ${Math.max(...sale.map(pct))}%. Đừng để cuốn sách mình thương phải đợi lâu.</span>`;

        const cats = ["Tất cả", ...new Set(all.map((b) => b.cat))];
        $("#ytChips").innerHTML = cats.map((c) => `<button type="button" class="${c === cat ? "on" : ""}" data-cat="${c}">${c} (${c === "Tất cả" ? all.length : all.filter((b) => b.cat === c).length})</button>`).join("");

        $("#ytGrid").innerHTML = all.length ? list.map(card).join("") :
            `<div class="yt-empty"><i class="fa-regular fa-heart"></i><h3 class="yt-serif">Tủ sách yêu thích đang trống</h3><p>Bấm trái tim ở trang chi tiết sách để lưu cuốn bạn thương vào đây.</p><a class="yt-btn solid" href="dmsp.html">Khám phá sách</a></div>`;

        const total = all.reduce((s, b) => s + b.price, 0);
        $("#ytBarText").innerHTML = `<b>${all.length} cuốn sách, vô vàn điều đang chờ bạn.</b><span>Tổng giá trị tủ sách: ${money(total)}. Giá ưu đãi cập nhật theo thời điểm đặt hàng.</span>`;

        // Gợi ý: sách chưa lưu, ưu tiên cùng thể loại với sách đã lưu
        const saved = new Set(favs), liked = new Set(all.map((b) => b.cat));
        const sug = BOOKS.filter((b) => !saved.has(b.id)).sort((a, b) => liked.has(b.cat) - liked.has(a.cat)).slice(0, 3);
        $("#ytSugs").innerHTML = sug.map((b) => `<a class="yt-sug" href="chitietsp.html?id=${b.id}"><img src="${b.img}" alt="${b.name}" loading="lazy"><div><h4>${b.name}</h4><p>${b.author}</p><strong>${money(b.price)}</strong><span>Khám phá ngay</span></div></a>`).join("");

        updateBar();
    }

    async function share() {
        try { await navigator.clipboard.writeText(location.href); toast("Đã sao chép liên kết tủ sách"); }
        catch (e) { toast("Hãy sao chép liên kết trên thanh địa chỉ để chia sẻ"); }
    }

    /* ---------- Sự kiện ---------- */
    document.addEventListener("click", (e) => {
        const t = e.target.closest("[data-rm],[data-add],[data-cat],#ytAddAll,#ytShare");
        if (!t) return;
        if (t.dataset.rm) {
            const i = favs.indexOf(t.dataset.rm), id = favs.splice(i, 1)[0];
            picked.delete(id); save(); render();
            toast("Đã bỏ “" + byId[id].name + "” khỏi yêu thích", () => { favs.splice(i, 0, id); save(); render(); });
        } else if (t.dataset.add) addCart([t.dataset.add]);
        else if (t.dataset.cat) { cat = t.dataset.cat; picked.clear(); render(); }
        else if (t.id === "ytAddAll") addCart(picked.size ? [...picked] : visible().map((b) => b.id));
        else if (t.id === "ytShare") share();
    });

    document.addEventListener("change", (e) => {
        const t = e.target;
        if (t.dataset.pick) { t.checked ? picked.add(t.dataset.pick) : picked.delete(t.dataset.pick); updateBar(); }
        else if (t.id === "ytAll") { visible().forEach((b) => (t.checked ? picked.add(b.id) : picked.delete(b.id))); render(); }
        else if (t.id === "ytSort") { sort = t.value; render(); }
    });

    renderOwner();
    render();
})();