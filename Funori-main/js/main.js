
// hieu ung thanh header
let lastScrollTop = 0; // Vị trí cuộn trước đó
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Vị trí cuộn hiện tại

    // Kiểm tra hướng cuộn
    if (scrollTop > lastScrollTop) {
        // Khi cuộn xuống, ẩn header
        header.style.top = '-100px';
    } else {
        // Khi cuộn lên, hiện header
        header.style.top = '0';
    }
    lastScrollTop = scrollTop; // Cập nhật vị trí cuộn trước đó
});



// chuyển slide trong html
var img = [
    "Picture/slider-4.jpg",
    "Picture/slider-5.jpg",
    "Picture/slider-6.jpg",
];

// them su kien vao nut chuyển slide 
let objRight = document.getElementById('right');
let listButton = document.querySelectorAll('#list ul li button');
listButton[0].style = 'background-color: #FF9B42';

let index = 0;

objRight.addEventListener('click', function() {
    index++;

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
    document.getElementById('pic').src = img[index];
});

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
        index = 2;
    }
    document.getElementById('pic').src = img[index];
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

        document.getElementById('pic').src = img[2];
    }
}

// Lặp lại slide trong phần banner
setInterval(function() {
    index++;

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
    document.getElementById('pic').src = img[index];
}, 2000);




       
// Lấy phần tử đầu tiên có class 'Pic-1'
let firstImg = document.getElementsByClassName('Pic-1')[0];
firstImg.addEventListener('mouseover', function() {
    firstImg.src = "https://cdn-images.article.com/products/SKU343/2890x1500/image150192.jpg?w=850&q=40&fm=webp&fit=max";
});
firstImg.addEventListener('mouseout', function() {
    firstImg.src = "https://cdn-images.article.com/products/SKU343/2890x1500/image134268.jpg?w=2600&q=60&fm=webp&fit=max";
});

// -----------------------------------------------

// Lấy phần tử đầu tiên có class 'Pic-2'
let firstImg_1 = document.getElementsByClassName('Pic-2')[0];
firstImg_1.addEventListener('mouseover', function() {
    firstImg_1.src = "https://cdn-images.article.com/products/SKU24344/2890x1500/image159954.jpg?w=850&q=40&fm=webp&fit=max";
});
firstImg_1.addEventListener('mouseout', function() {
    firstImg_1.src = "https://cdn-images.article.com/products/SKU24344/2890x1500/image160132.jpg?w=2600&q=60&fm=webp&fit=max";
});

// -----------------------------------------------

// Lấy phần tử đầu tiên có class 'Pic-3'
let firstImg_2 = document.getElementsByClassName('Pic-3')[0];
firstImg_2.addEventListener('mouseover', function() {
    firstImg_2.src = "https://cdn-images.article.com/products/SKU2128/2890x1500/image162322.jpg?w=2600&q=60&fm=webp&fit=max";
});
firstImg_2.addEventListener('mouseout', function() {
    firstImg_2.src = "https://cdn-images.article.com/products/SKU2128/2890x1500/image162323.jpg?w=2600&q=60&fm=webp&fit=max";
});

// Lấy phần tử đầu tiên có class 'Pic-4'
let firstImg_3 = document.getElementsByClassName('Pic-4')[0];
firstImg_3.addEventListener('mouseover', function() {
    firstImg_3.src = "https://cdn-images.article.com/products/SKU26174/2890x1500/image170637.jpg?w=2600&q=60&fm=webp&fit=max";
});
firstImg_3.addEventListener('mouseout', function() {
    firstImg_3.src = "https://cdn-images.article.com/products/SKU26174/2890x1500/image170174.jpg?w=2600&q=60&fm=webp&fit=max";
});
