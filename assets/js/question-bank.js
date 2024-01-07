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