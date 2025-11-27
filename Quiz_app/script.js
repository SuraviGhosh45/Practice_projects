const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.querySelector(".result-screen");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const finalScore = document.getElementById("final-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.querySelector(".result-message");
const currentQuestionNum = document.querySelector(".current-question");
const scoreText = document.querySelector(".quiz-info p span:nth-child(2)");


let questionArray = [
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
        correct: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: 1
    },
    {
        question: "HTML stands for?",
        options: ["Hyper Text Markup Language", "High Transfer Mark Language", "Hyperlink Text Machine Language", "Hybrid Transfer Markup Level"],
        correct: 0
    },
    {
        question: "Which is the largest ocean?",
        options: ["Indian", "Atlantic", "Pacific", "Arctic"],
        correct: 2
    },
    {
        question: "What is 5 + 3?",
        options: ["5", "8", "3", "10"],
        correct: 1
    }
];
let currentindex = 0, score = 0;

startBtn.addEventListener('click', () => {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    loadquestion();
});

function loadquestion() {
    const current = questionArray[currentindex];

    questionText.textContent = current.question;
    currentQuestionNum.textContent = currentindex + 1;
    answersContainer.innerHTML = "";

    current.options.forEach((ans, ind) => {
        const button = document.createElement("button");
        button.textContent = ans;
        button.classList.add("answer-option");
        button.addEventListener('click', () => {
            checkAns(ind, button);
        });
        answersContainer.appendChild(button);
    });
}

function checkAns(Selectind,button){

    const correctIndex=questionArray[currentindex].correct;
    
    if(Selectind==correctIndex){
        score++;
        button.classList.add("correct");
    }
    else{
        button.classList.add("wrong");
    }

    const other_options=document.querySelectorAll(".answer-option");
    other_options.forEach((btn)=>btn.disabled=true);

    setTimeout(() => nextQuest(),1000);

}

function nextQuest(){
    currentindex++;
    
    progress.style.width=`${currentindex/questionArray.length*100}%`;

    if(currentindex<questionArray.length){
        loadquestion();
    }
    else{
        result();
    }
}

function result(){
    quizScreen.classList.remove("active");
    resultScreen.style.display="block";
    finalScore.textContent=score;
    maxScore.textContent=questionArray.length;
    progress.style.width="100%"; //doubt

    if(score===questionArray.length){
        resultMessage.textContent="Excellent! Perfect score 🎉";
    }
    else if(score>=questionArray.length/2){
         resultMessage.textContent = "Good job! Keep practicing 😊";
    }
    else{
        resultMessage.textContent = "Don’t worry, try again and improve 💪";
    }

}

restartBtn.addEventListener('click',()=>{
    currentindex=0;
    score=0;
    progress.style.width="0%";
    resultScreen.style.display="none";
    startScreen.classList.add("active");

});