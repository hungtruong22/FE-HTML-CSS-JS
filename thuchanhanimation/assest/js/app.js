var btnSuccess = document.querySelector('.control .success');
var btnWarning = document.querySelector('.control .warning');
var btnError = document.querySelector('.control .error');

btnSuccess.addEventListener('click', function(){
    createToast('success');
})

btnWarning.addEventListener('click', function(){
    createToast('warning');
})

btnError.addEventListener('click', function(){
    createToast('error');
})

function createToast(status){
    let templateInner = `<i class="fas fa-check-circle"></i>
                 <span class="message">This is a Success messages</span>`
    switch(status){
        case 'success':
            templateInner = `<i class="fas fa-check-circle"></i>
            <span class="message">This is a Success messages</span>`;
            break;
        case 'warning':
            templateInner = `<i class="fas fa-exclamation-circle"></i>
            <span class="message">This is a Warning messages</span>`;
            break;
        case 'error':
            templateInner = `<i class="fas fa-exclamation-triangle"></i>
            <span class="message">This is a Error messages</span>`;
            break;
    }

    var toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add(status);

    toast.innerHTML = `
                ${templateInner}
                 <span class="countdown"></span>
    `

    var toastList = document.getElementById('toasts');
    toastList.appendChild(toast);

    setTimeout(function(){
        toast.style.animation = `slide_Hide 2s ease forwards`;
    }, 3400);
    setTimeout(function(){
        toast.remove();
    }, 5000);
}



// thực hành range

var range = document.querySelector('.range');
var process = document.querySelector('.process');
var value = document.querySelector('.process span');
var app = document.querySelector("#app");


function updateProcess(percent){
    process.style.width = `${percent}%`;
    value.innerHTML = `${percent}%`;
    app.style.background = `rgba(0, 0, 0, ${percent / 100})`
}


range.addEventListener('mousemove', function(e){
    //console.log(e.pageX); // pageX: vị trí con trỏ chuột
    //console.log(this.offsetLeft); // offsetLeft: vị trí cách nền trái của đối tượng là bao nhiêu
    //console.log(e.pageX - this.offsetLeft);

    var processWidth = e.pageX - this.offsetLeft;
    var percent = Math.floor((processWidth / this.offsetWidth) * 100);
    // console.log(percent);
    updateProcess(percent);
})

updateProcess(100);


var slider = document.querySelector('#slider');

slider.onchange = function(val){
    console.log(this.value);
}