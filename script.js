window.onload = function() {

  // menu click
  const menu = document.getElementById('menu');
  const headerOffsetHeight = document.querySelector('header').offsetHeight;

  menu.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      menu.querySelectorAll('li').forEach(el => el.classList.remove('navigation__link_active'));
      event.target.closest('li').classList.add('navigation__link_active');

      const sectionId = event.target.getAttribute('href');
      const sectionOffsetTop = document.querySelector(sectionId).offsetTop;

      window.scrollTo({
        top: sectionOffsetTop - headerOffsetHeight,
        behavior: 'smooth'
      });
    }
  });

  // menu scroll
  const sections = document.querySelectorAll('section');
  const windowHeight = document.documentElement.clientHeight;
  const pageHeight = document.documentElement.scrollHeight;

  document.addEventListener('scroll', event => {

    const currentScrollTop = window.pageYOffset + headerOffsetHeight;
    const currentScrollBottom = windowHeight + window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = section.offsetTop + section.offsetHeight;

      if (currentScrollTop >= sectionTop && currentScrollTop < sectionBottom) {
        let sectionId = '#';

        if (currentScrollBottom === pageHeight) {
          sectionId += sections[sections.length - 1].getAttribute('id');
        } else {
          sectionId += section.getAttribute('id');
        }

        menu.querySelectorAll('li').forEach(el => {
          el.classList.remove('navigation__link_active')

          if (el.firstChild.getAttribute('href') === sectionId) {
            el.classList.add('navigation__link_active');
          }
        });
      }
    });
  });

  // slider for desktop
  const sliderSection = document.getElementById('slider');
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
      sliderSection.classList.add('slider_blue');
    } else {
      sliderSection.classList.remove('slider_blue');
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

  const element = document.querySelector('.slider__wrapper');
  swipedetect(element);

  // togge phone screen
  const phoneBtns = document.querySelectorAll('.phone-button');

  phoneBtns.forEach(btn => btn.addEventListener('click', toggleScreen));

  phoneBtns.forEach(btn => btn.addEventListener('touchstart', toggleScreen));

  function toggleScreen(event) {
    let parent = event.target.parentNode;
    let darkScreen = parent.querySelector('.dark-screen');

    darkScreen.classList.toggle('dark-screen_show');
  }

  // portfolio tags
  const portfolioTags = document.querySelector('.portfolio__tags');

  portfolioTags.addEventListener('click', event => {
    if (event.target.tagName === 'LI' && !event.target.classList.contains('tag_selected')) {
      portfolioTags.querySelectorAll('li').forEach(el => el.classList.remove('tag_selected'));
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
  const portfolioContainer = document.querySelector('.portfolio__projects');

  portfolioContainer.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      let li = event.target.closest('li')

      if (li.classList.contains('portfolio__image_bordered')) {
        li.classList.remove('portfolio__image_bordered');
      } else {
        portfolioContainer.querySelectorAll('li').forEach(el => el.classList.remove('portfolio__image_bordered'));
        li.classList.add('portfolio__image_bordered');
      }
    }
  });

  // form
  const form = document.getElementById('form');
  const submit = document.getElementById('submit');
  const modal = document.getElementById('modal');
  const modalText = modal.querySelector('.modal__text');
  const modalButton = modal.querySelector('.modal__btn');

  submit.addEventListener('click', event => {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (nameInput.checkValidity() && emailInput.checkValidity()) {
      event.preventDefault();

      showmodal();
    }
  });

  function showmodal() {
    const subject = document.getElementById('subject').value.toString();
    const message = document.getElementById('message').value.toString();

    let text = '<p>Письмо отправлено</p>';
    text += `<p>${subject ? 'Тема: ' + subject : 'Без темы'}</p>`;
    text += `<p>${message ? 'Описание: ' + message : 'Без описания'}</p>`;

    modalText.innerHTML = text;
    modal.classList.add('modal__overlay_show');
  }

  modal.addEventListener('click', closemodal);

  function closemodal(event) {
    if (event.target === modalButton || event.target === modal) {
      modal.classList.remove('modal__overlay_show');
      modalText.innerHTML = '';
      form.reset();
    }
  }

}
