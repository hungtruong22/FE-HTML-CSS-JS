var images = document.querySelectorAll('.images img');
// console.log(images);
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');
var close = document.querySelector('.close');
var galleryImg = document.querySelector('.gallery__inner img');
var gallery = document.querySelector('.gallery');

var currentIndex = 0;

function showGallery(){
    if(currentIndex == 0){
        prev.classList.add('hide');
    }
    else{
        prev.classList.remove('hide');
    }

    // if(currentIndex == images.length - 1){
    //     next.classList.add('hide');
    // }
    // else{
    //     next.classList.remove('hide');
    // }

    galleryImg.src = images[currentIndex].src;
    gallery.classList.add('show');
}

images.forEach((item, index) => {
    item.addEventListener('click', function(){
        currentIndex = index;
        showGallery();
    })
})

close.addEventListener('click', function(){
    gallery.classList.remove('show');
})

gallery.onclick =function(e){
    if(e.target == e.currentTarget){
        gallery.classList.remove('show');
    }
}

document.addEventListener('keydown', function(e){
    if(e.keyCode == 27){
        gallery.classList.remove('show');
    }
})

prev.onclick = function(){
    if(currentIndex > 0){
        currentIndex--;
        showGallery();
    }
}


// cách 1 : nếu muốn khi đến ảnh cuối cùng mà bấm next thì sẽ quay lại ảnh đầu tiên

// next.onclick = function(){
//     if(currentIndex < images.length - 1){
//         currentIndex++;
//         showGallery();
//     }
//     else{
//         currentIndex = 0;
//         showGallery();
//     }
// }


// cách 2: nếu muốn khi đến ảnh cuối cùng mà thì dấu next sẽ biến mất và không quay lại ảnh đầu tiên

next.onclick = function(){
    if(currentIndex < images.length - 1){
        currentIndex++;
        showGallery();
    }
}





// JS SEARCH BOX

var btnSearch = document.querySelector('.search-box__btn');

btnSearch.addEventListener('click', function(){
    // console.log(this);
    // console.log(this.parentElement);

    this.parentElement.classList.toggle('open');
    // console.log(this.previousElementSibling);
    this.previousElementSibling.focus();

    /*
        siblings(): Lấy thành phần con cùng cấp của mỗi thành phần trong một bộ chọn phù hợp.
        Chú ý là không chọn chính nó.
    */

    /*
        Thuộc tính previousSibling trả về nút trước đó trên cùng cấp độ cây.

        Thuộc tính previousSibling trả về một đối tượng nút.

        Thuộc tính previousSibling chỉ đọc.  

        Quan trọng!
            previousSiblingtrả về nút anh chị em trước đó : Nút phần tử, nút văn bản hoặc nút nhận xét.

            Khoảng trắng giữa các phần tử cũng là các nút văn bản.

        Thay thế:
            Thuộc tính trướcElementSibling

            previousElementSiblingtrả về phần tử anh chị em trước đó (bỏ qua văn bản và nhận xét).
    
    */

    /*
        Thuộc tính previousElementSibling trả về nút trước đó trên cùng cấp độ cây.

        Thuộc tính previousElementSibling chỉ đọc.  
    */
})


// SEARCH TAGS JS

var content = document.querySelector('.search-tag__content');
var input = document.querySelector('.search-tag__content input');
var removeAllbtn = document.querySelector('.remove-all__btn');

var tags = ['Nodejs', 'Reactjs'];

function render(){
    content.innerHTML = '';
    let vitualTagDoms = '';
    for(let i = 0; i < tags.length; i++){
        const tag = tags[i];

        content.innerHTML += `<li class="item">${tag}
        <i class="fas fa-times" onclick = "removeTag(${i})"></i>
        </li>`;
    }
    content.appendChild(input);
    input.focus();
}

render();


function addTags(){
    tags.push(input.value.trim());
    input.value = '';
}

function removeTag(index){
    // console.log(index);
    tags.splice(index,1);
    render(); 
}


input.addEventListener('keydown', function(e){
    if(e.key == "Enter"){
        // console.log(input.value.trim());
        // console.log(e.value)
        addTags();
        render();
    }
})


removeAllbtn.onclick = function(){
    tags = [];
    render();
}