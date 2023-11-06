firstload = true,
  width = $(window).width(), height = $(window).height(),
  height = $(window).height(),
  age = function() {
    return new Date(new Date - new Date('1990-05-20')).getFullYear() - 1970;
  },

  initSkills = function() {
    $(".skill").each(function() {
      var skill = this,
      newWidth = $(skill).parent().width() * $(skill).data('percent');
      $(skill).animate({width: newWidth,}, 1500);
      firstload = false;
    });
  },

  reDrawSkills = function() {
    if (!firstload && ($(window).width() != width && $(window).height() != height)) {
      width = $(window).width();
      height = $(window).height();
      $(".skill").each(function(index) {
        var skill = this;
        newWidth = $(skill).parent().width() * $(skill).data('percent');
        $(skill).animate({width: newWidth}, 150 * index);
      });
    }
  };

var resizetimeout;
window.onresize = function() {
  clearTimeout(resizetimeout);
  resizetimeout = setTimeout(function() {
    reDrawSkills();
  }, 50);
};

var initLanguages = function() {
    var active = "<i class='fa fa-circle fa-lg active'></i>";
    var disabled = "<i class='fa fa-circle fa-lg disabled'></i>";
    $('.points').each(function() {
      var points = parseInt($(this).data('points'));
      $(this).html("");
      if (points > 0 && points < 5) {
        for (i = 0; i < points; i++) {
          $(this).append(active);
        }
        for (i = 0; i < 5 - points; i++) {
          $(this).append(disabled);
        }
      } else if (points == 5) {
        for (i = 0; i < points; i++) {
          $(this).append(active);
        }
      }
    });
  },


  initAge = function() {
    $('#age').html(age());
    $('#age').each(function() {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 3000,
        easing: 'swing',
        step: function(year) {
          $(this).text(Math.ceil(year) + 'yo');
        },
      });
    });
  };


$(document).ready(function() {
  initAge();
  initSkills();
  initLanguages();
});
