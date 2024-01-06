// JS questions source from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS

//Object: questionBank contains jsQuestions, methods: generateQuiz, 
var questionBank = {
    //jsQuestions: an array contain all of questions for javascript. Each element of array contains question,choices, and answer.
    jsQuestions: [
        {
            question: "Inside which HTML element do we put the JavaScript?",
            choices: ["<js>","<script>","<javascript>","<scripting>"],
            answer: "<script>"
        },
        {
            question: "Where is the correct place to insert a JavaScript?",
            choices: ["Both the <head> section and the <body> section are correct",
                        "The <body> section",
                        "The <head> section"
            ],
            answer: "Both the <head> section and the <body> section are correct"
        },
        {
            question: "What is the correct JavaScript syntax to change the content of the HTML element below?\<p id=\"demo\">This is a demonstration.</p>",
            choices: ["document.getElementById(\"demo\").innerHTML = \"Hello World!\"",
                        "#demo.innerHTML = \"Hello World!\"",
                        "document.getElement(\"p\").innerHTML = \"Hello World!\"",
                        "document.getElementByName(\"p\").innerHTML = \"Hello World!\"",
            ],
            answer: "document.getElementById(\"demo\").innerHTML = \"Hello World!\""
        },
        {
            question: "How can you detect the client's browser name?",
            choices: ["client.navName",
                        "navigator.appName",
                        "browser.name"
            ],
            answer: "navigator.appName"
        },
        {
            question: "Is JavaScript case-sensitive?",
            choices: ["No",
                        "Yes"
            ],
            answer: "Yes"
        },
        {
            question: "The external JavaScript file must contain the <script> tag.",
            choices: ["True",
                        "False"
            ],
            answer: "False"
        },
    ]
}