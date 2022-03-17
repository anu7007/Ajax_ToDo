$(document).ready(function () {
    $(document).on("click", "#addBtn", function () {
      
      $.ajax({
        url: "todo.php",
        method: "POST",
        data: { input: $("#new-task").val() },
      }).done(function (data) {
        
        d = $.parseJSON(data);
        displayTodo(d);
        $("#new-task").val("");
      });
    });
  });
  $(document).ready(function () {
    $("#incomplete-tasks").on("click", "#delete", function () {
      $.ajax({
        url: "todo.php",
        method: "POST",
        data: { "input-pos": $(this).data("index") },
        datatype: "JSON",
      }).done(function (data) {
        console.log("hii");
        d = $.parseJSON(data);
        displayTodo(d);
      });
    });
  });
  $(document).ready(function () {
    $(document).on("click", ".edit", function () {
      var index = $(this).data("ind");
      $.ajax({
        url: "todo.php",
        method: "POST",
        data: { ipos: $(this).data("ind") },
        datatype: "JSON",
      }).done(function (data) {
        d = $.parseJSON(data);
        // displayTodo(d);
        text1 = "";
        text1 +=
          '<input id="new-task" type="text"><button id="addBtn" name="addBtn">Add</button><button id="updateBtn" data-pid=' +
          index +
          ' name="updateBtn">Update</button>';
        $("#para").html(text1);
        $("#new-task").val(d[index]);
        $("#addBtn").hide();
        $("#updateBtn").show();
        displayTodo(d);
      });
    });
  });
  $(document).ready(function () {
    $(document).on("click", "#updateBtn", function () {
      $("#addBtn").show();
      $("#updateBtn").hide();
      $.ajax({
        url: "todo.php",
        method: "POST",
        data: { inputUpdt: $("#new-task").val(), myIndex: $(this).data("pid") },
        datatype: "JSON",
      }).done(function (data) {
        d = $.parseJSON(data);
        displayTodo(d);
      });
    });
  });
  
  $(document).ready(function () {
    $("#incomplete-tasks").on("change", "#check", function () {
      $.ajax({
        url: "todo.php",
        method: "POST",
        data: { pos: $(this).data("check") },
        datatype: "JSON",
      }).done(function (data) {
        d = $.parseJSON(data);
        displayTodo(d["incomplete"]);
        displayComplete(d["complete"]);
      });
    });
  });
  
  $(document).ready(function () {
    $("#completed-tasks").on("change", "#check", function () {
      $.ajax({
        url: "todo.php",
        method: "POST",
        data: { pos: $(this).data("check") },
        datatype: "JSON",
      }).done(function (data) {
        d = $.parseJSON(data);
        displayTodo(d["incomplete"]);
        displayComplete(d["complete"]);
      });
    });
  });
  
  $(document).ready(function () {
    $("#completed-tasks").on("click", "#delete1", function () {
      $.ajax({
        url: "todo.php",
        method: "POST",
        data: { "input-posit": $(this).data("index1") },
        datatype: "JSON",
      }).done(function (data) {
        d = $.parseJSON(data);
        displayComplete(d);
      });
    });
  });
  function displayTodo(myData) {
    var text = "";
    for (i = 0; i < myData.length; i++) {
      text +=
        '<li><input type="checkbox" data-check=' +
        i +
        ' id="check" name="check"><label>' +
        myData[i] +
        '</label><input type="text"><button id="edit" data-ind=' +
        i +
        ' name="editBtn" class="edit">Edit</button><button id="delete" data-index=' +
        i +
        ' class="delete" name="deleteBtn">Delete</button></li>';
    }
    $("#incomplete-tasks").html(text);
  }
  function displayComplete(myData) {
    var text = "";
    for (i = 0; i < myData.length; i++) {
      text +=
        '<li><input type="checkbox" checked name="check"><label>' +
        myData[i] +
        '</label><input type="text"><button id="delete1" data-index1=' +
        i +
        ' class="delete" name="deleteBtn">Delete</button></li><input type="text" hidden name="myVal" value="' +
        i +
        '">';
    }
    $("#completed-tasks").html(text);
  }