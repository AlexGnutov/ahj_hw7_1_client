import { create } from '../utils/utils';

export default class EditForm {
  constructor(parent) {
    this.parent = parent;
    this.addForm();
  }

  addForm() {
    this.container = create('div', 'hd-form-container');
    this.container.innerHTML = `
    <div class="hd-form">
      <h3>Edit Task</h3>
      <label>
        Task name:<br>
        <input class="hd-edit-name" name="ticket-name"><br>
      </label>
      <label>
        Task description:<br>
        <textarea class="hd-edit-description" name="ticket-description"></textarea><br>
      </label>
      <button class="hd-edit-undo-button">Undo</button>
      <button class="hd-edit-save-button">Save</button>
    </div>
    `;
    this.container.classList.add('hidden');
    this.parent.appendChild(this.container);
  }

  fillValues(values) {
    this.container.querySelector('.hd-edit-name').value = values.name;
    this.container.querySelector('.hd-edit-description').value = values.description;
  }

  hideForm() {
    this.container.classList.add('hidden');
  }

  showForm() {
    this.container.classList.remove('hidden');
  }

  returnValues() {
    const ticketName = this.container.querySelector('.hd-edit-name').value;
    const ticketDescription = this.container.querySelector('.hd-edit-description').value;
    return {
      name: ticketName,
      description: ticketDescription,
    };
  }
}
