<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
 case 'GET':
    $id = $_GET['id'];
    $select = "SELECT * FROM `posts` WHERE `id`=?";
    $stmt = $dbcon->prepare($select);
    $stmt->bindParam(1,$id);
    $stmt->execute();
    $post = $stmt->fetch(PDO::FETCH_OBJ);
    if($post){
        echo json_encode($post);
    }else{
        echo 500;
    }
    break;
}