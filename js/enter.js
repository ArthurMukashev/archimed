var myurl = '../archimed_b/';
var phpurl = 'enter.php';
var surl = myurl+phpurl;

$(document).ready(function(){
	$('#btn').on('click',function(event){
		event.preventDefault();
		var $data = {};
		$('#ajax_form').find('input, textarea, select').each(function(){
			$data[this.name]=$(this).val();
		});
		let timerInterval
		Swal.fire({
			title:'Вход в систему',
			html:'Пожалуйста, подождите...',
			timer:1000,
			onBeforeOpen:() => {
				Swal.showLoading();
				enter_the_system($data,surl);
			},
			onClose: () => {
				clearInterval(timerInterval);
			}
		})
	})
})

function enter_the_system(data,url){
	$.ajax({
		url:url,
		type:'POST',
		data:data,
		success:function(response){
			switch (response){
				case 'Пользователя не существует':{
					Swal.fire()
				}
			}
		}
	})
}