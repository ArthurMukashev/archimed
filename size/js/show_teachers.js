var show_teachers_url = "../../archimed_b/teacher/show_teachers.php";

$.ajax({
    url:show_teachers_url,
    type:"GET",
    dataType:"html",
    success:function(response){
        $("#teachers").html(response);
    },
    error:$("#teachers").html('Нет связи')
})