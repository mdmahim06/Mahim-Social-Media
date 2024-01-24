<?php

include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

$token = $_GET['token'];

if ($method == 'GET') {
    $bio = $_GET['bio'];

    $updateBio = "UPDATE `users` SET `bio`=? WHERE `token`=?";

    $stmt = $dbcon->prepare($updateBio);
    $stmt->bindParam(1, $bio);
    $stmt->bindParam(2, $token);

    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'Bio updated successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Server Error!']);
    }


}
if ($method == 'POST') {
    $name = json_decode(file_get_contents('php://input'));

    $updateBio = "UPDATE `users` SET `fname`=?, `lname`=? WHERE `token`=?";

    $stmt = $dbcon->prepare($updateBio);
    $stmt->bindParam(1, $name->fname);
    $stmt->bindParam(2, $name->lname);
    $stmt->bindParam(3, $token);

    if ($stmt->execute()) {
        echo json_encode(['status' => 200, 'message' => 'Name updated successfully']);
    } else {
        echo json_encode(['status' => 500, 'message' => 'Server Error!']);
    }

}