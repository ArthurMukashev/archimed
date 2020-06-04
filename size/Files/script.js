function DayClick(dayNum, obj) {
    if ($(obj).hasClass('selected') && ($('#Schedule table tbody tr td.d' + dayNum + ' div.selected').length)) {
        $('#Schedule table tbody tr td.d' + dayNum + ' div').removeClass('selected');
        $(obj).removeClass('selected');
    }
    else {
        $('#Schedule table tbody tr td.d' + dayNum + ' div').addClass('selected');
        $(obj).addClass('selected');
    };
}
$(document).ready(function () {
    $('#Schedule table tbody tr .d0').hover(
        function () { $('#Schedule table thead tr td.d0').addClass('hovered') },
        function () { $('#Schedule table thead tr td.d0').removeClass('hovered') });
    $('#Schedule table thead tr .d0').hover(
        function () { $('#Schedule table td.d0').addClass('hovered') },
        function () { $('#Schedule table td.d0').removeClass('hovered') })
        .click(function () { DayClick('0', this) });

    $('#Schedule table tbody tr .d1').hover(
        function () { $('#Schedule table thead tr td.d1').addClass('hovered') },
        function () { $('#Schedule table thead tr td.d1').removeClass('hovered') });
    $('#Schedule table thead tr .d1').hover(
        function () { $('#Schedule table td.d1').addClass('hovered') },
        function () { $('#Schedule table td.d1').removeClass('hovered') })
        .click(function () { DayClick('1', this) });

    $('#Schedule table tbody tr .d2').hover(
        function () { $('#Schedule table thead tr td.d2').addClass('hovered') },
        function () { $('#Schedule table thead tr td.d2').removeClass('hovered') });
    $('#Schedule table thead tr .d2').hover(
        function () { $('#Schedule table td.d2').addClass('hovered') },
        function () { $('#Schedule table td.d2').removeClass('hovered') })
        .click(function () { DayClick('2', this) });

    $('#Schedule table tbody tr .d3').hover(
        function () { $('#Schedule table thead tr td.d3').addClass('hovered') },
        function () { $('#Schedule table thead tr td.d3').removeClass('hovered') });
    $('#Schedule table thead tr .d3').hover(
        function () { $('#Schedule table td.d3').addClass('hovered') },
        function () { $('#Schedule table td.d3').removeClass('hovered') })
        .click(function () { DayClick('3', this) });

    $('#Schedule table tbody tr .d4').hover(
        function () { $('#Schedule table thead tr td.d4').addClass('hovered') },
        function () { $('#Schedule table thead tr td.d4').removeClass('hovered') });
    $('#Schedule table thead tr .d4').hover(
        function () { $('#Schedule table td.d4').addClass('hovered') },
        function () { $('#Schedule table td.d4').removeClass('hovered') })
        .click(function () { DayClick('4', this) });

    $('#Schedule table tbody tr .d5').hover(
        function () { $('#Schedule table thead tr td.d5').addClass('hovered') },
        function () { $('#Schedule table thead tr td.d5').removeClass('hovered') });
    $('#Schedule table thead tr .d5').hover(
        function () { $('#Schedule table td.d5').addClass('hovered') },
        function () { $('#Schedule table td.d5').removeClass('hovered') })
        .click(function () { DayClick('5', this) });

    $('#Schedule table tbody tr .d6').hover(
        function () { $('#Schedule table thead tr td.d6').addClass('hovered') },
        function () { $('#Schedule table thead tr td.d6').removeClass('hovered') });
    $('#Schedule table thead tr .d6').hover(
        function () { $('#Schedule table td.d6').addClass('hovered') },
        function () { $('#Schedule table td.d6').removeClass('hovered') })
        .click(function () { DayClick('6', this) });

    $('#Schedule table tr').hover(
        function () { $(this).addClass('hovered') },
        function () { $(this).removeClass('hovered') });
    $('#Schedule table tbody tr td div').click(
        function () { $(this).toggleClass('selected') });
});

function SubmitSchedule() {
    var data = document.getElementById("Schedule").innerHTML;
    localStorage.setItem("raspisanie", data);

    $.ajax({
        url: '../../archimed_b/admin/raspisanie.php',
        type: "POST",
        dataType: 'html',
        data: localStorage.getItem("raspisanie"),
        success: function (response) {
            Swal.fire(response)
        }
    })
}

function onDragStart(event) {
    event
        .dataTransfer
        .setData('text/plain', event.target.id);
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event
        .dataTransfer
        .getData('text');

    const draggableElement = $("#" + id).html() + ' [' + $("#kabs").val() + ']<br><br>';
    const dropzone = event.currentTarget;

    var s = document.createElement('span');
    s.innerHTML += draggableElement;

    dropzone.appendChild(s);
    dropzone.style.padding = 0;
    event
        .dataTransfer
        .clearData();
}

function deleteLesson(event) {
    const dropzone = event.target;
    dropzone.innerHTML = "";
}
