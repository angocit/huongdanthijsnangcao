// Lấy id sản phẩm từ URL.
const getInfoProduct =async()=>{
    const param = new URLSearchParams(location.search);
    const productid = param.get('id');
    // Sử dụng fetch phương thức GET để lấy dữ liệu sản phẩm từ id sản phẩm.
    const response = await fetch(`http://localhost:3000/products/${productid}`);
    const product = await response.json();
    console.log(product);
    // Đổ dữ liệu sản phẩm vào ô input
    document.querySelector('input[name="id"]').value = product.id; // Đổ id vào input id
    document.querySelector('input[name="tensanpham"]').value = product.name; // Đổ tên sản phẩm vào input tên sản phẩm
    document.querySelector('input[name="anhsanpham"]').value = product.image; //  Đổ ảnh sản phẩm vào input Ảnh sp
    document.querySelector('select[name="danhmuc"]').value = product.cat_id; //  Đổ danh mục sản phẩm vào ô select danh mục
    document.querySelector('input[name="giatien"]').value = product.price; //  Đổ giá tiền vào ô input giá tiền
}
getInfoProduct();
const updateProduct = ()=>{
    event.preventDefault(); // Ngăn trình duyệt chuyển hướng.
    // - Lấy dữ liệu từ form
    const productid = document.querySelector('input[name="id"]').value; // Lấy ID sản phẩm từ ô input id sản phẩm
    const tensanppham = document.querySelector('input[name="tensanpham"]').value; // Lấy giá trị của ô input tên sản phẩm
    const anhsanpham = document.querySelector('input[name="anhsanpham"]').value; // Lấy giá trị của ô input Ảnh sp
    const danhmuc = document.querySelector('select[name="danhmuc"]').value; // Lấy giá trị của ô select danh mục
    const giatien = document.querySelector('input[name="giatien"]').value; // Lấy giá trị của ô input giá tiền
     // Sử dụng fetch phương thức POST để lưu dữ liệu; fetch('Link API')
// Với fetch xử lý post thì chúng ta cần thông số bao gồm:
//  - Link API bổ sung id sản phẩm vào sau,
//  - Phương thức PUT,
//  - body data

    // fetch('http://localhost:3000/products'+productid,{
    //    method: 'PUT', 
    //    body: JSON.stringify({
    //         "name":tensanppham,
    //         "image": anhsanpham,
    //         "cat_id":danhmuc,
    //         "price":giatien
    //    })
    // });
    const data = {
        "name":tensanppham,
        "image": anhsanpham,
        "cat_id":danhmuc,
        "price":giatien
    };
    fetch('http://localhost:3000/products/'+productid,{
       method: 'PUT', 
       body: JSON.stringify(data)
    });
    alert('Cập nhật sản phẩm thành công');
}