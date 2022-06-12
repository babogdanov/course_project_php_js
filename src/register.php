<?php

require_once("./db/db.php");

$post = json_decode(file_get_contents("php://input"), true);

if($post && isset($post["email"]) && isset($post["password"])) {
    $email = $post["email"];
    $password = $post["password"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "INSERT INTO `users` (`email`, `password`) VALUES (:email, :password)";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["email" => $email, "password" => password_hash($password, PASSWORD_DEFAULT)]);

        echo json_encode(["status" => 201]);
    } catch (PDOException $e){
        echo json_encode(["status" => 500, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => 400, "message" => "something is not set in request body"]); 
 }

?>