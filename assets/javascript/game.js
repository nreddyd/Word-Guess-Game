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

  Array.prototype.randomElement = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  // Hangman Object
  var hangman = {
    numofwins: 0,
    numoflosses: 0,
    numberofguesses: 5,
    lettersguesses: [],
    randomcountry: [],
    currentword: [],

    // select a new country and reset the number of guesses, letters guessed and the current word
    reset: function() {
      var hangman = this;
      isStart = false;
      this.numberofguesses = 5;
      this.lettersguesses = [];
      this.currentword = [];
      this.randomcountry = countries.randomElement();
      for (var i = 0; i < this.randomcountry.length; i++) {
        this.currentword[i] = "_";
      }

      // displays the image based on the country selected
      function changeimage() {
        if (hangman.randomcountry === countries[0]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Bengal_Tiger_Karnataka.jpg/150px-Bengal_Tiger_Karnataka.jpg";
        } else if (hangman.randomcountry === countries[1]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/American_Beaver.jpg/150px-American_Beaver.jpg";
        } else if (hangman.randomcountry === countries[2]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Haliaeetus_leucocephalus.jpeg/150px-Haliaeetus_leucocephalus.jpeg";
        } else if (hangman.randomcountry === countries[3]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Giant_Panda_2004-03-2.jpg/150px-Giant_Panda_2004-03-2.jpg";
        } else if (hangman.randomcountry === countries[4]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Cygnus_olor_2_%28Marek_Szczepanek%29.jpg/150px-Cygnus_olor_2_%28Marek_Szczepanek%29.jpg";
        } else if (hangman.randomcountry === countries[5]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Red_kangaroo_-_melbourne_zoo.jpg/150px-Red_kangaroo_-_melbourne_zoo.jpg";
        } else if (hangman.randomcountry === countries[6]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Coq-gaulois-dore.JPG/150px-Coq-gaulois-dore.JPG";
        } else if (hangman.randomcountry === countries[7]) {
          document.getElementById("img").src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/European_Brown_Bear.jpg/150px-European_Brown_Bear.jpg";
        }
      }

      changeimage();
      // update the new values in the html
      document.getElementById(
        "numberofguesses"
      ).innerHTML = this.numberofguesses;
      document.getElementById("currentword").innerHTML = this.currentword;
      document.getElementById("lettersguessed").innerHTML = this.lettersguesses;
    },

    // function to return true if the input letter is  already guessed
    // return false if the input is a new and not guessed previously
    inputalreadyguessed: function(input) {
      for (i = 0; i < this.lettersguesses.length; i++) {
        if (input === this.lettersguesses[i]) {
          alert("The letter " + input + " is already guessed");
          return true;
        }
      }
      return false;
    },

    // function to compare the current word and the random country selected
    // return true if they are same.
    //return false if not same.
    compare: function() {
      for (var i = 0; i < this.currentword.length; i++) {
        if (this.currentword[i] != this.randomcountry[i]) {
          return false;
        }
      }
      return true;
    }
  };

  // reset all the hangman values when reset button is clicked
  $(".reset").on("click", function() {
    hangman.numofwins = 0;
    hangman.numoflosses = 0;
    document.getElementById("numofwins").innerHTML = hangman.numofwins;
    document.getElementById("numoflosses").innerHTML = hangman.numoflosses;

    isStart = true;
    hangman.reset();
  });

  // get the input letter on key press
  document.onkeyup = function(event) {
    input = event.key.toUpperCase();
    // enter = event.keyCode ? eevent.keyCode : event.which;
    var isrightguess = false;

    // initialise all the hangman variables at the begining
    if (isStart) {
      hangman.reset();
    }

    // if inout is not a alphabet do not take it as input
    if (letters.indexOf(input) == -1 && event.keyCode != 13) {
      alert("You have to input a letter");
    } else {
      if (event.keyCode === 13) {
        exit();
      }
      var isguessed = hangman.inputalreadyguessed(input);
      // if the inout is already guessed
      if (!isguessed) {
        for (var i = 0; i < hangman.randomcountry.length; i++) {
          if (input === hangman.randomcountry[i]) {
            hangman.currentword[i] = input;
            // check if the updated current word is same as the random country selected
            if (hangman.compare()) {
              hangman.numofwins++;
              audioElement.setAttribute(
                "src",
                "assets/music/Correct-answer.mp3"
              );
              audioElement.play();
              document.getElementById("numofwins").innerHTML =
                hangman.numofwins;

              // isStart = true;
              hangman.reset();
              // exit();
            }
            document.getElementById("currentword").innerHTML =
              hangman.currentword;
            isrightguess = true;
          }
        }
        // decrement the number of guesses only if it is not the right guess
        if (!isrightguess) {
          hangman.lettersguesses += input;
          document.getElementById("lettersguessed").innerHTML =
            hangman.lettersguesses;
          hangman.numberofguesses--;
          document.getElementById("numberofguesses").innerHTML =
            hangman.numberofguesses;
          if (hangman.numberofguesses === 0) {
            hangman.numoflosses++;
            document.getElementById("numoflosses").innerHTML =
              hangman.numoflosses;
            audioElement.setAttribute("src", "assets/music/loose.mp3");
            audioElement.play();
            hangman.reset();
          }
        }
      }
    }
  };
});
