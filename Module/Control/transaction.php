<?php
ob_start();
session_start();

if(isset($_POST['action'])){
    if($_POST['action'] == 'post'){
        $data = $_POST;
        $_SESSION['trade_data'] = $data;
    }else if($_POST['action'] == 'unset'){
        unset($_SESSION['trade_data']);
    }

}
else{
    if(isset($_SESSION['trade_data'])){
        echo json_encode($_SESSION['trade_data']);
    }
    echo false;
}
