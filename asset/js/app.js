firstload = true,
  width = $(window).width(), height = $(window).height(),
  height = $(window).height(),
  age = function() {
    return new Date(new Date - new Date('1990-05-20')).getFullYear() - 1970;
  },

  initSkills = function() {
    $(".item-skills").each(function() {
      var star = this,
        inviewSkills = new Waypoint.Inview({
          element: $(star),
          enter: function() {
            newWidth = $(star).parent().width() * $(star).data('percent');
            $(star).animate({
              width: newWidth,
            }, 1500);
            firstload = false;
            this.destroy();
          }
        });
    });
  },

  reDrawSkills = function() {
    if (!firstload && ($(window).width() != width && $(window).height() != height)) {
      width = $(window).width();
      height = $(window).height();
      $(".item-skills").each(function(index) {
        var star = this;
        newWidth = $(star).parent().width() * $(star).data('percent');
        $(star).animate({
          width: newWidth + 'px'
        }, 150 * index);
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
    var activeStar = "<i class='fa fa-circle fa-lg active'></i>";
    var disabledStar = "<i class='fa fa-circle fa-lg disabled'></i>";
    $('.points').each(function() {
      var points = parseInt($(this).data('points'));
      $(this).html("");
      if (points > 0 && points < 5) {
        for (i = 0; i < points; i++) {
          $(this).append(activeStar);
        }
        for (i = 0; i < 5 - points; i++) {
          $(this).append(disabledStar);
        }
      } else if (points == 5) {
        for (i = 0; i < points; i++) {
          $(this).append(activeStar);
        }
      }
    });
  },


  updateYears = function() {
    $('#years').unbind("DOMSubtreeModified");
    $('#years').html(age());
    $('#years').each(function() {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 4000,
        easing: 'swing',
        step: function(year) {
          $(this).text(Math.ceil(year) + 'yo');
        },
        complete: function() {
          $('#years').unbind("DOMSubtreeModified");
          $('#years').bind("DOMSubtreeModified", function() {
            updateYears();
          });
        }
      });
    });
  };


$(document).ready(function() {
  initSkills();
  initLanguages();
  updateYears();
});
