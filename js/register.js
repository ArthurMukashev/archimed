$(document).ready(function(){
	$('#btn').on('click',function(event){
		event.preventDefault();
		var $data = {};
		$('#ajax_form').find('input, textarea, select').each(function(){
			$data[this.name]=$(this).val();
		});

		Swal.fire(JSON.stringify($data));
	})
})