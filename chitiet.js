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
    },
    //phải có dấu ","
    
    //KINH DOANH
    "48nt": {
        category: "KINH DOANH",
        name: "48 nguyên tắc chủ chốt của quyền lực",
        author: "Robert Greene",
        price: "200.000đ",
        image: "images/48nt.webp",
        description: "Cuốn sách phân tích những nguyên tắc về quyền lực, chiến lược và cách ứng xử trong các mối quan hệ xã hội. Qua những ví dụ và bài học thực tế, sách giúp người đọc hiểu rõ hơn về cách con người tạo dựng ảnh hưởng và đưa ra quyết định."
    },
    ngcntb: {
        category: "KINH DOANH",
        name: "Người giàu có nhất thành Babylon",
        author: "George S. Clason",
        price: "99.000đ",
        image: "images/ngcntb.webp",
        description: "Cuốn sách chia sẻ những bài học tài chính cá nhân thông qua các câu chuyện tại thành Babylon cổ đại. Nội dung tập trung vào việc tiết kiệm, quản lý chi tiêu, tích lũy tài sản và xây dựng thói quen sử dụng tiền hợp lý."
    },

    ttdvd: {
        category: "KINH DOANH",
        name: "Từ tốt đến vĩ đại",
        author: "Jim Collins",
        price: "129.000đ",
        image: "images/ttdvd.webp",
        description: "Cuốn sách tìm hiểu những yếu tố giúp doanh nghiệp chuyển từ hoạt động tốt sang phát triển xuất sắc. Tác phẩm đề cập đến vai trò của lãnh đạo, con người, văn hóa kỷ luật và chiến lược trong quá trình phát triển tổ chức."
    },

    tdqld: {
        category: "KINH DOANH",
        name: "Peter Drucker - Tư duy đúng quản lý đúng",
        author: "Peter Drucker",
        price: "199.000đ",
        image: "images/tdqld.webp",
        description: "Cuốn sách giới thiệu những góc nhìn về tư duy quản lý, tổ chức công việc và đưa ra quyết định trong kinh doanh. Nội dung giúp người đọc hiểu hơn về vai trò của quản trị và cách nâng cao hiệu quả làm việc."
    },

    nttdcl: {
        category: "KINH DOANH",
        name: "Nghệ thuật tư duy chiến lược",
        author: "Avinash K. Dixit và Barry J. Nalebuff",
        price: "249.000đ",
        image: "images/nttdcl.webp",
        description: "Cuốn sách giới thiệu cách tư duy chiến lược trong những tình huống có nhiều bên cùng tham gia. Thông qua các ví dụ và phương pháp phân tích, sách giúp người đọc cân nhắc lựa chọn, dự đoán phản ứng và đưa ra quyết định phù hợp."
    },

    lskthll: {
        category: "KINH DOANH",
        name: "Lược sử kinh tế học lầy lội",
        author: "Đang cập nhật",
        price: "199.000đ",
        image: "images/lskthll.webp",
        description: "Cuốn sách đưa người đọc tiếp cận các ý tưởng kinh tế học thông qua cách trình bày gần gũi và dễ tiếp cận. Nội dung giúp người đọc bước đầu tìm hiểu những khái niệm kinh tế và mối liên hệ giữa kinh tế với đời sống."
    },

    
    // NGOAI NGU
    hsk1: {
        category: "NGOẠI NGỮ",
        name: "Giáo trình chuẩn HSK 1",
        author: "Đang cập nhật",
        price: "199.000đ",
        image: "images/hsk1.webp",
        description: "Giáo trình dành cho người mới bắt đầu học tiếng Trung, giúp làm quen với từ vựng, mẫu câu và những kiến thức nền tảng ở trình độ HSK 1."
    },

    hsk2: {
        category: "NGOẠI NGỮ",
        name: "Giáo trình chuẩn HSK 2",
        author: "Đang cập nhật",
        price: "199.000đ",
        image: "images/hsk2.webp",
        description: "Giáo trình giúp người học tiếp tục mở rộng vốn từ và củng cố các cấu trúc câu tiếng Trung ở trình độ HSK 2, phù hợp để luyện tập kiến thức sơ cấp."
    },

    hsk3: {
        category: "NGOẠI NGỮ",
        name: "Giáo trình chuẩn HSK 3",
        author: "Đang cập nhật",
        price: "299.000đ",
        image: "images/hsk3.webp",
        description: "Giáo trình hỗ trợ người học củng cố từ vựng, ngữ pháp và các kỹ năng tiếng Trung ở trình độ HSK 3, phục vụ quá trình học tập và ôn luyện."
    },

    hsk4: {
        category: "NGOẠI NGỮ",
        name: "Giáo trình chuẩn HSK 4",
        author: "Đang cập nhật",
        price: "299.000đ",
        image: "images/hsk4.webp",
        description: "Giáo trình dành cho người học tiếng Trung trình độ HSK 4, giúp mở rộng kiến thức và rèn luyện khả năng sử dụng tiếng Trung ở trình độ trung cấp."
    },

    b1: {
        category: "NGOẠI NGỮ",
        name: "Tiếng Nhật sơ cấp cho người mới bắt đầu",
        author: "Đang cập nhật",
        price: "99.000đ",
        image: "images/b1.webp",
        description: "Sách dành cho người mới bắt đầu học tiếng Nhật, hỗ trợ làm quen với kiến thức cơ bản, từ vựng và cấu trúc câu thường gặp trong quá trình học tập."
    },

    b11: {
        category: "NGOẠI NGỮ",
        name: "Grammar And Vocabulary With Answer Key (Tái Bản 2025)",
        author: "Đang cập nhật",
        price: "199.000đ",
        image: "images/b11.webp",
        description: "Sách hỗ trợ người học ôn luyện ngữ pháp và từ vựng tiếng Anh. Phần đáp án giúp người học kiểm tra kết quả, nhận biết lỗi sai và củng cố kiến thức."
    },
    
    // SACH THAM KHAO
    vhth: {
        category: "SÁCH THAM KHẢO",
        name: "Vui học tin học 2",
        author: "Đang cập nhật",
        price: "39.000đ",
        image: "images/vhth.webp",
        description: "Sách hỗ trợ học sinh tiếp cận kiến thức tin học thông qua những bài học và hoạt động thực hành. Nội dung hướng đến việc củng cố kiến thức và phát triển kỹ năng sử dụng máy tính."
    },

    al: {
        category: "SÁCH THAM KHẢO",
        name: "Sách Atlat Địa lý",
        author: "Đang cập nhật",
        price: "59.000đ",
        image: "images/al.webp",
        description: "Tài liệu bản đồ hỗ trợ học tập môn Địa lý, giúp học sinh tra cứu thông tin về tự nhiên, dân cư, kinh tế và các vùng lãnh thổ trong quá trình học tập, ôn luyện."
    },

    tcthqt: {
        category: "SÁCH THAM KHẢO",
        name: "Tăng cường tin học quốc tế - IC3 GS6",
        author: "Đang cập nhật",
        price: "79.000đ",
        image: "images/tcthqt.webp",
        description: "Tài liệu hỗ trợ người học củng cố kiến thức và kỹ năng tin học theo chương trình IC3 GS6, phục vụ việc học tập, thực hành và chuẩn bị cho kỳ thi."
    },

    mhtn: {
        category: "SÁCH THAM KHẢO",
        name: "60 đề minh họa Tốt nghiệp THPT 2026",
        author: "Đang cập nhật",
        price: "199.000đ",
        image: "images/mhtn.webp",
        description: "Bộ đề tham khảo dành cho học sinh ôn thi tốt nghiệp THPT năm 2026, hỗ trợ luyện tập, tự đánh giá kiến thức và làm quen với hình thức đề thi."
    },

    mhtn2: {
        category: "SÁCH THAM KHẢO",
        name: "100 đề minh họa Tốt nghiệp THPT 2026",
        author: "Đang cập nhật",
        price: "199.000đ",
        image: "images/mhtn2.webp",
        description: "Tài liệu luyện đề dành cho học sinh chuẩn bị kỳ thi tốt nghiệp THPT năm 2026, giúp củng cố kiến thức và rèn luyện kỹ năng làm bài."
    },

    dptd: {
        category: "SÁCH THAM KHẢO",
        name: "Đột phá tư duy kỳ thi Tốt nghiệp THPT",
        author: "Đang cập nhật",
        price: "159.000đ",
        image: "images/dptd.webp",
        description: "Sách tham khảo hỗ trợ học sinh rèn luyện tư duy, hệ thống hóa kiến thức và nâng cao kỹ năng giải quyết câu hỏi trong quá trình ôn thi tốt nghiệp THPT."
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