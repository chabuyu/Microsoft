<?php
include("../db.php");

$id = $_POST['id'];
$title = $_POST['title'];
$answer = $_POST["answer"];

//sql语句
$sql = "update timu set title='$title', answer='$answer' where id='$id'";
 
$isSucc = mysql_query($sql);

if($isSucc){
	$arr = array(
		'res_code' => 1, 
		'res_message' => '成功',
		'res_body' => array(
			'id' => $id,
			'title' => $title,
			'answer' => $answer
 
		)
	);
}
echo Json_encode($arr);
?>