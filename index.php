<?php
include('todo.php');
?>
<html>
<head>
    <title>TODO List</title>
    <link href="style.css" type="text/css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h2>TODO LIST</h2>
        <h3>Add Item</h3>
        <p id="para">
            <input id="new-task" type="text">
            <button id="addBtn" name="addBtn">Add</button>
        </p>

        <h3>Todo</h3>
        <ul id="incomplete-tasks">
            <?php echo displayTodo(); ?>
        </ul>

        <h3>Completed</h3>
        <ul id="completed-tasks">
            </ul>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"></script>
</body>

</html>