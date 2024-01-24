<?php


include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $username = $_GET['username'];
        $select = "SELECT * FROM `posts` WHERE `username`=?";
        $stmt = $dbcon->prepare($select);
        $stmt->bindParam(1, $username);
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($posts) {
            echo json_encode($posts);
        } else {
            echo 404;
        }

        break;
}


