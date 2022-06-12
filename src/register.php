<?php

require_once("./db/db.php");

$post = json_decode(file_get_contents("php://input"), true);

if($post) {
    $username = $post["username"];
    $password = $post["password"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "INSERT INTO `users` (`username`, `password`) VALUES (:username, :password)";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["username" => $username, "password" => password_hash($password, PASSWORD_DEFAULT)]);

        echo '../html/login.html';
    } catch (PDOException $e){
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => $e]);
    }
}

?>