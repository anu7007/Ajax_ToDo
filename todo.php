<?php
session_start();
if (!isset($_SESSION['todo'])) {

  $_SESSION['todo'] = array();
}
$chose = $_POST['action'];
$tsk = $_POST['name'];
$id = $_POST['id'];
if ($chose == 'start') {
  echo json_encode($_SESSION['todo']);
}


switch ($chose) {


  case "add":
    add($tsk);
    echo json_encode($_SESSION['todo']);
    break;

  case 'delete':
    delete($id);
    echo json_encode($_SESSION['todo']);
    break;

  case "update":
    update($tsk, $id);
    echo json_encode($_SESSION['todo']);
    break;

  case "check":
    complete($id);
    echo json_encode($_SESSION['todo']);
    break;
}

function add($tsk)
{
  $num = count($_SESSION['todo']) + 1;
  $task = array(
    "id" => $num,
    "name" => $tsk,
    "check" => "f",

  );
  array_push($_SESSION['todo'], $task);
}
function update($tsk, $id)
{
  foreach ($_SESSION['todo'] as $k => $arr) {

    if ($arr['id'] == $id) {
  
      $_SESSION['todo'][$k]['name'] = $tsk;
      break;
    }
  }
}

function delete($id)
{
  foreach ($_SESSION['todo'] as $k => $arr) {
    if ($arr['id'] == $id) {
    array_splice($_SESSION['todo'], $k, 1);
      return;
    }
  }
}


function disply()
{
  $list = "";
  foreach ($_SESSION['todo'] as $k => $arr) {

    if ($arr['check'] == "f") {

      $list .= "<form action='' method=GET><li><h4> <input type=hidden name=id value=" . $k . ">><input type=checkbox name=action value=check onChange=this.form.submit()><label><h3 style=width:60px%>" . $arr['name'] . "</h3><a  &nbsp&nbsp href=todo.php?id=" . $k . "&action=edit&val=" . $arr['name'] . ">edit&nbsp</a><a href=todo.php?id=" . $k . "&action=delete>delete</a> </h4></li></form>";
    }
  }
  echo $list;
}

function complete($id)
{

  foreach ($_SESSION['todo'] as $k => $arr) {

    if ($arr['id'] == $id) {


      $_SESSION['todo'][$k]['check'] = "t";
    }
  }
}
