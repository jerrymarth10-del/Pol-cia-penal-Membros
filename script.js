
const menuToggle = document.getElementById('menuToggle');
const dropdownMenu = document.getElementById('dropdownMenu');

menuToggle?.addEventListener('click', () => {
  dropdownMenu?.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.menu-area')) {
    dropdownMenu?.classList.add('hidden');
  }
});
