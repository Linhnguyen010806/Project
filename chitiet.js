const books = {
    dnt: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        price: "86.000đ",
        image: "images/dnt.webp",
        description: "Cuốn sách kinh điển về nghệ thuật giao tiếp và ứng xử, chia sẻ những nguyên tắc giúp bạn thấu hiểu người khác, xây dựng các mối quan hệ tốt đẹp và tạo thiện cảm trong cuộc sống. Với những bài học gần gũi, thiết thực, đây là lựa chọn phù hợp cho những ai muốn hoàn thiện bản thân và nâng cao kỹ năng giao tiếp mỗi ngày."
    },

    ttbt: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Thiên tài bên trái, kẻ điên bên phải",
        author: "Alain de Botton",
        price: "179.000đ",
        image: "images/ttbt2.webp",
        description: "Cuốn sách khám phá thế giới nội tâm và cách con người nhìn nhận bản thân, cảm xúc và cuộc sống. Qua những góc nhìn sâu sắc và gần gũi, tác giả gợi mở cách suy nghĩ khác biệt, giúp người đọc hiểu mình hơn và có cái nhìn đa chiều về những điều tưởng chừng quen thuộc."
    },

    tlhtc: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tâm lý học thành công",
        author: "Carol S. Dweck",
        price: "199.000đ",
        image: "images/tlhtc.webp",
        description: "Cuốn sách khám phá cách tư duy ảnh hưởng đến khả năng học hỏi, phát triển và đạt được thành công. Qua khái niệm “tư duy phát triển”, tác giả khuyến khích người đọc nhìn nhận thử thách, thất bại và nỗ lực như những cơ hội để hoàn thiện bản thân và tiến bộ mỗi ngày."
    },

    tdnvc: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tư duy nhanh và chậm",
        author: "Daniel Kahneman",
        price: "269.000đ",
        image: "images/tdnvc.webp",
        description: "Cuốn sách giúp người đọc hiểu cách con người suy nghĩ và đưa ra quyết định thông qua hai hệ thống tư duy: nhanh, trực giác và chậm, có chủ đích. Tác giả chỉ ra những sai lệch trong quá trình suy nghĩ, từ đó giúp chúng ta nhìn nhận vấn đề tỉnh táo hơn và đưa ra những quyết định hợp lý hơn trong cuộc sống."
    },

    tdn: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Tư duy ngược",
        author: "Nguyễn Anh Dũng",
        price: "139.000đ",
        image: "images/tdn.jpg",
        description: "Cuốn sách khuyến khích người đọc thay đổi cách tiếp cận vấn đề bằng việc suy nghĩ theo hướng khác biệt và linh hoạt hơn. Qua những góc nhìn mới mẻ, sách giúp bạn thoát khỏi lối tư duy quen thuộc, nhìn nhận vấn đề đa chiều và tìm ra những cách giải quyết sáng tạo hơn trong học tập, công việc và cuộc sống."
    },

    dbg: {
        category: "PHÁT TRIỂN BẢN THÂN",
        name: "Dám bị ghét",
        author: "Ichiro Kishimi",
        price: "129.000đ",
        image: "images/dbg.webp",
        description: "Cuốn sách mang đến những góc nhìn sâu sắc về cách con người đối diện với bản thân, các mối quan hệ và những kỳ vọng từ người khác. Sách khuyến khích bạn sống tự do, tự tin lựa chọn con đường của mình và học cách không bị chi phối bởi ánh nhìn hay sự công nhận của người khác."
    },

    ove: {
        category: "TIỂU THUYẾT",
        name: "Người đàn ông mang tên Ove",
        author: "Fredrik Backman",
        price: "160.000đ",
        image: "images/ndomtov.webp",
        description: "Một câu chuyện vừa hài hước vừa cảm động về Ove – một người đàn ông khó tính, nguyên tắc nhưng ẩn sau vẻ ngoài lạnh lùng là một trái tim giàu tình yêu thương. Những cuộc gặp gỡ bất ngờ giúp Ove dần tìm lại sự gắn kết, tình bạn và ý nghĩa của cuộc sống."
    },

    cam: {
        category: "TIỂU THUYẾT",
        name: "Cây cam ngọt của tôi",
        author: "José Mauro de Vasconcelos",
        price: "120.000đ",
        image: "images/ccnct1.webp",
        description: "Câu chuyện cảm động về tuổi thơ của cậu bé Zezé, một cậu bé giàu trí tưởng tượng nhưng phải sớm đối mặt với những khó khăn và mất mát. Qua tình yêu thương, tình bạn và những trải nghiệm tuổi thơ, cuốn sách gợi nhắc về sự đồng cảm, lòng yêu thương và những giá trị giản dị trong cuộc sống."
    },

    ngk: {
        category: "TIỂU THUYẾT",
        name: "Nhà giả kim",
        author: "Paulo Coelho",
        price: "109.000đ",
        image: "images/ngk.webp",
        description: "Cuốn sách kể về hành trình của chàng chăn cừu Santiago trên con đường theo đuổi ước mơ và tìm kiếm kho báu của riêng mình. Qua những cuộc gặp gỡ và trải nghiệm, câu chuyện truyền cảm hứng về việc dám theo đuổi điều mình mong muốn, lắng nghe bản thân và trân trọng hành trình khám phá cuộc sống."
    },

    sd: {
        category: "TIỂU THUYẾT",
        name: "Số đỏ",
        author: "Vũ Trọng Phụng",
        price: "99.000đ",
        image: "images/sd.webp",
        description: "Tác phẩm trào phúng nổi tiếng xoay quanh Xuân Tóc Đỏ và hành trình từ một kẻ vô danh trở thành “người hùng” trong xã hội thượng lưu đương thời. Với lối viết châm biếm sắc sảo và hài hước, cuốn sách phơi bày những thói giả dối, lố lăng và chạy theo danh vọng của một bộ phận xã hội."
    },

    td: {
        category: "TIỂU THUYẾT",
        name: "Tắt đèn",
        author: "Ngô Tất Tố",
        price: "99.000đ",
        image: "images/td.webp",
        description: "Tác phẩm khắc họa cuộc sống cơ cực của người nông dân Việt Nam dưới chế độ thực dân phong kiến, tiêu biểu qua số phận của chị Dậu và gia đình. Qua những tình cảnh éo le và đầy đau khổ, cuốn sách thể hiện sự cảm thông sâu sắc với người lao động nghèo và lên án xã hội bất công, tàn nhẫn."
    },

    bsv: {
        category: "TIỂU THUYẾT",
        name: "Bông sen vàng",
        author: "Nhiều tác giả",
        price: "169.000đ",
        image: "images/bsv.webp",
        description: "Một cuốn sách giàu giá trị văn học và cảm xúc, mang đến những câu chuyện gần gũi về con người, cuộc sống và những tình cảm chân thành. Qua từng trang sách, người đọc có thể cảm nhận vẻ đẹp của tình yêu thương, sự nhân văn và những giá trị đáng trân trọng trong cuộc sống."
    },

    ehln: {
        category: "THIẾU NHI",
        name: "Em học lễ nghĩa",
        author: "Nhiều tác giả",
        price: "99.000đ",
        image: "images/ehln.webp",
        description: "Cuốn sách giúp trẻ làm quen với những phép lịch sự và cách ứng xử phù hợp trong cuộc sống hằng ngày. Nội dung gần gũi, dễ hiểu, giúp các bé hình thành thói quen lễ phép, biết tôn trọng và yêu thương mọi người xung quanh ngay từ nhỏ."
    },

    ttgt: {
        category: "THIẾU NHI",
        name: "Tự tin giao tiếp",
        author: "Nhiều tác giả",
        price: "59.000đ",
        image: "images/ttgt.webp",
        description: "Cuốn sách giúp trẻ rèn luyện khả năng giao tiếp, mạnh dạn bày tỏ suy nghĩ và tự tin thể hiện bản thân. Nội dung gần gũi, dễ tiếp cận, hỗ trợ các bé hình thành kỹ năng ứng xử và giao tiếp tích cực trong học tập cũng như cuộc sống."
    },

    cd1: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Câu đố",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd1.webp",
    description: "Cuốn sách tập hợp những câu đố thú vị, gần gũi và phù hợp với trẻ nhỏ, giúp các bé vừa vui chơi vừa rèn luyện khả năng quan sát, suy luận và tư duy logic. Nội dung sinh động, dễ tiếp cận, tạo hứng thú học hỏi và khám phá thế giới xung quanh."
},

cd2: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Đồng dao",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd2.webp",
    description: "Cuốn sách tập hợp những bài đồng dao vui nhộn, gần gũi với trẻ nhỏ, giúp các bé vừa vui chơi vừa rèn luyện khả năng ghi nhớ và phát triển ngôn ngữ. Nội dung sinh động, dễ đọc, tạo hứng thú cho bé trong quá trình học hỏi và khám phá."
},

cd3: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Thơ",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd3.webp",
    description: "Cuốn sách tuyển chọn những bài thơ ngắn, vui nhộn và gần gũi với trẻ nhỏ, giúp các bé phát triển khả năng ngôn ngữ, ghi nhớ và tư duy. Nội dung nhẹ nhàng, sinh động, mang đến cho bé những giờ đọc sách thú vị và bổ ích."
},

cd4: {
    category: "THIẾU NHI",
    name: "Tư duy cho bé - Truyện",
    author: "Nhiều tác giả",
    price: "29.000đ",
    image: "images/cd4.webp",
    description: "Cuốn sách tập hợp những câu chuyện thú vị, gần gũi và phù hợp với trẻ nhỏ, giúp các bé phát triển khả năng tư duy, ngôn ngữ và trí tưởng tượng. Nội dung sinh động, dễ hiểu, mang đến cho bé những giờ đọc sách vừa vui vẻ vừa bổ ích."
},

    ttdd: {
        category: "THIẾU NHI",
        name: "Tuổi thơ dữ dội",
        author: "Phùng Quán",
        price: "59.000đ",
        image: "images/ttdd.webp",
        description: "Cuốn sách kể về những tháng ngày tuổi thơ đầy gian khổ nhưng cũng giàu tình bạn, lòng dũng cảm và tinh thần yêu nước. Qua hành trình của những thiếu niên trong thời chiến, tác phẩm khắc họa một tuổi trẻ hồn nhiên, kiên cường và để lại nhiều cảm xúc sâu sắc cho người đọc."
    },

    dm: {
        category: "THIẾU NHI",
        name: "Dế mèn phiêu lưu ký",
        author: "Tô Hoài",
        price: "49.000đ",
        image: "images/dm.webp",
        description: "Cuốn sách kể về những chuyến phiêu lưu đầy thú vị của chú Dế Mèn, qua đó tái hiện thế giới tuổi thơ sinh động và giàu trí tưởng tượng. Những trải nghiệm trên hành trình giúp Dế Mèn trưởng thành hơn, đồng thời gửi gắm những bài học ý nghĩa về tình bạn, trách nhiệm và cách sống."
    },

    mhbtl: {
        category: "THIẾU NHI",
        name: "Mẹ hỏi bé trả lời",
        author: "Nhiều tác giả",
        price: "49.000đ",
        image: "images/mhbtl.jpg",
        description: "Cuốn sách tập hợp những câu hỏi và hoạt động gần gũi, giúp bé khám phá thế giới xung quanh một cách tự nhiên và thú vị. Qua những tình huống quen thuộc, sách hỗ trợ bé phát triển khả năng quan sát, tư duy, ghi nhớ và mạnh dạn bày tỏ suy nghĩ."
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