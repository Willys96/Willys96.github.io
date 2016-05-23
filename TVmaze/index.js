var x='';

$(function () {

	$('#app-body')
	.find('button')
	.click(onsubmit);

	

	var template='<article class="tv-show"><div class="left img-container"><img src=":img:" alt=":img alt:"></div><div class="right info"><h1>:name:</h1><p>:summary:</p></div></article>';

	function cargar (show) {
		
		var $showContainer2=$('#shows-container');

		var $name=show.name!=null?show.name:'';
		var $img=show.image!=null?show.image.medium:'';
		var $summary=show.summary!=null?show.summary:'';

		console.log({$name,$img,$summary});

		var article=template
		.replace(':name:', $name)
		.replace(':img:', $img)
		.replace(':summary:',$summary )
		.replace(':img alt:',$name+ '-logo');

		$showContainer2.append(article);

		var $show=$('#shows-container').find('.tv-show');
		$show.hide();

	}

	function onsubmit(ev) {
		ev.preventDefault();

		var busqueda=$('#app-body').find('input[type="text"]').val();


		var $showContainer=$('#shows-container');
		$showContainer.find('.tv-show').remove();
		$showContainer.attr('class', 'loader');


		$.ajax({
			url: 'http://api.tvmaze.com/search/shows',
			type: 'GET',
			data:{ q:busqueda }
		})
		.done(function (shows,textStatus,xhr) {
			
			shows.forEach( function(show) {

				cargar (show.show);

			});

			$showContainer.removeAttr('class','loader');

			var $show=$('#shows-container').find('.tv-show');
			$show.show();

		});
		
	}


	$.ajax({
		url: 'http://api.tvmaze.com/shows',
		type: 'GET'
	})
	.done(function (shows,textStatus,xhr) {

		var $showContainer2=$('#shows-container');

		shows.forEach( function(show) {

			cargar (show);

		});


		$showContainer2.removeAttr('class','loader');

		var $show=$('#shows-container').find('.tv-show');
		$show.show();

		
	});



	


});  