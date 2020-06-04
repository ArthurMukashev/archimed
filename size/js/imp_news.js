var imp_news_url = "../../archimed_b/imp_news.php";

$(document).ready(function(){
    show_news(imp_news_url);
})

function show_news(url){
    $.ajax({
        url:url,
        type:'GET',
        dataType:'html',
        success:function(response){
            $("#important_news").html(response);
        }
    })
}