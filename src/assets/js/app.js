$(document).ready(function(){
  var initStreamers = [
    "freecodecamp",
    "beyondthesummit",
    "OgamingSC2",
    "noobs2ninjas",
    "nl_kripp",
    "brunofin",
    "comster404"
  ];

  var showStreamer = function(user){

    var url = 'https://api.twitch.tv/kraken/streams/'+user+'?callback=?',
        anchorLink = 'http://www.twitch.tv/'+user,
        isOnline= '',
        uClass = "."+user;

    $('.li--hidden').clone().appendTo($('.ul--streamers')).attr('class', user+' li--streamers');

    $.getJSON(url, function(data){
      if(data.stream === undefined)
        isOnline = '<span> is removed or non-existant</span>'
      
      else if(data.stream === null)
        isOnline = '<span> is offline</span>';
      
      else {
        isOnline = '<span> is online !!!</span>';
        
        $('.div--hidden').clone().insertAfter($(uClass)).attr('class', 'stream--info div--hidden');

        $(uClass).next().find('.span--info').first().text(data.stream.game);
        $(uClass).next().find('.span--info').last().text(data.stream.viewers);

        $(uClass).append('<i class="fa fa-2x fa-angle-down" aria-hidden="true"></i>');
        $(uClass).find('.fa').on('click', function(){
          $(uClass).next().toggle();
        });

      }

      $(uClass).append('<br>' + isOnline);
      $(uClass).find('.a--streamers').attr('href', anchorLink).html(user);
    });

  };


  var addStreamer = function(){
    var search = $('.search--field').val();
    
    if(initStreamers.indexOf(search) === -1 && search !== '') {
      initStreamers.push(search);
      showStreamer(search);
      $('.div--user').empty().append('Successfully added');
    }

    else{
      $('.div--user').empty().append('Already added');
    }
  }

  initStreamers.forEach(function(val){
    showStreamer(val);
  });

  $('.search--button').on('click', addStreamer);
});
