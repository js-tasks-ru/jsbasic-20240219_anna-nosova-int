/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #rows;
  #elem;

  constructor(rows) {
    this.#rows = rows;
    this.#elem = document.createElement('TABLE');
    this.render();
    this.eventListener();
  }
  get elem() {
    return this.#elem;
  }

  render() {
    let tbl = `      
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      <tbody>` + this.#rows.map(usr => `
        <tr>
          <td>${usr.name}</td>
          <td>${usr.age}</td>
          <td>${usr.salary}</td>
          <td>${usr.city}</td>
          <td><button> [X] </button></td>
        </tr>`).join('') + 
      `</tbody>`;
    this.#elem.innerHTML = tbl;
  }

  eventListener(event) {
    for (let btn of this.#elem.querySelectorAll('button')) {
      btn.addEventListener('click', event => {
        let row = event.target.parentElement.parentElement;
        this.#rows.splice(row.index - 1, 1);
        row.remove();
      });
    }
  }
}
