import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.onCloseBtns();
  }

  sub(ref) {
    return this.elem.querySelector(`.modal__${ref}`);
  }

  render() {
    this.elem = createElement(`<div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">

          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

        </div>

        <div class="modal__body">
        </div>
      </div>
    </div>`);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    document.addEventListener('keydown', this.onEscBtn)
  }

  setTitle(title) {
    let modalTitle = createElement(`<h3 class="modal__title"></h3>`);
    modalTitle.textContent = title;
    this.sub('header').append(modalTitle);
  }

  setBody(content) {
    this.sub('body').innerHTML = '';
    this.sub('body').append(content);
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  onCloseBtns() {

    addEventListener('click', event => {
      if (event.target.closest('.modal__close')) {
        event.preventDefault();
        this.close();
      }
    });

    addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        event.preventDefault();
        this.close();
      }
    });
  }
}

