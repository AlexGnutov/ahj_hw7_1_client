const tickets = [
  {
    id: '10001',
    name: 'Task 1',
    description: 'Short ticket for a clever man',
    status: 'incomplete',
    created: new Date(),
  },
  {
    id: '10002',
    name: 'Task 2',
    description: 'Short ticket for a clever man',
    status: 'complete',
    created: new Date(),
  },
  {
    id: '10003',
    name: 'Task 3',
    description: 'Short ticket for a clever man',
    status: 'incomplete',
    created: new Date(),
  },
];

export default class TicketServiceLocal {
  constructor(hostUrl) {
    this.hostUrl = hostUrl;
  }

  // eslint-disable-next-line class-methods-use-this
  async create(ticketData) {
    const name = ticketData.name || 'Name: to be defined';
    const description = ticketData.description || 'Description: to be added';
    const newTicket = {
      id: `1000${tickets.length + 1}`,
      name,
      description,
      status: 'incomplete',
      created: new Date(),
    };
    tickets.push(newTicket);
    return newTicket;
  }

  // eslint-disable-next-line class-methods-use-this
  async getAll() {
    return tickets;
  }

  // eslint-disable-next-line class-methods-use-this
  async findById(id) {
    return tickets.find((ticket) => ticket.id === id);
  }

  // eslint-disable-next-line class-methods-use-this
  async findByIdAndUpdate(id, data) {
    const renewTicket = tickets.find((ticket) => ticket.id === id);
    const { name, description, status } = data;
    renewTicket.name = name || renewTicket.name;
    renewTicket.description = description || renewTicket.description;
    renewTicket.status = status || renewTicket.status;
    return renewTicket;
  }

  // eslint-disable-next-line class-methods-use-this
  async delete(id) {
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);
    tickets.splice(ticketIndex, 1);
    return true;
  }
}
