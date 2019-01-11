<?php
// post 跨域
header('Access-Control-Allow-Origin:*');

//关联db文件
include("../db.php");
//获得传入的数据
$email = $_POST['email'];
$password = $_POST['password'];

	// 用户不存在，允许插入
    
	$sql = "insert into user (email, password) values ('$email','$password')";
    //判断是否插入成功
	$isSucc = mysql_query($sql);
    
	if($isSucc){
		$arr = array('res_code' => 1, 'res_message' => "注册成功");
		echo json_encode($arr);
	}else{
		$arr = array('res_code' => 0, 'res_message' => "数据库操作失败");
		echo json_encode($arr);
}
?>