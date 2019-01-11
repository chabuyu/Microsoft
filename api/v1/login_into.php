<?php
// post 跨域
header('Access-Control-Allow-Origin:*');

//关联db文件
include("../db.php");
//获得传入的数据
$email = $_POST['email'];
$password = $_POST['password'];
//查看用户名和密码是否正确
$sqlSelect = "select * from user where email= '$email' and password= '$password'";

$res = mysql_query($sqlSelect);
if(mysql_fetch_assoc($res) > 0){
	$arr = array('res_code' => 1, 'res_massage' => "登录成功");
}else{
	$arr = array('res_code' => 0,'res_massage' => "密码错误");
}
echo json_encode($arr);
?>