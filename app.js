import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGPnBIjyQfOAms0SrAqqFMn7EwWqQIX64",
  authDomain: "student-helper-ng.firebaseapp.com",
  projectId: "student-helper-ng",
  storageBucket: "student-helper-ng.firebasestorage.app",
  messagingSenderId: "68499020459",
  appId: "1:68499020459:web:c0f42fb466a4d90933b5ee",
  measurementId: "G-MXHLE0F3XJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const authScreen = document.getElementById("authScreen");
const appShell = document.getElementById("appShell");
const registrationForm = document.getElementById("registrationForm");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const registrationSavedMessage = document.getElementById("registrationSavedMessage");
const authStatusText = document.getElementById("authStatusText");

const navButtons = Array.from(document.querySelectorAll(".nav-button"));
const openAiSectionButton = document.getElementById("openAiSection");
const appSections = Array.from(document.querySelectorAll(".app-section"));

const assignmentForm = document.getElementById("assignmentForm");
const assignmentList = document.getElementById("assignmentList");
const goalForm = document.getElementById("goalForm");
const goalInput = document.getElementById("goalInput");
const goalList = document.getElementById("goalList");
const timerDisplay = document.getElementById("timerDisplay");
const timerModeLabel = document.getElementById("timerModeLabel");
const startTimerButton = document.getElementById("startTimer");
const pauseTimerButton = document.getElementById("pauseTimer");
const resetTimerButton = document.getElementById("resetTimer");
const sessionMinutesInput = document.getElementById("sessionMinutes");
const timetableForm = document.getElementById("timetableForm");
const timetableList = document.getElementById("timetableList");

const countdownForm = document.getElementById("countdownForm");
const countdownList = document.getElementById("countdownList");
const analyticsSummary = document.getElementById("analyticsSummary");
const subjectPerformanceList = document.getElementById("subjectPerformanceList");

const examSubjectsForm = document.getElementById("examSubjectsForm");
const clearRegistrationButton = document.getElementById("clearRegistration");
const examSavedMessage = document.getElementById("examSavedMessage");
const registrationSummary = document.getElementById("registrationSummary");
const courseCheckForm = document.getElementById("courseCheckForm");
const desiredCourse = document.getElementById("desiredCourse");
const courseCheckResult = document.getElementById("courseCheckResult");
const topicForm = document.getElementById("topicForm");
const topicList = document.getElementById("topicList");

const courseForm = document.getElementById("courseForm");
const courseList = document.getElementById("courseList");
const clearCoursesButton = document.getElementById("clearCourses");
const gpaValue = document.getElementById("gpaValue");

const quizSetupForm = document.getElementById("quizSetupForm");
const quizSubject = document.getElementById("quizSubject");
const quizArea = document.getElementById("quizArea");
const quizHistory = document.getElementById("quizHistory");
const aiForm = document.getElementById("aiForm");
const aiPrompt = document.getElementById("aiPrompt");
const aiMessages = document.getElementById("aiMessages");
const aiStatus = document.getElementById("aiStatus");
const clearAiChatButton = document.getElementById("clearAiChat");
const aiActionButtons = Array.from(document.querySelectorAll(".ai-action-button"));

const notesForm = document.getElementById("notesForm");
const noteSubjectInput = document.getElementById("noteSubject");
const noteTitleInput = document.getElementById("noteTitle");
const notesInput = document.getElementById("notesInput");
const notesSavedMessage = document.getElementById("notesSavedMessage");
const noteSearch = document.getElementById("noteSearch");
const notesList = document.getElementById("notesList");

const dueSoonCount = document.getElementById("dueSoonCount");
const completedCount = document.getElementById("completedCount");
const studyStreak = document.getElementById("studyStreak");
const goalProgressCount = document.getElementById("goalProgressCount");
const focusSummary = document.getElementById("focusSummary");

const storageKeys = {
  assignments: "student-helper-assignments",
  goals: "student-helper-goals",
  timetable: "student-helper-timetable",
  countdowns: "student-helper-countdowns",
  registration: "student-helper-registration",
  topics: "student-helper-topics",
  scores: "student-helper-scores",
  notes: "student-helper-notes",
  sessions: "student-helper-sessions",
  quizHistory: "student-helper-quiz-history"
};

const courseRequirements = {
  Medicine: ["Use of English", "Biology", "Chemistry", "Physics"],
  Engineering: ["Use of English", "Mathematics", "Physics", "Chemistry"],
  Law: ["Use of English", "Literature in English", "Government", "CRS"],
  Accounting: ["Use of English", "Mathematics", "Economics", "Commerce"],
  "Computer Science": ["Use of English", "Mathematics", "Physics", "Chemistry"],
  "Mass Communication": ["Use of English", "Literature in English", "Government", "CRS"]
};

const sampleQuestionBank = {
  Mathematics: [
    { question: "If 3x + 5 = 20, what is x?", options: ["3", "4", "5", "6"], answer: "C", explanation: "3x = 15, so x = 5." },
    { question: "What is the value of 7 squared?", options: ["14", "49", "21", "56"], answer: "B", explanation: "7 squared means 7 x 7 = 49." },
    { question: "A triangle has angles 40 and 60. What is the third angle?", options: ["70", "80", "90", "100"], answer: "B", explanation: "Angles in a triangle add up to 180." }
  ],
  English: [
    { question: "Choose the correct sentence.", options: ["She go to school daily.", "She goes to school daily.", "She going to school daily.", "She gone to school daily."], answer: "B", explanation: "The subject 'She' takes 'goes' in the simple present tense." },
    { question: "What is the synonym of 'rapid'?", options: ["Slow", "Quick", "Weak", "Late"], answer: "B", explanation: "Rapid means quick or fast." },
    { question: "Which option is a noun?", options: ["Run", "Beautiful", "Honesty", "Quickly"], answer: "C", explanation: "Honesty is an abstract noun." }
  ],
  Biology: [
    { question: "Photosynthesis mainly takes place in which part of the plant?", options: ["Root", "Stem", "Leaf", "Flower"], answer: "C", explanation: "Leaves contain chlorophyll needed for photosynthesis." },
    { question: "Which organ pumps blood in the human body?", options: ["Liver", "Heart", "Kidney", "Lung"], answer: "B", explanation: "The heart pumps blood through the circulatory system." },
    { question: "Which of these is a vertebrate?", options: ["Earthworm", "Snail", "Fish", "Cockroach"], answer: "C", explanation: "Fish have backbones, so they are vertebrates." }
  ]
};

let currentUser = null;
let appState = createEmptyState();
let timerState = { remainingSeconds: Number(sessionMinutesInput.value) * 60, intervalId: null, running: false };
let quizState = { subject: null, questions: [], currentIndex: 0, score: 0, answered: false };
let aiChat = [];

function createEmptyState() {
  return {
    assignments: [],
    goals: [],
    timetable: [],
    countdowns: [],
    registration: { waecSubjects: [], jambSubjects: [] },
    topics: [],
    scores: [],
    notes: [],
    sessions: 0,
    quizHistory: []
  };
}

function appendAiMessage(role, text) {
  aiChat.push({ role, text });
  renderAiChat();
}

function renderAiChat() {
  const intro = `
    <article class="ai-message ai-message-assistant">
      <h3>Student Helper AI</h3>
      <p class="meta-line">Ask a question like "Explain photosynthesis for SS2" or "Give me a one-week JAMB reading plan for Maths and Physics."</p>
    </article>
  `;

  if (!aiChat.length) {
    aiMessages.innerHTML = intro;
    return;
  }

  aiMessages.innerHTML = intro + aiChat.map((item) => `
    <article class="ai-message ${item.role === "user" ? "ai-message-user" : "ai-message-assistant"}">
      <h3>${item.role === "user" ? "You" : "Student Helper AI"}</h3>
      <p class="meta-line">${escapeHtml(item.text).replaceAll("\n", "<br>")}</p>
    </article>
  `).join("");
}

function showSection(targetId) {
  appSections.forEach((section) => {
    const isActive = section.id === targetId;
    section.hidden = !isActive;
    section.classList.toggle("active-section", isActive);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.target === targetId);
  });
}

function getScopedKey(key) {
  return `${currentUser?.uid || "guest"}-${key}`;
}

function loadScopedStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(getScopedKey(key));
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveScopedStorage(key, value) {
  localStorage.setItem(getScopedKey(key), JSON.stringify(value));
}

function loadState() {
  appState = {
    assignments: loadScopedStorage(storageKeys.assignments, []),
    goals: loadScopedStorage(storageKeys.goals, []),
    timetable: loadScopedStorage(storageKeys.timetable, []),
    countdowns: loadScopedStorage(storageKeys.countdowns, []),
    registration: loadScopedStorage(storageKeys.registration, { waecSubjects: [], jambSubjects: [] }),
    topics: loadScopedStorage(storageKeys.topics, []),
    scores: loadScopedStorage(storageKeys.scores, []),
    notes: loadScopedStorage(storageKeys.notes, []),
    sessions: loadScopedStorage(storageKeys.sessions, 0),
    quizHistory: loadScopedStorage(storageKeys.quizHistory, [])
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function daysUntil(dateValue) {
  if (!dateValue) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${dateValue}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function formatDate(dateValue) {
  if (!dateValue) return "No date set";
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function scoreToGrade(score) {
  if (score >= 75) return "A1";
  if (score >= 70) return "B2";
  if (score >= 65) return "B3";
  if (score >= 60) return "C4";
  if (score >= 55) return "C5";
  if (score >= 50) return "C6";
  if (score >= 45) return "D7";
  if (score >= 40) return "E8";
  return "F9";
}

function formatAuthError(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "That email address is not valid.";
    case "auth/email-already-in-use":
      return "That email is already registered. Try logging in instead.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/operation-not-allowed":
      return "Enable Email/Password sign-in in Firebase Authentication.";
    default:
      return error?.message || "Authentication failed.";
  }
}

function setAuthStateUi(user) {
  if (user) {
    authScreen.hidden = true;
    appShell.hidden = false;
    authStatusText.textContent = `Signed in as ${user.email}`;
    logoutButton.disabled = false;
  } else {
    authScreen.hidden = false;
    appShell.hidden = true;
    authStatusText.textContent = "No student is signed in yet.";
    logoutButton.disabled = true;
  }
}
function updateSummary() {
  const activeAssignments = appState.assignments.filter((item) => !item.completed);
  const dueSoon = activeAssignments.filter((item) => {
    const days = daysUntil(item.dueDate);
    return days !== null && days <= 3;
  });
  const doneGoals = appState.goals.filter((goal) => goal.completed);

  dueSoonCount.textContent = String(dueSoon.length);
  completedCount.textContent = String(appState.assignments.filter((item) => item.completed).length);
  studyStreak.textContent = String(appState.sessions);
  goalProgressCount.textContent = String(doneGoals.length);

  if (activeAssignments.length) {
    const nextTask = [...activeAssignments].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
    focusSummary.textContent = `${nextTask.title} for ${nextTask.subject} is next. Push it forward before ${formatDate(nextTask.dueDate)}.`;
    return;
  }

  if (appState.topics.some((topic) => topic.status === "Needs Help")) {
    const weakTopic = appState.topics.find((topic) => topic.status === "Needs Help");
    focusSummary.textContent = `${weakTopic.topic} in ${weakTopic.subject} still needs help. Plan a revision block for it today.`;
    return;
  }

  focusSummary.textContent = "You are caught up. Add new goals, subjects, or a practice session to stay sharp.";
}

function renderAssignments() {
  if (!appState.assignments.length) {
    assignmentList.innerHTML = '<div class="empty-state">No homework yet. Add your first task above.</div>';
    return;
  }

  const sorted = [...appState.assignments].sort((a, b) => Number(a.completed) - Number(b.completed) || new Date(a.dueDate) - new Date(b.dueDate));
  assignmentList.innerHTML = sorted.map((item) => {
    const days = daysUntil(item.dueDate);
    const dueText = days < 0 ? `${Math.abs(days)} day(s) overdue` : days === 0 ? "Due today" : `${days} day(s) left`;
    return `
      <article class="assignment-item ${item.completed ? "completed" : ""}">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p class="meta-line">${escapeHtml(item.subject)} - ${formatDate(item.dueDate)} - ${dueText}</p>
          <span class="priority-pill priority-${item.priority.toLowerCase()}">${item.priority} priority</span>
        </div>
        <div class="item-actions">
          <button class="secondary-button" data-action="toggle-assignment" data-id="${item.id}">${item.completed ? "Mark Active" : "Mark Done"}</button>
          <button class="ghost-button" data-action="delete-assignment" data-id="${item.id}">Delete</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderGoals() {
  if (!appState.goals.length) {
    goalList.innerHTML = '<div class="empty-state">Add a few daily goals to stay focused.</div>';
    return;
  }

  goalList.innerHTML = appState.goals.map((goal) => `
    <article class="goal-item ${goal.completed ? "completed" : ""}">
      <div>
        <h3>${escapeHtml(goal.text)}</h3>
        <p class="meta-line">${goal.completed ? "Completed" : "Pending today"}</p>
      </div>
      <div class="item-actions">
        <button class="secondary-button" data-action="toggle-goal" data-id="${goal.id}">${goal.completed ? "Undo" : "Done"}</button>
        <button class="ghost-button" data-action="delete-goal" data-id="${goal.id}">Delete</button>
      </div>
    </article>
  `).join("");
}

function renderTimetable() {
  if (!appState.timetable.length) {
    timetableList.innerHTML = '<div class="empty-state">Generate a timetable to spread your reading across the week.</div>';
    return;
  }

  timetableList.innerHTML = appState.timetable.map((slot) => `
    <article class="timetable-item">
      <div>
        <h3>${escapeHtml(slot.day)}</h3>
        <p class="meta-line">${escapeHtml(slot.subject)} - ${slot.hours} hour(s)</p>
      </div>
      <button class="ghost-button" data-action="delete-slot" data-id="${slot.id}">Delete</button>
    </article>
  `).join("");
}

function renderCountdowns() {
  if (!appState.countdowns.length || appState.countdowns.every((item) => !item.date)) {
    countdownList.innerHTML = '<div class="empty-state">Add important exam dates to start the countdown.</div>';
    return;
  }

  countdownList.innerHTML = appState.countdowns.map((item) => {
    const days = daysUntil(item.date);
    const text = days === null ? "Date not set" : days < 0 ? "Exam date passed" : `${days} day(s) left`;
    return `
      <article class="countdown-item">
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <p class="meta-line">${formatDate(item.date)}</p>
          <span class="status-pill ${days !== null && days <= 30 ? "in-progress" : "strong"}">${text}</span>
        </div>
        <button class="ghost-button" data-action="delete-countdown" data-id="${item.id}">Delete</button>
      </article>
    `;
  }).join("");
}

function renderRegistration() {
  const waecItems = appState.registration.waecSubjects.map((item) => `<span class="subject-chip">${escapeHtml(item)}</span>`).join("");
  const jambItems = appState.registration.jambSubjects.map((item) => `<span class="subject-chip">${escapeHtml(item)}</span>`).join("");

  if (!waecItems && !jambItems) {
    registrationSummary.innerHTML = '<div class="empty-state">No registration details yet. Enter your WAEC and JAMB subjects.</div>';
    return;
  }

  registrationSummary.innerHTML = `
    <article class="registration-panel">
      <div>
        <h3>WAEC Subjects (${appState.registration.waecSubjects.length}/9)</h3>
        <div class="chip-row">${waecItems || '<p class="meta-line">No WAEC subjects saved yet.</p>'}</div>
      </div>
      <div>
        <h3>JAMB Subjects (${appState.registration.jambSubjects.length}/4)</h3>
        <div class="chip-row">${jambItems || '<p class="meta-line">No JAMB subjects saved yet.</p>'}</div>
      </div>
    </article>
  `;
}

function renderCourseCheck() {
  const selectedCourse = desiredCourse.value;
  const requiredSubjects = courseRequirements[selectedCourse] || [];
  const chosenSubjects = appState.registration.jambSubjects.map((subject) => subject.toLowerCase());
  const missing = requiredSubjects.filter((subject) => !chosenSubjects.includes(subject.toLowerCase()));

  courseCheckResult.innerHTML = `
    <h3>${escapeHtml(selectedCourse)}</h3>
    <p class="meta-line">Expected JAMB subjects: ${requiredSubjects.join(", ")}</p>
    <p class="meta-line">${missing.length ? `Missing from your current JAMB list: ${missing.join(", ")}` : "Your current JAMB subjects match this common combination."}</p>
  `;
}

function renderTopics() {
  if (!appState.topics.length) {
    topicList.innerHTML = '<div class="empty-state">Add topics to track what is strong and what still needs work.</div>';
    return;
  }

  topicList.innerHTML = appState.topics.map((topic) => {
    const statusClass = topic.status.toLowerCase().replaceAll(" ", "-");
    return `
      <article class="topic-item">
        <div>
          <h3>${escapeHtml(topic.topic)}</h3>
          <p class="meta-line">${escapeHtml(topic.subject)}</p>
          <span class="status-pill ${statusClass}">${escapeHtml(topic.status)}</span>
        </div>
        <div class="item-actions">
          <button class="ghost-button" data-action="delete-topic" data-id="${topic.id}">Delete</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderScores() {
  if (!appState.scores.length) {
    courseList.innerHTML = '<div class="empty-state">No results added yet. Add CA and exam scores to monitor progress.</div>';
    gpaValue.textContent = "0.00";
    return;
  }

  const average = (appState.scores.reduce((sum, item) => sum + item.totalScore, 0) / appState.scores.length).toFixed(2);
  gpaValue.textContent = average;
  courseList.innerHTML = appState.scores.map((score) => `
    <article class="course-item">
      <div>
        <h3>${escapeHtml(score.name)}</h3>
        <p class="meta-line">CA ${score.caScore}/40 - Exam ${score.examScore}/60 - Total ${score.totalScore}/100 - Grade ${score.gradeLabel}</p>
      </div>
      <button class="ghost-button" data-action="delete-score" data-id="${score.id}">Delete</button>
    </article>
  `).join("");
}
function renderAnalytics() {
  const scores = appState.scores;
  const strongTopics = appState.topics.filter((topic) => topic.status === "Strong").length;
  const weakTopics = appState.topics.filter((topic) => topic.status === "Needs Help").length;
  const average = scores.length ? (scores.reduce((sum, item) => sum + item.totalScore, 0) / scores.length).toFixed(1) : "0.0";

  analyticsSummary.innerHTML = `
    <article class="analytics-tile"><span>${average}</span><p class="meta-line">Average score</p></article>
    <article class="analytics-tile"><span>${strongTopics}</span><p class="meta-line">Strong topics</p></article>
    <article class="analytics-tile"><span>${weakTopics}</span><p class="meta-line">Topics needing help</p></article>
  `;

  if (!scores.length) {
    subjectPerformanceList.innerHTML = '<div class="empty-state">Subject performance will appear here after you add results.</div>';
    return;
  }

  subjectPerformanceList.innerHTML = scores.map((score) => `
    <article class="list-item">
      <div>
        <h3>${escapeHtml(score.name)}</h3>
        <p class="meta-line">${score.totalScore}/100</p>
        <div class="performance-bar"><span style="width:${Math.max(0, Math.min(100, score.totalScore))}%"></span></div>
      </div>
    </article>
  `).join("");
}

function renderNotes() {
  const query = noteSearch.value.trim().toLowerCase();
  const filtered = appState.notes.filter((note) => `${note.subject} ${note.title} ${note.content}`.toLowerCase().includes(query));

  if (!filtered.length) {
    notesList.innerHTML = '<div class="empty-state">No notes found yet. Save notes or adjust your search.</div>';
    return;
  }

  notesList.innerHTML = filtered.map((note) => `
    <article class="note-item">
      <div>
        <h3>${escapeHtml(note.title)}</h3>
        <p class="meta-line">${escapeHtml(note.subject)}</p>
        <p class="meta-line">${escapeHtml(note.content)}</p>
      </div>
      <button class="ghost-button" data-action="delete-note" data-id="${note.id}">Delete</button>
    </article>
  `).join("");
}

function renderQuizHistory() {
  if (!appState.quizHistory.length) {
    quizHistory.innerHTML = '<div class="empty-state">Completed practice sessions will appear here.</div>';
    return;
  }

  quizHistory.innerHTML = appState.quizHistory.map((item) => `
    <article class="quiz-history-item">
      <div>
        <h3>${escapeHtml(item.subject)}</h3>
        <p class="meta-line">${item.score}/${item.total} correct - ${item.date}</p>
      </div>
    </article>
  `).join("");
}

function renderQuizQuestion() {
  const question = quizState.questions[quizState.currentIndex];
  if (!question) {
    const date = new Date().toLocaleDateString();
    appState.quizHistory.unshift({ id: crypto.randomUUID(), subject: quizState.subject, score: quizState.score, total: quizState.questions.length, date });
    saveScopedStorage(storageKeys.quizHistory, appState.quizHistory);
    renderQuizHistory();
    quizArea.innerHTML = `
      <div class="quiz-area">
        <h3>${escapeHtml(quizState.subject)} practice complete</h3>
        <p class="meta-line">You scored ${quizState.score}/${quizState.questions.length}.</p>
        <button class="primary-button" id="restartQuizButton">Practice Again</button>
      </div>
    `;
    document.getElementById("restartQuizButton").addEventListener("click", () => startQuiz(quizState.subject));
    return;
  }

  quizArea.innerHTML = `
    <div class="quiz-question">
      <p class="meta-line">Question ${quizState.currentIndex + 1} of ${quizState.questions.length}</p>
      <h3>${escapeHtml(question.question)}</h3>
      <div class="quiz-options">
        ${question.options.map((option, index) => {
          const label = String.fromCharCode(65 + index);
          return `<button class="quiz-option" data-answer="${label}">${label}. ${escapeHtml(option)}</button>`;
        }).join("")}
      </div>
      <div id="quizFeedback" class="support-text"></div>
    </div>
  `;

  Array.from(quizArea.querySelectorAll(".quiz-option")).forEach((button) => {
    button.addEventListener("click", () => handleQuizAnswer(button.dataset.answer));
  });
}

function startQuiz(subject) {
  quizState = { subject, questions: sampleQuestionBank[subject] || [], currentIndex: 0, score: 0, answered: false };
  renderQuizQuestion();
}

function handleQuizAnswer(answer) {
  if (quizState.answered) return;
  quizState.answered = true;
  const question = quizState.questions[quizState.currentIndex];
  const feedback = document.getElementById("quizFeedback");
  Array.from(quizArea.querySelectorAll(".quiz-option")).forEach((button) => {
    if (button.dataset.answer === question.answer) button.classList.add("correct");
    if (button.dataset.answer === answer && answer !== question.answer) button.classList.add("wrong");
    button.disabled = true;
  });

  if (answer === question.answer) {
    quizState.score += 1;
    feedback.textContent = `Correct. ${question.explanation}`;
  } else {
    feedback.textContent = `Correct answer: ${question.answer}. ${question.explanation}`;
  }

  const nextButton = document.createElement("button");
  nextButton.className = "primary-button";
  nextButton.textContent = quizState.currentIndex === quizState.questions.length - 1 ? "Finish" : "Next Question";
  nextButton.addEventListener("click", () => {
    quizState.currentIndex += 1;
    quizState.answered = false;
    renderQuizQuestion();
  });
  feedback.after(nextButton);
}

function hydrateExamForm() {
  examSubjectsForm.reset();
  appState.registration.waecSubjects.forEach((subject, index) => {
    const input = examSubjectsForm.elements.namedItem(`waecSubject${index + 1}`);
    if (input) input.value = subject;
  });
  appState.registration.jambSubjects.forEach((subject, index) => {
    const input = examSubjectsForm.elements.namedItem(`jambSubject${index + 1}`);
    if (input) input.value = subject;
  });
}

function updateTimerDisplay() {
  const minutes = Math.floor(timerState.remainingSeconds / 60);
  const seconds = timerState.remainingSeconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function resetTimerState() {
  const minutes = Math.max(5, Number(sessionMinutesInput.value) || 25);
  if (timerState.intervalId) clearInterval(timerState.intervalId);
  timerState.intervalId = null;
  timerState.running = false;
  timerState.remainingSeconds = minutes * 60;
  timerModeLabel.textContent = "Reading Session";
  updateTimerDisplay();
}

function refreshAllViews() {
  hydrateExamForm();
  renderAssignments();
  renderGoals();
  renderTimetable();
  renderCountdowns();
  renderRegistration();
  renderCourseCheck();
  renderTopics();
  renderScores();
  renderAnalytics();
  renderNotes();
  renderQuizHistory();
  updateSummary();
  resetTimerState();
}

function handleAction(id, type) {
  switch (type) {
    case "toggle-assignment":
      appState.assignments = appState.assignments.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
      saveScopedStorage(storageKeys.assignments, appState.assignments);
      renderAssignments();
      updateSummary();
      return;
    case "delete-assignment":
      appState.assignments = appState.assignments.filter((item) => item.id !== id);
      saveScopedStorage(storageKeys.assignments, appState.assignments);
      renderAssignments();
      updateSummary();
      return;
    case "toggle-goal":
      appState.goals = appState.goals.map((item) => item.id === id ? { ...item, completed: !item.completed } : item);
      saveScopedStorage(storageKeys.goals, appState.goals);
      renderGoals();
      updateSummary();
      return;
    case "delete-goal":
      appState.goals = appState.goals.filter((item) => item.id !== id);
      saveScopedStorage(storageKeys.goals, appState.goals);
      renderGoals();
      updateSummary();
      return;
    case "delete-slot":
      appState.timetable = appState.timetable.filter((item) => item.id !== id);
      saveScopedStorage(storageKeys.timetable, appState.timetable);
      renderTimetable();
      return;
    case "delete-countdown":
      appState.countdowns = appState.countdowns.filter((item) => item.id !== id);
      saveScopedStorage(storageKeys.countdowns, appState.countdowns);
      renderCountdowns();
      return;
    case "delete-topic":
      appState.topics = appState.topics.filter((item) => item.id !== id);
      saveScopedStorage(storageKeys.topics, appState.topics);
      renderTopics();
      renderAnalytics();
      updateSummary();
      return;
    case "delete-score":
      appState.scores = appState.scores.filter((item) => item.id !== id);
      saveScopedStorage(storageKeys.scores, appState.scores);
      renderScores();
      renderAnalytics();
      return;
    case "delete-note":
      appState.notes = appState.notes.filter((item) => item.id !== id);
      saveScopedStorage(storageKeys.notes, appState.notes);
      renderNotes();
      return;
    default:
      return;
  }
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showSection(button.dataset.target);
  });
});

openAiSectionButton?.addEventListener("click", () => {
  showSection("aiSection");
});

aiActionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showSection("aiSection");
    aiPrompt.value = button.dataset.template || "";
    aiPrompt.focus();
    aiStatus.textContent = "Prompt inserted. Finish it and ask AI.";
    aiPrompt.setSelectionRange(aiPrompt.value.length, aiPrompt.value.length);
  });
});

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, authEmail.value.trim(), authPassword.value);
    registrationSavedMessage.textContent = "Account created successfully.";
    registrationForm.reset();
  } catch (error) {
    registrationSavedMessage.textContent = formatAuthError(error);
  }
});

loginButton.addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, authEmail.value.trim(), authPassword.value);
    registrationSavedMessage.textContent = "Login successful.";
    registrationForm.reset();
  } catch (error) {
    registrationSavedMessage.textContent = formatAuthError(error);
  }
});

logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    currentUser = null;
    setAuthStateUi(null);
  } catch (error) {
    registrationSavedMessage.textContent = formatAuthError(error);
  }
});

assignmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  appState.assignments.push({
    id: crypto.randomUUID(),
    title: document.getElementById("assignmentTitle").value.trim(),
    subject: document.getElementById("assignmentSubject").value.trim(),
    dueDate: document.getElementById("assignmentDueDate").value,
    priority: document.getElementById("assignmentPriority").value,
    completed: false
  });
  saveScopedStorage(storageKeys.assignments, appState.assignments);
  assignmentForm.reset();
  document.getElementById("assignmentPriority").value = "Medium";
  renderAssignments();
  updateSummary();
});

assignmentList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleAction(button.dataset.id, button.dataset.action);
});

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  appState.goals.unshift({ id: crypto.randomUUID(), text: goalInput.value.trim(), completed: false });
  saveScopedStorage(storageKeys.goals, appState.goals);
  goalForm.reset();
  renderGoals();
  updateSummary();
});

goalList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleAction(button.dataset.id, button.dataset.action);
});

timetableForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const subjects = document.getElementById("timetableSubjects").value.split(",").map((item) => item.trim()).filter(Boolean);
  const hours = Number(document.getElementById("timetableHours").value);
  const days = Number(document.getElementById("timetableDays").value);
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  appState.timetable = Array.from({ length: days }, (_, index) => ({
    id: crypto.randomUUID(),
    day: dayNames[index],
    subject: subjects[index % subjects.length] || "General Revision",
    hours
  }));
  saveScopedStorage(storageKeys.timetable, appState.timetable);
  renderTimetable();
});

timetableList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleAction(button.dataset.id, button.dataset.action);
});

countdownForm.addEventListener("submit", (event) => {
  event.preventDefault();
  appState.countdowns.unshift({
    id: crypto.randomUUID(),
    name: document.getElementById("countdownName").value.trim(),
    date: document.getElementById("countdownDate").value
  });
  saveScopedStorage(storageKeys.countdowns, appState.countdowns);
  countdownForm.reset();
  renderCountdowns();
});

countdownList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleAction(button.dataset.id, button.dataset.action);
});

examSubjectsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(examSubjectsForm);
  const waecSubjects = Array.from({ length: 9 }, (_, index) => String(formData.get(`waecSubject${index + 1}`) || "").trim()).filter(Boolean);
  const jambSubjects = Array.from({ length: 4 }, (_, index) => String(formData.get(`jambSubject${index + 1}`) || "").trim()).filter(Boolean);
  if (waecSubjects.length !== 9) {
    examSavedMessage.textContent = "Please enter all 9 WAEC subjects.";
    return;
  }
  if (jambSubjects.length !== 4) {
    examSavedMessage.textContent = "Please enter all 4 JAMB subjects.";
    return;
  }
  appState.registration = { waecSubjects, jambSubjects };
  saveScopedStorage(storageKeys.registration, appState.registration);
  examSavedMessage.textContent = "Exam registration saved.";
  renderRegistration();
  renderCourseCheck();
});

clearRegistrationButton.addEventListener("click", () => {
  appState.registration = { waecSubjects: [], jambSubjects: [] };
  saveScopedStorage(storageKeys.registration, appState.registration);
  examSubjectsForm.reset();
  examSavedMessage.textContent = "Exam registration cleared.";
  renderRegistration();
  renderCourseCheck();
});

courseCheckForm.addEventListener("submit", (event) => {
  event.preventDefault();
  renderCourseCheck();
});

topicForm.addEventListener("submit", (event) => {
  event.preventDefault();
  appState.topics.unshift({
    id: crypto.randomUUID(),
    subject: document.getElementById("topicSubject").value.trim(),
    topic: document.getElementById("topicName").value.trim(),
    status: document.getElementById("topicStatus").value
  });
  saveScopedStorage(storageKeys.topics, appState.topics);
  topicForm.reset();
  renderTopics();
  renderAnalytics();
  updateSummary();
});

topicList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleAction(button.dataset.id, button.dataset.action);
});
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const caScore = Number(document.getElementById("courseCredits").value);
  const examScore = Number(document.getElementById("courseGrade").value);
  const totalScore = Math.min(100, Math.max(0, caScore + examScore));
  appState.scores.unshift({
    id: crypto.randomUUID(),
    name: document.getElementById("courseName").value.trim(),
    caScore,
    examScore,
    totalScore,
    gradeLabel: scoreToGrade(totalScore)
  });
  saveScopedStorage(storageKeys.scores, appState.scores);
  courseForm.reset();
  document.getElementById("courseCredits").value = "30";
  document.getElementById("courseGrade").value = "45";
  renderScores();
  renderAnalytics();
});

courseList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleAction(button.dataset.id, button.dataset.action);
});

clearCoursesButton.addEventListener("click", () => {
  appState.scores = [];
  saveScopedStorage(storageKeys.scores, appState.scores);
  renderScores();
  renderAnalytics();
});

quizSetupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startQuiz(quizSubject.value);
});

notesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  appState.notes.unshift({
    id: crypto.randomUUID(),
    subject: noteSubjectInput.value.trim(),
    title: noteTitleInput.value.trim(),
    content: notesInput.value.trim()
  });
  saveScopedStorage(storageKeys.notes, appState.notes);
  notesSavedMessage.textContent = "Note saved.";
  notesForm.reset();
  renderNotes();
});

notesList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (button) handleAction(button.dataset.id, button.dataset.action);
});

noteSearch.addEventListener("input", renderNotes);

aiForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const prompt = aiPrompt.value.trim();
  if (!prompt) {
    return;
  }

  appendAiMessage("user", prompt);
  aiPrompt.value = "";
  aiStatus.textContent = "Thinking...";

  try {
    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed.");
    }

    appendAiMessage("assistant", data.reply);
    aiStatus.textContent = "Reply received.";
  } catch (error) {
    appendAiMessage("assistant", `I could not respond yet. ${error.message}`);
    aiStatus.textContent = "AI is not ready yet. Check the backend setup.";
  }
});

clearAiChatButton.addEventListener("click", () => {
  aiChat = [];
  renderAiChat();
  aiStatus.textContent = "Chat cleared.";
});

startTimerButton.addEventListener("click", () => {
  if (timerState.running) return;
  timerState.running = true;
  timerState.intervalId = setInterval(() => {
    timerState.remainingSeconds -= 1;
    updateTimerDisplay();
    if (timerState.remainingSeconds <= 0) {
      clearInterval(timerState.intervalId);
      timerState.running = false;
      timerModeLabel.textContent = "Session Complete";
      appState.sessions += 1;
      saveScopedStorage(storageKeys.sessions, appState.sessions);
      updateSummary();
    }
  }, 1000);
});

pauseTimerButton.addEventListener("click", () => {
  if (timerState.intervalId) clearInterval(timerState.intervalId);
  timerState.intervalId = null;
  timerState.running = false;
  timerModeLabel.textContent = "Paused";
});

resetTimerButton.addEventListener("click", resetTimerState);
sessionMinutesInput.addEventListener("change", () => {
  if (!timerState.running) resetTimerState();
});

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  setAuthStateUi(user);
  if (user) {
    loadState();
    refreshAllViews();
  } else {
    appState = createEmptyState();
    quizState = { subject: null, questions: [], currentIndex: 0, score: 0, answered: false };
  }
});

setAuthStateUi(null);
renderCourseCheck();
renderAiChat();
showSection("overviewSection");
resetTimerState();
