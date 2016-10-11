var windowHeight, windowWidth;

windowWidth = function() {
  var w;
  w = 0;
  if (window.innerWidth > window.outerWidth) {
    w = window.outerWidth;
  } else {
    w = window.innerWidth;
  }
  return w;
};

windowHeight = function() {
  var w;
  w = 0;
  if (window.innerHeight > window.outerHeight) {
    w = window.outerHeight;
  } else {
    w = window.innerHeight;
  }
  return w;
};

$(document).ready(function() {

  /*
  			drop lists
   */
  var initCountdown, setFooterOffset;
  $('.drop-list .anchor').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      return $(this).siblings('ul').slideDown(300);
    } else {
      return $(this).siblings('ul').slideUp(300);
    }
  });

  /*
  			dropmenu
   */
  $('.dropmenu').click(function(e) {
    var $t;
    e.preventDefault();
    if ($(e.target).closest('.dropmenu-content').length === 0) {
      $t = this;
      $($t).toggleClass('active');
      if ($($t).hasClass('active')) {
        $('.dropmenu-content', $t).slideDown(300);
        return setTimeout(function() {
          return $('.dropmenu-content img', $t).addClass('active');
        }, 300);
      } else {
        $('.dropmenu-content img', $t).removeClass('active');
        return setTimeout(function() {
          return $('.dropmenu-content', $t).slideUp(300);
        }, 300);
      }
    }
  });

  /*
  			setting footer offset
   */
  (setFooterOffset = function() {
    var offset;
    offset = $('.main-footer').height();
    $('.page-wrapper').css('padding-bottom', offset + 'px');
    return $('.main-footer').css('margin-top', -offset + 'px');
  })();

  /*
  			main slider
   */
  if ($.fn.owlCarousel) {
    $('.slider').owlCarousel({
      singleItem: true,
      navigation: false,
      pagination: true,
      autoPlay: true,
      slideSpeed: 500,
      navigationText: ["", ""]
    });
  }

  /*
  			carousel
   */
  if ($.fn.owlCarousel) {
    $('.carousel').owlCarousel({
      singleItem: false,
      navigation: true,
      pagination: true,
      items: 3,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [767, 3],
      itemsDesktopSmall: [480, 2],
      autoPlay: false,
      navigationText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
    });
  }

  /*
  			counter
   */
  initCountdown = function(node, isSimple) {
    return node.countdown(new Date(node.data('to')), function(event) {
      var element, elements, j, len, results, time;
      elements = ['days', 'hours', 'minutes', 'seconds'];
      time = {
        days: event.strftime('%D'),
        hours: event.strftime('%H'),
        minutes: event.strftime('%M'),
        seconds: event.strftime('%S')
      };
      results = [];
      for (j = 0, len = elements.length; j < len; j++) {
        element = elements[j];
        results.push($('.counter-' + element).html(time[element]));
      }
      return results;
    });
  };
  initCountdown($('.counter-block'));

  /*
  			range slider
   */
  $('.range-slider').each(function(i, range) {
    var data, max, maxInput, min, minInput;
    data = $(range).data();
    data.start = data.start.split(',');
    data.start[0] = parseInt(data.start[0]);
    data.start[1] = parseInt(data.start[1]);
    data.range = data.range.split(',');
    data.range[0] = parseInt(data.range[0]);
    data.range[1] = parseInt(data.range[1]);
    min = $(range).parents('.slide-content').find('.min');
    max = $(range).parents('.slide-content').find('.max');
    minInput = $(range).parents('.slide-content').find('.min-input');
    maxInput = $(range).parents('.slide-content').find('.max-input');
    noUiSlider.create(range, {
      start: [data.start[0] || 0, data.start[1] || 100],
      step: data.step || 1,
      margin: data.margin || 1,
      connect: true,
      tooltips: [
        wNumb({
          decimals: 1
        }), wNumb({
          decimals: 1
        })
      ],
      range: {
        'min': data.range[0] || 0,
        'max': data.range[1] || 1000
      }
    });
    return range.noUiSlider.on('update', function(values, handle) {
      if (min) {
        min.html(values[0]);
      }
      if (max) {
        max.html(values[1]);
      }
      if (minInput) {
        minInput.val(values[0]);
      }
      if (maxInput) {
        return maxInput.val(values[1]);
      }
    });
  });
  if ($.fn.selectBox) {
    $('.selectbox').selectBox();
  }

  /*
  			drop lists
   */
  $('.slide-toggle .anchor').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      return $(this).siblings('.slide-content').slideDown(300);
    } else {
      return $(this).siblings('.slide-content').slideUp(300);
    }
  });

  /*
  			tabs
   */
  $('.tabs li').click(function(e) {
    var cont, indx;
    e.preventDefault();
    indx = $(this).index();
    cont = $($(this).parent().data('toggle-tabs'));
    $(this).parent().find('>*').removeClass('active').eq(indx).addClass('active');
    return cont.find('.tab').removeClass('active').eq(indx).addClass('active');
  });

  /*
  			product carousel
   */
  if ($.fn.owlCarousel) {
    $('.product-slider').owlCarousel({
      singleItem: false,
      navigation: true,
      pagination: true,
      items: 3,
      itemsDesktop: [1199, 3],
      itemsDesktopSmall: [767, 3],
      itemsMobile: [480, 3],
      autoPlay: false,
      navigationText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
    });
  }
  $('[data-set-thumbnail]').click(function(e) {
    var img, outer, src;
    e.preventDefault();
    if (!$(this).hasClass('active')) {
      $('.product-slider .item').removeClass('active');
      $(this).addClass('active');
      src = $(this).data('set-thumbnail');
      outer = $('.product-primary-image');
      img = outer.find('.image');
      outer.addClass('faded');
      return setTimeout(function() {
        img.attr('src', src);
        return outer.removeClass('faded');
      }, 300);
    }
  });
  $(window).resize(function() {
    return waitForFinalEvent(function() {
      return setFooterOffset();
    }, 200, "");
  });
});
