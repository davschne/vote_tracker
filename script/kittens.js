$(function() {

  function Photo(image) {
    this.image = image;
    this.votes = 0;
  }

  Photo.prototype.displayImages = function($element) {
    $element.html('<img src="' + this.image + '">');
  };

  Photo.prototype.displayVotes = function($element) {
    $element.append('<p>Total votes: <span class="votes">' + this.votes + '</span></p>');
  }

  function Tracker() {
    var imgA, imgB;

    var getRandomIndices = function() {
      var randA = Math.floor(Math.random() * photos.length);
      do {
        var randB = Math.floor(Math.random() * photos.length);
      } while (randB == randA);
      return [randA, randB];
    };

    var getWinner = function($element) {
      if ($element.attr("id") == "imgA") return imgA;
      else return imgB;
    };

    var showVotes = function() {
      $photos = $('.photos');
      imgA.displayVotes($photos.eq(0));
      imgB.displayVotes($photos.eq(1));
    };

    this.init = function() {
      // get image container nodes, remove highlighting
      $photos = $('.photos');

      // hide/disable vote-again
      $('.vote-again').addClass("hidden");
      $('.vote-again button').off("click");

      // load photos
      var indices = getRandomIndices();
      imgA = photos[indices[0]];
      imgB = photos[indices[1]];
      imgA.displayImages($photos.eq(0));
      imgB.displayImages($photos.eq(1));

      // register event listener for voting
      $('#pics').on("click", '.photos', win);
    };

    var win = function(event) {
      var $element = $(event.target).parent();

      // determine winning image
      var winner = getWinner($element);

      // increment votes for winning image
      winner.votes++;

      // highlight winning image
      // we define a CSS class "highlight"
      $element.children('img').addClass("highlight");

      // display votes for both images
      showVotes();

      // disable further voting
      $('#pics').off("click");

      // allow voting again
      $('.vote-again').removeClass("hidden");
      $('.vote-again button').on("click", function(event) {
        event.preventDefault();
        tracker.init();
      });
    };
  }

  var tracker = new Tracker();
  var photos = [];

  $.ajax({
    type: "GET",
    url: "https://api.imgur.com/3/album/Bdq6i",
    headers: {
      "Authorization": "Client-ID cbf709b9c123244"
    }

  }).done(function(data) {

    var imageObjects = data.data.images;

    for (var i = 0; i < imageObjects.length; i++) {
      photos.push(new Photo(imageObjects[i].link));
    }

    tracker.init();

  }).fail(function() {
    console.log("Shit. It didn't work.");
  });
});
