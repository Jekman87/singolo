const MENU = document.getElementById('menu');
const FORM = document.getElementById('form');
const SUBMIT = document.getElementById('submit');
const CLOSE_BUTTON = document.getElementById('close-button');


MENU.addEventListener('click', event => {
  if (event.target.closest('li')) {
    MENU.querySelectorAll('li').forEach(el => el.classList.remove('navigation__link_active'));
    event.target.closest('li').classList.add('navigation__link_active');
  }
});

SUBMIT.addEventListener('click', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.toString();



});




// CLOSE_BUTTON.addEventListener('click', event => {
//   if (event.target.closest('li')) {
//     MENU.querySelectorAll('li').forEach(el => el.classList.remove('navigation__link_active'));
//     event.target.closest('li').classList.add('navigation__link_active');
//   }
// });




