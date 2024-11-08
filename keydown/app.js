var eKey = document.querySelector('.card.key .card-key__value');
// console.log(eCode);
var eLocation = document.querySelector('.card.location .card-location__value');
var eWhich = document.querySelector('.card.which .card-which__value');
var eCode = document.querySelector('.card.code .card-code__value');

var box = document.querySelector('.box');
var alert = document.querySelector('.alert');
var result = document.querySelector('.result');

document.addEventListener('keydown', function(e){
    result.innerText = e.which;

    eKey.innerText = e.key;
    eLocation.innerText = e.location;
    eWhich.innerText = e.which;
    eCode.innerText = e.code;
    
    alert.classList.add('hide');
    box.classList.remove('hide');
})