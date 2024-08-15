//select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create the questions
let questions = [
    {
        question : "Name the Player",
        imgSrc : "lmessi.png",
        choiceA : "Suarez",
        choiceB : "Messi",
        choiceC : "Reich",
        correct : "B"
    },{
        question : "Name the player",
        imgSrc : "neymar.png",
        choiceA : "Neymar",
        choiceB : "Gueye",
        choiceC : "Sanchez",
        correct : "A"
    },{
        question : "Name the player",
        imgSrc : "ronaldos.png",
        choiceA : "Sanchez",
        choiceB : "Ronaldo",
        choiceC : "Asensio",
        correct : "B"
    },{
        question : "Name the player",
        imgSrc : "sanchez.png",
        choiceA : "Sanchez",
        choiceB : "Ronaldo",
        choiceC : "Ozil",
        correct : "A"
    },{
        question : "Name the player",
        imgSrc : "suarez.png",
        choiceA : "Marcelo",
        choiceB : "Ramos",
        choiceC : "Suarez",
        correct : "C"
    },{
        question : "Name the player",
        imgSrc : "pique.png",
        choiceA : "Ronaldo",
        choiceB : "Pique",
        choiceC : "Mbappe",
        correct : "B"
    },{
        question : "Name the player",
        imgSrc : "asensio.png",
        choiceA : "Benzema",
        choiceB : "Ramos",
        choiceC : "Asensio",
        correct : "C"
    },{
        question : "Name the player",
        imgSrc : "benzema.png",
        choiceA : "Neymar",
        choiceB : "Benzema",
        choiceC : "Ronaldo",
        correct : "B"
    },{
        question : "Name the player",
        imgSrc : "ramos.png",
        choiceA : "Ramos",
        choiceB : "Mbappe",
        choiceC : "Reich",
        correct : "A"
    },{
        question : "Name the player",
        imgSrc : "mbappe.png",
        choiceA : "Ronaldo",
        choiceB : "Mbappe",
        choiceC : "Messi",
        correct : "B"
    }
];

// create some variables for the questions and timer variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// starting quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnswer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green and add to score
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red(does not add to score)
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length); 
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" : //If score percent is at this value, it will display an image with the percentage
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
