<?php
include '../Model/ShapeShiftApi.php';
$api = new ShapeShiftApi();
if($_GET['action'] == 'sendAmount'){
    echo json_encode($api->sendAmount($_POST));
}else if($_GET['action'] == 'txbyaddress'){
    echo json_encode($api->txbyaddress($_POST));
}
