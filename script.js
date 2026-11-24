// ==============================
// MOBILE NAVIGATION
// ==============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// ==============================
// FOOTER YEAR
// ==============================

document.getElementById("year").textContent = new Date().getFullYear();

// ==============================
// BACK TO TOP BUTTON
// ==============================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ==============================
// QUIZ QUESTIONS
// ==============================

const quizQuestions = [
    {
        question: "1. What does IPsec stand for?",
        options: [
            "Internet Protocol Security",
            "Internal Protection System",
            "Internet Privacy Server",
            "Integrated Protocol Service"
        ],
        answer: 0,
        explanation: "IPsec stands for Internet Protocol Security."
    },
    {
        question: "2. Which three principles form the CIA Triad?",
        options: [
            "Control, Internet, Access",
            "Confidentiality, Integrity, Availability",
            "Communication, Identification, Authentication",
            "Cybersecurity, Information, Authorization"
        ],
        answer: 1,
        explanation: "The CIA Triad consists of Confidentiality, Integrity, and Availability."
    },
    {
        question: "3. Which IPsec protocol provides encryption and can also provide integrity?",
        options: [
            "HTTP",
            "FTP",
            "ESP",
            "DNS"
        ],
        answer: 2,
        explanation: "ESP can provide confidentiality through encryption and can also provide integrity and authentication."
    },
    {
        question: "4. Which IPsec mode is commonly used for site-to-site VPNs?",
        options: [
            "Broadcast Mode",
            "Transport Mode",
            "Tunnel Mode",
            "Open Mode"
        ],
        answer: 2,
        explanation: "Tunnel Mode encapsulates the original IP packet and is commonly used for site-to-site VPNs."
    },
    {
        question: "5. What is the main purpose of IKE in IPsec?",
        options: [
            "To design websites",
            "To negotiate security settings and establish keys",
            "To block all network traffic",
            "To manage email accounts"
        ],
        answer: 1,
        explanation: "IKE negotiates security parameters, authenticates peers, and establishes keys for IPsec."
    }
];

// ==============================
// QUIZ VARIABLES
// ==============================

let currentQuestion = 0;
let score = 0;
let answered = false;

// ==============================
// QUIZ ELEMENTS
// ==============================

const questionCounter = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const progressFill = document.getElementById("progressFill");
const questionText = document.getElementById("questionText");
const quizOptions = document.getElementById("quizOptions");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const quizResult = document.getElementById("quizResult");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// ==============================
// LOAD QUESTION
// ==============================

function loadQuestion() {
    answered = false;

    const question = quizQuestions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progressFill.style.width =
        `${(currentQuestion / quizQuestions.length) * 100}%`;

    questionText.textContent = question.question;

    quizOptions.innerHTML = "";
    feedback.textContent = "";
    feedback.className = "feedback";

    nextBtn.disabled = true;
    nextBtn.textContent =
        currentQuestion === quizQuestions.length - 1
            ? "See Results →"
            : "Next Question →";

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", function () {
            checkAnswer(index, button);
        });

        quizOptions.appendChild(button);
    });
}

// ==============================
// CHECK ANSWER
// ==============================

function checkAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const question = quizQuestions[currentQuestion];
    const optionButtons = document.querySelectorAll(".quiz-option");

    optionButtons.forEach(function (button) {
        button.disabled = true;
    });

    if (selectedIndex === question.answer) {
        score++;

        selectedButton.classList.add("correct");
        feedback.textContent = `✓ Correct! ${question.explanation}`;
        feedback.classList.add("correct-text");
    } else {
        selectedButton.classList.add("wrong");

        optionButtons[question.answer].classList.add("correct");

        feedback.textContent = `✕ Incorrect. ${question.explanation}`;
        feedback.classList.add("wrong-text");
    }

    scoreDisplay.textContent = `Score: ${score}`;

    nextBtn.disabled = false;
}

// ==============================
// NEXT QUESTION
// ==============================

nextBtn.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// ==============================
// SHOW FINAL RESULTS
// ==============================

function showResults() {
    questionCounter.textContent = "Quiz Completed";
    scoreDisplay.textContent = `Score: ${score}`;

    progressFill.style.width = "100%";

    questionText.classList.add("hidden");
    quizOptions.classList.add("hidden");
    feedback.classList.add("hidden");
    nextBtn.classList.add("hidden");

    quizResult.classList.remove("hidden");

    const percentage = Math.round(
        (score / quizQuestions.length) * 100
    );

    let message = "";

    if (percentage === 100) {
        message = "Excellent! You answered every question correctly.";
    } else if (percentage >= 60) {
        message = "Good job! You have a solid understanding of the basics.";
    } else {
        message = "Keep learning! Review the sections and try again.";
    }

    finalScore.textContent =
        `Your Score: ${score}/${quizQuestions.length} (${percentage}%). ${message}`;
}

// ==============================
// RESTART QUIZ
// ==============================

restartBtn.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    answered = false;

    questionText.classList.remove("hidden");
    quizOptions.classList.remove("hidden");
    feedback.classList.remove("hidden");
    nextBtn.classList.remove("hidden");

    quizResult.classList.add("hidden");

    loadQuestion();
});

// ==============================
// INITIALIZE QUIZ
// ==============================

loadQuestion();