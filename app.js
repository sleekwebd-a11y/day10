let score = 0;
let combo = 0;
let highscore = localStorage.getItem('crit_high') || 0;
let lastTap = Date.now();

document.getElementById('highscore').textContent = highscore;

const orb = document.getElementById('orb');

function strike(e) {
  e.preventDefault();
  
  const now = Date.now();
  const speed = now - lastTap;
  lastTap = now;

  if (speed < 350) combo++;
  else combo = 1;

  document.getElementById('combo').textContent = combo + 'x';

  let damage = Math.floor(Math.random() * 280) + 20;

  const isCrit = Math.random() < 0.19;
  if (isCrit) {
    damage = Math.floor(damage * (Math.random() * 7 + 4));
    orb.classList.add('crit-flash');
    setTimeout(() => orb.classList.remove('crit-flash'), 400);
  }

  score += Math.floor(damage * (1 + combo * 0.13));
  document.getElementById('score').textContent = score;

  createFlyingNumber(damage, isCrit);

  if (Math.random() < 0.05) {
    score += Math.floor(score * 0.7);
    createFlyingNumber("GOD ROLL", true);
  }

  if (score > highscore) {
    highscore = score;
    document.getElementById('highscore').textContent = highscore;
    localStorage.setItem('crit_high', highscore);
  }
}

function createFlyingNumber(value, isCrit) {
  const num = document.createElement('div');
  num.className = `damage-number ${isCrit ? 'text-pink-400' : 'text-cyan-400'}`;
  num.textContent = isCrit ? `+${value}` : value;
  num.style.left = `${Math.random() * 55 + 22}%`;
  num.style.top = '38%';
  document.getElementById('game-area').appendChild(num);
  setTimeout(() => num.remove(), 1300);
}

// Attach both click and touch for perfect mobile response
orb.addEventListener('click', strike);
orb.addEventListener('touchstart', strike);

console.log('%cCRIT v2 loaded – tap the orb like crazy 🔥', 'color:#22d3ee; font-weight:bold');
