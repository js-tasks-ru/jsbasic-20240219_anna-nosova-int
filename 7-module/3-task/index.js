import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.onSliderClick();
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

  onSliderClick() {

    addEventListener('click', event => {
      let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      let valuePercents = Math.round(leftRelative * (this.steps - 1)) / (this.steps - 1) * 100;

      this.value = Math.round(leftRelative * (this.steps - 1));
      this.sub('thumb').style.left = `${valuePercents}%`;
      this.sub('value').textContent = `${this.value}`;
      this.sub('progress').style.width = `${valuePercents}%`;

      if (this.sub('step-active')) {
        this.sub('step-active').classList.remove('slider__step-active');
      }

      this.sub('steps').children[this.value].classList.add('slider__step-active');

      this.elem.dispatchEvent(
        new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true,
        })
      );
    });
  }
}