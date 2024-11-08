$(document).ready(function () {
    var token = localStorage.getItem("token");
    console.log(token)
    var linkSearch = "http://localhost:8080/room/both/searchroom"
    var linkRoom = "http://localhost:8080/room/both/getallroom"
    var linkCate = "http://localhost:8083/roomtypes/both/getalltype"
    $.ajax({
      method: "GET",
      url: linkCate,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .done(function (msg) {
        console.log(msg)
  
        // feature-restaurant (id của thẻ muốn đẩy dữ liệu từ API vào)
        if (msg.success) {
          $.each(msg.data, function (index, value) { //each hỗ trợ duyệt mảng trong jquery
            // truyền ảnh bằng API <img src = "${linkRestaurant}/file/${value.image}" >
            // truyền các giá trị khác có trong API : ${value.title} // lấy tiêu đề .....
  
            var html1 =
              `
              <option value="">Loại Phòng</option>
              <option value="${value.id}">${value.typeName}</option>
                ` // khai báo đoạn mã html để đẩy dư liệu vào
            $('#room-type').append(html1)
            console.log(value)
          })
        }
  
      });
  
  
    // load danh sách category
    // $.ajax({
    //   method: "GET",
    //   url: linkCategory,
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   },
    // })
    //   .done(function (msg) {
    //     console.log(msg)
  
    //     // feature-restaurant (id của thẻ muốn đẩy dữ liệu từ API vào)
    //     if (msg.success) {
  
    //     }
  
    //   });
  
    // $('#btn-category').click(function () {
    //   $.ajax({
    //     url: "http://localhost:8083/category/getHomeCategory",
    //     type: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     },
    //     success: function (data) {
    //       console.log(data)
    //     },
    //     error: function (xhr, status, error) {
    //       console.error(error);
    //     }
    //   })
    // })
  })

  function search() {
    // Lấy giá trị của các trường tìm kiếm
    var roomType = document.getElementById("room-type").value;
    var roomName = document.getElementById("room-name").value;
    var roomStatus = document.getElementById("room-status").value;

    // Gửi yêu cầu tìm kiếm đến máy chủ hoặc xử lý ở đây

    // Sau khi nhận được kết quả, hiển thị các phòng tìm được
}