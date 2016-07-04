$(document).ready(function(){
  var searchText = $('.search--field').val();

  var streamers = [
    "freecodecamp",
    "beyondthesummit",
    "OgamingSC2",
    "noobs2ninjas",
    "nl_kripp",
    "brunofin",
    "comster404"];

  var showStreamers = function(){
    streamers.forEach(function(user){
      var url = 'https://api.twitch.tv/kraken/streams/'+user+'?callback=?';
      var addData = '<li class="'+user+' li--streamers"><a target="_blank" href="http://www.twitch.tv/'+user+'" class="a--streamers">'+user+'</a>';
      if($('.'+user).length > 0){
        return;
      }
      $.getJSON(url, function(data){
        if(data.stream === undefined){
          addData += '<span> is removed or non-existant</span></li>';
          $('.ul--streamers').append(addData); 
        }
        else if(data.stream === null){
          addData += '<span> is offline</span></li>';
          $('.ul--streamers').append(addData);
        }
        else{
          addData += '<span> is online !!!</span></li><div class="stream--info">Game:<span class="span--info"> '+data.stream.game+'</span><br>Viewers: <span class="span--info">'+data.stream.viewers+'</span>';  
          $('.ul--streamers').prepend(addData);
        }
      });
    });
  };

  var addStreamer = function(){
    var search = $('.search--field').val();
    
    if(streamers.indexOf(search) === -1) {
      streamers.push(search);
      showStreamers();
      $('.div--user').empty().append('Successfully added');
    }
    else{
      $('.div--user').empty().append('Already added');
    }
  }

  showStreamers();
  $('.search--button').on('click', addStreamer);
  
});
