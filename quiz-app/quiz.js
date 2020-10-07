
var questions = [{
    question: "Which tool is used to configure a sound card device?",
    choices: ["sndconf", "sndconfig", "soundconf", "soundconfig"],
    correctAnswer: 1
}, {
    question: "Which file holds the Plug-and-Play configuration information?",
    choices: ["/etc/pcipnp.conf", "/etc/pnp.conf", "/etc/rc.d/init.d/isapnp", "/etc/isapnp.conf"],
    correctAnswer: 3
}, {
    question: "Drivers reside in which environment?",
    choices: ["Kernel space", "Device space", "Application spaceup", "User space"],
    correctAnswer: 0
}, {
    question: "How can you view the used IRQs on a system?",
    choices: ["cat /etc/interrupts", "cat /proc/irq", "cat /proc/interrupts", "echo 1 > /proc/interrupts"],
    correctAnswer: 2
}, {
    question: "Which type of modems are not traditionally supported under Linux?",
    choices: ["Winmodem", "3Com", "PCI", "PCMCIA"],
    correctAnswer: 0
}, {
    question: " Which platforms does Linux currently support?",
    choices: ["Intel x86", "Sun SPARC", "Compaq Alpha", "All of the above"],
    correctAnswer: 3	
}, {
    question: " Linux requires a graphical video card with at least 2MB of memory.",
    choices: ["True", "False"],
    correctAnswer: 1	
}, {
    question: "How many primary partitions can you have on a hard disk?",
    choices: ["4", "8", "16", "32"],
    correctAnswer: 0
}, {
    question: "Which shell is the default shell used on Linux systems?",
    choices: ["csh", "rsh", "bash", "tcsh"],
    correctAnswer: 2

}, {
    question: "Keyboard bindings can be viewed using which command?",
    choices: ["bind -keys", "bind -v", "display -keys", "display -v"],
    correctAnswer: 1
}, {
    question: "Which key allows you to view the last command entered?",
    choices: ["down arrow", "up arrow", "right arrow", "left arrow"],
    correctAnswer: 1
	}, {
    question: "It is possible to run commands that are not located in a directory listed in the PATH if you know the full path and command name.",
    choices: ["True", "False"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}