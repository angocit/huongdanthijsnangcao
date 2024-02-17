const addProduct = ()=>{
    event.preventDefault(); // Ngăn trình duyệt chuyển hướng.
    // - Lấy dữ liệu từ form
    const tensanppham = document.querySelector('input[name="tensanpham"]').value; // Lấy giá trị của ô input tên sản phẩm
    const anhsanpham = document.querySelector('input[name="anhsanpham"]').value; // Lấy giá trị của ô input Ảnh sp
    const danhmuc = document.querySelector('select[name="danhmuc"]').value; // Lấy giá trị của ô select danh mục
    const giatien = document.querySelector('input[name="giatien"]').value; // Lấy giá trị của ô input giá tiền
    // console.log(tensanppham,anhsanpham,giatien,danhmuc);
    // Sử dụng fetch phương thức POST để lưu dữ liệu; fetch('Link API')
// Với fetch xử lý post thì chúng ta cần thông số bao gồm:
//  - Link API,
//  - Phương thức POST,
//  - body data

    // fetch('http://localhost:3000/products',{
    //    method: 'POST', 
    //    body: JSON.stringify({
    //         "name":tensanppham,
    //         "image": anhsanpham,
    //         "cat_id":danhmuc,
    //         "price":giatien
    //    })
    // });
    if ((tensanppham.trim()=="") || (isNaN(giatien))){
        const mess = document.getElementById("mess");
        mess.innerHTML = 'Tên sản phẩm không được trống và giá tiền phải là số';
    }
    else {
    const data = {
        "name":tensanppham,
        "image": anhsanpham,
        "cat_id":danhmuc,
        "price":giatien
    };
    fetch('http://localhost:3000/products',{
       method: 'POST', 
       body: JSON.stringify(data)
    });
    alert('Thêm sản phẩm thành công');
    }
}
const renderProduct = async ()=>{
    // Xác định vị trí muốn hiển thị danh sách sản phẩm=> trong trường hợp này là tbody
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';// loại bỏ các thẻ html bên trong tbody.
    /* Cấu trúc của thẻ bên trong tbody
    <tbody>
        <tr>
            <td></td>
            ...
            <td></td>
        </tr>
    </tbody>
   */
    // Sử dụng fetch phương thức GET để Lấy dữ liệu từ trong data.
    const response = await fetch('http://localhost:3000/products');
    const product = await response.json();
    // console.log(product);
    // Duyệt mảng để đổ dữ liệu theo cấu trúc table vào tbody;
    // Dùng for, dùng map hoặc forEach để duyệt mảng 
    product.map((value,key)=>{
        // console.log(value);
        // khởi tạo thẻ tr
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${key+1}</td>
            <td>${value.name}</td>
            <td><img width="60" src = "${value.image}"/></td>
            <td>${value.cat_id}</td>
            <td>${value.price}</td>
            <td><a href="products-edit.html?id=${value.id}">Sửa</a><button onclick="delProduct('${value.id}')">Xóa</button></td>
        `;
        // Đổ tr vào tbody
        tbody.appendChild(tr);
    })
}
renderProduct();
const delProduct = (pid)=>{
    const conf = confirm('Bạn có thực sự muốn xóa sản phẩm này?');
    if (conf){
        // Sử dụng fetch phương thức delete để xóa sản phẩm và API của json-server phải có thêm id của sản phẩm
        // fetch('http://localhost:3000/products/'+pid,{
        // method: 'DELETE'
        // });
        fetch(`http://localhost:3000/products/${pid}`,{
         method: 'DELETE'
        });
        alert('Xóa sản phẩm thành công');
    }
}