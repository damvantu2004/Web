// Lấy giỏ hàng từ localStorage hoặc khởi tạo một mảng rỗng nếu không có dữ liệu
// localStorage là một bộ nhớ cục bộ của trình duyệt, dùng để lưu trữ dữ liệu dạng key-value.
// Khi trang web tải, code sẽ cố gắng lấy dữ liệu giỏ hàng đã lưu từ localStorage (key là 'cart').
// Nếu không có dữ liệu (lần đầu truy cập hoặc giỏ hàng rỗng), `JSON.parse` sẽ trả về null, và `|| []` sẽ khởi tạo một mảng rỗng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Lấy các phần tử HTML cần thiết để tương tác
// Các biến này sẽ lưu trữ các tham chiếu đến các phần tử HTML trên trang web.
// Điều này giúp chúng ta dễ dàng thao tác với các phần tử đó bằng JavaScript.
const cartCountElement = document.getElementById('cart-count'); // Phần tử hiển thị số lượng sản phẩm trong giỏ hàng (thường ở icon giỏ hàng)
const cartItemsContainer = document.getElementById('cart-items'); // Phần tử chứa danh sách các sản phẩm trong giỏ hàng
const totalPriceElement = document.getElementById('total-price'); // Phần tử hiển thị tổng tiền của giỏ hàng

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng trên biểu tượng giỏ hàng
function updateCartCount() {
  // Sử dụng hàm reduce để tính tổng số lượng sản phẩm trong giỏ hàng
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Gán tổng số lượng vào nội dung của phần tử `cartCountElement` để cập nhật hiển thị
  cartCountElement.textContent = totalQuantity;
}

// Hàm tính tổng giá trị của giỏ hàng
function calculateTotalPrice() {
  let total = 0; // Khởi tạo biến tổng tiền là 0
  // Duyệt qua từng sản phẩm trong giỏ hàng
  for (const item of cart) {
    // Kiểm tra xem giá tiền có phải là số và không phải NaN
    if (typeof item.price === 'number' && !isNaN(item.price)) {
      total += item.price * item.quantity; // Cộng dồn giá tiền * số lượng vào biến total
    } else {
      // Nếu giá tiền không hợp lệ, ghi lỗi vào console để debug
      console.error('Invalid price:', item.price, 'for', item.name);
    }
  }
    // Gán tổng tiền đã tính toán vào nội dung của phần tử `totalPriceElement` và định dạng tiền tệ
  totalPriceElement.textContent = total.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
}

// Hàm để lấy đường dẫn ảnh sản phẩm dựa trên tên sản phẩm (tạm thời)
// Hàm này trả về đường dẫn ảnh dựa trên tên sản phẩm, bạn có thể tùy chỉnh đường dẫn này.
function getProductImage(productName) {
  if (productName.includes('P01')) {
    return '../Picture/Product/sanpham1_1.webp';
  } else if(productName.includes('P02')) {
    return '../Picture/Product/sanpham2_1.webp';
  } else if(productName.includes('P03')) {
    return '../Picture/Product/sanpham3_1.webp';
  } else if(productName.includes('P04')) {
    return '../Picture/Product/sanpham4_1.webp';
  } else if(productName.includes('P05')) {
    return '../Picture/Product/sanpham5_1.webp';
  } else if(productName.includes('P06')) {
    return '../Picture/Product/sanpham6_1.webp';
  } else if(productName.includes('P07')) {
    return '../Picture/Product/sanpham7_1.webp';
  } else if(productName.includes('P08')) {
    return '../Picture/Product/sanpham8_1.webp';
  } else if(productName.includes('P09')) {
    return '../Picture/Product/sanpham9_1.webp';
  } else if(productName.includes('P10')) {
    return '../Picture/Product/sanpham10_1.webp';
  } else if(productName.includes('P11')) {
    return '../Picture/Product/sanpham11_1.webp';
  } else if(productName.includes('P12')) {
    return '../Picture/Product/sanpham12_1.webp';
  } else if (productName.includes('Lounge Chair')) {
    return 'https://cdn-images.article.com/products/SKU343/2890x1500/image134268.jpg?w=2600&q=60&fm=webp&fit=max';
  } else {
    return '../Picture/logo.png';
  }
}

// Hàm render các sản phẩm trong giỏ hàng ra giao diện
function renderCartItems() {
  cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ của giỏ hàng trước khi vẽ lại
  // Nếu giỏ hàng rỗng
  if (cart.length === 0) {
      // Hiển thị thông báo giỏ hàng rỗng
    cartItemsContainer.innerHTML =
      '<p style="font-size: 17px; text-align: center;">Ú òa, giỏ hàng rỗng, hãy thêm sản phẩm vào giỏ hàng nhé</p>';
    return; // Dừng hàm nếu giỏ hàng rỗng
  }
    // Duyệt qua từng sản phẩm trong giỏ hàng
  cart.forEach((item) => {
      // Tạo một div element mới để chứa thông tin của từng sản phẩm trong giỏ hàng
    const cartItemDiv = document.createElement('div');
      // Thêm các class cần thiết cho div mới này
    cartItemDiv.classList.add('row', 'cart-item');

    // Tạo nội dung HTML cho div
    cartItemDiv.innerHTML = `
            <div class="col-2">
                <img src="${getProductImage(
                  item.name
                )}" alt="Product Image" style="max-width: 100px; height: auto;">
            </div>
            <div class="col-10">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0" style="font-size: 15px">${
                      item.name
                    }</h5>
                    <button class="btn btn-link text-danger btn-remove" data-name="${
                      item.name
                    }"><i class="fa fa-trash btn-remove" style="font-size: 17px"></i></button>
               </div>
                  <p class="mb-0" style="font-size: 12px">Số lượng:
                      <div style="margin-left: 5px; display: flex; align-items: center">
                           <button class="btn btn-number btn-sm btn-minus" data-name="${
                             item.name
                           }" style="z-index: 5; margin-right: 5px;">-</button>
                           <input type="number" class="form-control input-number" value="${
                             item.quantity
                           }" min="1" max="10" disabled style="height: 19px; width: 60px; font-size: 1rem; flex: 0.005 1 auto; margin-left:13px;text-align: center;">
                           <button type="button" class="btn btn-number btn-sm btn-plus" data-name="${
                             item.name
                           }" style="z-index: 5; margin-left: 5px;">+</button>
                      </div>
                  </p>
               <p class="mb-0" style="font-size: 12px">Đơn giá: ${item.price.toLocaleString(
                 'vi-VN',
                 { style: 'currency', currency: 'VND' }
               )}</p>
              <hr>
          </div>
        `;
    cartItemsContainer.appendChild(cartItemDiv); // Thêm item vào trong cart

    // Add event listeners to the buttons:
      // Lấy các nút +,- và nút xóa tương ứng
    const plusButton = cartItemDiv.querySelector('.btn-plus');
    const minusButton = cartItemDiv.querySelector('.btn-minus');
    const removeButton = cartItemDiv.querySelector('.btn-remove');

    // Thêm các sự kiện click cho các nút
    plusButton.addEventListener('click', () => {
      increaseQuantity(item.name);
    });

    minusButton.addEventListener('click', () => {
      decreaseQuantity(item.name);
    });

    removeButton.addEventListener('click', () => {
      removeItem(item.name);
    });
  });
}

// Hàm tăng số lượng sản phẩm trong giỏ hàng
function increaseQuantity(productName) {
  // Tạo một mảng cart mới
  cart = cart.map((item) => {
      // Nếu tên sản phẩm trong mảng trùng với tên sản phẩm được truyền vào hàm
    if (item.name === productName) {
      item.quantity++; // Tăng số lượng sản phẩm lên 1
    }
    return item; // Trả về product trong mảng
  });
  localStorage.setItem('cart', JSON.stringify(cart)); // Lưu dữ liệu vào localstorage
  renderCartItems(); // Render lại danh sách sản phẩm trong giỏ hàng
  updateCartCount(); // Update lại số lượng sản phẩm trên icon giỏ hàng
  calculateTotalPrice(); // Update lại tổng tiền
}

// Hàm giảm số lượng sản phẩm trong giỏ hàng
function decreaseQuantity(productName) {
  cart = cart.map((item) => {
      // Nếu tên sản phẩm trong mảng trùng với tên sản phẩm được truyền vào hàm
    if (item.name === productName && item.quantity > 1) {
      item.quantity--; // Giảm số lượng sản phẩm xuống 1 (nếu lớn hơn 1)
    }
    return item; // Trả về product trong mảng
  });
  localStorage.setItem('cart', JSON.stringify(cart)); // Lưu dữ liệu vào localstorage
  renderCartItems();  // Render lại danh sách sản phẩm trong giỏ hàng
  updateCartCount(); // Update lại số lượng sản phẩm trên icon giỏ hàng
  calculateTotalPrice(); // Update lại tổng tiền
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(productName) {
  // Tạo một mảng cart mới
    // Lọc các product có tên không trùng với tên product cần xóa
  cart = cart.filter((item) => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart)); // Lưu dữ liệu vào localstorage
  renderCartItems();  // Render lại danh sách sản phẩm trong giỏ hàng
  updateCartCount(); // Update lại số lượng sản phẩm trên icon giỏ hàng
  calculateTotalPrice(); // Update lại tổng tiền
}

// Gọi các hàm khởi tạo để vẽ giỏ hàng khi trang vừa load
updateCartCount(); // Gọi hàm cập nhật số lượng sản phẩm
renderCartItems();  // Gọi hàm render danh sách sản phẩm
calculateTotalPrice(); // Gọi hàm cập nhật tổng tiền