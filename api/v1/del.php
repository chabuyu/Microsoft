<?php
include("../db.php");

$id = $_POST['id'];

$sql = "delete from timu where id='$id' ";

$isSucc = mysql_query($sql);

if($isSucc){
    $arr = array("res_code" => 1, "res_massage" => "删除成功");
}

echo Json_encode($arr);
?>