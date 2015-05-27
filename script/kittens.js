$(function() {
  var numImages = 14;

  function Photo(image) {
    this.image = image;
    this.votes = 0;
  }

  Photo.prototype.displayImages = function($element) {
    $element.empty()
      .append('<img src="' + this.image + '">');
  };

  Photo.prototype.displayVotes = function($element) {
    $element.append('<p>Total votes: <span class="votes">' + this.votes + '</span></p>');
  }

  var photos = [];
  for (var i = 1; i <= numImages; i++) {
    photos.push(new Photo("images/" + i.toString() + ".jpg"));
  }

  function Tracker() {
    var imgA, imgB;

    var getRandomIndices = function() {
      var randA = Math.floor(Math.random() * numImages);
      do {
        var randB = Math.floor(Math.random() * numImages);
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
      $photos = $('.photos')//.removeClass("highlight");

      // hide/disable vote-again
      $('.vote-again').hide();
      $('.vote-again button').off("click");

      // load photos
      var indices = getRandomIndices();
      imgA = photos[indices[0]];
      imgB = photos[indices[1]];
      imgA.displayImages($photos.eq(0));
      imgB.displayImages($photos.eq(1));

      // register event listener for voting
      $('.photos').on("click", win);
    };

    var win = function(event) {
      var $element = $(event.target).parent();

      // determine winning image
      var winner = getWinner($element);
      console.log(winner);

      // increment votes for winning image
      winner.votes++;

      // highlight winning image
      // we define a CSS class "highlight"
      $element.children('img').addClass("highlight");

      // display votes for both images
      showVotes();

      // disable further voting
      $('.photos').off("click");

      // allow voting again
      $('.vote-again').show();
      $('.vote-again button').on("click", function(event) {
        event.preventDefault();
        tracker.init();
      });
    };
  }

  var tracker = new Tracker();
  tracker.init();
});
