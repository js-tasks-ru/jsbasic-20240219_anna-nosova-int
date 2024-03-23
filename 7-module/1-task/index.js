import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.offsetSize = 350;

    this.render();
    this.addEventListeners();
    this.activeCategory = '';
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon" />
        </button>
      </div>
    `);

    for (let category of this.categories) {
      let el = createElement(`<a href="#" class="ribbon__item"></a>`);
      el.dataset.id = category.id;
      el.textContent = category.name;
      
      this.sub('inner').append(el);
    }

    this.sub('item').classList.add('ribbon__item_active');
  }

  scrollLeft() {
    return this.sub('inner').scrollLeft;
  }

  scrollRight() {
    return this.sub('inner').scrollWidth - this.sub('inner').scrollLeft - this.sub('inner').clientWidth;
  }

  updateArrows() {
    if (this.scrollLeft() > 0) {
      this.sub('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
    }

    if (this.scrollRight() < 1) {
      this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      this.sub('arrow_right').classList.add('ribbon__arrow_visible');
    }
  }

  addEventListeners() {
    this.sub('arrow_left').onclick = (event) => this.onArrowLeftClick(event);
    this.sub('arrow_right').onclick = (event) => this.onArrowRightClick(event);

    this.elem.onclick = (event) => {
      let category = event.target.closest('.ribbon__item');
      if (category) {
        this.onItemClick(category);
        event.preventDefault();
      }
    };

    this.sub('inner').onscroll = (event) => this.onScroll(event);
  }

  onArrowRightClick(event) {
    this.sub('inner').scrollBy(this.offsetSize, 0);
    this.updateArrows();
  }

  onArrowLeftClick(event) {
    this.sub('inner').scrollBy(-this.offsetSize, 0);
    this.updateArrows();
  }

  onScroll(event) {
    this.updateArrows();
  }

  onItemClick(category) {
    let isActive = this.sub('item_active');
    if (isActive) {
      isActive.classList.remove('ribbon__item_active');
    }

    category.classList.add('ribbon__item_active');

    this.activeCategory = category.dataset.id;

    this.elem.dispatchEvent(
      new CustomEvent('ribbon-select', {
        detail: this.activeCategory,
        bubbles: true,
      })
    );
  }
}