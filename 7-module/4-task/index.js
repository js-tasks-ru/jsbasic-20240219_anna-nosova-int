import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.onSliderMove();
    this.elem.ondragstart = () => false;
    this.elem.querySelector('.slider__thumb').onpointerdown = this.onPointerDown;
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

  render() {
    this.elem = createElement(`<div class="slider">

    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>

    <div class="slider__progress"></div>

    <div class="slider__steps">
    </div>
    </div>`);

    for (let i = 0; i < this.steps; i++) {
      let step = createElement(`<span></span>`);
      this.sub('steps').append(step);
    }

    this.sub('progress').style.width = `0%`;
    this.sub('value').textContent = `0`;
    this.sub('steps').firstElementChild.classList.add('slider__step-active');
  }

  onSliderMove() {
    this.elem.addEventListener('click', (event) => {
      let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      let leftPercents = Math.round(leftRelative * (this.steps - 1)) / (this.steps - 1) * 100;

      if (this.sub('step-active')) {
        this.sub('step-active').classList.remove('slider__step-active');
      }
  
      this.sub('steps').children[this.value].classList.add('slider__step-active');

      this.value = `${Math.round(leftRelative * (this.steps - 1))}`;
      this.sub('value').textContent = this.value;
      this.sub('progress').style.width = `${leftPercents}%`;
      this.sub('thumb').style.left = `${leftPercents}%`;
  
      let sliderChangeEvent = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      });
      this.elem.dispatchEvent(sliderChangeEvent);
    });
  }

  onPointerDown = (event) => {
    event.preventDefault();
  
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = (event) => {
    event.preventDefault();

    let left = this.determinePosition(event);

    this.sub('thumb').style.left = `${left * 100}%`;
    this.sub('progress').style.width = `${left * 100}%`;

    this.value = Math.round(left * (this.steps - 1));
    this.sub('value').textContent = this.value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }

    this.sub('steps').children[this.value].classList.add('slider__step-active');
  }

  determinePosition(event) {
    let position = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
    if (position < 0) {
      position = 0;
    }

    if (position > 1) {
      position = 1;
    }
    return position;
  }

  onPointerUp = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    this.sub('thumb').style.left = `${(this.value / this.steps - 1) * 100}%`;
    this.sub('progress').style.width = `${(this.value / this.steps - 1) * 100}%`;


    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true,
      })
    );
  };
}