var upload = document.querySelector('#mypicture');
var preview = document.querySelector('.preview');
var error = document.querySelector('.error');

upload.addEventListener('change', function(e){
    // console.log('Channge', upload.files[0]);
    var file = upload.files[0];

    if(!file){
        return
    }

    if(!file.name.endsWith('.jpg')){
        // console.log('Hinh anh phải thuoc dinh dang jpg');
        error.innerHTML = `Hình ảnh phải thuộc định dạng jpg`;
        return
    }
    else{
        error.innerHTML = ``;
    }

    if(file.size / (1024 * 1024) > 5){
        error.innerHTML = `Chỉ được upload ảnh < 5MB`
        return
    }
    else{
        error.innerHTML = ``;
    }

    console.log(file);


    // cách 1: Blob

    var img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);


    // cách 2: Base64

    // var img = document.createElement('img');
    // var fileReader = new FileReader();

    // fileReader.readAsDataURL(file);
    
    // fileReader.onloadend = function(e){
    //     console.log('load ok', e.target.result);
    //     img.src = e.target.result;
    // }
    // preview.appendChild(img);
})