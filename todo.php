<?php
session_start();
function displayTodo()
{
    if (isset($_SESSION['incomplete'])) {
        foreach ($_SESSION['incomplete'] as $key => $value) {
            echo '<li><input type="checkbox"><label>' . $value . '</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>';
        }
    } else echo "";
}
if (isset($_POST['input'])) {
    if (isset($_SESSION['incomplete'])) {
      if(!empty($_POST['input'])){
        array_push($_SESSION['incomplete'], $_POST['input']);
    } 
  }else {
        $_SESSION['incomplete'] = array($_POST['input']);
    }
  
}
if (isset($_POST['input-pos'])) {
    array_splice($_SESSION['incomplete'], $_POST['index-pos'], 1);
}
if (isset($_POST['inputUpdt'])) {
    if (isset($_SESSION['incomplete'])) {
        foreach ($_SESSION['incomplete'] as $key => $value) {
            if ($key == $_POST['myIndex']) {
                $_SESSION['incomplete'][$key] = $_POST['inputUpdt'];
            }
        }
    }
}
if (isset($_POST['pos'])) {
    $_SESSION['temp'] = $_SESSION['incomplete'][$_POST['pos']];
    array_splice($_SESSION['incomplete'], $_POST['pos'], 1);
    if (isset($_SESSION['complete'])) {
        array_push($_SESSION['complete'], $_SESSION['temp']);
    } else {
        $_SESSION['complete'] = array($_SESSION['temp']);
    }
    $myArr = array();
    $myArr['incomplete'] = $_SESSION['incomplete'];
    $myArr['complete'] = $_SESSION['complete'];
    echo json_encode($myArr);

} elseif (isset($_POST['index-posit'])) {
    array_splice($_SESSION['complete'], $_POST['index-posit'], 1);
    echo json_encode($_SESSION['complete']);
} else {
    if (isset($_SESSION['incomplete'])) {
        echo json_encode($_SESSION['incomplete']);
    }
}
?>