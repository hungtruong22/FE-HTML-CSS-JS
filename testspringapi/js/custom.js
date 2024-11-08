$(document).ready(function(){
    console.log("hello");
    $("#btn-signin").click(function(event){
        event.preventDefault();
        var email = $('#email').val()
        var password = $('#password').val()
        console.log(email)
        console.log(password)
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/account/login",
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
              username: email,
              password: password
          }),
          success: function (data) {
            console.log(data.accessToken);
            localStorage.setItem('accessToken', data.accessToken);
            window.location.href = './homepage.html'
        },
          error: function (xhr, status, error) {
            console.log(error);
            // Handle error
        },
          })
            // .done(function(msg) {
            //     console.log("msg: " + msg)
            //     // console.log("msg: " + msg.success)
            //     // console.log("msg: " + msg.status)
            //     // console.log("msg: " + msg.data)
            //     // console.log("msg: " + msg.desc)

            //     console.log(msg.success)
            //   if(msg.success){
            //     console.log("Thành công")
            //     localStorage.setItem("token", msg.data) // lưu token
            //     //  window.location.href = './homepage.html'
            //     window.location.href = './search.html'
            //     /*
            //             localStorage.getItem("token")// lấy token
            //     */
            //   }else{
            //     console.log("Thất bại")
            //   }
            // });
    })
})