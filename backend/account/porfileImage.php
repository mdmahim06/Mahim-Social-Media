<?php


include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {
    $token = $_GET['token'];

    $file = $_FILES['imgData'];
    $file_ext = explode('.', $_FILES['imgData']['name']);
    $bytes = random_bytes(16);

    $fileName = "ms_pic-" . bin2hex($bytes) .'.'. end($file_ext);
    $path = "../files/users/" . $fileName;


    $upload = move_uploaded_file($_FILES['imgData']['tmp_name'], $path);
    if ($upload) {
        $url = "http://localhost/Mahim-social/backend/files/users/" . $fileName;
        $update = "UPDATE `users` SET `avatar`=? WHERE `token`=?";

        $stmt = $dbcon->prepare($update);
        $stmt->bindParam(1, $url);
        $stmt->bindParam(2, $token);

        if ($stmt->execute()) {
            echo 200;
        } else {
            echo 500;
        }

    } else {
        echo 500;
    }
}