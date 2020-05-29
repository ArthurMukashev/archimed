var exit_url = myurl+"exit.php";

$("#exitbtn").css("color","blue");


$(document).ready(function(){    
    $("#exitbtn").on('click',function(event){
        event.preventDefault();
        let timerInterval;
        Swal.fire({
            title:'Выход из системы',
            html:'Пожалуйста, подождите...',
            onBeforeOpen: () => {
                Swal.showLoading();
                exit_system(exit_url);
            }
        })
    })
})

function exit_system(url){
    $.ajax({
        url:url,
        type:"GET",
        dataType:"html",
        success:function(response){
            window.location = response;
        }
    })
}