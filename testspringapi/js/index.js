$(document).ready(function () {
  var token = localStorage.getItem("token");
  console.log(token)
  var linkRestaurant = "http://localhost:8080/room"
  var linkCategory = "http://localhost:8083/category/getHomeCategory"
  var linkMenu = "http://localhost:8083/menu"
  $.ajax({
    method: "GET",
    url: linkRestaurant,
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
                  <h2>Featured Items</h2>
                  <div class="item">
                      <img src = "${linkRestaurant}/file/${value.image}">
                      <h3>${value.title}</h3>
                      <p>${value.subtitle}</p>
                      <button>Add to Cart</button>
                  </div>
                  <!-- Add more items here -->
              ` // khai báo đoạn mã html để đẩy dư liệu vào


          $('#feature-restaurant').append(html)
          console.log(value)
        })
      }

    });


  // load danh sách category
  $.ajax({
    method: "GET",
    url: linkCategory,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .done(function (msg) {
      console.log(msg)

      // feature-restaurant (id của thẻ muốn đẩy dữ liệu từ API vào)
      if (msg.success) {

      }

    });

  $('#btn-category').click(function () {
    $.ajax({
      url: "http://localhost:8083/category/getHomeCategory",
      type: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success: function (data) {
        console.log(data)
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    })
  })
})