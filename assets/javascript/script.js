$(document).ready(function () {

    var triviaGame = {
        qOptions: [
            {
                question: 'When did the Liberty Bell get its name?',
                correctAnswer: 'in the 19th century, when it became a symbol of the abolition of slavery.',
                wrongAnswer1: 'when it was made, in 1701.',
                wrongAnswer2: 'when it rang on July 4, 1776.',
                wrongAnswer3: 'None.'
            },
            {
                question: 'In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?',
                correctAnswer: 'John and Mary.',
                wrongAnswer1: 'William and Elizabeth.',
                wrongAnswer2: 'Joseph and Catherine.',
                wrongAnswer3: 'George and Anne.'
            },
            {
                question: 'Who holds the record for the most victories in a row on the professional golf tour?',
                correctAnswer: 'Byron Nelson.',
                wrongAnswer1: 'Jack Nicklaus.',
                wrongAnswer2: 'Arnold Palmer.',
                wrongAnswer3: 'Ben Hogan.'
            },
            {
                question: 'Which of the following items was owned by the fewest U.S. homes in 1990?',
                correctAnswer: 'Compact disk player.',
                wrongAnswer1: 'Home computer.',
                wrongAnswer2: 'Cordless phone.',
                wrongAnswer3: 'Dishwasher.'
            },
            {
                question: 'Who is third behind Hank Aaron and Babe Ruth in major league career home runs?',
                correctAnswer: 'Willie Mays.',
                wrongAnswer1: 'Reggie Jackson.',
                wrongAnswer2: 'Harmon Killebrew.',
                wrongAnswer3: 'Frank Robinson.'
            },
            {
                question: 'In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?',
                correctAnswer: '18.',
                wrongAnswer1: '8.',
                wrongAnswer2: '24.',
                wrongAnswer3: '52.'
            },
            {
                question: 'During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?',
                correctAnswer: 'Cocker Spaniel.',
                wrongAnswer1: 'German Shepherd.',
                wrongAnswer2: 'Labrador Retriever.',
                wrongAnswer3: 'Poodle.'
            },
        ],
        qInPlay: [],
        qNumber: 0,
        answered: 0,
        time: 30,
        playing: false,

        playTrivia: function () {
            this.playing = true;
            console.log('playing: ' + this.playing);
            this.selectQuestion();
            console.log('question1: ' + this.qInPlay[this.qNumber].question);
            console.log(this.qInPlay.length);
            console.log('----------------');
            this.drawQuestion();
        },

        selectQuestion: function () {
            // while (this.qInPlay.length < 4) {
            var qToAdd = this.qOptions[Math.floor(Math.random() * this.qOptions.length)];
            if (this.checkArray(qToAdd, this.qInPlay)) {
                this.qInPlay.push(qToAdd);
            };
            // };
        },

        checkArray: function (val, arr) {
            for (i = 0; i < arr.length; i++) {
                if (arr[i] === val) {
                    return false;
                };
            };
            return true;
        },

        drawQuestion: function () {
            var possibleAnswers = [this.qInPlay[this.qNumber].correctAnswer, this.qInPlay[this.qNumber].wrongAnswer1, this.qInPlay[this.qNumber].wrongAnswer2, this.qInPlay[this.qNumber].wrongAnswer3];
            var answersUndordered = [];
            while (answersUndordered.length < 4) {
                var answerToAdd = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
                if (this.checkArray(answerToAdd, answersUndordered)) {
                    answersUndordered.push(answerToAdd);
                };
            };
            var answerToSet;
            $('#playingDiv').html(
                '<p id="timer"></p>' +
                '<P>'+ this.qInPlay[this.qNumber].question+'</p>' +
                '<div id="answer0" class="answerButton"></div>' +
                '<div id="answer1" class="answerButton"></div>' +
                '<div id="answer2" class="answerButton"></div>' +
                '<div id="answer3" class="answerButton"></div>'
            );
            for (j = 0; j < possibleAnswers.length; j++) {
                $('#answer' + j).text(answersUndordered[j]);
            };
            console.log(answersUndordered);
            var timeToAnswer= setInterval(this.startTimer,1000);
            $('.answerButton').on({
                mouseenter: function () {
                    $(this).addClass("bg-dark text-light");
                }, mouseleave: function () {
                    $(this).removeClass("bg-dark text-light");
                }, click: function () {
                    $(this).toggleClass("active");
                    clearInterval(timeToAnswer);
                }
            });
        },

        startTimer: function () {
            triviaGame.time--;
            console.log(triviaGame.time);
            if (triviaGame.time >= 10) {
                $('#timer').html(triviaGame.time);
            } else if (triviaGame.time < 10 && triviaGame.time >= 0) {
                $('#timer').html('0' + triviaGame.time);
            };
        }
    };


    $('#playButton').on('click', function () {
        triviaGame.playTrivia();
    });

});