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

var questionPatch;
var questionIndex = 0;
var lastAnswer = "";
var timeCounter = 100;

// render question in quiz.
function renderQuiz(question) {
    // render question on quiz-header
    quizHeader.firstElementChild.textContent = question.question;
    
    // render options on quiz-body
    quizBody.innerHTML = "";
    var ul = document.createElement("ul");
    quizBody.appendChild(ul);

    question.options.forEach(element => {
        var li = document.createElement("li");
        li.textContent = element;
        
        ul.appendChild(li);                
    });
    
    // render last result on quiz-footer
    quizFooter.innerHTML = "";
    if (lastAnswer !== "") {   
        var p = document.createElement("p");
        p.textContent = lastAnswer;
        quizFooter.appendChild(p);     
    };

}

// render submit result
function renderSubmitResult() {
    // render question on quiz-header
    quizHeader.firstElementChild.textContent = "All done!";
    
    // render final scores on quiz-body
    quizBody.innerHTML = "";
    var p = document.createElement("p");
    p.textContent = "Your final score is " + timeCounter;
    quizBody.appendChild(p);
    
    // render Textbox and submit button on quiz-footer
    quizFooter.innerHTML = "";
    
}

function init() {    
}

// const quiz = questionBank.generateJSQuiz(5);
// showQuiz(questionBank.generateJSQuiz(5));

//click on Start Quiz button
startButton.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
        questionPatch = questionBank.generateJSQuiz(numberQuestions);
        //render quiz
        questionIndex = 0;
        renderQuiz(questionPatch[questionIndex]);

        //start timer

      }    
})

//click on option in quiz-body to make choice
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
            renderSubmitResult();
        };
        
      }    
})

//click on View Highscores

init();