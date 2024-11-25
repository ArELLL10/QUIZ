const quizData = [
    { 
        question: "What is a graph?", 
        options: [
            "A mathematical diagram showing numbers and equations", 
            "A collection of nodes and edges representing relationships", 
            "A tool used to calculate weights", 
            "A representation of only directed connections"
        ], 
        correct: 1 
    },
    { 
        question: "In a graph, what is a vertex (or node)?", 
        options: [
            "A point where lines meet or intersect", 
            "A line segment connecting two points", 
            "The weight of an edge", 
            "A one-way connection between two graphs"
        ], 
        correct: 0 
    },
    { 
        question: "What is an edge in a graph?", 
        options: [
            "A data point within a node", 
            "A line segment that joins two vertices", 
            "A measure of distance between nodes", 
            "A self-contained cycle"
        ], 
        correct: 1 
    },
    { 
        question: "What is an example of an undirected graph?", 
        options: [
            "Web pages connected by hyperlinks", 
            "Traffic network modeling one-way streets", 
            "Airports connected by bidirectional flights", 
            "Social networks showing follower relationships"
        ], 
        correct: 2 
    },
    { 
        question: "Who introduced the concept of Euler paths?", 
        options: [
            "William Rowan Hamilton", 
            "Leonhard Euler", 
            "Alan Turing", 
            "Isaac Newton"
        ], 
        correct: 1 
    },
    { 
        question: "What is the primary condition for a graph to have an Eulerian circuit?", 
        options: [
            "All vertices must have an odd degree", 
            "The graph must have exactly one vertex with an odd degree", 
            "All vertices must have an even degree, and the graph must be connected", 
            "The graph must have at least one isolated vertex"
        ], 
        correct: 2 
    },
    { 
        question: "Which of the following describes a Hamiltonian path?", 
        options: [
            "A path that visits each edge exactly once", 
            "A cycle that includes all vertices and edges of the graph", 
            "A path that visits each vertex exactly once without forming a loop", 
            "A directed path that starts and ends at the same vertex"
        ], 
        correct: 2 
    },
    { 
        question: "What distinguishes a directed graph from an undirected graph?", 
        options: [
            "Directed graphs represent one-way connections; undirected graphs represent two-way relationships", 
            "Directed graphs have weighted edges; undirected graphs do not", 
            "Directed graphs cannot have cycles; undirected graphs can", 
            "Directed graphs always form Eulerian circuits"
        ], 
        correct: 0 
    },
    { 
        question: "Which application is best modeled using a directed graph?", 
        options: [
            "Modeling bidirectional train routes", 
            "Social media follower relationships (e.g., Twitter follows)", 
            "A simple family tree", 
            "Representing cities connected by two-way roads"
        ], 
        correct: 1 
    },
    { 
        question: "What is the significance of William Rowan Hamilton in graph theory?", 
        options: [
            "He solved the Seven Bridges of Königsberg problem", 
            "He invented the Hamiltonian path and cycle concepts", 
            "He developed the weight-based edge system in graphs", 
            "He introduced finite state machines"
        ], 
        correct: 1 
    }
]
let currentQuestionIndex = 0;
let score = 0;
let username = "";

// Elements
const welcomePage = document.getElementById("welcome-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const usernameInput = document.getElementById("username");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const finalScoreElement = document.getElementById("final-score");

// Functions
const startQuiz = () => {
    username = usernameInput.value.trim();
    if (username === "") {
        alert("Please enter your name!");
        return;
    }
    welcomePage.classList.remove("active");
    quizPage.classList.add("active");
    loadQuestion();
};

const loadQuestion = () => {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => selectAnswer(index));
      answersContainer.appendChild(button);
    });
    nextBtn.disabled = true;
  };
  
  const selectAnswer = (index) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const buttons = answersContainer.querySelectorAll('button');

    // Remove any previous feedback
    buttons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
    });

    // Add feedback for the selected answer
    if (index === currentQuestion.correct) {
        buttons[index].classList.add('correct');
        score++;
    } else {
        buttons[index].classList.add('incorrect');
        buttons[currentQuestion.correct].classList.add('correct'); // Show the correct answer
    }

    nextBtn.disabled = false;
};
  
  const nextQuestion = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  };
  
  const showResults = () => {
    quizPage.classList.remove("active");
    resultPage.classList.add("active");
    finalScoreElement.textContent = `${username}, your score is ${score} out of ${quizData.length}!`;
  };
  
  const restartQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    username = "";
    resultPage.classList.remove("active");
    welcomePage.classList.add("active");
    usernameInput.value = "";
  };
  
  // Event Listeners
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", restartQuiz);
  