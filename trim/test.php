<?php
if(isset($_POST) && !empty($_POST)) {
    $succes = [
        'status'=>true,
        'message' => 'Спасибо. Мы скоро с вами свяжемся'
    ];
    $error =[
        'status'=>false,
        'message' => 'Ошмбка передачи!! Попробуйте позже'
    ];
    sleep(2);
    echo json_encode($succes);
}