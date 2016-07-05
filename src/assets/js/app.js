$(document).ready(function(){
  var streamers = [
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


    $.getJSON(url, function(data){

      $('.li--hidden').clone().appendTo($('.ul--streamers')).attr('class', user+' li--streamers');

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

  var isValid = function(str){
    return /^\w+$/.test(str);
  }

  var addStreamer = function(){
    var search = $('.search--field').val();
    
    if(streamers.indexOf(search) === -1 && isValid(search) === true){
      streamers.push(search);
      showStreamer(search);
      $('.div--user').empty().append('Successfully added');
    }

    else{
      $('.div--user').empty().append('Already added or incorrect input');
    }
  }

  streamers.forEach(function(val){
    showStreamer(val);
  });

  $('.search--button').on('click', addStreamer);
});
