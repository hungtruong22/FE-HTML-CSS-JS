$(document).ready(function () {
    var token = localStorage.getItem("accessToken");
    console.log(token)
    var linkhienthi = "http://localhost:8080/room/both/getallroom"
    $.ajax({
      method: "GET",
      url: linkhienthi,
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
  
            var html =
              `
              <div class="room-card">
              <div class="room-image">
              <img src="" alt="Item Image">
              </div>
              <div class="room-info">
                  <h3>${value.roomname}</h3>
                  <p>Booked by: ${value.count} people</p>
              </div>
          </div>
                ` // khai báo đoạn mã html để đẩy dư liệu vào
  
  
            $('#hienthi').append(html)
            console.log(value)
          })
        }
  
      });
  })