<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $select = "SELECT * FROM `posts`";
            $stmt = $dbcon->prepare($select);
            $stmt->execute();
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($posts) {
                echo json_encode($posts);
            } else {
                echo 404;
            }
        } catch (\Throwable $th) {
            echo 500;
        }
        break;
}