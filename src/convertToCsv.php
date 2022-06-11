# Broken
<?php


    header('Content-type: application/ms-excel');
    header('Content-Disposition: attachment; filename=sample.csv');
    
    $fp = fopen("php://output", "w");
    
    foreach($html->find('tr') as $element) {
      $td = array();
      foreach( $element->find('th') as $row) {
        if (strpos(trim($row->class), 'actions') === false && strpos(trim($row->class), 'checker') === false) {
          $td [] = $row->plaintext;
        }
      }
      if (!empty($td)) {
        fputcsv($fp, $td);
      }
    
      $td = array();
      foreach( $element->find('td') as $row) {
        if (strpos(trim($row->class), 'actions') === false && strpos(trim($row->class), 'checker') === false) {
          $td [] = $row->plaintext;
        }
      }
      if (!empty($td)) {
        fputcsv($fp, $td);
      }
    }
    
    fclose($fp);
?>