
    function searchProducts() {
        const input = document.getElementById('search-input').value.toLowerCase(); // Lấy giá trị từ ô tìm kiếm
        const products = document.querySelectorAll('.new-product-1'); // Lấy tất cả sản phẩm

        products.forEach(product => {
            const title = product.querySelector('.title-new-product a').textContent.toLowerCase(); // Lấy tiêu đề sản phẩm
            if (title.includes(input)) {
                product.style.display = ''; // Hiển thị sản phẩm nếu có kết quả khớp
            } else {
                product.style.display = 'none'; // Ẩn sản phẩm nếu không có kết quả khớp
            }
        });
    }

