var albums_url = "../../archimed_b/show_albums.php";

$(document).ready(function(){
    show_albums(albums_url);
    
    
    
})

function show_albums(url) {
    $.ajax({
        url:url,
        type:'GET',
        dataType:'html',
        success:function(response){
            $("#albums").html(response);
        }
    })
}

function show_me_photos(event) {
    let album_id = event.currentTarget.id;
    $("#"+album_id).css('overflow','scroll');
    $("#"+album_id).css('width','auto');
    $("#"+album_id).css('height','600px');
    var fotos = $("#"+album_id).find('.foto').each(function(index){
       $(this).css('height','');
       $(this).css('width','');
    });
    
    Swal.fire({
        title: $("#"+album_id).find('h3'),
        html: $('#'+album_id),
        width:'1000px',
        onBeforeOpen: () => {
            $("#"+album_id).hide();
        },
        onClose: ()=>{
            $("#"+album_id).css('overflow','');
            $("#"+album_id).css('width','');
            $("#"+album_id).css('height','');
            $("#"+album_id).show();
            $("#"+album_id).find('.foto').each(function(index){
                $(this).css('height','120px');
                $(this).css('width','100px');
            })
        }
    });
    
    /*Swal.fire({
        title:'Альбом',
        html:event.currentTarget.innerHTML
    });*/
}