<?php

include 'src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST') {

    $users = json_decode(file_get_contents('php://input'));

    $insert = "INSERT INTO `contact`(`username`, `email`,`message`) VALUES (?,?,?)";

    $stmt = $dbcon->prepare($insert);

    $stmt->bindParam(1, $users->username);
    $stmt->bindParam(2, $users->email);
    $stmt->bindParam(3, $users->message);

    if ($stmt->execute()) {
        echo json_encode(['status' => 201, 'message' => "contact submitted"]);
    } else {
        echo json_encode(['status' => 500, 'message' => "contact not submitted!"]);
    }
}
if ($method == 'GET') {

    $select = "SELECT * FROM `contact`";

    $stmt = $dbcon->prepare($select);

    if ($stmt->execute()) {
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(['status' => 500, 'message' => 'No Data!']);
    }

}

