export default class Controller {
  constructor(view, service) {
    this.view = view;
    this.service = service;
    this.init();
    this.attachControllers();
    this.toBeDeletedId = null;
    this.toBeEditedId = null;
  }

  init() {
    this.view.drawAllTickets(this.service.getAll());
  }

  attachControllers() {
    this.view.html().addEventListener('click', async (e) => {
      // *Edit* button and form handlers
      if (e.target.classList.contains('hd-ticket-edit')) {
        await this.editClicked(e);
      }
      if (e.target.classList.contains('hd-edit-undo-button')) {
        this.undoButtonClicked(e);
      }
      if (e.target.classList.contains('hd-edit-save-button')) {
        await this.editSaveClicked();
      }
      // *Delete* ticket button handler
      if (e.target.classList.contains('hd-ticket-delete')) {
        await this.deleteClicked(e);
      }
      // *Add ticket* button handler
      if (e.target.classList.contains('hd-add-ticket-button')) {
        this.addTicketClicked();
      }
      // *Create* form handlers
      if (e.target.classList.contains('hd-create-undo-button')) {
        this.undoButtonClicked();
      }
      if (e.target.classList.contains('hd-create-create-button')) {
        await this.createButtonClicked();
      }
      // *Confirm delete* form handlers
      if (e.target.classList.contains('hd-confirm-undo-button')) {
        this.toBeDeletedId = null;
        this.undoButtonClicked();
      }
      if (e.target.classList.contains('hd-confirm-delete-button')) {
        await this.deleteConfirmed();
      }
      // *Status* clicked
      if (e.target.classList.contains('hd-ticket-status')) {
        await this.ticketStatusClicked(e);
      }
      // Task clicked - show details
      if (e.target.classList.contains('hd-ticket-name')
        || e.target.classList.contains('hd-ticket-short')
        || e.target.classList.contains('hd-ticket-created')
      ) {
        this.ticketClicked(e);
      }
    });
  }

  // EDIT ROUTE
  // Shows edit form with ticket data
  async editClicked(e) {
    const { id } = e.target.closest('.hd-ticket-container').dataset;
    this.toBeEditedId = id;
    const ticketData = await this.service.findById(id);
    this.view.editForm.fillValues(ticketData);
    this.view.editForm.showForm();
  }

  async editSaveClicked() {
    const updateData = this.view.editForm.returnValues();
    const editedTicket = await this.service.findByIdAndUpdate(this.toBeEditedId, updateData);
    this.view.updateTicket(editedTicket);
    this.toBeEditedId = null;
    this.view.editForm.hideForm();
  }

  // DELETE ROUTE
  // Shows delete confirmation form
  deleteClicked(e) {
    this.view.confirmDeleteForm.showForm();
    const { id } = e.target.closest('.hd-ticket-container').dataset;
    this.toBeDeletedId = id;
  }

  // Do delete after confirmation
  async deleteConfirmed() {
    const result = await this.service.delete(this.toBeDeletedId);
    if (result) {
      this.view.removeDeletedTicket(this.toBeDeletedId);
      this.toBeDeletedId = null;
    }
    this.view.confirmDeleteForm.hideForm();
  }

  // Add Ticket button handler
  addTicketClicked() {
    this.view.createForm.showForm();
  }

  // Create form create button handler
  async createButtonClicked() {
    const ticketData = this.view.createForm.returnValues();
    const newTicket = await this.service.create(ticketData);
    this.view.drawOneTicket(newTicket);
    this.view.createForm.hideForm();
  }

  // Ticket status toggle
  async ticketStatusClicked(e) {
    const { id } = e.target.closest('.hd-ticket-container').dataset;
    const ticketData = await this.service.findById(id);
    const updateData = {};
    if (ticketData.status === 'complete') {
      updateData.status = 'incomplete';
    } else {
      updateData.status = 'complete';
    }
    const renewedTicked = await this.service.findByIdAndUpdate(id, updateData);
    this.view.updateTicket(renewedTicked);
  }

  // Ticket clicked - show/hide details
  ticketClicked(e) {
    const { id } = e.target.closest('.hd-ticket-container').dataset;
    this.view.toggleTicketDetails(id);
  }

  // Create form undo button handler
  undoButtonClicked() {
    this.view.createForm.hideForm();
    this.view.confirmDeleteForm.hideForm();
    this.view.editForm.hideForm();
    this.toBeDeletedId = null;
    this.toBeEditedId = null;
  }
}
