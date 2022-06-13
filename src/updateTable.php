<?php

require_once("./db/db.php");

$post = json_decode(file_get_contents("php://input"), true);
if($post && isset($post["id"]) && isset($post["name"]) && isset($post["table"])) {
    $tableID = $post["id"];
    $name = $post["name"];
    $table = $post["table"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $sql = "UPDATE `tables` SET `name` = :name, `table` = :table WHERE `id` = :id";
        $stmt = $connection->prepare($sql);
        $stmt->execute(["name" => $name, "table" => json_encode($table), "id" => $tableID]);

        echo json_encode(["status" => 204]);
    } catch (PDOException $e){
        echo json_encode(["status" => 500, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => 400, "message" => "something is not set in request body"]); 
 }

?>