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
    
    // _getRandomPatch return an array which elements are randomly picked from source array.
    _getRandomPatch: function(srcArray, patchLength) {
        var retArray = [];
        // deep copy array to make sure the operations don't affect the srcArray.
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
    // scores is used to keep list of historic user and their score.
    scores : [],

    // saveScore gets score and save scores to scoreTable in localStorage after transform to string.
    saveScore : function(initial, time) {
        var userScore = {
            user: initial,
            score: time,
        };
        
        this.scores.push(userScore);
        localStorage.setItem('scoreTable', JSON.stringify(this.scores));
    },
    
    // loadScore returns array of objects from scoreTable in localStorage.
    loadScore : function() {
        if (localStorage.getItem("scoreTable") != null) {
            //  get string from scoreTable in localStorage and transform back to array of objects.
            this.scores = JSON.parse(localStorage.getItem("scoreTable"));           
        };
        return this.scores;
    },
    
    // clearAll clears the array scores and scoreTable in localStorage
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
var cardEl = document.getElementById("card");
var cardHeader = document.getElementById("card-header");
var cardBody = document.getElementById("card-body");
var cardFooter = document.getElementById("card-footer");
var startButton = document.getElementById("start-quiz");

// global inputInitials element to get initials at the result page, 
// will be created as child of cardFooter.
var inputInitials;

// Global constants and variables
//default amount of questions of quiz.
const numberQuestions = 5;
//default total score of quiz.
const defaultCountdown = 100;

var questionPatch = [];
var questionIndex = 0;

var lastAnswer = "";
var timeInterval = 0;
var timeCounter = 100;

// renderOneChild: create an element, add text and append it to given element.
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

// render greeting page
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

    // set styles and remove styles from last run.
    cardEl.classList.remove('highscores-card');
    cardEl.classList.remove('quiz-card');
    cardEl.classList.add('greeting-card');
};

// render question in quiz.
function renderQuiz(question) {
    // render question on card-header
    renderOneChild(cardHeader, "h3", question.question);
    
    // render options to choose on card-body
    var ul = renderOneChild(cardBody, "ul", "");
    
    question.options.forEach(element => {
        var li = document.createElement("li");
        li.textContent = element;
        li.classList.add('option-list');
        ul.appendChild(li);                
    });
    
    // render last result on card-footer and will be disapeared after 1s.
    if (lastAnswer !== "") {
        var resultBox = document.createElement("p");
        resultBox.textContent = lastAnswer;
        resultBox.style.alignSelf = "flex-start";
        resultBox.classList.add('card');
        cardEl.style.borderBottomStyle = "solid";
        cardEl.parentElement.append(resultBox);
        // set timeout to disappear the last result
        setTimeout(() => {
            resultBox.remove();
            cardEl.style.borderBottomStyle = "none";
        }, 1000);
        
    } else {
        cardFooter.innerHTML = "";
    };

    // set styles
    cardEl.classList.add('quiz-card');
}

// render submit result
function renderSubmitResult() {
    // render All done greeting on cardHeader.
    renderOneChild(cardHeader, "h3", "All done!");
    
    // update timer
    renderTimer(timeCounter);

    // render final score on card-body
    var text = "Your final score is " + timeCounter;
    renderOneChild(cardBody, "p", text);
    
    // render Textbox and submit button on card-footer
    renderOneChild(cardFooter, "label", "Enter initials: ");
    inputInitials = document.createElement("input");
    cardFooter.appendChild(inputInitials); 
    
    var submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    cardFooter.appendChild(submitButton);
}

// render Highscores List
function renderHighscores() {
    viewHighscores.textContent = "";
    clearInterval(timeInterval);
    timeEL.textContent = "";
    renderOneChild(cardHeader, "h3", "Highscores");

    // render player list on card-body
    var ul = renderOneChild(cardBody, "ul", "");
    
    // render all of historic scores from localstorage
    scoreTable.loadScore().forEach(element => {
        var li = document.createElement("li");
        li.textContent = element.user + " - " + element.score;
        ul.appendChild(li);                
    });

    // render Go Back and Clear Highscores buttons on card-footer.
    renderOneChild(cardFooter, "button", "Go Back");
    clearHighscoresButton = document.createElement("button");
    clearHighscoresButton.textContent = "Clear Highscores";
    cardFooter.appendChild(clearHighscoresButton);
    
    // set styles
    cardEl.classList.add('highscores-card');
};

// countdown timer
function startTimer(countdown) {
    // set global timeCounter by parameter countdown of function.
    timeCounter = countdown;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
      if (timeCounter > 0) {
        // show the remaining time.
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
};

function init() {
    renderFirstGreeting();
};

//catch clicking on button at card footer
cardFooter.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        switch (element.textContent) {
            case "Start Quiz":
                // get a patch of random questions from questionBank
                questionPatch = questionBank.generateJSQuiz(numberQuestions);
                // render the first question of the quiz
                questionIndex = 0;
                renderQuiz(questionPatch[questionIndex]);

                // start timer
                startTimer(defaultCountdown);   
                break;

            case "Submit":
                // catch submit button to save result to localstorage.
                scoreTable.saveScore(inputInitials.value,timeCounter);
                renderHighscores();    
                break;

            case "Go Back":
                // catch Go Back button to go to the first page.
                renderFirstGreeting();
                break;

            case "Clear Highscores":
                // catch Clear Highscores button to clear all of result in local storage.
                scoreTable.clearAll();
                renderHighscores();
                break;
        
            default:
                break;
        };   
    };
});

// catch click on options in card-body to make choice
cardBody.addEventListener("click", function (event) {
    var element = event.target;
    if ((element.matches("li") === true) &&
            cardHeader.textContent != "Highscores") {
        // check answer
        if (element.textContent === questionPatch[questionIndex].answer) {
            lastAnswer = "Correct!";
        } else {
            lastAnswer = "Wrong!";
            // when answer is wrong, minus time by 10
            timeCounter = timeCounter - 10;
        }

        // check if there is next question, render it, if not, render result.
        questionIndex++;
        if (questionIndex < questionPatch.length) {
            renderQuiz(questionPatch[questionIndex]);            
        } else {
            // stop timer and show result
            clearInterval(timeInterval);
            renderSubmitResult();
        };
        
    };    
});

// catch click on View Highscores
viewHighscores.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("a") === true) {
        renderHighscores();
    }
})

init();