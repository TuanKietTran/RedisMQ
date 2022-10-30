# Cache dữ liệu với Redis

Caching là một kỹ thuật tăng độ truy xuất dữ liệu và giảm tải cho hệ thống. Cache là nơi lưu tập hợp các dữ liệu, thường có tính chất nhất thời, cho phép sử dụng lại dữ liệu đã lấy hoặc tính toán trước đó, nên sẽ giúp tăng tốc cho việc truy xuất dữ liệu ở những lần sau.

## Lợi ích của việc cache data
- Tăng tốc độ xử lý, thay vì phải gọi API bên thứ ba hoặc query database nhiều lần. Ngoài ra, giảm số lần gọi API hoặc query database còn giảm thiểu băng thông truyền tải giữa các server và giảm thiểu xử lý từ CPU nhất là với những dữ liệu được sử dụng nhiều lần trong ứng dụng.
- Vẫn có thể truy vẫn được data khi không có kết nối giữa các server.
- Đáp ứng được truy vấn lớn trong thời gian ngắn. trả về dữ liệu gần như ngay lập tức với những dữ liệu có trong bộ nhớ cache.

## Hạn chế

- Tốn thêm một vùng nhớ để lưu dữ liệu cache (dù cũng không nhiều mấy).
- Nếu data cache chỉ dùng đúng một lần thì việc cache không những không có lợi ích gì mà còn làm chậm ứng dụng.
- Nếu không xóa cache khi không còn sử dụng sẽ gây ra việc lãng phí bộ nhớ.

## Hiện thực Cache với Redis và Nodejs

Để hạn chế việc request nhiều lần đến server khách hoặc xử lý phức tạp, khi một request được gọi đến server thì trước tiên server sẽ kiểm tra xem dữ liệu có trong server redis hay chưa? Nếu có rồi thì lấy dữ liệu trong cache trả về cho người dùng. Nếu chưa có thì thực hiện thao tác, trả về cho người dùng đồng thời cũng lưu dữ liệu đó vào cache.

![image](https://images.viblo.asia/89732de7-b554-422a-9ed9-e4ef9352fc29.png)

## Sử dụng

Yêu cầu máy đã có sẵn git, redis và node.js

Kiểm tra git đã có sẵn trên máy bằng lệnh

```console
git --version
```

Kiểm tra redis server đã có sẵn trên máy bằng lệnh

```console
redis-server -v
```

Kiểm tra node.js đã có sẵn trên máy bằng lệnh

```console
node -v
```

Clone repo

```console
git clone https://github.com/TuanKietTran/RedisMQ.git && cd "$_"
```

Cài đặt package cho server

```console
npm i --save
```

Chạy server

```console
npm run start
```

Mở Trình duyệt, truy cập vào trang [localhost tại port 3000: http://localhost:3000/photos](http://localhost:3000/photos). Nếu có dòng `"fromCache":false`, server đang hoạt động tốt.

Reload lại trang [localhost tại port 3000](http://localhost:3000/photos). Nếu có dòng `"fromCache":true`, server chạy đúng yêu cầu.

Mở Redis Client ở một terminal mới

```console
redis-cli
```

Chạy lệnh

```console
flushall
```
Reload lại trang [localhost tại port 3000](http://localhost:3000/photos). Nếu có dòng `"fromCache":false`, server chạy đúng yêu cầu.


## Reference
https://viblo.asia/p/cache-du-lieu-nodejs-voi-redis-bJzKmPNr59N

https://www.digitalocean.com/community/tutorials/how-to-implement-caching-in-node-js-using-redis

