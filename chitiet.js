const books = {
    dnt: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        price: "86.000đ",
        image: "images/dnt.webp",
        description: "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử, giúp người đọc xây dựng các mối quan hệ tốt đẹp."
    },

    ttbt: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Thiên tài bên trái, kẻ điên bên phải",
        author: "Alain de Botton",
        price: "179.000đ",
        image: "images/ttbt2.webp",
        description: "Cuốn sách giúp người đọc khám phá tư duy, cảm xúc và cách nhìn nhận bản thân."
    },

    tlhtc: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tâm lý học thành công",
        author: "Carol S. Dweck",
        price: "199.000đ",
        image: "images/tlhtc.webp",
        description: "Khám phá tư duy và những yếu tố tâm lý ảnh hưởng đến thành công."
    },

    tdnvc: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tư duy nhanh và chậm",
        author: "Daniel Kahneman",
        price: "269.000đ",
        image: "images/tdnvc.webp",
        description: "Khám phá cách con người suy nghĩ, ra quyết định và xử lý thông tin."
    },

    tdn: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tư duy ngược",
        author: "Nguyễn Anh Dũng",
        price: "139.000đ",
        image: "images/tdn.jpg",
        description: "Một góc nhìn mới giúp người đọc thay đổi cách tư duy và giải quyết vấn đề."
    },

    dbg: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Dám bị ghét",
        author: "Ichiro Kishimi",
        price: "129.000đ",
        image: "images/dbg.webp",
        description: "Cuốn sách hướng người đọc đến sự tự do, tự tin và sống theo lựa chọn của chính mình."
    },

    ove: {
        category: "TIỂU THUYẾT",
        name: "Người đàn ông mang tên Ove",
        author: "Fredrik Backman",
        price: "160.000đ",
        image: "images/ndomtov.webp",
        description: "Một câu chuyện cảm động về con người, tình yêu thương và những mối quan hệ bất ngờ."
    },

    cam: {
        category: "TIỂU THUYẾT",
        name: "Cây cam ngọt của tôi",
        author: "José Mauro de Vasconcelos",
        price: "120.000đ",
        image: "images/ccnct1.webp",
        description: "Câu chuyện tuổi thơ đầy cảm xúc về tình yêu thương và những mất mát trong cuộc sống."
    },

    ngk: {
        category: "TIỂU THUYẾT",
        name: "Nhà giả kim",
        author: "Paulo Coelho",
        price: "109.000đ",
        image: "images/ngk.webp",
        description: "Hành trình theo đuổi ước mơ và tìm kiếm ý nghĩa cuộc sống."
    },

    sd: {
        category: "TIỂU THUYẾT",
        name: "Số đỏ",
        author: "Vũ Trọng Phụng",
        price: "99.000đ",
        image: "images/sd.webp",
        description: "Tác phẩm văn học nổi tiếng với những tình huống trào phúng và châm biếm sâu sắc."
    },

    td: {
        category: "TIỂU THUYẾT",
        name: "Tắt đèn",
        author: "Ngô Tất Tố",
        price: "99.000đ",
        image: "images/td.webp",
        description: "Tác phẩm phản ánh cuộc sống khó khăn của người nông dân Việt Nam xưa."
    },

    bsv: {
        category: "TIỂU THUYẾT",
        name: "Bông sen vàng",
        author: "Nhiều tác giả",
        price: "169.000đ",
        image: "images/bsv.webp",
        description: "Một tác phẩm giàu giá trị văn học và cảm xúc."
    },

    ehln: {
        category: "THIẾU NHI",
        name: "Em học lễ nghĩa",
        author: "Nhiều tác giả",
        price: "99.000đ",
        image: "images/ehln.webp",
        description: "Giúp trẻ hình thành những thói quen tốt và cách ứng xử lễ phép."
    },

    ttgt: {
        category: "THIẾU NHI",
        name: "Tự tin giao tiếp",
        author: "Nhiều tác giả",
        price: "59.000đ",
        image: "images/ttgt.webp",
        description: "Giúp trẻ rèn luyện kỹ năng giao tiếp và tự tin thể hiện bản thân."
    },

    cd1: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Câu đố",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd1.webp",
    description: "Những câu đố thú vị giúp trẻ phát triển khả năng tư duy."
},

cd2: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Đồng dao",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd2.webp",
    description: "Những bài đồng dao vui nhộn giúp bé vừa học vừa chơi."
},

cd3: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Thơ",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd3.webp",
    description: "Những bài thơ ngắn giúp bé phát triển ngôn ngữ và khả năng ghi nhớ."
},

cd4: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Truyện",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd4.webp",
    description: "Những câu chuyện thú vị giúp bé khám phá thế giới."
},

    ttdd: {
        category: "THIẾU NHI",
        name: "Tuổi thơ dữ dội",
        author: "Phùng Quán",
        price: "59.000đ",
        image: "images/ttdd.webp",
        description: "Câu chuyện giàu cảm xúc về tuổi trẻ, tình bạn và lòng dũng cảm."
    },

    dm: {
        category: "THIẾU NHI",
        name: "Dế mèn phiêu lưu ký",
        author: "Tô Hoài",
        price: "49.000đ",
        image: "images/dm.webp",
        description: "Hành trình phiêu lưu đầy thú vị của chú Dế Mèn."
    },

    mhbtl: {
        category: "THIẾU NHI",
        name: "Mẹ hỏi bé trả lời",
        author: "Nhiều tác giả",
        price: "49.000đ",
        image: "images/mhbtl.jpg",
        description: "Những câu hỏi và hoạt động giúp trẻ khám phá thế giới xung quanh."
    }
};


// Lấy ID trên đường dẫn
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const book = books[id];

if (book) {
    document.getElementById("bookCategory").textContent = book.category;
    document.getElementById("bookName").textContent = book.name;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookPrice").textContent = book.price;
    document.getElementById("bookImage").src = book.image;
    document.getElementById("bookDescription").textContent = book.description;
    document.getElementById("bookDetail").textContent = book.description;
}