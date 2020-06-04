var f_url = "../../archimed_b/show_feedback.php";

$(document).ready(function(){
    show_feedback(f_url);
})

function show_feedback(url) {
    $.ajax({
        url:url,
        type:'GET',
        dataType:'html',
        success:function(response){
            $("#feedback-list").html(response);
        }
    })
}