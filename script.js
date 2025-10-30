
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user && pass) {
    localStorage.setItem('user', user);
    if (!localStorage.getItem(user + '_courses')) localStorage.setItem(user + '_courses', JSON.stringify([]));
    window.location.href = 'dashboard.html';
  } else {
    alert('Enter both username and password');
  }
}

function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function enroll(course, link) {
  const user = localStorage.getItem('user');
  let courses = JSON.parse(localStorage.getItem(user + '_courses'));
  if (!courses.some(c => c.name === course)) {
    courses.push({ name: course, link });
    localStorage.setItem(user + '_courses', JSON.stringify(courses));
    alert('Enrolled in ' + course);
  } else alert('Already enrolled in this course');
}

function loadDashboard() {
  const user = localStorage.getItem('user');
  if (!user) { window.location.href = 'index.html'; return; }
  document.getElementById('userDisplay').innerText = user;
  let courses = JSON.parse(localStorage.getItem(user + '_courses'));
  const list = document.getElementById('enrolledList');
  list.innerHTML = '';
  courses.forEach(c => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${c.link}" target="_blank">${c.name}</a>`;
    list.appendChild(li);
  });
}

function updateProgress() {
  const value = document.getElementById('progress').value;
  document.getElementById('progressValue').innerText = 'Progress: ' + value + '%';
  const msg = value < 30 ? 'Keep going!' : value < 70 ? 'Doing great!' : '🔥 Excellent progress!';
  document.getElementById('motivation').innerText = msg;
}

window.onload = function() {
  if (document.getElementById('enrolledList')) loadDashboard();
};
