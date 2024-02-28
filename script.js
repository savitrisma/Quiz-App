let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount = 0;
let scoreCount = 0;
let count = 11;
let countdown;

const quizArray = [
    {
        id:"0",
        question:"Apa yang merupakan bahasa pemrograman utama dalam pengembangan aplikasi Android?",
        options:[
            "Swift",
            "Java",
            "C#",
            "Python",
        ],
        correct:"Java",
    },
    {
        id:"1",
        question:"Apa yang dimaksud dengan Android SDK?",
        options:[
            "Software Development Kit",
            "Software Debugging Kit",
            "Software Documentation Kit",
            "Software Deployment Kit",
        ],
        correct:"Software Development Kit",
    },
    {
        id:"2",
        question:"Apa fungsi dari Android Manifest.xml dalam pengembangan aplikasi Android?",
        options:[
            "Menyediakan desain antarmuka pengguna",
            "Mengatur konfigurasi dan izin aplikasi",
            "Menyediakan kode sumber aplikasi",
            "Menyimpan data pengguna",
        ],
        correct:"Mengatur konfigurasi dan izin aplikasi",
    },
    {
        id:"3",
        question:"Komponen yang digunakan untuk mengatur tata letak UI dalam Android disebut?",
        options:[
            "Activity",
            "Intent",
            "Fragment",
            "Layout",
        ],
        correct:"Layout",
    },
    {
        id:"4",
        question:"Apa yang dimaksud dengan APK dalam konteks pengembangan aplikasi Android?",
        options:[
            "Android Primary Key",
            "Android Package Kit",
            "Android Programmatic Kernel",
            "Android Programmatic Key",
        ],
        correct:"Android Package Kit",
    },
    {
        id:"5",
        question:"Komponen utama yang membentuk arsitektur Model-View-Controller (MVC) dalam pengembangan aplikasi Android adalah?",
        options:[
            "Activity, Fragment, dan Intent",
            "Layout, Adapter, dan Service",
            "Model, View, dan Controller",
            "Database, API, dan UI",
        ],
        correct:"Model, View, dan Controller",
    },
    {
        id:"6",
        question:"Apa yang dimaksud dengan Gradle dalam pengembangan aplikasi Android?",
        options:[
            "Sebuah bahasa pemrograman",
            "Sebuah IDE untuk pengembangan Android",
            "Sebuah build system untuk proyek Android",
            "Sebuah database untuk penyimpanan data pengguna",
        ],
        correct:"Sebuah build system untuk proyek Android",
    },
    {
        id:"7",
        question:"Untuk mengakses dan memanipulasi database dalam aplikasi Android, developer biasanya menggunakan?",
        options:[
            "SQLite",
            "MySQL",
            "MongoDB",
            "PostgreSQL",
        ],
        correct:"SQLite",
    },
    {
        id:"8",
        question:"Komponen yang digunakan untuk menghubungkan antara satu aktivitas dengan aktivitas lain dalam aplikasi Android disebut?",
        options:[
            "Intent",
            "Adapter",
            "Service",
            "Fragment",
        ],
        correct:"Intent",
    },
    {
        id:"9",
        question:"Apa yang dimaksud dengan Activity Lifecycle dalam pengembangan aplikasi Android?",
        options:[
            "Urutan kegiatan sehari-hari seorang pengembang Android",
            "Siklus hidup sebuah aplikasi Android dari pembuatan hingga penghapusan",
            "Prosedur untuk menginstal aplikasi Android di perangkat",
            "Tahapan untuk mengembangkan UI dalam Android",
        ],
        correct:"Siklus hidup sebuah aplikasi Android dari pembuatan hingga penghapusan",
    },
]

restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

nextBtn.addEventListener("click", () => {
    questionCount += 1;

    if(questionCount == quizArray.length){
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        userScore.innerHTML = "Skor anda " +
        scoreCount + " dari " + questionCount;
    } else {
        countOfQuestion.innerHTML = questionCount + 1 +
        " dari " + quizArray.length + " pertanyaan ";

        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);
        timerDisplay();
    }
});

const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if(count == 0){
            clearInterval(countdown);
            nextBtn.click();
        }
    }, 1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    quizCards[questionCount].classList.remove("hide");
};

function quizCreater(){
    quizArray.sort(() => Math.random() - 0.5);

    for (let i of quizArray){
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");

        countOfQuestion.innerHTML = 1 + " dari " + quizArray.length + " pertanyaan ";

        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);

        div.innerHTML += `
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;

        quizContainer.appendChild(div);
    }
}

function checker(userOption){
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    if(userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");

        options.forEach((element) => {
            element.disabled = true;
            if(element.innerText === quizArray[questionCount].correct){
                element.classList.add("correct");
            }
        });
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");

        options.forEach((element) => {
            if(element.innerText === quizArray[questionCount].correct){
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
}


function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};
