<?php


include '../src/connect.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $title = $_POST['title'];
        $content = $_POST['content'];
        $token = $_POST['token'];
        $image = $_FILES['image'];

        $file_ext = explode('.', $image['name']['data']);
        $bytes = random_bytes(16);

        $fileName = "ms_post-" . bin2hex($bytes) . '.' . end($file_ext);
        $path = "../files/posts/" . $fileName;
        $upload = move_uploaded_file($_FILES['image']['tmp_name']['data'], $path);
        if ($upload) {
            $select = "SELECT `username`,`avatar` FROM `users` WHERE `token`=?";
            $SltStmt = $dbcon->prepare($select);
            $SltStmt->bindParam(1, $token);
            $SltStmt->execute();
            $user = $SltStmt->fetch(PDO::FETCH_OBJ);
            if ($user) {
                $url = "http://localhost/Mahim-social/backend/files/posts/" . $fileName;
                $insert = "INSERT INTO `posts`(`title`, `content`, `image`, `token`,`avatar`,`username`) VALUES (?,?,?,?,?,?)";
                $stmt = $dbcon->prepare($insert);
                $stmt->bindParam(1, $title);
                $stmt->bindParam(2, $content);
                $stmt->bindParam(3, $url);
                $stmt->bindParam(4, $token);
                $stmt->bindParam(5, $user->avatar);
                $stmt->bindParam(6, $user->username);

                if ($stmt->execute()) {
                    echo 200;
                } else {
                    echo 500;
                }
            }


        } else {
            echo 500;
        }
        break;
    case 'GET':
        $token = $_GET['token'];
        $select = "SELECT * FROM `posts` WHERE `token`=?";
        $stmt = $dbcon->prepare($select);
        $stmt->bindParam(1, $token);
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($posts) {
            echo json_encode($posts);
        } else {
            echo 404;
        }

        break;
}


