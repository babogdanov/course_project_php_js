<?php
   if(isset($_FILES['csv'])){
      $fileAsArr = explode('.',$_FILES['csv']['name']);
      $fileExt=strtolower(end($fileAsArr));
    
      if($fileExt !== "csv"){
        echo json_encode(["status" => 400, "message" => "not csv file"]); 
      } else {
        $fileContent = file_get_contents($_FILES['csv']['tmp_name']);
        $table = array();
        $rows = explode("\n",$fileContent);
        foreach($rows as $row) {
            array_push($table, explode(';', $row));
        }
        echo json_encode(["status" => 200, "table" => $table]);
      }
   } else {
    echo json_encode(["status" => 400, "message" => "something is not set in request body"]); 
 }
?>