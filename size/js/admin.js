var admin_url = "../../archimed_b/admin/";

var show_requests_url = admin_url + "show_requests.php";
var show_prepod_url = admin_url + "show_prepods.php";
var reg_surl = admin_url + "new_prepod.php";

var show_children_url = admin_url + "show_children.php";
var reg_surl2 = admin_url + "new_child_parent.php";

var show_news_url = admin_url + "show_news.php";

var npost_surl = admin_url + "new_post.php";

var nsub_surl = admin_url + "new_subject.php";

var show_subjects_url = admin_url + "show_subjects.php";

var show_subject_prepod_url = admin_url + "show_subject_prepod_url.php";
var add_prepsub_url = admin_url + "add_prep_sub.php";
var add_childsub_url = admin_url + "add_child_sub.php"

var is_enter2_url = "../../archimed_b/isenter3.php";

$.ajax({
    url: is_enter2_url,
    type: "GET",
    dataType: "html",
    success: function (response) {
        if (!response) {
            $("#rasp").html('Страница недоступна');
            Swal.fire({
                'title': 'Внимание',
                'html': 'Страница доступна только администратору',
                onClose: () => {
                    let timerInterval
                    Swal.fire({
                        'title': 'Возврат на главную',
                        'html': 'Пожалуйста, подождите...',
                        timer: 1000,
                        onBeforeOpen: () => {
                            Swal.showLoading();
                            window.location = "index.html";
                        },
                        onClose: clearInterval(timerInterval)
                    })
                }
            })
        }
    }
})

$(document).ready(function () {
    // Начало обработки основных функций администратора
    //переход в пункт "Заявки"
    $("#all-req").on('click', function () {
        show_me('requests')
    });
    //конец пункта "Заявки"

    //переход в пункт "Преподаватели"
    $("#all-prep").on('click', function () {
        $("#new_prepod").hide();
        $("#prepod_action").val('Просмотреть преподавателей');
        $("#prepod_action").change();
        show_me('prepod_table');
    });
    //выбор действия "Добавить преподавателя или "Просмотреть преподавателей"
    $("#prepod_action").on('change', function () {
        $("#prepod_action").val() == 'Добавить преподавателя' ? (
            $("#new_prepod").show(),
            $("#all_prepods").hide()
        ) : (
                $("#new_prepod").hide(),
                $("#all_prepods").show(),
                show_me('prepod_table')
            )
    })
    //кнопка "Добавить преподавателя"
    $("#btn-add-prepod").on('click', function (event) {
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
                add_prepod('add_prepod_form', reg_surl);
            }
        })
    })
    //конец пункта "Преподаватели"

    //пункт "Ученики"
    $("#all-stud").on('click', function () {
        $("#new_child").hide();
        $("#show_child").show();
        $("#child_subject").hide();
        show_me('child_table');
    })

    $("#child").on('change', function () {
        switch ($("#child").val()) {
            case "Просмотреть учеников":
                {
                    $("#new_child").hide();
                    $("#show_child").show();
                    $("#child_subject").hide();
                    show_me('child_table');
                    break;
                }
            case "Добавить ученика":
                {
                    $("#show_child").hide();
                    $("#new_child").show();
                    $("#child_subject").hide();
                    break;
                }
            case "Записать ученика на предмет":
                {
                    $("#new_child").hide();
                    $("#show_child").hide();
                    $("#child_subject").show();
                    show_children_subject(1);
                    show_children_subject(2);
                }
        }
    })

    $("#btn-add-child").on('click', function (event) {
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
                add_child('child_parent_form', reg_surl2);
            }
        })
    })

    $("#btn-add-child-subject").on('click', function (event) {
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
                var add_childsub_form = new FormData();
                add_childsub_form.append('subj', $("#select_c_subject").val());
                add_childsub_form.append('chil', $("#select_s_child").val());
                add_childsub(add_childsub_url, add_childsub_form);
            }
        })
    })
    //конец пункта "Ученики"

    //пункт "Новостная лента"
    $("#all-news").on('click', function () {
        show_table('posts');
        // $("#post_status").show();
        // $("#new_post").hide();
        //show_me("posts");
    })

    $("#news").on('change', function () {
        $("#news").val() == "Изменить статус" ?
            show_table("posts")
            : (
                $("#post_status").hide(),
                $("#new_post").show()
            );

    })

    $("#btn-add-post").on('click', function (event) {
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
                add_post('add_post_form', npost_surl);
            }
        });
    })

    //конец пункта "Новостная лента"

    //пункт "Расписание"
    $("#all-rasp").on('click', function () {
        $.ajax({
            url: '../../archimed_b/raspisanie.php',
            type: 'GET',
            dataType: "html",
            success: function (response) {
                $("#Schedule").html(response);
            }
        })
        $.ajax({
            url: '../../archimed_b/admin/show_lessons.php',
            type: "GET",
            dataType: "html",
            success: function (response) {
                $("#subjects-list").html(response);
            }
        })
        $.ajax({
            url: '../../archimed_b/admin/show_rooms.php',
            type: "GET",
            dataType: "html",
            success: function (response) {
                $("#kabs").html(response);
            }
        })
    })
    //конец пункта "Расписание"

    //пункт "Предметы"
    $("#all-subjects").on('click', function () {
        $("#new_subject").show();
        $("#subject_list").hide();
        $("#subject_prepod").hide();
    })

    $("#subject_action").on('change', function () {
        switch ($("#subject_action").val()) {
            case "Добавить предмет": {
                $("#new_subject").show();
                $("#subject_list").hide();
                $("#subject_prepod").hide();
                break;
            }
            case "Список предметов": {
                $("#new_subject").hide();
                $("#subject_list").show();
                $("#subject_prepod").hide();
                show_me('all_subjects');
                break;
            }
            case "Сопоставить предметы": {
                $("#new_subject").hide();
                $("#subject_list").hide();
                $("#subject_prepod").show();
                show_subject_prepod(show_subject_prepod_url + '?f=1', 1);
                show_subject_prepod(show_subject_prepod_url + '?f=2', 2);
                break;
            }
        }
    })

    $("#btn-add-subject").on('click', function (event) {
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
                add_subject('add_subject_form', nsub_surl);
            }
        });
    })

    $("#btn-add-prepsub").on('click', function (event) {
        var add_prepsub_form = new FormData();
        add_prepsub_form.append('subj', $("#select_subject").val());
        add_prepsub_form.append('prepo', $("#select_prepod").val());
        add_prepsub(add_prepsub_url, add_prepsub_form);
    })
    //конец пункта "Предметы"

    //пункт "Отзывы"
    $("#all-feedback").on('click', function () {
        show_me('show-feedback')
    })
    //конец пункта "Отзывы"

    //пункт "Медиатека"
    $("#all-media").on('click', function () {
        $("#album-list").show();
        $("#new-album").hide();
        $("#new-photo").hide();
        show_me("album-list-table");
    })


    $("#album-action").on('change', function () {
        switch ($("#album-action").val()) {
            case 'Список альбомов': {
                $("#album-list").show();
                $("#new-album").hide();
                $("#new-photo").hide();
                show_me("album-list-table");
                break;
            }
            case 'Добавить альбом': {
                $("#album-list").hide();
                $("#new-album").show();
                $("#new-photo").hide();
                break;
            }
            case 'Добавить фотографию в альбом': {
                $("#album-list").hide();
                $("#new-album").hide();
                $("#new-photo").show();
                show_c_album();
                break;
            }
        }
    })

    $("#btn-add-album").on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: admin_url + 'new_album.php',
            type: "POST",
            dataType: "html",
            data: $("#add_album_form").serialize(),
            success: function (response) {
                Swal.fire(response);
            }
        })
    })

    $("#dob_photo").on('click', function (event) {
        event.preventDefault();
        var photos = new FormData();
        photos.append('al_name', $("#chosen_album").val());
        var n = 1;
        jQuery.each($("#c_photos")[0].files, function (i, file) {
            photos.append("media" + i, file);
        })

        $.ajax({
            url: admin_url + 'add_photos.php',
            type: "POST",
            dataType: "text",
            data: photos,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                Swal.fire(response);
            }
        })
    })
    //конец пункта "Медиатека"
})
//Конец обработки выбора пункта меню



//Функции

function show_c_album() {
    $.ajax({
        url: admin_url + 'show_c_album.php',
        type: "GET",
        dataType: "html",
        success: function (response) {
            $("#chosen_album").html(response)
        }
    })
}



function show_children_subject(f) {
    $.ajax({
        url: '../../archimed_b/admin/show_children_subject.php' + '?f=' + f,
        type: "GET",
        dataType: "html",
        success: function (response) {
            switch (f) {
                case 1: {
                    $("#select_c_subject").html(response);
                    break;
                }
                case 2: {
                    $("#select_s_child").html(response);
                    break;
                }
            }
        }
    })
}

function nazhal_enter() {
    var key = window.event.keyCode;

    if (key === 13) {
        document.getElementById("text-novost").value += "<br>";
        return false;
    }
    else {
        return true;
    }
}

function add_prepsub(url, ajax_form) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'text',
        data: ajax_form,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            Swal.fire(response);
        }
    })
}

function add_childsub(url, ajax_form) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'text',
        data: ajax_form,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            Swal.fire(response);
        }
    })
}

function show_subject_prepod(url, f) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "html",
        success: function (response) {
            switch (f) {
                case 1: {
                    $("#select_subject").html(response);
                    break;
                }
                case 2: {
                    $("#select_prepod").html(response);
                    break;
                }
            }
        }
    })
}

function add_subject(ajax_form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $("#" + ajax_form).serialize(),
        success: function (response) {
            Swal.fire(response)
        }
    })
}

function add_post(ajax_form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: 'html',
        data: $("#" + ajax_form).serialize(),
        success: function (response) {
            Swal.fire(response)
        }
    })
}


function add_child(ajax_form, url) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "html",
        data: $("#" + ajax_form).serialize(),
        success: function (response) {
            Swal.fire(response);
        }
    })
}

function add_prepod(ajax_form, url) {
    var dform = new FormData();
    dform.append('inputName', $('#inputName').val());
    dform.append('inputSurname', $('#inputSurname').val());
    dform.append('inputOtch', $('#inputOtch').val());
    dform.append('input_edu', $('#input_edu').val());
    dform.append('input_dopol', $('#input_dopol').val());
    dform.append('inputTel', $('#inputTel').val());
    dform.append('inputEmail', $('#inputEmail').val());
    dform.append('inputPassword', $('#inputPassword').val());
    dform.append('inputPassword2', $('#inputPassword2').val());
    dform.append('media', $("#myphoto").prop('files')[0]);

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'text',
        data: dform,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            switch (response) {
                case 'Проверьте введенные данные.': {
                    Swal.fire(
                        'Что-то пошло не так',
                        response,
                        'question'
                    )
                    break;
                };
                case 'Логин занят, выберите другой.': {
                    Swal.fire(
                        'Ошибка!',
                        response,
                        'warning'
                    )
                    break;
                };
                case 'Пароли не совпадают!': {
                    Swal.fire(
                        'Критическая ошибка!',
                        response,
                        'error'
                    );
                    break;
                };
                case 'Регистрация прошла успешно!': {
                    Swal.fire({
                        icon: 'success',
                        title: response,
                        confirmButtonText: 'Ок'
                    });
                    break;
                }
                default: {
                    Swal.fire(
                        'Режим отладки',
                        response,
                        'info'
                    );
                    break;
                }
            }
        },
        error: function () {
            Swal.fire(
                'ERROR!',
                'Ошибка сервера.',
                'error'
            )
        }
    })
}


function change_status(i, what) {
    let timerInterval;
    let who;
    what == "posts" ? who = 'новости' : who = 'отзыва';
    Swal.fire({
        title: 'Изменение статуса ' + who,
        html: 'Пожалуйста,подождите...',
        timer: 1000,
        onBeforeOpen: () => {
            Swal.showLoading()
        },
        onClose: () => {
            clearInterval(timerInterval);
            $.ajax({
                url: admin_url + 'change_object_status.php',
                type: "POST",
                data: { "key": (i), "object": (what) },
                success: function (response) {
                    response == "OK" ? (
                        Swal.fire({
                            title: 'Успешно',
                            html: '',
                            icon: 'success',
                            onClose: show_me(what)
                        })
                    ) : (
                            Swal.fire(response)
                        )
                }
            })
        }
    })
}

function del(i, what) {
    let timerInterval
    Swal.fire({
        title: "Удаление",
        html: 'Пожалуйста подождите',
        timer: 1000,
        onBeforeOpen: () => {
            Swal.showLoading()
            $.ajax({
                url: admin_url + 'delete_object.php',
                type: "POST",
                data: { "key": (i), "object": (what) },
                success: function (response) {
                    response == "OK" ? (
                        Swal.fire({
                            title: 'Успешно',
                            html: '',
                            icon: 'success',
                            onClose: show_me(what)
                        })
                    ) : (Swal.fire(response))
                }
            })
        },
        onClose: clearInterval(timerInterval)
    })
}

function show_table(where) {
    let timerInterval;
    var what;
    switch (where) {
        case 'requests': {
            what = 'заявок';
            break;
        }
        case 'prepod_table': {
            what = 'преподавателей';
            break;
        }
        case 'posts': {
            what = 'новостных постов';
            $("#post_status").show();
            $("#new_post").hide();
            break;
        }
        case 'child_table': {
            what = 'учеников';
            break;
        }
        case 'show-feedback': {
            what = 'отзывов';
            break;
        }
        case 'album-list-table': {
            what = 'альбомов';
            break;
        }
        case 'all_subjects': {
            what = 'предметов';
            break;
        }
        default: {
            break;
        }
    };
    Swal.fire({
        title: 'Получение списка ' + what,
        html: 'Пожалуйста, подождите...',
        timer: 800,
        onBeforeOpen: () => {
            Swal.showLoading();
            $.ajax({
                url: admin_url + 'show_table.php',
                type: "POST",
                dataType: 'html',
                data: { "key": (where) },
                success: function (response) {
                    $("#" + where).html(response);
                    $("#" + where).tablesorter();
                }
            })
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    })
}


function show_me(where) {
    let timerInterval;
    var what;
    url = admin_url + 'show_';
    switch (where) {
        case 'requests': {
            url += 'requests.php';
            what = 'заявок';
            break;
        }
        case 'prepod_table': {
            url += 'prepods.php';
            what = 'преподавателей';
            break;
        }
        case 'posts': {
            url += 'news.php';
            what = 'новостных постов';
            break;
        }
        case 'child_table': {
            url += 'children.php';
            what = 'учеников';
            break;
        }
        case 'show-feedback': {
            url += 'feedback.php';
            what = 'отзывов';
            break;
        }
        case 'album-list-table': {
            url += 'albums.php';
            what = 'альбомов';
            break;
        }
        case 'all_subjects': {
            url += 'subjects.php';
            what = 'предметов';
            break;
        }
        default: {
            break;
        }
    };
    Swal.fire({
        title: 'Получение списка ' + what,
        html: 'Пожалуйста, подождите...',
        timer: 1000,
        onBeforeOpen: () => {
            Swal.showLoading();
            $.ajax({
                url: url,
                type: "GET",
                dataType: 'html',
                success: function (response) {
                    $("#" + where).html(response);
                    $("#" + where).tablesorter();
                }
            })
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    })
}