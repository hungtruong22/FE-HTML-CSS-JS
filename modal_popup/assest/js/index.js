var btnOpen = document.querySelector('.open-modal-btn')
var modal = document.querySelector('.modal');
var iconClose = document.querySelector('.modal__header i');
var btnClose = document.querySelector('.button__modal');

// function toggleModal(e){
//     console.log(e.target);
//     modal.classList.toggle('hide');
// }

// btnOpen.addEventListener('click', toggleModal);
// btnClose.addEventListener('click',toggleModal);
// iconClose.addEventListener('click',toggleModal);
// modal.addEventListener('click',function(e){
//     if(e.target == e.currentTarget){
//         toggleModal();
//     }
// });

btnOpen.onclick = function(){
    modal.classList.toggle('hide');
}

btnClose.onclick = function(){
    modal.classList.toggle('hide');
}

iconClose.onclick = function(){
    modal.classList.toggle('hide');
}

modal.onclick = function(e){
    if(e.target == e.currentTarget){
        modal.classList.toggle('hide');
    }
}




