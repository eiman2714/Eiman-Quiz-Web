// ======================= QUIZ DATABASE (50 Questions, 5 Categories) =======================
const QUIZ_DATA = {
  basics: {
    name: "🖥️ Computer Basics",
    questions: [
      { text: "What is the brain of a computer?", options: ["Monitor", "CPU", "Keyboard", "Printer"], correct: "CPU" },
      { text: "Which device is used for typing?", options: ["Mouse", "Scanner", "Keyboard", "Speaker"], correct: "Keyboard" },
      { text: "Which device shows output?", options: ["Monitor", "CPU", "RAM", "SSD"], correct: "Monitor" },
      { text: "Which storage device is faster?", options: ["SSD", "CD", "DVD", "Floppy"], correct: "SSD" },
      { text: "What does RAM store?", options: ["Programs", "Data", "Power", "Internet"], correct: "Data" },
      { text: "Which device moves the pointer?", options: ["Mouse", "Keyboard", "Printer", "Scanner"], correct: "Mouse" },
      { text: "What powers the computer?", options: ["Battery", "Speaker", "Mouse", "Cable"], correct: "Battery" },
      { text: "Which part performs calculations?", options: ["CPU", "Monitor", "SSD", "Printer"], correct: "CPU" },
      { text: "Which device prints documents?", options: ["Printer", "Scanner", "Monitor", "Mouse"], correct: "Printer" },
      { text: "Which device records images?", options: ["Camera", "Speaker", "Keyboard", "RAM"], correct: "Camera" }
    ]
  },
  programming: {
    name: "💻 Programming",
    questions: [
      { text: "Which language is beginner-friendly?", options: ["Python", "Assembly", "Binary", "COBOL"], correct: "Python" },
      { text: "What stores a value?", options: ["Variable", "Loop", "Array", "Class"], correct: "Variable" },
      { text: "What repeats instructions?", options: ["Loop", "String", "Float", "List"], correct: "Loop" },
      { text: "What finds errors?", options: ["Debugging", "Coding", "Testing", "Printing"], correct: "Debugging" },
      { text: "What is step-by-step problem solving?", options: ["Algorithm", "Program", "Variable", "Syntax"], correct: "Algorithm" },
      { text: "Which symbol starts a Python comment?", options: ["#", "@", "$", "%"], correct: "#" },
      { text: "What groups related data?", options: ["Class", "Loop", "Print", "Input"], correct: "Class" },
      { text: "What takes user data?", options: ["Input", "Output", "Loop", "Class"], correct: "Input" },
      { text: "What shows results?", options: ["Output", "Input", "Array", "Variable"], correct: "Output" },
      { text: "What is a coding mistake called?", options: ["Error", "Input", "Value", "Object"], correct: "Error" }
    ]
  },
  networking: {
    name: "🌐 Internet & Networking",
    questions: [
      { text: "What accesses websites?", options: ["Browser", "Router", "Switch", "Modem"], correct: "Browser" },
      { text: "What connects devices wirelessly?", options: ["Wi-Fi", "USB", "HDMI", "VGA"], correct: "Wi-Fi" },
      { text: "What identifies a device online?", options: ["IP Address", "Password", "Browser", "Website"], correct: "IP Address" },
      { text: "What sends emails?", options: ["Internet", "Printer", "Scanner", "RAM"], correct: "Internet" },
      { text: "Which company runs a popular search engine?", options: ["Google", "Intel", "AMD", "Dell"], correct: "Google" },
      { text: "What connects networks?", options: ["Router", "Mouse", "Monitor", "Speaker"], correct: "Router" },
      { text: "What stores files online?", options: ["Cloud Storage", "Hard Drive", "DVD", "RAM"], correct: "Cloud Storage" },
      { text: "What is a website address called?", options: ["URL", "CPU", "USB", "LAN"], correct: "URL" },
      { text: "What protects website data?", options: ["HTTPS", "HTTP", "HTML", "CSS"], correct: "HTTPS" },
      { text: "What connects computers locally?", options: ["LAN", "WAN", "URL", "USB"], correct: "LAN" }
    ]
  },
  dbms: {
    name: "🗄️ DBMS",
    questions: [
      { text: "What stores organized data?", options: ["Database", "Browser", "Monitor", "Router"], correct: "Database" },
      { text: "Which language manages databases?", options: ["SQL", "HTML", "CSS", "PHP"], correct: "SQL" },
      { text: "What contains rows and columns?", options: ["Table", "Query", "Form", "Report"], correct: "Table" },
      { text: "What uniquely identifies a record?", options: ["Primary Key", "Foreign Key", "Attribute", "Query"], correct: "Primary Key" },
      { text: "Which command retrieves data?", options: ["SELECT", "DELETE", "DROP", "UPDATE"], correct: "SELECT" },
      { text: "Which command adds data?", options: ["INSERT", "SELECT", "DROP", "ALTER"], correct: "INSERT" },
      { text: "What links tables?", options: ["Foreign Key", "Query", "Report", "Form"], correct: "Foreign Key" },
      { text: "What reduces duplication?", options: ["Normalization", "Encryption", "Compression", "Formatting"], correct: "Normalization" },
      { text: "What is a collection of records?", options: ["Table", "Query", "Report", "Form"], correct: "Table" },
      { text: "Which DBMS is popular?", options: ["MySQL", "Chrome", "Firefox", "Linux"], correct: "MySQL" }
    ]
  },
  cybersecurity: {
    name: "🔐 Cybersecurity",
    questions: [
      { text: "What is harmful software called?", options: ["Malware", "Hardware", "Firmware", "Software"], correct: "Malware" },
      { text: "What steals information through fake messages?", options: ["Phishing", "Coding", "Printing", "Testing"], correct: "Phishing" },
      { text: "What protects against viruses?", options: ["Antivirus", "Browser", "Monitor", "Router"], correct: "Antivirus" },
      { text: "What blocks unwanted network traffic?", options: ["Firewall", "Switch", "Mouse", "Printer"], correct: "Firewall" },
      { text: "What should passwords be?", options: ["Strong", "Short", "Simple", "Shared"], correct: "Strong" },
      { text: "What adds extra login security?", options: ["2FA", "LAN", "RAM", "USB"], correct: "2FA" },
      { text: "What hides data from others?", options: ["Encryption", "Printing", "Formatting", "Downloading"], correct: "Encryption" },
      { text: "What spreads between computers?", options: ["Virus", "Monitor", "Router", "Mouse"], correct: "Virus" },
      { text: "What should you avoid clicking?", options: ["Suspicious Links", "Search Results", "Documents", "Folders"], correct: "Suspicious Links" },
      { text: "What keeps accounts secure?", options: ["Strong Password", "Fast Internet", "Large Monitor", "SSD Storage"], correct: "Strong Password" }
    ]
  }
};

// ======================= APP STATE =======================
let activeCategory = "basics";
let questions = [];
let currentIndex = 0;
let userAnswers = [];
let quizActive = true;
let timerInterval = null;
let timeLeft = 12;
let waitingForNext = false;
const TIME_PER_Q = 12;

const root = document.getElementById("quizRoot");

// ======================= HELPER FUNCTIONS =======================
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const timerSpan = document.querySelector(".timer-value");
  if (timerSpan) timerSpan.textContent = `${timeLeft}s`;
  const timerBox = document.querySelector(".timer-box");
  if (timerBox && timeLeft <= 3) {
    timerBox.classList.add("timer-warning");
  } else if (timerBox) {
    timerBox.classList.remove("timer-warning");
  }
}

function startTimer() {
  stopTimer();
  timeLeft = TIME_PER_Q;
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    if (!quizActive || waitingForNext) return;
    if (timeLeft <= 1) {
      stopTimer();
      if (!waitingForNext && userAnswers[currentIndex] === undefined) {
        handleTimeout();
      }
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

// ======================= TIMEOUT HANDLER =======================
function handleTimeout() {
  if (!quizActive || waitingForNext) return;
  if (userAnswers[currentIndex] !== undefined) return;
  
  const currentQ = questions[currentIndex];
  userAnswers[currentIndex] = {
    selected: "(Time's up)",
    isCorrect: false,
    correctAnswer: currentQ.correct
  };
  
  waitingForNext = true;
  stopTimer();
  
  renderFeedbackAndHighlight(null, false, currentQ.correct, true);
  
  setTimeout(() => {
    moveToNextQuestion();
  }, 2000);
}

// ======================= ANSWER HANDLER (INSTANT FEEDBACK) =======================
function handleAnswer(selectedOption) {
  if (!quizActive || waitingForNext) return;
  if (userAnswers[currentIndex] !== undefined) return;
  
  const currentQ = questions[currentIndex];
  const isCorrect = (selectedOption === currentQ.correct);
  
  userAnswers[currentIndex] = {
    selected: selectedOption,
    isCorrect: isCorrect,
    correctAnswer: currentQ.correct
  };
  
  waitingForNext = true;
  stopTimer();
  
  renderFeedbackAndHighlight(selectedOption, isCorrect, currentQ.correct, false);
  
  setTimeout(() => {
    moveToNextQuestion();
  }, 2000);
}

// ======================= RENDER FEEDBACK WITH HIGHLIGHTING =======================
function renderFeedbackAndHighlight(selected, isCorrect, correctAnswer, isTimeout) {
  const feedbackDiv = document.querySelector(".feedback-area");
  const options = document.querySelectorAll(".option");
  
  options.forEach(opt => {
    const optText = opt.getAttribute("data-opt");
    opt.classList.add("disabled-option");
    if (optText === correctAnswer) {
      opt.classList.add("correct-highlight");
    }
    if (selected && optText === selected && !isCorrect) {
      opt.classList.add("wrong-highlight");
    }
  });
  
  if (isTimeout) {
    feedbackDiv.innerHTML = `<span>⏰ Time's up! The correct answer is: <strong>${escapeHtml(correctAnswer)}</strong></span>`;
    feedbackDiv.className = "feedback-area feedback-wrong";
  } else if (isCorrect) {
    feedbackDiv.innerHTML = `<span>✅ CORRECT! Well done! "${escapeHtml(selected)}" is right.</span>`;
    feedbackDiv.className = "feedback-area feedback-correct";
  } else {
    feedbackDiv.innerHTML = `<span>❌ WRONG! Your answer: "${escapeHtml(selected)}" | Correct answer: "${escapeHtml(correctAnswer)}"</span>`;
    feedbackDiv.className = "feedback-area feedback-wrong";
  }
}

// ======================= NAVIGATION =======================
function moveToNextQuestion() {
  waitingForNext = false;
  if (currentIndex + 1 < questions.length) {
    currentIndex++;
    loadCurrentQuestion();
  } else {
    finishQuiz();
  }
}

// ======================= LOAD CURRENT QUESTION UI =======================
function loadCurrentQuestion() {
  if (!quizActive) return;
  renderQuizUI();
  startTimer();
}

function renderQuizUI() {
  const q = questions[currentIndex];
  const progress = `Question ${currentIndex + 1} / ${questions.length}`;
  const isAnswered = userAnswers[currentIndex] !== undefined;
  
  const optionsHtml = q.options.map(opt => {
    let disabledClass = isAnswered ? "disabled-option" : "";
    return `<div class="option ${disabledClass}" data-opt="${escapeHtml(opt)}">
              <span class="prefix-letter">${opt.charAt(0)}</span>
              <span>${escapeHtml(opt)}</span>
            </div>`;
  }).join('');
  
  const html = `
    <div class="quiz-card">
      <div class="quiz-header">
        <span class="progress-badge">📋 ${progress}</span>
        <div class="timer-box"><span>⏱️</span> <span class="timer-value">${timeLeft}s</span></div>
      </div>
      <div class="question-text">${escapeHtml(q.text)}</div>
      <div class="options-list" id="optionsContainer">
        ${optionsHtml}
      </div>
      <div class="feedback-area"></div>
      ${!isAnswered ? '<button class="next-btn" disabled>📝 Select an answer above</button>' : '<button class="next-btn" disabled>⏳ Next question...</button>'}
    </div>
  `;
  
  root.innerHTML = html;
  
  if (!isAnswered) {
    document.querySelectorAll(".option").forEach(optDiv => {
      optDiv.addEventListener("click", () => {
        if (!quizActive || waitingForNext) return;
        if (userAnswers[currentIndex] !== undefined) return;
        const selectedVal = optDiv.getAttribute("data-opt");
        handleAnswer(selectedVal);
      });
    });
  }
}

// ======================= FINISH QUIZ & SHOW SUMMARY =======================
function finishQuiz() {
  stopTimer();
  quizActive = false;
  
  let correctCount = 0;
  const breakdown = [];
  
  for (let i = 0; i < questions.length; i++) {
    const ans = userAnswers[i];
    if (ans && ans.isCorrect) correctCount++;
    const statusClass = (ans && ans.isCorrect) ? "correct-answer" : "incorrect-answer";
    const statusText = (ans && ans.isCorrect) ? "✓ Correct" : "✗ Incorrect";
    const userResp = ans ? ans.selected : "(No answer)";
    const correctAns = ans ? ans.correctAnswer : questions[i].correct;
    
    breakdown.push(`
      <div class="break-item">
        <div><strong>Q${i+1}:</strong> ${escapeHtml(questions[i].text.substring(0, 70))}${questions[i].text.length > 70 ? '…' : ''}</div>
        <div class="${statusClass}">${statusText}</div>
        <div style="font-size:0.8rem; margin-top:4px;">Your: ${escapeHtml(userResp)} | Correct: ${escapeHtml(correctAns)}</div>
      </div>
    `);
  }
  
  const percent = Math.round((correctCount / questions.length) * 100);
  const categoryName = QUIZ_DATA[activeCategory].name;
  
  const summaryHtml = `
    <div class="quiz-card">
      <div style="text-align:center;">
        <h2>📊 Quiz Complete!</h2>
        <p style="margin: 0.5rem 0;">${categoryName}</p>
        <div class="score-circle">
          <span class="big-score">${correctCount}/${questions.length}</span>
          <span>${percent}%</span>
        </div>
      </div>
      <div class="breakdown-list">
        <h3>📋 Detailed Breakdown</h3>
        ${breakdown.join('')}
      </div>
      <div class="retry-group">
        <button class="btn-outline" id="retryBtn">🔄 Retry Same Category</button>
        <button class="btn-filled" id="changeCatBtn">🎯 Choose Different Category</button>
      </div>
    </div>
  `;
  
  root.innerHTML = summaryHtml;
  document.getElementById("retryBtn")?.addEventListener("click", () => startCategory(activeCategory));
  document.getElementById("changeCatBtn")?.addEventListener("click", showCategorySelector);
}

// ======================= START A CATEGORY =======================
function startCategory(categoryKey) {
  activeCategory = categoryKey;
  questions = [...QUIZ_DATA[categoryKey].questions];
  currentIndex = 0;
  userAnswers = new Array(questions.length).fill(undefined);
  quizActive = true;
  waitingForNext = false;
  timeLeft = TIME_PER_Q;
  stopTimer();
  loadCurrentQuestion();
}

// ======================= CATEGORY SELECTION SCREEN =======================
function showCategorySelector() {
  stopTimer();
  quizActive = false;
  const categories = Object.keys(QUIZ_DATA);
  const buttons = categories.map(key => `
    <button class="cat-card" data-cat="${key}">${QUIZ_DATA[key].name}</button>
  `).join('');
  
  const selectorHtml = `
    <div class="quiz-card">
      <h1>💻 Computer Science Quiz</h1>
      <div class="sub">Choose a category — ${TIME_PER_Q} seconds per question • Instant feedback!</div>
      <div class="category-grid" id="catSelector">
        ${buttons}
      </div>
      <footer>✅ Select an answer → See immediately if it's right/wrong → Automatically moves to next</footer>
    </div>
  `;
  
  root.innerHTML = selectorHtml;
  document.querySelectorAll(".cat-card").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const cat = btn.getAttribute("data-cat");
      startCategory(cat);
    });
  });
}

// ======================= INITIALIZE APP =======================
showCategorySelector();