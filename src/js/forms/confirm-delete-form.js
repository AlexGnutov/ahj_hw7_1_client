import { create } from '../utils/utils';

export default class ConfirmDeleteForm {
  constructor(parent) {
    this.parent = parent;
    this.addForm();
  }

  addForm() {
    this.container = create('div', 'hd-form-container');
    this.container.innerHTML = `
    <div class="hd-form">
      <h3>Are you sure?</h3>
      <p>
        The task is going to be deleted forever.<br>
      </p>
      <button class="hd-confirm-undo-button">Undo</button>
      <button class="hd-confirm-delete-button">Delete</button>
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
}
