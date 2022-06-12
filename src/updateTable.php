<?php

require_once("./db/db.php");

$post = json_decode(file_get_contents("php://input"), true);

if($post) {
    $tableID = $post["id"];
    $name = $post["name"];
    $table = $post["table"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "UPDATE `tables` SET `name` = :name, `table` = :table WHERE `id` = :id";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["name" => $name, "table" => json_encode($table), "id" => $tableID]);

        echo '../html/index.html';
    } catch (PDOException $e){
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => $e]);
    }
}

?>