$(document).ready( function() {

  var screenXValue = 1920;
  var screenYValue = 1080;
  var selectedScreen = 0;
  var screenLastId = 1;
  var screens = [];
  var image = null;

  $('#workspace').empty();

  $('#workspace').append('<div id="loadDiv"><center>Load image: <input type="file" name="image" id="imageFile" /></input></center></div>');
  $("#workspace").append('<canvas id="screen" width="' + screenXValue + '" height="' + screenYValue + '"></canvas>'); 

  // canvas
  var canvas = document.getElementById('screen');
  var context = canvas.getContext("2d"); 
  var fileinput = document.getElementById('imageFile'); // input file
  var img = new Image();

  function generateThumbnail(screenId) {

    $('#screenline').append('<img class="thumbnail" id="' + screenId + '" height="108" width="192" src="' + image.src + '"></img>');
    selectedScreen = 1;

    $("#" + screenId).click( function() {
      $(".thumbnail").css({"opacity" : 1, "border": "0px"});
      $("#" + screenId).css({"opacity" : '0.4', "border": "3px solid black"});
    });

    } 

    fileinput.onchange = function(evt) {
      var files = evt.target.files; // FileList object
      var file = files[0];
      var imageData;

      if(file.type.match('image.*')) {
        var reader = new FileReader();
        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
        reader.onload = function(evt) {
          if( evt.target.readyState == FileReader.DONE) {
	    img.src = evt.target.result;
	    //TODO, need to clear canvas on loading new image
	    img.onload = () => context.drawImage(img, 0, 0);
	    image = img;
	    generateThumbnail("thumbnail1");
	    addThumbnailInWaiting();
	    $('#thumbnail1').css({"opacity" : '0.4', "border": "3px solid black"});
          }
        }   
      } else {
        alert("not an image");
      }
    };

  function addThumbnailInWaiting() {
    $('#screenline').append('<img class="thumbnailinwaiting" id="addthumbnail" height="108" width="192" src="addscreen.jpg"></img>'); 
    $('#addthumbnail').click( function() {
    $('.thumbnailinwaiting').remove();
      screenLastId = screenLastId + 1;
      generateThumbnail('thumbnail' + screenLastId);
      addThumbnailInWaiting();
    });
  }

	
  //empty the current project
  /*setExpansionSettingsDefault();
  setSpeedSettingsDefault();
  clearFileSettings();
  clearToolSettings();*/
    
 
  function setExpansionSettingsDefault() {
  }

  function setSpeedSettingsDefault() {
  }

  function clearFileSettings() {
  }

  function clearToolSettings() {
  }

});
