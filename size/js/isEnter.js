var purl="../../archimed_b/isenter.php";
var user_level_url = "../../archimed_b/userlevel.php";


    $.ajax({
        url:purl,
        type:"GET",
        dataType:"html",
        success:function(response){
            if (response == "error")
            {
                $("#entermenu").show();
                $("#afterenter").hide();
                $("#enter_form").show();
                $("#fon").css("max-height","270px");
            }
            else
            {
                $("#reg").hide();
                $("#entermenu").hide();
                $("#enter_form").hide();
                $("#afterenter").show();
                $("#who").html(response);
                $("#fon").css("max-height","125px");
            }
        }
    });

    $(document).ready(function(){
        $("#golk").on('click',function(){
            $.ajax({
                url:user_level_url,
                type:"GET",
                dataType:"html",
                success: function(response){
                    switch(response)
                    {
                        case "1":{
                            window.location = "admin.html";
                            break;
                        };
                        case "2":{
                            window.location = "prepod.html";
                            break;
                        };
                        case "3":{
                            $.ajax({
                                url:'../../archimed_b/show_child_subject.php',
                                type:"GET",
                                dataType:"html",
                                success:function(response){
                                    Swal.fire(response)
                                }
                            });
                            break;
                        };
                        default:{
                            break;
                        }
                    }
                }
            })
        })
    })