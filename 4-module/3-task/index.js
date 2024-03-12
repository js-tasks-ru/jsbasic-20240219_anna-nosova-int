function highlight(table) {
  let teachersList = document.querySelectorAll('tbody tr');
  
  for (let teacher of teachersList) {
    const isAvailable = teacher.cells[3].dataset.available;

    if (isAvailable === 'true') {
      teacher.classList.add('available');
    } else if (isAvailable === 'false') {
      teacher.classList.add('unavailable');
    } else if (!isAvailable) {
      teacher.hidden = true;
    }

    const gender = teacher.cells[2].textContent;

    if (gender === 'f') {
      teacher.classList.add('female');
    } else if (gender === 'm') {
      teacher.classList.add('male');
    }

    const age = Number(teacher.cells[1].textContent);
    
    if (age < 18) {
      teacher.style.textDecoration = 'line-through';
    }
  }
}
