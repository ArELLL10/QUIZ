const quizData = [
    {
        question: " Refer to the above graph and choose the best answer: ",
        image: "11111.png",
        options: ["Euler path only", "Neither a Euler path nor a Euler circuit", "Euler path and Euler circuit", "Euler circuit only"],
        correct: 0
    },
    {
        question: " Refer to the above graph and choose the best answer: ",
        image: "2222222.png",
        options: ["Hamiltonian path and Hamiltonian circuit", "Neither a Hamiltonian path nor a Hamiltonian cicruit", "Hamiltonian path only", "Hamiltonian circuit only"],
        correct: 2
    },    
    {
        question: " list the vertices in the above graph:  ",
        image: "3333333.png",
        options: ["{D,E}", "{A,B,F,G,H}", "{F,G,H}", "{A,B,C,D,E,F,G,H}"],
        correct: 3
    },
    {
        question: " Refer to the above graph and choose the best answer: ",
        image: "4444444.png",
        options: ["Hamiltonian path and Hamiltonian circuit", "Neither a Hamiltonian path nor a Hamiltonian cicruit", "Hamiltonian path only", "Hamiltonian circuit only"],
        correct: 0
    },
    {
        question: " Refer to the above graph and choose the best answer: ",
        image: "55555555.png",
        options: ["Euler path only", "Neither a Euler path nor a Euler circuit", "Euler path and Euler circuit", "Euler circuit only"],
        correct: 2
    },
    {
        question: " Refer to the above graph and choose the best answer: ",
        image: "66666666.png",
        options: ["Euler path only", "Neither a Euler path nor a Euler circuit", "Euler path and Euler circuit", "Euler circuit only"],
        correct: 2
    },
    {
        question: " Which of the following is a Hamilton circuit of the graph? ",
        image: "7.png",
        options: ["ABCDEFGA", "ACBEGFDA", "CBGEDFAC" ,"CEGBADFC"],
        correct: 2
    },
    {
        question: " List a path from vertex D to vertex G ",
        image: "8.png",
        options: ["DAFCEBG", "DFACEBG", "DECAFBG", "DCBAFEG"],
        correct: 1
    },
    {
        question: " Does this graph have an Euler Path, Euler Circuit, both, or neither?",
        image: "9.png",
        options: ["Euler Path", "Euler Circuit", "Both", "Neither"],
        correct: 2
    },
    {
        question: "How would you rewrite the circuit AEDBCA where B is the starting vertex? ",
        image: "1010.png",
        options: ["BCAEDB", "BEDCAB", "BACEDB", "BADECB"],
        correct: 0
    },
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Update image and question text
    document.getElementById("question-image").src = currentQuestion.image;
    document.getElementById("question-text").innerText = currentQuestion.question;
    
    // Update options
    const options = document.querySelectorAll('.option-btn');
    options.forEach((button, index) => {
        button.innerText = currentQuestion.options[index];
    });
}

function submitAnswer(selectedIndex) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');

    // Remove previous feedback
    options.forEach(button => {
        button.classList.remove('correct', 'incorrect');
    });

    // Check if the selected answer is correct
    if (selectedIndex === currentQuestion.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[currentQuestion.correct].classList.add('correct'); // Show the correct answer
    }

    // Set a timeout to remove the feedback classes
    setTimeout(() => {
        options.forEach(button => {
            button.classList.remove('correct', 'incorrect'); // Remove feedback classes
        });

        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1000); // Adjust this delay as needed (currently set to 1000 milliseconds)
}

function showResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");
    document.getElementById("score").innerText = score + " / " + quizData.length;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("result-container").classList.add("hidden");
    loadQuestion();
}

// Initialize the quiz
loadQuestion();

// Function to handle the Done button click
function handleDone() {
    // Create a thank you message
    const thankYouMessage = document.createElement("div");
    thankYouMessage.innerText = "Thank you! Send your screenshot to David Soriano.";
    thankYouMessage.classList.add("thank-you-message");

    // Append the message to the body or a specific container
    document.body.appendChild(thankYouMessage);

    // Add animation class (you can create your own animation)
    setTimeout(() => {
        thankYouMessage.classList.add("show");
    }, 100); // Delay to allow for the message to be added

    // Optional: Remove the message after a few seconds
    setTimeout(() => {
        thankYouMessage.remove();
    }, 5000); // Adjust the duration as needed
}

// Update the restartQuiz function to not be used anymore
function restartQuiz() {
    // This function can be removed or left empty since we're using Done button now
}

// Add event listener for the done button
document.getElementById("done-btn").addEventListener("click", handleDone);