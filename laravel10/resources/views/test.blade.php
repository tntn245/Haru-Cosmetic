<!-- resources/views/products.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Danh sách sản phẩm</title>
</head>
<body>
    <h1>Danh sách sản phẩm</h1>

    <form action="/vnpay" method="POST">
        @CSRF
        <input type="number" name="nextBillID" placeholder="nextBillID">
        <input type="number" name="query" placeholder="query">
        <button type="submit" name="redirect">Thanh toán VNPay</button>
    </form>
</body>
</html>