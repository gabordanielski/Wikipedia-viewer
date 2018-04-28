$(function() {

  var mode = "circle";
  $('.articles ul').empty();

  $('.form-control').click(function() {
    if (mode == "circle") {
      $('.input-group').toggleClass('active-after');
      $('.form-control').toggleClass('rounded-circle');
      $('.input-group').animate({
        width: "60%"
      }, 2000, function() {
        $('.input-group-append').css('display', 'block');
        $('.form-control').css('cursor', 'auto');
      });
      mode = "line";
    }
  });

  $('.input-group-append .btn').click(function() {
    $('.input-group input').val('');
    $('.articles').slideUp(1000, function() {
      $('.articles ul').empty();
      $('.container').animate({
        'margin-top': '30vh'
      }, 1000);
      $('.p-instruct').fadeIn(1000);
      $('.input-group-append').css('display', 'none');
      $('.input-group').animate({
        width: "45px"
      }, 2000, function() {
        $('.form-control').css('cursor', 'pointer');
        $('.input-group').toggleClass('active-after');
        $('.form-control').toggleClass('rounded-circle')
      });
      mode = "circle";
    });
  });

  $('.form-control').keypress(function(e) {
    if (e.which == 13) {
      if ($('.input-group input').val() != "") {
        var input_value = $('.input-group input').val();
        $.ajax({
          url: 'https://en.wikipedia.org/w/api.php',
          data: {
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: input_value
          },
          dataType: 'jsonp',
          success: function(data) {
            if ($('.articles ul').is(':empty')) {
              $('.container').animate({
                'margin-top': '0'
              }, 2000);
              $('.p-instruct').fadeOut(2000, function() {
                $.each(data.query.search, function(i, query) {
                  var link = "https://en.wikipedia.org/wiki/" + query.title.split(" ").join("_");
                  $('.articles ul').append('<a href=' + link + ' class="list-group-item list-group-item-action mb-2 mb-md-2"><p><b>' + query.title + '</b></p><p>' + query.snippet + '</p></a>');
                });
                $('.articles').slideDown(2000);
              });
            } else {
              $('.articles').slideUp(1000, function() {
                $('.articles ul').empty();
                $.each(data.query.search, function(i, query) {
                  var link = "https://en.wikipedia.org/wiki/" + query.title.split(" ").join("_");
                  $('.articles ul').append('<a href=' + link + ' class="list-group-item list-group-item-action mb-2 mb-md-2"><p>' + query.title + '</p><p>' + query.snippet + '</p></a>');
                });
                $('.articles').slideDown(2000);
              });
            }
          },
          error: function(e) {
            console.log(e);
          }
        });

      }
    }
  });

});
