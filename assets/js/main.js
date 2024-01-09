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

var scoreTable = {
    scores : [],
    // get score and save scores to localstorage
    saveScore : function(initial, time) {
        var userScore = {
            user: initial,
            score: time,
        };
        // console.log(userScore);
        this.scores.push(userScore);
        // console.log(this.scores);
        localStorage.setItem('scoreTable', JSON.stringify(this.scores));
    },
    
    loadScore : function() {
        if (localStorage.getItem("scoreTable") != null) {
            this.scores = JSON.parse(localStorage.getItem("scoreTable"));           
        };        
    },

    clearAll : function() {
        if (this.scores.length != 0) {
            this.scores.length = 0;
        };
        localStorage.removeItem("scoreTable");
    }
};

// HTML elements
var viewHighscores = document.getElementById("view-highscores");
var header = document.getElementById("header");
var timeEL = document.getElementById("timer");
var cardEl = document.getElementById("quiz");
var cardHeader = document.getElementById("quiz-header");
var cardBody = document.getElementById("quiz-body");
var cardFooter = document.getElementById("quiz-footer");
var startButton = document.getElementById("start-quiz");
var submitButton;
var inputInitials;

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
    renderOneChild(cardHeader, "h1", "Code Quiz Challenge");
    renderOneChild(cardBody, "p", "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds.");
    renderOneChild(cardFooter, "button", "Start Quiz");

    // set styles
    header.setAttribute("style", "display: flex; justify-content: space-between; width: 100%;");
};

// render question in quiz.
function renderQuiz(question) {
    // render question on quiz-header
    renderOneChild(cardHeader, "h3", question.question);
    
    // render options on quiz-body
    var ul = renderOneChild(cardBody, "ul", "");
    
    question.options.forEach(element => {
        var li = document.createElement("li");
        li.textContent = element;
        
        ul.appendChild(li);                
    });
    
    // render last result on quiz-footer
    if (lastAnswer !== "") {
        renderOneChild(cardFooter, "p", lastAnswer);
    } else {
        cardFooter.innerHTML = "";
    };

    // set styles
    cardEl.setAttribute("style", "display: flex; flex-direction: column; align-items: start; align-self: flex-start; margin-left: 21%; width: 100%");
}

// render submit result
function renderSubmitResult() {
    // render question on quiz-header
    renderOneChild(cardHeader, "h3", "All done!");
    // cardHeader.firstElementChild.textContent = "All done!";
    
    // update timer
    renderTimer(timeCounter);

    // render final scores on quiz-body
    var text = "Your final score is " + timeCounter;
    renderOneChild(cardBody, "p", text);
    
    // render Textbox and submit button on quiz-footer
    //cardFooter.innerHTML = "";
    renderOneChild(cardFooter, "label", "Enter initials: ");
    inputInitials = document.createElement("input");
    cardFooter.appendChild(inputInitials); 
    submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    cardFooter.appendChild(submitButton);

    // set styles
    //cardFooter.setAttribute("styles", "display: inline-flex;");
}

// render Highscores List
function renderHighscores() {
    viewHighscores.textContent = "";
    timeEL.textContent = "";
    renderOneChild(cardHeader, "h3", "Highscores");

    // render player list on card-body
    var ul = renderOneChild(cardBody, "ul", "");
    
    scoreTable.loadScore();
    scoreTable.scores.forEach(element => {
        var li = document.createElement("li");
        li.textContent = element.user + " - " + element.score;
        ul.appendChild(li);                
    });

    // render Go Back and Clear Highscores button on card-footer
    renderOneChild(cardFooter, "button", "Go Back");
    clearHighscoresButton = document.createElement("button");
    clearHighscoresButton.textContent = "Clear Highscores";
    cardFooter.appendChild(clearHighscoresButton);
    
};

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

//catch clicking on button at card footer
cardFooter.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        switch (element.textContent) {
            case "Start Quiz":
                questionPatch = questionBank.generateJSQuiz(numberQuestions);
                //render quiz
                questionIndex = 0;
                renderQuiz(questionPatch[questionIndex]);

                //start timer
                startTimer(defaultCountdown);   
                break;

            case "Submit":
                scoreTable.saveScore(cardFooter.children[1].value,timeCounter);
                renderHighscores();    
                break;

            case "Go Back":
                renderFirstGreeting();
                break;

            case "Clear Highscores":
                scoreTable.clearAll();
                renderHighscores();
                break;
        
            default:
                break;
        };   
    };
});

//catch clicking on options in quiz-body to make choice
cardBody.addEventListener("click", function (event) {
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
viewHighscores.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("a") === true) {
        renderHighscores();
    }
})

init();