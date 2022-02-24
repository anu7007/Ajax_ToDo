$(document).ready(function () {

    $.ajax({
        method: "POST",
        url: "todo.php",
        data: { name: $("#tskid").val(), action: "start" },
        dataType: "JSON"
    }).done(function (data) {
        console.log(data);
        disply(data)
        disply2(data)
    });

    $("#btn").show();
    $("#updatebtn").hide();

});

$("#btn").click(function (e) {
    e.preventDefault();


    $.ajax({
        method: "POST",
        url: "todo.php",
        data: { name: $("#tskid").val(), action: "add" },
        dataType: "JSON"
    }).done(function (data) {
        console.log(data);
        disply(data)
    });

})
$("#updatebtn").click(function (e) {
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "todo.php",
        data: { name: $("#tskid").val(), action: "update", id: $("#hidenid").val() },
        dataType: "JSON"
    }).done(function (data) {
        console.log(data);
        disply(data)

        $("#btn").show();
        $("#updatebtn").hide();
    });

})


$("#alllist").on("click", ".editbtn", function () {

    $("#btn").hide();
    $("#updatebtn").show();


    let id = $(this).data('pid');
    let txt = $(this).data('text');
    $("#tskid").val(txt);
    $("#hidenid").val(id);
})

$("#alllist").on("click", ".check", function () {

    let pid = $(this).val();
    $.ajax({
        method: "POST",
        url: "todo.php",
        data: { id: pid, action: "check" },
        dataType: "JSON"
    }).done(function (data) {
        console.log("after delete" + data);
        console.log(data);
        disply(data)
        disply2(data)
        console.log(pid);
    });
    console.log(pid);

})


$("#alllist").on("click", ".delbtn", function () {

    let pid = $(this).data('pid');
    let txt = $(this).data('text');
    $.ajax({
        method: "POST",
        url: "todo.php",
        data: { id: pid, action: "delete" },
        dataType: "JSON"
    }).done(function (data) {
        console.log("after delete" + data);
        console.log(data);
        disply(data)
        console.log(pid);
    });

})

function disply(data) {
    let list = "<ul>";
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        console.log(i);

        if (obj['check'] == "f") {


            list += "<li><input class=check value=" + obj['id'] + " type=checkbox >" + obj['name'] + "<a href=# data-pid=" + obj['id'] + " data-text=" + obj['name'] + " class=editbtn >edit</a><a href=# data-pid=" + obj['id'] + " data-text=" + obj['name'] + "  class=delbtn >delete</a></li>"


        }
    }
    list += "</ul>";
    $("#alllist").html(list);
    $("#tskid").val("");
}

function disply2(data) {
    let list = "<ul>";
    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        console.log(i);

        if (obj['check'] == "t") {


            list += "<li><input class=check value=" + obj['id'] + " type=checkbox >" + obj['name'] + "<a href=# data-pid=" + obj['id'] + " data-text=" + obj['name'] + " class=editbtn >edit</a><a href=# data-pid=" + obj['id'] + " data-text=" + obj['name'] + "  class=delbtn >delete</a></li>"
       }
    }
    list += "</ul>";
    $("#completed").html(list);
    $("#tskid").val("");
}