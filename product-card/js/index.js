const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);

        const colors = $$('.color-item');
        const imgs = $$('.card__img');
        const colorActive = $('.color-item.active__color');
        const sizes = $$('.size__select');
        const sizeActive = $('.size__select.active__size');
        const hearts = $$('.card__heart');
        const heartActive = $('.card__heart.card__heart-active');

        hearts.forEach((heart, index) => {
            heart.onclick = function(){
                console.log=(1)
                $('.card__heart.card__heart-active').classList.remove('card__heart-active');
                this.classList.add('card__heart-active');
            }
        })

        
        sizes.forEach((size, index) => {
            size.onclick = function(){
                $('.size__select.active__size').classList.remove('active__size');
                this.classList.add('active__size');
                // console.log(this.innerText)
            }
        })

        // console.log([colorActive]);
        

        // Dùng forEach() duyệt qua các phần tử tab-item để bắt sự kiện onclick trên từng phần tử tab-item
        colors.forEach((color, index) => {
            //console.log(color , index);
            const img = imgs[index];// Lấy img tương ứng với phần tử color-item vừa click vào
            
            color.onclick = function(){
                
                  //console.log(this); // Kiểm tra xem khi click vào color-item nào thì xem có hiện lên đoạn mã html của color-item đó hay không 
                  $('.color-item.active__color').classList.remove('active__color'); // Kiểm tra xem phần tử color-item nào có class "active__color" thì xóa class "active__color"    
                  $('.card__img.active__img').classList.remove('active__img');// Kiểm tra xem phần tử color-pane nào có class "active__color" thì xóa class "active__color"    
                    
                  this.classList.add('active__color'); // Thêm class "active__color" vào phần tử tab-item được click vào 
                  img.classList.add('active__img'); // Thêm class "active__color" vào phần tử tab-pane được click vào 
            }
        }) 



        