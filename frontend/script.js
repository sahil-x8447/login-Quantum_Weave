const form = document.getElementById('login-form');
const feedback = document.getElementById('form-feedback');
const secureBtn = document.getElementById('fetch-secure');
const secureOut = document.getElementById('secure-output');

function showError(fieldId, msg) {
  const errEl = document.getElementById(`${fieldId}-error`);
  errEl.textContent = msg;
}

function clearErrors() {
  document.querySelectorAll('small.error').forEach(el => el.textContent = '');
  feedback.textContent = '';
  feedback.className = '';
  secureOut.textContent = '';
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  clearErrors();

  const user = form.user.value.trim();
  const pass = form.password.value;
  let hasError = false;

  if (!user) {
    showError('user', 'Required');
    hasError = true;
  }
  if (pass.length < 8) {
    showError('pass', 'Min 8 characters');
    hasError = true;
  }
  if (hasError) return;

  try {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    });
    const data = await res.json();

    console.log('Login response:', data);

    feedback.textContent = data.message;
    feedback.className = data.success ? 'success' : 'error';

    if (data.success) {
      localStorage.setItem('jwt', data.token);
      console.log('Stored JWT:', data.token);
    }
  } catch (err) {
    feedback.textContent = 'Network error';
    feedback.className = 'error';
  }
});

secureBtn.addEventListener('click', fetchProtected);

async function fetchProtected() {
  const token = localStorage.getItem('jwt');
  if (!token) {
    secureOut.textContent = '🔒 Not logged in';
    return;
  }

  try {
    const res = await fetch('http://localhost:4000/api/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();

    if (data.success) {
      secureOut.textContent = data.data;  // e.g. "Hello user 1!"
    } else {
      secureOut.textContent = 'Error: ' + data.message;
    }
  } catch (err) {
    secureOut.textContent = 'Network error';
    console.error(err);
  }
}
