function toast(cont){
	var $box = $('<div></div>'),
	$cont = $('<span>' + cont + '</span>');
	$box.append($cont);
	$box.css({
		'width' : '100%',
		'height' : 'auto',
		'position' : 'fixed',
		'bottom' : '10%',
		'left' : '0',
		'text-align' : 'center',
		'z-index': '100000'
	})
	$cont.css({
		'background' : 'rgba(0, 0, 0, .5)',
		'padding' : '8px 25px',
		'line-height' : '40px',
		'color' : '#fff',
		'opacity' : '0',
		'border-radius' : '20px',
		'transform' : 'scale(0.5)'
	});
	$(document.body).append($box);
	$box.animate({'bottom' : '15%'}, 500);
	$cont.animate({'opacity' : 1, 'transform' : 'scale(1)'}, 1000).animate({'opacity' : 0}, 1000, function (){
		$box.remove();
	});

}