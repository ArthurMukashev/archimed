

$(document).ready(function(){
    $("#reg").on('click',function(event){
        event.preventDefault();
        Swal.fire(
          {
            title:"Записать ребенка на занятия",
            html:"<iframe src=\"register2.html\" width=\"468\" height=\"460\" ></iframe>",
            showConfirmButton:false,
            showCloseButton:true
          }
        );
    })
})

