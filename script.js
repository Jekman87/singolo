// menu
const MENU = document.getElementById('menu');

MENU.addEventListener('click', event => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    MENU.querySelectorAll('li').forEach(el => el.classList.remove('navigation__link_active'));
    event.target.closest('li').classList.add('navigation__link_active');

    let sectionId = event.target.getAttribute('href');
    let sectionOffsetTop = document.querySelector(sectionId).offsetTop;
    let headerOffsetHeight = document.querySelector('header').offsetHeight;

    window.scrollTo({
      top: sectionOffsetTop - headerOffsetHeight,
      behavior: 'smooth'
    });
  }
});

// slider for desktop
const SLIDER_SECTION = document.getElementById('slider');
let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('slider__item_active', direction);
	});
}

function showItem(direction) {
  items[currentItem].classList.add('slider__item_next', direction);

  if (currentItem) {
    SLIDER_SECTION.classList.add('slider_blue');
  } else {
    SLIDER_SECTION.classList.remove('slider_blue');
  }

	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('slider__item_next', direction);
    this.classList.add('slider__item_active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.slider__button_left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.slider__button_right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

// slider for mobile and drag
const swipedetect = (el) => {

	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('slider__button')) {
			if (e.target.classList.contains('slider__button_left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			let touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			let touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;
			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
							if ((distX > 0)) {
								if (isEnabled) {
									previousItem(currentItem);
								}
							} else {
								if (isEnabled) {
									nextItem(currentItem);
								}
							}
					}
			}
			e.preventDefault();
	}, false);
}

let el = document.querySelector('.slider__wrapper');
swipedetect(el);

// togge phone screen
let PHONE_BTNS = document.querySelectorAll('.phone-button');

PHONE_BTNS.forEach(btn => btn.addEventListener('click', toggleScreen));

PHONE_BTNS.forEach(btn => btn.addEventListener('touchstart', toggleScreen));

function toggleScreen(event) {
	let parent = event.target.parentNode;
  let darkScreen = parent.querySelector('.dark-screen');

  darkScreen.classList.toggle('dark-screen_show');
}

// portfolio tags
const PORTFOLIO_TAGS = document.querySelector('.portfolio__tags');

PORTFOLIO_TAGS.addEventListener('click', event => {
  if (event.target.tagName === 'LI' && !event.target.classList.contains('tag_selected')) {
    PORTFOLIO_TAGS.querySelectorAll('li').forEach(el => el.classList.remove('tag_selected'));
    event.target.classList.add('tag_selected');

    mixImages();
  }
});

function mixImages() {
  let images = [...document.querySelectorAll('.portfolio__image')];
  let imagesContainer = document.querySelector('.portfolio__projects');
  let fragment = document.createDocumentFragment();

  while (images.length) {
    let img = images.splice(Math.floor(Math.random() * images.length), 1)[0];
    fragment.append(img);
  }

  imagesContainer.append(fragment);
}

// portfolio images
const PORTFOLIO_CONTAINER = document.querySelector('.portfolio__projects');

PORTFOLIO_CONTAINER.addEventListener('click', event => {
  if (event.target.tagName === 'IMG') {
    let li = event.target.closest('li')

    if (li.classList.contains('portfolio__image_bordered')) {
      li.classList.remove('portfolio__image_bordered');
    } else {
      PORTFOLIO_CONTAINER.querySelectorAll('li').forEach(el => el.classList.remove('portfolio__image_bordered'));
      li.classList.add('portfolio__image_bordered');
    }
  }
});

// form
const FORM = document.getElementById('form');
const SUBMIT = document.getElementById('submit');
const MODAL = document.getElementById('modal');
const MODAL_TEXT = MODAL.querySelector('.modal__text');
const MODAL_BUTTON = MODAL.querySelector('.modal__btn');

SUBMIT.addEventListener('click', event => {
  const NAME_INPUT = document.getElementById('name');
  const EMAIL_INPUT = document.getElementById('email');

  if (NAME_INPUT.checkValidity() && EMAIL_INPUT.checkValidity()) {
    event.preventDefault();

    showModal();
  }
});

function showModal() {
  const SUBJECT = document.getElementById('subject').value.toString();
  const MESSAGE = document.getElementById('message').value.toString();

  let text = '<p>Письмо отправлено</p>';
  text += `<p>${SUBJECT ? 'Тема: ' + SUBJECT : 'Без темы'}</p>`;
  text += `<p>${MESSAGE ? 'Описание: ' + MESSAGE : 'Без описания'}</p>`;

  MODAL_TEXT.innerHTML = text;
  MODAL.classList.add('modal__overlay_show');
}

MODAL.addEventListener('click', closeModal);

function closeModal(event) {
  if (event.target === MODAL_BUTTON || event.target === MODAL) {
    MODAL.classList.remove('modal__overlay_show');
    MODAL_TEXT.innerHTML = '';
  }
}
