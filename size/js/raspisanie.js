var raspisanie_url = '../../archimed_b/raspisanie.php';

$(document).ready(function () {
    $.ajax({
        url:raspisanie_url,
        type:"GET",
        dataType:"html",
        success:function(response){
            $("#raspisanie").html(response);
        }
    })
})