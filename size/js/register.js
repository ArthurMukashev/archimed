//var myurl='https://cors-anywhere.herokuapp.com/https://mbook1998.herokuapp.com/';
var myurl='../interactive_b/';
var surl=myurl+'register.php';


$(document).ready(function () {
    $('#btn').on('click',function (event) {
        event.preventDefault();
        let timerInterval
        Swal.fire({
            title: 'Регистрация',
                html: 'Пожалуйста, подождите...',
                timer: 1000,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                onClose: () => {
                    clearInterval(timerInterval);
                    add_user('ajax_form',surl);
        }
    })
})
})
function add_user(ajax_form, url) {
    $.ajax({
        url: url,
        type:'POST',
        dataType:'html',
        data:$("#"+ajax_form).serialize(),
        success: function (response) {
                    switch (response) {
                        case 'Проверьте введенные данные.':{
                            Swal.fire(
                                'Что-то пошло не так',
                                response,
                                'question'
                            )
                            break;
                        };
                        case 'Логин занят, выберите другой.':{
                            Swal.fire(
                                'Ошибка!',
                                response,
                                'warning'
                            )
                            break;
                        };
                        case 'Пароли не совпадают!':{
                            Swal.fire(
                                'Критическая ошибка!',
                                response,
                                'error'
                            );
                            break;
                        };
                        case 'Регистрация прошла успешно!':{
                            Swal.fire({
                                icon:'success',
                                title: response,
                                confirmButtonText: 'Войти в систему',
                            }).then((result)=>{
                                window.location="enter.html"
                            });
                            break;
                        }
                        default:{
                            Swal.fire(
                                'Режим отладки',
                                response,
                                'info'
                                );
                            break
                        }
                    }
                },
        error: function(){
            swal.fire(
                'ERROR!',
                'Ошибка сервера.',
                'error'
            )
        }
    })
}