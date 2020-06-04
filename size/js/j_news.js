var j_news_url = "../../archimed_b/j_news.php";

$(document).ready(function(){
    show_news(j_news_url);
})

function show_news(url) {
    $.ajax({
        url:url,
        type:'GET',
        dataType:'html',
        success:function(response){
            $("#just_news").html(response);
        }
    })
}