function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselItems = carousel.querySelector('.carousel__inner');
  const arrowLeft = carousel.querySelector('.carousel__arrow_left');
  const arrowRight = carousel.querySelector('.carousel__arrow_right');
  const itemWidth = carouselItems.querySelector('.carousel__slide').offsetWidth;
  let slidesQty = carouselItems.querySelectorAll('.carousel__slide').length;
  let counter = 1;

  arrowLeft.style.display = 'none';

  function checkArrows() {
    if (counter >= slidesQty) {
      arrowRight.style.display = 'none';
      return;
    } else {
      arrowRight.style.display = '';
    }
    if (counter > 1) {
      arrowLeft.style.display = '';
      return;
    } else {
      arrowLeft.style.display = 'none';
    }
  }

  arrowRight.addEventListener('click', event => {
    carouselItems.style.transform = `translateX(${-itemWidth * counter}px)`;
    counter++;
    checkArrows();
  });

  arrowLeft.addEventListener('click', event => {
    --counter;
    carouselItems.style.transform = `translateX(${-itemWidth * (counter - 1)}px)`;
    checkArrows();
  });
}