$(document).ready(function () {

    var triviaGame = {
        qOptions: [
            {
                question: 'When did the Liberty Bell get its name?',
                correctAnswer: 'in the 19th century, when it became a symbol of the abolition of slavery.',
                possibleAnswers: ['in the 19th century, when it became a symbol of the abolition of slavery.', 'when it was made, in 1701.', 'when it rang on July 4, 1776.', 'None.']
            },
            {
                question: 'In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?',
                correctAnswer: 'John and Mary.',
                possibleAnswers: ['John and Mary.', 'William and Elizabeth.', 'Joseph and Catherine.', 'George and Anne.']
            },
            {
                question: 'Who holds the record for the most victories in a row on the professional golf tour?',
                correctAnswer: 'Byron Nelson.',
                possibleAnswers: ['Byron Nelson.', 'Jack Nicklaus.', 'Arnold Palmer.', 'Ben Hogan.']
            },
            {
                question: 'Which of the following items was owned by the fewest U.S. homes in 1990?',
                correctAnswer: 'Compact disk player.',
                possibleAnswers: ['Compact disk player.', 'Home computer.', 'Cordless phone.', 'Dishwasher.']
            },
            {
                question: 'Who is third behind Hank Aaron and Babe Ruth in major league career home runs?',
                correctAnswer: 'Willie Mays.',
                possibleAnswers: ['Willie Mays.', 'Reggie Jackson.', 'Harmon Killebrew.', 'Frank Robinson.']
            },
            {
                question: 'In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?',
                correctAnswer: '18.',
                possibleAnswers: ['18.', '8.', '24.', '52.']
            },
            {
                question: 'During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?',
                correctAnswer: 'Cocker Spaniel.',
                possibleAnswers: ['Cocker Spaniel.', 'German Shepherd.', 'Labrador Retriever.', 'Poodle.']
            }
        ],
        qInPlay: [],
        qNumber: 0,
        answered: 0,
        time: 20,
        playing: false,
        checkAnswer: 0,
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

            // this if needs to be smaller or equal thna the questions

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
                    $('#playingDiv').html(
                        '<div><h4>Wow really? not a single question answered correctly?</h4></div>' +
                        '<button id="playButton">Click to play Again</button>'
                    );
                } else if (triviaGame.answered === 1) {
                    $('#playingDiv').html(
                        '<div><h4>Wow that was bad, you answered only ' + triviaGame.answered + ' question out of ' + triviaGame.qInPlay.length + '</h4></div>' +
                        '<button id="playButton">Click to play Again</button>'
                    );
                } else if (triviaGame.answered > 1 && triviaGame.answered < 4) {
                    $('#playingDiv').html(
                        '<div><h4>That was decent, you answered ' + triviaGame.answered + ' questions out of ' + triviaGame.qInPlay.length + '</h4></div>' +
                        '<button id="playButton">Click to play Again</button>'
                    );
                } else if (triviaGame.answered === 4) {
                    $('#playingDiv').html(
                        '<div><h4>Almost perfect! you answered ' + triviaGame.answered + ' questions out of ' + triviaGame.qInPlay.length + '</h4></div>' +
                        '<button id="playButton">Click to play Again</button>'
                    );
                } else if (triviaGame.answered === 5) {
                    $('#playingDiv').html(
                        '<div><h4>Ha perfect!, you answered every question!</h4></div>' +
                        '<button id="playButton">Click to play Again</button>'
                    );
                };
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
                '<div id=""><h4>' + this.qInPlay[this.qNumber].question + '</h4></div>'
            );
            for (i = 0; i < answersUnordered.length; i++) {
                $('#playingDiv').append('<div id="answer' + i + '" class="answerButton">' + answersUnordered[i] + '</div>');
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
                $('#playingDiv').html('<div><h4>Correct! the answer was "' + this.qInPlay[this.qNumber - 1].correctAnswer + '"</h4></div>');
            } else if (str === 'timeout') {
                $('#playingDiv').html('<div><h4>Out of time, the correct answer was "' + triviaGame.qInPlay[triviaGame.qNumber - 1].correctAnswer + '"</h4></div>');
            } else if (str !== this.qInPlay[this.qNumber - 1].correctAnswer) {
                $('#playingDiv').html('<div><h4>Wrong!, the correct answer was "' + this.qInPlay[this.qNumber - 1].correctAnswer + '"</h4></div>');
            };
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
                    $(this).toggleClass("active");
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