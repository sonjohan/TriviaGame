$(document).ready(function () {

    var triviaGame = {
        qOptions: [
            {
                question: 'What was Obi-Wan Kenobi‘s final promise to Qui-gon Jinn?',
                correctAnswer: 'Train Anakin Skywalker.',
                completeAnswer: 'Obi Wan promised that he would train Anakin Skywalker.',
                possibleAnswers: ['Train Anakin Skywalker.', 'Defeal the Sith Lords.', 'Train Luke Skywalker.', 'Defeat the Emperor.'],
                image: 'assets/images/questionImages/obiwanNanakin.jpg'
            },
            {
                question: 'Who led the battle of Kashyyyk for the Republic?',
                correctAnswer: 'Yoda.',
                completeAnswer: 'Yoda led the battle of Kashyyyk for the Republic.',
                possibleAnswers: ['Yoda.', 'Luke Skywalker.', 'Han Solo.', 'Chewaka.'],
                image: 'assets/images/questionImages/yoda.jpg'
            },
            {
                question: 'What does the Republic Cruiser‘s red color signify?',
                correctAnswer: 'Political neutrality.',
                completeAnswer: 'Republic Cruiser’s red color signifies its political neutrality.',
                possibleAnswers: ['Political neutrality.', 'Attack fleet.', 'Nothing.', 'On a mission.'],
                image: 'assets/images/questionImages/republicCruiser.jpg'
            },
            {
                question: 'What did hibernation sickness do to Han Solo?',
                correctAnswer: 'Temporary blindness.',
                completeAnswer: 'Hibernation sickness caused Han Solo temporary blindness.',
                possibleAnswers: ['Temporary blindness.', 'Nothing.', 'Temporary memory loss.', 'A cold.'],
                image: 'assets/images/questionImages/hanSoloBlind.jpg'
            },
            {
                question: 'What type of droid was Anakin Skywalker building to help his mother?',
                correctAnswer: 'A protocol droid.',
                completeAnswer: 'Anakin Skywalker was building a protocol droid to help his mother.',
                possibleAnswers: ['A protocol droid.', 'An attack droid.', 'R2-D2.', "He wasn't building a droid."],
                image: 'assets/images/questionImages/protocolDroid.jpg'
            },
            {
                question: 'Who finally fixed the hyperdrive on the Millennium Falcon?',
                correctAnswer: 'R2-D2.',
                completeAnswer: 'R2-D2 fixed the hyperdrive on the Millennium Falcon.',
                possibleAnswers: ['R2-D2.', 'C-3PO.', 'Han Solo.', 'Chewaka.'],
                image: 'assets/images/questionImages/r2-d2.jpg'
            },
            {
                question: 'For how long are creatures swallowed by a sarlacc digested?',
                correctAnswer: 'Over a thousand years.',
                completeAnswer: 'Creatures swallowed by a sarlacc are digested for over a thousand years.',
                possibleAnswers: ['Over a thousand years.', 'Over a hundred years', 'Over a month.', 'One day.'],
                image: 'assets/images/questionImages/sarlacc.jpg'
            }
        ],
        qInPlay: [],
        qNumber: 0,
        answered: 0,
        time: 20,
        playing: false,
        timer: undefined,
        timeToAnswer: undefined,

        playTrivia: function () {
            this.qInPlay = [];
            this.qNumber = 0;
            this.answered = 0;
            this.checkAnswer = 0;
            this.playing = true;
        },

        selectQuestion: function () {

            // this if needs to be smaller or equal to the total questions in the object (qOptions)
            // if question limit is increased make sure the review lines 74-82

            if (triviaGame.qInPlay.length < 5) {
                var added = false;
                while (!added) {
                    var qToAdd = triviaGame.qOptions[Math.floor(Math.random() * triviaGame.qOptions.length)];
                    if (triviaGame.checkArray(qToAdd, triviaGame.qInPlay)) {
                        triviaGame.qInPlay.push(qToAdd);
                        added = true;
                    };
                };

                triviaGame.setQuestion();
            } else {
                if (triviaGame.answered === 0) {
                    $('#playingDiv').html('<div class="result"><h4>Wow really? not a single question answered correctly?</h4><h3>Your rank: Wannabe Jedi</h3></div>');
                } else if (triviaGame.answered === 1) {
                    $('#playingDiv').html('<div class="result"><h4>Wow that was bad, you answered correctly only ' + triviaGame.answered + ' question out of ' + triviaGame.qInPlay.length + '</h4><h3>Your rank: Jedi Initiate</h3></div>');
                } else if (triviaGame.answered > 1 && triviaGame.answered < 4) {
                    $('#playingDiv').html('<div class="result"><h4>That was decent, you answered correctly ' + triviaGame.answered + ' questions out of ' + triviaGame.qInPlay.length + '</h4><h3>Your rank: Padawan</h3></div>');
                } else if (triviaGame.answered === 4) {
                    $('#playingDiv').html('<div class="result"><h4>Almost perfect! you answered correctly ' + triviaGame.answered + ' questions out of ' + triviaGame.qInPlay.length + '</h4><h3>Your rank: Jedi</h3></div>');
                } else if (triviaGame.answered === 5) {
                    $('#playingDiv').html('<div class="result"><h4>Ha! perfect!, you answered correctly every question!</h4><h3>Your rank: Master jedi</h3></div>');
                };
                $('#playingDiv').append('<div class="playHolder"><button id="playButton" class="btn btn-danger">Click to play Again</button></div>');
                
                $('#playButton').on('click', function () {
                    triviaGame.playTrivia();
                    triviaGame.selectQuestion();
                });
            };
        },

        checkArray: function (val, arr) {
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                    return false;
                };
            };
            return true;
        },

        setQuestion: function () {
            var answersUnordered = [];
            console.log('questions so far: ' + this.qNumber);
            while (answersUnordered.length < this.qInPlay[this.qNumber].possibleAnswers.length) {
                var answerToAdd = this.qInPlay[this.qNumber].possibleAnswers[Math.floor(Math.random() * this.qInPlay[this.qNumber].possibleAnswers.length)];
                if (this.checkArray(answerToAdd, answersUnordered)) {
                    answersUnordered.push(answerToAdd);
                };
            };
            $('#playingDiv').html(
                '<div id="timer">20</div>' +
                '<div id="question"><h4>' + this.qInPlay[this.qNumber].question + '</h4></div>'
            );
            for (i = 0; i < answersUnordered.length; i++) {
                $('#playingDiv').append('<div class="answerButton rounded"><p>' + answersUnordered[i] + '</p></div>');
            };
            this.startTimers();
            this.answerButtons();
        },

        startTimer: function () {
            triviaGame.time--;
            if (triviaGame.time >= 10) {
                $('#timer').html(triviaGame.time);
            } else if (triviaGame.time < 10 && triviaGame.time >= 0) {
                $('#timer').html('0' + triviaGame.time);
            };
        },

        validateAnswer: function (str) {
            this.qNumber++;
            setTimeout(function () {
                triviaGame.selectQuestion();
            }, 3000);
            if (str === this.qInPlay[this.qNumber - 1].correctAnswer) {
                this.answered++;
                $('#playingDiv').html('<div class="answerResult"><h4>Correct!<br>"' + this.qInPlay[this.qNumber - 1].completeAnswer + '"</h4></div>');
            } else if (str === 'timeout') {
                $('#playingDiv').html('<div class="answerResult"><h4>Out of time,<br>"' + triviaGame.qInPlay[triviaGame.qNumber - 1].completeAnswer + '"</h4></div>');
            } else if (str !== this.qInPlay[this.qNumber - 1].correctAnswer) {
                $('#playingDiv').html('<div class="answerResult"><h4>Wrong!<br>"' + this.qInPlay[this.qNumber - 1].completeAnswer + '"</h4></div>');
            };
            $('#playingDiv').append('<div class="questionImage"><img src="'+this.qInPlay[this.qNumber - 1].image+'" class="img-fluid rounded"></div>');
        },

        startTimers: function () {
            this.time = 20;
            this.timer = setInterval(triviaGame.startTimer, 1000);
            this.timeToAnswer = setTimeout(function () {
                clearInterval(triviaGame.timer);
                clearTimeout(triviaGame.timeToAnswer);
                triviaGame.validateAnswer('timeout');
            }, 20000);
        },

        answerButtons: function () {
            $('.answerButton').on({
                mouseenter: function () {
                    $(this).addClass("bg-dark text-light");
                }, mouseleave: function () {
                    $(this).removeClass("bg-dark text-light");
                }, click: function () {
                    clearTimeout(triviaGame.timeToAnswer);
                    clearInterval(triviaGame.timer);
                    triviaGame.validateAnswer($('.active').text());
                }
            });
        },

        resetQuestion: function () {
            this.time = 20;
        }
    };

    $('#playButton').on('click', function () {
        triviaGame.playTrivia();
        triviaGame.selectQuestion();
    });
});