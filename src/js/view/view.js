import { create } from '../utils/utils';
import Ticket from '../ticket/ticket';
import CreateForm from '../forms/create-form';
import ConfirmDeleteForm from '../forms/confirm-delete-form';
import EditForm from '../forms/edit-form';

export default class View {
  constructor() {
    this.container = create('div', 'hd-container');
    this.addHeaderAndTicketsContainer();
    this.createForm = new CreateForm(this.container);
    this.confirmDeleteForm = new ConfirmDeleteForm(this.container);
    this.editForm = new EditForm(this.container);
    this.ticketsContainer = this.container.querySelector('.hd-tickets-container');
  }

  // Returns components HTML Element
  html() {
    return this.container;
  }

  // Adds header and tickets container
  addHeaderAndTicketsContainer() {
    this.container.innerHTML = `
    <div class="hd-toolbar">
        <button class="hd-add-ticket-button">Add Ticket</button>
    </div> 
    <div class="hd-tickets-container">
    </div>   
    `;
  }

  // Fills ticket container with tickets from server []
  drawAllTickets(tickets) {
    this.ticketsContainer.innerHTML = '';
    tickets.then((values) => {
      values.forEach((ticket) => {
        const ticketCard = new Ticket(
          { ...ticket },
        );
        this.ticketsContainer.appendChild(ticketCard.html());
      });
    });
  }

  // Adds new ticket, when created
  drawOneTicket(ticketData) {
    const newTicket = new Ticket(ticketData);
    this.ticketsContainer.appendChild(newTicket.html());
  }

  // Updates ticket view acc. to renewed data
  updateTicket(updatedTicket) {
    const ticketToUpdate = this.container.querySelector(`[data-id="${updatedTicket.id}"]`);
    ticketToUpdate.querySelector('.hd-ticket-status').className = `hd-ticket-status-${updatedTicket.status} hd-ticket-status`;
    ticketToUpdate.querySelector('.hd-ticket-name').textContent = updatedTicket.name;
    ticketToUpdate.querySelector('.hd-ticket-details').textContent = updatedTicket.description;
  }

  // Removes one ticket
  removeDeletedTicket(id) {
    const ticketToDelete = this.container.querySelector(`[data-id="${id}"]`);
    ticketToDelete.remove();
  }

  // Show ticket details
  toggleTicketDetails(id) {
    const ticketElement = this.container.querySelector(`[data-id="${id}"]`);
    const detailsElement = ticketElement.querySelector('.hd-ticket-details');
    detailsElement.classList.toggle('hidden');
  }
}
