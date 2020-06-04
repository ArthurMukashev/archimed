var is_enter2_url = "../../archimed_b/isenter2.php";

$(document).ready(function () {
    $.ajax({
        url: is_enter2_url,
        type: "GET",
        dataType: "html",
        success: function (response) {
            if (!response) {
                $("#ost_otz").hide()
            }
            else {
                $("#ost_otz").show();
            }
        }
    })

    $("#ost_otz").on('click', function (event) {
        event.preventDefault();
        otziv();
    })
})



function otziv(){
    (async () => {

        const { value: text } = await Swal.fire({
          input: 'textarea',
          inputPlaceholder: 'Введите текст...',
          inputAttributes: {
            'aria-label': 'Type your message here'
          },
          showCancelButton: true,
          cancelButtonText:"Закрыть",
          confirmButtonText:"Отправить отзыв"
        })
        
        if (text) {
            $.ajax({
                url:'../../archimed_b/leave_otziv.php',
                type:"POST",
                dataType:'html',
                data:{"text":text},
                success:function(response){
                    Swal.fire(response);
                }
            })
        }
        })()
}