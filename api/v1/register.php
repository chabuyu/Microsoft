<?php
// post 跨域
header('Access-Control-Allow-Origin:*');

//关联db文件
include("../db.php");
//获得传入的数据
$email = $_POST['email'];

//不允许用户名重复   从服务器查询是否存在 重名
$sqlSelect = "select * from user where email='$email'";
// //得到1或者0  为 含有该Email的行数
$res = mysql_query($sqlSelect);
// echo $res;
// //
if(mysql_num_rows($res) > 0){
	$arr = array('res_code' => 0, 'res_message' => "用户名已存在");
    echo json_encode($arr);
}else{
	// 用户不存在，允许插入
    
		$arr = array('res_code' => 1, 'res_message' => "可以注册");
		echo json_encode($arr);
}
?>