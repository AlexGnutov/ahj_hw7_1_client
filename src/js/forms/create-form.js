import { create } from '../utils/utils';

export default class CreateForm {
  constructor(parent) {
    this.parent = parent;
    this.addCreateForm();
  }

  addCreateForm() {
    this.container = create('div', 'hd-form-container');
    this.container.innerHTML = `
    <div class="hd-form">
      <h3>Create Task</h3>
      <label>
        Task name:<br>
        <input class="hd-create-name" name="ticket-name"><br>
      </label>
      <label>
        Task description:<br>
        <textarea class="hd-create-description" name="ticket-description"></textarea><br>
      </label>
      <button class="hd-create-undo-button">Undo</button>
      <button class="hd-create-create-button">Confirm</button>
    </div>
    `;
    this.container.classList.add('hidden');
    this.parent.appendChild(this.container);
  }

  hideForm() {
    this.container.classList.add('hidden');
  }

  showForm() {
    this.container.classList.remove('hidden');
  }

  returnValues() {
    const ticketName = this.container.querySelector('.hd-create-name').value;
    const ticketDescription = this.container.querySelector('.hd-create-description').value;
    return {
      name: ticketName,
      description: ticketDescription,
    };
  }
}
