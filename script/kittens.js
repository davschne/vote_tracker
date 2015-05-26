var numImages = 14;

function Photo(image) {
  this.image = image;
  this.votes = 0;
}

Photo.prototype.display = function($element) {
  $element.empty()
    .append('<img src="' + this.image + '">');
};

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

  var showVotes = function(photoA, photoB) {

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
    $element.addClass("highlight");

    // display votes for both images
    showVotes();

    // disable further voting
    $('.photos').off("click");

    // show button to vote again

  };

  this.init = function() {
    // get image container nodes
    $photos = $('.photos').removeClass("highlight");

    // remove highlighting

    // hide vote-again button


    // load photos
    var indices = getRandomIndices();
    imgA = photos[indices[0]];
    imgB = photos[indices[1]];
    imgA.display($photos.eq(0));
    imgB.display($photos.eq(1));

    // register event listener for voting
    $('.photos').on("click", win);
  };
}

var tracker = new Tracker();
tracker.init();
