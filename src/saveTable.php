<?php

require_once("./db/db.php");

$post = json_decode(file_get_contents("php://input"), true);

if($post) {
    $name = $post["name"];
    $creator = $post["creator"];
    $rows = $post["rows"];
    $columns = $post["columns"];
    $table = $post["table"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $selectSQL = "SELECT `id` FROM `users` WHERE `email` = :email";
        $stmt = $connection->prepare($selectSQL);
        $stmt->execute(["email" => $creator]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $insertSQL = "INSERT INTO `tables` (`name`, `creatorID`, `rows`, `columns`, `table`) VALUES (:name, :creatorID, :rows, :columns, :table)";
        $stmt = $connection->prepare($insertSQL);
        $stmt->execute(["name" => $name, "creatorID" => $result["id"], "rows" => $rows,"columns" => $columns, "table" => json_encode($table)]);

        echo '../html/index.html';
    } catch (PDOException $e){
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => $e]);
    }
}

?>