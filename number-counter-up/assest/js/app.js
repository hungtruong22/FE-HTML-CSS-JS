var listCounter = document.querySelectorAll('.counter');


function count(element){ 
    var numberElement = element.querySelector('.number');
    var to = parseInt(numberElement.innerText); // to là đích đến
    var count = 0;
    var time = 250; // time là số lần nhảy số
    var step = to / time; // step là bước nhảy 
    let counting = setInterval(() => {
        // count += 10;
        count += step;
        if(count > to){
            clearInterval(counting);
            numberElement.innerText = to;
        }
        else{
            numberElement.innerText = Math.round(count);
        }
    }, 1);
}

listCounter.forEach(item => {
    count(item);
})