import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  #elem;

  constructor(slides) {
    this.slides = slides;
    this.#elem = this.createElem();

    this.arrowsEventListener();
    this.addToCartEventListener();
  }

  get elem() {
    this._container = this.#elem;
    return this._container;
  }

  createElem() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">`
        + this.slides.map(slide => 
          `<div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>`).join('')
        + `</div>
        </div>`
    );
    return carousel;
  }

  arrowsEventListener() {
    const carouselItems = this.#elem.querySelector('.carousel__inner');
    const arrowLeft = this.#elem.querySelector('.carousel__arrow_left');
    const arrowRight = this.#elem.querySelector('.carousel__arrow_right');
    const slidesQty = this.slides.length;

    let counter = 1;

    arrowLeft.style.display = 'none';

    function checkVisibility() {

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
      carouselItems.style.transform = `translateX(${-carouselItems.querySelector('.carousel__slide').offsetWidth * counter}px)`; 
      counter++;
      checkVisibility();
    });

    arrowLeft.addEventListener('click', event => {
      --counter;
      carouselItems.style.transform = `translateX(${-carouselItems.querySelector('.carousel__slide').offsetWidth * (counter - 1)}px)`;
      checkVisibility();
    });
  }

  addToCartEventListener() {
    this.#elem.addEventListener('click', event => {
      const cartBtn = event.target.closest('.carousel__button');
      const product = event.target.closest('.carousel__slide');
      if (cartBtn) {
        const cartEvent = new CustomEvent('product-add', {
          detail: product.dataset.id,
          bubbles: true,
        });
        this.elem.dispatchEvent(cartEvent);
      }
    });
  }
}