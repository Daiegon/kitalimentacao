<?php
$nome = $_POST['nome'];
$telefone = $_POST['telefone'];
$data = date('d-m-Y H:i:s');

$myfile = fopen("../../cadastros.txt", "a+") or die("Unable to open file!");
$txt = "$nome, $telefone, $data\n"; 
fwrite($myfile, $txt);
fclose($myfile);

echo 'ok';

?>