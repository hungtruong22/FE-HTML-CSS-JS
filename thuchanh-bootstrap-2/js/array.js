let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9,10];

let tong= 0;
numbers.forEach(function(item, index, array){
    // console.log(item, index, array);
    tong += item;
    // numbers[index] = 20;
});

console.log(tong);
console.log(numbers);


const monHoc = [
    {
        ten: "Toan",
        diem: 8.6
    },
    {
        ten: "Ly",
        diem: 9.2
    },
    {
        ten: "Hoa",
        diem: 8.5
    },
    {
        ten: "Tin",
        diem: 7.8
    },
];

const hocSinhGioi = monHoc.every(function(item){
    return item.diem >= 8;
});

console.log(hocSinhGioi);
if(hocSinhGioi){
    console.log("Day la hoc sinh gioi");
}
else{
    console.log("Day khong phai la hoc sinh gioi");
}

const oLaiLop = monHoc.some(function(item){
    return item.diem < 4;
});

console.log(oLaiLop);
if(oLaiLop){
    console.log("O lai lop");
}
else{
    console.log("Len lop");
}


const xemDiemTin = monHoc.find(function(item){
    return item.ten == "Tin";
});

console.log(xemDiemTin);


const diemTren8 = monHoc.filter(function(item){
    return item.diem >= 8;
});
    
console.log(diemTren8)



let ketqua = numbers.map((item, index, array) => {
    return item;
});

console.log(ketqua);



let danhSachMoi = monHoc.map(item => {
    // console.log(item);
    let hocLuc = "";
    if(item.diem >= 8){
        hocLuc = "Gioi";
    }
    else if(item.diem < 8 && item.diem >= 6.5){
        hocLuc = "Kha";
    }
    else{
        hocLuc = "Trung Binh";
    }

    return {
        ten: item.ten,
        hocLuc: hocLuc
    };
});

console.log(danhSachMoi);


let tong1 = numbers.reduce((total, item) => {
    console.log("total: " + total)
    return total + item;
});

console.log(tong1);

let trungBinh = numbers.reduce((total, item) => {
    return total + item/numbers.length;
}, 0);

console.log(trungBinh);


let tong2 = monHoc.reduce((total, item) => {
    console.log("total: " + total)
    return total + item.diem;
}, 0);

console.log(tong2);

let trungBinh1 = monHoc.reduce((total, item) => {
    return total + item.diem/monHoc.length;
}, 0);

console.log(trungBinh1);
