export default class TicketServiceWeb {
  constructor(hostUrl) {
    this.hostUrl = hostUrl;
  }

  async create(ticketData) {
    const URL = `${this.hostUrl}/?method=createTicket`;
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData),
      mode: 'cors',
    };
    return fetch(URL, init).then((response) => response.json());
  }

  async getAll() {
    const URL = `${this.hostUrl}/?method=allTickets`;
    const init = {
      method: 'GET',
      mode: 'cors',
    };
    return fetch(URL, init).then((response) => response.json());
  }

  async findById(id) {
    const URL = `${this.hostUrl}/?method=ticketById&id=${id}`;
    const init = {
      method: 'GET',
      mode: 'cors',
    };
    return fetch(URL, init).then((response) => response.json());
  }

  async findByIdAndUpdate(id, ticketData) {
    const URL = `${this.hostUrl}/?method=findOneAndUpdate&id=${id}`;
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticketData),
      mode: 'cors',
    };
    return fetch(URL, init).then((response) => response.json());
  }

  async delete(id) {
    const URL = `${this.hostUrl}/?method=deleteTicket&id=${id}`;
    const init = {
      method: 'GET',
      mode: 'cors',
    };
    return fetch(URL, init).then((response) => response.json());
  }
}
