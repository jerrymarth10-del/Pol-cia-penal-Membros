const SITE_PASSWORD = 'GAPE2026';

const isLoginPage =
  window.location.pathname.endsWith('/') ||
  window.location.pathname.endsWith('index.html') ||
  window.location.pathname === '';

const isMembersPage = window.location.pathname.includes('membros.html');

if (isLoginPage) {
  const loginForm = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginMessage = document.getElementById('loginMessage');
  const togglePassword = document.getElementById('togglePassword');

  if (localStorage.getItem('gapeLogged') === 'true') {
    window.location.href = 'membros.html';
  }

  togglePassword?.addEventListener('click', () => {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.textContent = isPassword ? 'Ocultar' : 'Mostrar';
  });

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email) {
      loginMessage.textContent = 'Digite um e-mail válido.';
      loginMessage.style.color = '#ff9a9a';
      return;
    }

    if (password !== SITE_PASSWORD) {
      loginMessage.textContent = 'Senha incorreta. Tente novamente.';
      loginMessage.style.color = '#ff9a9a';
      return;
    }

    localStorage.setItem('gapeLogged', 'true');
    localStorage.setItem('gapeUserEmail', email);
    window.location.href = 'membros.html';
  });
}

if (isMembersPage) {
  if (localStorage.getItem('gapeLogged') !== 'true') {
    window.location.href = 'index.html';
  }

  const userEmailText = document.getElementById('userEmail');
  const userEmail = localStorage.getItem('gapeUserEmail');
  if (userEmailText && userEmail) {
    userEmailText.textContent = userEmail;
  }

  const menuToggle = document.getElementById('menuToggle');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const logoutBtn = document.getElementById('logoutBtn');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  menuToggle?.addEventListener('click', () => {
    dropdownMenu?.classList.toggle('hidden');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.menu-area')) {
      dropdownMenu?.classList.add('hidden');
    }
  });

  copyEmailBtn?.addEventListener('click', async () => {
    const email = localStorage.getItem('gapeUserEmail') || '';
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      copyEmailBtn.textContent = 'E-mail copiado';
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copiar e-mail';
      }, 1800);
    } catch (error) {
      copyEmailBtn.textContent = email;
    }
  });

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('gapeLogged');
    localStorage.removeItem('gapeUserEmail');
    window.location.href = 'index.html';
  });
}
