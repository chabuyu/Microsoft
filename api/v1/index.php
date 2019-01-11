<?php
//关联数据库
include("../db.php");
//遍历表单


$sql = "select * from timu";
// echo $sql;
//得到行数
$res = mysql_query($sql);
// echo $res;

//循环表单
$arr = array();
while($row = mysql_fetch_assoc($res)){
    array_push($arr,$row);
}
echo json_encode($arr);
// $response = array('res_code' => 1, "res_body" => $arr);

// echo json_encode($response);
?>