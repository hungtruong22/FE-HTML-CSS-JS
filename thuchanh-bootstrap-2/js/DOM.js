const box = document.getElementById('box');
console.log(box)

box.classList.add('light');

const menu = document.getElementById('menu');
console.log(menu);

const listH2 = document.getElementsByTagName('h2');
console.log(listH2)

const listH3 = document.getElementsByClassName('tag-h3');
console.log(listH3)

Array.from(listH3).forEach(item => {
    item.classList.add('test-2')
});

// [...listH3].forEach(item => console.log(item));