firstload = true,
width = $(window).width(), height = $(window).height(),
height = $(window).height(),
age = function(){
	return new Date(new Date - new Date('1990-05-20')).getFullYear()-1970;
},

initSkills = function(){
	$(".item-skills").each(function() {
		var star = this,
		inviewSkills = new Waypoint.Inview({
			element: $(star),
			enter: function() {
				newWidth = $(star).parent().width() * $(star).data('percent');
				$(star).animate({ width: newWidth,}, 1500) ;
				firstload = false;
				//alert('firstload changed');
				this.destroy();
			}
		});	
	});
},

reDrawSkills = function(){
	if(!firstload && ($(window).width() != width && $(window).height() != height)){
		width = $(window).width();
		height = $(window).height();
		$(".item-skills").each(function() {
			var star = this;
			currentWidth = $(star).width();
			newWidth = $(star).parent().width() * $(star).data('percent');
			(currentWidth > newWidth) ? 
			$(star).animate({ width: '-='+Math.abs(currentWidth-newWidth)+'px' }, 100):
			$(star).animate({ width: '+='+Math.abs(currentWidth-newWidth)+'px' }, 100);
		});
	}
};

var resizetimeout;
window.onresize = function() {
	clearTimeout(resizetimeout);
	resizetimeout = setTimeout(function(){		
		reDrawSkills();
	}, 100);
};

var initStars = function(){
	var activeStar = "<i class='fa fa-star big-stone fa-2x active-star'></i>";
	var disabledStar = "<i class='fa fa-star grey fa-2x'></i>";
	$('.skills-stars').each(function() {
		var stars = parseInt($(this).data('stars'));
		$(this).prop('title', stars+' Stars');
		$(this).html("");
		if(stars > 0 && stars < 5){
			for(i=0;i<stars;i++){
				$(this).append(activeStar);
			}
			$(this).append(disabledStar);
		} else if (stars == 5){
			for(i=0;i<stars;i++){
				$(this).append(activeStar);
			}
		}
	});

	var inviewStars = new Waypoint.Inview({
		element: $('#language-skills'),
		enter: function() {
			$('.active-star').each(function(index) {
				var star = this;
				var s = setTimeout(function(){
					$(star).addClass('tada-finit');
				}, 500*index);
			});
		}
	});
},


updateYears = function(){
	$('#years').unbind("DOMSubtreeModified");
	$('#years').html(age());
	$('#years').each(function () {
	    $(this).prop('Counter',0).animate({
        	Counter: $(this).text()
	  	}, {
        	duration: 4000,
        	easing: 'swing',
        	step: function (year) {
           	 $(this).text(Math.ceil(year) + 'yo');
        	}, 
        	complete: function() {
				$('#years').unbind("DOMSubtreeModified");
				$('#years').bind("DOMSubtreeModified",function(){
					updateYears();
				});
			}
    	});
	});
};


$(document).ready(function(){
	initSkills();
	initStars();
	updateYears();
});
