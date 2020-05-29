var admin_url = "../../archimed_b/admin/";

var show_requests_url = admin_url + "show_requests.php";
var show_prepod_url = admin_url + "show_prepods.php";
var reg_surl = admin_url + "new_prepod.php";

var show_children_url = admin_url + "show_children.php";
var reg_surl2 = admin_url + "new_child_parent.php";

var show_news_url = admin_url + "show_news.php";

var npost_surl = admin_url + "new_post.php";



$(document).ready(function(){
    $("#all-req").on('click',function () { 
        $.ajax({
            url:show_requests_url,
            type:"GET",
            dataType:'html',
            success:function (response) { 
                $("#requests").html(response);
             }
        })
    })

    $("#all-prep").on('click',function(){
        $("#new_prepod").hide();
        show_prepods(show_prepod_url);
    })

    $("#prepod_action").on('change',function(){
        switch($("#prepod_action").val())
        {
            case 'Добавить преподавателя':{
                $("#new_prepod").show();
                $("#all_prepods").hide();
                break;
            }
            case 'Просмотреть преподавателей':{
                $("#new_prepod").hide();
                $("#all_prepods").show();
                show_prepods(show_prepod_url);
                break;
            }
        }
    })

    $("#btn-add-prepod").on('click',function(event){
        event.preventDefault();
        let timerInterval;
        Swal.fire({
         title: 'Добавление',
                html: 'Пожалуйста, подождите...',
                timer: 1000,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                onClose: () => {
                    clearInterval(timerInterval);
                    add_prepod('add_prepod_form',reg_surl);
                }
    })
    })

    $("#all-stud").on('click',function(){
        $("#new_child").hide();
        $("#show_child").show();
        show_children(show_children_url);
    });

    $("#child").on('change',function(){
        switch ($("#child").val())
        {
            case "Просмотреть учеников":
                {
                    $("#new_child").hide();
                    $("#show_child").show();
                    show_children(show_children_url);
                    break;
                }
            case "Добавить ученика":
                {
                    $("#show_child").hide();
                    $("#new_child").show();
                    break;
                }
        }
    })

    $("#btn-add-child").on('click',function(event){
        event.preventDefault();
        let timerInterval;
        Swal.fire({
         title: 'Добавление',
                html: 'Пожалуйста, подождите...',
                timer: 1000,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
                onClose: () => {
                    clearInterval(timerInterval);
                    add_child('child_parent_form',reg_surl2);
                }
    })
    })

    $("#all-news").on('click',function(){
        $("#post_status").show();
        $("#new_post").hide();
        show_news(show_news_url);
    })

    $("#news").on('change',function(){
        switch($("#news").val())
        {
            case "Изменить статус":{
                $("#post_status").show();
                $("#new_post").hide();
                show_news(show_news_url);
                break;
            }
            case "Добавить новость":{
                $("#post_status").hide();
                $("#new_post").show();
                break;
            }
        }
    })
    $("#btn-add-post").on('click',function(event)
    {
        event.preventDefault();
        let timerInterval
        Swal.fire({
            title: 'Добавление',
            html: 'Пожалуйста, подождите...',
            timer: 1000,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
            onClose: () => {
                clearInterval(timerInterval);
                add_post('add_post_form',npost_surl);
            }
        });
    })



})



//Функции

function show_news(url){
    $.ajax({
        url:url,
        type:"GET",
        dataType:'html',
        success:function(response){
            $("#all_posts").html(response);
        }
    })
}


function show_children(url){
    $.ajax({
        url:url,
        type:"GET",
        dataType:"html",
        success:function(response){
            $("#child_table").html(response);
        }
    })
}


function show_prepods(url){
    $.ajax({
        url:url,
        type:"GET",
        dataType:"html",
        success:function(response){
            $("#prepod_table").html(response);
        }
    })
}


function add_post(ajax_form,url){
    $.ajax({
        url:url,
        type:"POST",
        dataType:'html',
        data:$("#"+ajax_form).serialize(),
        success:function (response) { 
            Swal.fire(response)
         }
    })
}


function add_child(ajax_form,url){
    $.ajax({
        url:url,
        type:"POST",
        dataType:"html",
        data:$("#"+ajax_form).serialize(),
        success:function(response)
        {
            Swal.fire(response);
        }
    })
}

function add_prepod(ajax_form, url) {
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
                                confirmButtonText:'Ок'
                            });
                            break;
                        }
                        default:{
                            Swal.fire(
                                'Режим отладки',
                                response,
                                'info'
                                );
                            break;
                        }
                    }
        },
        error: function(){
            Swal.fire(
                'ERROR!',
                'Ошибка сервера.',
                'error'
            )
        }
    })
}


