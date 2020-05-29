var myurl='../../archimed_b/';
var enterurl = myurl+'enter.php';


$(document).ready(function () {
    $("#vhod").on('click',function (event) { 
        event.preventDefault();
        let timerInterval;
        Swal.fire({
            title: 'Вход в систему',
            html: 'Пожалуйста, подождите...',
            onBeforeOpen:() => {
                Swal.showLoading();
                enter_system('enter_form',enterurl);
            },
            timer: 1000,
            onClose: () => {
                clearInterval(timerInterval);
            }
        })
     })
})


function enter_system(ajax_form,url){
    $.ajax({
        url:url,
        type:'POST',
        dataType:'html',
        data:$("#"+ajax_form).serialize(),
        success:function(response){
            switch (response){
                case 'Введите пароль.':{
                    Swal.fire({
                        icon:'question',
                        title:'Что-то пошло не так...',
                        text: response,
                    });
                    break;
                }
                case 'Пользователя не существует.':{
                    Swal.fire({
                        icon:'warning',
                        title:'Ошибка!',
                        text:response,
                    });
                    break;
                }
                case 'Пароль неверный.':{
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