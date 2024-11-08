var imgFeature = document.querySelector('.img-feature');
var listImg = document.querySelectorAll('.list-image img');
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');

var currentIndex = 0;

// listImg.forEach((imgElement) => {
//     imgElement.addEventListener('click', function(e){
//         imgFeature.src = e.target.getAttribute('src');
//     })
// })

function updateImageByIndex(index){

    // remove class active
    document.querySelectorAll('.list-image .picture').forEach(item => {
        item.classList.remove('active');
    })

    currentIndex = index;
    imgFeature.src = listImg[index].getAttribute('src');
    listImg[index].parentElement.classList.add('active');
}

listImg.forEach((imgElement, index) => {
    imgElement.addEventListener('click', e => {
        imgFeature.style.opacity = '0';
         
        setTimeout(function(){
            updateImageByIndex(index); 
            imgFeature.style.opacity = '1';
        },400)
    })
})

prevBtn.onclick = function(e){
    if(currentIndex == 0){
        currentIndex = listImg.length - 1;
    }
    else{
        currentIndex--;
    }
    

    imgFeature.style.animation = '';
    setTimeout(function(){
        updateImageByIndex(currentIndex);
        imgFeature.style.animation = 'slideLeft 1s ease-in-out forwards';
    }, 200)
}

nextBtn.onclick = function(e){
    if(currentIndex  == listImg.length - 1){
        currentIndex = 0;
    }
    else{
        currentIndex++;
    }
    

    imgFeature.style.animation = '';
    setTimeout(function(){
        updateImageByIndex(currentIndex);
        imgFeature.style.animation = 'slideRight 1s ease-in-out forwards';
    }, 200)
}


updateImageByIndex(0);


