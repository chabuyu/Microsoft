<?php
//关联数据库
include("../db.php");
//获取传入的数据
$pageIndex = $_POST['pageIndex'];
$pageCount = $_POST['pageCount'];
//湖区所有数据的条数
$sqlAll = "select * from timu";
$resAll = mysql_query($sqlAll);
$rows = mysql_num_rows($resAll);
// //获取页数
$pages = ceil($rows/$pageCount);
//设置开始时从第几条开始
$start = ($pageIndex - 1) *$pageCount;
//按条件查询
$sql = "select * from timu limit $start, $pqgeCount";

//
$res = mysql_query($sql);
$arr = array();

while($row = mysql_fetch_assoc($res)){
    array_push($arr, $row);
}

$response = array('res_code' => 1, "res_body" => $arr, "pages" => $pages, "pageIndex" => $pageIndex);

echo json_encode($response);
//



$title = $_GET['title'];
$answer = $_GET['answer'];
// echo $title;
$sql ="select * from timu where title=$title";
$res = mysql_query($sql);
// echo $res;
if(mysql_num_rows($res) > 0){
    $arr = array('res_code' => 0, 'res_message' => "该题目已存在");
    echo json_encode($arr);
}else{
    $sqlAdd = "insert into timu (title, answer) values ('$title','$answer')";
    $isSucc = mysql_query($sqlAdd);
    if($isSucc){
        // $sqlname ="select * from timu where title='$title'";
        $arr = array("res_code" => 1, 'res_message' => "添加成功");
    }else{
        $arr = array("res_code" => 0, 'res_message' => "添加失败");
    }
    echo json_encode($arr);
}
?>