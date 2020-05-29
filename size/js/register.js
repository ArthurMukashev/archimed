var phpurl = "../../archimed_b/register.php";


$(document).ready(function () { 
    $("#btn").on('click',function (event) { 
        event.preventDefault();
        let timerInterval
        Swal.fire({
            title: 'Отправка',
                html: 'Пожалуйста, подождите...',
                timer: 1000,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                onClose: () => {
                    clearInterval(timerInterval);
                    send_request('ajax_form',phpurl);
                            }
        })
    })
})

function send_request(ajax_form,url){
    $.ajax({
        url:url,
        type: "POST",
        dataType: "html",
        data:$("#"+ajax_form).serialize(),
        success: function (response) { 
            Swal.fire(response);
         }
    })
}