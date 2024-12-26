// chuyển slide trong html
var img = [
    "Picture/slider-4.jpg",
    "Picture/slider-5.jpg",
    "Picture/slider-6.jpg",
    // "Picture/image148461.webp",
];

// them su kien vao nut chuyển slide qua phải
let objRight = document.getElementById('right'); // nut chuyen slide qua phai
let listButton = document.querySelectorAll('#list ul li button'); // list index img
listButton[0].style = 'background-color: #FF9B42';

let index = 0;

objRight.addEventListener('click', function() {
    index++; // tăng index lên 1

    // chuyển đổi màu cho list index 
    if(index == 1) {
        listButton[0].style = 'background-color: transparent';
        listButton[1].style = 'background-color: #FF9B42';
    }else if(index == 2) {
        listButton[1].style = 'background-color: transparent';
        listButton[2].style = 'background-color: #FF9B42';
    }else {
        listButton[2].style = 'background-color: transparent';
        listButton[0].style = 'background-color: #FF9B42';
    }

    // nếu index lớn hơn số ảnh thì quay lại ảnh đầu tiên
    if(index >= img.length) {
        index = 0;
    }
    document.getElementById('pic').src = img[index]; //Cập nhật ảnh hiển thị với index
});
 
// them su kien vao nut chuyển slide qua trái
let objLeft = document.getElementById('left');

objLeft.addEventListener('click', function() {
    index--;

    // chuyển đổi màu cho list index 
    if(index == -1) {
        listButton[0].style = 'background-color: transparent';
        listButton[2].style = 'background-color: #FF9B42';
    }else if(index == 1) {
        listButton[2].style = 'background-color: transparent';
        listButton[1].style = 'background-color: #FF9B42';
    }else {
        listButton[1].style = 'background-color: transparent';
        listButton[0].style = 'background-color: #FF9B42';
    }
    if(index < 0) {
        index = 2; // nếu index nhỏ hơn 0 thì chuyển về ảnh cuối cùng
    }
    document.getElementById('pic').src = img[index]; //Cập nhật ảnh hiển thị với index
});

// chuyển slide banner khi click vào list index img 
function indexNumber(num) {
    if(num == 0) {
        // chuyển màu cho button list 
        listButton[0].style = 'background-color: #FF9B42';
        listButton[1].style = 'background-color: transparent';
        listButton[2].style = 'background-color: transparent';
        // end chuyển màu cho button list 
        
        document.getElementById('pic').src = img[0];
    }else if(num == 1) {
        // chuyển màu cho button list 
        listButton[1].style = 'background-color: #FF9B42';
        listButton[0].style = 'background-color: transparent';
        listButton[2].style = 'background-color: transparent';
        // end chuyển màu cho button list 

        document.getElementById('pic').src = img[1];
    }else {
        // chuyển màu cho button list 
        listButton[2].style = 'background-color: #FF9B42';
        listButton[0].style = 'background-color: transparent';
        listButton[1].style = 'background-color: transparent';
        // end chuyển màu cho button list 

        document.getElementById('pic').src = img[2]; //Cập nhật ảnh hiển thị với index
    }
}

// Lặp lại slide trong phần banner
setInterval(function() {
    index++; // tăng index lên 1 mỗi 900ms

    // chuyển đổi màu cho list index 
    if(index == 1) {
        listButton[0].style = 'background-color: transparent';
        listButton[1].style = 'background-color:rgb(247, 134, 41)';
    }else if(index == 2) {
        listButton[1].style = 'background-color: transparent';
        listButton[2].style = 'background-color:rgb(246, 146, 53)';
    }else {
        listButton[2].style = 'background-color: transparent';
        listButton[0].style = 'background-color:rgb(242, 137, 46)';
    }
    
    // nếu index lớn hơn số ảnh thì quay lại ảnh đầu tiên
    if(index >= img.length) {
        index = 0;
    }
    document.getElementById('pic').src = img[index];
}, 900);

/// chuyển đổi ảnh trong khi hover vào img product
let firstImg = document.getElementById('Pic-1');

firstImg.addEventListener('mouseover', function() {
    firstImg.src = "Picture/products-8-600x600.jpg";
});

firstImg.addEventListener('mouseout', function() {
    firstImg.src = "Picture/products-7-600x600.jpg";
});
// -----------------------------------------------

let firstImg_1 = document.getElementById('Pic-2');

firstImg_1.addEventListener('mouseover', function() {
    firstImg_1.src = "Picture/img-16-600x600.jpg";
});

firstImg_1.addEventListener('mouseout', function() {
    firstImg_1.src = "Picture/img-15-9-600x600.jpg";
});
// -----------------------------------------------

let firstImg_2 = document.getElementById('Pic-3');

firstImg_2.addEventListener('mouseover', function() {
    firstImg_2.src = "Picture/products-2-600x600.jpg";
});

firstImg_2.addEventListener('mouseout', function() {
    firstImg_2.src = "Picture/products-1-600x600.jpg";
});
// -----------------------------------------------
let firstImg_3 = document.getElementById('Pic-4');

firstImg_3.addEventListener('mouseover', function() {
    firstImg_3.src = "Picture/image120833.webp";
});

firstImg_3.addEventListener('mouseout', function() {
    firstImg_3.src = "Picture/down.jpg";
});
function toggleMenu() {
    const menu = document.querySelector('.box-menu-mobile'); // lấy ra thẻ div chứa menu
    menu.classList.toggle('show'); // thêm class show vào thẻ div hoặc xóa class show khỏi thẻ div nếu đã có
}
