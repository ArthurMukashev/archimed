var admin_url = "../../archimed_b/admin/";
var is_enter2_url = "../../archimed_b/isenter4.php";

$.ajax({
    url: is_enter2_url,
    type: "GET",
    dataType: "html",
    success: function (response) {
        if (!response) {
            $("#rasp").html('Страница недоступна');
            Swal.fire({
                'title': 'Внимание',
                'html': 'Страница доступна только преподавателю',
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
                        onClose: () => {
                            clearInterval(timerInterval)
                        }
                    })
                }
            })
        }
    }
})

$(document).ready(function () {
    $("#new-photo").hide();
    $("#album-action").on('change', function () {
        switch ($("#album-action").val()) {
            case 'Добавить альбом': {
                $("#new-album").show();
                $("#new-photo").hide();
                break;
            }
            case 'Добавить фотографии в альбом': {
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
        photos.append('al_name',$("#chosen_album").val());
        var n = 1;
        jQuery.each($("#c_photos")[0].files, function (i, file){
            photos.append("media"+i, file);
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

})


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