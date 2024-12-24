        // Lấy giỏ hàng từ localStorage hoặc khởi tạo một mảng rỗng nếu không có dữ liệu
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Lấy các phần tử HTML cần thiết để tương tác
        const cartCountElement = document.getElementById('cart-count'); // Phần tử hiển thị số lượng sản phẩm trên biểu tượng giỏ hàng
        const cartItemsContainer = document.getElementById('cart-items'); // Phần tử chứa các sản phẩm trong giỏ hàng
        const totalPriceElement = document.getElementById('total-price'); // Phần tử hiển thị tổng giá trị của giỏ hàng

        // Hàm cập nhật số lượng sản phẩm trong giỏ hàng trên biểu tượng giỏ hàng
         function updateCartCount() {
             // Sử dụng reduce để tính tổng số lượng của tất cả sản phẩm trong giỏ
             let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
              cartCountElement.textContent = totalQuantity; // Cập nhật số lượng trên giao diện
          }

         // Hàm tính tổng giá trị của giỏ hàng
         function calculateTotalPrice() {
             // Sử dụng reduce để tính tổng giá trị của tất cả sản phẩm trong giỏ hàng
             let total = cart.reduce((sum, item) => {
                // Loại bỏ các ký tự không phải số và chuyển đổi giá thành số float
                let price = parseFloat(item.price.replace(/[^\d.]/g, ''));
                 return sum + (price * item.quantity); // Tính tổng giá trị của các item trong giỏ hàng
             }, 0);
              totalPriceElement.textContent = total.toLocaleString(); // Hiển thị tổng giá trị và định dạng bằng dấu phẩy hàng nghìn
          }

         // Hàm để lấy đường dẫn ảnh sản phẩm dựa trên tên sản phẩm (tạm thời)
         function getProductImage(productName) {
             // Đây là một hàm tạm thời để map tên sản phẩm với ảnh.
             // Trong thực tế, bạn nên sử dụng cơ sở dữ liệu hoặc một cách khác để lấy thông tin ảnh sản phẩm.
            if (productName.includes('Ghế sofa')) {
               return '../Picture/Product/sanpham1_1.webp';
           } else if(productName.includes('Lounge Chair')){
                return 'https://cdn-images.article.com/products/SKU343/2890x1500/image134268.jpg?w=2600&q=60&fm=webp&fit=max';
            } else {
               return '../Picture/logo.png';
            }
         }

        // Hàm render các sản phẩm trong giỏ hàng ra giao diện
        function renderCartItems() {
            cartItemsContainer.innerHTML = ''; // Xóa nội dung hiện tại trong container để vẽ lại
            // Kiểm tra nếu giỏ hàng trống thì hiển thị thông báo
           if (cart.length === 0) {
               cartItemsContainer.innerHTML = '<p>Không có sản phẩm nào trong giỏ hàng.</p>';
               return; // Dừng hàm ở đây nếu giỏ hàng rỗng
           }
           // Lặp qua từng sản phẩm trong giỏ hàng để vẽ ra giao diện
           cart.forEach(item => {
               // Tạo div container cho mỗi sản phẩm
               const cartItemDiv = document.createElement('div');
               cartItemDiv.classList.add('cart-item-container');
                 // Tạo div container cho hình ảnh sản phẩm
                const productImageContainer = document.createElement('div');
                productImageContainer.classList.add('cart-item-image-container');
                 // Tạo hình ảnh sản phẩm
                 const productImage = document.createElement('img');
                 productImage.src = getProductImage(item.name); // Lấy đường dẫn ảnh từ hàm getProductImage
                 productImage.alt = item.name; // Thêm thuộc tính alt cho hình ảnh
               productImageContainer.appendChild(productImage); // Thêm hình ảnh vào container
                 cartItemDiv.appendChild(productImageContainer); // Thêm container hình ảnh vào div sản phẩm

                 // Tạo div chứa thông tin sản phẩm
                const itemInfo = document.createElement('div');
                itemInfo.classList.add('cart-item-info');
                itemInfo.innerHTML = `<h3>${item.name}</h3><span>${item.price}</span>`; // Thêm tên và giá sản phẩm vào div
                cartItemDiv.appendChild(itemInfo); // Thêm thông tin sản phẩm vào div sản phẩm

               // Tạo div chứa số lượng và nút tăng giảm số lượng
               const itemQuantity = document.createElement('div');
                itemQuantity.classList.add('cart-item-quantity');
               itemQuantity.innerHTML = `<label>Số lượng:</label><button onclick="decreaseQuantity('${item.name}')">-</button><span>${item.quantity}</span><button onclick="increaseQuantity('${item.name}')">+</button>`; // Thêm label, số lượng và các nút tăng giảm
               cartItemDiv.appendChild(itemQuantity); // Thêm số lượng sản phẩm vào div sản phẩm

                 // Tạo nút xóa sản phẩm
            const removeItemButton = document.createElement('span');
              removeItemButton.classList.add('cart-item-remove');
            removeItemButton.innerHTML = `<i class="fa-solid fa-trash-can" onclick="removeItem('${item.name}')"></i>`; // Thêm nút xóa sản phẩm
             cartItemDiv.appendChild(removeItemButton); // Thêm nút xóa sản phẩm vào div sản phẩm

           cartItemsContainer.appendChild(cartItemDiv); // Thêm div sản phẩm hoàn chỉnh vào container chính
         });
        }

        // Hàm tăng số lượng sản phẩm trong giỏ hàng
      function increaseQuantity(productName) {
            cart = cart.map(item => { // Sử dụng map để tạo một mảng mới sau khi cập nhật
              if (item.name === productName) { // Nếu tên sản phẩm trong giỏ trùng với tên sản phẩm được truyền vào
                   item.quantity++; // Tăng số lượng của sản phẩm đó lên 1
              }
              return item; // Trả về sản phẩm đã cập nhật vào mảng mới
            });
           localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng đã cập nhật vào localStorage
            renderCartItems(); // Gọi hàm render lại giỏ hàng sau khi cập nhật số lượng
           updateCartCount(); // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
           calculateTotalPrice(); // Cập nhật lại tổng giá trị của giỏ hàng
        }

        // Hàm giảm số lượng sản phẩm trong giỏ hàng
      function decreaseQuantity(productName) {
            cart = cart.map(item => { // Sử dụng map để tạo một mảng mới sau khi cập nhật
                if (item.name === productName && item.quantity > 1) { // Nếu tên sản phẩm trong giỏ trùng với tên sản phẩm được truyền vào và số lượng lớn hơn 1
                    item.quantity--; // Giảm số lượng của sản phẩm đó xuống 1
               }
               return item; // Trả về sản phẩm đã cập nhật vào mảng mới
            });
           localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng đã cập nhật vào localStorage
            renderCartItems(); // Gọi hàm render lại giỏ hàng sau khi cập nhật số lượng
           updateCartCount(); // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
           calculateTotalPrice(); // Cập nhật lại tổng giá trị của giỏ hàng
        }

       // Hàm xóa sản phẩm khỏi giỏ hàng
      function removeItem(productName) {
          cart = cart.filter(item => item.name !== productName); // Sử dụng filter để tạo một mảng mới, bỏ qua sản phẩm có tên trùng với tên được truyền vào
           localStorage.setItem('cart', JSON.stringify(cart)); // Lưu giỏ hàng đã cập nhật vào localStorage
           renderCartItems(); // Gọi hàm render lại giỏ hàng sau khi xóa sản phẩm
          updateCartCount(); // Cập nhật số lượng sản phẩm trên biểu tượng giỏ hàng
           calculateTotalPrice(); // Cập nhật lại tổng giá trị của giỏ hàng
      }
       // Gọi các hàm khởi tạo để vẽ giỏ hàng khi trang vừa load
       updateCartCount(); // Cập nhật số lượng sản phẩm ở trên biểu tượng giỏ hàng
        renderCartItems(); // Render các sản phẩm trong giỏ hàng
        calculateTotalPrice(); // Tính và hiển thị tổng giá trị của giỏ hàng