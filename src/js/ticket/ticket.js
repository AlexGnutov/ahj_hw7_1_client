import { create } from '../utils/utils';

export default class Ticket {
  constructor(data) {
    this.container = create('div', 'hd-ticket-container');
    // Put link to object into html
    this.container.dataset.id = data.id;
    this.markup = `<div class="hd-ticket-short">
        <div class="hd-ticket-status-${data.status} hd-ticket-status"></div>
        <div class="hd-ticket-name">${data.name}</div>
        <div class="hd-ticket-created">${data.created.toLocaleString()}</div>
        <button class="hd-ticket-edit">Edit</button>
        <button class="hd-ticket-delete">Delete</button>       
    </div>
    <div class="hd-ticket-details hidden">${data.description}</div>`;
    this.container.innerHTML = this.markup;
  }

  html() {
    return this.container;
  }
}
