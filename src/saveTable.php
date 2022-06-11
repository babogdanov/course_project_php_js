<?php

require_once("./db/db.php");

$post = json_decode(file_get_contents("php://input"), true);

if($post) {
    $creator = $post["creator"];
    $rows = $post["rows"];
    $columns = $post["columns"];
    $table = $post["table"];

    try {
        $db = new DB();
        $connection = $db->getConnection();

        $selectSQL = "SELECT `id` FROM `users` WHERE `username` = :username";
        $stmt = $connection->prepare($selectSQL);
        $stmt->execute(["username" => $creator]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $insertSQL = "INSERT INTO `tables` (`creatorID`, `rows`, `columns`, `table`) VALUES (:creatorID, :rows, :columns, :table)";
        $stmt = $connection->prepare($insertSQL);
        $stmt->execute(["creatorID" => $result["id"], "rows" => $rows,"columns" => $columns, "table" => json_encode($table)]);

        echo '../public/html/index.html';
    } catch (PDOException $e){
        http_response_code(500);
        echo json_encode(["status" => "ERROR", "message" => $e]);
    }
}

?>