//var myurl='https://cors-anywhere.herokuapp.com/https://mbook1998.herokuapp.com/';
var myurl='../interactive_b/';
var phpurl='enter.php';
var surl=myurl+phpurl;

$(document).ready(function(){
    $('#btn').on('click', function(event){
        event.preventDefault();
        let timerInterval
        Swal.fire({
            title: 'Вход в систему',
                html: 'Пожалуйста, подождите...',
                timer: 1000,
                onBeforeOpen: () => {
                    Swal.showLoading();
                    sendAjaxForm('ajax_form',surl);
                },
                onClose: () => {
                    clearInterval(timerInterval);
                }
        })
    })
})

function sendAjaxForm(ajax_form,url){
    $.ajax({
        url:url,
        type:'POST',
        dataType:'html',
        data:$("#"+ajax_form).serialize(),
        success:function(response){
            switch (response){
                case 'Проверьте введенные данные.':{
                    Swal.fire({
                        icon:'question',
                        title:'Что-то пошло не так...',
                        text: response,
                    });
                    break;
                }
                case 'Такого пользователя не существует.':{
                    Swal.fire({
                        icon:'warning',
                        title:'Ошибка!',
                        text:response,
                    });
                    break;
                }
                case 'Неверный пароль!':{
                    Swal.fire({
                        icon:'error',
                        title:'Критическая ошибка!',
                           text:response,
                       });
                       break;
                   }
                   default:{
                       window.location=response;
                   }
               }
           }
       })
}