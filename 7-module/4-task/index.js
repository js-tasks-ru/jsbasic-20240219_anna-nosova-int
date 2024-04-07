import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;

    this.render();
    this.addEventListeners();
    this.setValue(value);
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }

  render() {
    this.elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps">
          ${'<span></span>'.repeat(this.steps)}
        </div>
      </div>
    `);
  }

  setValue(value) {
    this.value = value;

    let valuePercents = (value / (this.steps - 1)) * 100;

    this.sub('thumb').style.left = `${valuePercents}%`;
    this.sub('progress').style.width = `${valuePercents}%`;

    this.sub('value').innerHTML = value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }

    this.sub('steps').children[this.value].classList.add('slider__step-active');
  }

  addEventListeners() {
    this.sub('thumb').ondragstart = () => false;

    this.sub('thumb').onpointerdown = this.onPointerDown;

    this.elem.onclick = this.onClick;
  }

  onClick = event => {
    let newLeft = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    this.setValue(Math.round((this.steps - 1) * newLeft));

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

  onPointerDown = event => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerMove = event => {
    event.preventDefault();

    let newLeft = this.determinePosition(event);

    this.sub('thumb').style.left = `${newLeft * 100}%`;
    this.sub('progress').style.width = `${newLeft * 100}%`;

    this.value = Math.round((this.steps - 1) * newLeft);
    this.sub('value').innerHTML = this.value;

    if (this.sub('step-active')) {
      this.sub('step-active').classList.remove('slider__step-active');
    }

    this.sub('steps').children[this.value].classList.add('slider__step-active');
  };

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

    this.sub('thumb').style.left = `${(this.value / (this.steps - 1)) * 100}%`;
    this.sub('progress').style.width = `${(this.value / (this.steps - 1)) * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  };
}