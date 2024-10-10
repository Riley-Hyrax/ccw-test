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

function submitForm() {
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const email = ""; // If you want to collect email later, add email input

  if (!firstName || !lastName || !phoneNumber) {
    alert('Please fill out all fields.');
    return;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    alert('Please enter a valid American phone number.');
    return;
  }

  // Prepare the data for the API
  const apiData = {
    "lp_campaign_id": "23572",
    "lp_supplier_id": "64412",
    "lp_key": "pql7bnpgxtk1my",
    "lp_action": "",
    "lp_subid1": "",
    "lp_subid2": "",
    "first_name": firstName,
    "last_name": lastName,
    "email": email,
    "phone": phoneNumber
  };

  // Send the data to the API
  fetch('https://api.leadprosper.io/direct_post', { // Example API endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(apiData)
  })
  .then(response => response.json())
  .then(data => {
    // If the API call is successful, update the quiz container with a success message
    console.log('Success:', data);
    document.getElementById('quizContainer').innerHTML = `
      <div class="success-message">
        <h2>Congratulations!</h2>
        <p>You have successfully registered.</p>
        <p>We will contact you shortly.</p>
      </div>
    `;
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('There was an error submitting your information. Please try again later.');
  });
}


function validatePhoneNumber(phoneNumber) {
  // Validate US phone numbers (10 digits, may include dashes, spaces, or parentheses)
  const phoneRegex = /^(?:\+1\s?)?\(?[2-9][0-8][0-9]\)?[-.\s]?[2-9][0-9]{2}[-.\s]?[0-9]{4}$/;
  return phoneRegex.test(phoneNumber);
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
