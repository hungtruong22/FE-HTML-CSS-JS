// var mockData = [{
//     name: 'Sp 1',
//     price: 999,
//     picture: '' 
// },

// {
//     name: 'Sp 2',
//     price: 999,
//     picture: '' 
// },

// {
//     name: 'Sp 3',
//     price: 999,
//     picture: '' 
// },

// {
//     name: 'Sp 4',
//     price: 999,
//     picture: '' 
// },

// ]

fetch('https://fakestoreapi.com/products')
.then(res => {
    return res.json();
})
.then(data => {
    console.log(data);
    // init
    var products = document.querySelector('.products');
    console.log(products);

    products.innerHTML = '';
    data.forEach(item => {
        var newProduct = document.createElement('div');
        newProduct.classList.add('product')
        newProduct.innerHTML = `
            <img class="product__img" src="${item.image}" alt="">
            <div class="info">
                <div class="product__name">
                    ${item.title}
                </div>
                <div class="product__price">
                    $ ${item.price}
                </div>
            </div>
        `
        products.appendChild(newProduct);
    })
})

var searchInput = document.querySelector('.search input');
searchInput.addEventListener('input', function(e){
    console.log(e.target.value);

    let txtSearch = e.target.value.trim();
    let listProductDOM = document.querySelectorAll('.product');
    listProductDOM.forEach(item => {
        // console.log(item.innerText);
        // console.log(item.innerText.includes(txtSearch));
        if(item.innerText.toLowerCase().includes(txtSearch)){
            item.classList.remove('hide');
        }  
        else{
            item.classList.add('hide');
        }
    })
})

