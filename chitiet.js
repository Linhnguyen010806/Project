// ================= DỮ LIỆU SẢN PHẨM =================

const books = {

    // ===== SẢN PHẨM MỚI =====

    atomic: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Atomic Habits",
        author: "James Clear",
        price: "99.000đ",
        image: "images/automic_habits.jpg",
        description:
            "Cuốn sách hướng dẫn cách xây dựng những thói quen tốt thông qua những thay đổi nhỏ và đều đặn mỗi ngày."
    },

    mk: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Muôn Kiếp Nhân Sinh",
        author: "Nguyên Phong",
        price: "120.000đ",
        image: "images/muon_kiep_nhan_sinh.jpg",
        description:
            "Những câu chuyện về nhân quả, luân hồi và những bài học về cách sống."
    },

    dnt: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        price: "88.000đ",
        image: "images/dnt.webp",
        description:
            "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử, giúp người đọc xây dựng những mối quan hệ tốt đẹp."
    },

    ttdg: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        author: "Rosie Nguyễn",
        price: "95.000đ",
        image: "images/book4.jpg",
        description:
            "Cuốn sách chia sẻ những trải nghiệm và bài học dành cho người trẻ trong học tập, công việc và cuộc sống."
    },

    ngk: {
        category: "TIỂU THUYẾT",
        name: "Nhà Giả Kim",
        author: "Paulo Coelho",
        price: "89.000đ",
        image: "images/book5.jpg",
        description:
            "Hành trình theo đuổi ước mơ và tìm kiếm ý nghĩa cuộc sống của Santiago."
    },

    tagr: {
        category: "KINH DOANH",
        name: "Think and Grow Rich",
        author: "Napoleon Hill",
        price: "110.000đ",
        image: "images/book6.jpg",
        description:
            "Cuốn sách tập trung vào tư duy, mục tiêu và những nguyên tắc được tác giả trình bày để hướng tới thành công."
    },


    // ===== BEST SELLER =====

    tdnvc: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tư Duy Nhanh Và Chậm",
        author: "Daniel Kahneman",
        price: "145.000đ",
        image: "images/tu_duy_nhanh_cham.jpg",
        description:
            "Cuốn sách giúp người đọc hiểu cách con người suy nghĩ, xử lý thông tin và đưa ra quyết định."
    },

    "7thoiquen": {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "7 Thói Quen Hiệu Quả",
        author: "Stephen Covey",
        price: "125.000đ",
        image: "images/7_thoi_quen.jpg",
        description:
            "Những nguyên tắc giúp xây dựng thói quen tích cực và nâng cao hiệu quả trong cuộc sống."
    },


    // ===== SÁCH THAM KHẢO =====

    vhth: {
        category: "SÁCH THAM KHẢO",
        name: "Vui học Tin học 2",
        author: "Nhiều tác giả",
        price: "29.000đ",
        image: "images/vui_hoc_tin_hoc.jpg",
        description:
            "Sách hỗ trợ học sinh làm quen với những kiến thức và kỹ năng tin học cơ bản."
    },

    moveup1: {
        category: "SÁCH HỌC NGOẠI NGỮ",
        name: "Move Up 1",
        author: "Nhiều tác giả",
        price: "55.000đ",
        image: "images/move_up_1.jpg",
        description:
            "Tài liệu hỗ trợ người học rèn luyện và phát triển các kỹ năng tiếng Anh."
    },

    ic3: {
        category: "SÁCH THAM KHẢO",
        name: "IC3 GS6 Level 1",
        author: "Nhiều tác giả",
        price: "80.750đ",
        image: "images/ic3.jpg",
        description:
            "Tài liệu hỗ trợ người học làm quen với các kiến thức và kỹ năng tin học theo chuẩn IC3."
    },

    ai8: {
        category: "SÁCH THAM KHẢO",
        name: "Trí Tuệ Nhân Tạo 8",
        author: "Nhiều tác giả",
        price: "36.000đ",
        image: "images/tri_tue_nhan_tao_8.jpg",
        description:
            "Tài liệu tham khảo giúp học sinh tiếp cận những kiến thức cơ bản về trí tuệ nhân tạo."
    },

    atlas: {
        category: "SÁCH THAM KHẢO",
        name: "Atlas Địa Lí Việt Nam",
        author: "Nhiều tác giả",
        price: "29.000đ",
        image: "images/atlas.jpg",
        description:
            "Tài liệu hỗ trợ học tập và tra cứu kiến thức địa lý Việt Nam."
    },


    // ===== GÓC NGOẠI NGỮ =====

    toeic: {
        category: "SÁCH HỌC NGOẠI NGỮ",
        name: "TOEIC 600+",
        author: "Nhiều tác giả",
        price: "120.000đ",
        image: "images/toeic.jpg",
        description:
            "Tài liệu hỗ trợ người học luyện tập và nâng cao năng lực tiếng Anh theo định hướng TOEIC."
    },

    ielts: {
        category: "SÁCH HỌC NGOẠI NGỮ",
        name: "IELTS Cambridge",
        author: "Nhiều tác giả",
        price: "185.000đ",
        image: "images/ielts.jpg",
        description:
            "Tài liệu luyện thi IELTS với các nội dung hỗ trợ phát triển kỹ năng tiếng Anh."
    },

    grammar: {
        category: "SÁCH HỌC NGOẠI NGỮ",
        name: "English Grammar",
        author: "Nhiều tác giả",
        price: "75.000đ",
        image: "images/grammar.jpg",
        description:
            "Tài liệu giúp người học củng cố kiến thức ngữ pháp tiếng Anh."
    },

    english: {
        category: "SÁCH HỌC NGOẠI NGỮ",
        name: "English for Life",
        author: "Nhiều tác giả",
        price: "68.000đ",
        image: "images/english.jpg",
        description:
            "Tài liệu tiếng Anh hướng tới việc phát triển khả năng sử dụng tiếng Anh trong cuộc sống."
    },

    vocabulary: {
        category: "SÁCH HỌC NGOẠI NGỮ",
        name: "Vocabulary Builder",
        author: "Nhiều tác giả",
        price: "92.000đ",
        image: "images/vocabulary.jpg",
        description:
            "Tài liệu hỗ trợ mở rộng và củng cố vốn từ vựng tiếng Anh."
    }

};


// ================= LẤY ID SẢN PHẨM =================

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const book = books[id];


// ================= HIỂN THỊ SẢN PHẨM =================

if (book) {

    document.getElementById("bookCategory").textContent =
        book.category;

    document.getElementById("bookName").textContent =
        book.name;

    document.getElementById("bookAuthor").textContent =
        book.author;

    document.getElementById("bookPrice").textContent =
        book.price;

    document.getElementById("bookImage").src =
        book.image;

    document.getElementById("bookImage").alt =
        book.name;

    document.getElementById("bookDescription").textContent =
        book.description;

    document.getElementById("bookDetail").textContent =
        book.description;

} else {

    document.getElementById("bookName").textContent =
        "Không tìm thấy sản phẩm";

    document.getElementById("bookDescription").textContent =
        "Sản phẩm bạn đang tìm kiếm không tồn tại.";

}


// ================= SỐ LƯỢNG =================

const quantityInput =
    document.getElementById("quantity");

const minusBtn =
    document.getElementById("minusBtn");

const plusBtn =
    document.getElementById("plusBtn");


minusBtn.addEventListener("click", function () {

    let quantity = Number(quantityInput.value);

    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }

});


plusBtn.addEventListener("click", function () {

    let quantity = Number(quantityInput.value);

    quantityInput.value = quantity + 1;

});