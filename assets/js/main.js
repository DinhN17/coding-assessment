// JS questions source from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
//Object: questionBank contains jsQuestions, methods: generateQuiz, 
const questionBank = {
    //jsQuestions: an array contain all of questions for javascript. Each element of array contains question, options, and answer.
    jsQuestions: [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            options: ["<js>","<script>","<javascript>","<scripting>"],
            answer: "<script>"
        },
        {
            question: "Where is the correct place to insert a JavaScript?",
            options: ["Both the <head> section and the <body> section are correct",
                        "The <body> section",
                        "The <head> section"
            ],
            answer: "Both the <head> section and the <body> section are correct"
        },
        {
            question: "What is the correct JavaScript syntax to change the content of the HTML element below?\<p id=\"demo\">This is a demonstration.</p>",
            options: ["document.getElementById(\"demo\").innerHTML = \"Hello World!\"",
                        "#demo.innerHTML = \"Hello World!\"",
                        "document.getElement(\"p\").innerHTML = \"Hello World!\"",
                        "document.getElementByName(\"p\").innerHTML = \"Hello World!\"",
            ],
            answer: "document.getElementById(\"demo\").innerHTML = \"Hello World!\""
        },
        {
            question: "How can you detect the client's browser name?",
            options: ["client.navName",
                        "navigator.appName",
                        "browser.name"
            ],
            answer: "navigator.appName"
        },
        {
            question: "Is JavaScript case-sensitive?",
            options: ["No",
                        "Yes"
            ],
            answer: "Yes"
        },
        {
            question: "The external JavaScript file must contain the <script> tag.",
            options: ["True",
                        "False"
            ],
            answer: "False"
        },
    ],
    
    // getJSQuestion return an element at index from jsQuestion array.
    getJSQuestion: function(index) {
        return this.jsQuestions[index];
    },
    
    // _getRandomPatch return an array which elements are randomly pick from source array.
    _getRandomPatch: function(srcArray, patchLength) {
        var retArray = [];
        var tempArray = JSON.parse(JSON.stringify(srcArray));
        if (patchLength > tempArray.length) {
            patchLength = tempArray.length;            
        };
        while (patchLength!==0) {
            var randomIndex = Math.floor(Math.random()*tempArray.length);
            retArray.push(tempArray[randomIndex]);
            tempArray.splice(randomIndex, 1);
            patchLength--;
        }
        return retArray;
    },

    // generateJSQuiz return an array of given number of random questions from jsQuestion.
    generateJSQuiz: function(number) {
        // var srcJSQuiz = this.jsQuestions;
        var retJSQuiz = this._getRandomPatch(this.jsQuestions, number);
        
        // shuffle options of each question
        retJSQuiz.forEach(element => {
            element.options = this._getRandomPatch(element.options, element.options.length);
        });

        return retJSQuiz;
    },
}

// HTML elements
var viewHighscores = document.getElementById("view-highscores");
var timeEL = document.getElementById("timer");
var quizEL = document.getElementById("quiz");
var quizHeader = document.getElementById("quiz-header");
var quizBody = document.getElementById("quiz-body");
var quizFooter = document.getElementById("quiz-footer");
var startButton = document.getElementById("start-quiz");

// Global constants and variables
const numberQuestions = 5;
const defaultCountdown = 100;

var questionPatch;
var questionIndex = 0;
var lastAnswer = "";
var timeInterval;
var timeCounter = 100;

//render one child
function renderOneChild(parentEL, elementType, Text) {
    parentEL.innerHTML = "";
    var child = document.createElement(elementType);
    child.textContent = Text;
    parentEL.appendChild(child);
    return child;
}

// render timer
function renderTimer(counter) {
    timeEL.textContent = 'Time: ' + counter;        
}

// render view-highscores
function renderViewHighscores() {
    viewHighscores.textContent = "View Highscores";
}

// render greeting
function renderFirstGreeting() {
    // reset variables
    questionIndex = 0;
    lastAnswer = "";
    timeCounter = 0;

    renderViewHighscores();
    renderTimer(0);

    //render Quiz greeting
    renderOneChild(quizHeader, "h1", "Code Quiz Challenge");
    renderOneChild(quizBody, "p", "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds.");
    renderOneChild(quizFooter, "button", "Start Quiz");  
};

// render question in quiz.
function renderQuiz(question) {
    // render question on quiz-header
    renderOneChild(quizHeader, "h3", question.question);
    
    // render options on quiz-body
    var ul = renderOneChild(quizBody, "ul", "");
    
    question.options.forEach(element => {
        var li = document.createElement("li");
        li.textContent = element;
        
        ul.appendChild(li);                
    });
    
    // render last result on quiz-footer
    if (lastAnswer !== "") {
        renderOneChild(quizFooter, "p", lastAnswer);
    } else {
        quizFooter.innerHTML = "";
    };

}

// render submit result
function renderSubmitResult() {
    // render question on quiz-header
    renderOneChild(quizHeader, "h3", "All done!");
    // quizHeader.firstElementChild.textContent = "All done!";
    
    // update timer
    renderTimer(timeCounter);

    // render final scores on quiz-body
    var text = "Your final score is " + timeCounter;
    renderOneChild(quizBody, "p", text);
    
    // render Textbox and submit button on quiz-footer
    quizFooter.innerHTML = "";
    
}

// countdown timer
function startTimer(countdown) {
    // reset global timeCounter;
    timeCounter = countdown;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
      //
      if (timeCounter > 0) {
        // Show the remaining time.
        renderTimer(timeCounter);
        // Decrement `timeLeft` by 1
        timeCounter--;
      } else {
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // quiz is done, show the result
        renderSubmitResult();
      }
    }, 1000);
}
function init() {
    renderFirstGreeting();
};

// const quiz = questionBank.generateJSQuiz(5);
// showQuiz(questionBank.generateJSQuiz(5));

//catch clicking on Start Quiz button
quizFooter.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        questionPatch = questionBank.generateJSQuiz(numberQuestions);
        //render quiz
        questionIndex = 0;
        renderQuiz(questionPatch[questionIndex]);

        //start timer

        startTimer(defaultCountdown);

      }    
});

//catch clicking on options in quiz-body to make choice
quizBody.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("li") === true) {
        //check answer
        if (element.textContent === questionPatch[questionIndex].answer) {
            lastAnswer = "Correct!";
        } else {
            lastAnswer = "Wrong!";
            timeCounter = timeCounter - 10;
        }
        //render quiz
        questionIndex++;
        if (questionIndex < questionPatch.length) {
            renderQuiz(questionPatch[questionIndex]);            
        } else {
            // stop timer and show result
            clearInterval(timeInterval);
            renderSubmitResult();
        };
        
      }    
});

//click on View Highscores

init();