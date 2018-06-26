$(document).ready(function() {
  // Declarations
  var countries = [
    "INDIA",
    "CANADA",
    "USA",
    "CHINA",
    "DENMARK",
    "AUSTRALIA",
    "FRANCE",
    "FINLAND"
  ];
  var letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  var input;
  var isStart = true;
  var audioElement = document.createElement("audio");

  // document.getElementById("numofwins").innerHTML = numofwins;

  Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  var hangman = {
    numofwins: 0,
    numberofguesses: 5,
    lettersguesses: [],
    randomcountry: [],
    currentword: [],

    reset: function() {
      var hangman = this;
      console.log("inside reset");
      isStart = false;
      this.numberofguesses = 5;
      this.lettersguesses = [];
      this.currentword = [];
      this.randomcountry = countries.randomElement();
      console.log(this.randomcountry);
      for (var i = 0; i < this.randomcountry.length; i++) {
        this.currentword[i] = "_";
      }

      function changeimage() {
        if (hangman.randomcountry == countries[0]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Bengal_Tiger_Karnataka.jpg/150px-Bengal_Tiger_Karnataka.jpg";
        } else if (hangman.randomcountry == countries[1]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/American_Beaver.jpg/150px-American_Beaver.jpg";
        } else if (hangman.randomcountry == countries[2]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Haliaeetus_leucocephalus.jpeg/150px-Haliaeetus_leucocephalus.jpeg";
        } else if (hangman.randomcountry == countries[3]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Giant_Panda_2004-03-2.jpg/150px-Giant_Panda_2004-03-2.jpg";
        } else if (hangman.randomcountry == countries[4]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Cygnus_olor_2_%28Marek_Szczepanek%29.jpg/150px-Cygnus_olor_2_%28Marek_Szczepanek%29.jpg";
        } else if (hangman.randomcountry == countries[5]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Red_kangaroo_-_melbourne_zoo.jpg/150px-Red_kangaroo_-_melbourne_zoo.jpg";
        } else if (hangman.randomcountry == countries[6]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Coq-gaulois-dore.JPG/150px-Coq-gaulois-dore.JPG";
        } else if (hangman.randomcountry == countries[7]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/European_Brown_Bear.jpg/150px-European_Brown_Bear.jpg";
        }
      }

      changeimage();

      document.getElementById(
        "numberofguesses"
      ).innerHTML = this.numberofguesses;
      document.getElementById("currentword").innerHTML = this.currentword;
      document.getElementById("lettersguessed").innerHTML = this.lettersguesses;
    },

    inputalreadyguessed: function(input) {
      for (i = 0; i < this.lettersguesses.length; i++) {
        if (input === this.lettersguesses[i]) {
          alert("The letter " + input + " is already guessed");
          return true;
        }
      }
      return false;
    },

    compare: function() {
      for (var i = 0; i < this.currentword.length; i++) {
        if (this.currentword[i] != this.randomcountry[i]) {
          return false;
        }
      }
      return true;
    }
  };

  $(".reset").on("click", function() {
    hangman.numofwins = 0;
    document.getElementById("numofwins").innerHTML = hangman.numofwins;
    isStart = true;
    hangman.reset();
  });

  document.onkeyup = function(event) {
    input = event.key.toUpperCase();
    var isrightguess = false;

    if (isStart) {
      hangman.reset();
    }
    if (letters.indexOf(input) == -1) {
      alert("You have to input a letter");
    } else if (!hangman.compare()) {
      if (hangman.numberofguesses > 0) {
        var isguessed = hangman.inputalreadyguessed(input);
        if (!isguessed) {
          for (var i = 0; i < hangman.randomcountry.length; i++) {
            if (input == hangman.randomcountry[i]) {
              hangman.currentword[i] = input;
              if (hangman.compare()) {
                hangman.numofwins++;
                audioElement.setAttribute(
                  "src",
                  "assets/music/Correct-answer.mp3"
                );
                audioElement.play();
                document.getElementById("numofwins").innerHTML =
                  hangman.numofwins;
                isStart = true;
                hangman.reset();
                exit();
              }
              document.getElementById("currentword").innerHTML =
                hangman.currentword;
              isrightguess = true;
            }
          }
          if (!isrightguess) {
            hangman.lettersguesses += input;
            document.getElementById("lettersguessed").innerHTML =
              hangman.lettersguesses;
            hangman.numberofguesses--;
            document.getElementById("numberofguesses").innerHTML =
              hangman.numberofguesses;
          } else {
            hangman.lettersguesses += input;
            document.getElementById("lettersguessed").innerHTML =
              hangman.lettersguesses;
          }
        }
      } else {
        audioElement.setAttribute("src", "assets/music/loose.mp3");
        audioElement.play();
        hangman.start = true;
        hangman.reset();
      }
    }
  };
});
