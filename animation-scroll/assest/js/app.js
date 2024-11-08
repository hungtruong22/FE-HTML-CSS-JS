var animationElements = document.querySelectorAll('.show-on-scroll');
var homeTitle = document.querySelector('#home h1');

function togglleAnimationElementInWindow(element){
    // console.log('test');
    var rect = element.getClientRects()[0];
    // console.log(rect);
    var heightScreen = window.innerHeight;
    // console.log(heightScreen);
    
    // check xem element có bên trong màn hình hay không
    if(!(rect.bottom < 0 || rect.top > heightScreen)){
        // bên trong
        element.classList.add('start');
    }
    else{
        // bên ngoài
        element.classList.remove('start');
    }
}

function checkAnimation(){
    animationElements.forEach(element => {
        togglleAnimationElementInWindow(element);
    })
}

window.onscroll = checkAnimation;


