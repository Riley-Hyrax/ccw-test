let currentQuestion = 1;
let totalQuestions = 3;
let countdownTimer;
let countdownValue = 60; 
const initialCountdownValue = 60; 

function nextQuestion(questionNumber) {

  document.getElementById('question' + questionNumber).style.display = 'none';

  if (questionNumber + 1 <= totalQuestions) {
    document.getElementById('question' + (questionNumber + 1)).style.display = 'block';
  } else {

    document.getElementById('finalScreen').style.display = 'block';
    generateReferenceNumber(); 
    startCountdown(); 
  }

  updateProgressBar((questionNumber + 1) / totalQuestions * 100);
}

function updateProgressBar(progress) {
  document.getElementById('progressBar').style.width = progress + '%';
}

function submitEmail() {
  const email = document.getElementById('emailInput').value;
  
  if (validateEmail(email)) {
  window.location.href = 'https://your-redirect-link.com'; 
  } else {
    alert('Please enter a valid email address.');
  }
}




function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  const progressBar = document.getElementById('progressBar');
  countdownValue = initialCountdownValue; 

  countdownTimer = setInterval(() => {
    countdownValue--;
    countdownElement.textContent = countdownValue;

    updateCountdownProgressBar();

    if (countdownValue <= 0) {
      clearInterval(countdownTimer);
      resetQuiz(); 
    }
  }, 1000);
}

function updateCountdownProgressBar() {
  const progressBar = document.getElementById('progressBar');
  
  const progressPercentage = (countdownValue / initialCountdownValue) * 100;
  progressBar.style.width = progressPercentage + '%';
  
  if (countdownValue > 40) {
    progressBar.style.backgroundColor = 'green';
  } else if (countdownValue > 20) {
    progressBar.style.backgroundColor = 'orange';
  } else {
    progressBar.style.backgroundColor = 'red';
  }
}

function generateReferenceNumber() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const firstPart = letters.charAt(Math.floor(Math.random() * letters.length)) + letters.charAt(Math.floor(Math.random() * letters.length));
  const secondPart = Math.floor(Math.random() * 90 + 10); 
  const thirdPart = Math.floor(Math.random() * 90 + 10);  

  const referenceNumber = `REF: ${firstPart}-${secondPart}-${thirdPart}`;
  document.getElementById('referenceNumber').textContent = referenceNumber;
}

function resetQuiz() {
  document.getElementById('finalScreen').style.display = 'none';
  document.getElementById('question1').style.display = 'block';
  
  updateProgressBar(0);  
  document.getElementById('progressBar').style.backgroundColor = '#0a0a23'; 
  

  countdownValue = initialCountdownValue;
  clearInterval(countdownTimer);  
}
