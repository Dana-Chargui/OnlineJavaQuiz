
(function() {
    var questions = [{
        question: "What is a correct syntax to output Hello World in Java?",
        choices: ["console.writeLine('hello world')", "printf('hello world')","print('hello world')","System.out.println('hello world')"],
        correctAnswer: 3
    }, {
        question: "How do you insert COMMENTS in Java code?",
        choices: ["#","--","/**/","//"],
        correctAnswer: 3
    }, {
        question: "Which data type is used to create a variable that should store text?",
        choices: ["String", "mystring", "txt", "string", "text"],
        correctAnswer: 0
    }, {
        question: "How do you create a variable with the numeric value 5?",
        choices: ["x=5", "float x=5", "int x=5", "num x=5", "string x=5"],
        correctAnswer: 2
    }, {
        question: "How do you create a variable with the floating number 2.8?",
        choices: ["x = 2.8f;", "int x = 2.8f;", "byte x = 2.8f", "float x = 2.8f;  "],
        correctAnswer: 3
    }, {
        question: "Which method can be used to find the length of a string?",
        choices: ["length()","getLength()","len()","getSize()"],
        correctAnswer: 0
    }, {
        question: "Which operator is used to add together two values?",
        choices: ["*", "&", "+"],
        correctAnswer: 2
    }, {
        question: "Which method can be used to return a string in upper case letters?",
        choices: ["toUpperCase()", "upperCase()", "touppercase()", "tuc()"],
        correctAnswer: 0
    }, {
        question: "Which operator can be used to compare two values?",
        choices: ["==", "<>", "><", "="],
        correctAnswer: 0
    }, {
        question: "To declare an array in Java, define the variable type with:",
        choices: ["[]", "{}", "()"],
        correctAnswer: 0
    }, {
        question: "How do you create a method in Java?",
        choices: ["(methodName)", "methodName()","methodName[]", "methodName."],
        correctAnswer: 1
    }, {
        question: "Which keyword is used to create a class in Java?",
        choices: ["MyClass", "class", "class()", "className"],
        correctAnswer: 1
    }, {
        question: "What is the correct way to create an object called myObj of MyClass?",
        choices: ["class MyClass = new myObj()", "new myObj = MyClass();", "MyClass myObj = new MyClass();", "class myObj = new MyClass();"],
        correctAnswer: 2
    }, {
        question: "Which method can be used to find the highest value of x and y?",
        choices: ["Math.maximum(x,y)", "Math.maxNum(x,y)", "Math.max(x,y)", "Math.largest(x,y)"],
        correctAnswer: 2
    }, {
        question: "How do you start writing a while loop in Java?",
        choices: ["x > y while {", "while x > y:", "while x > y{", "while (x > y)"],
        correctAnswer: 3
    }];

    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 

    displayNext();

    $('#next').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        if (isNaN(selections[questionCounter])) {
            alert('Please select an answer');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    $('#prev').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    $('#start').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    $('.button').on('mouseenter', function() {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function() {
        $(this).removeClass('active');
    });

    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);

        return qElement;
    }

    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }

    function displayScore() {
        var score = $('<p>', {
            id: 'question'
        });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' correct, goodwork!');
        return score;
    }
})();

function startTimer() {
    var seconds = 120; 
    var timerDisplay = document.getElementById("timer");

    var countdown = setInterval(function() {
        seconds--;
        timerDisplay.innerHTML = "Time left: " + seconds + " seconds";

        if (seconds <= 0) {
            clearInterval(countdown);
            timerDisplay.innerHTML = "Time's up!";
        }
    }, 1000);
}

window.onload = startTimer;